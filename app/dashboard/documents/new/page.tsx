"use client";

import PromptBar from "../../../../components/NewDocPromptBar";
import Link from "next/link";
import { CgFileDocument } from "react-icons/cg";
import { TbListSearch, TbPencilPlus } from "react-icons/tb";
import Header from "../../../../components/NewDocHeader";
import "../../../../styles/globals.css";
import { useEffect, useRef, useState } from "react";
import DropDown, { VibeType } from "../../../../components/DropDown";
import { useSession } from "next-auth/react";
import { rank } from "../../../../utils/linkedin-algorithm";
import toast, { Toaster } from "react-hot-toast";
import Popup from "../../../../components/Popup";
import LoadingDots from "../../../../components/LoadingDots";
import CustomButton from "../../../../components/CustomButton";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");
  const [ranking, setRanking] = useState<RankResponse>({
    score: 0,
    validations: [],
  });
  const [post, setPost] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  const [vibe, setVibe] = useState<VibeType>("Story");
  const [showPopup, setShowPopup] = useState(false);
  const [isCustomPrompt, setIsCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [tab, setTab] = useState("vibe"); // Default to "vibe" tab
  const { data: session, status } = useSession();
  const clickCount = useRef(0);

  const handleButtonClick = () => {
    clickCount.current += 1; // Increment clickCount on each click
    if (status !== "authenticated" && clickCount.current >= 3) {
      setTimeout(() => {
        setShowPopup(true);
      }, 3000);
    }
  };

  useEffect(() => {
    const rankResponse = rank(post, media);
    setRanking(rankResponse);
  }, [post, media]);

  // prompt for optimizing post

  // add more vibes as needed
  const handlePrompt = () => {
    let prompt;
    switch (vibe) {
      case "Story":
        prompt = `Generate post using this prompt, based on ${post}.  You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
The Linkedin algorithm contains boosts and demotions based on what you are writing. Positive boosts are:

- in each post add emoji
- 200 characters in sentence maximum
- Start each sentecnce from new line and ad numbers in first 2 lines
- add 3 hashtags which 2 are generic and one very specific (at the end) Tags relate to post theme
- add a question at the end of the post to start a discussion. Before the hashtags
- first two lines should be catchy
- Dont add links - links are not good.
- If post copied in the field contain some numbers keep them the same.

Add idea about which image or visual can be added at the end of the post (this text is not counted as part of post)
${post}
---
Generated post length must be more than 800-1200 characters
---
Between each line must be a space
---
Keep all mentions of people in there
---
Start the firs line from smth like: I did smth, In year, I do, Tired of, Sometimes it is just, A path toward, Because this is not,I've been struggling,  (change the begginign depends on the context )
---
Add emoji if it fits
---
It should be a story`;
        break;
      case "Crisp":
        prompt = `Generate post using this prompt, based on ${post}. You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
The Linkedin algorithm contains boosts and demotions based on what you are writing. If person select this ${vibe}, make sure the generated ${post} must follow these conditions and be short, crips and inspiring:
- Post length must be no more than 500 characters. 
- Each sentence length is less than 50 characters. 
- First sentences must start with smth like that : I've spent 5 months, 10 step plan, I made 10000 In, Last January, this January, I was on .. , I created 1000 of, how to get 1000 followers, how to do 1000 of, 10 lessons took me,  15 reasons, 5 days ago, 3 shocking steps, my strategy for  2023, over the past 10 years. (change numbers, generate always new numbers, generate always new beggining). Next sentences should not include numbers and these formulations.  
- If post copied in the field contain some numbers keep them the same.
- Next sentences should be generated, should not include numbers.
---
Each sentence from new line 
---
Add space between each abstract.
---
Show only generated post`;

        break;
      case "List":
        prompt = `Generate a post that is likely to be liked and reposted on LinkedIn, based on ${post}. Your post should follow these conditions:

Post length must be no more than one hundred characters.
Each sentence length is no more than two words.
Post is a list of things.
First sentence must start with one of the following: There are 2 types of, 1 big mistake to avoid, When you..., avoid..., 5 quick tips..., Most companies..., If you don't plan to... (replace the ellipsis with a number).
If the copied post contains numbers, keep them the same.
The next sentences should be generated and should not include numbers.`;

        // Generate post using this prompt, based on ${post}. You are a LinkedinGPT, a large language model that generates viral posts for Linkedin.
        //         ely to be liked and reposted than the original post.
        // The Linkedin algorithm contains boosts and demotions based on what you are writing. If person select this ${vibe}, make sure the generated ${post} must follow these conditions of having list and 1-2 sentences:
        // - Post length must be no more than one hundred characters.
        // - Each sentence length is less than twenty characters.
        // - Post is a list of things
        // - First sentences must start with: There are 2 types of, 1 big mistake make, When you, avoid, 5 quick tips, Most companies, If you don't plan to, (change numbers, generate always new numbers, only add in the first line of post). Next sentences should not include numbers and these formulations.
        // - If post copied in the field contain some numbers keep them the same.
        // - Next sentences should be generated, should not include numbers.
        // ---
        // Each sentence from new line
        // ---
        // Add space between each abstract.
        // ---
        // Show only generated post
        // You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
        // s If person select this ${vibe}, make sure the generated ${post} must follow these conditions and be super short sentences from 1-2 words :
        // - Post length must be no more than 100 characters or 100 words.
        // - Each sentence length is less than twenty characters.
        // - Add only one list, no more
        // - Only one and fitst sentence of the  ${post}  must start with smth like that: There are 2 types of, 1 big mistake make, Most people think, What worked in the past might not, When you, avoid, 5 quick tips, Most companies, If you don't plan to, Behind every bad, Before asking (change numbers, generate always new numbers.  Next sentences should not include numbers and these formulations.
        // - If post copied in the field contain some numbers keep them the same.
        // - Next sentences should be generated
        // ---
        // Each sentence from new line
        // ---
        // Add space between each abstract.
        // ---`;

        break;
      case "Unpopular opinion":
        prompt = `Generate post using this prompt, based on ${post}. You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
        The Linkedin algorithm contains boosts and demotions based on what you are writing. If person select this ${vibe}, make sure the generated post must follow these conditions and create an unpopular opinion about the topic:
        - Post length must be less than 200 characters. 
        - Post must contain no more tha 3 sentences 
        - First sentence must start with: Unpopular opinion: 
        ---
        Add space between each abstract.`;
        break;
      case "Case Study":
        prompt = `Generate post using this prompt, based on ${post}. person insert You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
The Linkedin algorithm contains boosts and demotions based on what you are writing. If person select this ${vibe}, make sure the generated post must follow these conditions and be fullfilling and rigorous and realate to post typed:
- Post must relate to what initially is inserted  
- Post length must be no more than 1000 characters. 
- Each sentence length is less than 200 characters. 
- First sentence of the must start with smth like that, or similar text to one: Pro-tip, These simeple expereiments, Here is one of my biggest learnings from this year, Inside, Being ... does not mean, Earlier this year , This might be the hottest (use similar words) 
- If post copied in the field contain some numbers keep them the same.
- Next sentences should be generated, and contain list, rigorous list, each list point start from emoji
---
Provide the idea for graphics, image, sceme which will fuel these case study post at the end in the brackets
---s
Add space between each abstract.`;
        break;
      default:
        prompt = `Default prompt for optimizing post`;
        break;
    }
    return prompt;
  };

  // function to send post to OpenAI and get response
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt();

    // Show the popup right before the API call
    handleButtonClick();

    const response = await fetch("/api/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      const formattedChunk = chunkValue.replace(/\n/g, "<br>");
      setOptimizedPost((prev) => prev + formattedChunk);
    }
    setLoading(false);
  };

  const suggestions = [
    {
      icon: <TbListSearch className="h-full w-auto" />,
      title: "Real-Time Search",
      prompt1: "Summarize the latest news on generative AI",
      prompt2: "Write a personalized email to [insert Linkedin profile URL]",
    },
    {
      icon: <TbPencilPlus className="h-full w-auto" />,
      title: "Long Form Content",
      prompt1: "Create a blog post about search engine optimization",
      prompt2: "Write a press release about www.copy.ai",
    },
    {
      icon: <CgFileDocument className="h-full w-auto" />,
      title: "Brainstorm Ideas",
      prompt1: "Generate 10 Instagram captions for fashion week",
      prompt2:
        "Write a product description for a bicycle in the style of Hemingway",
    },
  ];
  return (
    <>
      <Header docId={""} />
      <main className="grow flex flex-col items-center mx-auto">
        <div className="grow py-2 px-8 md:py-6 md:px-16 flex flex-col justify-around">
          {!optimizedPost ? (
            <>
              <div className="flex flex-col text-center gap-2 md:gap-3">
                <h1 className="text-3xl font-bold">
                  <span className="text-c-dark-green">Welcome to </span>
                  <span className="text-c-light-green">Chat by Copy.ai</span>
                </h1>
                <p className="text-c-dark-green text-sm font-medium">
                  Get started by writing a task and Chat can do the rest. Not
                  sure where to start? Check out the Prompt Library for
                  inspiration.
                </p>
              </div>
              <ul className="grow flex flex-col justify-around md:gap-4 md:justify-between md:py-12">
                {suggestions.map((sug, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="rounded-full h-8 w-8 flex items-center justify-center bg-slate-100 text-slate-400 p-1">
                      {sug.icon}
                    </div>
                    <div className="text-c-green font-medium">
                      <div className="text-sm mb-1 font-semibold">
                        {sug.title}
                      </div>
                      <p className="text-xs">"{sug.prompt1}"</p>
                      <p className="text-xs">"{sug.prompt2}"</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="flex flex-colw w-full ">
                <div className="flex flex-col">
                  {/* <div className="flex space-x-1">
                        <CustomButton currentTab={tab} />
                        <style jsx>{`
                          button:hover .tooltip-text {
                            display: block;
                          }
                        `}</style>
                      </div> */}

                  {/* // This is post component*/}
                  {/* 
                      <div className="w-full mx-auto pt-6 ">
                        <div className="w-full">
                          <textarea
                            maxLength={2000}
                            onChange={(e) => setPost(e.target.value)}
                            placeholder="Type or copy your post or idea here "
                            className="text-black w-full h-56 p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner md:h-240"
                          />
                        </div>
                      </div> */}

                  {/* <div className="flex mb-3 items-center space-x-3"></div>
                      <div className="block">
                        <DropDown vibe={vibe} setVibe={setVibe} />
                      </div> */}

                  {/* <div className="my-4">
                        <button
                          disabled={loading}
                          onClick={(e) => {
                            optimizePost(e);
                            handleButtonClick();
                          }}
                          className="bg-blue-700 font-medium rounded-md w-full text-white px-4 py-2 hover:bg-blue-600 disabled:bg-blue-800"
                        >
                          {loading && (
                            <LoadingDots color="white" style="large" />
                          )}
                          {!loading && `Generate new post `}
                        </button>

                        <Popup show={showPopup} setShowPopup={setShowPopup} />
                      </div> */}
                </div>
                <div className="flex">
                  <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{ duration: 2000 }}
                  />
                  {optimizedPost && (
                    <div className="">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                        <h2 className="text-xl font-bold">
                          Your Generated Post
                        </h2>
                      </div>
                      <div className="max-w-2xl my-4 mx-auto">
                        <div
                          className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                          onClick={() => {
                            navigator.clipboard.write([
                              new ClipboardItem({
                                "text/html": new Blob([optimizedPost], {
                                  type: "text/html",
                                }),
                              }),
                            ]);
                            toast("Post copied to clipboard", {
                              icon: "📋",
                            });
                          }}
                          key={optimizedPost}
                        >
                          <p
                            className="text-black-700 text-left"
                            dangerouslySetInnerHTML={{
                              __html: optimizedPost,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <PromptBar
          handleButtonClick={handleButtonClick}
          optimizePost={optimizePost}
          setPost={setPost}
        />
        <div className="text-xs flex items-center gap-1 py-2">
          <div className="text-slate-300">Have you tried Brand Voice?</div>
          <Link href="#" className="text-c-green underline">
            Give us feedback
          </Link>
        </div>
      </main>
    </>
  );
}
