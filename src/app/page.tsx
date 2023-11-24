import Image from "next/image";
import ParkingSlots from "@/components/ParkingSlots";
export default function Home() {
  return (
    <div className="flex flex-col items-center py-16 justify-center w-full">
      <main className="w-[1200px] relative">
        <div className="absolute top-0 left-0 -z-10">
          <Image src="/park.png" height={800} width={1200} alt="" />
        </div>
        <ParkingSlots />
      </main>
    </div>
  );
}
