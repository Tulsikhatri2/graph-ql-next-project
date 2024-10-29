"use client";

import { from } from "@apollo/client";
import { useRouter } from "next/navigation";
import { type } from "os";
import path from "path";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-[100vw] h-[100vh] bg-cyan-950 flex flex-col items-end p-5 font-mono">
      <div>
        <p className="text-white font-bold text-5xl">GraphQl</p>
      </div>
      <p className="text-white font-bold text-xl mt-10">
        A query language for your API
      </p>
      <p className="text-white font-bold text-sm text-right w-[40%] mt-7">
        GraphQL is a query language for APIs and a runtime for fulfilling those
        queries with your existing data. GraphQL provides a complete and
        understandable description of the data in your API, gives clients the
        power to ask for exactly what they need and nothing more, makes it
        easier to evolve APIs over time, and enables powerful developer tools.
      </p>
      <button
        type="submit"
        className="mt-10 flex justify-center gap-2 items-center shadow-xl text-lg
         bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 
         before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full
          before:-left-full before:hover:left-0 before:rounded-full before:bg-gray-500
           hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150
            before:hover:duration-700 relative z-10 px-8 py-2 overflow-hidden border-2 rounded-full group"
        onClick={() => {
          router.push("/auth/login");
        }}
      >
        Login
      </button>
    </div>
  );
}
