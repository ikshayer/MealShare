
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import MyProfile from './MyProfile'
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
        return null;
    }

    const plainSession = JSON.parse(JSON.stringify(session));

    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user.id}`);
    const userData = await userResponse.json();

    const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user.id}/events`);
    const postsData = await postsResponse.json();

    return (
        <MyProfile initialProfile={userData} initialPosts={postsData} session={plainSession}/>
    );
}