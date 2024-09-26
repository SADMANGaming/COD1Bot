const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

let lastMessage; // Track the last message sent by the bot
let lastUpdated; // Track the last updated time

module.exports = {
    name: 'servers',
    description: 'Get a list of active COD servers',
    async execute(message, args) {
        const CODPM_GAME = args[0]; // cod, coduo, cod2, cod4
        const CODPM_VERSION = args[1];

        if (!CODPM_GAME || !CODPM_VERSION) {
            return message.channel.send("Please specify the game and version `(e.g., !servers cod 1.1)`.");
        }

        const GAME = CODPM_GAME === "coduo" ? "CoD UO" : "COD";
        const CODPM_API = new URL(`/masterlist/${CODPM_GAME}/${CODPM_VERSION}`, 'https://api.cod.pm');

        const updateServerList = async () => {
            try {
                const codpm = await fetch(CODPM_API, { headers: { Accept: 'application/json' } });
                if (!codpm.ok) {
                    const errorResponse = await codpm.text();
                    console.error(`Error fetching server list: ${codpm.status} - ${codpm.statusText}`, errorResponse);
                    return lastMessage.edit(`Error fetching server list: ${codpm.status} - ${codpm.statusText}`);
                }

                const rawj = await codpm.json();
                const servers = rawj.servers;

                if (!servers || servers.length === 0) {
                    if (lastMessage) {
                        await lastMessage.edit('No active servers found for this game and version.');
                    } else {
                        lastMessage = await message.channel.send('No active servers found for this game and version.');
                    }
                    return;
                }

                const embeds = [];
                let currentEmbed = new MessageEmbed()
                    .setTitle(`Active ${GAME} ${CODPM_VERSION} Servers`)
                    .setColor('#0099ff')
                    .setTimestamp();

                let description = '**Server Name** | **Players** | **Map** | **IP:Port**\n--- | --- | --- | ---\n';

                for (let server of servers) {
                    const players = server.playerinfo.length - server.bots;

                    if (server.hidden > 0 || server.sv_maxclients > 72) continue;

                    const cleanText = (text) =>
                        text.replace(/[\u0000-\u001F\u007F]|(\s+)|(\^(\d))|(`)/g, '');

                    const serverName = cleanText(server.sv_hostname || 'Unnamed Server');
                    const playerCount = `${players}/${server.sv_maxclients}`;
                    const mapName = cleanText(server.mapname || 'Unknown Map');
                    const ipPort = `${server.ip}:${server.port}`;

                    const serverLine = `\`${serverName}\` | ${playerCount} | \`${mapName}\` | \`${ipPort}\`\n`;

                    if (description.length + serverLine.length > 4096) {
                        currentEmbed.setDescription(description);
                        embeds.push(currentEmbed);

                        currentEmbed = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTimestamp();

                        
                        description = '';
                    }

                    description += serverLine;
                }

                if (description.trim().length > 0) {
                    currentEmbed.setDescription(description);
                    embeds.push(currentEmbed);
                }

                lastUpdated = new Date().toLocaleString();

                if (lastMessage) {
                    await lastMessage.edit({ embeds, content: `Last updated: ${lastUpdated}` });
                } else {
                    lastMessage = await message.channel.send({ embeds, content: `Last updated: ${lastUpdated}` });
                }
            } catch (error) {
                console.error('Error fetching server list:', error);
                if (lastMessage) {
                    await lastMessage.edit('There was an error fetching the server list. Please try again later.');
                } else {
                    lastMessage = await message.channel.send('There was an error fetching the server list. Please try again later.');
                }
            }
        };

        await updateServerList();

        setInterval(updateServerList, 60 * 1000);

        if (!lastMessage) {
            lastMessage = await message.channel.send('Server list will auto-update every minute.');
        }
    },
};
















/*
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

let lastMessage; // Track the last message sent by the bot

module.exports = {
    name: 'servers',
    description: 'Get a list of active COD servers',
    async execute(message, args) {
        const CODPM_GAME = args[0]; // cod, coduo, cod2, cod4
        const CODPM_VERSION = args[1];

        if (!CODPM_GAME || !CODPM_VERSION) {
            return message.channel.send("Please specify the game and version `(e.g., !servers cod 1.1)`.");
        }

        const GAME = CODPM_GAME === "coduo" ? "CoD UO" : "COD";
        const CODPM_API = new URL(`/masterlist/${CODPM_GAME}/${CODPM_VERSION}`, 'https://api.cod.pm');

        const updateServerList = async () => {
            try {
                const codpm = await fetch(CODPM_API, { headers: { Accept: 'application/json' } });
                if (!codpm.ok) {
                    const errorResponse = await codpm.text();
                    console.error(`Error fetching server list: ${codpm.status} - ${codpm.statusText}`, errorResponse);
                    return message.channel.send(`Error fetching server list: ${codpm.status} - ${codpm.statusText}`);
                }

                const rawj = await codpm.json();
                const servers = rawj.servers;

                if (!servers || servers.length === 0) {
                    // If no servers are found, send a message and return
                    if (lastMessage) {
                        await lastMessage.delete();
                    }
                    lastMessage = await message.channel.send('No active servers found for this game and version.');
                    return;
                }

                const embeds = [];
                let currentEmbed = new MessageEmbed()
                    .setTitle(`Active ${GAME} ${CODPM_VERSION} Servers`)
                    .setColor('#0099ff')
                    .setTimestamp();

                let description = '**Server Name** | **Players** | **Map** | **IP:Port**\n--- | --- | --- | ---\n';

                for (let server of servers) {
                    const players = server.playerinfo.length - server.bots;

                    if (server.hidden > 0 || server.sv_maxclients > 72) continue;

                    const cleanText = (text) =>
                        text.replace(/[\u0000-\u001F\u007F]|(\s+)|(\^(\d))|(`)/g, '');

                    const serverName = cleanText(server.sv_hostname || 'Unnamed Server');
                    const playerCount = `${players}/${server.sv_maxclients}`;
                    const mapName = cleanText(server.mapname || 'Unknown Map');
                    const ipPort = `${server.ip}:${server.port}`;

                    const serverLine = `\`${serverName}\` | ${playerCount} | \`${mapName}\` | \`${ipPort}\`\n`;

                    // Check if adding this server line exceeds the embed size limit
                    if (description.length + serverLine.length > 4096) {
                        currentEmbed.setDescription(description);
                        embeds.push(currentEmbed);

                        currentEmbed = new MessageEmbed()
                            .setTitle(`Active ${GAME} ${CODPM_VERSION} Servers`)
                            .setColor('#0099ff')
                            .setTimestamp();

                        description = '**Server Name** | **Players** | **Map** | **IP:Port**\n--- | --- | --- | ---\n';
                    }

                    description += serverLine;
                }

                // If we have a valid description, set it
                if (description.trim().length > 0) {
                    currentEmbed.setDescription(description);
                    embeds.push(currentEmbed);
                }

                // Clear the previous bot message if it exists
                if (lastMessage) {
                    await lastMessage.delete();
                }

                // Send the updated embeds and keep a reference to the last message
                lastMessage = await message.channel.send({ embeds });
            } catch (error) {
                console.error('Error fetching server list:', error);
                await message.channel.send('There was an error fetching the server list. Please try again later.');
            }
        };

        // Initial fetch
        await updateServerList();

        // Set interval to update every minute
        setInterval(updateServerList, 60 * 1000);

        message.channel.send('Server list will auto-update every minute.');
    },
};
*/