"use server"
import UploadFile from '../../components/molecules/UploadFile/UploadFile';
import { getUserId } from '../../lib/actions';

const UploadResumePage = async () => {
    const userId = await getUserId();
    return (
        <main className="max-w-[1500px] m-auto p-6">
            <div className="text-5xl font-semibold leading-none tracking-tight text-center pb-8">Upload Resume</div>
            <UploadFile userId={userId} />
        </main>
    )
}

export default UploadResumePage;