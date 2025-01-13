import NextAuth,  { Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { MongoClient } from 'mongodb';
import { saltAndHashPassword } from '@/lib/utils';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
		}
	}
}

if (!process.env.MONGODB_URI) {
	throw new Error('MONGODB_URI is not defined in environment variables');
}
const client = new MongoClient(process.env.MONGODB_URI);

async function getUserFromDb(email: string, passwordHash: string) {
	await client.connect();
	const db = client.db('id-hub-db');
	const collection = db.collection('users');
	const user = await collection.findOne({ email, password: passwordHash });
	return user;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				
				const pwHash = saltAndHashPassword(credentials.password);
				const user = await getUserFromDb(credentials.email, pwHash);

				if (user) {
					return { id: user._id.toString(), email: user.email };
				}
				return null;
			}
		})
	],
	session: {
		strategy: 'jwt'
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }: { session: Session, token: JWT }) {
			if (session.user) {
				session.user.id = token.id as string;
			}
			return session;
		}
	}
});
