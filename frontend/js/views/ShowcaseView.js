export default {
    template: `
        <div class="client-layout">
            
            <div class="menu-column" :style="user ? '' : 'width: 100%'">
                <div class="header-menu">
                    <h2>Nuestro Menú</h2>
                    <div class="filtros">
                        <button :class="{ activo: filtro === 'Todos' }" @click="filtro = 'Todos'">Todos</button>
                        <button :class="{ activo: filtro === 'Pizzas' }" @click="filtro = 'Pizzas'">🍕 Pizzas</button>
                        <button :class="{ activo: filtro === 'Bebida' }" @click="filtro = 'Bebida'">🥤 Bebidas</button>
                    </div>
                </div>

                <div v-if="loading" class="loading">Cargando sabor...</div>

                <div v-else class="grid-productos">
                    <div v-for="prod in productosFiltrados" :key="prod.id" class="card-producto">
                        <img 
                            v-if="prod.imagen" 
                            :src="'http://localhost:3000/uploads/' + prod.imagen" 
                            class="foto-producto"
                            @click="openModal(prod)"
                            style="cursor:pointer"
                        >
                        <div class="info-producto">
                            <h3 @click="openModal(prod)" style="cursor:pointer">{{ prod.nombre }}</h3>
                            <p class="desc">{{ prod.descripcion }}</p>
                            <div class="precio-btn">
                                <span>Bs {{ prod.precio }}</span>
                                <button v-if="user" class="btn-add" @click="agregar(prod)">AGREGAR</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal de producto -->
                <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
                    <div class="modal-card">
                        <button class="modal-close" @click="closeModal">✕</button>
                        <div class="modal-body">
                            <img v-if="selectedProduct && selectedProduct.imagen" :src="'http://localhost:3000/uploads/' + selectedProduct.imagen" class="modal-image">
                            <div class="modal-info">
                                <h2>{{ selectedProduct.nombre }}</h2>
                                <p class="modal-desc">{{ selectedProduct.descripcion }}</p>
                                <p><strong>Categoría:</strong> {{ selectedProduct.categoria }}</p>
                                <p><strong>Precio:</strong> Bs {{ selectedProduct.precio }}</p>
                                <div class="modal-actions" v-if="user">
                                    <button class="btn-add" @click="agregar(selectedProduct); closeModal()">Agregar al carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CART COLUMN (Only visible if user is logged in) -->
            <div class="cart-column" v-if="user">
                <div class="cart-header">
                    <h3>Tu Pedido</h3>
                    <span class="badge">{{ carrito.length }} items</span>
                </div>

                <div v-if="carrito.length === 0" class="cart-empty">
                    <p>Tu canasta está vacía 😢</p>
                </div>

                <div v-else class="cart-items">
                    <div v-for="item in carrito" :key="item.id" class="cart-item">
                        <div class="cart-item-info">
                            <h4>{{ item.nombre }}</h4>
                            <span>Bs {{ item.precio * item.cantidad }}</span>
                        </div>
                        <div class="cart-controls">
                            <button @click="cambiarCantidad(item, -1)">-</button>
                            <span>{{ item.cantidad }}</span>
                            <button @click="cambiarCantidad(item, 1)">+</button>
                        </div>
                    </div>
                </div>

                <div class="cart-footer">
                    <div class="total-row">
                        <span>Total:</span>
                        <span class="total-price">Bs {{ totalCarrito }}</span>
                    </div>
                    <button 
                        class="btn-checkout" 
                        :disabled="carrito.length === 0"
                        @click="checkout"
                    >
                        CONFIRMAR PEDIDO ✅
                    </button>
                </div>
            </div>

        </div>
    `,
    props: ['user'],
    data() {
        return {
            productos: [],
            loading: true,
            filtro: 'Todos',
            carrito: [],
            modalOpen: false,
            selectedProduct: null
        }
    },
    computed: {
        productosFiltrados() {
            if (this.filtro === 'Todos') return this.productos;
            return this.productos.filter(p => p.categoria === this.filtro);
        },
        totalCarrito() {
            return this.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        }
    },
    async mounted() {
        try {
            const res = await fetch('http://localhost:3000/api/products');
            const data = await res.json();
            this.productos = data;
            this.loading = false;
        } catch (error) {
            console.error('Error cargando menú:', error);
            this.loading = false;
        }
    },
    methods: {
        openModal(prod) {
            this.selectedProduct = prod;
            this.modalOpen = true;
        },
        closeModal() {
            this.modalOpen = false;
            this.selectedProduct = null;
        },
        agregar(prod) {
            const itemExistente = this.carrito.find(item => item.id === prod.id);
            if (itemExistente) {
                itemExistente.cantidad++;
            } else {
                this.carrito.push({ ...prod, cantidad: 1 });
            }
        },
        cambiarCantidad(item, valor) {
            item.cantidad += valor;
            if (item.cantidad <= 0) {
                this.carrito = this.carrito.filter(i => i.id !== item.id);
            }
        },
        async checkout() {
            if (this.carrito.length === 0) return;

            const confirmar = confirm(`¿Confirmar pedido por Bs ${this.totalCarrito}?`);
            if (!confirmar) return;

            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        total: this.totalCarrito,
                        carrito: this.carrito
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`✅ ${data.message}\nTu número de pedido es: #${data.idPedido}`);
                    this.carrito = [];
                } else {
                    alert("❌ Error: " + data.message);
                }

            } catch (error) {
                console.error(error);
                alert("Error de conexión");
            }
        }
    }
}
