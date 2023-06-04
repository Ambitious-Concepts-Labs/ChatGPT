import { CreateImageRequestSizeEnum } from "openai";
import openai from "./chatgpt";

const queryImage = async (prompt: string, size: CreateImageRequestSizeEnum) => {
  const res = await openai
    .createImage({
      prompt,
      n: 1,
      size,
    })
    .then((res) => res.data.data[0].url)
    .catch(
      (err) =>
        `Dalle was unable to create that! (Error: ${err.message})`
    );

    return res;
};

export default queryImage;
