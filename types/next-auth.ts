import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: number;
			name: string;
			email: string;
		} & DefaultSession["user"];
	}

	interface User extends DefaultUser {
		id: number;
		name: string;
		email: string;
	}

	interface JWT {
		id?: number;
		name?: string;
		email?: string;
	}
}
