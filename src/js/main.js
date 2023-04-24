import channels from "../data/yt_channels.json";
console.log("channels", channels);
import { max } from "d3-array";

import { initializeRadiusScale } from "./scales";
import { drawLegends } from "./legends";
import { drawViz } from "./viz";

const maxSubcribers = max(channels, d => d.subscribers_millions);
initializeRadiusScale(maxSubcribers);
drawLegends(maxSubcribers);

drawViz(channels);