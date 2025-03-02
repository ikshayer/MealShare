'use client'

import { useRouter } from 'next/navigation'

function SessionCard({event, handleCardClick, isSubmitting}){

    const router = useRouter()

    return(
        <div
        className="w-full rounded-md px-4 py-2"
        
        >
           <div className='flex-between'>
                <h1>
                    Grain
                </h1>
                <button>
                    Donate
                </button>
           </div>
           <div>

           </div>
            
        </div>
    )
}

export default SessionCard