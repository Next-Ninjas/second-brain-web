"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { betterAuthClient } from "@/lib/integrations/better-auth";

export default function ProfilePage() {
  const { data: user } = betterAuthClient.useSession();
  const [name, setName] = useState(user?.user.name || "");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(user?.user.image || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleSave = () => {
    // Save logic here (e.g., send to backend)
    console.log({ name, bio, image });
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
          <label className="text-sm font-medium">Bio</label>
          <Textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
          />
        </div>
      </div>

      <div className="text-center">
        <Button onClick={handleSave}>Save Profile</Button>
      </div>
    </div>
  );
}
