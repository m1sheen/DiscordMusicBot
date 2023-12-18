import { Message } from "discord.js";

import { Command } from "../commands/types";
import { config } from "../config/config";

export default class {
	_commands: Map<string, Command>;

	constructor() {
		this._commands = new Map();
	}

	get(commandName: string) {
		return this._commands.get(commandName);
	}

	register(command: Command) {
		this._commands.set(command.info.name, command);
		return this;
	}

	handle(message: Message) {
		if (message.author.bot) {
			return;
		}

		message.delete(); // Optionally

		const args = message.content.slice(config.prefix.length).trim().split(" ");
		const cmd = args.shift()!.toLowerCase();

		const command = this._commands.get(cmd);
		if (!command) {
			return;
		}

		command.run(message, args);
	}
}
