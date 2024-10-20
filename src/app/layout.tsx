import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import Paths from "./Paths";
import { readFilesFromDir } from "./get_sub_folders";
import styles from "./layout.module.scss"


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HBV501_h3",
  description: "Ui for api developed in HBV501G to maintain a collection of knitting patterns.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const files = (await readFilesFromDir(`./src/app/`))
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
	  <header 
	  className={styles.navigation}
	  >
					<a href="/" 
					className={styles.title}
					>
						<h1>HBV501G</h1>
						<div>
							<p>Hópur 3</p>
							<p>Vistun og geymsla á munstrunm fyrir stafræna prjónavél.</p>
						</div>
					</a>
					<Paths files={files} depth={1} />
				</header>
		<main>{children}</main>
		<footer>Aron,Elías og Snæfríður.</footer>
      </body>
    </html>
  );
}
