import Test from '../../../components/molecules/Test/Test';
import { getUserId } from "@/app/lib/actions";

const OnlineAssessmentPage = async () => {
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] m-auto p-6">
            <Test userId={userId}/>
        </main>
    )
}

export default OnlineAssessmentPage;
