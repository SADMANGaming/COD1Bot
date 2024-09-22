const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const commandFolders = fs.readdirSync('./commands'); 
    
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js')); // Read JS files in each subfolder

        for (const file of commandFiles) {
            const command = require(path.join(__dirname, `../commands/${folder}/${file}`)); // Dynamically load command
            client.commands.set(command.name, command);
        }
    }
};
