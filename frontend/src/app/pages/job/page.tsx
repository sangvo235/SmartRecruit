import JobList from "@/app/components/molecules/JobList/JobList";

const JobListingPage = () => {
    return (
        <main className="max-w-[1500px] m-auto p-6">
        <div className="text-5xl text-center pb-8">Job Listings</div>
        <JobList />
        </main>
    )
}

export default JobListingPage;
