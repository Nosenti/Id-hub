'use client';
import React, { useEffect, useState } from 'react';
import getAllIdsFromDb from '@/lib/id-queries';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/card';

export default function Page() {
	interface IdDocument {
		nationalID: string;
		finder?: {
			name: string;
			email: string;
			phone: string;
		};
	}
	
	const [ids, setIds] = useState<IdDocument[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const ids = await getAllIdsFromDb();
			const formattedIds = ids.map(id => ({
				nationalID: id.nationalID,
				finder: id.finder
			}));
			setIds(formattedIds);
		};

		fetchData();
	}, []);

	const myId = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.nationalID;
	const matchedId = ids.find(id => id.nationalID === myId && id.finder);

	return (
		<div>
			{matchedId ? (
				<div>
					<h1 className='text-2xl font-bold'>Notifications</h1>
					<Card>
						<CardHeader>
							<CardTitle>Your ID was found</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Your Id was found by:</p>
							<div className="mt-2">
								<p className="font-semibold">{matchedId.finder?.name}</p>
								<p className="text-sm text-gray-600">Email: {matchedId.finder?.email}</p>
								{
									matchedId.finder?.phone ? <p>Contact: { matchedId.finder?.phone}</p> : ''
								}
							</div>
						</CardContent>
					</Card>
				</div>
			) : (
				<p>No notification</p>
			)}
		</div>
	);
}
