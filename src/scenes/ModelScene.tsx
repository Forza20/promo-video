import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ImageCamera } from "../ImageCamera";
import { colors, fontFamily } from "../theme";
import { SceneFade } from "./SceneFade";

const PANEL_LEFT = 900; // the diagram lives to the right of the illustration
const TABLE_W = 260;
const HEADER_H = 50;
const ROW_H = 38;

type Table = { name: string; fields: string[]; x: number; y: number; accent: string; delay: number; fact?: boolean };

const TABLES: Table[] = [
  { name: "Sales", fields: ["SalesID", "CustomerID", "ProductID", "Date", "Amount"], x: 380, y: 260, accent: colors.yellow, delay: 8, fact: true },
  { name: "Customer", fields: ["CustomerID", "Name", "Segment", "Region"], x: 30, y: 280, accent: colors.indigo, delay: 22 },
  { name: "Product", fields: ["ProductID", "Name", "Category", "Price"], x: 730, y: 280, accent: colors.cyan, delay: 30 },
  { name: "Calendar", fields: ["Date", "Year", "Quarter", "Month"], x: 380, y: 630, accent: colors.pink, delay: 38 },
];

// One-to-many relationships, drawn as lines after the tables are in
const RELATIONS = [
  { x1: 290, y1: 400, x2: 380, y2: 400, start: 52, one: [300, 388], many: [358, 388] },
  { x1: 730, y1: 400, x2: 640, y2: 400, start: 58, one: [712, 388], many: [652, 388] },
  { x1: 510, y1: 630, x2: 510, y2: 260 + HEADER_H + 5 * ROW_H + 16, start: 64, one: [522, 616], many: [522, 568] },
];

const CHECKS = ["Unique keys", "Correct relationships", "Built to scale"];

const ModelTable: React.FC<{ table: Table }> = ({ table }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - table.delay, fps, config: { damping: 14, stiffness: 150 } });

  return (
    <div
      style={{
        position: "absolute",
        left: table.x,
        top: table.y,
        width: TABLE_W,
        borderRadius: 14,
        overflow: "hidden",
        background: "#111827",
        border: `2px solid ${table.accent}`,
        boxShadow: `0 16px 40px rgba(0,0,0,0.45), 0 0 ${table.fact ? 40 : 20}px ${table.accent}33`,
        opacity: interpolate(pop, [0, 1], [0, 1], { extrapolateRight: "clamp" }),
        transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])})`,
      }}
    >
      <div
        style={{
          height: HEADER_H,
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          background: table.accent,
          color: colors.bgFrom,
          fontSize: 26,
          fontWeight: 800,
        }}
      >
        {table.name}
      </div>
      <div style={{ padding: "8px 0" }}>
        {table.fields.map((field) => (
          <div key={field} style={{ height: ROW_H, display: "flex", alignItems: "center", padding: "0 18px", fontSize: 22, color: colors.text }}>
            {field}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ModelScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, durationInFrames } = useVideoConfig();

  const camera = interpolate(frame, [0, durationInFrames], [0, 1], { easing: Easing.inOut(Easing.quad) });
  const headingIn = spring({ frame, fps, config: { damping: 200 } });

  return (
    <SceneFade>
      <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.bgFrom}, ${colors.bgTo})`, fontFamily }}>
        {/* Illustration: the person working on the model */}
        <ImageCamera
          from={{ x: 10, y: 190, w: 560, h: 610 }}
          to={{ x: 70, y: 230, w: 470, h: 520 }}
          progress={camera}
          width={PANEL_LEFT}
          height={height}
          style={{ position: "absolute", left: 0, top: 0 }}
        />
        <div
          style={{
            position: "absolute",
            left: PANEL_LEFT - 260,
            top: 0,
            width: 262,
            height,
            background: `linear-gradient(to right, transparent, ${colors.bgFrom})`,
          }}
        />

        {/* Diagram panel */}
        <div style={{ position: "absolute", left: PANEL_LEFT, top: 0, width: 1920 - PANEL_LEFT, height }}>
          <div style={{ position: "absolute", left: 30, top: 90, opacity: headingIn, transform: `translateY(${interpolate(headingIn, [0, 1], [30, 0])}px)` }}>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: colors.yellow }}>
              Power BI · Model view
            </p>
            <h2 style={{ margin: "10px 0 0", fontSize: 72, fontWeight: 800, color: colors.text }}>A clean star schema</h2>
          </div>

          <svg width={1920 - PANEL_LEFT} height={height} style={{ position: "absolute", left: 0, top: 0 }}>
            {RELATIONS.map((rel, i) => {
              const length = Math.hypot(rel.x2 - rel.x1, rel.y2 - rel.y1);
              const draw = interpolate(frame, [rel.start, rel.start + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const labelOpacity = interpolate(frame, [rel.start + 10, rel.start + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <g key={i}>
                  <line
                    x1={rel.x1}
                    y1={rel.y1}
                    x2={rel.x2}
                    y2={rel.y2}
                    stroke={colors.muted}
                    strokeWidth={4}
                    strokeDasharray={length}
                    strokeDashoffset={length * (1 - draw)}
                  />
                  <text x={rel.one[0]} y={rel.one[1]} fill={colors.text} fontSize={26} fontWeight={700} opacity={labelOpacity}>1</text>
                  <text x={rel.many[0]} y={rel.many[1]} fill={colors.text} fontSize={30} fontWeight={700} opacity={labelOpacity}>*</text>
                </g>
              );
            })}
          </svg>

          {TABLES.map((table) => (
            <ModelTable key={table.name} table={table} />
          ))}

          <div style={{ position: "absolute", left: 30, top: 660, display: "flex", flexDirection: "column", gap: 22 }}>
            {CHECKS.map((label, i) => {
              const check = spring({ frame: frame - (80 + i * 8), fps, config: { damping: 200 } });
              return (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    fontSize: 30,
                    fontWeight: 600,
                    color: colors.text,
                    opacity: check,
                    transform: `translateX(${interpolate(check, [0, 1], [-30, 0])}px)`,
                  }}
                >
                  <span style={{ color: colors.green, fontSize: 34, fontWeight: 800 }}>✓</span>
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};
