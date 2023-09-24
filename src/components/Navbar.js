import React from 'react';
import styles from '../styles/navbar.module.css';
import { connect } from 'react-redux';
import { setShowCart, setAddANewProduct, setViewPage } from '../actions';

class Navbar extends React.Component {

    handleAddANewProduct = (val) => {
        this.props.dispatch(setAddANewProduct(val));
    }

    handleViewCartClick = (val) => {
        this.props.dispatch(setShowCart(val));
        if (this.props.toAddNewProduct) {
            this.props.dispatch(setAddANewProduct(val));
        } else if (this.props.setViewPage) {
            this.props.dispatch(setViewPage(val, ''));
        }
    }

    render() {
        const { setShowCart, cartItems, toAddNewProduct, products, setViewPage } = this.props;
        const count = cartItems.length;
        return (

            <div className={styles.navbarContainer}>
                <h1 style={{ marginLeft: '25px', cursor: 'pointer' }} className={styles.title} onClick={() => this.handleViewCartClick(false)}>
                   EcomApp
                </h1>
                {(setShowCart) || (toAddNewProduct) || (setViewPage)
                    ?
                    <h2 className={styles.home} onClick={() => this.handleViewCartClick(false)}>Go Home</h2>
                    :
                    <></>
                }
                <button
                    className={styles.addProduct}
                    onClick={() => this.handleAddANewProduct(true)}
                    disabled={products.length === 0}
                >
                    Add a Product
                </button>

                {setViewPage
                    ?
                    <></>
                    :
                    <h2
                        className={styles.viewCart}
                        onClick={() => this.handleViewCartClick(true)}>
                        View Cart
                    </h2>
                }

                <h2 style={{ marginRight: '50px' }}>
                    CartItems: {count > 0 ? count : 0}
                </h2>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        cartItems: state.cartItems,
        setShowCart: state.setShowCart,
        toAddNewProduct: state.toAddNewProduct,
        setViewPage: state.setViewPage,
    }
}

const connectedAppComponent = connect(mapStateToProps)(Navbar);
export default connectedAppComponent;