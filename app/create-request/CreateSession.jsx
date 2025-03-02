'use client'

import Create from "@components/Create"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@hooks/use-toast"
import Chatbot from "@components/ChatBox"
function CreateSession(){

    const {data: session} = useSession()
    const {toast} = useToast()

    const router = useRouter()

    const [isChecked, setChecked] = useState(false)
    const [post, setPost] = useState({
        grain: '',
        required: '',
    })
    const [isSubmitting, setSubmitting] = useState(false)

    const handleSubmitting = async(e) =>{
        e.preventDefault();

        if(!session?.user){
            router.push('/')
            return
        }

        
        if((!post.food) || !post.requirement){
            toast({
                variant: 'destructive',
                title: "Incomplete Form!",
                description: "Please fill up all the options."
            })
        }
        
        else{
            setSubmitting(true);
            
            try{
                const response = await fetch('/api/session/new', {
                    method: "POST",
                    body: JSON.stringify({
                        userId: session.user.id,
                        food: post.food,
                        requirement: post.requirement
                    })
                })

                if(response.ok){
                    router.push('/profile')
                }
            }
            catch(error){
                console.log(error)
            } finally {
                setSubmitting(false)
            }
        }
    }

    return(
        <>
        <Chatbot/>
        <Create
        type='Create'
        post={post}
        setPost={setPost}
        submitting = {isSubmitting}
        handleSubmitting={handleSubmitting}
        />
        </>
    )
}

export default CreateSession