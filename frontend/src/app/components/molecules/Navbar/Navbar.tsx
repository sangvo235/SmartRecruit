import Link from 'next/link';
import Image from 'next/image';
import Profile from '../Profile/Profile';
import NavLinks from '../NavLinks/NavLinks';
import { getUserId } from '@/app/lib/actions';

const Navbar = async () => {
    const userId = await getUserId();

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

                    <NavLinks userId={userId}/>
                    
                    <Profile userId={userId}/>

                </div>
            </div>
        </nav>
    );
    }

export default Navbar;