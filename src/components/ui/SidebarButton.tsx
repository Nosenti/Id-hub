import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode, ReactElement } from 'react';

interface SidebarButtonProps {
	children: ReactNode;
	icon?: ReactElement;
	path: string;
	isMinimized?: boolean;
}

export default function SidebarButton({
	children,
	path,
	isMinimized = false
}: SidebarButtonProps) {
	const pathname = usePathname();
	const isActive = pathname === path;

	return (
		<Link
			href={path}
			className={`flex items-center rounded-r-md px-4
        ${isMinimized ? 'justify-center' : 'space-x-4'}
        py-3 cursor-pointer border-l-4 border-secondary mb-2
        ${
					isActive
						? 'bg-background text-foreground font-semibold border-secondary_green'
						: 'text-gray-300 hover:text-foreground hover:bg-secondary'
				}
      `}
		>
			
			{!isMinimized && <span className=''>{children}</span>}
		</Link>
	);
}
