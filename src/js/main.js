import channels from "../data/yt_channels.json";
console.log("channels", channels);

import { drawLegends } from "./legends";
import { drawViz } from "./viz";

drawLegends();

drawViz(channels);