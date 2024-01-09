export const getHostname = () =>
  process.env.NODE_ENV === 'development'
    ? 'localhost'
    : 'www.hq.urashima-ads.site';
