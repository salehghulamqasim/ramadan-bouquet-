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
      const dataUrl = await toPng(bouquetRef.current, { cacheBust: true, pixelRatio: 2, backgroundColor: '#F5F5DC' });
      const link = document.createElement("a");
      link.download = "my-digibouquet.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    }
  };

  // Helper function to get flower dimensions based on size
  const getFlowerDimensions = (size: string) => {
    switch (size) {
      case "small":
        return 80;
      case "large":
        return 160;
      default:
        return 120; // medium
    }
  };

  const router = useRouter();

  const handleCreateBouquet = async (bouquet: BouquetType) => {
    const short_id = nanoid(8);

    if (!supabase) {
      alert("Sharing is currently disabled as the database is not configured. Please use the 'Download Card' Feature.");
      return;
    }

    /*
    // @ts-ignore
    const { data, error } = await supabase!
      .from("bouquets")
      .insert([
        {
          short_id: short_id,
          mode: `${bouquet.mode}&lang=${lang === 'ar' ? 'ar' : 'en'}`,
          flowers: bouquet.flowers,
          letter: bouquet.letter,
          timestamp: bouquet.timestamp,
          greenery: bouquet.greenery,
          flowerOrder: bouquet.flowerOrder,
        },
      ])
      .select(); // returns inserted row(s)
      */
    console.log("Supabase insert disabled");
    const error = { message: "Supabase disabled" };
    const dbData: any[] | null = null;

    if (error || !dbData || (dbData as any).length === 0) {
      console.error("Error creating bouquet:", error);
      alert("Sharing is currently disabled. Please use 'Download Card'.");
      return;
    }

    const bouquetId = (dbData as any)[0].id;
    router.push(`/bouquet/${bouquetId}`);
  };

  return (
    <div className={`text-center ${lang === 'ar' ? 'font-arabic' : ''}`}>
      <h2 className="text-md uppercase text-center mb-10">
        {lang === 'ar' ? "أرسل الباقة" : "SEND THE BOUQUET"}
      </h2>

      <div className="flex justify-center w-full overflow-x-auto no-scrollbar">
        <div ref={bouquetRef} className="w-fit mx-auto p-4 sm:p-8 bg-[#F5F5DC]"> {/* Added bg color explicitly to capture correctly if transparent */}
          <Bouquet bouquet={bouquet} lang={lang} />
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center mt-8">
        <button
          onClick={handleDownload}
          className="uppercase text-black border border-black px-8 py-3 hover:bg-gray-100 transition-colors w-full max-w-xs"
        >
          {lang === 'ar' ? "حمّل البطاقة" : "DOWNLOAD CARD"}
        </button>

        <button
          onClick={() => {
            console.log("Sending bouquet");
            handleCreateBouquet(bouquet);
          }}
          className="uppercase text-white bg-black px-8 py-3 hover:bg-black/90 transition-colors w-full max-w-xs"
        >
          {lang === 'ar' ? "اصنع رابط مشاركة" : "CREATE SHAREABLE LINK"}
        </button>
      </div>
    </div>
  );
}
