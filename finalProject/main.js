/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 40, bottom: 60, left: 80, right: 40 };

/* LOAD DATA */

/* LOAD DATA */
d3.csv('../data/MoMA_distributions.csv', d3.autoType)
  .then(data => {
  console.log('data :>> ', data);

  // SCALES

  // CREATE SVG ELEMENT

  // BUILD AND CALL AXES

  // LINE GENERATOR FUNCTION

  // DRAW LINE

});