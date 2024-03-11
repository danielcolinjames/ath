import { format, utcToZonedTime } from 'date-fns-tz'

export const formatInTimeZone = (date: any, fmt: any, tz: any) => {
  let output
  try {
    output = format(utcToZonedTime(date, tz), fmt, { timeZone: tz })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    output = 'Unknown Date'
  }
  return output
}
