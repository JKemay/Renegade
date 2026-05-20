import AsyncStorage from "@react-native-async-storage/async-storage";

const TIMER_KEY = "renegade:timer_seconds";
let _timerSeconds = 30;

export function getTimerSeconds(): number {
  return _timerSeconds;
}

export async function loadSettings(): Promise<void> {
  try {
    const val = await AsyncStorage.getItem(TIMER_KEY);
    if (val !== null) {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) _timerSeconds = parsed;
    }
  } catch {}
}

export async function saveTimerSeconds(seconds: number): Promise<void> {
  _timerSeconds = seconds;
  try {
    await AsyncStorage.setItem(TIMER_KEY, String(seconds));
  } catch {}
}
