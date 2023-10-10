
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { arrayUnion, doc, type DocumentData, getDoc, updateDoc } from "firebase/firestore";
import { type VibeType } from "../../(components)/components";
import { db } from "../../../../firebase";
import { handlePrompt } from "../../../../utils/helperFunctions";
import { type RankResponse } from "../../../..";
import { UserAuth } from "../../../authContext";
import { Header, Compose , Sidebar} from "../(components)/components";

interface Props {
  params: {
    id: string;
  };
}

function DocumentPage({}: Props) {
  const clickCount = useRef(0);
  const pathname = usePathname();
  const {session, status, id } = UserAuth();
  const [currDoc, setCurrDoc] = useState<DocumentData>({title: '', status: '', response: ''});
  const [loading, setLoading] = useState(false);
  const [doneFetching, setDoneFetching] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");
  const [ranking, setRanking] = useState<RankResponse>({
    score: 0,
    validations: [],
  });
  const [post, setPost] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  const [vibe, setVibe] = useState<VibeType>("Story");
  const [tone, setTone] = useState<string>("Professional");
  const [showPopup, setShowPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchUserDocs();
  }, []);

  useEffect(() => {
    // const rankResponse = rank(post, media);
    // setRanking(rankResponse);
  }, [post, media]);

  async function fetchUserDocs() {
    if (pathname) {
        const queryId = pathname.substring(pathname.lastIndexOf("/") + 1);
        const uid = id
        const docRef = await getDoc(
          doc(db, "users", uid, "documents", queryId.toString()),
        );
        const docData = docRef.data();
        if (docData) {
            console.log(docData, "kool");
            setCurrDoc(docData);
        }
    }
        
  }
  
  const updateDocument = async () => {
    const queryId = pathname?.substring(pathname?.lastIndexOf("/") + 1);
    const uid = id
    const docRef =  doc(db, "users", uid, "documents", queryId!.toString());
    if (optimizedPost) {
      await updateDoc(docRef, {
        responses: arrayUnion({post, optimizedPost})
      });
    }
  }

  const handleButtonClick = () => {
    clickCount.current += 1; // Increment clickCount on each click
    if (status !== "authenticated" && clickCount.current >= 3) {
      setTimeout(() => {
        setShowPopup(true);
      }, 3000);
    }
  };

  // function to send post to OpenAI and get response
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt(vibe, tone, post);

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
    setDoneFetching(true)

  };


  if (optimizedPost && doneFetching) {
    updateDocument()
  }

  return (
    <>
      <div style={{display: "flex"}}>
        <Header />
        <Compose />
        <div>
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default DocumentPage;