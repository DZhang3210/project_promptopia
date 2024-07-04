import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";


export const metadata = {
  title: "Promptopia",
  description: "Discover and Share AI prompts",
};

export default function RootLayout({children}){
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"/>
        </div>
        <Provider>
          <main className="app">
            <Navbar/>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
