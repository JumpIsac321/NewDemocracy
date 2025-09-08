import { Collection } from "discord.js";
import { Command } from "../types/Command.ts"; // adjust path to where you define Command

declare module "discord.js" {
  // add your commands property to the Client interface
  interface Client {
    commands: Collection<string, Command>;
  }
}

