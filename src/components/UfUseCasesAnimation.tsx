"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo } from "react";

const categories = [
  { label: "Vivienda", icon: "home", angle: -90 },
  { label: "Seguros", icon: "shield", angle: -18 },
  { label: "Préstamos", icon: "bank", angle: 54 },
  { label: "Educación", icon: "edu", angle: 126 },
  { label: "Legal", icon: "legal", angle: 198 },
] as const;

const chartBars = [38, 52, 48, 61, 58, 72, 68];

type UfUseCasesAnimationProps = {
  active: number;
  onActiveChange: (index: number) => void;
  ufRate?: number | null;
};

function polarToPercent(angleDeg: number, radius = 33) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: 50 + radius * Math.cos(rad),
    y: 48 + radius * Math.sin(rad),
  };
}

function formatClp(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function CategoryIcon({ type }: { type: (typeof categories)[number]["icon"] }) {
  const props = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const };

  if (type === "home") {
    return (
      <svg {...props}>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg {...props}>
        <path d="M12 3l7 3v6c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "bank") {
    return (
      <svg {...props}>
        <path d="M4 10h16M6 10V18M10 10v8M14 10v8M18 10v8M3 20h18M12 4l9 4H3l9-4Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "edu") {
    return (
      <svg {...props}>
        <path d="M12 4 3 9l9 5 9-5-9-5Zm0 10-9-5v4c0 2 4 4 9 4s9-2 9-4v-4l-9 5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M7 8h10M7 12h6M7 16h8M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function UfUseCasesAnimation({ active, onActiveChange, ufRate }: UfUseCasesAnimationProps) {
  const reduceMotion = useReducedMotion();
  const safeActive = active % categories.length;

  const nodes = useMemo(
    () => categories.map((cat) => ({ ...cat, pos: polarToPercent(cat.angle) })),
    [],
  );

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      onActiveChange((safeActive + 1) % categories.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [reduceMotion, onActiveChange, safeActive]);

  const clpDisplay = ufRate ? formatClp(ufRate) : "$40.804";

  return (
    <div className="uca-shell" aria-hidden>
      <div className="uca-stage-bg" />
      <div className="uca-stage-grid" />

      <div className="uca-orbit-area">
        <motion.div
          className="uca-orbit uca-orbit--outer"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="uca-orbit uca-orbit--inner"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />

        {!reduceMotion ? (
          <motion.div
            className="uca-radar"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        ) : null}

        <svg className="uca-paths" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="ucaPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-2)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>

          {nodes.map((node, index) => {
            const activePath = safeActive === index;
            const pathId = `uca-path-${index}`;
            const d = `M ${node.pos.x} ${node.pos.y} Q 50 48 50 48`;

            return (
              <g key={node.label}>
                <path
                  id={pathId}
                  d={d}
                  fill="none"
                  stroke="url(#ucaPathGrad)"
                  strokeWidth={activePath ? 1.1 : 0.55}
                  strokeDasharray="2.5 2"
                  className={`uca-path-line${activePath ? " uca-path-line--active" : ""}`}
                />
                {!reduceMotion ? (
                  <circle
                    r="1.1"
                    fill="var(--accent)"
                    className={`uca-path-dot${activePath ? " uca-path-dot--active" : ""}`}
                    style={{ animationDelay: activePath ? `${index * 0.15}s` : undefined }}
                  >
                    <animateMotion dur={`${2.8 + index * 0.3}s`} repeatCount="indefinite" path={d} />
                  </circle>
                ) : null}
              </g>
            );
          })}
        </svg>

        <div className="uca-center">
          <motion.div
            className="uca-center-card"
            animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="uca-center-top">
              <span className="uca-center-badge">BCCh · Chile</span>
              <motion.span
                className="uca-center-live"
                initial={{ opacity: 1 }}
                animate={reduceMotion ? undefined : { opacity: [1, 0.45, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                LIVE
              </motion.span>
            </div>

            <p className="uca-center-title">Ecosistema UF</p>

            <div className="uca-center-rates">
              <div className="uca-center-rate">
                <span className="uca-center-rate-label">UF</span>
                <span className="uca-center-rate-value">1,00</span>
              </div>
              <motion.span
                className="uca-center-arrow"
                animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
              <div className="uca-center-rate uca-center-rate--clp">
                <span className="uca-center-rate-label">CLP</span>
                <motion.span
                  className="uca-center-rate-value uca-center-rate-value--accent"
                  initial={{ opacity: 1 }}
                  animate={reduceMotion ? undefined : { opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {clpDisplay}
                </motion.span>
              </div>
            </div>

            <div className="uca-center-chart">
              {chartBars.map((height, index) => (
                <motion.span
                  key={`bar-${index}`}
                  className="uca-center-bar"
                  style={{ height: `${height}%` }}
                  animate={reduceMotion ? undefined : { scaleY: [0.85, 1, 0.85] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.12,
                  }}
                />
              ))}
            </div>

            <motion.p
              key={safeActive}
              className="uca-center-active"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              Caso activo: <strong>{categories[safeActive].label}</strong>
            </motion.p>
          </motion.div>
        </div>

        {nodes.map((node, index) => {
          const isActive = safeActive === index;
          return (
            <motion.button
              key={node.label}
              type="button"
              tabIndex={-1}
              className={`uca-node ${isActive ? "uca-node--active" : ""}`}
              style={{ left: `${node.pos.x}%`, top: `${node.pos.y}%` }}
              onClick={() => onActiveChange(index)}
              initial={{ opacity: 1, scale: 1, y: 0 }}
              animate={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: 1,
                      scale: isActive ? 1.06 : 1,
                      y: isActive ? [-2, 2, -2] : [0, -3, 0],
                    }
              }
              transition={{
                scale: { duration: 0.35 },
                y: { duration: isActive ? 2.2 : 3.5 + index * 0.2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <span className="uca-node-icon">
                <CategoryIcon type={node.icon} />
              </span>
              <span className="uca-node-label">{node.label}</span>
              {isActive ? <span className="uca-node-glow" /> : null}
            </motion.button>
          );
        })}
      </div>

      <div className="uca-stage-footer">
        <div className="uca-flow">
          <span className="uca-flow-label uca-flow-label--uf">UF</span>
          <span className="uca-flow-track">
            {!reduceMotion
              ? Array.from({ length: 4 }).map((_, index) => (
                  <motion.span
                    key={index}
                    className="uca-flow-dot"
                    initial={{ left: "0%", opacity: 0 }}
                    animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.65,
                    }}
                  />
                ))
              : null}
          </span>
          <span className="uca-flow-label uca-flow-label--clp">CLP</span>
        </div>

        <div className="uca-ticker">
          <motion.span
            className="uca-ticker-dot"
            animate={reduceMotion ? undefined : { scale: [1, 1.35, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          Valor UF actualizado · Chile
        </div>
      </div>
    </div>
  );
}
