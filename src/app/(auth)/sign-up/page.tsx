import { auth } from "@/auth";
import SignUpForm from "@/components/auth/SignUpForm";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
    const session = await auth()
    const user = session?.user

    if (user) {
        redirect('/')
    }

    return (
        <div className='w-full'>
            <SignUpForm />
        </div>
    );
}