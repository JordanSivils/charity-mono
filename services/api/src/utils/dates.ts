export const getUtcDayKeyAndTtl = () => {
  const now = new Date();

  const utcDateKey = now.toISOString().slice(0, 10);

  const nextMidnightUtc = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0, 0, 0
  ));

  const secondsTillMidnight = Math.max(
    1,
    Math.floor((nextMidnightUtc.getTime() - now.getTime()) / 1000)
  );

  return { utcDateKey, secondsTillMidnight };
};