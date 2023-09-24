import React from "react";
import styles from '../styles/product.module.css'
import { addProducts } from '../actions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import SingleProduct from "../components/SingleProduct";

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: false,
        };
    }

    handleGetProducts = async () => {
        try {
            const response = await fetch('https://my-json-server.typicode.com/moditaranaa/ReactEcomApp/products', {
                method: 'GET',
            });
            const data = await response.json();

            this.props.dispatch(addProducts(data));

        } catch (err) {
            console.log(err);
            return;
        }
    }

    handleSort = () => {
        if (this.state.sort === false) {
            toast.success("Sorted By Price...", {
                position: 'top-center',
            });
        } else {
            toast.success("Removed Sort", {
                position: 'top-center',
            });
        }
        this.setState((prevState) => ({
            sort: !prevState.sort, // Toggle the sort state between true and false
        }));
    }


    render() {
        const { cartItems, products, setShowCart } = this.props;
        const displayView = setShowCart ? cartItems : products;
        const sortedDisplayView =
            this.state.sort
                ? [...displayView].sort((item1, item2) => item1.price - item2.price)
                : displayView;
        return (
            <div className={styles.productContainer}>
                <div>
                    <h1 style={{ textAlign: 'center', paddingTop: '15px' }}>
                        {setShowCart ? "Cart Items" : "Home"}
                    </h1>
                    <span className={styles.mainBtn}>
                        {setShowCart
                            ?
                            <></>
                            :
                            <button
                                onClick={() => { this.handleGetProducts() }}
                                className={styles.sort}>
                                Get Products
                            </button>
                        }
                        {setShowCart
                            ?
                            <></>
                            :
                            <button
                                onClick={() => { this.handleSort(true) }}
                                className={styles.sort}
                                disabled={products.length === 0}
                            >
                                {this.state.sort
                                    ?
                                    "Sort By Price ❌"
                                    :
                                    "Sort By Price"
                                }
                            </button>
                        }
                    </span>
                </div>
                {(cartItems.length === 0) && (setShowCart === true)
                    ? <h2 style={{ textAlign: 'center', fontWeight: '500' }}>No Items added to Cart</h2>
                    : <></>
                }
                {sortedDisplayView.map((data, index) => {
                    return <SingleProduct data={data} index={index} key={data.id} />
                })}
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
    }
}

const connectedAppComponent = connect(mapStateToProps)(HomePage);

export default connectedAppComponent;
