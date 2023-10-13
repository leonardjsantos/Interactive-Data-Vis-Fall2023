/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../data/world.json"),
  d3.csv("../data/MoMA_nationalities.csv", d3.autoType),
]).then(([geojson, nationalities]) => {
  
  const svg = d3.select("#container")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .style("background-color", "pink")

  // SPECIFY PROJECTION
  const projection = d3.geoNaturalEarth1()
    .fitSize([width, height], geojson)

  // DEFINE PATH FUNCTION
  const pathGenFn = d3.geoPath().projection(projection)
  // console.log(path)

  // console.log(nationalities)
  // console.log(nationalities.map(d => d.Country))

  const nationalitiesRep = nationalities.map(d => d.Country)

  // console.log(nationalitiesRep)

  // APPEND GEOJSON PATH  
  const countries = svg.selectAll("path.country")
    .data(geojson.features)
    .join("path")
    .attr("class", 'country')
    .attr("d", pathGenFn)
    .attr("stroke", "black")
    .attr("fill", d => {
      if (nationalitiesRep.includes(d.properties.name)){
        return "black"
      }


      else{
        return "transparent"
      }

      })

  
    // .attr("fill", "transparent")    
  
  
  

  // svg.selectAll("circle.countries")
  //     .data(nationalities)
  //     .join("circle")
  //     .attr("class", "nationalities")
  //     .attr("r", 5)
  //     .attr("transform", d =>{
  //       const [x,y] = projection([d.longitude, d.latitude])
  //       return `translate(${x}, ${y})`
  //     })

  

  // FILL IN COUNTRIES
 
  
  // APPEND DATA AS SHAPE

  // svg.append("circle")
  //   .attr("r", 20)
  //   .attr("transform", () => {
  //     const[x,y] = projection([-73.9833, 40.7423])
  //     return `translate(${x}, ${y})`
  //   })

  // svg.selectAll("circle.capital")
  //   .data(capitals)
  //   .join("circle")
  //   .attr("class", "capital")
  //   .attr("r", 5)
  //   .attr("transform", d =>{
  //     const [x,y] = projection([d.longitude, d.latitude])
  //     return `translate(${x}, ${y})`
  //   })


});


/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
//  Promise.all([
//   d3.json("../data/usState.json"),
//   d3.csv("../data/stateCapitals.csv", d3.autoType),
// ]).then(([geojson, capitals]) => {
  
//   const svg = d3.select("#container")
//     .append("svg")
//     .attr("height", height)
//     .attr("width", width)
//     .style("background-color", "pink")

//   // SPECIFY PROJECTION
 
//   const projection = d3.geoAlbersUsa()
//     .fitSize([width, height], geojson)

//   // DEFINE PATH FUNCTION
//   const pathGenFn = d3.geoPath().projection(projection)
//   // console.log(path)

//   // APPEND GEOJSON PATH  
//   const states = svg
//     .selectAll("path.state")
//     .data(geojson.features)
//     .join("path")
//     .attr("class", 'state')
//     .attr("d", pathGenFn)
//     .attr("stroke", "black")
//     .attr("fill", "transparent")
  
//   // APPEND DATA AS SHAPE

//   svg.append("circle")
//     .attr("r", 20)
//     .attr("transform", () => {
//       const[x,y] = projection([-73.9833, 40.7423])
//       return `translate(${x}, ${y})`
//     })

//   svg.selectAll("circle.capital")
//     .data(capitals)
//     .join("circle")
//     .attr("class", "capital")
//     .attr("r", 5)
//     .attr("transform", d =>{
//       const [x,y] = projection([d.longitude, d.latitude])
//       return `translate(${x}, ${y})`
//     })

// });