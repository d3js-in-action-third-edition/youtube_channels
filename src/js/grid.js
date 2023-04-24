export const createGrid = (data, colArray, rowHeight, breakPoints) => {

  const padding = 30;
  const container = breakPoints[0];
  const svgWidth = window.innerWidth >= container
    ? 0.8333 * container - 2 * padding
    : window.innerWidth > 768
      ? 0.8333 * window.innerWidth - 2 * padding
      : window.innerWidth - 2 * padding;

  let numColumns;
  switch (true) {
    case window.innerWidth <= breakPoints[2]:
      numColumns = colArray[2];
      break;
    case window.innerWidth <= breakPoints[1]:
      numColumns = colArray[1];
      break;
    default:
      numColumns = colArray[0];
      break;
  };

  const numRows = Math.ceil(data.length / numColumns);
  const svgHeight = numRows * rowHeight;
  const colWidth = svgWidth / numColumns;

  const annotatedData = {
    width: svgWidth,
    height: svgHeight,
    colWidth: colWidth,
    rowHeight: rowHeight,
    data: []
  };

  let index = 0;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      if (index < data.length) {
        const datum = data[index];
        datum["x"] = col * colWidth;
        datum["y"] = row * rowHeight;
        annotatedData.data.push(datum);
  
        index += 1;
      }
    }
  }

  return annotatedData;

};