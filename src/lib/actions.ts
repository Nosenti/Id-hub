'use server';

import { revalidatePath } from 'next/cache';
import User from '@/models/userModel';
import { connectToMongoClient } from './db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

// Define interfaces
interface IDDocument {
	nationalID: string;
	fullName: string;
	finder: UserData;
	createdAt?: Date;
}

interface User {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
	createdAt?: Date;
}

interface IDResponse {
	success: boolean;
	message: string;
	redirectUrl: string;
}

interface UserData {
	_id: string;
	name: string;
	email: string;
	nationalID?: string;
	phone?: string;
}

interface SignupResponse {
	success: boolean;
	message: string;
	token: string;
	redirectUrl?: string;
	user?: UserData;
}

export async function createID(formData: FormData): Promise<IDResponse> {
	try {
		const nationalID = formData.get('idNumber')?.toString();
		const fullName = formData.get('fullName')?.toString();
		const finderString = formData.get('finder')?.toString();

		if (!nationalID || !fullName || !finderString) {
			throw new Error('Missing required fields');
		}

		const finder = JSON.parse(finderString) as UserData;

		const newID: IDDocument = {
			nationalID,
			fullName,
			finder,
			createdAt: new Date()
		};

		const db = await connectToMongoClient();
		const collection = db.collection('ids');
		await collection.insertOne(newID);
		revalidatePath('/');
		return {
			success: true,
			message: 'ID created successfully',
			redirectUrl: '/in/ids'
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
				redirectUrl: ''
			};
		}
		return {
			success: false,
			message: 'An unknown error occurred',
			redirectUrl: ''
		};
	}
}

export async function Signup(formData: FormData): Promise<SignupResponse> {
	try {
		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();
		const passwordConfirm = formData.get('passwordConfirm')?.toString();

		if (!name || !email || !password || !passwordConfirm) {
			throw new Error('Missing required fields');
		}

		if (password !== passwordConfirm) {
			throw new Error('Passwords do not match');
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser: User = {
			name,
			email,
			password: hashedPassword, // Store hashed password
			passwordConfirm: hashedPassword,
			createdAt: new Date()
		};

		const db = await connectToMongoClient();
		const usersCollection = db.collection('users');

		// Check if user already exists
		const existingUser = await usersCollection.findOne({ email });
		if (existingUser) {
			throw new Error('User already exists');
		}

		const result = await usersCollection.insertOne(newUser);

		// Create JWT token
		const token = jwt.sign(
			{ userId: result.insertedId },
			process.env.JWT_SECRET || 'your-fallback-secret',
			{ expiresIn: '1d' }
		);

		revalidatePath('/');
		return {
			success: true,
			message: 'User created successfully',
			token,
			redirectUrl: '/login' // Include redirect URL in response
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
				token: '',
				redirectUrl: ''
			};
		}
		return {
			success: false,
			message: 'An unknown error occurred',
			token: '',
			redirectUrl: ''
		};
	}
}

export async function Signin(formData: FormData): Promise<SignupResponse> {
	try {
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		if (!email || !password) {
			throw new Error('Missing required fields...');
		}

		const db = await connectToMongoClient();
		const usersCollection = db.collection('users');

		// Find user by email
		const user = await usersCollection.findOne({ email });
		if (!user) {
			throw new Error('Invalid credentials');
		}

		// Compare passwords
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('Invalid credentials');
		}

		// Create JWT token
		const token = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET || 'your-fallback-secret',
			{ expiresIn: '1d' }
		);
		// Save user data to localStorage (only works on client-side)
		if (typeof window !== 'undefined') {
			localStorage.setItem(
				'user',
				JSON.stringify({
					id: user._id,
					email: user.email,
					name: user.name,
					nationalID: user.nationalID,
					phone: user.phone
				})
			);
		}
		console.log('Signed in successfully');
		revalidatePath('/');
		return {
			success: true,
			message: 'Signed in successfully',
			token,
			user: {
				_id: user._id.toString(),
				name: user.name,
				email: user.email,
				nationalID: user.nationalID,
				phone: user.phone
			},
			redirectUrl: '/in/ids' // Include redirect URL in response
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
				token: '',
				redirectUrl: ''
			};
		}
		return {
			success: false,
			message: 'An unknown error occurred',
			token: '',
			redirectUrl: ''
		};
	}
}
export async function EditProfile(formData: FormData): Promise<SignupResponse> {
	try {
		const email = formData.get('email')?.toString();
		const phone = formData.get('phone')?.toString();
		const nationalID = formData.get('nationalID')?.toString();

		if (!email) {
			throw new Error('Email is required');
		}

		const db = await connectToMongoClient();
		const usersCollection = db.collection('users');

		// Find and update user
		const user = await usersCollection.findOneAndUpdate(
			{ email },
			{
				$set: {
					phone: phone || undefined,
					nationalID: nationalID || undefined,
					updatedAt: new Date()
				}
			},
			{ returnDocument: 'after' }
		);

		if (!user) {
			throw new Error('User not found');
		}

		revalidatePath('/');
		return {
			success: true,
			message: 'Profile updated successfully',
			token: '', // No need to generate new token for profile update
			user: {
				_id: user._id.toString(),
				name: user.name,
				email: user.email,
				nationalID: user.nationalID,
				phone: user.phone
			},
			redirectUrl: '/in/profile'
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
				token: '',
				redirectUrl: ''
			};
		}
		return {
			success: false,
			message: 'An unknown error occurred',
			token: '',
			redirectUrl: ''
		};
	}
}

export async function ClaimID(
	id: string,
	claimer: UserData
): Promise<IDResponse> {
	try {
		console.log('id: ', id);
		console.log('claimer: ', claimer);
		if (!id || !claimer) {
			
			throw new Error('Missing required fields');
		}

		const db = await connectToMongoClient();
		const collection = db.collection('ids');

		console.log('Searching for ID:', id);
		console.log('ID type:', typeof id);
		// Find the ID document
		const idDoc = await collection.findOne({ _id: new ObjectId(id) });
		console.log('Found document:', idDoc);

		if (!idDoc) {
			throw new Error('ID not found');
		}

		// Check if the ID belongs to the claimer
		if (idDoc.finder && idDoc.finder?._id === claimer?._id) {
			throw new Error('You cannot claim your own ID');
		}

		// Update the ID document to mark it as claimed
		await collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: {
					claimed: true,
					claimedBy: claimer,
					claimedAt: new Date()
				}
			}
		);

		revalidatePath('/');
		return {
			success: true,
			message: 'ID claimed successfully',
			redirectUrl: '/in/ids'
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
				redirectUrl: ''
			};
		}
		return {
			success: false,
			message: 'An unknown error occurred',
			redirectUrl: ''
		};
	}
}
