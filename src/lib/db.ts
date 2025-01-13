import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
	throw new Error('MONGODB_URI is not defined in environment variables');
}

mongoose.connect(process.env.MONGODB_URI);