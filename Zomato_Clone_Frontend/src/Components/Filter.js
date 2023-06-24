import React from 'react';
import axios from 'axios';
import '../Styles/Filter.css';
import navHook from "./nav";

class Filter extends React.Component{

    constructor(){
        super();
        this.state = {
            locations: [],
            restaurant: [],
            location: undefined,
            cuisine: [],
            lcost: undefined,
            hcost: undefined,
            sort: 1,
            page: 1
        }
    }

    componentDidMount(){
        axios({
            url: 'http://localhost:5500/location',
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({locations: res.data.loc})
        })
        .catch((err => console.log(err)))


        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({restaurant: res.data.restaurants})
        })
        .catch((err => console.log(err)))

    }

    handleLocationChange = (event) => {
        const location = event.target.value;

        const { sort, lcost, hcost, page, cuisine } = this.state;

        const filterObj = {
            location: location,
            cuisine,
            lcost,
            hcost,
            sort,
            page
        }

        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON'},
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurant: res.data.restaurants, location })
        })
        .catch((err => console.log(err)))

    }

    handleSortChange = (sort) => {
        const { location, lcost, hcost, page , cuisine} = this.state;

        const filterObj = {
            location,
            cuisine,
            lcost, 
            hcost,
            sort,
            page
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurant: res.data.restaurants, sort})
        })
        .catch(err => console.log(err))
    }

    handlePageChange = (page) => {
        const { location, sort, lcost, hcost, cuisine } = this.state;

        const filterObj = {
            location,
            cuisine,
            lcost, 
            hcost,
            sort,
            page
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurant: res.data.restaurants, page})
        })
        .catch(err => console.log(err))
    }

    handleCostChange = (lcost, hcost) => {
        const { location, sort, page, cuisine } = this.state;

        const filterObj = {
            location,
            cuisine,
            lcost, 
            hcost,
            sort,
            page
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurant: res.data.restaurants, lcost, hcost})
        })
        .catch(err => console.log(err))
    }

    handleCuisineChange = (optionValue) => {
        const { location, cuisine, lcost, hcost, sort, page } = this.state;

        if (cuisine.includes(optionValue)) {
            cuisine.splice(cuisine.indexOf(optionValue), 1);
          } else {
            cuisine.push(optionValue);
          }

          const filterObj = {
            location,
            cuisine,
            lcost, 
            hcost,
            sort,
            page
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurant: res.data.restaurants, cuisine})
        })
        .catch(err => console.log(err))
    }

    handleNavigate = (res) => {
        this.props.navigate(`/details/${res}`);
    }

    render() {

        const { locations, restaurant } = this.state;
    

        return(
            <div>
           {/*     <header>
                        <span id="logo">e!</span>
                        <span className="login-signup">
                            <button type="button" className="login">Login</button>
                            <button type="button" className="signup">Create an account</button>
                        </span>
                    </header>    */}
                <main>
                    <section>
                        <div className="title">
                            Breakfast Places in Mumbai
                        </div>

                        {/* Filters */}

                        <div className="Filters">
                            <h5>Filters</h5>
                            <label for="location" className="location" >Select Location
                                <select id="location" className="location" onChange={this.handleLocationChange}>
                                <option value="0" disabled selected>Select Location</option>
                                {
                                    locations.map((item, index) => {
                                        return (
                                            <option key={index} value={item.city_id}>{`${item.name}`}</option>
                                        )
                                    })
                                }
                                </select>
                            </label>
                            <div className="checkbox">
                                <br/><h6>Cuisine</h6>
                                <label for="northindian">
                                    <input type="checkbox" id="northindian" onChange={() => this.handleCuisineChange(1)}/> North Indian
                                </label><br/>
                                <label for="southindian">
                                    <input type="checkbox" id="southindian" onChange={() => this.handleCuisineChange(2)} /> South Indian
                                </label><br/>
                                <label for="chinese">
                                    <input type="checkbox" id="chinese" onChange={() => this.handleCuisineChange(3)} /> Chinese
                                </label><br/>
                                <label for="fastfood">
                                    <input type="checkbox" id="fastfood" onChange={() => this.handleCuisineChange(4)} /> Fast Food
                                </label><br/>
                                <label for="streetfood">
                                    <input type="checkbox" id="streetfood" onChange={() => this.handleCuisineChange(5)} /> Street Food
                                </label>
                            </div><br/>
                            <div className="radio-button">
                                <h6>Cost for two</h6>
                                <input type="radio" id="500" name="price" onChange={() => this.handleCostChange(1, 500)} /> <label for="500" >Less than ₹ 500</label> <br />
                                <input type="radio" id="1000" name="price" onChange={() => this.handleCostChange(500, 1000)} /> <label for="1000" >₹ 500 to ₹ 1000</label> <br />
                                <input type="radio" id="1500" name="price" onChange={() => this.handleCostChange(1000, 1500)} /> <label for="1500" >₹ 1000 to ₹ 1500</label> <br />
                                <input type="radio" id="2000" name="price" onChange={() => this.handleCostChange(1500, 2000)} /> <label for="2000" >₹ 1500 to ₹ 2000</label> <br />
                                <input type="radio" id="2000+" name="price" onChange={() => this.handleCostChange(2000, 5000)} /> <label for="2000+" >₹ 2000+</label> <br />
                            </div><br/>
                            <div className="sort">
                                <h6>Sort</h6>
                                <input type="radio" id="ltoh" name="Sort" onChange={() => this.handleSortChange(1)} /> <label for="ltoh" >Price low to high</label> <br />
                                <input type="radio" id="htol" name="Sort" onChange={() => this.handleSortChange(-1)} /> <label for="htol" >Price high to low</label>
                            </div>
                        </div>

                        {/* Results */}

                        {restaurant.length != 0 ?
                            restaurant.map((each, index) => {
                                return(
                                    <div className={`results${index}`} key={index} onClick={() =>  this.handleNavigate(each._id)} >
                                        <div className="d-flex">
                                            <div className="lt-box">
                                                <img className="img-fluid img-res" src={each.thumb} alt="result image" />
                                            </div>
                                            <div className="rt-box">
                                                <h4 className="result-heading">{each.name}</h4>
                                                <p className="result-subheading">{each.city_name}</p>
                                                <p className="result-text">{each.address}</p>
                                            </div>
                                        </div>

                                        <hr />

                                        <div className="d-flex">
                                            <div className="ll-box">
                                                <p className="result-text">CUISINES:</p>
                                                <p className="result-text">COST FOR TWO:</p>
                                            </div>
                                            <div className="rl-box">
                                                <p className="result-text-blue">{each.Cuisine.map((r) => `${r.name} `)}</p>
                                                <p className="result-text-blue">₹{each.cost}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div className="message">Sorry, No Results Found...</div>
                        }

                        
                        
                        {/* Pagination */}

                        <div className="pagination">
                            <a className="box-p" href="#" >&lt;</a>
                            <a className="box-p" href="#" onClick={() => this.handlePageChange(1)} >1</a>
                            <a className="box-p" href="#" onClick={() => this.handlePageChange(2)} >2</a>
                            <a className="box-p" href="#" onClick={() => this.handlePageChange(3)} >3</a>
                            <a className="box-p" href="#" onClick={() => this.handlePageChange(4)} >4</a>
                            <a className="box-p" href="#" onClick={() => this.handlePageChange(5)} >5</a>
                            <a className="box-p" href="#">&gt;</a>
                        </div>
                </section>
                </main>
            </div>
        )
    }
}

export default navHook(Filter);