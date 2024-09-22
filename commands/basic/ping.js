const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Gets bot ping',
    async execute(message) {
        const pingEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Pong!')
            .setDescription(`🏓 Bot latency: ${Date.now() - message.createdTimestamp}ms\nAPI latency: ${Math.round(message.client.ws.ping)}ms`);
            await message.reply({ embeds: [pingEmbed] });    
         },
};
