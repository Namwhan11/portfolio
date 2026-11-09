import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./globals.css";
import MotionProvider from "@/components/motion/MotionProvider";

export const metadata = {
  title: "Athitiya Nanjinda — Software Tester",
  description:
    "Portfolio of Athitiya Nanjinda, an aspiring Software Tester. Test cases, automated tests and CI.",
};

// Without JavaScript, everything the animations start hidden must be visible.
const NO_JS = `[data-m]{opacity:1!important;transform:none!important}
[data-clip]{clip-path:none!important}
path[data-m]{stroke-dasharray:none!important;stroke-dashoffset:0!important}
[data-mc]{color:var(--ink)!important}
[data-case]{height:auto!important;opacity:1!important}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <noscript>
          <style>{NO_JS}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
