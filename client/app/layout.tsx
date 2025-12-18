import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./theme/ThemeToogle";
import { Slide, ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: {
    default: "Varon AI — Intelligent AI Agents & Automation Platform",
    template: "%s | Varon AI",
  },
  description:
    "Varon AI is an advanced AI platform that provides intelligent agents for automation, content generation, research, and real-world task execution.",
  keywords: [
    "Varon",
    "varon ai",
    "intelligent ai agents",
    "Varon AI",
    "AI agents",
    "automation platform",
    "artificial intelligence",
    "AI assistant",
    "AI tools",
    "startup AI",
    "AI startup",
  ],
  authors: [{ name: "Varon AI", url: "https://varonai.vercel.app" }],
  creator: "Harsh Pandey",
  metadataBase: new URL("https://varonai.vercel.app"),

  openGraph: {
    title: "Varon AI — Intelligent AI Agents & Automation",
    description:
      "Build, deploy, and control intelligent AI agents that perform real-world tasks with speed and precision.",
    url: "https://varonai.vercel.app",
    siteName: "Varon AI",
    images: [
      {
        url: "/examples/home.png",
        width: 1200,
        height: 630,
        alt: "Varon AI Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://varonai.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <html lang="en">
        <body>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </>
  );
}
