"use client"
import React from 'react';
import Link from 'next/link';
import { NAV_LINKS_DEFAULT, NAV_LINKS_USER, NAV_LINKS_ADMIN } from '../../../../../constants';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
    userId: string | null;
    isAdmin: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ userId, isAdmin }) => {
    const currentPath = usePathname();

    const isActive = (href: string) => {
        return currentPath === href ? 'text-accent' : '';
    };

    const navLinks = userId ? 
        (isAdmin ? NAV_LINKS_ADMIN : NAV_LINKS_USER) : 
        NAV_LINKS_DEFAULT;
        
    return (
        <ul className="h-full sm:gap-4 sm:flex sm:text-xs md:flex md:gap-8 md:text-sm lg:text-lg lg:flex lg:gap-12">
            {navLinks.map((link) => (
                <Link href={link.href} key={link.key} className={isActive(link.href) ? 'active' : ''}>
                    {link.label}
                </Link>
            ))}
        </ul>
    );
};

export default NavLinks;
