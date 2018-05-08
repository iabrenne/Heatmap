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
const tooltipOffsetHorizontal = 25;
const tooltipOffsetVertical = 50;

const colorRanges = ["rgb(0, 51, 153)",
                     "rgb(0, 102, 255)",
                     "rgb(153, 153, 255)",
                     "rgb(255, 102, 255)",
                     "rgb(255, 102, 153)",
                     "rgb(255, 102, 0)",
                     "rgb(153, 51, 0)"];

const getMonth = (monthNum) => {
    switch(monthNum){
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

};

const quantile = d3.scaleQuantile()
    .domain([minTemp,maxTemp])
    .range(colorRanges);


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
    .attr("style", d => "fill:" + quantile(originalDataset.baseTemperature + d.variance))
    .attr("width",rectWidth)
    .attr("height",rectHeight)
    .attr("x",d => xScale(d.year) + 50)
    .attr("y",d => yScale(d.month))
    .attr("data-month", d => d.month - 1)
    .attr("data-year", d => d.year)
    .attr("data-temp", d => originalDataset.baseTemperature + d.variance)
    .on("mouseover",(d)=>{ 

        let tooltipElem = document.getElementById("tooltip");
    
        tooltipElem.style.display = "block";
        
        tooltipElem.innerText = `${getMonth(d.month)} ${d.year}\n` ;
    
        tooltipElem.setAttribute("data-year", d.year);
    
        tooltipElem.style.left= (xScale(d.year) + tooltipOffsetHorizontal) + "px";
        tooltipElem.style.top = (yScale(d.month) + tooltipOffsetVertical) + "px";
    
    })
    .on("mouseout",()=>{ 
    
        let tooltipElem = document.getElementById("tooltip");
            
        tooltipElem.style.display = "none";
    
    });

const xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format("d") );

const yAxis = d3.axisLeft(yScale)
                .tickFormat(d => getMonth(d)); 

svg.append("g")
       .attr("id","x-axis")
       .attr("transform","translate(50," + (h-padding) + ")")
       .call(xAxis);

svg.append("g")
       .attr("id","y-axis")
       .attr("transform","translate(" + (padding + 50 ) + ", 0)")
       .call(yAxis);


// Create a legend

svg.append("g")
   .attr("id","legend")
   .attr("transform","translate(1000,600)");

svg.append("text")
   .attr("transform", "translate(" + ( w/2 )+ "," + (h-padding/2 + 25) + ")")
   .attr("id","x-label")
   .style("font-family","Georgia,Serif")
   .style("font-size","20px")
   .style("font-weight","bold")
   .text("Years");

svg.append("text")
   .attr("transform", "rotate(-90)")
   .attr("x",-h/2)
   .attr("y",padding - 25)
   .attr("id","y-label")
   .style("font-family","Georgia,Serif")
   .style("font-size","20px")
   .style("font-weight","bold")
   .text("Months");




const legend = d3.legendColor()
                 .orient("horizontal")
                 .scale(quantile);

svg.select("#legend")
   .call(legend);
