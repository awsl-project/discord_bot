const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

dotenv.config();

const commands = [
    new SlashCommandBuilder().setName('se').setDescription('来点瑟瑟'),
    new SlashCommandBuilder().setName('mo').setDescription('摸鱼办提醒'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
