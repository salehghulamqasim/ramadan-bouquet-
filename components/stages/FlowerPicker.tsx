"use client";

import Image from "next/image";
import { flowers } from "../../data/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBouquet } from "../../context/BouquetContext";
import { createFlowerCountMap } from "@/lib/bouquet-utils";
import type { Flower } from "@/types/bouquet";

// Type the flowers data from the imported data file using the proper Flower interface
// Type the flowers data from the imported data file using the proper Flower interface
const flowersData = flowers as (Flower & { nameAr?: string; meaningAr?: string })[];

const monthMap: Record<string, string> = {
  January: "يناير",
  February: "فبراير",
  March: "مارس",
  April: "أبريل",
  May: "مايو",
  June: "يونيو",
  July: "يوليو",
  August: "أغسطس",
  September: "سبتمبر",
  October: "أكتوبر",
  November: "نوفمبر",
  December: "ديسمبر",
};

export default function FlowerPicker() {
  const { bouquet, totalFlowers, addFlower, removeFlower, lang } = useBouquet();

  // Convert bouquet flowers array to a map for easier counting and display
  // This creates a lookup table: flowerId -> count using utility function
  const selectedFlowersMap = createFlowerCountMap(bouquet.flowers);

  return (
    <TooltipProvider disableHoverableContent delayDuration={0}>
      <div className={`h-full text-center dfont-crimson ${lang === 'ar' ? 'font-arabic' : ''}`}>
        {/* Page title */}
        <h2 className="mb-4 uppercase text-md">
          {lang === 'ar' ? "اختر من 6 إلى 10 زهرات" : "Pick 6 to 10 BLOOMS"}
        </h2>

        {/* Help text - only show if flowers are selected */}
        {totalFlowers > 0 && (
          <p className="mb-8 text-sm opacity-50">
            {lang === 'ar' ? "اضغط على اسم الزهرة لإلغاء تحديدها." : "Click on a flower's name to deselect it."}
          </p>
        )}

        {/* Grid of available flowers */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 items-center min-h-[200px]">
          {flowersData.map((flower) => (
            <Tooltip key={flower.id}>
              <TooltipTrigger asChild>
                <button
                  className="flex relative flex-col items-center cursor-pointer"
                  onClick={(event) => {
                    event.preventDefault();
                    addFlower(flower);
                  }} // Add flower on click
                >
                  {/* Flower image container with dynamic sizing based on flower size */}
                  <div
                    className={`${flower.size === "small"
                      ? "w-32 h-32"
                      : flower.size === "large"
                        ? "w-48 h-48"
                        : "w-40 h-40"
                      } flex items-center justify-center transition-transform duration-300 overflow-hidden ${
                      // Add selection effect
                      selectedFlowersMap[flower.id]
                        ? "transform -translate-y-2"
                        : ""
                      } hover:transform hover:-translate-y-2`}
                  >
                    {/* Flower image */}

                    <Image
                      src={
                        "/" + bouquet.mode + "/flowers/" + flower.name + ".png"
                      }
                      alt={lang === 'ar' ? (flower.nameAr || flower.name) : flower.name}
                      width={
                        flower.size === "small"
                          ? 128
                          : flower.size === "large"
                            ? 192
                            : 160
                      }
                      height={
                        flower.size === "small"
                          ? 128
                          : flower.size === "large"
                            ? 192
                            : 160
                      }
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Count badge - shows how many of this flower are selected */}
                  {selectedFlowersMap[flower.id] && (
                    <div className="flex absolute top-0 right-0 justify-center items-center w-5 h-5 text-xs rounded-full bg-primary text-primary-foreground sm:w-6 sm:h-6">
                      {selectedFlowersMap[flower.id]}
                    </div>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent
                onPointerDownOutside={(e) => e.preventDefault()}
                side="bottom"
                sideOffset={8}
                className={`z-10 p-4 w-auto min-w-[120px] text-center ${lang === 'ar' ? 'font-arabic' : ''}`}
              >
                <h3 className="font-bold text-xl md:text-2xl">
                  {lang === 'ar' ? (flower.nameAr || flower.name) : flower.name.toUpperCase()}
                </h3>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Selected flowers summary */}
        <div className="mt-4">
          {/* List of selected flowers with counts - clickable to remove */}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {Object.entries(selectedFlowersMap).map(([id, count]) => {
              const flower = flowersData.find(
                (f) => f.id === Number.parseInt(id)
              );
              if (!flower) return null;
              return (
                <div
                  key={id}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors cursor-pointer border-primary text-primary hover:bg-primary hover:text-primary-foreground ${lang === 'ar' ? 'font-arabic' : ''}`}
                  onClick={() => removeFlower(Number.parseInt(id))} // Remove flower on click
                >
                  {lang === 'ar' ? (flower.nameAr || flower.name).toUpperCase() : flower.name.toUpperCase()} x{count}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
