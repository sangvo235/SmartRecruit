"use server"
import FullJobDetails from "@/app/components/molecules/FullJobDetails/FullJobDetails";
import { getUserId } from "@/app/lib/actions";

const JobDetailsPage = async () => {
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] m-auto p-6">
            <FullJobDetails userId={userId} id={""} title={""} contract_type={""} company={""} location={""} industry={""} salary={0} description={""} intro={""} image_url={""} recruiter={""} recruiter_name={""} recruiter_email={""} created_at={""} />
        </main>
    );
};

export default JobDetailsPage;
