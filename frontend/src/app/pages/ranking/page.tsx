"use server"
import { ComboboxDemo } from "@/app/components/atoms/Combobox/Combobox";

const RankingPage = () => {
    return (
        <main className="max-w-[1500px] m-auto p-6">
            <div className="text-5xl font-semibold leading-none tracking-tight text-center pb-8">Online Assessment Candidate Rankings</div>

            <ComboboxDemo />
            
        </main>
    )
}

export default RankingPage;
