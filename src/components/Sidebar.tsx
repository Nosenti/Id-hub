'use client'
import React from 'react'
import SidebarButton from './ui/SidebarButton'
import { Button } from './ui/button';
import toast from 'react-hot-toast';

export default function Sidebar() {
  return (
		<>
			<div className='bg-primary w-64 min-h-screen text-white flex flex-col p-6 fixed justify-between'>
				<div>
					<div className='my-4 text-2xl font-bold'>IDHub</div>
					<ul className='mt-4'>
						<li>
							<SidebarButton path='/in/ids'>Posts</SidebarButton>
						</li>
						<li>
							<SidebarButton path='/in/notifications'>Notifications</SidebarButton>
						</li>
						<li>
							<SidebarButton path='/in/profile'>Profile</SidebarButton>
						</li>
					</ul>
				</div>

				<div>
					<Button 
						variant='secondary' 
						onClick={() => {
							localStorage.removeItem('loggedInUser');
							toast.success('Logged out successfully!');
							window.location.href = '/login';
						}}
					>
						Signout
					</Button>
				</div>
			</div>
			{/* This div acts as a spacer to prevent content overlap */}
			<div className='w-64'></div>
		</>
	);
}
