import { categories } from "./helpers";
import { radiusScale } from "./scales";
import { select } from "d3-selection";

export const drawLegends = (max) => {

  // Categories color legend
  const color = select("#categories-legend")
    .append("ul")
    .selectAll(".category")
    .data(categories)
    .join("li")
      .attr("class", "category");

  color
    .append("span")
      .attr("class", "color")
      .style("background-color", d => d.color);

  color
    .append("span")
      .attr("class", "label")
      .text(d => d.id);


  // Circle size legend
  const medium = 100;
  const min = 40;
  const maxRadius = radiusScale(max, max);
  const mediumRadius = radiusScale(medium, max);
  const minRadius = radiusScale(min, max);
  const legendRadius = select("#radius-legend")
    .append("svg")
      .attr("width", 150)
      .attr("height", 150)
    .append("g")
      .attr("transform", "translate(1, 10)");
  const legendCircles = legendRadius 
    .append("g")
      .attr("fill", "transparent")
      .attr("stroke", "#09131b");
  legendCircles
    .append("circle")
      .attr("cx", maxRadius)
      .attr("cy", maxRadius)
      .attr("r", maxRadius);
  legendCircles
    .append("circle")
      .attr("cx", maxRadius)
      .attr("cy", 2*maxRadius - mediumRadius)
      .attr("r", mediumRadius);
  legendCircles
    .append("circle")
      .attr("cx", maxRadius)
      .attr("cy", 2*maxRadius - minRadius)
      .attr("r", minRadius);

  const linesLength = radiusScale(max) + 20;
  const legendLines = legendRadius
    .append("g")
      .attr("stroke", "#09131b")
      .attr("stroke-dasharray", "6 4");
  legendLines
    .append("line")
      .attr("x1", maxRadius)
      .attr("y1", 0)
      .attr("x2", maxRadius + linesLength)
      .attr("y2", 0);
  legendLines
    .append("line")
      .attr("x1", maxRadius)
      .attr("y1", 2*maxRadius - 2*mediumRadius)
      .attr("x2", maxRadius + linesLength)
      .attr("y2", 2*maxRadius - 2*mediumRadius);
  legendLines
    .append("line")
      .attr("x1", maxRadius)
      .attr("y1", 2*maxRadius - 2*minRadius)
      .attr("x2", maxRadius + linesLength)
      .attr("y2", 2*maxRadius - 2*minRadius);

  const labels = legendRadius
    .append("g")
      .attr("fill", "#09131b")
      .attr("dominant-baseline", "middle")
      .style("font-size", "1.6rem");
  labels
    .append("text")
      .attr("x", maxRadius + linesLength + 5)
      .attr("y", 0)
      .text(max);
  labels
    .append("text")
      .attr("x", maxRadius + linesLength + 5)
      .attr("y", 2*maxRadius - 2*mediumRadius)
      .text(medium);
  labels
    .append("text")
      .attr("x", maxRadius + linesLength + 5)
      .attr("y", 2*maxRadius - 2*minRadius)
      .text(min);

};