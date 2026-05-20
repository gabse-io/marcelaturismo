const fs = require('fs');
const https = require('https');

// Configuración de Supabase
const SUPABASE_URL = 'https://TU_PROYECTO.supabase.co';
const SUPABASE_KEY = 'TU_ANON_KEY';

async function fetchContent() {
    return new Promise((resolve, reject) => {
        const url = `${SUPABASE_URL}/rest/v1/rpc/get_website_content`;
        
        const options = {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        };
        
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch(e) {
                    // Si no hay datos, usar contenido por defecto
                    resolve(getDefaultContent());
                }
            });
        }).on('error', reject);
    });
}

function getDefaultContent() {
    return {
        header: { logoText: "marcela<br><span>correa</span> turismo", whatsappNumber: "5493624331702" },
        hero: { title: "Viajá con <span>Marcela Correa</span><br>y descubrí el mundo", enabled: true },
        paquetes: [
            { id: 1, nombre: "Buenos Aires Vip", precio: 199000, imagen: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3" }
        ]
    };
}

async function generateHTML() {
    console.log('📦 Generando sitio estático...');
    
    const content = await fetchContent();
    
    // Leer la plantilla HTML
    let html = fs.readFileSync('template.html', 'utf8');
    
    // Inyectar el contenido (reemplazar marcadores)
    html = html.replace('__CONTENT_JSON__', JSON.stringify(content));
    
    // También podemos generar secciones específicas
    const paquetesHTML = content.paquetes.map(p => `
        <div class="card-paquete">
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <div class="price">$${p.precio.toLocaleString()}</div>
            <button onclick="window.location.href='https://wa.me/${content.header.whatsappNumber}'">Consultar</button>
        </div>
    `).join('');
    
    html = html.replace('__PAQUETES_GRID__', paquetesHTML);
    
    // Guardar el archivo final
    fs.writeFileSync('index.html', html);
    console.log('✅ Sitio generado exitosamente!');
}

generateHTML().catch(console.error);