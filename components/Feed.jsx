"use client";

import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

const PromptList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);

  const fetchPrompts = async () => {
    const res = await fetch("/api/prompt");
    const data = await res.json();

    setPrompts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchText(e.target.value);
  };

  const handleTagClick = (e) => {};

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for the prompt..."
          value={searchText}
          onChange={handleSearch}
          className="search_input peer"
          required
        />
      </form>

      <PromptList data={prompts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
