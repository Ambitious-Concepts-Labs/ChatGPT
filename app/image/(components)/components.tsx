"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { type CreateImageRequestSizeEnum } from "openai";
import { db } from "../../../firebase";
import FormField from "../../../components/FormField"
import Loader from '../../../components/Loader';
import { getRandomPrompt } from "../../../utils/generatePrompts";
// import { preview } from '../assets';
import { UserAuth } from "../../authContext";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Message } from "../../(components)/components";

interface Props {
  imageId: string;
}

export function Image({ imageId }: Props) {
  const { firebaseUser } = UserAuth();

  const [messages] = useCollection(
    firebaseUser &&
      query(
        collection(
          db,
          "users",
          firebaseUser.uid,
          "images",
          imageId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  console.log(messages)

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
      {messages?.empty && (
        <>
        <p className="mt-10 text-center text-white">Type a prompt below to get started!</p>
        <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  );
}

interface Props {
  imageId: string;
}

export function ImageInput({ imageId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { firebaseUser, user } = UserAuth()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);

  const size: CreateImageRequestSizeEnum = "1024x1024"

    const handleChange = (e: any) => { setForm({ ...form, [e.target.name]: e.target.value }); };

     const handleSubmit = async (e: any) => {
    e.preventDefault();
    alert('Please generate an image with proper details');
  };


  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        // call https://api.openai.com/v1/images/generations

        // const response = await fetch('https://dalle-arbb.onrender.com/api/v1/dalle', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     prompt: form.prompt,
        //   }),
        // });

        // const data = await response.json();
        // setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        console.log(err)
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: firebaseUser.uid,
        name: user.displayName,
        avatar:
          firebaseUser ||
          `https://ui-avatar.com/api/?name=${user.displayName}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        firebaseUser.uid,
        "images",
        imageId,
        "messages"
      ),
      message
    );

    // Notification toast loading
    const notification = toast.loading("Dalle is creating...");

    await fetch("/api/createImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        imageId,
        size,
        session: firebaseUser,
      }),
    }).then(() => {
      // Notification toast Successful
      toast.success("Dalle has responded!", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-600/50 text-gray-200 rounded-lg text-sm w-[90%] xl:w-[70%] mx-auto mb-5 mt-5">
        {/* <form className="mt-16 max-w-3xl" onSubmit={(handleSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
          </button>
        </div>
      </form> */}
      {/* <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <>
              <Image alt="preview" src={preview} />
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
              </>
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            (onClick={() => generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form> */}
        <form
          onSubmit={sendMessage}
          method="post"
          className="flex p-3 md:p-4 space-x-5"
        >
          <input
            className="outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!firebaseUser}
            value={prompt}
            onChange={(e) => { setPrompt(e.target.value); }}
            type="text"
            placeholder="Get answers to your questions here..."
          />

          <button
            type="submit"
            disabled={!prompt || !firebaseUser}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-2 py-1 md:px-4 md:py-2  rounded cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45 " />
          </button>
        </form>
      </div>
  );
}
