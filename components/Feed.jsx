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
          handleTagClick={() => handleTagClick(prompt.tag)}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResualt, setSearchResualt] = useState([]);
  const [prompts, setPrompts] = useState([]);

  // fetch all prompts
  const fetchPrompts = async () => {
    const res = await fetch("/api/prompt");
    const data = await res.json();

    setPrompts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  // handle search
  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return prompts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const resualt = filterPrompts(e.target.value);
        setSearchResualt(resualt);
      }, 500)
    );
  };

  // handle tag click
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const resualt = filterPrompts(tagName);

    setSearchResualt(resualt);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for the prompt..."
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      {searchText ? (
        <PromptList data={searchResualt} handleTagClick={handleTagClick} />
      ) : (
        <PromptList data={prompts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
