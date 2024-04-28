"use server"
import FullJobDetails from "@/app/components/molecules/FullJobDetails/FullJobDetails";

const JobDetailsPage = async () => {
    return (
        <main className="max-w-[1500px] m-auto p-6">
            <FullJobDetails id={""} title={""} contract_type={""} company={""} location={""} industry={""} salary={0} description={""} intro={""} image_url={""} recruiter={""} recruiter_name={""} recruiter_email={""} created_at={""} />
        </main>
    );
};

export default JobDetailsPage;
