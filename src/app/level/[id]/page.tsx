"use client";
import MazeContainer from "@/components/MazeContainer";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col h-screen items-center py-16 justify-center w-full">
      <main className="max-w-[1200px] relative">
        <MazeContainer id={params.id} />
      </main>
    </div>
  );
}
