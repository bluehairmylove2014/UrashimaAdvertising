export const getHostname = () =>
  process.env.NODE_ENV === 'development'
    ? 'localhost'
    : 'www.officer.urashima-ads.site';
