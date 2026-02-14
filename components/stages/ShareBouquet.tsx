"use client";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import Bouquet from "../bouquet/Bouquet";
import { useBouquet } from "../../context/BouquetContext";

export default function ShareBouquet() {
  const { bouquet, lang } = useBouquet();
  const bouquetRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleDownload = async () => {
    if (!bouquetRef.current) return;
    setIsDownloading(true);

    try {
      await new Promise(r => setTimeout(r, 800));
      const dataUrl = await toPng(bouquetRef.current, {
        backgroundColor: '#F5F5DC',
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = "bouquet.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!bouquetRef.current) return;
    setIsSharing(true);

    try {
      await new Promise(r => setTimeout(r, 800));
      const dataUrl = await toPng(bouquetRef.current, {
        backgroundColor: '#F5F5DC',
        pixelRatio: 2,
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "bouquet.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
      } else {
        handleDownload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="text-center bg-[#F5F5DC] min-h-screen flex flex-col">
      {/* FIXED: Reduced top padding */}
      <h2 className="text-sm uppercase pt-4 mb-4">
        {lang === 'ar' ? "أرسل الباقة" : "SEND YOUR BOUQUET TO YOUR BELOVED ONES"}
      </h2>

      {/* FIXED: Reduced bottom margin */}
      <div className="flex justify-center mb-4">
        <div ref={bouquetRef} className="bg-[#F5F5DC] pb-8">
          <Bouquet bouquet={bouquet} lang={lang} />
        </div>
      </div>

      {/* FIXED: Better Arabic button text + reduced spacing */}
      <div className="flex flex-col gap-3 items-center max-w-xs mx-auto px-4 pb-6">
        <button
          onClick={handleShare}
          disabled={isSharing || isDownloading}
          className="uppercase text-white bg-black px-8 py-3 w-full text-sm font-bold disabled:opacity-50"
        >
          {/* FIXED: Better Arabic text */}
          {isSharing ? '...' : (lang === 'ar' ? 'مشاركة الباقة' : 'SHARE')}
        </button>

        <button
          onClick={handleDownload}
          disabled={isSharing || isDownloading}
          className="uppercase border-2 border-black px-8 py-3 w-full text-sm font-bold disabled:opacity-50"
        >
          {/* FIXED: Better Arabic text */}
          {isDownloading ? '...' : (lang === 'ar' ? 'تحميل الصورة' : 'DOWNLOAD')}
        </button>
      </div>
    </div>
  );
}