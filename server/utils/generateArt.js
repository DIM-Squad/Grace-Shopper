/*eslint-disable complexity */
/*  eslint-disable max-statements */
/*  eslint-disable no-undef */
/*  eslint-disable camelcase */

const Chance = require('chance')
const chance = new Chance(95698435)
const fs = require('fs')

// Generate a svg randomly
chance.mixin({
  svg: function(options) {
    options = options || {}
    options.size = options.max_size || 30
    if (typeof options.lines === 'undefined')
      options.lines = chance.integer({min: 0, max: 30})
    if (typeof options.circles === 'undefined')
      options.circles = chance.integer({min: 0, max: 15})
    if (typeof options.triangles === 'undefined')
      options.triangles = chance.integer({min: 0, max: 20})
    if (typeof options.opacity === 'undefined')
      options.opacity = Math.max(Math.random(), 0.3)
    options.polygon = chance.integer({min: 0, max: 1})
    options.background = options.background || chance.color()

    // Create a coordinate within an area bigger than the svg
    function point(min, max) {
      return chance.integer({min: min || -100, max: max || 1100})
    }

    // Generate the actual svg
    // Docs: developer.mozilla.org/en-US/docs/Web/SVG/Element/line
    // viewBox use: stackoverflow.com/q/17498855
    let svg = '<svg version="1.1" width="1000" height="1000" '
    svg += 'xmlns="http://www.w3.org/2000/svg" '
    svg += 'style="background-color:' + options.background + '">'
    for (let i = 0; i < options.lines; i++) {
      svg += '<line stroke="' + chance.color() + '" '
      svg += 'stroke-width="' + point(1, 5) + '" '
      svg += 'opacity="' + options.opacity + '" '
      svg += 'x1="' + point() + '" y1="' + point() + '" '
      svg += 'x2="' + point() + '" y2="' + point() + '" />'
    }
    for (let i = 0; i < options.circles; i++) {
      svg += '<circle cx="' + point() + '" '
      svg += 'cy="' + point() + '" '
      svg += 'r="' + point(1, options.max_size / 2) + '" '
      svg += 'opacity="' + options.opacity + '" '
      svg += 'fill="' + chance.color() + '"/>'
    }
    for (let i = 0; i < options.triangles; i++) {
      const s = options.max_size
      svg += '<polygon fill="' + chance.color() + '" points="'
      svg += (x = point()) + ',' + (y = point()) + ' '
      svg += x + point(-s, s) + ',' + (y + point(-s, s)) + ' '
      svg += x + point(-s, s) + ',' + (y + point(-s, s))
      svg += '" opacity="' + options.opacity + '"/> '
      //svg += 'fill="' + chance.color() + '"/>'
    }
    if (options.polygon) {
      const numPoints = chance.integer({min: 4, max: 8})
      let x, y
      let pointsArray = [[(x = point()), (y = point())]]
      const s = options.max_size
      for (let i = 0; i < numPoints; i++) {
        pointsArray.push([x + point(-s, s), y + point(-s, s)])
      }
      pointsArray.sort((a, b) => a[0] > b[0])
      let points = ''
      for (let item of pointsArray) {
        points += ` ${item[0]},${item[1]}`
      }
      svg += `<polygon fill="${chance.color()}" points="${points}" opacity="${
        options.opacity
      }" />`
    }
    return svg + '</svg>'
  }
})

module.exports = id => {
  fs.writeFileSync(
    `public/img/img${id.toString().padStart(4, '0')}.svg`,
    chance.svg()
  )
}

// document.querySelector('body').innerHTML = chance.svg({
//   lines: chance.integer({min: 0, max: 30}),
//   triangles: chance.integer({min: 0, max: 20}),
//   circles: chance.integer({min: 0, max: 15}),
//   polygon: chance.integer({min: 0, max: 1}),
//   max_size: 30,
//   opacity: Math.max(Math.random(), 0.3)
// })
