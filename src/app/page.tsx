import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Solution from '@/components/Solution';
import Image from 'next/image';

export default function Home() {
	return (
		<div>
			<Header />
			<main>
				<div className='flex flex-col md:flex-row items-center px-4 md:px-12'>
					<div className='mb-8 md:mb-0 w-full md:w-1/2 pr-0 md:pr-12'>
						<div className='tagline text-primary text-2xl md:text-4xl font-bold mb-4'>
							Find the lost ID Card easily.
						</div>
						
						<div className='description mb-4'>
							<p className='mb-2'>
								Finding the lost Identity Card can be complex and time-consuming.
								We are using the power of community to Find lost Identity cards and make them reach their respective owners.
							</p>
							<p className='text-gray-500 font-bold'>
								If you have found the lost ID, report it on our platform and get a reward. If you have lost ID, check on our platform to see if it was found.
							</p>
						</div>
						
					</div>
					<div className='w-full md:w-1/2 overflow-hidden'>
						<div className=''>
							<Image
								src='/id.jpg'
								alt='picture of ID'
								width={1200}
								height={800}
								className='w-full h-[500px] object-cover'
								priority
							/>
						</div>
					</div>
				</div>
				<Solution />
			</main>
			<Footer />
		</div>
	);
}
