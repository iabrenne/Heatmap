const w = 1500;
const h = 620;
const padding = 80;
const dataset = originalDataset.monthlyVariance;
const minYear = d3.min(dataset, d=>d.year);
const maxYear = d3.max(dataset, d=>d.year);
const xRange = maxYear - minYear;
const rectWidth = 4.9 ;
const rectHeight = 37.5 ;
const minTemp = d3.min(dataset, d=>d.variance) + originalDataset.baseTemperature;
const maxTemp = d3.max(dataset, d=>d.variance) + originalDataset.baseTemperature;

const xScale =  d3.scaleLinear()
                  .domain([minYear - (xRange * .001), maxYear +  (xRange * .001)])
                  .range([padding, w-padding]);
                  
const yScale =  d3.scaleLinear()
                  .domain( [12.9, 1])
                  .range([h - padding, padding]);


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
    .attr("y",d => yScale(d.month))
    .attr("data-month", d => d.month - 1)
    .attr("data-year", d => d.year)
    .attr("data-temp", d => originalDataset.baseTemperature + d.variance);

const xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format("d") );

const yAxis = d3.axisLeft(yScale)
                .tickFormat(d => {
            
                    switch(d)
                        {
                        case 1:
                            return 'January';
                        case 2:
                            return 'February';
                        case 3:
                            return 'March';
                        case 4:
                            return 'April';
                        case 5:
                            return 'May';
                        case 6:
                            return 'June';
                        case 7:
                            return 'July';
                        case 8:
                            return 'August';
                        case 9:
                            return 'September';
                        case 10:
                            return 'October';
                        case 11:
                            return 'November';
                        case 12:
                            return 'December';
                        default:
                            return ''
                        }
                    }); 

svg.append("g")
       .attr("id","x-axis")
       .attr("transform","translate(0," + (h-padding) + ")")
       .call(xAxis);

svg.append("g")
       .attr("id","y-axis")
       .attr("transform","translate(" + padding + ", 0)")
       .call(yAxis);


// Create a legend

svg.append("g")
   .attr("id","legend")
   .attr("transform","translate(1000,600)");


const quantile = d3.scaleQuantile()
                .domain([minTemp,maxTemp])
                .range(["rgb(0, 51, 153)",
                        "rgb(0, 102, 255)",
                        "rgb(153, 153, 255)",
                        "rgb(255, 102, 255)",
                        "rgb(255, 102, 153)",
                        "rgb(255, 102, 0)",
                        "rgb(153, 51, 0)"]);


const legend = d3.legendColor()
                 .orient("horizontal")
                 .scale(quantile);

svg.select("#legend")
   .call(legend);
