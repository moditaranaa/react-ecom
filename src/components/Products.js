import React from 'react';
import NewProduct from '../pages/NewProductPage';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import { connect } from 'react-redux';

class Products extends React.Component {
    render() {
        const { toAddNewProduct, setViewPage } = this.props;
        if (toAddNewProduct) {
            return <NewProduct />
        } else if (!toAddNewProduct && setViewPage) {
            return <DetailPage />
        } else {
            return <HomePage />
        }
    }
}

function mapStateToProps(state) {
    return {
        toAddNewProduct: state.toAddNewProduct,
        setViewPage: state.setViewPage,
    }
}

const connectedAppComponent = connect(mapStateToProps)(Products);

export default connectedAppComponent;


