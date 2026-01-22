function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-black border-r p-4">
      <div className="mt-10 text-white">
        <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center mb-4"
        >
New Chat
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
