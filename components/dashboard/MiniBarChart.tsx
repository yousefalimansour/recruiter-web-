"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * MiniBarChart — flat vertical burgundy bars on gray. Pure SVG, single flat
 * fill per bar (no gradient, no area fill).
 */
const EASE = [0.22, 1, 0.36, 1] as const;

export interface Bar {
  label: string;
  value: number;
}

export function MiniBarChart({
  data,
  height = 120,
}: {
  data: Bar[];
  height?: number;
}) {
  const reduce = useReducedMotion();
  const max = Math.max(...data.map((d) => d.value), 1);
  const barW = 40;
  const gap = 28;
  const width = data.length * barW + (data.length - 1) * gap;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width={width}
        height={height + 28}
        viewBox={`0 0 ${width} ${height + 28}`}
        className="max-w-full"
        role="img"
        aria-label="Outreach bar chart"
      >
        {data.map((d, i) => {
          const h = Math.max((d.value / max) * height, 2);
          const x = i * (barW + gap);
          const y = height - h;
          return (
            <g key={d.label}>
              <motion.rect
                x={x}
                width={barW}
                rx={2}
                fill="#94243f"
                initial={reduce ? { height: h, y } : { height: 0, y: height }}
                whileInView={{ height: h, y }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              />
              <text
                x={x + barW / 2}
                y={height + 18}
                textAnchor="middle"
                className="fill-[#7e7e86] font-mono"
                style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                {d.label}
              </text>
              <text
                x={x + barW / 2}
                y={y - 6}
                textAnchor="middle"
                className="fill-[#dcdce0] font-mono"
                style={{ fontSize: 11 }}
              >
                {d.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
