const { MessageActionRow, MessageButton } = require('discord.js');
const { prefix } = require("../../config.json");

module.exports = {
    name: 'help',
    description: 'List all available commands',
    async execute(message) {
        // Create buttons
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('basic_help')
                    .setLabel('Basic')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('status_help')
                    .setLabel('Status')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('codes_help')
                    .setLabel('Codes')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('downloads_help')
                    .setLabel('Downloads')
                    .setStyle('PRIMARY'),
            );

        const helpEmbed = {
            color: '#0099ff',
            title: 'Help - Available Commands',
            description: 'Choose a category for more details:\nMade by Sadman',
            timestamp: new Date(),
        };

        const sentMessage = await message.channel.send({ embeds: [helpEmbed], components: [row] });

        const filter = (interaction) => interaction.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (interaction) => {
            await interaction.deferUpdate(); 

            let categoryEmbed = {};
            switch (interaction.customId) {
                case 'basic_help':
                    categoryEmbed = {
                        color: '#0099ff',
                        title: 'Basic Commands',
                        description: `${prefix}ping - Shows bot's ping.\n${prefix}help - Shows this message.\n${prefix}invite - Gives a link so you can invite the bot.`,
                    };
                    break;
                case 'status_help':
                    categoryEmbed = {
                        color: '#0099ff',
                        title: 'Status Commands',
                        description: `${prefix}servers <game> <version> - Get a list of active servers.\n${prefix}getstatus <server ip> <server port>\nGame: cod, coduo\nVersion: 1.1, 1.5, 1.41, 1.51`,
                    };
                    break;
                case 'codes_help':
                    categoryEmbed = {
                        color: '#0099ff',
                        title: 'Codes Commands',
                        description: `${prefix}code - Shows GitHub repos related with cod.`,
                    };
                    break;
                case 'downloads_help':
                    categoryEmbed = {
                        color: '#0099ff',
                        title: 'Downloads Commands',
                        description: `${prefix}downloads - Shows CoD1 and CoDUO download link.\n${prefix}mods - Shows CoD1 mods websites.`,
                    };
                    break;
            }

            await interaction.followUp({ embeds: [categoryEmbed], ephemeral: true });
        });

        collector.on('end', async () => {
            row.components.forEach(button => button.setDisabled(true));
            await sentMessage.edit({ components: [row] });
        });
    },
};
