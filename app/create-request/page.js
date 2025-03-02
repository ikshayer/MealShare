import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import CreateSession from './CreateSession';

export default async function CreateSessionPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
        return null;
    }

    return <CreateSession session={session} />;
}