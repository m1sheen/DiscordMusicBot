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

/**
 * Easier to send errors instead of doing it over and over
 * @param {String} text - Message to send
 * @param {TextChannel | DMChannel | NewsChannel} channel - The Channel to send error to
 */
export default async (
	text: string,
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
	const embed = new EmbedBuilder().setColor("Green").setDescription(text);
	await channel.send({ embeds: [embed] });
};
