'use server';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

// Define interfaces
interface IDDocument {
	nationalID: string;
	fullName: string;
	createdAt?: Date;
}

interface IDResponse {
	success: boolean;
	message: string;
}

export async function createID(formData: FormData): Promise<IDResponse> {
	const nationalID = formData.get('id_number') as string;
	const fullName = formData.get('full_name') as string;
	// Validate inputs
	if (!nationalID || !fullName) {
		throw new Error('All fields are required');
	}

	// Create mongoose schema if not already defined elsewhere
	const idSchema = new mongoose.Schema({
		nationalID: {
			type: String,
			required: true,
			unique: true
		},
		fullName: {
			type: String,
			required: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	});

	// Get model
	const ID = mongoose.models.ID || mongoose.model<IDDocument>('ID', idSchema);

	// Save to database
	try {
		const newID = new ID({
			nationalID,
			fullName
		});
		await newID.save();
		revalidatePath('/id');
		return { success: true, message: 'ID created successfully' };
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error('An unknown error occurred');
	}
}
