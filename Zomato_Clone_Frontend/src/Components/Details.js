import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Details.css";
import { useParams } from "react-router-dom";
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.9)"
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

const Details = () => {
    const [resDetail, setResDetail] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [galleryModal, setGalleryModal] = useState(false);
    const [menuModal, setMenuModal] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [resId, setResId] = useState(undefined);
    const { id } = useParams();

    useEffect(() => {
        
        axios({
            url: `http://localhost:5500/resDetails/${id}`,
            method: 'Get',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(res => {
            setResDetail(res.data.restaurant[0]);
            setResId(id);
        })
        .catch((err) => console.log(err));
    }, []);


    const handleModal = (modal, value) => {
        if (modal === 'menuModal' && value === true) {
          axios({
            url: `http://localhost:5500/menu/${id}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON' }
          })
            .then((res) => {
              setMenuItems(res.data.menuitems);
            })
            .catch((err) => console.log(err));
        }
      
        switch (modal) {
            case 'menuModal':
              setMenuModal(value);
              break;
            case 'galleryModal':
              setGalleryModal(value);
              break;
            case 'formModal':
               setFormModal(value);
               break; 
          }
      };
      
    const handleShowTab = (tabNumber) => {
        setActiveTab(tabNumber);
      };

    const addItems = (index, operationType) => {
        let total = 0;
        const items = [...menuItems];
        const item = items[index];

        if (operationType == 'add'){
            item.qty += 1;
        }else{
            item.qty -= 1;
        }
        items[index] = item;

        items.map((x) => {
            total += x.qty * x.price;
        })
        setMenuItems(items);
        setSubtotal(total);
    }

    const initPayment = async (data) => {
        const options = {
          key: "rzp_test_oRFJWzCNz2ZzM3",
          amount: data.amount,
          currency: data.currency,
          description: "Test Transaction",
          order_id: data.id,
          handler: async (response) => {
            try {
              const verifyUrl = "http://localhost:5500/api/payment/verify";
              const { data } = await axios.post(verifyUrl, response);
              console.log(data);
            } catch (error) {
              console.log(error);
            }
          }
        };
      
        const rzp = new window.Razorpay(options); 
        rzp.open();
      };

    const handlePayment = async () => {
        console.log("button clicked");
        try {
            const orderUrl = "http://localhost:5500/api/payment/orders";
            const { data } = await axios.post(orderUrl, { amount: subtotal });

            console.log(data);
            initPayment(data.data);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div>
            {/* NavBar */}
{/*
            <header>
                <span id="logo">e!</span>
                <span className="login-signup">
                    <button type="button" className="login">Login</button>
                    <button type="button" className="signup">Create an account</button>
                </span>
            </header>
    */}

            {/* BodyPart */}

            <div className="Container">
                <div>
                    <img src={resDetail.thumb} className="resBanner" />
                    <input type="button" value="Click to see Image Gallery" className="galButton" onClick={() => handleModal('galleryModal', true)} />
                </div>
                <div className="resName">{resDetail.name}</div>
                <input type="button" value="Place Online Order" className="orderButton" onClick={() => handleModal('menuModal', true)} />


                <div className="tab-container">
                <div className={`tab ${activeTab === 1 ? "active" : ""}`} onClick={() => handleShowTab(1)}>Overview</div>
                <div className={`tab ${activeTab === 2 ? "active" : ""}`} onClick={() => handleShowTab(2)}>Contact</div>
                </div>
                <hr></hr>
                <div className={`tab-content ${activeTab === 1 ? "show" : ""}`} id="tab1">
                    <div className="heading1">About this place</div>
                    <div className="heading2 mt-3">Cuisine</div>
                        <div className="value mt-1">{resDetail && resDetail.Cuisine && resDetail.Cuisine.map(cuisine => `${cuisine.name}, `)}</div>
                    <div className="heading2 mt-3">Average Cost</div>
                        <div className="value mt-1">₹{resDetail.cost} for two people (approx)</div>
                </div>
                <div className={`tab-content ${activeTab === 2 ? "show" : ""}`} id="tab2">
                    <div className="heading2 mt-3">Phone Number</div>
                        <div className="value mt-1">{resDetail.contact_number}</div>
                    <div className="heading2 mt-3">{resDetail.name}</div>
                        <div className="value mt-1">{resDetail.address}</div>
                </div>
                    
            </div>

            <Modal
                isOpen={galleryModal}
                style={customStyles}
            >
                <div style={{float: "right", marginBottom: "5px"}} onClick={() => handleModal('galleryModal', false)}><i className="bi bi-x-circle-fill"></i></div>
                    
                <Carousel showThumbs={false} showStatus={false}>
                    <div>
                        <img src={resDetail.thumb} className="bannerImg" />
                    </div>
                </Carousel>
                        
            </Modal>

            <Modal
                    isOpen={menuModal}
                    style={customStyles}
                >
                    <div>
                        <div style={{float: "right", marginBottom: "5px"}} onClick={() => handleModal('menuModal', false)}><i className="bi bi-x-circle-fill"></i></div>
                        <div className="" >
                            <br /><br />
                            <h3 className="restaurant-name">{resDetail.name}</h3>
                            <h3 className="item-total mb-4">SubTotal : {subtotal} </h3>
                            <button className="btn btn-danger order-button"onClick={() => {
                                handleModal('menuModal', false);
                                handleModal('formModal', true);
                            }}> Pay Now</button>
                            {menuItems?.map((item, index) => {
                                return <div style={{ width: '44rem', marginTop: '28px', marginBottom: '10px', marginTop: '40px', borderBottom: '2px solid #dbd8d8', clear: 'both' }}>
                                    <div className="" style={{ width: '44rem', margin: '20px' }}>
                                        <div className="row" style={{  paddingBottom: '10px', position: 'relative' }}>
                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{  paddingBottom: '10px' }}>
                                                <span className="card-body">
                                                    <h5 className="item-name">{item.name}</h5>
                                                    <h5 className="item-price">&#8377;{item.price}</h5>
                                                    <p className="item-descp">{item.description}</p>
                                                </span>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <img className="card-img-center title-img" src={`../../img/${item.image}`} style={{
                                                    height: '90px',
                                                    width: '90px',
                                                    borderRadius: '5px',
                                                    marginTop: '2px',
                                                    marginLeft: '58px'
                                                }} />
                                                {item.qty == 0 ? <div>
                                                    <button className="add-button" onClick={() => addItems(index, 'add')}>Add</button>
                                                </div> :
                                                    <div className="add-number">
                                                        <button onClick={() => addItems(index, 'sub')} >-</button>
                                                        <span class="qty">{item.qty}</span>
                                                        <button onClick={() => addItems(index, 'add')} >+</button>
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                            
                        </div>
                    </div>
                        
                </Modal>

                <Modal
                    isOpen={formModal}
                    style={customStyles}
                >
                    <div style={{float: "right", marginBottom: "5px"}} onClick={() => handleModal('formModal', false)}><i className="bi bi-x-circle-fill"></i></div>
                    <div>
                        
                        <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#192F60'}}>{resDetail.name}</h2>
                        <div className="mb-2">
                            <label>Name : </label>
                            <input className="form-control" style={{ width: '350px' }}
                                type="text" placeholder="Enter your Name" />
                        </div>
                        <div className="mb-2">
                            <label>Email : </label>
                            <input className="form-control" style={{ width: '350px' }}
                                type="text" placeholder="Enter your Email" />
                        </div>
                        <div className="mb-2">
                            <label>Contact Number : </label>
                            <input className="form-control" style={{ width: '350px' }}
                                type="tel" placeholder="Enter your Contact Details" />
                        </div>
                        <div>
                            <label>Address: </label>
                            <textarea className="form-control" rows="4" cols="50" placeholder="Enter your address"></textarea>

                        </div>
                        <button className="btn btn-success"
                            style={{ float: 'right', marginTop: '20px' }} onClick={handlePayment} >Proceed</button>
                    </div>
                    
                        
                </Modal>
                
        </div>
    );
}

export default Details;