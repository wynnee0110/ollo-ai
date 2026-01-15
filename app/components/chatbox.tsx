import { useEffect, useState } from "react";

type ChatboxProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

const PLACEHOLDER_TEXT = "How was your day?";

function Chatbox({
  value,
  onChange,
  onSend,
  disabled = false,
}: ChatboxProps) {
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    if (value) return; // stop typing when user starts typing

    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(PLACEHOLDER_TEXT.slice(0, index + 1));
      index++;

      if (index === PLACEHOLDER_TEXT.length) {
        clearInterval(interval);
      }
    }, 70); // typing speed

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="w-full flex justify-center gap-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="
          w-full max-w-xl
          resize-none
          rounded-xl
          p-3
          text-white
          bg-white/10
          backdrop-blur-md
          outline-none
          border border-white/20
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
        "
      >
        Send
      </button>
    </div>
  );
}

export default Chatbox;
