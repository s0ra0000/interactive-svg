"use client";
import Image from "next/image";
import ParkingSlots from "@/components/ParkingSlots";
import React, { useState, useEffect } from "react";
import MazeContainer from "@/components/MazeContainer";
export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center py-16 justify-center w-full">
      <main className="max-w-[1200px] relative">
        <MazeContainer />
      </main>
    </div>
  );
}
