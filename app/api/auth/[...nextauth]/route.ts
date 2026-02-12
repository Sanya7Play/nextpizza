import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

interface CredentialsType {
	email: string;
	password: string;
}

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: CredentialsType | undefined) {
				if (!credentials) return null;

				const user = await prisma.user.findFirst({
					where: { email: credentials.email },
					select: { id: true, email: true, fullName: true, password: true},
				});

				if (!user) return null;

				const isValid = await bcrypt.compare(
					credentials.password,
					user.password
				);

				if (!isValid) return null;

				return {
					id: Number(user.id),
					email: user.email,
					name: user.fullName ?? '',
				};
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,

	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = Number(user.id);
				token.email = user.email;
				token.name = user.name;
			}
			return token;
		},
		session({ session, token }) {
			if (session.user) {
				session.user.id = Number(token.id!);
				session.user.email = token.email!;
				session.user.name = token.name!;
			}
			return session;
		},
	},

	pages: {
		signIn: "/", // важно для credentials
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
