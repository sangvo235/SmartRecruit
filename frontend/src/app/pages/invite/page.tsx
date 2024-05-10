"use server"
import InvitationTabs from "@/app/components/molecules/InvitationTabs/InvitationTabs";
import { getUserId } from "@/app/lib/actions";

const InvitationsPage = async () => {
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] m-auto p-6">
            <div className="text-5xl font-semibold leading-none tracking-tight text-center pb-8">Invitations</div>
            <div className="flex flex-col items-center">
                <InvitationTabs userId={userId}/>
            </div>
        </main>
    )
}

export default InvitationsPage;