const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'getstatus',
    description: 'Get a specified server info',
    async execute(message, args) {
        if (args.length < 2) {
            return message.channel.send('Please provide both an IP and a port.');
        }

        const ip = args[0];
        const port = args[1];

        try {
            const CODPM_API = new URL(`/getstatus/${ip}/${port}`, 'https://api.cod.pm');
            const response = await fetch(CODPM_API);
            const data = await response.json();

            if (data.error) {
                return message.channel.send('No server found for the specified IP and port.');
            }

            const serverInfo = data.serverinfo;
            const playerInfo = data.playerinfo;

            const sanitizeName = (name) => {
                return name.replace(/[\u0001]|(\^0|\^1|\^2|\^3|\^4|\^5|\^6|\^7)/g, '').trim();
            };

            const sanitizedServerName = sanitizeName(serverInfo.sv_hostname);
            const sanitizedPlayers = playerInfo.map(player => 
                `${sanitizeName(player.name)} (Score: ${player.score}, Ping: ${player.ping})`
            ).join('\n');

            const embed = new MessageEmbed()
                .setTitle(`${sanitizedServerName}`)
                .setColor('#0099ff')
                .setTimestamp()
                .addField('Game Type', serverInfo.g_gametype, true)
                .addField('Map Name', serverInfo.mapname, true)
                .addField('Max Players', serverInfo.sv_maxclients, true)
                .addField('Current Players', playerInfo.length.toString(), true)
                .addField('Players:', sanitizedPlayers || 'No players online');

            if (data.mapimage) {
                embed.setThumbnail(`https://cod.pm/mp_maps/${data.mapimage}`);
            }

            await message.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error('Error fetching server data:', error);
            await message.channel.send('There was an error retrieving server information. Please try again later.');
        }
    },
};
