"use client";

import { useEffect, useState } from "react";
import "./countdown-section.css";

// Midnight in Pune at the START of 5 March 2027. The explicit +05:30
// offset makes the countdown independent of a visitor's time zone.
const EVENT_START_MS = Date.parse("2027-03-05T00:00:00+05:30");

// Visual power progression only. Adjust this date if GENESIS's public
// countdown campaign began on a different date. It does NOT change the event.
const POWER_CHARGE_START_MS = Date.parse("2026-10-24T00:00:00+05:30");
const MAX_POWER = 11;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function readCountdown(now: number) {
  const remaining = Math.max(0, EVENT_START_MS - now);
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const complete = remaining === 0;

  const progress = clamp(
    (now - POWER_CHARGE_START_MS) / (EVENT_START_MS - POWER_CHARGE_START_MS),
    0,
    1,
  );
  const power = complete ? MAX_POWER : Math.min(MAX_POWER, 1 + Math.floor(progress * (MAX_POWER - 1)));

  return {
    days, hours, minutes, seconds, complete, progress, power,
    compact: complete
      ? "BRAWL IS LIVE!"
      : `${days}d : ${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(seconds).padStart(2, "0")}s`,
    spoken: complete
      ? "The GENESIS event has started."
      : `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds until GENESIS begins.`,
  };
}

/**
 * Compact boundary widget placed between Hero and About. The supplied artwork
 * provides the complete visible interface while this overlay supplies the live
 * countdown and charging state. No scroll listeners or animation libraries.
 */
export default function CountdownSection() {
  // Render a deterministic placeholder on server AND first client render,
  // preventing hydration mismatch from server/client Date.now() differences.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = now === null ? null : readCountdown(now);
  const power = remaining?.power ?? 1;
  const countdownText = remaining?.compact ?? "--d : --h : --m : --s";

  return (
    <section className="genesis-power" aria-label="GENESIS event countdown">
      <div className="genesis-power__content">
        <div className="genesis-power__artwork">
          <img
            className="genesis-power__base"
            src="/landing-pages/countdown/power-panel-base.svg"
            alt=""
            aria-hidden="true"
            width={189}
            height={167}
            loading="lazy"
            decoding="async"
          />
          {/* ViewBox overlay is locked to the original 189×167 source SVG. */}
          <svg
            className="genesis-power__overlay"
            viewBox="0 0 189 167"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="genesis-power-pink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff79de" />
                <stop offset="100%" stopColor="#e52bbb" />
              </linearGradient>
              <linearGradient id="genesis-power-token" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff63e3" />
                <stop offset="100%" stopColor="#e623bb" />
              </linearGradient>
            </defs>

            {/* Energy segments replace the static full meter from the asset. */}
            {Array.from({ length: MAX_POWER }, (_, index) => (
              <rect
                key={index}
                x={39.8 + index * 13.25}
                y={26.7}
                width={12.2}
                height={7.2}
                rx={1}
                className={index === power - 1 && !remaining?.complete ? "genesis-power__segment genesis-power__segment--charging" : "genesis-power__segment"}
                fill={index < power ? "url(#genesis-power-pink)" : "#532555"}
              />
            ))}

            {/* Dynamic power badge, matching the supplied pink TIMER token. */}
            <circle cx="19" cy="19" r="17.7" fill="url(#genesis-power-token)" />
            <circle cx="19" cy="20" r="12.2" fill="#10001c" stroke="#8c167a" strokeWidth="2.3" />
            <ellipse cx="11.7" cy="9" rx="2.6" ry="3.2" transform="rotate(35 11.7 9)" fill="#fff" opacity="0.9" />
            <text x="19" y="25.1" className="genesis-power__token-number" textAnchor="middle">{power}</text>

            {/* Real countdown replaces the artwork's static 97-day example. */}
            <text x="49.5" y="140" className="genesis-power__live-numbers" textLength={remaining?.complete ? undefined : "126"} lengthAdjust="spacing" >
              {countdownText}
            </text>
          </svg>
        </div>

        <p className="genesis-power__accessible-timer" role="timer" aria-live="off">
          {remaining?.spoken ?? "Loading the GENESIS countdown."}
        </p>
      </div>
    </section>
  );
}
