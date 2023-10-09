/* CONSTANTS AND GLOBALS */
// const width = ,
//   height = ,
//   margin = ,
//   radius = ;

/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .8;
const height = window.innerHeight * .8;
const margin = { top: 20, bottom: 60, left: 60, right: 40 };

/* LOAD DATA */
d3.csv("../data/MoMA_distributions.csv", d3.autoType)
  .then(data => {
    console.log(data)

    /* SCALES */
    
    const xScale = d3.scaleLinear()
      .domain([d3.min(data,function(d){return d.Width;}), d3.max(data,function(d){return d.Width;})])
      .range([margin.left, width - margin.right])

    const yScale = d3.scaleLinear()
      .domain([d3.min(data,function(d){return d.Length;}), d3.max(data,function(d){return d.Length;})])
      .range([height - margin.bottom, margin.top])

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    const radius = d3.scaleLinear()
      .domain([10, d3.max(data,function(d){return d.Lifespan;})])
      .range([10, 50])
     

    /* HTML ELEMENTS */
    
    const svg = d3.select("#container")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .style("background-color", "aliceblue")
      .style("overflow", "visible")
    
    svg.append("g")
      .attr("transform", `translate(${0},${height - margin.bottom})`)
      .call(selection => selection.call(xAxis))

    svg.append("g")
      .attr("transform", `translate(${margin.left},${0})`)
      .call(selection => selection.call(yAxis))

    const circles = svg.selectAll("circle.art")
      .data(data, d => d.Title)
      .join("circle")
      .attr("class", "art")
      .attr("id", d => d.Title)
      .style("fill", "pink")
      .style("stroke", "black")
      .attr("r", d => radius(d.Lifespan))
      .attr("cx", d => xScale(d.Width))
      .attr("cy", d => yScale(d.Length))
  

    svg.append("text")
      .attr("x", -height / 2)
      .attr("y", margin.left / 2)
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "end")
      .style("font-size", "15px")
      .text("Length (cm)");

      svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom + 50)
      .style("text-anchor", "end")
      .style("font-size", "15px")
      .text("Width (cm)");

  });