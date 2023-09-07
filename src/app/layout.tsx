import "@/styles/globals.css";
// import { M_PLUS_1p } from "next/font/google";

// const mPlus1p = M_PLUS_1p({
//   weight: ["100", "300", "400", "500", "700", "800", "900"],
//   subsets: ["latin"],
// });

export const metadata = {
  title: "カレッジアプリ",
  description: "SHIMOKITA COLLEGE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
