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
import { createID } from '@/lib/actions';
import React from 'react';
import toast from 'react-hot-toast';

export default function page() {
	interface FormElements extends HTMLFormControlsCollection {
		fullName: HTMLInputElement;
		idNumber: HTMLInputElement;
	}

	interface IDFormElement extends HTMLFormElement {
		readonly elements: FormElements;
	}

	interface CreateIDResponse {
		success: boolean;
		redirectUrl?: string;
		message?: string;
	}

	const handleSubmit = async (event: React.FormEvent<IDFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		formData.append('finder', localStorage.getItem('loggedInUser') || '');
		const response: CreateIDResponse = await createID(formData);

		if (response.success) {
			toast.success('ID Post Created successfully');
			window.location.href = response.redirectUrl!;
		} else {
			toast.error(response.message || 'Creating ID Record failed');
		}
	};
	return (
		<div className='min-h-screen flex justify-center items-center'>
			<Card className='w-[60%]'>
				<CardHeader>
					<CardTitle className='text-center mb-2 mt-2'>
						Posting ID Found
					</CardTitle>
					<CardDescription className='text-center'>
						Please Create an ID Record
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
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
