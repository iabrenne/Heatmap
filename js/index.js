const w = 1500;
const h = 750;
const padding = 80;
const dataset = originalDataset.monthlyVariance;
const minYear = d3.min(dataset, d=>d.year);
const maxYear = d3.max(dataset, d=>d.year);
const xRange = maxYear - minYear;
const rectWidth = 5 ;
const rectHeight = 20 ;

const xScale =  d3.scaleLinear()
                  .domain([minYear - (xRange * .05), maxYear +  (xRange * .05)])
                  .range([padding, w-padding]);



const svg = d3.select("body")
           .append("svg")
           .attr("width", w)
           .attr("height", h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class","cell")
    .attr("width",rectWidth)
    .attr("height",rectHeight)
    .attr("x",d => xScale(d.year))
    .attr("y",20)
    .attr("rx",10)
    .attr("ry",20)
    .attr("data-month", d => d.month)
    .attr("data-year", d => d.year)
    .attr("data-temp", d => originalDataset.baseTemperature + d.variance);

const xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format("d") );

svg.append("g")
       .attr("id","x-axis")
    //   .attr("transform","translate(0," + (h-padding) + ")")
       .call(xAxis);

svg.append("g")
       .attr("id","y-axis");
    //   .attr("transform","translate(" + padding + ", 0)")
    //   .call(yAxis);

