import defaultAvatar from "../assets/avatars/default-avatar.png";

export const getAvatarSrc = (avatar) => {
  if (typeof avatar !== "string") {
    return defaultAvatar;
  }

  const value = avatar.trim();
  const isImageSource =
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:image/") ||
    value.startsWith("/");

  return isImageSource ? value : defaultAvatar;
};

export { defaultAvatar };
