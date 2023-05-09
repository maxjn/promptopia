import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Share & Descover AI Prompts",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
