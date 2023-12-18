import { config as cfg } from "dotenv";

interface Config {
	token: string;
	prefix: string;
	perms: string;
}

cfg();
export const config: Config = {
	token: process.env.token! || "",
	prefix: process.env.prefix || "/",
	perms: process.env.perms || "2205281600"
};
