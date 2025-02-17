'use client'
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Signin } from '@/lib/actions';
import React from 'react';
import { toast } from 'react-hot-toast';

export default function page() {
	interface SigninResponse {
		success: boolean;
		token?: string;
		user?: object;
		message?: string;
		redirectUrl?: string;
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const response: SigninResponse = await Signin(formData);

		if (response.success) {
			localStorage.setItem('token', response.token!);
			localStorage.setItem('loggedInUser', JSON.stringify(response.user!));
			toast.success('Signed in successfully');
			if (response.redirectUrl) {
				window.location.href = response.redirectUrl;
			}
		} else {
			toast.error(response.message || 'Sign in failed');
		}
	};
	return (
		<div className='bg-secondary h-full flex justify-center items-center'>
			<Card className='w-[40%]'>
				<CardHeader>
					<CardTitle className='text-center mb-2 mt-2'>
						Welcome to ID Hub
					</CardTitle>
					<CardDescription className='text-center'>
						Please login to continue
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5 '>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									placeholder='email@example.com'
									name='email'
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Password</Label>
								<Input id='password' type='password' name='password' />
							</div>
							<Button className='w-full'>Login</Button>
						</div>
					</form>
					<div className='flex justify-center mt-4'>
						<span className='text-sm flex items-center'>
							No account yet?
							<Button variant='link' className='font-bold text-foreground' asChild>
								<a href="/signup">Sign Up</a>
							</Button>
						</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
