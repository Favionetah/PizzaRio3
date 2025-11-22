export default {
    template: `
        <div class="admin-cashiers-view">
            <div class="admin-header">
                <h2>Administración — Cajeros</h2>
                <button @click="$emit('navigate', 'home-view')" class="btn-back">← Volver</button>
            </div>

            <div class="admin-actions">
                <form @submit.prevent="submitForm" class="form-create">
                    <h3 v-if="!editing">Crear nuevo cajero</h3>
                    <h3 v-else>Editar cajero {{ form.idUsuario }}</h3>
                    <div>
                        <label>ID usuario</label>
                        <input v-model="form.idUsuario" :disabled="editing" required />
                    </div>
                    <div>
                        <label>Email</label>
                        <input v-model="form.email" type="email" />
                    </div>
                    <div v-if="!editing">
                        <label>Password</label>
                        <input v-model="form.password" type="password" required />
                    </div>

                    <hr />
                    <h4>Datos personales (opcional)</h4>
                    <div>
                        <label>CI Empleado</label>
                        <input v-model="form.CIEmpleado" />
                    </div>
                    <div>
                        <label>Nombre 1</label>
                        <input v-model="form.nombre1" />
                    </div>
                    <div>
                        <label>Nombre 2</label>
                        <input v-model="form.nombre2" />
                    </div>
                    <div>
                        <label>Apellido 1</label>
                        <input v-model="form.apellido1" />
                    </div>
                    <div>
                        <label>Apellido 2</label>
                        <input v-model="form.apellido2" />
                    </div>
                    <div>
                        <label>Teléfono</label>
                        <input v-model="form.telefono" />
                    </div>
                    <div>
                        <label>Dirección</label>
                        <input v-model="form.direccion" />
                    </div>
                    <div>
                        <label>Sucursal</label>
                        <input v-model="form.idSucursal" placeholder="SC-01" />
                    </div>
                    <div>
                        <label>Fecha Nac.</label>
                        <input v-model="form.fechaNacimiento" type="date" />
                    </div>
                    <div>
                        <label>Salario</label>
                        <input v-model="form.salario" type="number" step="0.01" />
                    </div>
                    <div class="form-actions">
                        <button class="btn-primary" type="submit">{{ editing ? 'Guardar' : 'Crear' }}</button>
                        <button type="button" @click="resetForm" class="btn-secondary">Cancelar</button>
                    </div>
                </form>

                <div class="cashiers-list">
                    <h3>Lista de Cajeros</h3>
                    <div v-if="loading" class="loading">Cargando...</div>
                    <div v-else>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="c in cashiers" :key="c.idUsuario">
                                    <td>{{ c.idUsuario }}</td>
                                    <td>{{ c.email }}</td>
                                    <td>{{ c.estadoA === 1 ? 'Activo' : 'Inactivo' }}</td>
                                    <td>
                                        <button @click="edit(c)" class="btn-sm">Editar</button>
                                        <button @click="deactivate(c.idUsuario)" class="btn-sm danger">Desactivar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `,

    data() {
        return {
            cashiers: [],
            loading: false,
            form: {
                idUsuario: '',
                password: '',
                email: '',
                CIEmpleado: '',
                idSucursal: '',
                nombre1: '',
                nombre2: '',
                apellido1: '',
                apellido2: '',
                telefono: '',
                direccion: '',
                fechaNacimiento: '',
                salario: ''
            },
            editing: false
        }
    },

    mounted() {
        this.fetchCashiers();
    },

    methods: {
        getToken() {
            return localStorage.getItem('token');
        },

        async fetchCashiers() {
            try {
                this.loading = true;
                const token = this.getToken();
                const res = await fetch('http://localhost:3000/api/admin/cashiers', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('No autorizado o error');
                this.cashiers = await res.json();
            } catch (err) {
                console.error('Error fetching cashiers', err);
                alert('Error al cargar cajeros. Revisa tu sesión.');
            } finally {
                this.loading = false;
            }
        },

        resetForm() {
            this.form = {
                idUsuario: '', password: '', email: '', CIEmpleado: '', idSucursal: '', nombre1: '', nombre2: '', apellido1: '', apellido2: '', telefono: '', direccion: '', fechaNacimiento: '', salario: ''
            };
            this.editing = false;
        },

        async submitForm() {
            try {
                const token = this.getToken();
                if (!this.editing) {
                    // Crear
                    const res = await fetch('http://localhost:3000/api/admin/cashiers', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify(this.form)
                    });
                    if (!res.ok) throw new Error('Error al crear');
                    alert('Cajero creado');
                } else {
                    // Actualizar
                    const res = await fetch(`http://localhost:3000/api/admin/cashiers/${this.form.idUsuario}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify({
                            email: this.form.email,
                            password: this.form.password || undefined,
                            CIEmpleado: this.form.CIEmpleado || undefined,
                            idSucursal: this.form.idSucursal || undefined,
                            nombre1: this.form.nombre1 || undefined,
                            nombre2: this.form.nombre2 || undefined,
                            apellido1: this.form.apellido1 || undefined,
                            apellido2: this.form.apellido2 || undefined,
                            telefono: this.form.telefono || undefined,
                            direccion: this.form.direccion || undefined,
                            fechaNacimiento: this.form.fechaNacimiento || undefined,
                            salario: this.form.salario || undefined
                        })
                    });
                    if (!res.ok) throw new Error('Error al actualizar');
                    alert('Cajero actualizado');
                }
                this.resetForm();
                await this.fetchCashiers();
            } catch (err) {
                console.error(err);
                alert('Error en la operación. Revisa la consola.');
            }
        },

        edit(c) {
            this.editing = true;
            this.form.idUsuario = c.idUsuario;
            this.form.email = c.email || '';
            this.form.password = '';
            this.form.CIEmpleado = c.CIEmpleado || '';
            this.form.idSucursal = c.idSucursal || '';
            this.form.nombre1 = c.nombre1 || '';
            this.form.nombre2 = c.nombre2 || '';
            this.form.apellido1 = c.apellido1 || '';
            this.form.apellido2 = c.apellido2 || '';
            this.form.telefono = c.telefono || '';
            this.form.direccion = c.direccion || '';
            this.form.fechaNacimiento = c.fechaNacimiento || '';
            this.form.salario = c.salario || '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        async deactivate(id) {
            if (!confirm(`Desactivar cajero ${id}?`)) return;
            try {
                const token = this.getToken();
                const res = await fetch(`http://localhost:3000/api/admin/cashiers/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Error al desactivar');
                alert('Cajero desactivado');
                await this.fetchCashiers();
            } catch (err) {
                console.error(err);
                alert('Error al desactivar cajero');
            }
        }
    }
}
