import React from 'react';
import axios from 'axios';
import navHook from './nav';


class Banner extends React.Component{

    constructor() {
        super();
        this.state = {
            restaurant: [],
            inputText: undefined,
            suggestion: []
        }
    }

    handleLocationChange = (e) => {
        const locationId = e.target.value;
        sessionStorage.setItem('locationId', locationId);


        axios({
            url: `http://localhost:5500/restaurant/${locationId}`,
            method: 'Get',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({restaurant: res.data.restaurants})
        })
        .catch((err => console.log(err)))
    }

    handleInputChange = (event) => {
        const { restaurant } = this.state;
        const inputText = event.target.value;

        let suggestion = [];
        
        suggestion = restaurant.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ suggestion, inputText });
    }

    selectRestaurant = (id) => {
        this.props.navigate(`details/${id}`);
    }

    showSuggestion = () => {
        const { suggestion, inputText } = this.state;

        if( suggestion.length == 0 && inputText == undefined) {
            return null;
        }
        if( suggestion.length > 0 && inputText == '') {
            return null;
        }
        if ( suggestion.length == 0 && inputText) {
            return <li>No Search Result Found</li>
        }

        return(
            suggestion.map((data, index) => (
                <li key={index} onClick={() => this.selectRestaurant(data._id)}>
                    <img className="sugImg" src={data.thumb} />
                    <span className="sugName">{`${data.name}`}</span>
                    <span className="sugAdd">{`${data.locality}`}</span>
                </li>
            ))
        )
    }

    render(){
        const { locationData } = this.props
        return(
            <div>
                <div className="container-fluid back-img">
            
                    <div className="row mb-5">
           {/*          <div className="col mt-3 text-end">
                            <button type="button" className="btn btn-outline-light">Login</button> &nbsp;
                            <button type="button" className="btn btn-outline-light me-5">Create an account</button>
                        </div> */}
                    </div>
        

                    <div className="row">
                        <div className="col text-center">
                            <span className="px-4 py-2 logo-h">e!</span>
                        </div>
                    </div>

                    <div className="row text-center mt-5">
                        <div className="col">
                            <p className="restaurant-title">Find the best restaurants, cafés and bars</p>
                        </div>
                    </div>

                    <div className="row mt-2 line">
                        <div className="col text-end">
                            <select className="form-control dropdown" onChange={this.handleLocationChange}>
                                <option value="0" disabled selected>Please select a location</option>
                                {
                                    locationData.map((item) => {
                                        return (
                                            <option value={item.city_id}>{`${item.name}`}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col input-group searchbar">
                            <i className="input-group-text bi bi-search icon"></i>
                            <input type="text" className="inputbar" placeholder="Search for restaurants" onChange={this.handleInputChange} />
                            <ul className="suggestion">{this.showSuggestion()}</ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default navHook(Banner);