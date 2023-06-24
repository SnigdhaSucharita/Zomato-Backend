import React from 'react';
import axios from 'axios';
import '../Styles/Homepage.css';
import Banner from './Banner';
import QuickSearch from './QuickSearch';

class Home extends React.Component{

    constructor(){
        super();
        this.state = {
            locations: [],
            mealtype: []
        }
    }

    componentDidMount(){
        axios({
            url: 'http://localhost:5500/location',
            method: 'Get',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({locations: res.data.loc})
        })
        .catch((err => console.log(err)))

        axios({
            url: 'http://localhost:5500/mealtype',
            method: 'Get',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({mealtype: res.data.mealtypes})
        })
        .catch((err => console.log(err)))

    }

    render(){
        const { locations, mealtype } = this.state;

        return(
            <div>
                <Banner locationData = { locations } />
                <QuickSearch mealtypeData = { mealtype } />   
            </div>
        )
    }
}

export default Home;