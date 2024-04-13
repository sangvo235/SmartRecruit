import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '../../../../constants';
import { Button } from "@/app/components/button/button"
import { User } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="w-full fixed top-0 left-0 py-6 border-b bg-smartblue z-10">
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
                            <Link href={link.href} key={link.key}>
                                {link.label}
                            </Link>
                        ))}
                    </ul>
                    
                    <div className="lg:flex-center">
                        <Button icon={<User />}>Login</Button>
                    </div>

                </div>
            </div>
        </nav>
    );
    }

export default Navbar;