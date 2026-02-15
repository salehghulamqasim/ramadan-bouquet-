"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("ar");

  const t = {
    en: {
      tagline: "Blessings blooming, prayers shared digitally.",
      build: "CRAFT YOUR GREETING",
      mono: "IN BLACK AND WHITE",
      garden: "VIEW GARDEN",
      madeBy: "Modified by Saleh Ghulam, originally by",
      toggle: "العربية",
    },
    ar: {
      tagline: "باقة دعاء، تُهدى للأحبة في شهر الضياء",
      build: "اصنع باقة تهنئة",
      mono: "بالأبيض والأسود",
      garden: "بستان الدعاء",
      madeBy: "تعديل صالح غلام، صُنع بالأصل بواسطة",
      toggle: "English",
    },
  };

  const content = lang === "en" ? t.en : t.ar;

  return (
    <div className={`flex flex-col justify-center items-center p-4 min-h-screen font-mono uppercase ${lang === 'ar' ? 'font-arabic' : ''}`}>
      {/* Removed absolute toggle button */}

      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 py-8 z-10 relative">
        {/* Crescent Moon - Responsive Sizing */}
        <div className="mb-4 w-full flex justify-center">
          <Image
            src="/ramadanfavicon.webp"
            alt="ramadan icon"
            width={100}
            height={100}
            className="w-auto h-auto max-w-[20vw] md:max-w-[100px] object-contain"
            priority
          />
        </div>

        {/* Calligraphy - Responsive Sizing */}
        <div className="mb-8 w-full flex justify-center">
          <Image
            src="/ramadan.webp"
            alt="ramadan"
            width={600}
            height={400}
            className="w-auto h-auto max-w-[90vw] md:max-w-[600px] object-contain"
            priority
          />
        </div>

        <p className={`my-6 text-center text-sm md:text-base ${lang === 'ar' ? 'text-lg' : ''}`}>
          {lang === 'ar' ? (
            <>
              باقة دعاء<br />تُهدى للأحبة في شهر الضياء
            </>
          ) : (
            <>
              Blessings blooming<br />prayers shared digitally
            </>
          )}
        </p>
        <div className="flex flex-col justify-center items-center">
          <Link
            href={`/bouquet?mode=color&lang=${lang}`}
            className="text-sm px-8 py-4 bg-[#000000] text-[#F5F5DC] hover:bg-[#0A0000]/90 m-2"
          >
            {content.build}
          </Link>

          <Link
            href={`/bouquet?mode=mono&lang=${lang}`}
            className="text-sm px-8 py-4 border border-black text-[#000000] hover:bg-[#F5F5AC]/90 m-2"
          >
            {content.mono}
          </Link>

          {/* Replaced Garden Link with Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="text-sm px-8 py-4 text-[#000000] m-2 hover:text-gray-500 transition-colors"
          >
            {content.toggle}
          </button>
        </div>

        <div className="mt-10 text-sm text-gray-500 flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <span>{lang === 'ar' ? "تعديل:" : "Modified by:"}</span>
            <Link
              href="https://www.linkedin.com/in/salehghulam/"
              className="text-sm text-gray-500 underline"
            >
              @saleh_ghulam
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <span>{lang === 'ar' ? "النسخة الأصلية لـ:" : "Originally by:"}</span>
            <Link
              href="https://x.com/pau_wee_"
              className="text-sm text-gray-500 underline"
            >
              @pau_wee_
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
