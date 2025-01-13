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
import React from 'react';

export default function page() {
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
					<form>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Full Name</Label>
								<Input id='name' placeholder='John Doe' />
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='email'>Email</Label>
								<Input id='email' placeholder='email@example.com' />
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Password</Label>
								<Input id='password' type='password' />
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Confirm Password</Label>
								<Input id='password' type='password' />
							</div>
							<Button>Sign Up</Button>
							<span className='text-center text-sm'>
								Already have an account?
								<Button variant='link' className='font-bold text-foreground'>
									Login
								</Button>
							</span>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
