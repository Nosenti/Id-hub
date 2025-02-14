import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
	throw new Error('MONGODB_URI is not defined in environment variables');
}

let mongooseConnection: typeof mongoose | null = null;
let mongoClient: MongoClient | null = null;

export async function connectToMongoose() {
	if (!mongooseConnection) {
		mongooseConnection = await mongoose.connect(process.env.MONGODB_URI!);
	}
	return mongooseConnection;
}

export async function connectToMongoClient() {
	if (!mongoClient) {
		mongoClient = new MongoClient(process.env.MONGODB_URI!, {
			serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
		});
		await mongoClient.connect();
	}

	return mongoClient.db('id-hub-db');
}
