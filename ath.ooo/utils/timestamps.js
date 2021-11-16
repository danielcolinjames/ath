import { format, utcToZonedTime } from "date-fns-tz";

export const formatInTimeZone = (date, fmt, tz) => {
  let output;
  try {
    output = format(utcToZonedTime(date, tz), fmt, { timeZone: tz });
  } catch (e) {
    console.error(e);
    output = "Unknown Date";
  }
  return output;
};