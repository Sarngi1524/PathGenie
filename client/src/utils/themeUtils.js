const DEFAULT_PRIMARY_COLOR = "#818263";

export const applyPrimaryColor = (color = DEFAULT_PRIMARY_COLOR) => {
  if (typeof document === "undefined") return;

  const primaryColor = color || DEFAULT_PRIMARY_COLOR;
  const root = document.documentElement;

  root.style.setProperty("--primary", primaryColor);
  root.style.setProperty("--secondary", primaryColor);
  root.style.setProperty("--primary-soft", "color-mix(in srgb, " + primaryColor + " 18%, white)");
  root.style.setProperty("--primary-dark", "color-mix(in srgb, " + primaryColor + " 78%, black)");
  localStorage.setItem("primary-color", primaryColor);
};

export const getStoredPrimaryColor = () => {
  if (typeof window === "undefined") return DEFAULT_PRIMARY_COLOR;

  return localStorage.getItem("primary-color") || DEFAULT_PRIMARY_COLOR;
};
