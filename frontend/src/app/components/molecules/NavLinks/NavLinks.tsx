"use client"
import React from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '../../../../../constants';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
    userId: string | null;
}

const NavLinks: React.FC<NavLinksProps> = ({ userId }) => {

    const currentPath = usePathname();

    const filteredNavLinks = userId ? NAV_LINKS : NAV_LINKS.filter(link => link.key === 'home' || link.key === 'job');

    const isActive = (href: string) => {
        return currentPath === href ? 'text-accent' : '';
    }

    return (
        <ul className="hidden h-full gap-12 lg:flex">
            {filteredNavLinks.map((link) => (
                <Link href={link.href} key={link.key} className={isActive(link.href) ? 'active' : ''}>
                    {link.label}
                </Link>
            ))}
        </ul>
    ); 
}

export default NavLinks;
