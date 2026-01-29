import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="p-6 text-white">
        <h1>Not logged in</h1>
      </div>
    );
  }

  const { name, email, role } = session.user;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-xl w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">User Info</h1>

        <p><span className="text-gray-400">Name:</span> {name}</p>
        <p><span className="text-gray-400">Email:</span> {email}</p>
        <p><span className="text-gray-400">Role:</span> {role}</p>
      </div>
    </div>
  );
}
