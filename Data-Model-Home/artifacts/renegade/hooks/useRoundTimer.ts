import { useCallback, useEffect, useRef, useState } from "react";
import {
    formatTime,
    getTimeUrgency,
    type GameMode,
    getRoundTimeLimit,
} from "@/lib/timeUtils";

/**
 * State returned by the useRoundTimer hook.
 */
export interface RoundTimerState {
    /** Remaining time in seconds */
  remainingSeconds: number;
    /** Formatted display string (e.g. "0:15") */
  display: string;
    /** Visual urgency level for UI theming */
  urgency: "relaxed" | "warning" | "critical";
    /** Whether the timer is currently running */
  isRunning: boolean;
    /** Whether the timer has reached zero */
  isExpired: boolean;
    /** Elapsed time in milliseconds since the timer started */
  elapsedMs: number;
}

/**
 * Configuration options for useRoundTimer.
 */
export interface RoundTimerOptions {
    /** Game mode that determines the time limit */
  mode: GameMode;
    /** Called when the timer reaches zero */
  onExpire?: () => void;
    /** Whether to start the timer automatically (default: false) */
  autoStart?: boolean;
}

/**
 * Hook that manages a countdown timer for a single trivia round.
 * Integrates with timeUtils for formatting and urgency levels.
 *
 * @example
 * ```tsx
 * const { display, urgency, start, pause } = useRoundTimer({
 *   mode: "standard",
 *   onExpire: () => handleTimeUp(),
 * });
 * ```
 */
export function useRoundTimer(options: RoundTimerOptions) {
    const { mode, onExpire, autoStart = false } = options;
    const timeLimitSeconds = getRoundTimeLimit(mode);
    const timeLimitMs = timeLimitSeconds * 1000;

  const [remainingMs, setRemainingMs] = useState(timeLimitMs);
    const [isRunning, setIsRunning] = useState(autoStart);
    const startTimeRef = useRef<number | null>(null);
    const pausedAtRef = useRef<number>(timeLimitMs);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const hasExpiredRef = useRef(false);

  const remainingSeconds = Math.ceil(remainingMs / 1000);
    const isExpired = remainingMs <= 0;
    const elapsedMs = timeLimitMs - remainingMs;

  /** Clear the running interval */
  const clearTimer = useCallback(() => {
        if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
        }
  }, []);

  /** Start or resume the countdown */
  const start = useCallback(() => {
        if (hasExpiredRef.current) return;
        startTimeRef.current = Date.now();
        pausedAtRef.current = remainingMs;
        setIsRunning(true);
  }, [remainingMs]);

  /** Pause the countdown, preserving remaining time */
  const pause = useCallback(() => {
        clearTimer();
        setIsRunning(false);
  }, [clearTimer]);

  /** Reset the timer to full duration and stop it */
  const reset = useCallback(() => {
        clearTimer();
        setIsRunning(false);
        setRemainingMs(timeLimitMs);
        hasExpiredRef.current = false;
        startTimeRef.current = null;
        pausedAtRef.current = timeLimitMs;
  }, [clearTimer, timeLimitMs]);

  // Tick loop
  useEffect(() => {
        if (!isRunning) {
                clearTimer();
                return;
        }

                const tick = () => {
                        if (startTimeRef.current === null) return;
                        const elapsed = Date.now() - startTimeRef.current;
                        const newRemaining = Math.max(0, pausedAtRef.current - elapsed);
                        setRemainingMs(newRemaining);

                        if (newRemaining <= 0 && !hasExpiredRef.current) {
                                  hasExpiredRef.current = true;
                                  clearTimer();
                                  setIsRunning(false);
                                  onExpire?.();
                        }
                };

                intervalRef.current = setInterval(tick, 50);
        return clearTimer;
  }, [isRunning, clearTimer, onExpire]);

  // Cleanup on unmount
  useEffect(() => {
        return clearTimer;
  }, [clearTimer]);

  const state: RoundTimerState = {
        remainingSeconds,
        display: formatTime(remainingSeconds),
        urgency: getTimeUrgency(remainingMs, timeLimitMs),
        isRunning,
        isExpired,
        elapsedMs,
  };

  return {
        ...state,
        start,
        pause,
        reset,
  };
}
