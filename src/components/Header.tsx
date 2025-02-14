import Link from "next/link";

//import Button from "./Button";
function Header() {
	return (
		<div className='flex justify-between items-center p-4 md:p-6 lg:p-8'>
			<div className='left flex items-center'>
				<span className='ml-2 text-greyLogo text-xl md:text-2xl lg:text-3xl font-bold text-primary'>
					<Link href='/'>IDHub</Link>
				</span>
			</div>

			<div className='right  py-1 flex flex-row'>
				<div className=' mr-5'>
					<Link
						href='/login'
						className='inline-block px-6 py-3 bg-primary  text-white font-medium text-xs leading-tight uppercase rounded hover:bg-primary/90 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
					>
						Login
					</Link>
				</div>
				
			</div>
		</div>
	);
}

export default Header;
