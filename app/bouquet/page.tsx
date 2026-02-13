// app/bouquet/page.tsx
export const runtime = 'edge';
import { BouquetProvider } from "../../context/BouquetContext";
import BouquetCreationFlow from "../../components/bouquet/BouquetCreationFlow";

// Main component that provides the context
export default async function Home(props: {
  searchParams: Promise<{ mode?: string; lang?: string }>;
}) {
  // Extract params
  const searchParams = await props.searchParams;
  console.log("SearchParams:", searchParams);
  const { mode = "mono", lang = "ar" } = searchParams;

  return (
    <BouquetProvider mode={mode} lang={lang}>
      <BouquetCreationFlow />
    </BouquetProvider>
  );
}
