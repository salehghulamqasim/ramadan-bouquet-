"use client";
import { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import Bouquet from "../bouquet/Bouquet";
import { useBouquet } from "../../context/BouquetContext";

export default function ShareBouquet() {
  const { bouquet, lang } = useBouquet();
  const bouquetRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    // Elegant star burst from the top
    const count = 150;
    const defaults = {
      origin: { y: -0.1 },
      spread: 360,
      ticks: 300,
      gravity: 0.6,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['star'] as confetti.Shape[],
      colors: ['#FFE87C', '#FFD700', '#F4F4F4', '#B8860B'], // Varied Gold, Silver/White, Dark gold
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 50,
        scalar: 1.2,
        origin: { x: 0.5, y: -0.1 }
      });

      confetti({
        ...defaults,
        particleCount: 25,
        scalar: 0.75,
        origin: { x: 0.2, y: -0.1 }
      });

      confetti({
        ...defaults,
        particleCount: 25,
        scalar: 0.75,
        origin: { x: 0.8, y: -0.1 }
      });
    }

    // Single elegant burst on entry
    shoot();
  }, []);

  const handleDownload = async () => {
    if (!bouquetRef.current) return;
    setIsDownloading(true);

    try {
      await new Promise(r => setTimeout(r, 800));
      const dataUrl = await toPng(bouquetRef.current, {
        pixelRatio: 3,
        style: {
          borderRadius: "32px",
          overflow: "hidden",
        }
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
        pixelRatio: 3,
        style: {
          borderRadius: "32px",
          overflow: "hidden",
        }
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

  // We need to render the hidden export component in the DOM
  // The state and logic are already updated in previous step
  // Just ensuring the return statement is clean
  return (
    <div className="text-center bg-[#F5F5DC] min-h-screen flex flex-col">


      {/* FIXED: Reduced top padding */}
      <h2 className="text-sm uppercase pt-4 mb-4">
        {lang === 'ar' ? "أرسل الباقة" : "SEND YOUR BOUQUET TO YOUR BELOVED ONES"}
      </h2>

      {/* FIXED: Reduced bottom margin */}
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