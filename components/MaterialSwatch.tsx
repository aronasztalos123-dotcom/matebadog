import type { CSSProperties, ReactNode } from "react";

/*
 * Drawn surfaces of the materials Máté works with. They stand in where a
 * work photo would go, so the page never shows an empty "photo here" box.
 */
export type Material = "tiles" | "seam" | "timber" | "layers";

export const serviceMaterial = {
  tetofedes: "tiles",
  badogos: "seam",
  acsszerkezet: "timber",
  szigeteles: "layers",
} as const satisfies Record<string, Material>;

const svg = (markup: string) => `url("data:image/svg+xml,${encodeURIComponent(markup)}")`;

// Beaver-tail tiles: each upper course overlaps the tails of the one below
const tiles = svg(
  "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='40'><g stroke='#6B2607' stroke-opacity='.55'>" +
    "<path fill='#B8430F' d='M-14 20v12a14 14 0 0 0 28 0V20zM18 20v12a14 14 0 0 0 28 0V20z'/>" +
    "<path fill='#CC5219' d='M2 0v12a14 14 0 0 0 28 0V0z'/>" +
    "<path fill='#B8430F' d='M-14-20v12a14 14 0 0 0 28 0v-12zM18-20v12a14 14 0 0 0 28 0v-12z'/>" +
    "</g></svg>"
);

const truss = svg(
  "<svg xmlns='http://www.w3.org/2000/svg' width='96' height='56'><g fill='none' stroke='#4A2E14' stroke-opacity='.5' stroke-width='3' stroke-linejoin='round'>" +
    "<path d='M0 54L48 4l48 50zM48 4v50M24 29l24 25 24-25'/></g></svg>"
);

const surfaces: Record<Material, CSSProperties> = {
  tiles: {
    backgroundColor: "#5E2208",
    backgroundImage: `linear-gradient(160deg, rgba(255,255,255,0.14), rgba(0,0,0,0.28)), ${tiles}`,
    backgroundSize: "100% 100%, 32px 40px",
  },
  seam: {
    backgroundImage:
      "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(0,0,0,0.2)), repeating-linear-gradient(90deg, #A9B3B9 0 30px, #EEF2F4 30px 32px, #7E8A91 32px 34px)",
  },
  timber: {
    backgroundImage: `${truss}, repeating-linear-gradient(0deg, rgba(74,46,20,0.12) 0 2px, transparent 2px 7px), linear-gradient(160deg, #C9955F, #9C6A3B)`,
    backgroundSize: "96px 56px, auto, auto",
  },
  layers: {
    backgroundImage:
      "repeating-linear-gradient(115deg, rgba(0,0,0,0.07) 0 2px, transparent 2px 7px), linear-gradient(180deg, #2A3238 0 16%, #E5BE55 16% 44%, #D9DEE1 44% 50%, #E5BE55 50% 78%, #8E99A0 78% 100%)",
  },
};

export default function MaterialSwatch({
  material,
  className = "",
  children,
}: {
  material: Material;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        style={surfaces[material]}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
