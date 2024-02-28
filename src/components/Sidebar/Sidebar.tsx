// components/Sidebar.tsx
const Sidebar: React.FC = () => {
    return (
      <div className="bg-gray-800 h-screen w-64 fixed top-0 left-0 flex flex-col">
        <div className="p-4 text-white font-bold">Dashboard</div>
        <ul>
          <li className="p-4 text-white cursor-pointer hover:bg-gray-700">All Users</li>
          <li className="p-4 text-white cursor-pointer hover:bg-gray-700">Blocked Users</li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;
  