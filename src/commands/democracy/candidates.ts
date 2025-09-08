import { ChannelType, ChatInputCommandInteraction, EmbedBuilder, MessageFlags, SlashCommandBuilder } from "discord.js";
import { Command } from "../../types/Command";
import { Sequelize } from "sequelize";
import { main_channel } from "../../../config.json"

const candidates: Command = {
  data: new SlashCommandBuilder()
    .setName("candidates")
    .setDescription("view the candidates"),
  async execute(interaction: ChatInputCommandInteraction, sequelize: Sequelize){
    const TysonVotes = sequelize.models.TysonVotes
    const TysonVotesEntry = await TysonVotes.findByPk(1)
    if (TysonVotesEntry == null){
      return
    }
    const TysonVotesCount = TysonVotesEntry.get("votes")
    const embed = new EmbedBuilder()
      .setDescription(`Tyson: ${TysonVotesCount}\nNot Tyson: 0`)
    interaction.reply({embeds: [embed]})
  }
}

export default candidates
