import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please tell us your name'],
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email']
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minLength: 8
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password']
	}
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;