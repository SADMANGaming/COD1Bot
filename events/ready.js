module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log("Website: https://cod1.rf.gd");
        console.log("Discord: .sadman_");
        console.log("========Call of Duty Discord Bot========");
        console.log("        Initializing Bot");
        console.log(`   Logged in as ${client.user.tag}!`);
        console.log("        Initializing Done");

        const setRandomPresence = () => {
            const activities = [
                '!help for all commands.',
                'Made by Sadman.',
            ];
            
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
            client.user.setPresence({
                activities: [{ name: randomActivity, type: 'LISTENING' }],
                status: 'online',
            });
        };
        setRandomPresence();

        setInterval(setRandomPresence, 60000);
    },
};
