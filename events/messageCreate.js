const config = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error executing that command!');
        }
    },
};
/*
function codChat(){
    if (message.author.bot) return;
    if (message.channel.id === CHANNEL_ID) {
        rcon.send('say ^5[Discord]^7' + message.author.username + '^3: ^7' + message.content, (response) => {
    });
  }
}*/