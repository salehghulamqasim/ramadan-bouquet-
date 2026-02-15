// app/bouquet/[id]/page.tsx
export const runtime = 'edge';
import { supabase } from "@/lib/supabase"; // we'll make this below
import Bouquet from "../../../components/bouquet/Bouquet";
import Image from "next/image";
import Link from "next/link";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export default async function BouquetPage(props: Params) {
  const params = await props.params;
  const { id } = params;

  if (!supabase) {
    return <div>Database connection not configured.</div>;
  }

  const { data, error } = await supabase
    .from("bouquets")
    .select()
    .eq("id", id)
    .single();

  if (error || !data) {
    return <div>404 - Bouquet not found</div>;
  }

  const lang = data.mode.includes("lang=ar") ? "ar" : "en";
  // Clean the mode string for image paths
  data.mode = data.mode.replace(/&lang=\w+/, "").replace(/\?lang=\w+/, ""); // Coverage for both separators just in case

  return (
    <div className="text-center p-6 bg-[#F9F9EE] flex flex-col items-center min-h-screen">
      {/* Logo/Branding */}
      <Link href="/">
        <Image
          src="/ramadan.webp"
          alt="ramadan"
          width={200}
          height={80}
          className="object-cover mx-auto my-10"
          priority
        />
      </Link>
      <h2 className="text-lg mb-14 ">
        {lang === 'ar' ? "مرحباً، صنعت لك هذه الباقة!" : "Hi, I made this bouquet for you!"}
      </h2>
      <Bouquet bouquet={data} lang={lang} />
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
          <span>{lang === 'ar' ? "النسخة الأصلية لـ:" : "Tool originally by:"}</span>
          <Link
            href="https://x.com/pau_wee_"
            className="text-sm text-gray-500 underline"
          >
            @pau_wee_
          </Link>
        </div>
      </div>
      <Link href="/" className="text-sm underline text-gray-500 mt-2">
        {lang === 'ar' ? "اصنع باقتك الآن!" : "make a bouquet now!"}
      </Link>
    </div>
  );
}
