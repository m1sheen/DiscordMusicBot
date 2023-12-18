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
import i18next from "i18next";

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
	const embed = new EmbedBuilder()
		.setColor("Red")
		.setDescription(text)
		.setFooter({ text: i18next.t("error.somethingwentwrong") });
	await channel.send({ embeds: [embed] });
};
