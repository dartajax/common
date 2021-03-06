// @link https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
export default function escapeRegExp(string) {
  if (!string) {
    return string;
  }
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
