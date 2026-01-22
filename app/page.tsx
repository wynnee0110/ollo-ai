"use client";

import Chatbox from "./components/chatbox";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "./components/header"
import {  useRef } from "react";
import Sidebar from "./components/sidebar";



export default function Home() {
  const [input, setInput] = useState("");   // typing
  const [prompt, setPrompt] = useState(""); // sent
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const phrases = [
    "How was your day?",
    "Need help?",
    "Ask me anything"
  ];
  
const [displayText, setDisplayText] = useState("");
const [phraseIndex, setPhraseIndex] = useState(0);
const [charIndex, setCharIndex] = useState(0);
const [isDeleting, setIsDeleting] = useState(false);
const bottomRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const currentPhrase = phrases[phraseIndex];
  let timeout: NodeJS.Timeout;

  if (!isDeleting) {
  
    timeout = setTimeout(() => {
      setDisplayText(currentPhrase.slice(0, charIndex + 1));
      setCharIndex(charIndex + 1);

      if (charIndex + 1 === currentPhrase.length) {
       
        setTimeout(() => setIsDeleting(true), 2200);
      }
    }, 80);
  } else {
   
    timeout = setTimeout(() => {
      setDisplayText(currentPhrase.slice(0, charIndex - 0));
      setCharIndex(charIndex - 1);

      if (charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, 40);
  }

  return () => clearTimeout(timeout);
}, [charIndex, isDeleting, phraseIndex]);



  useEffect(() => {
    if (!prompt) return;

    async function fetchReply() {
      setLoading(true);
      try {
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        setReply(data.reply);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReply();
  }, [prompt]);

  const handleSend = () => {
    if (!input.trim()) return;
    setPrompt(input);   
    setInput("");       // clear textbox
  };

  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [reply, loading]);

  return (
    <>
    
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <Header />
      {/* Messages */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 mt-10">
        {loading ? (
          <p className="text-xl">Thinking...</p>
        ) : (
<div className="prose dark:prose-invert max-w-none text-md scroll-smooth">
  {reply ? (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{reply}</ReactMarkdown>
  ) : (
    <span className="text-2xl">  
    {displayText}
  <span className="animate-pulse">|</span>
  </span>
  )}
</div>
        )}
  <div ref={bottomRef} />
</div>

      {/* Chatbox */}
      <div className="p-4 flex justify-center">
        <Chatbox
          value={input}
          onChange={setInput}
          onSend={handleSend}
          disabled={loading}
        />
      </div>

    </div>
    </>
  );
}
