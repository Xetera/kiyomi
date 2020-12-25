import { HTMLAttributes } from "react";

function decimalToHex(num: number) {
  return `#${num.toString(16)}`;
}

export function PaletteColor({ color }: { color: number }) {
  return (
    <div className="flex flex-row items-center">
      <span
        style={{ background: decimalToHex(color) }}
        className="w-full h-1 hover:h-6 animate"
      />
      {/* <p className="text-blueGray-500 text-sm font-semibold">#{color}</p> */}
    </div>
  );
}

export function Palette({
  colors,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { colors: number[] }) {
  return (
    <section
      className="grid grid-flow-col mt-2 border-theme border-2"
      {...rest}
    >
      {/* <h2 className="mb-2 font-semibold">Color Palette</h2> */}
      {colors.map((color) => (
        <PaletteColor color={color} key={color} />
      ))}
    </section>
  );
}
