import { auth } from '@/auth';
import SignInForm from '@/components/auth/SignInForm';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
    const session = await auth()
    const user = session?.user

    if (user) {
        redirect('/')
    }   
    
    return (
        <div className='w-full'>
            <SignInForm />
        </div>
    );
}