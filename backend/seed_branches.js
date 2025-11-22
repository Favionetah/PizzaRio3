const db = require('./config/db');

const sucursales = [
    ['LP-SUC-01', 'LP-01', 'Miraflores', 'Avenida Germán Busch #1559', 'La Paz', -16.5091, -68.1315, '+591 2 2123456'],
    ['LP-SUC-02', 'LP-01', 'San Miguel', 'Calle Claudio Aliaga, esquina Av. Montenegro', 'La Paz', -16.5393, -68.0784, '+591 2 2123457'],
    ['SC-01', 'LP-01', 'Sucursal Central', 'Av. Principal 123', 'Santa Cruz', -17.7833, -63.1821, '+591 3 3123456'],
    ['SC-SUC-01', 'SC-01', 'Equipetrol', 'Calle 9 Oeste #350 (Barrio Equipetrol)', 'Santa Cruz', -17.7715, -63.1995, '+591 3 3123457'],
    ['SC-SUC-02', 'SC-01', 'Av. Banzer', 'Zona Norte, cerca del 7mo Anillo', 'Santa Cruz', -17.7330, -63.1680, '+591 3 3123458'],
    ['SC-SUC-03', 'SC-01', 'Av. Beni', 'Avenida Beni, entre 3er y 4to Anillo', 'Santa Cruz', -17.7560, -63.1650, '+591 3 3123459'],
    ['SC-SUC-04', 'SC-01', 'Av. Alemana', 'Avenida Alemana, 4to Anillo', 'Santa Cruz', -17.7580, -63.1550, '+591 3 3123460'],
    ['SC-SUC-05', 'SC-01', 'Av. Busch (SCZ)', 'Av. Noel Kempff Mercado (3er Anillo) y Av. Busch', 'Santa Cruz', -17.7750, -63.2050, '+591 3 3123461'],
    ['SC-SUC-06', 'SC-01', 'Radial 27', 'Calle Santa Rosa #5005 (Barrio Ulupica)', 'Santa Cruz', -17.7450, -63.1900, '+591 3 3123462'],
    ['SC-SUC-07', 'SC-01', 'Av. Santos Dumont', 'Zona del 5to Anillo', 'Santa Cruz', -17.8250, -63.1850, '+591 3 3123463'],
    ['SC-SUC-08', 'SC-01', 'Av. Piraí', 'Avenida Piraí #300 (Zona Oeste)', 'Santa Cruz', -17.7950, -63.2100, '+591 3 3123464'],
    ['SC-SUC-09', 'SC-01', 'Av. San Aurelio', 'Av. San Aurelio #58 (cerca del Plan 3000)', 'Santa Cruz', -17.8150, -63.1500, '+591 3 3123465'],
    ['SC-SUC-10', 'SC-01', 'Villa 1ro de Mayo', 'Calle 5 Oeste #10-12', 'Santa Cruz', -17.8050, -63.1300, '+591 3 3123466'],
    ['SC-SUC-11', 'SC-01', 'Blacutt', 'Zona Sur, cerca del Estadio/1er Anillo (Barrio Blacutt)', 'Santa Cruz', -17.7920, -63.1780, '+591 3 3123467'],
    ['SC-SUC-12', 'SC-01', 'Melchor Pinto', 'Avenida Melchor Pinto (cerca del 1er-2do anillo)', 'Santa Cruz', -17.7850, -63.1750, '+591 3 3123468'],
    ['SC-SUC-13', 'SC-01', 'Av. Paurito', 'Frente al surtidor, Av. Cañada Pailita', 'Santa Cruz', -17.8500, -63.1400, '+591 3 3123469'],
    ['SC-SUC-14', 'SC-01', 'Km 9 Doble Vía', 'Km 9 Doble Vía La Guardia, Zona sur-oeste', 'Santa Cruz', -17.8600, -63.2500, '+591 3 3123470']
];

async function seed() {
    try {
        // Check if table exists, if not create it
        await db.query(`
            CREATE TABLE IF NOT EXISTS tsucursales (
                idSucursal VARCHAR(20) PRIMARY KEY,
                idEmpresa VARCHAR(20),
                nombreSucursal VARCHAR(100),
                direccion TEXT,
                ciudad VARCHAR(50),
                lat DECIMAL(10, 8),
                lng DECIMAL(11, 8),
                telefono VARCHAR(20)
            )
        `);

        const [rows] = await db.query('SELECT COUNT(*) as count FROM tsucursales');
        if (rows[0].count === 0) {
            console.log('Seeding branches...');
            const query = 'INSERT INTO tsucursales (idSucursal, idEmpresa, nombreSucursal, direccion, ciudad, lat, lng, telefono) VALUES ?';
            await db.query(query, [sucursales]);
            console.log('Branches seeded successfully!');
        } else {
            console.log('Branches already exist. Skipping seed.');
        }
        process.exit(0);
    } catch (error) {
        console.error('Error seeding branches:', error);
        process.exit(1);
    }
}

seed();
