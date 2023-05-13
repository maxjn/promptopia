"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-start items-start gap-5">
        <Link
          href={`/profile/${prompt.creator._id}?name=${prompt.creator.username}`}
          className="flex flex-1 justify-start items-center gap-3 cursor-pointer"
        >
          <Image
            src={prompt.creator.image}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500 ">
              {prompt.creator.email}
            </p>
          </div>
        </Link>
        <div className="copy_btn">
          <Image
            src={
              copied === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            onClick={handleCopy}
            alt="copy"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className=" font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        #{prompt.tag}
      </p>
      {session?.user.id === prompt.creator._id && pathName == "/profile" && (
        <div className="mt-5 pt-3 flex-center gap-4 border-t border-gray-100">
          <p
            className=" font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className=" font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
