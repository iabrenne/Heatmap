const w = 1500;
const h = 620;
const padding = 80;
const dataset = originalDataset.monthlyVariance;
const minYear = d3.min(dataset, d=>d.year);
const maxYear = d3.max(dataset, d=>d.year);
const xRange = maxYear - minYear;
const rectWidth = 4 ;
const rectHeight = 20 ;

const xScale =  d3.scaleLinear()
                  .domain([minYear - (xRange * .001), maxYear +  (xRange * .001)])
                  .range([padding, w-padding]);
                  
const yScale =  d3.scaleLinear()
                  .domain( [12.5, 0.50 ])
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
    .attr("data-month", d => d.month)
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
                            return 'Unknown'
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

