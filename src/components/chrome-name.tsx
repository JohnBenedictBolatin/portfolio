export function ChromeName({ first, second }: { first: string; second: string }) {
  return (
    <h1
      id="intro-heading"
      className="hero-name"
    >
      <span>{first} </span>
      <span className="name-secondary">{second}</span>
    </h1>
  );
}
