import React from 'react';
import Sidebar from '@/components/Sidebar'

export default function layout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
	<div className='flex'>
		  <aside className='h-full flex-1'>
			  <Sidebar/>
		  </aside>
		  <main className='h-full p-6 w-full'>
			  {children}
		  </main>
	</div>
  )
}
