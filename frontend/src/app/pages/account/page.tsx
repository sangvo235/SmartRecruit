"use client"
import AccountDetails from "@/app/components/molecules/AccountDetails/AccountDetails";

const AccountPage = () => {
    return (
        <main className="max-w-[1500px] m-auto p-6">
            <div className="text-5xl text-center pb-8">Accounts Page</div>
            <AccountDetails />
        </main>
    )
}

export default AccountPage;
