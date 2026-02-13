"use client";
import { useRef } from "react";
import { toPng } from "html-to-image";
import Image from "next/image";
import { flowers } from "../../data/data";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import Bouquet from "../bouquet/Bouquet";
import { useBouquet } from "../../context/BouquetContext";
import type { Bouquet as BouquetType } from "@/types/bouquet";

export default function ShareBouquet() {
  const { bouquet, lang } = useBouquet();
  const bouquetRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (bouquetRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(bouquetRef.current, { cacheBust: true, pixelRatio: 3, backgroundColor: '#F5F5DC' });
      const link = document.createElement("a");
      link.download = "ramadan-bouquet.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    }
  };

  const handleShare = async () => {
    if (bouquetRef.current === null) return;

    try {
      const dataUrl = await toPng(bouquetRef.current, {
        cacheBust: true,
        pixelRatio: 3, // Higher quality for social media
        backgroundColor: '#F5F5DC'
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "ramadan-bouquet.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'DigiBouquet',
          text: lang === 'ar' ? 'صنعت لك هذه الباقة!' : 'I made this bouquet for you!',
        });
      } else {
        // If navigator.share is not supported or sharing files is not allowed,
        // we fallback to the download method.
        handleDownload();
      }
    } catch (err) {
      console.error("Sharing failed", err);
    }
  };

  const router = useRouter();

  return (
    <div className={`text-center ${lang === 'ar' ? 'font-arabic' : ''}`}>
      <h2 className="text-md uppercase text-center mb-10">
        {lang === 'ar' ? "أرسل الباقة" : "SEND THE BOUQUET"}
      </h2>

      <div className="flex justify-center w-full overflow-x-auto no-scrollbar">
        {/* We remove padding here to ensure the captured image is exactly the component size */}
        <div ref={bouquetRef} className="w-fit mx-auto bg-[#F5F5DC] p-8 md:p-12 rounded-none">
          <div className="shadow-2xl">
            <Bouquet bouquet={bouquet} lang={lang} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center mt-8">
        <button
          onClick={handleShare}
          className="uppercase text-white bg-black px-8 py-3 hover:bg-black/90 transition-colors w-full max-w-xs"
        >
          {lang === 'ar' ? "مشاركة" : "SHARE"}
        </button>

        <button
          onClick={handleDownload}
          className="uppercase text-black border border-black px-8 py-3 hover:bg-gray-100 transition-colors w-full max-w-xs"
        >
          {lang === 'ar' ? "حمّل البطاقة" : "DOWNLOAD CARD"}
        </button>
      </div>
    </div>
  );
}
