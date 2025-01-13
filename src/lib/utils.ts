import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saltAndHashPassword(password: string): string {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
}

export function verifyPassword(password: string, hash: string): boolean {
	return bcrypt.compareSync(password, hash);
}