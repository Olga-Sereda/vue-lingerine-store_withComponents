import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {API_BASE_URL} from "../config";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartProducts: [],

        userAccessKey: null,

        cartProductsData: [],
        
        orderInfo: null,

        addToCartLoading: false
    },
    mutations: {
        updateOrderInfo(state, orderInfo) {
            state.orderInfo = orderInfo
        },
        resetCart(state) {
            state.cartProducts = [];
            state.cartProductsData = [];
        },
        updateUserAccessKey(state, userKey) {
            state.userAccessKey = userKey
        },
        updateCartProductsData(state, items) {
            state.cartProductsData = items
        },
        updateCartProductsAmount(state, {basketItemId, quantity}) {
            const item = state.cartProducts.find(item => item.basketItemId === basketItemId)

            if (item) {
                item.amount = quantity;
            }
        },
        syncCartProducts(state) {
            state.cartProducts = state.cartProductsData.map(item => {
                return {
                    productId: item.product.id,
                    basketItemId: item.id,
                    amount: item.quantity,
                    colorId: item.color.id,
                    sizeId: item.size.id
                }
            })
        }
    },
    getters: {
        CartDatailProducts(state) {
            return state.cartProducts.map(item => {
                return state.cartProductsData.find(p => p.id === item.basketItemId);
            });
        },
        CartTotalPrice(state, getters) {
            return getters.CartDatailProducts.reduce((sum, item) => (item.product.price * item.quantity) + sum, 0)
        },
        orderPageCount(state) {
            let count = state.orderInfo.basket.items.length

            switch(count) {
                case 1:
                case 21:
                case 31:
                    return `${state.orderInfo.basket.items.length} товар`
                case 2:
                case 22:
                case 32:
                case 3:
                case 23:
                case 33:
                case 4:
                case 24:
                case 34:
                    return `${state.orderInfo.basket.items.length} товара`
                default:
                    return `${state.orderInfo.basket.items.length} товаров`
            }
        }
    },
    actions: {
        loadOrderInfo(context, orderId) {
            axios.get(API_BASE_URL + '/api/orders/' + orderId, {
                params: {
                    userAccessKey: context.state.userAccessKey
                }
            })
            .then(response => {
                context.commit('updateOrderInfo', response.data)
            })
        },
        loadCart(context) {
           return axios.get(API_BASE_URL + '/api/baskets', {
                params: {
                    userAccessKey: context.state.userAccessKey
                }
                })
                .then(response => {
                    if (!context.state.userAccessKey) {
                      localStorage.setItem('userAccessKey', response.data.user.accessKey);
                      context.commit('updateUserAccessKey', response.data.user.accessKey);  
                    }
                    context.commit('updateCartProductsData', response.data.items);
                    context.commit('syncCartProducts');
                })
        },
        addProductToCart(context, {productId, colorId, sizeId, amount}) {
            context.state.addToCartLoading = true;

            return (new Promise(resolve => setTimeout(resolve, 2000)))
            .then(() => {
                return axios.post(API_BASE_URL + '/api/baskets/products', {
                    productId: productId, 
                    colorId: colorId,
                    sizeId: sizeId,
                    quantity: amount
                },{
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    context.commit('updateCartProductsData', response.data.items);
                    context.commit('syncCartProducts');
                    context.state.addToCartLoading = false
                })
            })
           
        },
        updateCartProductAmount(context, {basketItemId, quantity}) {
            context.commit('updateCartProductsAmount', {basketItemId, quantity});

            if (quantity < 1) {
                return;
            }

           return axios.put(API_BASE_URL + '/api/baskets/products', {
                basketItemId: basketItemId,
                quantity: quantity
            }, {
                params: {
                    userAccessKey: context.state.userAccessKey
                }
            })
                .then(response => {
                    context.commit('updateCartProductsData', response.data.items);
                })
                .catch(() => {
                    context.commit('syncCartProducts')
                })
        },
        deleteCartProduct(context, {basketItemId}) {
            return axios.delete(API_BASE_URL + '/api/baskets/products', {
                data: {
                    basketItemId: basketItemId
                }, 
                params: {
                    userAccessKey: context.state.userAccessKey
                }
                })
                .then(response => {
                    context.commit('updateCartProductsData', response.data.items);
                    context.commit('syncCartProducts');
                })
        }
    }
})