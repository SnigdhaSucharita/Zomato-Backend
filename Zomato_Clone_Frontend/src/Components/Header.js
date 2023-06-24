import React from 'react';
import "../Styles/Filter.css";
import Modal from 'react-modal';

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

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            loginModal: false
        }
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value});
    }

    google = () => {
        window.open("http://localhost:5500/auth/google", "_self");
    }

    handleLogout = () => {
        window.open("http://localhost:5500/auth/logout", "_self");
    }

    render(){

        const { loginModal } = this.state;
        const { user } = this.props;

        return(
            <div>
               <header>
                    <span id="logo">e!</span>
                    {
                        !user ? (
                            <span className="login-signup">
                                <button type="button" className="login" onClick={() => this.handleModal('loginModal', true)}>Login</button>
                                <button type="button" className="signup">Create an account</button>
                            </span>
                        ) : (
                            <span className="login-signup mb-4">
                                <img className="avatar" src={user.photos[0].value} alt="Avatar" />
                                <a className="text-white">{user.displayName}</a>
                                <button type="button" className="login ms-4" onClick={this.handleLogout}>Logout</button>
                                
                            </span>
                        )

                    }
                    
                </header>

                <Modal
                isOpen={loginModal}
                style={customStyles}
                >
                <div style={{float: "right", margin: "-22px -17px"}} onClick={() => this.handleModal('loginModal', false)}><i className="bi bi-x-circle-fill"></i></div>
                    <div className="bg-primary bg-gradient text-white p-3" onClick={this.google}>
                        <i className="bi bi-google p-2"></i> GOOGLE
                    </div>   
                </Modal>

            </div>
        )
    }
}

export default Header;