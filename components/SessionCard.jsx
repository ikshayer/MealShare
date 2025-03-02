'use client'
import { Progress } from "@/components/ui/progress"

import { useRouter } from 'next/navigation'

function SessionCard({item, event, handleDonate, isSubmitting}){

    const router = useRouter()

    return(
        <div
        className="w-1/3 mt-3 rounded-md px-4 py-2 border border-zinc-500 bg-zinc-100/[0.5] "
        
        >
           <div className='flex-between text-black'>
                <h1 className='font-bold'>
                    {item}
                </h1>
                <button className='black_btn' onClick={() => handleDonate()}>
                    Donate
                </button>
           </div>

           <Progress value={33} className='mt-3' />
            <p className="flex-end text-sm font-satoshi font-semibold mt-1">230/250 lbs</p>
            
        </div>
    )
}

export default SessionCard