export default {
    template: `
        <div class="my-orders-container">
            <h2 class="orders-title">{{ isAdmin ? 'Historial Global de Pedidos' : 'Mis Pedidos' }}</h2>

            <div v-if="loading" class="loading">Cargando historial...</div>

            <div v-else-if="orders.length === 0" class="empty-orders-container">
                <p>No hay pedidos registrados.</p>
                <button v-if="!isAdmin" class="btn-pide-aqui" @click="$emit('navigate', 'showcase-view')">¡Haz tu primer pedido!</button>
            </div>

            <div v-else class="orders-list">
                <div v-for="order in orders" :key="order.idPedido" class="order-card">
                    <div class="order-header">
                        <span class="order-id">Pedido #{{ order.idPedido }}</span>
                        <span class="order-date">{{ formatDate(order.fechaPedido) }}</span>
                    </div>
                    
                    <div class="order-body">
                        <p v-if="isAdmin" style="color: var(--brand-red); font-weight: bold;">
                            👤 Cliente: {{ order.nombreCliente }}
                        </p>
                        <p><strong>Estado:</strong> <span :class="'status-' + normalizeStatus(order.estadoPedido)">{{ order.estadoPedido }}</span></p>
                        <p><strong>Total:</strong> Bs {{ order.totalPedido }}</p>
                        
                        <!-- Solo mostramos detalle si NO es admin, o si decidimos implementarlo para admin también -->
                        <!-- Para admin, el endpoint getAllHistory no devuelve items por defecto en el modelo actual. 
                             Si quisieras ver items, habría que ajustar el backend. Por ahora mostramos resumen. -->
                        <div v-if="!isAdmin" class="order-items">
                            <p class="items-title">Detalle:</p>
                            <ul class="items-list">
                                <li v-for="item in parseItems(order.items)" :key="item.nombre" class="item-row">
                                    <span>{{ item.cantidad }}x {{ item.nombre }}</span>
                                    <span>Bs {{ item.precio * item.cantidad }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ['user'],
    data() {
        return {
            orders: [],
            loading: true
        }
    },
    computed: {
        isAdmin() {
            return this.user && this.user.role === 'Administrador';
        }
    },
    async mounted() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                this.$emit('navigate', 'login-view');
                return;
            }

            let url = 'http://localhost:3000/api/orders/my-history';
            if (this.isAdmin) {
                url = 'http://localhost:3000/api/admin/orders-history';
            }

            const res = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Error al obtener historial');

            const data = await res.json();
            this.orders = data;
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
        }
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        },
        normalizeStatus(status) {
            if (!status) return 'unknown';
            return status.toLowerCase().replace(/\s+/g, '-');
        },
        parseItems(itemsJson) {
            try {
                return typeof itemsJson === 'string' ? JSON.parse(itemsJson) : (itemsJson || []);
            } catch (e) {
                return [];
            }
        }
    }
}
