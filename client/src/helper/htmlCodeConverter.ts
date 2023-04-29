export const unicodeConverter = (str: string) => {
  return str.replace(/&#[0-9]+;/i,
    (match) => {
      const newString = new DOMParser().parseFromString(match, "text/html");
      if (newString.documentElement.textContent)
        return newString.documentElement.textContent;
      else return match
    });
}