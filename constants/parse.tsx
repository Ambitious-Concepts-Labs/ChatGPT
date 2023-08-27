export const HTMLBreak = "<div><br></div>";

export const formatPrompt = (prompt) => {
  const arr = prompt.split("\n");
  const HTMLOpenColor =
    '<span style="color:#6d28d9;background-color:#7c3aed1a">';
  const HTMLCloseColor = "</span>";
  let promptParsed = arr.length > 1 ? arr.join(HTMLBreak) : arr[0];

  const keywordRegex = /\[\w+\s?\w*\s?\w*\]/gi;

  const arrToColor = promptParsed.match(keywordRegex);
  const arrColored = arrToColor.map(
    (strToColor) => HTMLOpenColor + strToColor + HTMLCloseColor,
  );

  for (let i = 0; i < arrToColor.length; i++) {
    promptParsed = promptParsed.replace(arrToColor[i], arrColored[i]);
  }

  return promptParsed;
};

export const setFocus = (element) => {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
};
