'use client'

import { useRouter } from "next/navigation"
import {useState} from 'react'

import { useToast } from "@hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"


function Create(
    {
        type,
        post,
        setPost,
        submitting,
        handleSubmitting,
    }
){
    const { toast } = useToast()

    const router = useRouter()
    

    return(
        <form 
        className="w-full justify-content border border-gray-300 rounded-xl px-8 bg-white/[0.7] py-12"
        onSubmit={handleSubmitting}
        >
            {
            /*<div className="h-80 w-full bg-gradient-to-r from-gray-500 to-slate-900 flex-center rounded-xl py-24 px-8">
            <h1 className='text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl font-inter flex-center my-0 py-5 px-2 rounded-3xl'>
                    Create your Study Group!
                </h1>
            */
            }
            
                <div className="border-b-2 pb-5">
                <h1 className="font-inter text-2xl text-black font-bold ">
                    {type} your Request
                </h1>
                <p className="font-satoshi font-normal text-sm text-gray-800 tracking-wide mt-1">
                    Plan the details for your request
                </p>
                </div>
                <div className="">
                <div className="mt-5 ">
                    <div className='flex-between'>
                    <p className="font-satoshi font-bold text-lg text-black tracking-wide mt-1 pr-8">
                        Grain
                    </p>
                    <input 
                        type='text'
                        value={post?.grain}
     
      
                        className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-24 outline-none focus:border-gray-900"
                        onChange={(e) => setPost({...post, grain: e.target.value})}
                        />
                    </div>

                    <div className='flex-between'>
                    <p className="font-satoshi font-bold text-lg text-black tracking-wide mt-1 pr-8">
                        Fruits
                    </p>
                    <input 
                        type='text'
                        value={post?.fruits}

         
                        className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-24 outline-none focus:border-gray-900"
                        onChange={(e) => setPost({...post, fruits: e.target.value})}
                        />
                    </div>

                    <div className='flex-between'>
                    <p className="font-satoshi font-bold text-lg text-black tracking-wide mt-1 pr-8">
                        Vegetable
                    </p>
                    <input 
                        type='text'
                        value={post?.vegetable}
      
    
                        className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-24 outline-none focus:border-gray-900"
                        onChange={(e) => setPost({...post, vegetable: e.target.value})}
                        />
                    </div>

                    <div className='flex-between'>
                    <p className="font-satoshi font-bold text-lg text-black tracking-wide mt-1 pr-8">
                        Protein
                    </p>
                    <input 
                        type='text'
                        value={post?.protein}
     

                        className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-24 outline-none focus:border-gray-900"
                        onChange={(e) => setPost({...post, protein: e.target.value})}
                        />
                    </div>

                    <div className='flex-between'>
                    <p className="font-satoshi font-bold text-lg text-black tracking-wide mt-1 pr-8">
                        Dairy
                    </p>
                    <input 
                        type='text'
                        value={post?.dairy}
  

                        className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 outline-none focus:border-gray-900 w-24"
                        onChange={(e) => setPost({...post, dairy: e.target.value})}
                        />
                    </div>




                </div>
            

                <div className="flex-between my-8">
                    <button 
                    type="button"
                    className="rounded-lg bg-white py-1.5 px-5 text-black transition-all p-2 hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center font-medium"
                    onClick={() => router.push('/')}
                    >
                        Cancel
                    </button>
                    <button 
                    className="rounded-lg border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center font-medium"
                    onClick={(e) => handleSubmitting(e)}
                    disabled={submitting}
                    type="submit"
                    >
                        {submitting ? 'Submitting...': 'Submit'}
                    </button>
                </div>

                


            </div>
        
                
            
        </form>
    )
}

export default Create