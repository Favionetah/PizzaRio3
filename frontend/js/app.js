const { createApp } = Vue;

// Importamos tus vistas
import HomeView from './views/HomeView.js';
import LoginView from './views/LoginView.js';
import RegisterView from './views/RegisterView.js';
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
            showUserMenu: false // <--- NUEVO: Controla si el menú está abierto o cerrado
        }
    },
    methods: {
        // Función para navegar manualmente
        handleNavigation(viewName) {
            this.currentView = viewName;
            this.showUserMenu = false; // Cierra el menú si navegas
        },

        // Función especial para el botón "Pide Aquí" del header
        goToLogin() {
            this.currentView = 'login-view';
        },

        // NUEVO: Función para abrir/cerrar el menú del perfil
        toggleUserMenu() {
            this.showUserMenu = !this.showUserMenu;
        },

        // Qué hacer cuando el Login es exitoso
        handleLoginSuccess(userData) {
            this.user = userData;

            // Lógica de Redirección
            if (this.user.role === 'Administrador') {
                this.currentView = 'home-view';
            } else if (this.user.role === 'Cajero') {
                this.currentView = 'pos-view';
            } else {
                this.currentView = 'showcase-view';
            }
        },

        logout() {
            this.user = null;
            this.showUserMenu = false; // <--- NUEVO: Asegura que el menú se cierre
            localStorage.removeItem('token');
            this.currentView = 'home-view';
        }
    }
}).mount('#app');