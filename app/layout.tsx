import { Metadata } from "next";
import "../styles/global.css";

export const metadata: Metadata = {
  title: "GitHub Unwrapped 2023",
  description: "Get a personalized video of your GitHub activity in 2023.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
