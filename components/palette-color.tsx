import { rgbToHsl } from "@/lib/shared";
import { HTMLAttributes } from "react";

function decimalToHex(num: number) {
  return `#${num.toString(16)}`;
}

export function PaletteColor({ color }: { color: number }) {
  const colorHex = color.toString(16);
  return (
    <div className="flex flex-row items-center">
      <span
        style={{ background: decimalToHex(color) }}
        className="h-6 w-6 hover:h-6 animate rounded border-1 border-theme-light"
      />
      <pre className="ml-2 text-sm">#{colorHex}</pre>
    </div>
  );
}

export function Palette({
  colors,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { colors: number[] }) {
  return (
    <section
      className="grid grid-flow-row mt-2 border-theme border-2 gap-2 text-blueGray-400"
      {...rest}
    >
      {colors.map((color) => (
        <PaletteColor color={color} key={color} />
      ))}
    </section>
  );
}
