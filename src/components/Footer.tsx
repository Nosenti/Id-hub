import React from 'react'

export default function Footer() {
  return (
		<div className='bg-primary text-white pt-4 px-4 md:px-8 lg:px-12'>
			<div className='upper flex flex-col md:flex-row justify-between mx-auto w-full md:w-11/12 lg:w-10/12'>
				<div className='about mb-6 md:mb-0 md:w-1/2 lg:w-1/3'>
					<h3 className='font-bold mb-2'>About IDHub</h3>
					<p className='text-sm'>
						IDHub is your trusted digital identity solution, specializing in 
						helping Rwandans share the lost Identity cards so that they can be retrieved and reduce the instances of lost Identity cards. 
					</p>
				</div>
				<div className='con-socials md:w-1/2 lg:w-1/3'>
					<div className='contacts mb-4'>
						<h3 className='font-bold mb-2'>Contacts</h3>
						<p className='text-greyLogo text-sm'>
							Kicukiro, Kigali, Rwanda
						</p>
						<p className='text-greyLogo text-sm'>Phone: +250788888888</p>
					</div>
					<div className='socials'></div>
				</div>
			</div>
			<hr className='my-4' />
			<div className='lower text-center'>
				<p className='text-greyLogo font-semibold text-sm mb-4'>
					&copy; <span id='copyright-year'></span> {new Date().getFullYear()}{' '}
					IDHub. All rights reserved.
				</p>
			</div>
		</div>
	);
}
