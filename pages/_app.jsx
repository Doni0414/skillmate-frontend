import "../styles/global.css";

export default function App({ Component, pageProps }) {
  console.log("app");
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
