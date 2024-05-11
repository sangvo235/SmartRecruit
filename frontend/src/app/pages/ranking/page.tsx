"use server"
import { ComboboxDemo } from "@/app/components/atoms/Combobox/Combobox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/atoms/Card/Card";
import { Scroll } from "lucide-react";

const RankingPage = () => {
    return (
        <main className="max-w-[1500px] m-auto p-6">
            <div className="text-5xl font-semibold leading-none tracking-tight text-center pb-8">Candidate Rankings</div>
            Online Assessment: 
            <ComboboxDemo />

            <Card>
                <CardHeader>
                    <CardTitle>hello</CardTitle>
                    <CardDescription>
                        <Scroll className="w-4 h-4 mr-2" />
                        <span>Your Score: </span>
                        <span>score / 100</span>
                    </CardDescription>
                </CardHeader>

                <CardContent >
                    hello
                </CardContent>

                <CardFooter>
                        Apply 
                </CardFooter>
            </Card>
        </main>
    )
}

export default RankingPage;
