"use client"
import AuthenticationTab from "../../components/molecules/AuthenticationTabs/AuthenticationTabs";
import Image from "next/image";

const AuthenticationPage = () => {
    return (
        <main className="max-w-[1250px] m-auto p-6">
            <div className="grid grid-cols-2 gap-6">
                <AuthenticationTab /> 
                <div className="col-span-1 flex justify-center items-center">
                    <Image src="/hot-air-balloon.gif" alt="logo" width={400} height={400} />
                </div>
            </div>
        </main>
    )
}

export default AuthenticationPage;
