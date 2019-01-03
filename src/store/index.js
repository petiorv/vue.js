import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        cart: [],
        parts: null,
    },
    mutations: {
        addRobotToCart(state, robot){
            state.cart.push(robot); 
        },
        updateParts(state, parts){
            state.parts = parts;
        }
    },
    actions:{
        getParts({ commit }){
             Axios.get('/api/parts')
                .then(resutl => commit('updateParts', resutl.data))
                .catch();
        },
        addRobotToCart({commit, state}, robot){
            const cart = [...state.cart, robot];
            return Axios.post('/api/cart', cart)
                .then(()=> commit('addRobotToCart', robot));
        }
    },
    getters:{
        cartSaleItems(state){
            return state.cart.filter(i => i.head.onSale);
        }
    }
});