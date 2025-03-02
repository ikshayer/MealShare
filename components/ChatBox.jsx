import { Loader, LoaderCircle, Mail } from "lucide-react";
import { useState } from "react";

function Chatbot({isChecked, handleYes, response}) {

    const [pressed, setPressed] = useState(true)

  return (
    <div className="w-full h-[50vh]  bg-white/[0.7] rounded-xl mb-4 p-4 border border-gray-300">
      <div className="rounded-lg border border-black bg-zinc-200 p-4 text-zinc-800 font-semibold">
        <p>
            Wait a minute...We are generating a food need for you
        </p>
      </div>
      {!isChecked ? (
      <div className="rounded-lg border border-black bg-zinc-200 p-4 text-zinc-800 font-semibold mt-2 w-16">
        <LoaderCircle size={32} className="animate-spin"/>
      </div>
      ) : <div className="rounded-lg mt-2 border border-black bg-zinc-200 p-4 text-zinc-800 font-semibold">
      <p>
          We have alloted the data to a form for you! We can also give recipes for the food package if you want...
      </p>
      <button disabled={pressed} className={`mt-2 ${pressed ? 'black_btn' : 'outline_btn'}` }onClick={() => {
        handleYes()
        setPressed(false)
        }}>
        Yes
      </button>
      <div className="rounded-lg border border-black bg-zinc-200 p-4 text-zinc-800 font-semibold">
        <p>
            {response}
        </p>
      </div>
    </div>}
    </div>
  );
}

export default Chatbot;