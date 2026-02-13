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

  // 1. Mathematical Text Scaling (Clamp Formula)
  const calculateFontSize = (text: string, containerWidth = 350) => {
    if (!text) return 16;
    const charCount = text.length;
    const weightFactor = 0.5;
    const minSize = 14;
    const maxSize = 30; // Larger max size for short text
    return Math.max(minSize, Math.min(maxSize, containerWidth / (charCount * weightFactor)));
  };

  const messageFontSize = calculateFontSize(bouquet.letter.message);
  const senderFontSize = Math.max(14, Math.min(24, 350 / ((bouquet.letter.sender.length || 1) * 0.7)));

  return (
    <div
      className={`relative w-full max-w-[500px] mx-auto bg-[#F5F5DC] shadow-xl overflow-hidden ${lang === 'ar' ? 'font-arabic' : ''}`}
      style={{ aspectRatio: '4/5' }}
    >
      {/* Container for vertical centering within the 4:5 box */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">

        {/* Bouquet Section (Top) */}
        <div className="relative w-full flex-grow flex items-center justify-center -mb-8">
          <div className="relative w-[500px] h-[410px] transform scale-90 sm:scale-100 flex items-center justify-center">
            {/* Bottom Bush */}
            <Image
              src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}.png`}
              alt="bush background"
              width={600}
              height={500}
              className="absolute top-1/2 left-1/2 z-0 transform -translate-x-1/2 -translate-y-1/2"
              priority
              unoptimized
            />

            {/* Flower Container - using the user's structure but correcting flex-wrap-reverse */}
            <div className="flex flex-wrap-reverse w-[300px] justify-center items-center -space-x-4 -space-y-16 relative z-10 m-auto">
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

                      const dimensions = getFlowerDimensions(flowerData.size);

                      return (
                        <div
                          key={`${flowerIndex}-${instanceIndex}`}
                          className="flex relative justify-center items-center pt-4"
                          style={{ order: index }}
                        >
                          <Image
                            src={`/${bouquet.mode}/flowers/${flowerData.name}.png`}
                            alt={flowerData.name}
                            width={dimensions}
                            height={dimensions}
                            className="relative z-10 transition-transform hover:scale-105"
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
            <Image
              src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}-top.png`}
              alt="bush top"
              width={600}
              height={500}
              className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Card Section (Bottom) - Centered and Dynamic */}
        <div className="w-full max-w-sm mt-4 z-30">
          <div className={`bg-white border-[1.5px] border-black p-6 mx-auto transition-all duration-300 relative w-full ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>

            {/* Recipient */}
            <div className="mb-2 text-left">
              <span className="text-xs uppercase font-bold text-gray-400 block mb-1">
                {lang === 'ar' ? "إلى" : "TO"}
              </span>
              <p className="text-lg font-bold border-b border-black/10 pb-1 inline-block min-w-[50%]">
                {bouquet.letter.recipient}
              </p>
            </div>

            {/* Message - Dynamic Scaling */}
            <div className="py-4 flex items-center justify-center min-h-[80px]">
              <p
                className="text-center w-full leading-relaxed font-serif whitespace-pre-wrap break-words"
                style={{ fontSize: `${messageFontSize}px` }}
              >
                {bouquet.letter.message}
              </p>
            </div>

            {/* Sender & Footer */}
            <div className="flex justify-between items-end mt-4 border-t border-black/5 pt-2 relative">
              {/* Moon */}
              <div className="opacity-80">
                <Image
                  src="/crescent.png"
                  alt="crescent moon"
                  width={28}
                  height={28}
                  className={lang === 'ar' ? 'scale-x-[-1]' : ''}
                  unoptimized
                />
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0 leading-tight">
                  {lang === 'ar' ? "من" : "FROM"}
                </span>
                <p className="font-bold text-lg leading-tight" style={{ fontSize: `${senderFontSize}px` }}>
                  {bouquet.letter.sender}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
