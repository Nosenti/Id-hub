'use client';
import React, { useEffect, useState } from 'react';
import getAllIdsFromDb from '@/lib/id-queries';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClaimID } from '@/lib/actions';
import toast from 'react-hot-toast';

export default function Page() {
	interface ID {
	  _id: string;
	  nationalID: string;
	  fullName: string;
	  claimed: boolean;
	}
	
	const [ids, setIds] = useState<ID[]>([]);

	useEffect(() => {
		const fetchIds = async () => {
			const res = await getAllIdsFromDb();
			//const ids = await res.json();
			const formattedIds = res.map(doc => ({
				_id: doc._id.toString(),
				nationalID: doc.nationalID,
				fullName: doc.fullName,
				claimed: doc.claimed
			}));
			setIds(formattedIds);
		};

		fetchIds();
	}, [])
	
	const storedUser = localStorage.getItem('loggedInUser');
	const claimer = storedUser ? JSON.parse(storedUser) : null;
	interface ClaimIDResponse {
		success: boolean;
		redirectUrl?: string;
		message?: string;
	}

	const handleSubmit = async (event: React.FormEvent, id: string): Promise<void> => {
		event.preventDefault();
		if (!claimer) {
			toast.error('You must be logged in to claim an ID');
			return;
		}
		const response: ClaimIDResponse = await ClaimID(id, claimer);

		if (response.success) {
			toast.success('Claiming ID is successfull');
			window.location.href = response.redirectUrl!;
		} else {
			toast.error(response.message || 'Claiming ID failed');
		}
	}

	return (
		<div>
			<div className='flex justify-end mb-8'>
				<Button>
					<a href='/in/id'>+ Post ID</a>
				</Button>
			</div>
			{ids.map((el, index) => {
				return (
					<div key={index} className='flex justify-center'>
						<Card className='w-full flex flex-col mb-4'>
							<CardHeader>
								<span className='flex justify-between'>
									<CardTitle>ID: {el.nationalID}</CardTitle>
									{el.claimed ? (
										<span className="text-gray-500">ID Claimed</span>
									) : (
										<Button onClick={(event) => handleSubmit(event, el._id)}>Claim ID</Button>
									)}
								</span>
							</CardHeader>
							<CardContent>Full Name: {el.fullName}</CardContent>
						</Card>
					</div>
				);
			})}
		</div>
	);
}
