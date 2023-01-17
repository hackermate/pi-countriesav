const axios = require('axios');
const { Country } = require('../db.js');


const getCountries = async () => {
    try {
        let Url = 'https://restcountries.com/v3/all';
        const allCountries = Country.findAll();
        if(!allCountries.length){
        const apiCountriesResponse = await axios.get(Url);
        var apiCountries = apiCountriesResponse.data.map((e) => {
            return {
                id: e.cca3,
                name: e.name.common,
                flags: e.flags[0],
                continent: e.continents[0],
                capital: e.capital ? e.capital[0] : 'Not found',
                subregion: e.subregion,
                area: e.area,
                population: e.population,
                maps: e.maps.googleMaps || ["Maps not found"]
            }
        });
        await Country.bulkCreate(apiCountries);
        console.log('creado')
    }
    } catch(error) {
        console.log(error);
    }
}

module.exports = { getCountries };
