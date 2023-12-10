export const isIosSafari = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const isSafari = Boolean(
    navigator.userAgent.match(/Version\/[\d.]+.*Safari/),
  );
  const isChrome = Boolean(navigator.userAgent.match(/CriOS\//));
  return isSafari || isChrome;
};

export const isMobileDevice = () => {
  return isIosSafari() || window.navigator.userAgent.includes("Android");
};
