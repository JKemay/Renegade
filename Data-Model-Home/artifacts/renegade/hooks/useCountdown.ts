import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Return value of the `useCountdown` hook.
 */
export interface CountdownState {
  /** Seconds remaining (integer). */
  secondsLeft: number;
  /** Whether the countdown is currently ticking. */
  isRunning: boolean;
  /** True once the timer reaches 0 after being started. */
  hasExpired: boolean;
  /** Start (or restart) the countdown from `initialSeconds`. */
  start: () => void;
  /** Pause without resetting. */
  pause: () => void;
  /** Stop and reset to `initialSeconds`. */
  reset: () => void;
}

/**
 * A reusable countdown timer hook for timed trivia rounds.
 *
 * Ticks once per second and exposes start / pause / reset controls.
 * The timer automatically stops and sets `hasExpired` when it hits 0.
 *
 * @param initialSeconds - Number of seconds to count down from (default 30).
 * @param onExpire - Optional callback fired once when the timer reaches 0.
 *
 * @example
 * ```tsx
 * const { secondsLeft, isRunning, start, pause, reset } = useCountdown(30, () => {
 *   Alert.alert("Time's up!");
 * });
 * ```
 */
export function useCountdown(
  initialSeconds = 30,
  onExpire?: () => void
): CountdownState {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [hasExpired, setHasExpired] = useState(false);

  // Keep the callback ref stable so changing it doesn't restart the effect.
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // Tick effect
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setIsRunning(false);
          setHasExpired(true);
          onExpireRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1_000);

    return () => clearInterval(id);
  }, [isRunning]);

  const start = useCallback(() => {
    setHasExpired(false);
    setSecondsLeft(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setHasExpired(false);
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  return { secondsLeft, isRunning, hasExpired, start, pause, reset };
}
