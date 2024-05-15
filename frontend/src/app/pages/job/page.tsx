"use server"
import JobList from "@/app/components/molecules/JobList/JobList";
import { getUserId } from "@/app/lib/actions";

const JobListingPage = async () => {
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] m-auto p-6">
            <div className="text-5xl font-semibold leading-none tracking-tight text-center pb-8">Job Listings</div>
            <JobList userId={userId} />
        </main>
    )
}

export default JobListingPage;
