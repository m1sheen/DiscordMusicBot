import { Client, GatewayIntentBits } from "discord.js";
import i18next from "i18next";

import { AddCommand } from "./commands/add";
import { JoinCommand } from "./commands/join";
import { LeaveCommand } from "./commands/leave";
import { PauseCommand } from "./commands/pause";
import { PlayCommand } from "./commands/play";
import { ResumeCommand } from "./commands/resume";
import { SkipCommand } from "./commands/skip";
import { config } from "./config/config";
import CommandHandler from "./handlers/commandHandler";
import VoiceStateUpdateHandler from "./handlers/voiceStateUpdateHandler";
import en from "../public/locales/en.json";
import ru from "../public/locales/ru.json";

(async () => {
	// Locales
	await i18next.init({
		lng: "ru",
		resources: {
			en: { translation: en },
			ru: { translation: ru }
		}
	});

	// Discord client with required intents
	const client = new Client({
		intents: [
			GatewayIntentBits.MessageContent,
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.GuildVoiceStates
		]
	});

	// Register commands
	const commandHandler = new CommandHandler()
		.register(JoinCommand)
		.register(LeaveCommand)
		.register(AddCommand)
		.register(PlayCommand)
		.register(PauseCommand)
		.register(ResumeCommand)
		.register(SkipCommand);

	// Register voice state update handler
	const voiceStateUpdateHandler = new VoiceStateUpdateHandler();

	// Add handlers to client
	client
		.on("messageCreate", commandHandler.handle.bind(commandHandler))
		.on("voiceStateUpdate", voiceStateUpdateHandler.handle.bind(voiceStateUpdateHandler));

	// Start client
	await client.login(config.token);
	console.info(i18next.t("info.botstarted"));
})();
