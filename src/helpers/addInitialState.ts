export default function addInitialState(fileLines: string[], initialStateRawStr: string) {
  let initialState = "";

  const initialStateIndices = [-1, -1];
  fileLines.forEach((line, index) => {
    if (initialStateIndices[1] !== -1) return;

    if (line.includes("const initialState: ")) {
      initialState = line.trim() + "\n" + initialStateRawStr;
      initialStateIndices[0] = index;
    } else if (line.includes("};") && initialStateIndices[0] !== -1) {
      initialStateIndices[1] = index;
    }
  });

  fileLines = [
    ...fileLines.slice(0, initialStateIndices[0]),
    initialState,
    ...fileLines.slice(initialStateIndices[1] + 1),
  ];

  return fileLines.join("\n");
}
