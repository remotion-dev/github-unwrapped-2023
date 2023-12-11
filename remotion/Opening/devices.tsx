export const isWebkit = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const isSafariUserAgent = Boolean(
    navigator.userAgent.match(/Version\/[\d.]+.*Safari/),
  );
  const isChrome = Boolean(navigator.userAgent.match(/CriOS\//));
  return isSafariUserAgent || isChrome;
};

export const isMobileDevice = () => {
  return isWebkit() || window.navigator.userAgent.includes("Android");
};
