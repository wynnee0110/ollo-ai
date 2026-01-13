type ChatboxProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

function Chatbox({
  value,
  onChange,
  onSend,
  disabled = false,
}: ChatboxProps) {
  return (
    <div className="w-full flex justify-center gap-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a message..."
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
