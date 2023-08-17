// csv-parse npm package is downloaded and used in this project.
const { parse } = require('csv-parse');
const fs = require('fs');

// Let's create an array to hold the details of habitable planets in our 9000+ data
const habitablePlanets = [];

// Let's filter the csv data (planets) according to some values that makes a planet habitable:
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

// By using file system built-in function, we will get the data in csv file, pipe inro parsing functions and turn the data into a readable stream.
fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)){
            habitablePlanets.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);

        // Instead of all the data about habitable planets we found, let's log the name of the planets:
        console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name'];
        }))
    });

