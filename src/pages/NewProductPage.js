import React from "react";
import styles from '../styles/newProduct.module.css';
import { connect } from 'react-redux';
import { addNewProduct } from "../actions";
import { toast } from 'react-toastify';

class NewProduct extends React.Component {
    handleNewProductSubmit = (e) => {
        e.preventDefault();
        // Accessing the form elements by their 'name' attributes
        const name = e.target.elements.name.value;
        const description = e.target.elements.description.value;
        const price = e.target.elements.price.value;
        const rating = e.target.elements.rating.value;
        const img = e.target.elements.img.value;

        const number = (this.props.products.length) + 1;
        const newProduct = {
            id: number,
            name,
            description,
            price,
            rating,
            img,
        }
        return fetch("https://my-json-server.typicode.com/moditaranaa/react-ecom/products", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json'
            },
            body: JSON.stringify(newProduct),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                return response.json();
            })
            .then((data) => {
                console.log("New product added:", data);
                toast.success('Added Product Successfully');
                this.props.dispatch(addNewProduct(data));

            })
            .catch((error) => {
                console.error("Error adding new product:", error.message);
                console.log("Response from the server:", error.response);
            });


    }
    render() {
        return (
            <div className={styles.container}>
                <h1 style={{ paddingTop: '10px', paddingBottom: '10px' }}>Add a Product</h1>
                <form onSubmit={this.handleNewProductSubmit}>
                    <h3>Name</h3>
                    <input name="name" />
                    <h3>Description</h3>
                    <input name="description" />
                    <h3>Price</h3>
                    <input name="price" />
                    <h3>Rating</h3>
                    <input name="rating" />
                    <h3>Image URL</h3>
                    <input name="img" />
                    <br></br>
                    <br></br>
                    <button>Add</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
    }
}

const connectedAppComponent = connect(mapStateToProps)(NewProduct);

export default connectedAppComponent;