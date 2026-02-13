import Image from "next/image";
import { flowers } from "../../data/data";
import type { BouquetReadOnlyProps } from "@/types/bouquet";

export default function Bouquet({ bouquet, lang }: BouquetReadOnlyProps & { lang?: string }) {
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

  // Mathematical Text Scaling (Clamp Formula)
  const calculateFontSize = (text: string, containerWidth = 400) => {
    if (!text) return 16;
    const charCount = text.length;
    const weightFactor = 0.5;
    const minSize = 14;
    const maxSize = 28;
    return Math.max(minSize, Math.min(maxSize, containerWidth / (charCount * weightFactor)));
  };

  const messageFontSize = calculateFontSize(bouquet.letter.message);

  return (
    <div
      className={`relative w-full max-w-[500px] mx-auto bg-[#F5F5DC] shadow-xl flex flex-col items-center justify-between p-8 ${lang === 'ar' ? 'font-arabic' : ''}`}
      style={{ aspectRatio: '4/5', minHeight: '625px' }}
    >
      {/* 1. Flowers/Bouquet Section (Top 65%) */}
      <div className="relative w-full h-[60%] flex items-center justify-center mb-8">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Bottom Bush */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <Image
              src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}.png`}
              alt="bush background"
              width={500}
              height={400}
              className="object-contain"
              priority
              unoptimized
            />
          </div>

          {/* Flowers Container */}
          <div className="relative z-10 flex flex-wrap-reverse justify-center items-center -space-x-8 -space-y-12 w-[80%] mx-auto">
            {bouquet.flowers.flatMap(
              (flower: { id: number; count: number }, flowerIndex: number) => {
                const flowerData = flowers.find((f) => f.id === flower.id);
                if (!flowerData) return [];

                return Array(flower.count)
                  .fill(null)
                  .map((_, instanceIndex) => {
                    const rotation = Math.random() * 10 - 5;
                    const index = bouquet.flowerOrder.length > 0
                      ? bouquet.flowerOrder[flowerIndex * flower.count + instanceIndex] ?? flowerIndex * flower.count + instanceIndex
                      : flowerIndex * flower.count + instanceIndex;

                    const dimensions = getFlowerDimensions(flowerData.size) * 0.8;

                    return (
                      <div
                        key={`${flowerIndex}-${instanceIndex}`}
                        className="flex relative justify-center items-center"
                        style={{ order: index }}
                      >
                        <Image
                          src={`/${bouquet.mode}/flowers/${flowerData.name}.png`}
                          alt={flowerData.name}
                          width={dimensions}
                          height={dimensions}
                          className="relative z-10"
                          style={{ transform: `rotate(${rotation}deg)` }}
                          priority
                          unoptimized
                        />
                      </div>
                    );
                  });
              }
            )}
          </div>

          {/* Top Bush */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <Image
              src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}-top.png`}
              alt="bush top"
              width={500}
              height={400}
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* 2. Message Card Section (Bottom 35%) */}
      <div className="w-full bg-white border-[1.5px] border-black p-6 relative flex flex-col justify-between" style={{ minHeight: '180px' }}>
        {/* Recipient */}
        <div className="text-left w-full mb-2">
          <p className="text-xs font-bold font-sans opacity-50 uppercase tracking-tighter">
            {lang === 'ar' ? "إلى" : "TO"}
          </p>
          <p className="text-lg font-bold border-b border-black/10 pb-1">
            {bouquet.letter.recipient}
          </p>
        </div>

        {/* Message */}
        <div className="flex-grow flex items-center justify-center py-4">
          <p
            className="text-center w-full leading-relaxed"
            style={{ fontSize: `${messageFontSize}px` }}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            {bouquet.letter.message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-4 border-t border-black/5 pt-2">
          {/* Moon */}
          <div className="opacity-80">
            <Image
              src="/crescent.png"
              alt="crescent moon"
              width={24}
              height={24}
              className={lang === 'ar' ? 'scale-x-[-1]' : ''}
              unoptimized
            />
          </div>

          <div className="text-right">
            <p className="text-[10px] opacity-40 uppercase font-bold">
              {lang === 'ar' ? "من" : "FROM"}
            </p>
            <p className="font-bold text-lg">
              {bouquet.letter.sender}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
