const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { id } = require('../../config.json');

module.exports = {
    name: 'invite',
    description: 'Invite link!',
    async execute(message) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Invite Me')
                    .setURL(`https://discord.com/oauth2/authorize?client_id=${id}&permissions=8&scope=bot`)
                    .setStyle('LINK') // Use 'LINK' style for URL buttons
            );

        const initialEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Invite me!')
            .setDescription('Click the button below to invite me!');

        await message.reply({ embeds: [initialEmbed], components: [row] });
    },
};
