"use server"
import { JobApplication } from "@/app/components/molecules/JobApplication/JobApplication";

const JobApplicationPage = () => {

    return (
        <main className="max-w-[1500px] text-center m-auto p-6">
            <div className="text-5xl font-semibold leading-none tracking-tight pb-8">Job Application Rankings</div>
                <JobApplication />
        </main>
    )
}

export default JobApplicationPage;
