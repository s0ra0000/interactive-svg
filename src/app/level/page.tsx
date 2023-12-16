import Link from "next/link";
export default function Page() {
  return (
    <div className="flex flex-col h-screen items-center py-16 justify-center w-full">
      <main className="max-w-[1200px] relative">
        <div className="mt-12 flex flex-row gap-12 justify-center">
          <Link href="/level/1">
            <div className="px-8 py-3 border rounded-xl border-slate-100 hover:bg-slate-100 hover:text-blue-950 transition duration-200 ease-in-out cursor-pointer ">
              Level 1
            </div>
          </Link>
          <Link href="/level/2">
            <div className="px-8 py-3 border rounded-xl border-slate-100 hover:bg-slate-100 hover:text-blue-950 transition duration-200 ease-in-out cursor-pointer ">
              Level 2
            </div>
          </Link>
          <Link href="/level/3">
            <div className="px-8 py-3 border rounded-xl border-slate-100 hover:bg-slate-100 hover:text-blue-950 transition duration-200 ease-in-out cursor-pointer ">
              Level 3
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
