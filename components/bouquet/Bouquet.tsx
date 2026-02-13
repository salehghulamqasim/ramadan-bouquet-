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
  // fontSize = Math.max(minSize, Math.min(maxSize, containerWidth / (charCount * weightFactor)))
  const calculateFontSize = (text: string, containerWidth = 600) => { // Assuming a base container width
    if (!text) return 16;
    const charCount = text.length;
    // Weight factor: Adjust this to tune the shrinking speed. 
    // Higher = shrinks faster. Lower = shrinks slower.
    const weightFactor = 0.5;
    const minSize = 14;
    const maxSize = 34; // Larger max size for short text

    // Using the requested formula structure
    return Math.max(minSize, Math.min(maxSize, containerWidth / (charCount * weightFactor)));
  };

  const messageFontSize = calculateFontSize(bouquet.letter.message);
  // Sender font size also needs to scale slightly if names are long
  const senderFontSize = Math.max(14, Math.min(20, 400 / ((bouquet.letter.sender.length || 1) * 0.7)));

  return (
    <div
      className={`relative w-full max-w-[500px] mx-auto bg-[#F5F5DC] shadow-xl overflow-hidden ${lang === 'ar' ? 'font-arabic' : ''}`}
      style={{ aspectRatio: '4/5' }}
    >
      {/* 2. Social Media Aspect Ratio Layout */}

      {/* Safe Zone Container */}
      <div className="absolute inset-0 w-full h-full">

        {/* TOP SECTION: Bouquet (Central 60% approx, positioned comfortably) */}
        {/* Using absolute centering for the specific layers */}

        {/* Bush Layer 1 (Bottom) */}
        <div className="absolute left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[85%] h-auto z-0 pointer-events-none">
          <Image
            src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}.png`}
            alt="bush background"
            width={600}
            height={500}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Flowers Layer */}
        <div className="absolute left-1/2 top-[38%] transform -translate-x-1/2 -translate-y-1/2 w-[65%] z-10 flex flex-wrap-reverse justify-center items-center -space-x-4 -space-y-16">
          {bouquet.flowers.flatMap(
            (
              flower: { id: number; count: number },
              flowerIndex: number
            ) => {
              const flowerData = flowers.find((f) => f.id === flower.id);
              if (!flowerData) return [];

              return Array(flower.count)
                .fill(null)
                .map((_, instanceIndex) => {
                  const rotation = Math.random() * 10 - 5;
                  const index =
                    bouquet.flowerOrder.length > 0
                      ? bouquet.flowerOrder[
                      flowerIndex * flower.count + instanceIndex
                      ] ?? flowerIndex * flower.count + instanceIndex
                      : flowerIndex * flower.count + instanceIndex;

                  // Slightly scale down flowers for this compact vertical layout
                  const dimensions = getFlowerDimensions(flowerData.size) * 0.9;

                  return (
                    <div
                      key={`${flowerIndex}-${instanceIndex}`}
                      className="flex relative justify-center items-center pt-2"
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

        {/* Bush Layer 2 (Top) */}
        <div className="absolute left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[85%] h-auto z-20 pointer-events-none">
          <Image
            src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}-top.png`}
            alt="bush top"
            width={600}
            height={500}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

        {/* BOTTOM SECTION: Card/Text (Bottom 25%) */}
        {/* We use a backdrop blur to separate it nicely from the bouquet stems if they overlap */}
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-white/95 backdrop-blur-sm border-t-2 border-black p-6 flex flex-col justify-between z-30">

          {/* Dynamic Message Container */}
          <div className="w-full h-full flex flex-col justify-center">
            {/* Recipient */}
            <div className="w-full text-center mb-1">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                {lang === 'ar' ? "إلى" : "TO"}
              </p>
              <p className="font-bold text-base line-clamp-1">
                {bouquet.letter.recipient}
              </p>
            </div>

            {/* Message Body */}
            <div className="flex-grow flex items-center justify-center px-2 py-2">
              <p
                className="text-center leading-relaxed font-serif w-full break-words whitespace-pre-wrap"
                style={{ fontSize: `${messageFontSize}px`, lineHeight: '1.4' }}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              >
                {bouquet.letter.message}
              </p>
            </div>
          </div>

          {/* Footer: Sender & Signature */}
          <div className="w-full flex justify-between items-end border-t border-gray-100 pt-2 mt-1 relative">

            {/* Moon Icon: Bottom LEFT for English, Bottom RIGHT for Arabic */}
            {/* We reverse flex direction for Arabic to achieve this flip naturally */}
            <div className={`absolute bottom-0 ${lang === 'ar' ? 'right-0' : 'left-0'} opacity-100 pointer-events-none`}>
              <Image
                src="/crescent.png"
                alt="crescent moon"
                width={28}
                height={28}
                className={`object-contain ${lang === 'ar' ? 'scale-x-[-1]' : ''}`}
              />
            </div>

            {/* Filler to push sender to the correct side */}
            <div className="w-8"></div>

            <div className="text-right z-10">
              <p className="text-[10px] text-gray-400 uppercase leading-none mb-1">
                {lang === 'ar' ? "من" : "FROM"}
              </p>
              <p className="font-bold whitespace-nowrap leading-none" style={{ fontSize: `${senderFontSize}px` }}>
                {bouquet.letter.sender}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
