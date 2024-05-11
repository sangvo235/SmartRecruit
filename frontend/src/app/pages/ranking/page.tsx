"use server"
import { CandidateRanking } from "@/app/components/molecules/CandidateRanking/CandidateRanking";

const RankingPage = () => {

    return (
        <main className="max-w-[1500px] text-center m-auto p-6">
            <div className="text-5xl font-semibold leading-none tracking-tight pb-8">Candidate Rankings</div>
                <span className="mr-2 font-semibold">Online Assessment:</span>
                <CandidateRanking />
        </main>
    )
}

export default RankingPage;
