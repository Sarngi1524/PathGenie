export const applyTheme = (enabled) => {
  if (typeof window === "undefined") return;

  document.body.classList.toggle("dark-theme", enabled);
  localStorage.setItem("driver-theme", enabled ? "dark" : "light");
};

export const getStoredTheme = () => {
  if (typeof window === "undefined") return true;

  const savedTheme = localStorage.getItem("driver-theme");

  if (!savedTheme) {
    applyTheme(true);
    return true;
  }

  return savedTheme === "dark";
};
