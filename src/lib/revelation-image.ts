import type { ColorScheme } from "@/store/settings-store";

function isMadinahRevelation(place: string): boolean {
  const p = place.toLowerCase();
  return p.includes("madinah") || p.includes("medina");
}

/** Same kabah / madina assets as the sidebar (light outline vs dark color). */
function revelationPlaceIcon(
  place: string,
  colorScheme: ColorScheme,
): {
  src: string;
  alt: string;
} {
  const madinahSrc =
    colorScheme === "dark"
      ? "/images/madina-icon-color.png"
      : "/images/madina-icon.png";
  const makkahSrc =
    colorScheme === "dark"
      ? "/images/kabah-icon-color.png"
      : "/images/kabah-icon.png";

  if (isMadinahRevelation(place)) {
    return {
      src: madinahSrc,
      alt: "Madinah",
    };
  }
  return {
    src: makkahSrc,
    alt: "Makkah",
  };
}

/** Hero on surah page — same icons as the sidebar list. */
export function revelationHeroImage(
  place: string,
  colorScheme: ColorScheme,
): {
  src: string;
  alt: string;
} {
  return revelationPlaceIcon(place, colorScheme);
}

/** Small icons for surah list rows. */
export function revelationListIcon(
  place: string,
  colorScheme: ColorScheme,
): {
  src: string;
  alt: string;
} {
  return revelationPlaceIcon(place, colorScheme);
}
