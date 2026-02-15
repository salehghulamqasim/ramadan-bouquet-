import type { BouquetReadOnlyProps } from "@/types/bouquet";
import { flowers } from "../../data/data";

export default function Bouquet({ bouquet, lang }: BouquetReadOnlyProps & { lang?: string }) {

  const getFlowerDimensions = (size: string) => {
    switch (size) {
      case "small": return 80;
      case "large": return 160;
      default: return 120;
    }
  };

  const calculateFontSize = (text: string, containerWidth = 280) => {
    if (!text) return 16;
    const charCount = text.length;
    const minSize = 12;
    const maxSize = 24;
    return Math.max(minSize, Math.min(maxSize, containerWidth / (charCount * 0.45)));
  };

  const messageFontSize = calculateFontSize(bouquet.letter.message);
  const senderFontSize = Math.max(11, Math.min(16, 280 / ((bouquet.letter.sender.length || 1) * 0.6)));

  return (
    // FIXED: Reduced paddingBottom from 160px to 145px
    <div className={`relative ${lang === 'ar' ? 'font-arabic' : ''}`} style={{ width: '500px', maxWidth: '95vw', margin: '0 auto', paddingBottom: '145px' }}>

      {/* Ramadan logo - FIXED: More compact */}
      <div className="text-center pt-3 pb-1">
        <img
          src="/ramadan.webp"
          alt="Ramadan Kareem"
          className="mx-auto"
          width={170}
          height={55}
          loading="eager"
        />
      </div>

      {/* Soft circle background */}
      <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#E8E4D0] opacity-60 -z-10" />

      {/* Main bouquet container - FIXED: Reduced pt */}
      <div className="relative pt-2">

        {/* Flowers section */}
        <div className="relative w-full max-w-[450px] mx-auto min-h-[360px]">

          {/* Bottom bush */}
          <img
            src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}.webp`}
            alt=""
            className="absolute top-1/2 left-1/2 z-0 transform -translate-x-1/2 -translate-y-1/2"
            style={{ width: '550px', height: 'auto' }}
            loading="eager"
          />

          {/* Flowers */}
          <div className="flex flex-wrap-reverse w-[300px] justify-center items-center -space-x-4 -space-y-20 relative m-auto z-10">
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
            style={{ width: '550px', height: 'auto' }}
            loading="eager"
          />

          {/* Card */}
          <div
            className="absolute bottom-[-125px] left-1/2 z-15"
            style={{
              transform: 'translateX(-50%) rotate(-1deg)',
              width: '290px',
              maxWidth: '80vw'
            }}
          >
            <div
              className={`bg-white border-[1.5px] border-black p-2 shadow-md ${lang === 'ar' ? 'font-arabic' : ''}`}
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
                    src="/crescent.webp"
                    alt=""
                    width={24}
                    height={24}
                    className={lang === 'ar' ? 'scale-x-[-1]' : ''}
                    loading="eager"
                  />
                </div>

                <div style={{ textAlign: lang === 'ar' ? 'left' : 'right' }}>
                  <span className="text-[10px] text-gray-500 block mb-0.5 font-bold opacity-70">
                    {lang === 'ar' ? "من" : "Sincerely,"}
                  </span>
                  <p className="font-bold text-xs" style={{ fontSize: `${senderFontSize}px` }}>
                    {bouquet.letter.sender}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}