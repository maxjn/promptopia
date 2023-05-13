import connectToDB from "@utils/database";
import Prompt from "@models/Prompt";
import { ObjectId } from "mongodb";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed fetching useer's prompts", { status: 500 });
  }
};
