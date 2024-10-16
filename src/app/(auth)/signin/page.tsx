
// import { useSession } from 'next-auth/react';

// import { auth } from '@/src/auth';
import SignInForm from '@/components/auth/SignInForm';

const page = async () => {
    // const session = await auth();
    
    
    return (
        <div className='w-full'>
            <SignInForm />
        </div>
    );
};

export default page;