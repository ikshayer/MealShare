'use client'

import Create from "@components/Create"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@hooks/use-toast"
import Chatbot from "@components/ChatBox"
function CreateSession({session}){

    const {toast} = useToast()

    const [waiting, setWaiting] = useState(false)

    const [response, setResponse] = useState(null)

    const router = useRouter()

    const [isChecked, setChecked] = useState(false)
    const [post, setPost] = useState({
        grain: '',
        fruits: '',
        vegetable: '',
        protein: '',
        dairy: '',
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

    const handleYes = () => {
        const fetchRecipe = async () => {
            try{

            const response = await fetch('http://localhost:8000/recommend_recipes')
            const data = await response.json()

            if(data.ok){
                setResponse(data.recipe)
                setWaiting(true)
            }
            }
            catch(error){
                console.log(error)
            }
            finally{
            }
        }
        fetchRecipe();
    }

   

    return(
        
        <Create
        type='Create'
        post={post}
        setPost={setPost}
        submitting = {isSubmitting}
        handleSubmitting={handleSubmitting}
        />
        
    )
}

export default CreateSession