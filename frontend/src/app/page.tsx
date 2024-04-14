import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/Button/Button"

export default function Home() {
  return (
    <main className="max-w-[1500px] m-auto p-6">
      <div className="grid grid-cols-2 gap-6 flex justify-center items-center">
        <div className="col-span-1 text-center px-28">
          <p className="mb-4">
            Whether you’re job hunting or looking to fill a vacancy, SMAART Recruitment can help. 
            We specialise in Contact Centre, Sales, Marketing and Office Support roles and ensure the very best service for both our clients and candidates.
          </p>
          <Button size="lg">
            <Link href="/job">Start Your Search</Link>
          </Button>
        </div>
        <div className="col-span-1">
          <Image src="/hot-air-balloon.gif" alt="logo" width={800} height={800} />
        </div>
      </div>
    </main>
  );
}
