import type { BouquetReadOnlyProps } from "@/types/bouquet";
import { flowers } from "../../data/data";

export default function Bouquet({ bouquet, lang }: BouquetReadOnlyProps & { lang?: string }) {

  const getFlowerDimensions = (size: string) => {
    switch (size) {
      case "small": return 70;
      case "large": return 140;
      default: return 105;
    }
  };

  // Dynamic card sizing
  const maxTextLength = Math.max(
    bouquet.letter.message?.length || 0,
    bouquet.letter.recipient?.length || 0,
    bouquet.letter.sender?.length || 0
  );

  const cardWidth =
    maxTextLength > 160 ? 420 :
      maxTextLength > 80 ? 360 :
        maxTextLength < 40 ? 240 : 290;

  const calculateFontSize = (text: string, containerWidth = 280) => {
    if (!text) return 18;
    const charCount = text.length;
    const minSize = 14;
    const maxSize = 32;
    return Math.max(minSize, Math.min(maxSize, containerWidth / (charCount * 0.44)));
  };

  const messageFontSize = calculateFontSize(bouquet.letter.message, cardWidth);
  const senderFontSize = Math.max(11, Math.min(16, 280 / ((bouquet.letter.sender.length || 1) * 0.6)));

  return (
    <div
      className={`relative ${lang === 'ar' ? 'font-arabic' : ''}`}
      style={{
        width: '500px',
        maxWidth: '95vw',
        margin: '0 auto',
      }}
    >

      {/* Eid Saeed logo */}
      <div className="text-center pt-3 pb-1">
        <img
          src="/eid_saeed.png"
          alt="Eid Saeed"
          className="mx-auto"
          width={170}
          height={55}
          loading="eager"
        />
      </div>

      {/* Eid Decorations - Stars & Crescents */}
      <div className="absolute top-8 left-4 z-20 pointer-events-none" style={{ opacity: 0.6 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#C8A84E">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
        </svg>
      </div>
      <div className="absolute top-16 right-6 z-20 pointer-events-none" style={{ opacity: 0.5 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#C8A84E">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
        </svg>
      </div>
      <div className="absolute top-4 right-16 z-20 pointer-events-none" style={{ opacity: 0.45 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4AF37">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
        </svg>
      </div>
      {/* Crescent decorations */}
      <div className="absolute top-6 left-1/4 z-20 pointer-events-none" style={{ opacity: 0.4 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#C8A84E">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
      </div>

      {/* Bouquet flowers section */}
      <div className="relative pt-2">
        <div className="relative w-full max-w-[450px] mx-auto min-h-[480px] -mt-6">

          {/* Bottom bush */}
          <img
            src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}.webp`}
            alt=""
            className="absolute top-1/2 left-1/2 z-0 transform -translate-x-1/2 -translate-y-1/2"
            style={{ width: '500px', height: 'auto' }}
            loading="eager"
          />

          {/* Flowers */}
          <div className="flex flex-wrap-reverse w-[380px] justify-center items-center space-x-2 -space-y-10 relative m-auto z-10 pt-16">
            {bouquet.flowers.flatMap(
              (flower: { id: number; count: number }, flowerIndex: number) => {
                const flowerData = flowers.find((f) => f.id === flower.id);
                if (!flowerData) return [];

                return Array(flower.count)
                  .fill(null)
                  .map((_, instanceIndex) => {
                    const rotation = Math.random() * 10 - 5;
                    const index =
                      bouquet.flowerOrder.length > 0
                        ? bouquet.flowerOrder[flowerIndex * flower.count + instanceIndex] ??
                        flowerIndex * flower.count + instanceIndex
                        : flowerIndex * flower.count + instanceIndex;

                    const dimensions = getFlowerDimensions(flowerData.size);

                    return (
                      <div
                        key={`${flowerIndex}-${instanceIndex}`}
                        className="flex relative justify-center items-center pt-4"
                        style={{ order: index }}
                      >
                        <img
                          src={`/${bouquet.mode}/flowers/${flowerData.name}.webp`}
                          alt=""
                          width={dimensions}
                          height={dimensions}
                          className="relative z-10"
                          style={{ transform: `rotate(${rotation}deg)` }}
                          loading="eager"
                        />
                      </div>
                    );
                  });
              }
            )}
          </div>

          {/* Top bush */}
          <img
            src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}-top.webp`}
            alt=""
            className="absolute top-1/2 left-1/2 z-12 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: '500px', height: 'auto' }}
            loading="eager"
          />
        </div>
      </div>

      {/* Card - NOW in normal flow, sitting safely below the bouquet */}
      <div
        className="relative z-15 mx-auto"
        style={{
          marginTop: '10px',
          transform: 'rotate(-1deg)',
          width: `${cardWidth}px`,
          maxWidth: '90vw'
        }}
      >
        <div
          className={`bg-white border-[1.5px] border-black p-3 shadow-lg ${lang === 'ar' ? 'font-arabic' : ''}`}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >

          {/* Recipient */}
          <div className="mb-2" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
            <span className="text-[10px] text-gray-500 block mb-0.5 font-bold opacity-70">
              {lang === 'ar' ? "إلى" : "Dear"}
            </span>
            <p className="text-sm font-bold">
              {bouquet.letter.recipient}
            </p>
          </div>

          {/* Message */}
          <div className="py-2 min-h-[45px]">
            <p
              className="text-center leading-snug"
              style={{ fontSize: `${messageFontSize}px` }}
            >
              {bouquet.letter.message}
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end mt-2 pt-2">
            <div>
              <img
                src="/eid_firework.png"
                alt=""
                width={36}
                height={36}
                className={lang === 'ar' ? 'scale-x-[-1]' : ''}
                loading="eager"
              />
            </div>

            <div style={{ textAlign: lang === 'ar' ? 'left' : 'right' }}>
              <span className="text-[10px] text-gray-500 block mb-0.5 font-bold opacity-70">
                {lang === 'ar' ? "كل عام وأنتم بخير ," : "Eid Mubarak,"}
              </span>
              <p className="font-bold text-xs" style={{ fontSize: `${senderFontSize}px` }}>
                {bouquet.letter.sender}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}