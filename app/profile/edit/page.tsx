// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { userProfileSchema } from "../../schemas/userProfileSchema";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Select, SelectItem } from "@/components/ui/select";
// import { betterAuthClient } from "@/lib/integrations/better-auth";

// type FormData = z.infer<typeof userProfileSchema>;

// export default function EditProfilePage() {
//   const { data: session } = betterAuthClient.useSession();
//   const user = session?.user;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(userProfileSchema),
//     defaultValues: {
//       name: user?.name,
//     //   bio: user?.bio || "",

//     },
//   });

//   const onSubmit = async (data: FormData) => {
//     // send data to your backend (e.g., via API route or TRPC mutation)
//     console.log("Form submitted", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto py-10 px-4">
//       <div className="flex items-center gap-4 mb-6">
//         <img
//           src={user?.image || "/placeholder.png"}
//           alt="Profile"
//           className="w-20 h-20 rounded-full object-cover"
//         />
//         <div className="flex flex-col gap-2">
//           <Button variant="outline">Upload Photo</Button>
//           {user?.image && <Button variant="destructive">Remove Photo</Button>}
//         </div>
//       </div>

//       <div className="mb-4">
//         <label>Name</label>
//         <Input {...register("name")} />
//         {errors.name && <p className="text-red-500">{errors.name.message}</p>}
//       </div>

//       <div className="mb-4">
//         <label>Bio</label>
//         <Textarea rows={3} {...register("bio")} />
//         {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
//       </div>

   

//       <Button type="submit">Save</Button>
//     </form>
//   );
// }
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { betterAuthClient } from "@/lib/integrations/better-auth";

export default function EditProfilePage() {
  const { data: session } = betterAuthClient.useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
//   const [bio, setBio] = useState(user?.bio || "");
  const [image, setImage] = useState(user?.image || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleSave = () => {
    console.log({ name, image });
    alert("Profile saved!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">Edit Profile</h1>

      <div className="flex justify-center">
        <label className="cursor-pointer relative group">
          <Avatar className="h-24 w-24">
            <AvatarImage src={image || "https://github.com/shadcn.png"} />
            <AvatarFallback>{name.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm">
            Change
          </div>
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div>
          {/* <label className="text-sm font-medium">Bio</label>
          <Textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
          /> */}
        </div>
      </div>

      <div className="text-center">
        <Button onClick={handleSave}>Save Profile</Button>
      </div>
    </div>
  );
}
