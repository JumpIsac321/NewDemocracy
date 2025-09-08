import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../../types/Command';

const ping: Command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, _sequelize) {
		await interaction.reply('Pong!');
	},
};

export default ping
