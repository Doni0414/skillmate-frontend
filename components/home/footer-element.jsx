export function FooterElement({ className, text, image }) {
  return (
    <div className="font-semibold text-[20px] flex flex-col items-center gap-[45px]">
      {text}
      {image}
    </div>
  );
}
