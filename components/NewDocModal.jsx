"use client";

import { useState } from "react";
import { categories, prompts } from "../constants/data";
import { BiSearch } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

export default function Modal({ handleCloseModal, addPrompt }) {
  const [actual, setActual] = useState({
    categoryId: undefined,
    promptId: undefined,
    promptValue: undefined,
  });

  const chooseCategory = (id) => {
    setActual({
      categoryId: id,
      promptId: undefined,
      promptValue: undefined,
    });
  };

  const choosePrompt = (id, value) => {
    setActual((prev) => ({
      ...prev,
      promptId: id,
      promptValue: value,
    }));
  };

  const handlePrompt = () => {
    const pr = prompts.find((prompt) => prompt.id === actual.promptId);
    addPrompt(pr.value);
    handleCloseModal();
  };

  return (
    <div className="fixed w-screen h-screen inset-0 flex items-center justify-center bg-black/20 z-20 md:justify-start">
      <div className="w-11/12 h-[95%] bg-white px-4 flex flex-col overflow-hidden md:px-8 md:w-4/5 md:h-3/4">
        <div className="flex items-center justify-between py-4 md:py-6">
          <div className="flex items-center justify-between md:w-1/2">
            <div className="font-semibold text-xl">Prompts</div>
            <div className="border p-1 hidden md:flex items-center gap-2 md:py-1.5 md:ps-2 md:pe-4">
              <span>
                <BiSearch />
              </span>
              <input
                type="text"
                placeholder='Try "Sales" or "Email"'
                className="px-2 outline-none rounded-md text-sm"
              />
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="h-6 w-6 flex items-center justify-center"
          >
            <IoClose className="h-full w-auto" />
          </button>
        </div>
        <div className="flex flex-col gap-2 grow overflow-auto md:flex-row md:border-t">
          <div className="h-1/4 p-2 overflow-y-auto md:h-full md:w-1/4">
            <ul className="flex flex-col gap-1 md:gap-2 overflow-hidden">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className={`font-semibold text-sm cursor-pointer p-2 rounded-md hover:bg-slate-100 md:py-3 ${
                    actual.categoryId === cat.id ? "bg-slate-100" : "bg-white"
                  } ${cat.id === 2 && "mb-8"}`}
                  onClick={() => chooseCategory(cat.id)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-1/4 border-y p-2 overflow-y-auto md:border-x md:border-y-0 md:w-1/3 md:h-full">
            <ul className="flex flex-col gap-1 md:gap-2 overflow-hidden">
              {actual.categoryId !== undefined &&
                prompts
                  .filter((prompt) => prompt.categoryId === actual.categoryId)
                  .map((prompt) => (
                    <li
                      key={prompt.id}
                      className={`font-semibold cursor-pointer text-sm p-2 rounded-md md:py-3 ${
                        actual.promptId === prompt.id
                          ? "bg-[#93e1cf] hover:bg-[#93e1cf]"
                          : "hover:bg-slate-100"
                      }`}
                      onClick={() => {
                        const formattedValue =
                          prompt.value === undefined || prompt.value.length < 1
                            ? undefined
                            : prompt.value;
                        choosePrompt(prompt.id, formattedValue);
                      }}
                    >
                      {prompt.title}
                    </li>
                  ))}
            </ul>
          </div>
          <div className="h-1/5 px-2 py-4 grow flex flex-col gap-4 items-end md:w-1/3 md:h-full">
            <div className="grow bg-slate-100 w-full text-slate-400 p-3 md:p-2">
              <div className="uppercase text-xs flex items-center gap-1.5 mb-2">
                <span>Preview (workspace prompt)</span>
                <span>
                  <BsInfoCircle />
                </span>
              </div>
              {actual.promptValue !== undefined && (
                <div key={prompt.id} className="text-slate-500">
                  {actual.promptValue.split("\n").map((par, i) => (
                    <div key={i}>
                      <p>{par}</p>
                      <br />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="px-4 py-2 bg-c-green text-white text-sm rounded-md w-max disabled:opacity-30"
              onClick={handlePrompt}
              disabled={
                actual.categoryId === undefined ||
                actual.promptId === undefined ||
                actual.promptValue === undefined
              }
            >
              Use Prompt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
