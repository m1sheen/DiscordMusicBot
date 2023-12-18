import { PlayerSubscription } from "@discordjs/voice";

export interface IAudio {
	title: string;
	url: string;
	img: string;
	duration: Number;
}

export interface ISession {
	playlist: IAudio[];
	subscribtion: PlayerSubscription | undefined;
}

const _sessions: { [id: string]: ISession } = {};

export const SessionProvider = {
	set: (id: string, session: ISession) => (_sessions[id] = session),
	get: (id: string) => _sessions[id],
	getAll: () => _sessions,
	delete: (id: string) => delete _sessions[id]
};
