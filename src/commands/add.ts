import { getVoiceConnection } from "@discordjs/voice";
import { Message } from "discord.js";
import i18next from "i18next";
import ytdl from "ytdl-core";

import { Command } from "./types";
import sendError from "../reply/error";
import sendSuccess from "../reply/success";
import { IAudio, SessionProvider } from "../types";

export const AddCommand: Command = {
	info: {
		name: "add",
		description: "add command",
		usage: "",
		category: "music"
	},

	run: async (message: Message, args: string[]) => {
		const voiceChannel = message.member!.voice.channel;
		if (!voiceChannel) {
			return sendError(i18next.t("error.voice.needvc"), message.channel);
		}
		const voiceConnection = getVoiceConnection(voiceChannel.guild.id);
		if (!voiceConnection) {
			return sendError(i18next.t("error.voice.needsamevc"), message.channel);
		}
		const playlist = SessionProvider.get(voiceChannel.id).playlist;
		try {
			for (const url of args) {
				const videoInfo = await ytdl.getInfo(url);
				const audio: IAudio = {
					title: videoInfo.videoDetails.title,
					url: videoInfo.videoDetails.video_url,
					img: videoInfo.videoDetails.thumbnails[0].url,
					duration: Number(videoInfo.videoDetails.lengthSeconds) * 1000
				};
				playlist.push(audio);
			}
		} catch {
			return sendError(i18next.t("error.audio.search"), message.channel);
		}
		return sendSuccess(i18next.t("success.audio.add", { count: args.length }), message.channel);
	}
};
