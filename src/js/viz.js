import { createGrid } from "./grid";
import { drawChannel, updateChannel } from "./channel";
import { select } from "d3-selection";
import { transition } from "d3-transition";

export const drawViz = channels => {

  // Append SVG container
  const svg = select("#viz")
    .append("svg");

  // Append blur
  svg
    .append("filter")
      .attr("id", "blur")
    .append("feGaussianBlur")
      .attr("stdDeviation", 3);

  // Set the grid values
  const colArray = [5, 3, 1];
  const breakPoints = [1400, 1200, 500];
  const rowHeight = 200;

  const drawElements = (annotatedData) => {

    // svg
    // .selectAll("rect")
    // .data(annotatedData.data)
    // .join("rect")
    //   .attr("x", d => d.x)
    //   .attr("y", d => d.y)
    //   .attr("width", annotatedData.colWidth)
    //   .attr("height", annotatedData.rowHeight)
    //   .attr("fill", "none")
    //   .attr("stroke", "cyan");

    svg
      .attr("width", annotatedData.width)
      .attr("height", annotatedData.height);

    svg
      .selectAll(".channel")
      .data(annotatedData.data)
      .join("g")
        .attr("class", d => `channel ${d.id}`)
        .attr("transform", d => `translate(${d.x}, ${d.y})`);

    annotatedData.data.forEach(channel => {
      drawChannel(channel, annotatedData.colWidth, annotatedData.rowHeight);
    });

  };

  const updateGrid = (annotatedData) => {
  
    svg
      .attr("width", annotatedData.width)
      .attr("height", annotatedData.height);

    // svg
    //   .selectAll("rect")
    //   .transition()
    //     .attr("x", d => d.x)
    //     .attr("y", d => d.y)
    //     .attr("width", annotatedData.colWidth)
    //     .attr("height", annotatedData.rowHeight);

    svg
      .selectAll(".channel")
      .transition()
        .attr("transform", d => `translate(${d.x}, ${d.y})`);

    annotatedData.data.forEach(channel => {
      updateChannel(channel, annotatedData.colWidth, annotatedData.rowHeight);
    });
  
  };

  drawElements(createGrid(channels, colArray, rowHeight, breakPoints));
  window.addEventListener('resize', () => updateGrid(createGrid(channels, colArray, rowHeight, breakPoints)));

};  