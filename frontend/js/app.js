const { createApp } = Vue;

// Importación de vistas
import HomeView from './views/HomeView.js';
import LoginView from './views/LoginView.js';
import RegisterView from './views/RegisterView.js';
import CheckoutView from './views/CheckoutView.js';
import ClientView from './views/ClientView.js';
import PosView from './views/PosView.js';
import AdminCashiersView from './views/AdminCashiersView.js';
import MenuView from './views/MenuView.js';
import MyOrdersView from './views/MyOrdersView.js';
import ShowcaseView from './views/ShowcaseView.js';
import MapView from './views/MapView.js';
import AdminView from './views/AdminView.js';

createApp({
    components: {
        'home-view': HomeView,
        'login-view': LoginView,
        'register-view': RegisterView,
        'checkout-view': CheckoutView,
        'client-view': ClientView,
        'pos-view': PosView,
        'admin-employees-view': AdminCashiersView,
        'menu-view': MenuView,
        'myorders-view': MyOrdersView,
        'showcase-view': ShowcaseView,
        'map-view': MapView,
        'admin-schedules-view': AdminView
    },

    data() {
        return {
            currentView: 'home-view',
            user: null,

            // PARA MENÚ DE PERFIL
            showUserMenu: false,

            // PARA CHECKOUT
            carritoCheckout: [],
            carritoGlobal: []
        }
    },

    methods: {

        // Navegación general
        handleNavigation(viewName) {
            this.currentView = viewName;
            this.showUserMenu = false;
        },

        // Botón "Pide Aquí"
        goToLogin() {
            this.currentView = 'login-view';
        },

        // Mostrar u ocultar menú del perfil
        toggleUserMenu() {
            this.showUserMenu = !this.showUserMenu;
        },

        // Enviar carrito al checkout
        goToCheckout(carrito) {
            this.carritoCheckout = carrito;
            this.carritoGlobal = carrito; // sincroniza globalmente
            this.currentView = 'checkout-view';
        },

        // Login correcto
        handleLoginSuccess(userData) {
            this.user = userData;

            // Redirección automática según rol
            if (this.user.role === 'Administrador') {
                this.currentView = 'home-view';
            } else if (this.user.role === 'Cajero') {
                this.currentView = 'pos-view';
            } else {
                this.currentView = 'showcase-view';
            }
        },

        // Cerrar sesión
        logout() {
            this.user = null;
            this.showUserMenu = false;
            localStorage.removeItem('token');
            this.currentView = 'home-view';
        }
    }
}).mount('#app');
