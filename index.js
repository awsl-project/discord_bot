// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ],
});
// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'se') {
        for (i = 0; i < 10; i++) {
            try {
                const res = await axios.get(process.env.API_URL + '/v2/random', { timeout: 1000 });
                const url = res.data;
                console.log('Get url: ' + url);
                await interaction.reply(url);
                return
            } catch (error) {
                console.error(error);
            }
        }
    } else if (commandName === 'mo') {
        for (i = 0; i < 10; i++) {
            try {
                const res = await axios.get(process.env.API_URL + '/moyu', { timeout: 1000 });
                const text = res.data;
                await interaction.reply(text);
                return
            } catch (error) {
                console.error(error);
            }
        }
    } else if (commandName === 'mjx') {
        for (i = 0; i < 10; i++) {
            try {
                const res = await axios.get(process.env.UOMG_URL, { timeout: 1000 });
                const text = res.data.imgurl;
                await interaction.reply(text);
                return
            } catch (error) {
                console.error(error);
            }
        }
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
});


client.on('messageCreate', async message => {
    if (message.content === 'ping') {
        message.reply('Pong!');
    }
    const prefix = "/";
    if (
        !message.content.startsWith(prefix)
        || message.author.bot
        || message.content.length > 200
    ) return;
    try {
        const res = await axios.post(
            process.env.API_URL + '/chatgpt',
            {
                token: process.env.API_TOKEN,
                text: message.content,
                chat_id: "discord"
            },
            { timeout: 10000 }
        );
        const text = res.data;
        await message.reply(text);
    } catch (error) {
        console.error(error);
    }
})
// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
