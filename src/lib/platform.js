import platform from "platform";

export default function (params, fallback) {
  return params[platform.os.family] || fallback;
}
