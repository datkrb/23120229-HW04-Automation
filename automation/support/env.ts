/**
 * Shared run configuration. All values can be overridden by environment variables
 * so that each feature x browser run can be launched independently.
 */
export const STUDENT_ID = process.env.STUDENT_ID ?? '23120229';
export const WEB_URL = process.env.WEB_URL ?? 'http://localhost:5173';
export const ADMIN_URL = process.env.ADMIN_URL ?? 'http://localhost:5174';
export const API_URL = process.env.API_URL ?? 'http://localhost:3000';

/** ISO 8601 timestamp with the local UTC offset, e.g. 2026-11-13T19:30:00+07:00. */
export function isoLocal(date: Date = new Date()): string {
  const pad = (n: number) => String(Math.trunc(Math.abs(n))).padStart(2, '0');
  const offsetMin = -date.getTimezoneOffset();
  const sign = offsetMin >= 0 ? '+' : '-';
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
    `${sign}${pad(offsetMin / 60)}:${pad(offsetMin % 60)}`
  );
}
