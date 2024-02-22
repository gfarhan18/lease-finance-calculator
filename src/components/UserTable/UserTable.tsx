// components/UserTable.tsx
interface User {
    id: number;
    name: string;
    email: string;
    status: string;
  }
  
  interface UserTableProps {
    users: User[];
  }
  
  const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
      <div className="ml-64 mt-10 p-4">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default UserTable;
  