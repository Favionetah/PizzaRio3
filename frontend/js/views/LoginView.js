export default {
    template: `
        <div class="containerForm">
            <div id="formLogin">
                <img src="./images/pizzaoceanohdPENEg.png" alt="logoPizzaRio" class="logoPizza">
                <h2>Inicio de Sesión</h2>
        
                <form @submit.prevent = "handleLogin">
                    <div>
                        <label for="email">Correo:</label>
                        <input type="email" id="email" v-model="email" required>
                    </div>
                    <div>
                        <label for="password">Contraseña:</label>
                        <input type="password" id="password" v-model="password" required>
                    </div>
                    <button type="submit" class="btnIngresar">Ingresar</button>
        
                </form>
                <p :style="{ color: messageColor }">{{ message }}</p>
                
                <button @click="$emit('navigate', 'home-view')" class="btnVolver">Volver</button>
            </div>
        </div>
    `,
    data() {
        return {
            email: '',
            password: '',
            message: '',
            messageColor: 'red'

        }
    },
    methods: {
        async handleLogin() {
            try {
                //Llammada a la API con FETCH (usamos http por que no es https xD)
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                   },
                   //Se convierte la informacion recibida a JSON
                   body: JSON.stringify({
                        email: this.email,
                        password: this.password
                   })
                });

                const data = await response.json();
                if (!response.ok) {
                    this.message = data.message;
                    this.messageColor = 'red';
                } else {
                    this.message = 'Ingresando';
                    this.messageColor = 'green';

                    localStorage.setItem('token', data.token);

                    /*if (data.role === 'Administrador' || data.role === 'Cajero') {
                        window.location.href = 'pos-app/index.html';
                    } else if (data.role === 'Cliente') {
                        window.location.href = 'client-app/index.html';
                    } else {
                        this.message = 'Rol no  reconocido';
                        this.messageColor = 'red';
                    }*/

                    this.$emit('login-success', {
                        email: this.email,
                        role: data.role,
                        nombre: data.nombre
                    });
                }
            } catch (error) {
                console.error('Error en el login: ', error);
                this.message = 'Error al conectar con el servidor xd';
                this.messageColor = 'red';
            }
        }
    }
}