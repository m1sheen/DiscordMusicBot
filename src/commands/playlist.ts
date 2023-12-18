import { getVoiceConnection } from "@discordjs/voice";
import { Message } from "discord.js";
import i18next from "i18next";

import { Command } from "./types";
import sendError from "../reply/error";
import sendSuccess from "../reply/success";
import { SessionProvider } from "../types";

export const PlaylistCommand: Command = {
	info: {
		name: "playlist",
		description: "playlist command",
		usage: "",
		category: "music"
	},

	run: async (message: Message) => {
		const voiceChannel = message.member!.voice.channel;
		if (!voiceChannel) {
			return sendError(i18next.t("error.voice.needvc"), message.channel);
		}
		const voiceConnection = getVoiceConnection(voiceChannel.guild.id);
		if (!voiceConnection) {
			return sendError(i18next.t("error.voice.needsamevc"), message.channel);
		}
		const playlist = SessionProvider.get(voiceChannel.id).playlist;
		if (!playlist.length) {
			return sendError(i18next.t("error.audio.emptyplaylist"), message.channel);
		}
		return sendSuccess(i18next.t("success.audio.playing"), message.channel);
	}
};
