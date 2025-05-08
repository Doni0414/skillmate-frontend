export function NavigationLink({ link, text }) {
  return (
    <a className="block w-fit" href={link}>
      {text}
    </a>
  );
}
