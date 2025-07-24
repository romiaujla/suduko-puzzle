import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [sudukoSize, setSudukoSize] = useState(9);



  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="suduko grid grid-cols-9 gap-0">
        {
          [...Array(sudukoSize * sudukoSize)].map((_, index) => {
            const row = Math.floor(index / sudukoSize);
            const col = index % sudukoSize;

            return (
              <input
                key={index}
                type="text"
                value={index}
                className="text-center border"
                maxLength={1}
                data-row={row}
                data-col={col}
              />
            )
          })
        }
      </div>
    </div>

  );
}
