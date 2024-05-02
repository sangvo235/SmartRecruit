"use server"
import InvitationTabs from "@/app/components/molecules/InvitationTabs/InvitationTabs";

const InvitationsPage = () => {
    return (
        <main className="max-w-[1500px] m-auto p-6">
            <div className="text-5xl font-semibold leading-none tracking-tight text-center pb-8">Invitations</div>
            <div className="flex flex-col items-center">
                <InvitationTabs />
            </div>
        </main>
    )
}

export default InvitationsPage;