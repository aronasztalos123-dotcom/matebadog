"use client";

import { motion, useReducedMotion } from "framer-motion";

/*
 * A hip-roof face covered in beaver-tail tiles. On load the courses are laid
 * the way a roofer lays them: from the eave up to the ridge, then the hips and
 * ridge are capped, the chimney flashing goes on and the gutter is hung.
 */

const EAVE_Y = 360;
const RIDGE_Y = 120;
const COURSE = 20;
const TILE_W = 26;
const TILE_H = 34;
const COURSES = Math.ceil((EAVE_Y - RIDGE_Y) / COURSE) + 1;
const SHADES = ["#C84B11", "#B8430F", "#D25A1E", "#A93E0E", "#C2501A", "#BC4A14"];

function tilePath(x: number, bottom: number) {
  const r = TILE_W / 2;
  const top = bottom - TILE_H;
  return `M${x} ${top}V${bottom - r}a${r} ${r} 0 0 0 ${TILE_W} 0V${top}Z`;
}

const courses = Array.from({ length: COURSES }, (_, row) => {
  const bottom = EAVE_Y + 6 - row * COURSE;
  const offset = row % 2 === 0 ? 0 : -TILE_W / 2;
  const tiles = [];
  for (let x = 20 + offset, i = 0; x < 580; x += TILE_W + 1, i++) {
    tiles.push({ d: tilePath(x, bottom), fill: SHADES[(row * 7 + i * 13) % SHADES.length] });
  }
  return tiles;
});

const ridgeCaps = Array.from({ length: 15 }, (_, i) => 164 + i * 19.5);

export default function RoofIllustration({ lang }: { lang: string }) {
  const reduce = useReducedMotion();
  const layDone = 0.3 + COURSES * 0.075;
  const span = (12.4).toLocaleString(lang, { minimumFractionDigits: 2 });

  const drop = (row: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: -26 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.3 + row * 0.075, duration: 0.5, ease: [0.34, 1.4, 0.64, 1] as const },
        };

  const after = (delay: number, from: Record<string, number>) =>
    reduce
      ? {}
      : {
          initial: from,
          animate: Object.fromEntries(Object.keys(from).map((k) => [k, k === "opacity" || k === "pathLength" ? 1 : 0])),
          transition: { delay: layDone + delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <svg viewBox="0 52 600 456" className="h-auto w-full overflow-visible" role="presentation" aria-hidden="true">
      <defs>
        <clipPath id="roof-face">
          <path d={`M30 ${EAVE_Y + 8}H570L440 ${RIDGE_Y}H160Z`} />
        </clipPath>
        <linearGradient id="roof-light" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="zinc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E3E8EB" />
          <stop offset="0.5" stopColor="#B4BEC4" />
          <stop offset="1" stopColor="#7E8A91" />
        </linearGradient>
        <linearGradient id="zinc-gutter" gradientUnits="userSpaceOnUse" x1="0" y1={EAVE_Y + 8} x2="0" y2={EAVE_Y + 21}>
          <stop offset="0" stopColor="#E3E8EB" />
          <stop offset="0.5" stopColor="#B4BEC4" />
          <stop offset="1" stopColor="#7E8A91" />
        </linearGradient>
        <radialGradient id="roof-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#C84B11" stopOpacity="0.35" />
          <stop offset="1" stopColor="#C84B11" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="300" cy="250" rx="320" ry="190" fill="url(#roof-glow)" />

      {/* Wall outline, drawn like a plan */}
      <rect
        x="62"
        y={EAVE_Y + 14}
        width="476"
        height="104"
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.12)"
        strokeDasharray="4 6"
      />

      {/* Tile courses, eave first */}
      <g clipPath="url(#roof-face)">
        <rect x="20" y={RIDGE_Y - 10} width="560" height={EAVE_Y - RIDGE_Y + 30} fill="#5E2208" />
        {courses.map((tiles, row) => (
          <motion.g key={row} {...drop(row)}>
            {tiles.map((t, i) => (
              <path key={i} d={t.d} fill={t.fill} stroke="#6B2607" strokeOpacity="0.55" strokeWidth="0.8" />
            ))}
          </motion.g>
        ))}
        <motion.rect
          x="20"
          y={RIDGE_Y - 10}
          width="560"
          height={EAVE_Y - RIDGE_Y + 30}
          fill="url(#roof-light)"
          {...after(0, { opacity: 0 })}
        />
      </g>

      {/* Hips and ridge capping */}
      <motion.path
        d={`M34 ${EAVE_Y + 4}L162 ${RIDGE_Y}`}
        stroke="#8F3410"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
        {...after(0.05, { pathLength: 0 })}
      />
      <motion.path
        d={`M566 ${EAVE_Y + 4}L438 ${RIDGE_Y}`}
        stroke="#8F3410"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
        {...after(0.05, { pathLength: 0 })}
      />
      <motion.g {...after(0.25, { opacity: 0, y: -10 })}>
        {ridgeCaps.map((x) => (
          <path key={x} d={`M${x - 11} ${RIDGE_Y + 2}a11 11 0 0 1 22 0Z`} fill="#9C3A10" stroke="#6B2607" strokeWidth="0.8" />
        ))}
      </motion.g>

      {/* Chimney with zinc flashing */}
      <motion.g {...after(0.35, { opacity: 0, y: 16 })}>
        <rect x="384" y="78" width="46" height="112" fill="#2A3238" />
        <path d="M384 100h46M384 124h46M384 148h46M384 172h46" stroke="#3A444B" strokeWidth="2" />
        <rect x="377" y="68" width="60" height="13" rx="2" fill="#3E4950" />
        <rect x="374" y="178" width="66" height="14" rx="3" fill="url(#zinc)" />
      </motion.g>

      {/* Gutter and downpipe */}
      <motion.path
        d={`M22 ${EAVE_Y + 14}H578`}
        stroke="url(#zinc-gutter)"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
        {...after(0.5, { pathLength: 0 })}
      />
      <motion.path
        d={`M548 ${EAVE_Y + 18}V452q0 14 14 14H584`}
        stroke="#9AA5AC"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        {...after(0.9, { pathLength: 0 })}
      />

      {/* Measurements */}
      <motion.g
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="13"
        fill="rgba(255,255,255,0.55)"
        {...after(1.1, { opacity: 0 })}
      >
        <path d="M30 486H530M30 480v12M530 480v12" stroke="rgba(255,255,255,0.3)" />
        <rect x="236" y="476" width="88" height="20" fill="#1A2025" />
        <text x="280" y="491" textAnchor="middle">{span} m</text>
        <text x="80" y="232" textAnchor="middle" transform="rotate(-62.3 80 232)">45°</text>
      </motion.g>
    </svg>
  );
}
