'use server';
import mongoose from 'mongoose';
import { connectToMongoClient } from './db';
export default async function getAllIdsFromDb() {
	try {
		const db = await connectToMongoClient();
		const collection = db.collection('ids');
		const ids = await collection.find({}).toArray();
		return ids;
	} catch (error) {
		console.error('Error fetching ids:', error);
		await mongoose.connection.close();
		throw error;
	}
}
