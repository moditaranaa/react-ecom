import React from "react";
import { connect } from 'react-redux';
import styles from '../styles/detail.module.css';
import { toast } from 'react-toastify';
import { addToCart, setViewPage } from '../actions';

class DetailPage extends React.Component {
    handleAddToCart = (id) => {
        const itemExists = this.props.cartItems.some((item) => item.id === id);

        if (itemExists) {
            toast.warn("Item is already in the cart", {
                position: 'top-center',
            });
        } else {
            toast.success("Added to Cart", {
                position: 'top-center',
            });
            this.props.dispatch(addToCart(id));
        }
    };

    handleBack = (val, id) => {
        this.props.dispatch(setViewPage(val, ''));
    }
    render() {
        const { products, viewId } = this.props;
        const data = products.find((item) => item.id === viewId);
        return (

            <div className={styles.prodContainer}>
                <div className={styles.title}>
                    <h1>Product Details</h1>
                </div>
                <div className={styles.productItem} key={data.id}>

                    {/* Product Img */}
                    <img src={data.img} alt={data.name} />

                    {/* Product Name and price */}
                    <ul className={styles.productItemDetail}>
                        <li>
                            <h1 style={{ position: 'absolute', left: '0px', top: '0px' }} >{data.name}</h1>
                        </li>
                        <li>
                            <h3 style={{ position: 'absolute', left: '20px', top: '40px' }}>
                                Price: {data.price}</h3>
                        </li>
                        <li>
                            <h3 style={{ position: 'absolute', left: '20px', top: '70px' }}>Rating: {data.rating}
                            </h3>
                        </li>
                    </ul>

                    {/* Product Description */}
                    <span>
                        <ul className={styles.productItemDescription}>
                            <li><h3 style={{ position: 'absolute', top: '40px' }}>Description:</h3></li>
                            <li><p style={{ position: 'absolute', top: '90px' }}>{data.description}</p></li>
                        </ul>
                    </span>

                    <span>
                        <button className={styles.addToCart} onClick={() => { this.handleAddToCart(data.id) }}>
                            ADD TO CART
                        </button>
                    </span>

                    <div>
                        <button className={styles.back} onClick={() => { this.handleBack(false) }}>
                            BACK HOME
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        viewId: state.viewId,
        cartItems: state.cartItems,
    }
}

const connectedAppComponent = connect(mapStateToProps)(DetailPage);

export default connectedAppComponent;