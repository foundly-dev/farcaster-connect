const DIRECTORY = "connect";

export const createAssetUrl = (url: string) => {
  const _url = new URL("https://assets.foundly.dev");
  if (url.startsWith(`/${DIRECTORY}`) || url.startsWith(DIRECTORY)) {
    _url.pathname = url.startsWith("/") ? url.slice(1) : url;
    return _url.toString();
  }

  _url.pathname = `/${DIRECTORY}/${url.startsWith("/") ? url.slice(1) : url}`;
  return _url.toString();
};

export const fallbackImage = (size: "64" | "128" | "512" = "128") => {
  return `/fallback/fallback_${size}.png`;
};

export const logoImage = (
  size: "512" | "256" | "128" | "64" | "transparent" = "64",
  type: "png" = "png"
) => {
  return createAssetUrl(`/logo/connect_${size}.${type}`);
};
