const fs = require('fs');
const https = require('https');

const SUPABASE_URL = 'https://fwqojlaepsfbbbwwguwd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cW9qbGFlcHNmYmJid3dndXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTYyNTcsImV4cCI6MjA5NDgzMjI1N30.sigAfGsDqhRSeOLDzSJxmMoyTwrWk1i7jHfwyuqmngU';

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
                    resolve(getDefaultContent());
                }
            });
        }).on('error', () => resolve(getDefaultContent()));
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
            badge: "🌎 viajes de autor · cupos limitados",
            title: "Viajá con <span>Marcela Correa</span><br>y descubrí el mundo",
            subtitle: "Paquetes exclusivos con salidas garantizadas desde Resistencia, Corrientes y Villa Ángela.",
            backgroundImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=600&fit=crop",
            buttonPrimaryText: "Explorar paquetes",
            buttonPrimaryLink: "#paquetes",
            buttonSecondaryText: "Hablar por WhatsApp"
        },
        paquetes: [
            {
                id: 1,
                nombre: "Buenos Aires Vip",
                precio: 199000,
                imagen: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
                badge: "Próxima salida",
                badgeColor: "#f15a24",
                descripcionCorta: "Salida 12 de Junio. Incluye excursiones a River, Boca, San Telmo, Luján.",
                descripcionCompleta: "Disfrutá de la ciudad porteña con alojamiento de lujo, city tour completo y excursiones a los estadios más emblemáticos.",
                ciudad: "Buenos Aires",
                noches: "2 noches",
                salida: "12 de Junio",
                incluye: ["Hotel 5 estrellas Luxon", "Bus mix cama", "City tour completo", "Entradas a estadios"],
                itinerario: [
                    { dia: "Día 1", titulo: "Llegada a Buenos Aires", texto: "Recepción en el aeropuerto y traslado al hotel Luxon. Por la tarde, paseo por Puerto Madero y cena opcional." },
                    { dia: "Día 2", titulo: "City Tour y estadios", texto: "Desayuno. Recorrido por San Telmo, La Boca (con visita a La Bombonera), Palermo y Recoleta. Almuerzo incluido." },
                    { dia: "Día 3", titulo: "River y despedida", texto: "Desayuno. Visita guiada al Estadio Monumental. Por la tarde, traslado al aeropuerto." }
                ],
                hoteles: [
                    { nombre: "Luxon Hotel", imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=180&fit=crop", rating: 5, descripcion: "Hotel 5 estrellas en el centro porteño con vista a la ciudad" },
                    { nombre: "Alvear Palace", imagen: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&h=180&fit=crop", rating: 5, descripcion: "El lujo clásico de Recoleta" }
                ],
                whatsapp: "Hola! Quiero reservar el paquete BUENOS AIRES VIP del 12 de Junio"
            },
            {
                id: 2,
                nombre: "Mendoza & Nieve",
                precio: 280000,
                imagen: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
                badge: "Cupos reducidos",
                badgeColor: "#00b48a",
                descripcionCorta: "Salidas 30 de Abril / 22 Mayo. Desayunos, guía local, traslados.",
                descripcionCompleta: "Mendoza y la alta montaña. Visita a bodegas, excursión a la nieve y paisajes increíbles.",
                ciudad: "Mendoza",
                noches: "2 noches",
                salida: "30 de Abril / 22 Mayo",
                incluye: ["Bodegas con degustación", "Excursión a la nieve", "Desayunos", "Guía local", "Traslados"],
                itinerario: [
                    { dia: "Día 1", titulo: "Llegada y city tour", texto: "Llegada a Mendoza. Por la tarde, recorrido por la ciudad y visita a bodega con degustación." },
                    { dia: "Día 2", titulo: "Alta montaña y nieve", texto: "Excursión a la Cordillera de los Andes, Potrerillos, Puente del Inca y Aconcagua. Nieve garantizada." },
                    { dia: "Día 3", titulo: "Bodegas y despedida", texto: "Visita a dos bodegas de primer nivel con almuerzo. Traslado al aeropuerto." }
                ],
                hoteles: [
                    { nombre: "Park Hyatt Mendoza", imagen: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&h=180&fit=crop", rating: 5, descripcion: "Hotel de lujo en el corazón de Mendoza" },
                    { nombre: "Diplomatic Hotel", imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=180&fit=crop", rating: 4, descripcion: "Elegancia y confort cerca de todo" }
                ],
                whatsapp: "Hola! Quiero reservar el paquete MENDOZA & NIEVE"
            },
            {
                id: 3,
                nombre: "Tafí + Termas",
                precio: 280000,
                imagen: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
                badge: "Todo incluido",
                badgeColor: "#520968",
                descripcionCorta: "2 noches, Termas de Río Hondo, visitas guiadas.",
                descripcionCompleta: "Relajación en las Termas de Río Hondo y paisajes de Tafí del Valle.",
                ciudad: "Tucumán / Santiago del Estero",
                noches: "2 noches",
                salida: "Consultar fechas",
                incluye: ["Termas incluidas", "Pensión completa", "Visitas guiadas", "Hotel con aguas termales"],
                itinerario: [
                    { dia: "Día 1", titulo: "Llegada a Termas", texto: "Llegada a Termas de Río Hondo. Alojamiento en hotel con termas. Noche de relax." },
                    { dia: "Día 2", titulo: "Termas y circuito", texto: "Día completo en el complejo termal. Opcional: paseo por el dique." },
                    { dia: "Día 3", titulo: "Tafí del Valle", texto: "Salida hacia Tafí del Valle, visita a la ciudad y regreso." }
                ],
                hoteles: [
                    { nombre: "Hotel Termal Río Hondo", imagen: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&h=180&fit=crop", rating: 4, descripcion: "Hotel con aguas termales y spa incluido" }
                ],
                whatsapp: "Hola! Quiero reservar el paquete TAFÍ + TERMAS"
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
                { titulo: "MC Turismo", enlaces: [{ texto: "Quiénes somos", url: "#" }, { texto: "Política de cancelación", url: "#" }, { texto: "Medios de pago", url: "#" }] },
                { titulo: "Destinos", enlaces: [{ texto: "Buenos Aires", url: "#" }, { texto: "Mendoza", url: "#" }, { texto: "Termas de Río Hondo", url: "#" }, { texto: "Salta", url: "#" }] },
                { titulo: "Contacto directo", enlaces: [{ texto: "WhatsApp", url: "https://wa.me/5493624331702", icono: "fab fa-whatsapp" }, { texto: "Instagram", url: "https://www.instagram.com/marcela_correa_turismo/", icono: "fab fa-instagram" }], texto: "📍 Frondizi 33 piso 2 of.4 - Resistencia, Chaco" }
            ]
        }
    };
}

async function generateHTML() {
    console.log('🚀 Generando sitio estático...');
    
    const content = await fetchContent();
    const whatsappUrl = `https://wa.me/${content.header.whatsappNumber}`;
    
    // Generar paquetes HTML
    const paquetesHTML = content.paquetes.map(p => `
        <div class="card-paquete" onclick="abrirModal(${p.id})">
            <div class="card-img" style="background-image: url('${p.imagen}?w=500&h=260&fit=crop');"></div>
            <div class="card-content">
                <div class="badge" style="background: ${p.badgeColor || '#f15a24'}">${p.badge}</div>
                <h3 class="card-title">${p.nombre}</h3>
                <div class="price">$${p.precio.toLocaleString()} <small>pp</small></div>
                <div class="features">
                    ${p.incluye.slice(0, 3).map(i => `<span><i class="fas fa-check-circle"></i> ${i}</span>`).join('')}
                </div>
                <p>${p.descripcionCorta}</p>
                <div class="btn-card" onclick="event.stopPropagation(); window.open('${whatsappUrl}?text=${encodeURIComponent(p.whatsapp)}','_blank')">Consultar ahora →</div>
            </div>
        </div>
    `).join('');
    
    // Generar beneficios HTML
    const beneficiosHTML = content.beneficios.map(b => `
        <div class="benefit">
            <i class="fas ${b.icono}"></i>
            <h4>${b.titulo}</h4>
            <p>${b.descripcion}</p>
        </div>
    `).join('');
    
    // Generar footer HTML
    const footerColumnasHTML = content.footer.columnas.map(col => `
        <div class="footer-col">
            <h4>${col.titulo}</h4>
            ${col.enlaces.map(link => `<a href="${link.url}" target="_blank"><i class="${link.icono || ''}"></i> ${link.texto}</a>`).join('')}
            ${col.texto ? `<p>${col.texto}</p>` : ''}
        </div>
    `).join('');
    
    // Datos para el modal (como JSON)
    const paquetesData = {};
    content.paquetes.forEach(p => {
        paquetesData[p.id] = {
            nombre: p.nombre,
            precio: "$" + p.precio.toLocaleString(),
            imagen: p.imagen + "?w=800&h=380&fit=crop",
            ciudad: p.ciudad,
            noches: p.noches,
            salida: p.salida,
            descripcion: p.descripcionCompleta,
            whatsapp: p.whatsapp,
            itinerario: p.itinerario,
            hoteles: p.hoteles
        };
    });
    
    const paquetesJson = JSON.stringify(paquetesData);
    
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Marcela Correa | Paquetes de autor</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap" rel="stylesheet">
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
        
        .hero { position: relative; background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('${content.hero.backgroundImage}'); background-size: cover; background-position: center 30%; padding: 140px 0; color: white; text-align: center; }
        .hero-badge { display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); padding: 6px 18px; border-radius: 50px; font-size: 0.75rem; font-weight: 600; letter-spacing: 1px; margin-bottom: 28px; }
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
        
        .card-paquete { background: white; border-radius: 24px; overflow: hidden; border: 1px solid var(--gris-bordes); transition: all 0.3s cubic-bezier(0.2, 0, 0, 1); cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.03); text-decoration: none; color: inherit; display: block; }
        .card-paquete:hover { transform: translateY(-8px); box-shadow: 0 24px 36px -12px rgba(0,0,0,0.15); border-color: var(--naranja); }
        .card-img { height: 240px; background-size: cover; background-position: center; transition: transform 0.4s ease; }
        .card-paquete:hover .card-img { transform: scale(1.02); }
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
        .footer-col a { display: block; color: rgba(255,255,255,0.7); text-decoration: none; margin-bottom: 12px; font-size: 0.85rem; }
        .footer-col a:hover { color: var(--naranja); }
        .footer-col p { margin-top: 16px; font-size: 0.85rem; }
        .footer-bottom { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.75rem; }
        
        /* MODAL */
        .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 1000; overflow-y: auto; }
        .modal-container { max-width: 1100px; margin: 40px auto; background: white; border-radius: 32px; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .modal-close { position: absolute; top: 20px; right: 20px; background: var(--naranja); color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; font-size: 1.2rem; transition: 0.2s; }
        .modal-close:hover { background: var(--naranja-hover); transform: scale(1.05); }
        .modal-content { padding: 0; }
        .modal-hero { background-size: cover; background-position: center; height: 380px; position: relative; border-radius: 32px 32px 0 0; }
        .modal-hero-overlay { background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)); border-radius: 32px 32px 0 0; height: 100%; display: flex; align-items: flex-end; padding: 40px; }
        .modal-hero h1 { color: white; font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; }
        .modal-hero-price { color: var(--naranja); font-size: 1.8rem; font-weight: 800; }
        .modal-body { padding: 40px; }
        .modal-features { display: flex; flex-wrap: wrap; gap: 24px; padding: 24px 0; border-top: 1px solid var(--gris-bordes); border-bottom: 1px solid var(--gris-bordes); margin-bottom: 30px; }
        .modal-features span { display: flex; align-items: center; gap: 10px; color: var(--texto-claro); }
        .modal-features i { color: var(--verde-menta); font-size: 1.2rem; }
        .itinerario-dia { background: white; border: 1px solid var(--gris-bordes); border-radius: 20px; margin-bottom: 16px; overflow: hidden; }
        .itinerario-header { background: var(--gris-fondo); padding: 18px 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: 600; }
        .itinerario-header i { transition: transform 0.3s; color: var(--naranja); }
        .itinerario-header.active i { transform: rotate(180deg); }
        .itinerario-content { padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .itinerario-content.show { padding: 24px; max-height: 500px; }
        .hotel-card { border: 1px solid var(--gris-bordes); border-radius: 20px; overflow: hidden; transition: 0.2s; }
        .hotel-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.08); }
        .hotel-img { height: 180px; background-size: cover; background-position: center; }
        .hotel-info { padding: 20px; }
        .hotel-info h4 { font-size: 1.1rem; margin-bottom: 8px; }
        .hotel-rating { color: #ffb800; margin-bottom: 12px; }
        .btn-reservar-modal { background: var(--naranja); padding: 14px 40px; border-radius: 60px; text-decoration: none; color: white; font-weight: 700; display: inline-flex; align-items: center; gap: 10px; transition: 0.2s; margin-top: 30px; border: none; cursor: pointer; }
        .btn-reservar-modal:hover { background: var(--naranja-hover); transform: translateY(-2px); }
        
        @media (max-width: 768px) {
            .container { padding: 0 24px; }
            .hero h1 { font-size: 2.2rem; }
            .paquetes-grid { grid-template-columns: 1fr; }
            .benefits-grid { grid-template-columns: 1fr; }
            .section-title { font-size: 2.2rem; }
            .modal-hero { height: 280px; }
            .modal-hero h1 { font-size: 1.5rem; }
            .modal-body { padding: 24px; }
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
        <a href="${whatsappUrl}" class="btn-wa" target="_blank"><i class="fab fa-whatsapp"></i> Reservar</a>
    </div>
</header>

<section class="hero">
    <div class="container">
        <div class="hero-badge">${content.hero.badge}</div>
        <h1>${content.hero.title}</h1>
        <p>${content.hero.subtitle}</p>
        <div class="hero-buttons">
            <a href="#paquetes" class="btn-primary"><i class="fas fa-map-marked-alt"></i> ${content.hero.buttonPrimaryText}</a>
            <a href="${whatsappUrl}" class="btn-outline" target="_blank">${content.hero.buttonSecondaryText}</a>
        </div>
    </div>
</section>

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

<div id="modal-detalle" class="modal-overlay">
    <div class="modal-container">
        <div class="modal-close" onclick="cerrarModal()"><i class="fas fa-times"></i></div>
        <div class="modal-content">
            <div class="modal-hero" id="modal-hero">
                <div class="modal-hero-overlay">
                    <div>
                        <h1 id="modal-titulo"></h1>
                        <div class="modal-hero-price" id="modal-precio"></div>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="modal-features" id="modal-features"></div>
                <p id="modal-descripcion"></p>
                <h3 style="margin: 30px 0 20px;">Itinerario día a día</h3>
                <div id="modal-itinerario"></div>
                <h3 style="margin: 30px 0 20px;">Posibles alojamientos</h3>
                <div id="modal-hoteles" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;"></div>
                <button class="btn-reservar-modal" id="modal-whatsapp"><i class="fab fa-whatsapp"></i> Reservar ahora</button>
            </div>
        </div>
    </div>
</div>

<script>
    const paquetes = ${paquetesJson};
    
    function abrirModal(id) {
        const data = paquetes[id];
        if (!data) return;
        
        document.getElementById('modal-titulo').innerText = data.nombre;
        document.getElementById('modal-precio').innerHTML = data.precio + ' <small>por persona</small>';
        document.getElementById('modal-hero').style.backgroundImage = "url('" + data.imagen + "')";
        document.getElementById('modal-descripcion').innerText = data.descripcion;
        
        document.getElementById('modal-features').innerHTML = \`
            <span><i class="fas fa-map-marker-alt"></i> \${data.ciudad}</span>
            <span><i class="fas fa-bed"></i> \${data.noches}</span>
            <span><i class="fas fa-calendar-alt"></i> \${data.salida}</span>
            <span><i class="fas fa-utensils"></i> Desayuno incluido</span>
        \`;
        
        const itinerarioContainer = document.getElementById('modal-itinerario');
        itinerarioContainer.innerHTML = '';
        data.itinerario.forEach(function(item) {
            itinerarioContainer.innerHTML += \`
                <div class="itinerario-dia">
                    <div class="itinerario-header" onclick="toggleItinerario(this)">
                        <span><strong>\${item.dia}</strong> - \${item.titulo}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="itinerario-content">
                        <p>\${item.texto}</p>
                    </div>
                </div>
            \`;
        });
        
        const hotelesContainer = document.getElementById('modal-hoteles');
        hotelesContainer.innerHTML = '';
        data.hoteles.forEach(function(hotel) {
            const stars = '★'.repeat(hotel.rating) + '☆'.repeat(5-hotel.rating);
            hotelesContainer.innerHTML += \`
                <div class="hotel-card">
                    <div class="hotel-img" style="background-image: url('\${hotel.imagen}');"></div>
                    <div class="hotel-info">
                        <h4>\${hotel.nombre}</h4>
                        <div class="hotel-rating">\${stars}</div>
                        <p>\${hotel.descripcion}</p>
                    </div>
                </div>
            \`;
        });
        
        document.getElementById('modal-whatsapp').onclick = function() {
            window.open('${whatsappUrl}?text=' + encodeURIComponent(data.whatsapp), '_blank');
        };
        
        document.getElementById('modal-detalle').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function cerrarModal() {
        document.getElementById('modal-detalle').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function toggleItinerario(element) {
        element.classList.toggle('active');
        var content = element.nextElementSibling;
        content.classList.toggle('show');
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('modal-detalle').style.display === 'block') {
            cerrarModal();
        }
    });
    
    document.getElementById('modal-detalle').addEventListener('click', function(e) {
        if (e.target === this) cerrarModal();
    });
</script>
</body>
</html>`;
    
    fs.writeFileSync('index.html', html);
    console.log('✅ Sitio generado exitosamente en index.html');
    console.log('📊 Datos cargados: ' + content.paquetes.length + ' paquetes, ' + content.beneficios.length + ' beneficios');
}

generateHTML();