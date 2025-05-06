import "../styles/global.css";

export default function App({ Component, pageProps }) {
  console.log("app");
  return (
    <div>
      <Component {...pageProps} />
      {/* <div id="messages" className="z-50"></div>
      <div id="modals" className="z-10"></div> */}
    </div>
  );
}
