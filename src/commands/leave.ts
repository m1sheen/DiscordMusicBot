import { Message } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";
import sendError from "../reply/error";
import { Command } from "./types";
import i18next from "i18next";

export const LeaveCommand: Command = {
	info: {
		name: "leave",
		description: "leave command",
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
		voiceConnection.disconnect();
	}
};
