import { VoiceState } from "discord.js";

import { SessionProvider } from "../types";

export default class {
	handle(oldState: VoiceState, newState: VoiceState) {
		if (oldState.channelId && !newState.channelId) {
			SessionProvider.delete(oldState.channelId);
		}
	}
}
