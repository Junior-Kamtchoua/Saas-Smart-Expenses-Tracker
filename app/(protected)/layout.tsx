import { redirect } from "next/navigation";
import { getUserServer } from "@/lib/getUser";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserServer();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="font-semibold text-gray-800">Dashboard</h1>

          <div className="flex items-center gap-4">
            <Header />
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
