import { Message } from "discord.js";

export interface Command {
	info: {
		name: string;
		description: string;
		usage: string;
		category: "general" | "music";
	};

	run: (message: Message, args: string[]) => void;
}
