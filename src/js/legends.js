import { categories } from "./helpers";
import { select } from "d3-selection";

export const drawLegends = () => {

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

};