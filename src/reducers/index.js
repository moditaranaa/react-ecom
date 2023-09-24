import {
    ADD_PRODUCT,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SET_SHOW_CART,
    SET_ADD_A_NEW_PRODUCT,
    ADD_NEW_PRODUCT,
    DELETE_PRODUCT,
    SET_VIEW_PAGE,
    SET_EDIT,
    UPDATE_VALUE
}
    from "../actions";

const inititalState = {
    products: [],
    cartItems: [],
    setShowCart: false,
    toAddNewProduct: false,
    setViewPage: false,
    viewId: null,
    setEdit: {
        val: false,
        id: null
    }
}

export function product(state = inititalState, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: action.products,
            }
        case ADD_TO_CART:
            const itemExists = state.cartItems.some((item) => item.id === action.id);
            if (itemExists) {
                return state;
            }
            const productToAdd = state.products.find((item) => item.id === action.id);
            return {
                ...state,
                cartItems: [...state.cartItems, productToAdd],
            };
        case SET_SHOW_CART:
            return {
                ...state,
                setShowCart: action.val,
            }
        case REMOVE_FROM_CART:
            const updatedCartItems = state.cartItems.filter((item) => item.id !== action.id);
            return {
                ...state,
                cartItems: updatedCartItems,
            };
        case SET_ADD_A_NEW_PRODUCT:
            return {
                ...state,
                toAddNewProduct: action.val,
            }
        case ADD_NEW_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.obj],
            }
        case DELETE_PRODUCT:
            const productArr = state.products.filter((item) => item.id !== action.id);
            const cartArr = state.cartItems.filter((item) => item.id !== action.id);
            return {
                ...state,
                products: productArr,
                cartItems: cartArr,
            };
        case SET_VIEW_PAGE:
            return {
                ...state,
                setViewPage: action.val,
                viewId: action.id,
            }
        case SET_EDIT:
            return {
                ...state,
                setEdit: {
                    val: action.val,
                    id: action.id,
                },
            }
        case UPDATE_VALUE:
            const findIndex = state.products.findIndex((item) => item.id === action.obj.id);
            if (findIndex !== -1) {
                const updatedProd = {
                    ...state.products[findIndex],
                    name: action.obj.name,
                    price: action.obj.price,
                }
                const updatedArray = [
                    ...state.products.slice(0, findIndex),
                    updatedProd,
                    ...state.products.slice(findIndex + 1)
                ]
                return {
                    ...state,
                    products: updatedArray,
                }
            }
            return state;

        default:
            return state;
    }
}