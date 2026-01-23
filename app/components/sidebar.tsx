interface SidebarProps {
  open: boolean;
}

export default function Sidebar({ open }: SidebarProps) {
  return (
    <aside
      className={`
        w-64 h-screen bg-black border-r border-gray-900 p-4
        fixed top-0 left-0 z-10
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="mt-10 text-white">
        <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center mb-4">
          New Chat
        </button>

        <nav className="space-y-3 mt-4">
          <a className="block p-2 rounded hover:bg-zinc-700">Home</a>
          <a className="block p-2 rounded hover:bg-zinc-700">Chat</a>
          <a className="block p-2 rounded hover:bg-zinc-700">Settings</a>
        </nav>
      </div>
    </aside>
  );
}
