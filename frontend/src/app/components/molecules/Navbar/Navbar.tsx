"use client";

import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '../../../../../constants';
import Profile from '../Profile/Profile';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const currentPath = usePathname();

    const isActive = (href: string) => {
        return currentPath === href ? 'text-accent' : '';
    }

    return (

        <nav className="w-full fixed top-0 left-0 py-6 border-b bg-smartblue z-10 text-lg font-semibold">
            <div className="max-w-[1500px] mx-auto px-6 text-white">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image 
                            src="/smaart-logo.svg"
                            alt="Smart Recruit Logo"
                            width={200}
                            height={50}
                        />
                    </Link>

                    <ul className="hidden h-full gap-12 lg:flex">
                        {NAV_LINKS.map((link) => (
                            <Link href={link.href} key={link.key} className={isActive(link.href) ? 'active' : ''}>
                                {link.label}
                            </Link>
                        ))}
                    </ul>
                    
                    <Profile />

                </div>
            </div>
        </nav>
    );
    }

export default Navbar;