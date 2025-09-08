import { Client, Events } from 'discord.js';
import { DataTypes, Sequelize } from 'sequelize';

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client: Client, sequelize: Sequelize) {
    console.log("ran!!")
		console.log(`Ready! Logged in as ${client.user?.tag}`);
    const TysonVotes = sequelize.define(
      "TysonVotes",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
          primaryKey: true,
        },
        votes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        }
      },
      {
        freezeTableName: true,
      }
    )
    await TysonVotes.sync()
	},
};

