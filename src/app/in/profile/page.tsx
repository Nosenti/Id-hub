/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'
import toast from 'react-hot-toast';
import { EditProfile } from '@/lib/actions';

export default function page() {
	const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

	interface FormEvent extends React.FormEvent<HTMLFormElement> {
		currentTarget: HTMLFormElement;
	}

	interface EditProfileResponse {
		success: boolean;
		token?: string;
		user?: any;
		redirectUrl?: string;
		message?: string;
	}

	const handleSubmit = async (event: FormEvent): Promise<void> => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const response: EditProfileResponse = await EditProfile(formData);

		if (response.success) {
			localStorage.setItem('token', response.token!);
			localStorage.setItem('loggedInUser', JSON.stringify(response.user));
			toast.success('Profile updated successfully');
			window.location.href = response.redirectUrl!;
		} else {
			toast.error(response.message || 'Updating profile failed');
		}
	}
  return (
		<div>
			<h1 className='mb-4 text-2xl font-bold'>Edit Profile</h1>
			<form onSubmit={handleSubmit}>
				<div className='grid w-full grid-cols-2 gap-8'>
					<div className='flex flex-col space-y-1.5'>
						<Label htmlFor='name'>Full Name</Label>
					  <Input id='name' placeholder='John Doe' name='name' defaultValue={ user.name} />
					</div>
					<div className='flex flex-col space-y-1.5'>
						<Label htmlFor='email'>Email</Label>
						<Input id='email' placeholder='email@example.com' name='email' defaultValue={user.email} />
					</div>
					<div className='flex flex-col space-y-1.5'>
						<Label htmlFor='idnumber'>ID Number</Label>
						<Input id='nationalID' name='nationalID' defaultValue={user.nationalID} />
					</div>
					<div className='flex flex-col space-y-1.5'>
						<Label htmlFor='phone'>Phone Number</Label>
						<Input id='phone' name='phone' defaultValue={user.phone} />
					</div>
				</div>
				<div className='mt-8 w-full'>
					<Button className='w-[50%]'>Save</Button>
				</div>
			</form>
		</div>
	);
}
