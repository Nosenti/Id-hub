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
import { signIn } from '@/lib/auth';
import React from 'react';

export default function page() {
	return (
		<form action={async (formData) => {
			"use server"
			await signIn("credentials", formData)
		}} className='bg-secondary h-full flex justify-center items-center'>
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
					
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='email'>Email</Label>
								<Input id='email' placeholder='email@example.com' />
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Password</Label>
								<Input id='password' type='password' />
							</div>
							<Button>Login</Button>
							<span className='text-center text-sm'>
								No account yet?
								<Button variant='link' className='font-bold text-foreground'>
									Sign Up
								</Button>
							</span>
						</div>
					
				</CardContent>
			</Card>
		</form>
	);
}
