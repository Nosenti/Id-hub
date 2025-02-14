/* eslint-disable react/no-unescaped-entities */
const Solution = () => {
	return (
		<div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
			<div className='max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12'>
				
				<h2 className='max-w mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
					
					How It Works
				</h2>
				
			</div>
			<div className='relative grid gap-12 row-gap-6 mb-8 md:row-gap-8 lg:grid-cols-3 sm:grid-cols-2'>
				
				<div className='p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2'>
					<div className='flex items-center justify-between mb-2'>
						<p className='text-lg font-bold leading-5 text-primary w-3/4'>
							Report Missed ID
						</p>
					</div>
					<div className='text-sm text-gray-900'>
						<ul className='list-disc pl-5'>
							<li>
								<strong>Create an account:</strong> Create an account with your information to be able to post about the ID you lost.
							</li>
							<li>
								<strong>Create a post with ID Info: </strong> Create a post about the lost ID with information for people to see it.
							</li>
						</ul>
					</div>
				</div>
				<div className='p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2'>
					<div className='flex items-center justify-between mb-2'>
						<p className='text-lg font-bold leading-5 text-primary w-3/4'>
							Claim ID as Found
						</p>
					</div>
					<div className='text-sm text-gray-900'>
						<ul className='list-disc pl-5'>
							<li>
								<strong>Claim ID as found: </strong>
								If you received ID posted, click on claim to let the owner know you have it.
							</li>
							<li>
								<strong>Wait to be contacted:</strong> The owner will receive notification with information about you and contact you for exchange
							</li>
							
						</ul>
					</div>
				</div>
				<div className='p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2'>
					<div className='flex items-center justify-between mb-2'>
						<p className='text-lg font-bold leading-5 text-primary w-3/4'>
							Exchange ID
						</p>
					</div>
					<div className='text-sm text-gray-900'>
						<ul className='list-disc pl-5'>
							<li>
								<strong>Negotiate how to exchange ID:</strong> The owner and person who has ID will negotiate how to meet or send the ID and the cost related to that.
							</li>
							<li>
								<strong>Reward:</strong> The standard reward that goes to the person who found the ID is 5000 RWF. The reward is paid by the person who lost ID.
							</li>
							
						</ul>
					</div>
				</div>
				
			</div>
			
		</div>
	);
};

export default Solution;
