export default {
    template: `
        <div class="my-orders-container">
            <h2 class="orders-title">Mis Pedidos</h2>

            <div v-if="loading" class="loading">Cargando historial...</div>

            <div v-else-if="orders.length === 0" class="empty-orders-container">
                <p>No tienes pedidos registrados aún.</p>
                <button class="btn-pide-aqui" @click="$emit('navigate', 'showcase-view')">¡Haz tu primer pedido!</button>
            </div>

            <div v-else class="orders-list">
                <div v-for="order in orders" :key="order.idPedido" class="order-card">
                    <div class="order-header">
                        <span class="order-id">Pedido #{{ order.idPedido }}</span>
                        <span class="order-date">{{ formatDate(order.fechaPedido) }}</span>
                    </div>
                    
                    <div class="order-body">
                        <p><strong>Estado:</strong> <span :class="'status-' + normalizeStatus(order.estadoPedido)">{{ order.estadoPedido }}</span></p>
                        <p><strong>Total:</strong> Bs {{ order.totalPedido }}</p>
                        
                        <div class="order-items">
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
    data() {
        return {
            orders: [],
            loading: true
        }
    },
    async mounted() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                this.$emit('navigate', 'login-view');
                return;
            }

            const res = await fetch('http://localhost:3000/api/orders/my-history', {
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
                // Si viene como string JSON, lo parseamos. Si ya es objeto, lo devolvemos.
                // A veces la BD devuelve JSON como string si no está configurado el driver
                return typeof itemsJson === 'string' ? JSON.parse(itemsJson) : (itemsJson || []);
            } catch (e) {
                return [];
            }
        }
    }
}
