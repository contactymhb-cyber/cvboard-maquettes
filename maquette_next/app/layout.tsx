import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cap Vert | Tableau de bord",
  description: "Prototype de tableau de bord web Cap Vert"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <div id="cv-loader">
          <img src="/logo_loader.png" id="cv-loader-img" alt="Cap Vert" />
          <span id="cv-loader-name">Cap <em>Vert</em></span>
        </div>
        <script dangerouslySetInnerHTML={{__html: `window.addEventListener('load',function(){setTimeout(function(){var l=document.getElementById('cv-loader');if(l){l.style.opacity='0';setTimeout(function(){l.remove();},550);}},300);});`}} />
        {children}
      </body>
    </html>
  );
}
