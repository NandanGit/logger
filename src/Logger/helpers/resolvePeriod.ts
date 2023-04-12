interface iResolvePeriodOutput {
  localStart: Date;
  localEnd: Date;
}

export const resolvePeriod = (
  period: number,
  periodStart: Date
): iResolvePeriodOutput => {
  const nowTime = new Date().getTime();
  const periodStartTime = periodStart.getTime();
  const localStart = nowTime - ((nowTime - periodStartTime) % period);
  return {
    localStart: new Date(localStart),
    localEnd: new Date(localStart + period),
  };
};
