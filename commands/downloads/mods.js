const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'mods',
    description: 'CoD mods download links!',
    async execute(message) {
        const initialEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Codes!')
            .setDescription('[MODDB](https://www.moddb.com/games/call-of-duty/mods)\n[GAMEFRONT](https://www.gamefront.com/games/call-of-duty)');

        await message.reply({ embeds: [initialEmbed] });
    },
};
