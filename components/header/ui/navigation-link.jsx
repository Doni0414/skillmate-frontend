export function NavigationLink({ link, text }) {
  return (
    <a className="block" href={link}>
      {text}
    </a>
  );
}
