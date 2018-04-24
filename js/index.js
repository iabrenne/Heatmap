const w = 1500;
const h = 750;

const svg = d3.select("body")
           .append("svg")
           .attr("width", w)
           .attr("height", h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class","cell")
    .attr("width",10)
    .attr("height",20)
    .attr("x",10)
    .attr("y",20)
    .attr("rx",10)
    .attr("ry",20);

svg.append("g")
    .attr("id","x-axis");

svg.append("g")
    .attr("id","y-axis");



