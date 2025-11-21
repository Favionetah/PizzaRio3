export default {
    template: `
        <div class="hero-section">
            <div class="hero-content">
                <h2>¡EL SABOR DE RÍO<br>EN TU CASA!</h2>
                <p>Descarga nuestra app o pide directamente aquí.</p>
                
                <button @click="$emit('navigate', 'login-view')" class="btn-hero">
                    🍽️ PIDE AQUÍ
                </button>
            </div>
            <div class="hero-image">
                <img src="../frontend/images/pizzaHomeView.jpg" alt="Promo Pizza">
            </div>
        </div>
    `,
    styles: `
        /* Puedes añadir estilos específicos aquí si quieres */
    `
}