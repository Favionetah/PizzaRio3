export default {
    template: `
        <div>
            <h2>Menú Pizza Río</h2>
            <p v-if="user">Bienvenido, {{ user.nombre }}</p>
            <p v-else>Cargando usuario...</p>

            <div style="margin-bottom: 20px;">
                <button @click="filtro = 'Todos'">Todos</button>
                <button @click="filtro = 'Pizzas'">Pizzas</button>
                <button @click="filtro = 'Bebida'">Bebidas</button>
            </div>

            <div v-if="loading">Cargando delicias...</div>

            <div v-else style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
                
                
                <div v-for="prod in productosFiltrados" :key="prod.id" class="card-estilo-bk" style="border: solid 2px black; border-radius: 10px; padding: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
                    
                    <img 
                        v-if="prod.imagen" 
                        :src="'http://localhost:3000/uploads/' + prod.imagen" 
                        alt="Foto Pizza"
                        style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px 10px 0 0; border: solid 2px black"
                    >
                    <img 
                        v-else 
                        src="https://via.placeholder.com/300x200?text=Sin+Foto" 
                        alt="Sin Foto"
                        style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px 10px 0 0;"
                    >

                    <div class="card-info">
                        <h3>{{ prod.nombre }}</h3>
                        <p>{{ prod.descripcion }}</p>
                        <p><strong>Bs {{ prod.precio }}</strong></p>
                        </div>
                </div>

            </div>
            
            <button @click="$emit('navigate', 'home-view')" style="margin-top: 30px;">Cerrar Sesión</button>
        </div>
    `,
    
    props: ['user'], 
    data() { // Recibimos user desde app.js (quien está logueado)
        return {
            productos: [],
            loading: true,
            filtro: 'Todos'
        }
    },
    computed: {
        productosFiltrados() {
            if (this.filtro === 'Todos') return this.productos;
            return this.productos.filter(p => p.categoria === this.filtro);
        }
    },

    // mounted se ejecuta apenas aparece este componente en pantalla
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
        agregar(prod) {
            alert(`Añadiste ${prod.nombre} (Lógica de carrito pendiente)`);
        }
    }
}