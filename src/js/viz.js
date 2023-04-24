import { createGrid } from "./grid";
import { select } from "d3-selection";

export const drawViz = channels => {

  // Append SVG container
  const svg = select("#viz")
    .append("svg");

  // Set the grid values
  const colArray = [5, 3, 1];
  const breakPoints = [1400, 768, 500];
  const rowHeight = 150;

  const updateGrid = (isFirst) => {
    const annotatedData = createGrid(channels, colArray, rowHeight, breakPoints);
  
    svg
      .attr("width", annotatedData.width)
      .attr("height", annotatedData.height);
  
    if (isFirst) {
      svg
      .selectAll("rect")
      .data(annotatedData.data)
      .join("rect")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("width", annotatedData.colWidth)
        .attr("height", annotatedData.rowHeight)
        .attr("fill", "none")
        .attr("stroke", "cyan");
    } else {
      svg
        .selectAll("rect")
        .transition()
          .attr("x", d => d.x)
          .attr("y", d => d.y)
          .attr("width", annotatedData.colWidth)
          .attr("height", annotatedData.rowHeight);
    }
  };

  window.addEventListener('resize', updateGrid);
  updateGrid(true);

};  