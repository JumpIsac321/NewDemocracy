import { ChannelType, ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { Command } from "../../types/Command";
import { Sequelize } from "sequelize";
import { main_channel } from "../../../config.json"

const vote: Command = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("vote for who should be president")
    .addIntegerOption(option => 
      option.setName('candidate')
        .setDescription("The candidate who you want to vote for")
        .setRequired(true)
        .addChoices(
          { name: "Tyson", value: 1 },
          { name: "Not Tyson", value: 2 }
        )),
  async execute(interaction: ChatInputCommandInteraction, sequelize: Sequelize){
    const candidate = interaction.options.getInteger("candidate")
    const TysonVotes = sequelize.models.TysonVotes
    
    if (candidate === 1){
      await TysonVotes.increment('votes', {where: {id: 1} })
    }else{
      await TysonVotes.increment({votes: 2}, {where: {id: 1} })
    }

    await interaction.reply({content: "Thank you for voting", flags: MessageFlags.Ephemeral})
    const MainChannel = await interaction.client.channels.fetch(main_channel)
    if (MainChannel == null || MainChannel.type !== ChannelType.GuildText){
      return
    }
    if (candidate === 2){
      MainChannel.send(`:rotating_light::rotating_light::rotating_light:User <@${interaction.user.id}> has voted for Not Tyson <@778332672799932417>:rotating_light::rotating_light::rotating_light:`)
    }
  }
}

export default vote
