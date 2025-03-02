import { Loader, LoaderCircle, Mail } from "lucide-react";

function Chatbot() {
  return (
    <div className="w-full h-[50vh]  bg-white rounded-xl mb-4 p-4">
      <div className="rounded-lg border border-black bg-zinc-200 p-4 text-zinc-800 font-semibold">
        <p>
            Wait a minute...We are generating a food need for you
        </p>
      </div>
      <div className="rounded-lg border border-black bg-zinc-200 p-4 text-zinc-800 font-semibold mt-2 w-16">
        <LoaderCircle size={32} className="animate-spin"/>
      </div>
    </div>
  );
}

export default Chatbot;