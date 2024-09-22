const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'code',
    description: 'Get codes!',
    async execute(message) {
        const initialEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Codes!')
            .setDescription('Get all the codes related to CoD');

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('CoD2')
                    .setEmoji('1287354285381779476')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('CoD1')
                    .setEmoji('1287354291023249482')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('Quake')
                    .setEmoji('1287355331319697492')
                    .setStyle('PRIMARY')
            );

        await message.reply({ embeds: [initialEmbed], components: [row] });

        const filter = i => ['CoD2', 'CoD1', 'Quake'].includes(i.customId) && i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            let embed;

            switch (i.customId)  {
                case 'CoD2':
                    embed = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Call of Duty 2')
                        .setDescription('[zk_libcod](https://github.com/ibuddieat/zk_libcod)\n[CoD2rev_server](https://github.com/voron00/CoD2rev_Server)');
                    break;
                case 'CoD1':
                    embed = new MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Call of Duty 1')
                        .setDescription('[vcodlib](https://github.com/SADMANGaming/vcodlib/)\n[libcod1](https://github.com/cod1dev/libcod1)\n[CoDExtended](https://github.com/xtnded/codextended)');
                    break;
                case 'Quake':
                    embed = new MessageEmbed()
                        .setColor('#0000ff')
                        .setTitle('Quake 3 - Arena')
                        .setDescription('[Quake3](https://github.com/id-Software/Quake-III-Arena)\n[RTCW](https://github.com/id-Software/RTCW-MP)\n[WOLF-ET](https://github.com/id-Software/Enemy-Territory)');
                    break;
            }

            await i.reply({ embeds: [embed], ephemeral: true });
        });

        collector.on('end', collected => {
            row.components.forEach(button => button.setDisabled(true));
            message.edit({ components: [row] }); 
        });
    },
};
