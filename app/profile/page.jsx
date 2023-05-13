"use client";

import { useState, useEffect } from "react";
import UserProfile from "@components/UserProfile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);
  const { data: session } = useSession();

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const res = await fetch(`api/prompt/${prompt._id}`, {
          method: "DELETE",
        });

        const filteredPrompts = prompts.filter((p) => p._id !== prompt._id);
        setPrompts(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchUserPrompts = async () => {
    const res = await fetch(`/api/users/${session?.user.id}/prompts`);
    const data = await res.json();

    setPrompts(data);
  };
  useEffect(() => {
    if (session?.user.id) {
      fetchUserPrompts();
    }
  }, [session?.user.id]);

  return (
    <UserProfile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={prompts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default Profile;
