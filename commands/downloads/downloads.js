const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'downloads',
    description: 'CoD download links!',
    async execute(message) {
        const initialEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Downloads!')
            .setDescription('[COD 1.1](https://cod.pm/1.1)\n[COD 1.5](https://cod.pm/1.5/)\n[COD UO 1.51](https://cod.pm/1.51/)\nNOTE: COD UO requires COD 1.5 patch!');

        await message.reply({ embeds: [initialEmbed] });
    },
};
