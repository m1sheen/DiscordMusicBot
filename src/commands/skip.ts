import { getVoiceConnection } from "@discordjs/voice";
import { Message } from "discord.js";
import i18next from "i18next";

import { Command } from "./types";
import sendError from "../reply/error";
import sendSuccess from "../reply/success";
import { SessionProvider } from "../types";

export const SkipCommand: Command = {
	info: {
		name: "skip",
		description: "skip command",
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
		try {
			SessionProvider.get(voiceChannel.id).subscribtion!.player.stop();
		} catch {
			return sendError(i18next.t("error.audio.nothingtoskip"), message.channel);
		}
		return sendSuccess(i18next.t("success.audio.skip"), message.channel);
	}
};
