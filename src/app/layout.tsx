import "./globals.css";
import SupabaseProvider from "./supabase-provider";

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
      <body className="bg-slate-100 flex justify-center">
        <div className="max-w-xl w-full bg-white min-h-screen">
          <SupabaseProvider>{children}</SupabaseProvider>
        </div>
      </body>
    </html>
  );
}
