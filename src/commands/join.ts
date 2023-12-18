import { joinVoiceChannel } from "@discordjs/voice";
import { Message } from "discord.js";
import i18next from "i18next";

import { Command } from "./types";
import sendError from "../reply/error";
import { SessionProvider } from "../types";

export const JoinCommand: Command = {
	info: {
		name: "join",
		description: "join command",
		usage: "",
		category: "music"
	},

	run: async (message: Message) => {
		const voiceChannel = message.member!.voice.channel;
		if (!voiceChannel) {
			return sendError(i18next.t("error.voice.needvc"), message.channel);
		}
		joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator
		});

		SessionProvider.set(voiceChannel.id, {
			playlist: [],
			subscribtion: undefined
		});
	}
};
