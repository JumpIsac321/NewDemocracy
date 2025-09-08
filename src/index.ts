import fs from 'node:fs'
import path from 'node:path';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { db_name, db_username, db_password, token } from '../config.json' 
import { Sequelize } from "sequelize";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const sequelize = new Sequelize(`mysql://${db_username}:${db_password}@localhost/${db_name}`)

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath).default;
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath).default;
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, sequelize));
	} else {
		client.on(event.name, (...args) => event.execute(...args, sequelize));
	}
}

client.login(token);
