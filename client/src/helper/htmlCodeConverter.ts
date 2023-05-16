export const htmlcodeConverter = (str: string) => {
  return str.replaceAll(/&#[0-9]+;/ig,
    (match) => {
      const newString = new DOMParser().parseFromString(match, "text/html");
      if (newString.documentElement.textContent)
        return newString.documentElement.textContent;
      else return match
    });
}