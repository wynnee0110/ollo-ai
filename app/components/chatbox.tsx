"use client";

import { useEffect, useState, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

type ChatboxProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};


const PHRASES = [
  "How was your day?",
  "What are you working on?",
  "Ask me anything!",
  "Need coding help?",
];

function Chatbox({ value, onChange, onSend, disabled = false }: ChatboxProps) {
  const [placeholder, setPlaceholder] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

 


  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const maxHeight = 192;
    textarea.style.height = "auto"; 
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    
    textarea.style.overflowY =
    textarea.scrollHeight > maxHeight ? "auto" : "hidden";
     
  }, [value]);

  return (
    <div className="w-full flex justify-center gap-2">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder= "Ask anything"
        rows={1} 
        className="
          w-full max-w-xl
          p-4 py-3
          resize-none
          overflow-hidden
          scrollbar-hide
          rounded-2xl
          text-white
          bg-white/10
          custom-scrollbar
          backdrop-blur-md
          outline-none
          border border-white/20
          max-h-48
        "
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />

      <button
        type="button"
        onClick={onSend}
        disabled={disabled}
        className="
          px-4
          rounded-xl
          bg-black text-white
          dark:bg-white dark:text-black
          disabled:opacity-50
          max-h-15
          h-12
          self-end
        "
      >
        <PaperAirplaneIcon className="w-6 h-6" />
  
      </button>
    </div>
  );
}

export default Chatbox;
