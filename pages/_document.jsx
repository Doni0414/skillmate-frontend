import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <div id="messages" className="absolute z-50"></div>
        <div id="modals" className="z-10"></div>
        <NextScript />
      </body>
    </Html>
  );
}
