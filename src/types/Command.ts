import { ChatInputCommandInteraction } from "discord.js";
import { Sequelize } from "sequelize";

export interface Command {
  data: { name: string; description?: string };
  execute: (interaction: ChatInputCommandInteraction, sequelize: Sequelize) => Promise<void> | void;
}
