export default {
    template: `
        <div class="my-orders-container" style="padding: 2rem; text-align: center; color: white;">
            <h2>Mis Pedidos</h2>
            <p>Próximamente podrás ver tu historial de pedidos aquí.</p>
            <button class="btn-pide-aqui" @click="$emit('navigate', 'home-view')">Volver al Inicio</button>
        </div>
    `
}
