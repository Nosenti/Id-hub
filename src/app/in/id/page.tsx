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
import { createID } from '@/lib/actions';
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
						Please Create an ID Record
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={createID}>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Full Name</Label>
								<Input id='name' placeholder='John Doe' name='fullName' />
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='email'>ID Number</Label>
								<Input id='id number' name='idNumber'/>
							</div>
							
							<Button>Save ID</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
