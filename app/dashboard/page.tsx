// "use client";

// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { serverUrl } from "@/lib/environment";

// export default function DashboardPage() {
//   const [url, setUrl] = useState("");

//   const mutation = useMutation({
//     mutationFn: async (inputUrl: string) => {
//       const res = await fetch(`${serverUrl}/url`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ url: inputUrl }),
//       });

//       if (!res.ok) throw new Error("Failed to submit URL");
//       return res.json();
//     },
//     onSuccess: () => {
//       alert("URL submitted successfully!");
//       setUrl("");
//     },
//     onError: () => {
//       alert("Submission failed. Please try again.");
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     mutation.mutate(url);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl"
//       >
//         <input
//           id="urlInput"
//           type="url"
//           required
//           placeholder="https://example.com"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
//         />
//         <button
//           type="submit"
//           disabled={mutation.isPending}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
//         >
//           {mutation.isPending ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// }


// export default function HeroSection() {
//   return (
//     <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center">
//       <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
//         Build a smarter memory <br />
//         <span className="text-[#155DFC]">Capture your thoughts</span>
//       </h1>
//       <p className="mt-6 text-lg sm:text-xl max-w-2xl">
//         MemoryApp helps you store and retrieve your ideas, inspirations, and conversations using AI-enhanced memory and chat.
//       </p>
//       <div className="mt-10 flex flex-col sm:flex-row gap-4">
//         <button className="bg-[#155DFC] hover:bg-[#0f4bd4] text-white font-semibold px-6 py-3 rounded-xl transition">
//           Add Memory
//         </button>
//         <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-xl transition">
//           Chat Memory
//         </button>
//       </div>
//     </section>
//   );
// }



// export default function HeroSection() {
//   return (
//     <section className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-4 text-center">
//       <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
//         Build a smarter memory <br />
//         <span className="text-[#155DFC]">Capture your thoughts</span>
//       </h1>
//       <p className="mt-6 text-lg sm:text-xl max-w-2xl">
//         NeuroNote helps you store and retrieve your ideas, inspirations, and conversations using AI-enhanced memory and chat.
//       </p>
//       <div className="mt-10 flex flex-col sm:flex-row gap-4">
//         <button className="bg-[#155DFC] hover:bg-[#0f4bd4] text-white dark:text-white font-semibold px-6 py-3 rounded-xl transition">
//           Add Memory
//         </button>
//         <button className="bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-semibold px-6 py-3 rounded-xl transition">
//           Chat Memory
//         </button>
//       </div>
//     </section>
//   );
// }
export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-4 text-center">
      <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
        Build a smarter memory <br />
        <span className="text-[#155DFC]">Capture your thoughts</span>
      </h1>
      <p className="mt-6 text-lg sm:text-xl max-w-2xl bg-gradient-to-r from-blue-500 via-cyan-400 to-green-500 text-transparent bg-clip-text dark:from-blue-400 dark:via-cyan-400 dark:to-green-500">
        MemoryApp helps you store and retrieve your ideas, inspirations, and conversations using AI-enhanced memory and chat.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button className="bg-[#155DFC] hover:bg-[#0f4bd4] text-white dark:text-white font-semibold px-6 py-3 rounded-xl transition">
          Add Memory
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-semibold px-6 py-3 rounded-xl transition">
          Chat Memory
        </button>
      </div>
    </section>
  );
}
