// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { betterAuthClient } from "@/lib/integrations/better-auth";

// export default function ProfilePage() {
//   const router = useRouter();
//   const { data: session } = betterAuthClient.useSession();
//   const user = session?.user;

//   return (
//     <div className="max-w-3xl mx-auto py-10 px-4">
//       <div className="flex items-center gap-6">
//         <div className="relative group">
//           <Avatar className="w-24 h-24">
//             <AvatarImage src={user?.image || ""} />
//             <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
//           </Avatar>
//           <div
//             onClick={() => router.push("/profile/edit")}
//             className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100"
//           >
//             {user?.image ? "Change Photo" : "Upload Photo"}
//           </div>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold">{user?.name}</h2>
//           <Button onClick={() => router.push("/profile/edit")} className="mt-2">
//             Edit Profile
//           </Button>
//         </div>
//       </div>

//       <div className="mt-6">
//         {/* <p><strong>Bio:</strong> {user?.bio || "No bio added yet."}</p> */}
//       </div>
//     </div>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { betterAuthClient } from "@/lib/integrations/better-auth";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = betterAuthClient.useSession();
  const user = session?.user;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-center space-y-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <Avatar className="h-28 w-28">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-xl font-bold">{user?.name || "Your Name"}</h1>
        {/* <p className="text-gray-500">{user?.bio || "No bio yet."}</p> */}
        <Button onClick={() => router.push("/profile/edit")}>Edit Profile</Button>
      </div>
    </div>
  );
}
