import PromptCard from "@components/PromptCard";
const UserProfile = ({ name, desc, data, handleDelete, handleEdit }) => {
  return (
    <section className="w-full">
      {" "}
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleDelete={() => handleDelete && handleDelete(prompt)}
            handleEdit={() => handleEdit && handleEdit(prompt)}
          />
        ))}
      </div>
    </section>
  );
};

export default UserProfile;
