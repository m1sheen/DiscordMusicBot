import {
	AudioPlayer,
	StreamType,
	VoiceConnection,
	createAudioPlayer,
	createAudioResource,
	getVoiceConnection
} from "@discordjs/voice";
import { AudioPlayerStatus } from "@discordjs/voice";
import ytdlDiscord from "discord-ytdl-core";
import { Message } from "discord.js";
import i18next from "i18next";
import ytdl from "ytdl-core";

import { Command } from "./types";
import sendAudio from "../reply/audio";
import sendError from "../reply/error";
import sendSuccess from "../reply/success";
import { IAudio, SessionProvider } from "../types";

export const PlayCommand: Command = {
	info: {
		name: "play",
		description: "play command",
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
		const session = SessionProvider.get(voiceChannel.id);
		const playlist = session.playlist;
		if (!playlist.length) {
			return sendError(i18next.t("error.audio.emptyplaylist"), message.channel);
		}
		try {
			while (playlist.length !== 0) {
				const audio = playlist[0];
				session.subscribtion = voiceConnection.subscribe(play(audio));
				await sendAudio(audio, message.channel);
				await new Promise((resolve) =>
					session.subscribtion!.player.on(AudioPlayerStatus.Idle, resolve)
				);
				playlist.shift();
			}
		} catch {
			return sendError(i18next.t("error.audio.play"), message.channel);
		}
		return sendSuccess(i18next.t("success.audio.endofplaylist"), message.channel);
	}
};

function play(audio: IAudio): AudioPlayer {
	const stream = ytdlDiscord(audio.url, {
		quality: "highestaudio",
		highWaterMark: 1 << 25,
		opusEncoded: true
	});

	const resource = createAudioResource(stream, {
		inputType: StreamType.Opus,
		metadata: {
			title: audio.title
		}
	});
	const player = createAudioPlayer();
	player.play(resource);
	return player;
}
