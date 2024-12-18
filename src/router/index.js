import Vue from "vue";
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';

Vue.use(VueRouter);

const routes = [
    {name: 'main', component: MainPage, path: '/'},
    {name: 'product', component: ProductPage, path: '/product/:id'},
    {name: 'cart', component: CartPage, path: '/cart'},
    {name: 'Order', component: OrderPage, path: '/order'},
    {name: 'OrderInfo', component: OrderInfoPage, path: '/order/:orderId'},
    {name: 'notFound', component: NotFoundPage, path: '*'}
]

const router = new VueRouter({
  routes,
});

export default router;