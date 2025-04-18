import { Fira_Sans, Inter, Mulish, Raleway, Red_Hat_Display, Roboto } from "next/font/google";

export const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const mulish = Mulish({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const redHatDisplay = Red_Hat_Display({ subsets: ["latin"] });
export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});