import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    try {

        let changeableUrl = url;

        if(country) {
            changeableUrl += `/countries/${country}`;
        }

        const { data: { confirmed, recovered, lastUpdate, deaths } } = await axios.get(changeableUrl);

        return { confirmed, recovered, lastUpdate, deaths };
    } catch (err) {
        console.log(err)
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))

        return modifiedData;
        // return { confirmed, recovered, lastUpdate, deaths };
    } catch (err) {
        console.log(err)

    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        const modifiedData = countries.map((country) => country.name)

        return modifiedData;
    } catch (err) {
        console.log(err)

    }
}