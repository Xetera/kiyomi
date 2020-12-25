import { HTMLAttributes } from "react";

function decimalToHex(num: number) {
  return `#${num.toString(16)}`;
}

export function PaletteColor({ color }: { color: number }) {
  return (
    <div className="flex flex-col hover:text-blueGray-300">
      <span
        style={{ background: decimalToHex(color) }}
        className="w-28 h-10 rounded border-red mb-2"
      />
      <p className="text-blueGray-500">#{color}</p>
    </div>
  );
}

export function Palette({
  colors,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { colors: number[] }) {
  return (
    <div className="grid grid-flow-col gap-4 w-min" {...rest}>
      {colors.map((color) => (
        <PaletteColor color={color} key={color} />
      ))}
    </div>
  );
}
