const w = 1500;
const h = 750;

const svg = d3.select("body")
           .append("svg")
           .attr("width", w)
           .attr("height", h);


svg.append("g")
   .attr("id","x-axis")