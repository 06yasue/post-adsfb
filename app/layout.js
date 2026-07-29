import "./globals.css";

export const metadata = {
  title: "Auto Ads Tools",
  description: "Deteksi Token EAAB dan Auto Post Facebook Ads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}
