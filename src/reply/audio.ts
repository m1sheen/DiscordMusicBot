import {
	DMChannel,
	EmbedBuilder,
	NewsChannel,
	PartialDMChannel,
	PrivateThreadChannel,
	PublicThreadChannel,
	StageChannel,
	TextChannel,
	VoiceChannel
} from "discord.js";

import { IAudio } from "../types";

/**
 * Easier to send errors instead of doing it over and over
 * @param {String} text - Message to send
 * @param {TextChannel | DMChannel | NewsChannel} channel - The Channel to send error to
 */
export default async (
	audio: IAudio,
	channel:
		| DMChannel
		| PartialDMChannel
		| NewsChannel
		| StageChannel
		| TextChannel
		| PrivateThreadChannel
		| PublicThreadChannel
		| VoiceChannel
): Promise<void> => {
	const embed = new EmbedBuilder()
		.setColor("Blue")
		.setThumbnail(audio.img)
		.setDescription(audio.title);
	await channel.send({ embeds: [embed] });
};
