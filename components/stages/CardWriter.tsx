import Image from "next/image";
import { useBouquet } from "../../context/BouquetContext";

export default function CardWriter() {
  const { bouquet, setBouquet, lang } = useBouquet();
  return (
    <div className={`text-center ${lang === 'ar' ? 'font-arabic' : ''}`}>
      <div>
        <h2 className="text-md my-8">
          {lang === 'ar' ? "اكتب بطاقتك" : "WRITE THE CARD"}
        </h2>
        <div className="flex flex-row items-center justify-center">
          {/* White card container with black border */}
          <div className="hidden md:flex flex-row items-center justify-center -space-x-12">
            <Image
              src={`/full/flowers/daisy.webp`}
              alt="card front"
              width={140}
              height={200}
              className="-rotate-12 hover:-translate-y-4 transition-all duration-300"
            />
            <Image
              src={`/full/flowers/lily.webp`}
              alt="card front"
              width={140}
              height={200}
              className="-translate-y-5 hover:-translate-y-4 transition-all duration-300"
            />
            <Image
              src={`/full/flowers/anemone.webp`}
              alt="card front"
              width={140}
              height={200}
              className="rotate-12 hover:-translate-y-4 transition-all duration-300"
            />
          </div>

          <div className="bg-white border-2 border-black p-6 md:p-10 w-full max-w-[90vw] md:max-w-lg mx-auto relative md:mx-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {/* Crescent Moon Image - Bottom Left for Arabic, Bottom Right for English (as per user request "maybe even not add crsecent just add crescent finally when done typing") - Wait, user said "maybe even not add crsecent just add crescent finally when done typing". 
             Let's re-read: "okay maybe even not add crsecent just add crescent finally when done typing."
             So REMOVE crescent from here. OK. */}

            <div className="space-y-4">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="recipient">{lang === 'ar' ? "إلى " : "Dear "}</label>
                <input
                  id="recipient"
                  value={bouquet.letter.recipient || ""}
                  onChange={(e) =>
                    setBouquet((prev) => ({
                      ...prev,
                      letter: {
                        ...prev.letter,
                        recipient: e.target.value,
                      },
                    }))
                  }
                  placeholder={lang === 'ar' ? "الأحباب،" : "Flora,"}
                  className={`border-none bg-transparent focus:outline-none focus:ring-0 ${lang === 'ar' ? 'font-arabic' : ''}`}
                />{" "}
              </div>
              <div>
                <textarea
                  id="message"
                  value={bouquet.letter.message || ""}
                  onChange={(e) =>
                    setBouquet((prev) => ({
                      ...prev,
                      letter: {
                        ...prev.letter,
                        message: e.target.value,
                      },
                    }))
                  }
                  placeholder={lang === 'ar' ? "لدي الكثير لأخبرك به، لكن المساحة ضيقة! ومع ذلك، يجب أن تعرف..." : "I have so much to tell you, but so little space on this card! Still, you must know..."}
                  rows={5}
                  className={`w-full border-none bg-transparent focus:outline-none focus:ring-0 ${lang === 'ar' ? 'font-arabic' : ''}`}
                />
              </div>

              <div className="flex flex-col gap-2 mt-4 w-fit ml-auto items-end" style={{ marginLeft: lang === 'ar' ? '0' : 'auto', marginRight: lang === 'ar' ? 'auto' : '0', alignItems: lang === 'ar' ? 'flex-end' : 'flex-start' }}>
                {/* Wait, the original code had "flex-col items-right justify-end gap-2" and label "text-right". 
                      For Arabic (RTL), we want "Sincerely" on the LEFT? No, usually signatures are on the left in English cards (bottom right visually usually).
                      Let's stick to the visual layout.
                      English: Sincerely (Left aligned text?) No, usually bottom right. Original code had "text-right" class on label and input.
                      Arabic: "Best regards" usually bottom left.
                      Let's blindly follow "Sincerely" placement.
                  */}
                <label htmlFor="sender" className={`${lang === 'ar' ? 'text-left' : 'text-right'} w-full`}>
                  {lang === 'ar' ? "تقبل الله منا ومنكم ," : "Sincerely,"}
                </label>
                <input
                  id="sender"
                  value={bouquet.letter.sender || ""}
                  onChange={(e) =>
                    setBouquet((prev) => ({
                      ...prev,
                      letter: {
                        ...prev.letter,
                        sender: e.target.value,
                      },
                    }))
                  }
                  placeholder={lang === 'ar' ? "محبكم" : "Me"}
                  className={`border-none bg-transparent focus:outline-none focus:ring-0 ${lang === 'ar' ? 'text-left font-arabic' : 'text-right'}`}
                />
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-row items-center justify-center -space-x-12">
            <Image
              src={`/full/flowers/carnation.webp`}
              alt="card front"
              width={140}
              height={200}
              className="-rotate-12 hover:-translate-y-4 transition-all duration-300"
            />
            <Image
              src={`/full/flowers/sunflower.webp`}
              alt="card front"
              width={140}
              height={200}
              className="-translate-y-5 hover:-translate-y-4 transition-all duration-300"
            />
            <Image
              src={`/full/flowers/peony.webp`}
              alt="card front"
              width={140}
              height={200}
              className="rotate-12 hover:-translate-y-4 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
