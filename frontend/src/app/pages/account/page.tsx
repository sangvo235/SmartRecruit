"use server"
import UserDetails from "@/app/components/molecules/UserDetails/UserDetails";
import { getUserId } from "@/app/lib/actions";

const AccountPage = async () => {
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] m-auto p-6">
            <div className="text-5xl text-center pb-8">Account Details</div>
            <UserDetails userId={userId} />
        </main>
    )
}

export default AccountPage;
