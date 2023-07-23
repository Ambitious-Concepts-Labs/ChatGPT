'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegFaceGrin } from 'react-icons/fa6'
import { ImBubbles2 } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
import { MdAttachFile } from 'react-icons/md'
import { RiVoiceprintLine } from 'react-icons/ri'
import avatar from '../assets/default_avatar.png'
import crisp from '../assets/crisp.svg'
import logo from '../assets/logo.svg'
import woman from '../assets/woman.jpg'

interface Message {
  role: Role;
  content: string;
}

type Role = "assistant" | "user";

export default function Popup () {
  const [isOpen, setIsOpen] = useState(true)
    const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: updatedMessages
      })
    });
    // const response = await fetch("/api/chat", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     messages: updatedMessages
    //   })
    // });

    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    const data = response.body;

    if (!data) {
      return;
    }

    setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let isFirst = true;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      if (isFirst) {
        isFirst = false;
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: chunkValue
          }
        ]);
      } else {
        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1];
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + chunkValue
          };
          return [...messages.slice(0, -1), updatedMessage];
        });
      }
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`
      }
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`
      }
    ]);
  }, []);

  const handleOpen = () => {
    setIsOpen(prev => !prev)
  }

  const images = [
    avatar,
    logo,
    woman,
  ]

  return (
    <div className='fixed overflow-hidden w-screen flex flex-col-reverse z-20 gap-3 p-4 items-end justify-center bottom-0 right-0 md:bottom-1 md:px-4 md:w-2/4 md:py-2 lg:w-[28%] h-fit'>
      <button onClick={handleOpen} className='bg-black text-white h-12 w-12 rounded-full flex items-center justify-center drop-shadow-xl cursor-pointer'>
        {
        isOpen
          ? <IoClose className='h-full w-auto p-2.5' />
          : <ImBubbles2 className='h-full w-auto p-3.5' />
      }
      </button>
      <div className={`grow shadow-xl rounded-xl w-full flex-col h-[90vh] pt-4 md:h-[80vh] md:pt-0 ${isOpen ? 'flex' : 'hidden'}`}>
        <div className='bg-zinc-800 rounded-t-xl p-2 pb-3 flex flex-col items-center gap-2'>
          <div className='text-white rounded-xl px-7 py-1.5 text-xs bg-neutral-700 flex items-center gap-2'>
            <span><ImBubbles2 /></span>
            <span className='font-bold text-xs'>Chat</span>
          </div>
          <ul className='flex'>
            {
            images.map((image, i) => (
              <li key={i} className={`h-9 w-9 relative rounded-full overflow-hidden border-2 border-zinc-800 ${i > 0 && '-ms-1.5'}`}>
                <Image src={image} alt='Avatar' className='h-full w-auto' fill />
              </li>
            ))
          }
          </ul>
          <div className='text-center text-xs'>
            <div className='text-white font-bold mb-0.5'>Questions? Chat with us!</div>
            <p className='text-slate-300'>Was last active 11 hours ago</p>
          </div>
        </div>
        <div className='bg-white text-black rounded-b-lg p-2 grow flex flex-col'>
          <div className='grow py-2 border-b'>
            <ul>
              <li className='flex gap-2'>
                <div className='h-7 w-7 rounded-full overflow-hidden flex items-center justify-center relative'>
                  <Image src={logo} alt='Avatar' className='h-full w-auto' fill />
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='text-slate-400 text-xs'>Writier</div>
                  <div className='px-2.5 py-2 bg-zinc-800 text-white rounded-md text-xs'>How can we help with Writier?</div>
                </div>
              </li>
            </ul>
          </div>
          <div className='p-2 flex flex-col gap-4'>
            <input type='text' placeholder='Compose your message' className='py-2 text-xs outline-none' />
            <div className='flex items-center justify-between'>
              <div className='flex items-center text-slate-600 gap-2'>
                <button className='h-3.5 w-3.5'>
                  <FaRegFaceGrin className='h-full w-auto' />
                </button>
                <button className='h-3.5 w-3.5'>
                  <MdAttachFile className='h-full w-auto' />
                </button>
                <button className='h-3.5 w-3.5'>
                  <RiVoiceprintLine className='h-full w-auto' />
                </button>
              </div>
              <div className='flex items-center gap-1'>
                <div className='text-slate-400 text-xs'>We run on</div>
                <div className='h-3 w-10 relative'>
                  <Image src={crisp} alt='Crisp logo' className='h-full w-auto' fill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
