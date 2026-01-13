"use client";

import Chatbox from "./components/chatbox";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");   // typing
  const [prompt, setPrompt] = useState(""); // sent
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

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
    setPrompt(input);   // 🔥 AI triggers ONLY HERE
    setInput("");       // clear textbox
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">

      {/* Messages */}
      <div className="flex-1 flex items-center justify-center px-60">
        {loading ? (
          <p className="text-xl">Thinking...</p>
        ) : (
          <h1 className="text-2xl">{reply || "Reply"}</h1>
        )}
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
  );
}
