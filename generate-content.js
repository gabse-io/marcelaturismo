// generate-content.js
const fs = require('fs');
const https = require('https');

// Configuración de Supabase
const SUPABASE_URL = 'https://fwqojlaepsfbbbwwguwd.supabase.co';  // ⚠️ REEMPLAZAR
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cW9qbGFlcHNmYmJid3dndXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTYyNTcsImV4cCI6MjA5NDgzMjI1N30.sigAfGsDqhRSeOLDzSJxmMoyTwrWk1i7jHfwyuqmngU';  // ⚠️ REEMPLAZAR

async function fetchContent() {
    return new Promise((resolve, reject) => {
        const url = `${SUPABASE_URL}/rest/v1/website_content?select=contenido&id=eq.1`;
        
        const options = {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        };
        
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json && json[0] && json[0].contenido) {
                        resolve(json[0].contenido);
                    } else {
                        resolve(getDefaultContent());
                    }
                } catch(e) {
                    console.log('Error parsing JSON, usando default');
                    resolve(getDefaultContent());
                }
            });
        }).on('error', (err) => {
            console.log('Error fetching:', err);
            resolve(getDefaultContent());
        });
    });
}

function getDefaultContent() {
    return {
        header: {
            logoText: "marcela<br><span>correa</span> turismo",
            logoImage: "https://i.postimg.cc/4Nrd9zWM/logoturismo.jpg",
            whatsappNumber: "5493624331702"
        },
        hero: {
            enabled: true,
            title: "Viajá con <span>Marcela Correa</span><br>y descubrí el mundo",
            subtitle: "Paquetes exclusivos con salidas garantizadas desde Resistencia, Corrientes y Villa Ángela.",
            backgroundImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=600&fit=crop"
        },
        paquetes: [
            {
                id: 1,
                nombre: "Buenos Aires Vip",
                precio: 199000,
                imagen: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
                badge: "Próxima salida",
                badgeColor: "#f15a24",
                descripcionCorta: "Disfrutá de la ciudad porteña con alojamiento de lujo",
                incluye: ["Hotel 5 estrellas", "Desayunos", "City tour", "Traslados"]
            },
            {
                id: 2,
                nombre: "Mendoza & Nieve",
                precio: 280000,
                imagen: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
                badge: "Cupos reducidos",
                badgeColor: "#00b48a",
                descripcionCorta: "Mendoza y alta montaña, bodegas y nieve",
                incluye: ["Bodegas", "Excursión a la nieve", "Desayunos"]
            },
            {
                id: 3,
                nombre: "Tafí + Termas",
                precio: 280000,
                imagen: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
                badge: "Todo incluido",
                badgeColor: "#520968",
                descripcionCorta: "Relajación en las Termas de Río Hondo",
                incluye: ["Termas incluidas", "Pensión completa", "Visitas guiadas"]
            }
        ],
        beneficios: [
            { icono: "fa-crown", titulo: "Experiencias premium", descripcion: "Hoteles y buses de primera línea" },
            { icono: "fa-clock", titulo: "Coordinación 24/7", descripcion: "Asistencia permanente en destino" },
            { icono: "fa-credit-card", titulo: "Pago flexible", descripcion: "Tarjetas, efectivo, transferencia" },
            { icono: "fa-map-pin", titulo: "Salidas garantizadas", descripcion: "Desde Resistencia, Corrientes y Villa Angela" }
        ],
        footer: {
            copyright: "© 2026 Marcela Correa Turismo · #HacemosRealidadTuViaje",
            columnas: [
                {
                    titulo: "MC Turismo",
                    enlaces: [
                        { texto: "Quiénes somos", url: "#" },
                        { texto: "Política de cancelación", url: "#" }
                    ]
                },
                {
                    titulo: "Destinos",
                    enlaces: [
                        { texto: "Buenos Aires", url: "#" },
                        { texto: "Mendoza", url: "#" },
                        { texto: "Termas de Río Hondo", url: "#" }
                    ]
                },
                {
                    titulo: "Contacto directo",
                    enlaces: [
                        { texto: "WhatsApp", url: "https://wa.me/5493624331702", icono: "fab fa-whatsapp" },
                        { texto: "Instagram", url: "https://www.instagram.com/marcela_correa_turismo/", icono: "fab fa-instagram" }
                    ]
                }
            ]
        }
    };
}

async function generateHTML() {
    console.log('🚀 Generando sitio estático...');
    
    try {
        const content = await fetchContent();
        
        // Leer el template
        let template = fs.readFileSync('template.html', 'utf8');
        
        // Inyectar los datos como JSON
        const jsonString = JSON.stringify(content).replace(/<\//g, '<\\/');
        template = template.replace('__CONTENT_JSON__', jsonString);
        
        // También generar el HTML directamente para mejor rendimiento
        const paquetesHTML = content.paquetes.map(p => `
            <div class="card-paquete" onclick="window.open('https://wa.me/${content.header.whatsappNumber}?text=${encodeURIComponent('Quiero reservar ' + p.nombre)}', '_blank')">
                <div class="card-img" style="background-image: url('${p.imagen}?w=500&h=260&fit=crop');"></div>
                <div class="card-content">
                    <div class="badge" style="background: ${p.badgeColor || '#f15a24'}">${p.badge || 'Próxima salida'}</div>
                    <h3 class="card-title">${p.nombre}</h3>
                    <div class="price">$${p.precio.toLocaleString()} <small>pp</small></div>
                    <div class="features">
                        ${(p.incluye || []).map(i => `<span><i class="fas fa-check-circle"></i> ${i}</span>`).join('')}
                    </div>
                    <p>${p.descripcionCorta || ''}</p>
                    <div class="btn-card">Consultar ahora →</div>
                </div>
            </div>
        `).join('');
        
        const beneficiosHTML = content.beneficios.map(b => `
            <div class="benefit">
                <i class="fas ${b.icono}"></i>
                <h4>${b.titulo}</h4>
                <p>${b.descripcion}</p>
            </div>
        `).join('');
        
        const footerColumnasHTML = content.footer.columnas.map(col => `
            <div class="footer-col">
                <h4>${col.titulo}</h4>
                ${col.enlaces.map(link => `<a href="${link.url}" target="_blank"><i class="${link.icono || ''}"></i> ${link.texto}</a>`).join('')}
            </div>
        `).join('');
        
        // Generar HTML final completo
        const finalHTML = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marcela Correa | Turismo de Autor</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #ffffff; color: #111111; scroll-behavior: smooth; }
        .container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        :root { --naranja: #f15a24; --naranja-hover: #d94712; --azul-claro: #eef2fa; --azul-profundo: #0a2540; --verde-menta: #00b48a; --gris-fondo: #fafafc; --gris-bordes: #eef2f5; --texto-claro: #5b6e8c; }
        
        .main-header { position: sticky; top: 0; background: rgba(255,255,255,0.96); backdrop-filter: blur(8px); z-index: 100; border-bottom: 1px solid var(--gris-bordes); }
        .header-top { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; flex-wrap: wrap; }
        .logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .logo-icon img { width: 55px; height: 55px; border-radius: 12px; object-fit: cover; }
        .logo-text { font-weight: 800; font-size: 1.2rem; line-height: 1.2; letter-spacing: -0.3px; color: #111; }
        .logo-text span { color: var(--naranja); }
        .btn-wa { background: var(--naranja); padding: 10px 24px; border-radius: 40px; text-decoration: none; color: white; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; transition: 0.2s; }
        .btn-wa:hover { background: var(--naranja-hover); transform: scale(1.02); }
        
        .hero { position: relative; background-size: cover; background-position: center; padding: 140px 0; color: white; text-align: center; }
        .hero h1 { font-size: 4.2rem; font-weight: 800; line-height: 1.2; margin-bottom: 20px; text-shadow: 0 2px 10px rgba(0,0,0,0.2); }
        .hero h1 span { color: var(--naranja); }
        .hero p { font-size: 1.2rem; max-width: 600px; margin: 0 auto 32px; opacity: 0.9; }
        .hero-buttons { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
        .btn-primary { background: var(--naranja); padding: 14px 36px; border-radius: 60px; text-decoration: none; color: white; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; transition: 0.2s; }
        .btn-primary:hover { background: var(--naranja-hover); transform: translateY(-2px); }
        .btn-outline { background: transparent; border: 1px solid white; padding: 12px 32px; border-radius: 60px; text-decoration: none; color: white; font-weight: 500; transition: 0.2s; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: var(--naranja); }
        
        .paquetes { padding: 100px 0; background: white; }
        .section-title { font-size: 3rem; font-weight: 800; text-align: center; margin-bottom: 16px; letter-spacing: -1px; }
        .section-sub { text-align: center; color: var(--texto-claro); margin-bottom: 64px; font-size: 1.1rem; }
        .paquetes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; }
        
        .card-paquete { background: white; border-radius: 24px; overflow: hidden; border: 1px solid var(--gris-bordes); transition: 0.3s; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.03); text-decoration: none; color: inherit; display: block; }
        .card-paquete:hover { transform: translateY(-8px); box-shadow: 0 24px 36px -12px rgba(0,0,0,0.15); border-color: var(--naranja); }
        .card-img { height: 240px; background-size: cover; background-position: center; }
        .card-content { padding: 28px 24px 24px; }
        .card-title { font-size: 1.6rem; font-weight: 700; margin-bottom: 8px; line-height: 1.3; }
        .price { font-size: 2rem; font-weight: 800; color: var(--naranja); margin: 16px 0 12px; }
        .price small { font-size: 0.9rem; font-weight: 500; color: var(--texto-claro); }
        .features { display: flex; flex-wrap: wrap; gap: 16px; margin: 20px 0; font-size: 0.85rem; color: var(--texto-claro); border-top: 1px solid var(--gris-bordes); padding-top: 20px; }
        .features i { color: var(--verde-menta); width: 20px; margin-right: 6px; }
        .badge { display: inline-block; background: var(--naranja); color: white; font-size: 0.7rem; font-weight: 700; padding: 4px 12px; border-radius: 50px; letter-spacing: 0.5px; margin-bottom: 12px; }
        .btn-card { background: var(--azul-claro); border: none; padding: 14px 24px; border-radius: 40px; font-weight: 600; color: var(--azul-profundo); cursor: pointer; width: 100%; transition: 0.2s; font-size: 0.9rem; margin-top: 8px; text-align: center; display: block; }
        .btn-card:hover { background: var(--naranja); color: white; }
        
        .benefits { background: var(--gris-fondo); padding: 80px 0; }
        .benefits-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; text-align: center; }
        .benefit i { font-size: 2rem; color: var(--naranja); margin-bottom: 20px; }
        .benefit h4 { font-size: 1.2rem; margin-bottom: 10px; }
        .benefit p { color: var(--texto-claro); font-size: 0.9rem; }
        
        .footer { background: #0a2540; color: rgba(255,255,255,0.8); padding: 60px 0 30px; }
        .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; }
        .footer-col h4 { font-weight: 700; margin-bottom: 20px; color: white; }
        .footer-col a { display: block; color: rgba(255,255,255,0.7); text-decoration: none; margin-bottom: 12px; font-size: 0.85rem; transition: 0.2s; }
        .footer-col a:hover { color: var(--naranja); }
        .footer-bottom { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.75rem; }
        
        @media (max-width: 768px) {
            .container { padding: 0 24px; }
            .hero h1 { font-size: 2.2rem; }
            .paquetes-grid { grid-template-columns: 1fr; }
            .benefits-grid { grid-template-columns: 1fr; }
            .section-title { font-size: 2.2rem; }
        }
    </style>
</head>
<body>

<header class="main-header">
    <div class="container header-top">
        <a href="#" class="logo">
            <div class="logo-icon"><img src="${content.header.logoImage}"></div>
            <div class="logo-text">${content.header.logoText}</div>
        </a>
        <a href="https://wa.me/${content.header.whatsappNumber}" class="btn-wa" target="_blank"><i class="fab fa-whatsapp"></i> Reservar</a>
    </div>
</header>

${content.hero.enabled !== false ? `
<section class="hero" style="background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('${content.hero.backgroundImage}'); background-size: cover; background-position: center;">
    <div class="container">
        <h1>${content.hero.title}</h1>
        <p>${content.hero.subtitle}</p>
        <div class="hero-buttons">
            <a href="#paquetes" class="btn-primary"><i class="fas fa-map-marked-alt"></i> Explorar paquetes</a>
            <a href="https://wa.me/${content.header.whatsappNumber}" class="btn-outline" target="_blank">Hablar por WhatsApp</a>
        </div>
    </div>
</section>
` : ''}

<section id="paquetes" class="paquetes">
    <div class="container">
        <h2 class="section-title">Próximas <span style="color: var(--naranja);">salidas</span></h2>
        <div class="section-sub">Elegí tu experiencia, nosotros nos encargamos del resto</div>
        <div class="paquetes-grid">
            ${paquetesHTML}
        </div>
    </div>
</section>

<section class="benefits">
    <div class="container">
        <div class="benefits-grid">
            ${beneficiosHTML}
        </div>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            ${footerColumnasHTML}
        </div>
        <div class="footer-bottom">
            <p>${content.footer.copyright}</p>
        </div>
    </div>
</footer>

<script>
    // Datos para posibles interacciones
    window.siteData = ${jsonString};
</script>
</body>
</html>`;
        
        // Guardar el archivo final
        fs.writeFileSync('index.html', finalHTML);
        console.log('✅ Sitio generado exitosamente en index.html');
        console.log(`📊 Datos cargados: ${content.paquetes.length} paquetes, ${content.beneficios.length} beneficios`);
        
    } catch (error) {
        console.error('❌ Error generando el sitio:', error);
        process.exit(1);
    }
}

// Ejecutar
generateHTML();