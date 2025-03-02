'use client'

import ProfileCard from "@components/ProfileCard"
import Feed from "@components/Feed";
import { useSession, getSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@hooks/use-toast";

export default function MyProfile({initialPosts, initialProfile, session}){

    
    const [post, setPost] = useState(initialPosts)
    const [isSubmitting, setSubmitting] = useState(false)
    
    const {toast} = useToast()

    const [profile, setProfile] = useState(initialProfile)

    const handleDelete = async () => {
        const fetchDelete = async () => {

            setSubmitting(true)

            try{
            const response = await fetch(`/api/session/${selectedPost._id}`, {
                method: 'DELETE',
                
            })
            if(response.ok){
                toast({
                    variant: 'success',
                    title: 'Successfully Deleted!',
                    description: 'You have successfully deleted the event!'
                })
                const filteredEvents = post.filter((event) => event._id !== selectedPost._id)
                setPost(filteredEvents)
    
                
            }
            }
            catch(err){
                toast({
                    variant: 'destructive',
                    title: 'Failed to Delete the event!',
                    description: 'Please try again later.'
                })
                console.log(err)
            }
            finally{
                setSubmitting(false)
            }
        }

        if(session?.user.id === selectedPost.creator._id) fetchDelete()
    }   

    return(
        <>
        <ProfileCard
        profile={profile}
        setProfile={setProfile}
        session={session}
        />
        
        
        </>
    )
}