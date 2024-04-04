import { error } from 'console';
import {parse} from 'csv-parse';
import fs from 'fs'


const habitablePlanets=[];

function isHabitablePlanets(planet){
    return planet['koi_disposition'] ==='CONFIRMED' &&
    planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] <1.6; 
}

fs.createReadStream('./kepler_data.csv')
.pipe(parse({
    comment:'#',
    columns:true
}))
.on('data',data=>{
    if(isHabitablePlanets(data)){
        habitablePlanets.push(data);
    }
    //console.log(data);
})
.on('error',(err)=>{
    console.log(err)
})
.on('end',()=>{
    console.log(habitablePlanets.map((planet)=>{
        return planet['kepler_name'];
    }))
    console.log(`The length of the array ${habitablePlanets.length} .`)
})

