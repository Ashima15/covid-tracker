import React, { Component } from 'react';

import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './images/image.png';

import { Cards, Chart, CountryPicker } from './components';

class App extends Component {

	state = {
		data: {},
		country: ''
	}

	componentDidMount = async () => {
		const fetchedData = await fetchData();

		this.setState({ data: fetchedData })
	}

	handleCountryChange = async (country) => {

		const fetchedData = await fetchData(country);

		this.setState({
			data: fetchedData,
			country
		})
	}

	render() {

		const { data, country } = this.state;

		return (
			<div className={styles.container}>
				<img className={styles.image} src={coronaImage} alt='COVID-19'/>
				<Cards data={data} />
				<CountryPicker handleCountryChange={this.handleCountryChange} />
				<Chart data={data} country={country} />
			</div>
		);
	}
}

export default App;
