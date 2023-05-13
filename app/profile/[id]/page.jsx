"use client";

import { useState, useEffect } from "react";
import UserProfile from "@components/UserProfile";
import { useSearchParams, useParams } from "next/navigation";

const Profile = () => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const {id} = useParams();
  const [prompts, setPrompts] = useState([]);

  console.log(id);

  const fetchUserPrompts = async () => {
    const res = await fetch(`/api/users/${id}/prompts`);
    const data = await res.json();

    setPrompts(data);
  };

  useEffect(() => {
    if (id) {
      fetchUserPrompts();
    }
  }, [id]);

  return (
    <UserProfile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={prompts}
    />
  );
};

export default Profile;
