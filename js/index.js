const w = 1500;
const h = 620;
const svgH = 750;
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

const colorRanges = ["rgb(102, 102, 51)",
                     "rgb(153, 204, 0)",
                     "rgb(204, 255, 51)",
                     "rgb(255, 255, 102)",
                     "rgb(255, 204, 102)",
                     "rgb(255, 153, 102)",
                     "rgb(255, 102, 102)",
                     "rgb(255, 0, 102)",
                     "rgb(204, 102, 153)",
                     "rgb(153, 51, 102)"];

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
                  .domain( [0.5,12.5])
                  .range([padding, h - padding]);


const svg = d3.select("body")
           .append("svg")
           .attr("width", w)
           .attr("height", svgH)
           .attr("class","w3-card-2")
           .attr("display","block")
           .style("margin","auto")
           .style("margin-top","80px")
           .style("background-color","cadetblue");

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class","cell")
    .attr("style", d => "fill:" + quantile(originalDataset.baseTemperature + d.variance))
    .attr("width",rectWidth)
    .attr("height",rectHeight)
    .attr("x",d => xScale(d.year))
    .attr("y",d => yScale(d.month))
    .attr("transform", "translate(50,-" + rectHeight/2 + ")")
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
       .style("font-size", "15px")
       .call(xAxis);

svg.append("g")
       .attr("id","y-axis")
       .attr("transform","translate(" + (padding + 50 ) + ", 0)")
       .style("font-size", "15px") 
       .call(yAxis);


// Create a legend

svg.append("g")
   .attr("id","legend")
   .attr("transform","translate(900,600)");

// Add title

svg.append("text")
        .attr("x", (w/2))   
        .attr("id","graph-title")     
        .style("font-family","Georgia,Serif")     
        .attr("y", 0 + (padding/ 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .style("font-weight","bold")
        .style("text-decoration", "underline")  
        .text("Monthly Global Temperatures");


// Add x-axis label
svg.append("text")
   .attr("transform", "translate(" + ( w/2 )+ "," + (h-padding/2 + 25) + ")")
   .attr("id","x-label")
   .style("font-family","Georgia,Serif")
   .style("font-size","20px")
   .style("font-weight","bold")
   .text("Years");

// Add y-axis label
svg.append("text")
   .attr("transform", "rotate(-90)")
   .attr("x",-h/2)
   .attr("y",padding - 25)
   .attr("id","y-label")
   .style("font-family","Georgia,Serif")
   .style("font-size","20px")
   .style("font-weight","bold")
   .text("Months");



// create a legend
const legend = d3.legendColor()                 
                //  .labels( function({i, genLength}){ 
                //             return d3.format(".2f")( ( maxTemp - minTemp ) / genLength  * (i+1)); 
                //         })
                 .shapeWidth(40)
                 .shapeHeight(40)
                 .orient("horizontal")
                 .scale(quantile);

svg.select("#legend")
   .call(legend);
