import clsx from "clsx";

export function Select({ values, labels, value, className, onSelect }) {
  return (
    <select
      onChange={(e) => {
        console.log(e);
        onSelect(e.target.value);
      }}
      value={value}
      className={clsx(className, "cursor-pointer")}
    >
      {values.map((value, index) => (
        <option
          key={index}
          className="cursor-pointer"
          //   onClick={(value) => onSelect(value)}
          value={value}
        >
          {labels[index]}
        </option>
      ))}
    </select>
  );
}
