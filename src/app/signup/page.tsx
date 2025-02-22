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
import { Signup } from '@/lib/actions';
import React from 'react';
import { toast } from 'react-hot-toast';

export default function page() {
	interface SignupResponse {
		success: boolean;
		message?: string;
		redirectUrl?: string;
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const response: SignupResponse = await Signup(formData);

		if (response.success) {
			toast.success('Signed Up successfully');
			if (response.redirectUrl) {
				window.location.href = response.redirectUrl;
			}
		} else {
			toast.error(response.message || 'Sign Up failed');
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
						Please create an account to continue
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Full Name</Label>
								<Input id='name' placeholder='John Doe' name='name' />
							</div>
							<div className='flex flex-col space-y-1.5'>
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
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Confirm Password</Label>
								<Input
									id='confirmPassword'
									type='password'
									name='passwordConfirm'
								/>
							</div>
							<Button>Sign Up</Button>
						</div>
					</form>
					<div className='flex justify-center mt-4'>
						<span className='text-center text-sm'>
							Already have an account?
							<Button variant='link' className='font-bold text-foreground'>
								<a href='/login'>Login</a>
							</Button>
						</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
