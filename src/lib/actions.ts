'use server';

import { revalidatePath } from 'next/cache';
import User from '@/models/userModel';
import { connectToMongoClient } from './db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

// Define interfaces
interface IDDocument {
	nationalID: string;
	fullName: string;
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
}

interface SignupResponse {
	success: boolean;
	message: string;
	token: string;
	redirectUrl?: string;
}

export async function createID(formData: FormData): Promise<IDResponse> {
	try {
		const nationalID = formData.get('idNumber')?.toString();
		const fullName = formData.get('fullName')?.toString();

		if (!nationalID || !fullName) {
			throw new Error('Missing required fields');
		}

		const newID: IDDocument = {
			nationalID,
			fullName,
			createdAt: new Date()
		};

		const db = await connectToMongoClient();
		const collection = db.collection('ids');
		await collection.insertOne(newID);

		return { success: true, message: 'ID created successfully' };
	} catch (error) {
		console.log('error: ', error);
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error('An unknown error occurred');
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
		console.log('Signed in successfully');
		revalidatePath('/');
		return {
			success: true,
			message: 'Signed in successfully',
			token,
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
