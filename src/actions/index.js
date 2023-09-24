export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SET_SHOW_CART = 'SET_SHOW_CART';
export const SET_ADD_A_NEW_PRODUCT = 'SET_ADD_A_NEW_PRODUCT';
export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_VIEW_PAGE = 'SET_VIEW_PAGE';
export const SET_EDIT = 'SET_EDIT';
export const UPDATE_VALUE = 'UPDATE_VALUE';

export function addProducts(products) {
    return {
        type: ADD_PRODUCT,
        products,
    }
}

export function addToCart(id) {
    return {
        type: ADD_TO_CART,
        id,
    }
}

export function setShowCart(val) {
    return {
        type: SET_SHOW_CART,
        val,
    }
}

export function removeFromCart(id) {
    return {
        type: REMOVE_FROM_CART,
        id,
    }
}

export function setAddANewProduct(val) {
    return {
        type: SET_ADD_A_NEW_PRODUCT,
        val,
    }
}

export function addNewProduct(obj) {
    return {
        type: ADD_NEW_PRODUCT,
        obj,
    }
}

export function deleteProduct(id) {
    return {
        type: DELETE_PRODUCT,
        id,
    }
}

export function setViewPage(val, id) {
    return {
        type: SET_VIEW_PAGE,
        val,
        id
    }
}

export function setEdit(val, id) {
    return {
        type: SET_EDIT,
        val,
        id,
    }
}

export function updateValue(obj) {
    return {
        type: UPDATE_VALUE,
        obj,
    }
}