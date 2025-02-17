"use server"
import mongoose from 'mongoose';
import { connectToMongoClient } from './db';

// Define the schema for your IDs
const idSchema = new mongoose.Schema(
	{
		id_number: String,
		full_name: String
	},
	{ timestamps: true }
);

// Create the model
const Id = mongoose.models.Id || mongoose.model('Id', idSchema, 'ids');

export default async function getAllIdsFromDb() {
	
	try {
		await connectToMongoClient();
		const ids = await Id.find({});
		return ids;
	} catch (error) {
		console.error('Error fetching ids:', error);
		throw error;
	}
}
