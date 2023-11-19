import "@/styles/globals.css";

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
      <body>
        {children}
        <footer className="mt-16 grid place-content-center text-sm text-muted-foreground py-8">
          &#169; College App
        </footer>
      </body>
    </html>
  );
}
