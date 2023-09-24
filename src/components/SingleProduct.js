import React from "react";
import { connect } from 'react-redux';
import styles from '../styles/product.module.css';
import { toast } from 'react-toastify';
import {
    addToCart,
    removeFromCart,
    deleteProduct,
    setViewPage,
    setEdit,
    updateValue
}
    from '../actions';

class SingleProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
        };
    }

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

    handleRemoveToCart = (id) => {
        toast.success("Removed from Cart");
        this.props.dispatch(removeFromCart(id));
    }

    handleDelete = (id) => {
        toast.success("Product Deleted");
        this.props.dispatch(deleteProduct(id));
    }

    handleView = (val, id) => {
        toast.success("Product Details", {
            position: 'top-left',
        });
        this.props.dispatch(setViewPage(val, id));
    }

    handleEdit = (val, id) => {
        this.props.dispatch(setEdit(val, id));
    }

    handleCancel = (val, id) => {
        this.props.dispatch(setEdit(val, null));
    }

    handleEditFormSubmit = (id) => {
        const { name, price } = this.state;
        const updatedProduct = {
            id: id,
            name: name,
            price: price,
        };

        this.props.dispatch(updateValue(updatedProduct));
        this.props.dispatch(setEdit(false, null));
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {

        const { data, index } = this.props;
        const { setShowCart, setEdit } = this.props;

        return (
            <div className={styles.productItem} key={data.id}>
                {/* Seriel Number */}
                {setShowCart
                    ?
                    <></>
                    :
                    <span className={styles.productSeriel}>
                        {`${index + 1}.`}
                    </span>
                }

                {/* Product Img */}
                <img src={data.img} alt={data.name} />

                {/* Product Name and price */}
                <div className={styles.productItemDetail}>
                    {setEdit.id === data.id && setEdit.val ? (
                        <>
                            <form
                                className={styles.editForm}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    this.handleEditFormSubmit(data.id);
                                }}
                            >
                                <input
                                    placeholder={data.name}
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                                <input
                                    placeholder={data.price}
                                    name="price"
                                    style={{ top: '40px' }}
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                />
                                <button type="submit">Save</button>
                                <button style={{ left: '65px' }} onClick={() => { this.handleCancel(false, data.id) }}>Cancel</button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h1 style={{ position: 'absolute', left: '0px', top: '0px' }}>
                                {data.name}
                            </h1>
                            <h3 style={{ position: 'absolute', left: '20px', top: '40px' }}>
                                Price: {data.price}
                            </h3>
                        </>
                    )}
                </div>

                {/* Buttons */}
                {setShowCart ? (
                    <>
                        <span>
                            <button className={styles.addToCart} onClick={() => { this.handleRemoveToCart(data.id) }}>
                                REMOVE
                            </button>
                        </span>
                    </>
                ) : (
                    <>
                        <span>
                            <button className={styles.addToCart} onClick={() => { this.handleAddToCart(data.id) }}>
                                ADD TO CART
                            </button>
                        </span>

                        <span className={styles.onh} onClick={() => { this.handleEdit(true, data.id) }}>
                            <i class="fa-solid fa-pencil" style={{ position: 'absolute', right: '130px', fontSize: '1.8rem', top: '60px' }}></i>
                        </span>

                        <span className={styles.onh} onClick={() => { this.handleView(true, data.id) }}>
                            <i class="fa-solid fa-eye" style={{ position: 'absolute', right: '75px', fontSize: '1.8rem', top: '60px' }}></i>
                        </span>
                        <span className={styles.onh}>
                            <i class="fa-solid fa-trash" style={{ position: 'absolute', right: '25px', fontSize: '1.8rem', top: '60px' }} onClick={() => { this.handleDelete(data.id) }}></i>
                        </span>
                    </>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        setShowCart: state.setShowCart,
        setEdit: state.setEdit,
        cartItems: state.cartItems,
    }
}

const connectedAppComponent = connect(mapStateToProps)(SingleProduct);

export default connectedAppComponent;
