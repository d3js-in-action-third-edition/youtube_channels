import { select } from "d3-selection";
import { transition } from "d3-transition";
import { radiusScale, colorScale } from "./scales";

const rectWidth = 20;
const rectHeight = 105;

export const drawChannel = (d, colWidth, rowHeight) => {

  const selection = select(`.${d.id}`);

  // Append text
  const textContainer = selection
    .append("foreignObject")
      .attr("x", 0)
      .attr("y", rowHeight - 60)
      .attr("width", colWidth)
      .attr("height", 60)
    .append("xhtml:a")
      .attr("href", d => d.link);
  textContainer
    .append("xhtml:div")
      .attr("class", "label-name")
      .style("text-align", "center")
      .style("line-height", "1.2")
      .text(d.name);
  textContainer
    .append("xhtml:div")
      .attr("class", "label-country")
      .style("text-align", "center")
      .style("font-size", "15px")
      .style("line-height", "1.2")
      .text(d.country); 
      
  // Append language
  selection
    .append("rect")
      .attr("x", colWidth / 2 - radiusScale(d.subscribers_millions) - rectWidth / 2)
      .attr("y", 85 - rectHeight / 2)
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("fill", "#343330");

  // Append circle
  selection
    .append("circle")
      .attr("class", "main-circle")
      .attr("cx", colWidth / 2)
      .attr("cy", 90)
      .attr("r", radiusScale(d.subscribers_millions))
      .attr("fill", colorScale(d.category))
      .attr("filter", "url(#blur)");

  // Append language
  selection
    .append("text")
      .attr("transform", `translate(${colWidth / 2 - radiusScale(d.subscribers_millions) + 5}, 130) rotate(-90)`)
      .attr("fill", "#fff")
      .text(d.primary_language);

  // Append is brand indicator
  if (d.isBrandChannel) {
    selection
      .append("circle")
        .attr("class", "is-brand")
        .attr("cx", colWidth / 2 - radiusScale(d.subscribers_millions))
        .attr("cy", 24)
        .attr("r", 3)
        .attr("fill", "#343330");
  }

};

export const updateChannel = (d, colWidth, rowHeight) => {

  const selection = select(`.${d.id}`);

  selection.select("foreignObject")
    .transition()
      .attr("width", colWidth);
  selection.select(".label-name")
    .transition()
      .attr("x", colWidth / 2)
      .attr("y", rowHeight - 40);
  selection.select(".label-country")
    .transition()
      .attr("x", colWidth / 2)
      .attr("y", rowHeight - 20);

  selection.select("rect")
    .transition()
      .attr("x", colWidth / 2 - radiusScale(d.subscribers_millions) - rectWidth / 2);

  selection.select(".main-circle")
    .transition()
      .attr("cx", colWidth / 2);

  selection.select("text")
    .transition()
      .attr("transform", `translate(${colWidth / 2 - radiusScale(d.subscribers_millions) + 5}, 130) rotate(-90)`);

  selection.select(".is-brand")
    .transition()
      .attr("cx", colWidth / 2 - radiusScale(d.subscribers_millions));

};