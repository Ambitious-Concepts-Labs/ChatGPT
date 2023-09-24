// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { FaLocationArrow } from "react-icons/fa6";
import { LuStars } from "react-icons/lu";
import { AiTwotoneAudio } from "react-icons/ai";
import { RiVoiceprintLine } from "react-icons/ri";
import Modal from "./NewDocModal";
import {
  GrammarlyButton,
  GrammarlyEditorPlugin,
} from "@grammarly/editor-sdk-react";
import { formatPrompt, HTMLBreak, setFocus } from "../constants/parse";

export default function PromptBar(props: any) {
  const { post, loading, handleButtonClick, setPost, optimizePost } = props
  const [isClient, setIsClient] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const ref = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const addPrompt = (prompt: any) => {
    const formattedPrompt = formatPrompt(prompt);
    const prev = ref.current.innerHTML;
    if (prev.length < 1) {
      ref.current.innerHTML = formattedPrompt;
    } else {
      ref.current.innerHTML = prev + HTMLBreak + formattedPrompt;
    }

    setFocus(ref.current);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleText = (e) => {
    console.log(e.target.value)
    setPost(e.target.value)
    setIsDisabled(false)
  }

  return (
    <>
      <div className="border rounded-xl w-full grow">
        <div className="flex items-end gap-4 py-2 px-4 ">
          <GrammarlyEditorPlugin
            clientId={process.env.NEXT_PUBLIC_GRAMMARLY_CLIENT_ID}
            maxLength={2000}
            // onChange={(e) => console.log(e.target.value)}
            placeholder="Type or copy your post or idea here "
            className="grow max-h-20"
            config={{ activation: "immediate", underlines: "on" }}
          >
            {/* To avoid hydration errors, render the editable component after hydration ends */}
            {isClient ? (
              <input
                maxLength={2000}
                onChange={(e) => handleText(e)}
                 onFocus={(e) => e.target.value.length < 1 ? setIsDisabled(true) : setIsDisabled(false)}
                  onKeyUp={(e) => e.target.value.length < 1 ? setIsDisabled(true) : setIsDisabled(false)}
                className='bg-inherit h-fit w-full p-2 outline-none max-h-20 overflow-y-auto'
                placeholder="Type or copy your post or idea here "
              />
              //  <div
              //       onFocus={(e) => e.target.innerText.length < 1 ? setIsDisabled(true) : setIsDisabled(false)}
              //       onKeyUp={(e) => e.target.innerText.length < 1 ? setIsDisabled(true) : setIsDisabled(false)}
              //       ref={ref}
              //       onChange={(e) => console.log(e.target.value)}
              //       // onChange={(e) => handleText(e)}
              //       contentEditable
              //       className='h-fit w-full p-2 outline-none max-h-20 overflow-y-auto'
              //     />
            ) : (
              <input
                maxLength={2000}
                onChange={(e) => handleText(e)}
                className='bg-inherit h-10 w-full p-2 outline-none overflow-y-auto'	
                placeholder="Type or copy your post or idea here "
              />
              // <div className='h-10 w-full p-2 outline-none overflow-y-auto' />
            )}
          </GrammarlyEditorPlugin>
          <GrammarlyButton />
        </div>
        <div className="flex items-center justify-between bg-slate-100 p-2">
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1 hover:bg-slate-200 py-1 px-2 rounded-md"
              onClick={() => handleOpenModal}
            >
              <span className="text-slate-400">
                <CgFileDocument />
              </span>
              <span className="text-xs font-bold">Browse Prompts</span>
            </button>
            <button className="flex items-center gap-1 hover:bg-slate-200 py-1 px-2 rounded-md">
              <span className="text-slate-400">
                <RiVoiceprintLine />
              </span>
              <span className="text-xs font-bold">No Brand Voice</span>
            </button>
             <button className="flex items-center gap-1 hover:bg-slate-200 py-1 px-2 rounded-md">
              <span className="text-slate-400">
                <AiTwotoneAudio />
              </span>
              <span className="text-xs font-bold">Add Tone</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            {/* <button
              disabled={isDisabled}
              className="flex items-center gap-1 hover:bg-slate-200 py-1 px-2 rounded-md disabled:text-slate-400 disabled:hover:bg-transparent"
            >
              <span className="text-slate-400">
                <LuStars />
              </span>
              <span className="text-xs font-bold">Improve</span>
            </button> */}
            <button
              disabled={isDisabled}
              onClick={(e) => {
                optimizePost(e);
                handleButtonClick();
              }}
              className="h-6 w-6 ps-1 pe-2 bg-c-green rounded-full flex items-center justify-center text-white disabled:bg-slate-300"
            >
              {/* {loading && <LoadingDots color="white" style="large" />} */}
              {!loading && (
                <FaLocationArrow className="rotate-45 h-full w-auto" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal addPrompt={addPrompt} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
}