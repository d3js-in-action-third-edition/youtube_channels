import { scaleOrdinal, scaleRadial } from "d3-scale";
import { categories } from "./helpers";

export const colorScale = scaleOrdinal()
  .domain(categories.map(d => d.id))
  .range(categories.map(d => d.color));

export const radiusScale = scaleRadial();
export const initializeRadiusScale = (maxSubscribers) => {
  radiusScale
    .domain([0, maxSubscribers])
    .range([0, 50]);
};