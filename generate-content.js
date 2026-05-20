const fs = require('fs');
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fwqojlaepsfbbbwwguwd.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cW9qbGFlcHNmYmJid3dndXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTYyNTcsImV4cCI6MjA5NDgzMjI1N30.sigAfGsDqhRSeOLDzSJxmMoyTwrWk1i7jHfwyuqmngU';

async function fetchContent() {
    return new Promise((resolve) => {
        console.log('🔍 Conectando a Supabase...');
        
        const url = `${SUPABASE_URL}/rest/v1/website_content?select=contenido&id=eq.1`;
        
        const options = {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        };
        
        const req = https.get(url, options, (res) => {
            let data = '';
            
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    console.log('📡 Status:', res.statusCode);
                    
                    if (res.statusCode === 200 && json && json[0] && json[0].contenido) {
                        const contenido = json[0].contenido;
                        console.log('✅ Datos desde Supabase');
                        console.log('📊 Paquetes:', contenido.paquetes?.length || 0);
                        console.log('🏷️ Hero badge:', contenido.hero?.badge || 'no badge');
                        resolve(contenido);
                    } else {
                        console.log('⚠️ Usando datos por defecto');
                        resolve(getDefaultContent());
                    }
                } catch(e) {
                    console.log('❌ Error parseando JSON:', e.message);
                    resolve(getDefaultContent());
                }
            });
        });
        
        req.on('error', (err) => {
            console.log('❌ Error de conexión:', err.message);
            resolve(getDefaultContent());
        });
        
        req.end();
    });
}

function getDefaultContent() {
    return {
        config: {
            siteName: "Marcela Correa Turismo",
            primaryColor: "#f15a24",
            secondaryColor: "#0a2540",
            accentColor: "#00b48a",
            fontFamily: "'Inter', sans-serif"
        },
        header: {
            logoText: "marcela<br><span>correa</span> turismo",
            logoImage: "https://i.postimg.cc/4Nrd9zWM/logoturismo.jpg",
            logoWidth: "55px",
            logoHeight: "55px",
            whatsappNumber: "5493624331702",
            whatsappText: "Reservar",
            backgroundColor: "rgba(255,255,255,0.96)",
            textColor: "#111111"
        },
        hero: {
            enabled: true,
            autoplaySpeed: 5000,
            slides: [
                {
                    id: 1,
                    badge: "🔥 NUEVA TEMPORADA 2026",
                    title: "Viajá con <span>Marcela Correa</span><br>y descubrí el mundo",
                    subtitle: "Paquetes exclusivos con salidas garantizadas",
                    backgroundImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
                    buttonPrimaryText: "Explorar paquetes",
                    buttonPrimaryLink: "#paquetes",
                    buttonSecondaryText: "Hablar por WhatsApp"
                },
                {
                    id: 2,
                    badge: "🏔️ Destinos únicos",
                    title: "Descubrí <span>Mendoza & Nieve</span><br>la mejor experiencia",
                    subtitle: "Salidas garantizadas con los mejores precios",
                    backgroundImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
                    buttonPrimaryText: "Ver destinos",
                    buttonPrimaryLink: "#paquetes",
                    buttonSecondaryText: "Contactar"
                }
            ]
        },
        seccionPaquetes: {
            title: "Próximas <span style=\"color: #f15a24;\">salidas</span>",
            subtitle: "Elegí tu experiencia, nosotros nos encargamos del resto",
            backgroundColor: "#ffffff"
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
                descripcionCompleta: "Disfrutá de la ciudad porteña con alojamiento de lujo...",
                ciudad: "Buenos Aires",
                noches: "2 noches",
                salida: "12 de Junio",
                incluye: ["Hotel 5 estrellas Luxon", "Bus mix cama", "City tour completo"],
                itinerario: [],
                hoteles: [],
                whatsapp: "Hola! Quiero reservar Buenos Aires"
            },
            {
                id: 2,
                nombre: "Mendoza & Nieve",
                precio: 280000,
                imagen: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
                badge: "Cupos reducidos",
                badgeColor: "#00b48a",
                descripcionCorta: "Salidas 30 de Abril / 22 Mayo. Desayunos, guía local.",
                descripcionCompleta: "Mendoza y la alta montaña...",
                ciudad: "Mendoza",
                noches: "2 noches",
                salida: "30 de Abril / 22 Mayo",
                incluye: ["Bodegas", "Excursión a la nieve", "Desayunos"],
                itinerario: [],
                hoteles: [],
                whatsapp: "Hola! Quiero reservar Mendoza"
            },
            {
                id: 3,
                nombre: "Tafí + Termas",
                precio: 280000,
                imagen: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
                badge: "Todo incluido",
                badgeColor: "#520968",
                descripcionCorta: "2 noches, Termas de Río Hondo, visitas guiadas.",
                descripcionCompleta: "Relajación en las Termas...",
                ciudad: "Tucumán",
                noches: "2 noches",
                salida: "Consultar fechas",
                incluye: ["Termas incluidas", "Pensión completa", "Visitas guiadas"],
                itinerario: [],
                hoteles: [],
                whatsapp: "Hola! Quiero reservar Tafí"
            },
            {
                id: 1779289370161,
                nombre: "Bariloche 2026",
                precio: 1500000,
                imagen: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
                badge: "Novedad",
                badgeColor: "#f15a24",
                descripcionCorta: "Nuevo destino en Bariloche",
                descripcionCompleta: "Descubre Bariloche...",
                ciudad: "Bariloche",
                noches: "2 noches",
                salida: "Próximamente",
                incluye: ["Incluye 1", "Incluye 2"],
                itinerario: [],
                hoteles: [],
                whatsapp: "Hola! Quiero reservar Bariloche"
            }
        ],
        seccionBeneficios: {
            title: "¿Por qué viajar con nosotros?",
            backgroundColor: "#fafafc"
        },
        beneficios: [
            { icono: "fa-crown", titulo: "Experiencias premium", descripcion: "Hoteles y buses de primera línea" },
            { icono: "fa-clock", titulo: "Coordinación 24/7", descripcion: "Asistencia permanente en destino" },
            { icono: "fa-credit-card", titulo: "Pago flexible", descripcion: "Tarjetas, efectivo, transferencia" },
            { icono: "fa-map-pin", titulo: "Salidas garantizadas", descripcion: "Desde Resistencia, Corrientes y Villa Angela" }
        ],
        footer: {
            copyright: "© 2026 Marcela Correa Turismo",
            backgroundColor: "#0a2540",
            textColor: "rgba(255,255,255,0.8)",
            columnas: [
                { titulo: "MC Turismo", enlaces: [{ texto: "Quiénes somos", url: "#" }] },
                { titulo: "Contacto", enlaces: [{ texto: "WhatsApp", url: "https://wa.me/5493624331702" }] }
            ]
        }
    };
}

async function generateHTML() {
    console.log('🚀 Generando sitio estático...');
    const content = await fetchContent();
    const whatsappUrl = `https://wa.me/${content.header.whatsappNumber}`;
    const primaryColor = content.config?.primaryColor || "#f15a24";
    const secondaryColor = content.config?.secondaryColor || "#0a2540";
    
    // Generar slides del Hero
    const heroSlidesHTML = (content.hero.slides || []).map((slide, idx) => `
        <div class="hero-slide ${idx === 0 ? 'active' : ''}">
            <section class="hero" style="background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('${slide.backgroundImage}'); background-size: cover;">
                <div class="container">
                    <div class="hero-badge">${slide.badge}</div>
                    <h1>${slide.title}</h1>
                    <p>${slide.subtitle}</p>
                    <div class="hero-buttons">
                        <a href="${slide.buttonPrimaryLink}" class="btn-primary">${slide.buttonPrimaryText}</a>
                        <a href="${whatsappUrl}" class="btn-outline">${slide.buttonSecondaryText}</a>
                    </div>
                </div>
            </section>
        </div>
    `).join('');
    
    const heroDotsHTML = (content.hero.slides || []).map((_, idx) => `
        <button class="hero-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}"></button>
    `).join('');
    
    // Generar paquetes
    const paquetesHTML = (content.paquetes || []).map(p => `
        <div class="card-paquete" data-id="${p.id}">
            <div class="card-img" style="background-image: url('${p.imagen}?w=500&h=260&fit=crop');"></div>
            <div class="card-content">
                <div class="badge" style="background: ${p.badgeColor || primaryColor}">${p.badge}</div>
                <h3 class="card-title">${p.nombre}</h3>
                <div class="price">$${p.precio.toLocaleString()} <small>pp</small></div>
                <div class="features">
                    ${(p.incluye || []).slice(0, 3).map(i => `<span><i class="fas fa-check-circle"></i> ${i}</span>`).join('')}
                </div>
                <p>${p.descripcionCorta}</p>
                <div class="btn-card">Consultar ahora →</div>
            </div>
        </div>
    `).join('');
    
    // Generar beneficios
    const beneficiosHTML = (content.beneficios || []).map(b => `
        <div class="benefit">
            <i class="fas ${b.icono}"></i>
            <h4>${b.titulo}</h4>
            <p>${b.descripcion}</p>
        </div>
    `).join('');
    
    // Generar footer
    const footerColumnasHTML = (content.footer.columnas || []).map(col => `
        <div class="footer-col">
            <h4>${col.titulo}</h4>
            ${(col.enlaces || []).map(link => `<a href="${link.url}" target="_blank"><i class="${link.icono || ''}"></i> ${link.texto}</a>`).join('')}
            ${col.texto ? `<p>${col.texto}</p>` : ''}
        </div>
    `).join('');
    
    // Datos para modal
    const paquetesData = {};
    (content.paquetes || []).forEach(p => {
        paquetesData[p.id] = {
            nombre: p.nombre,
            precio: "$" + p.precio.toLocaleString(),
            imagen: p.imagen + "?w=800&h=380&fit=crop",
            ciudad: p.ciudad,
            noches: p.noches,
            salida: p.salida,
            descripcion: p.descripcionCompleta,
            whatsapp: p.whatsapp,
            itinerario: p.itinerario || [],
            hoteles: p.hoteles || [],
            incluye: p.incluye || []
        };
    });
    
    const paquetesJson = JSON.stringify(paquetesData);
    
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.config?.siteName || 'Marcela Correa Turismo'}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: ${content.config?.fontFamily || "'Inter', sans-serif"}; }
        .container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        :root { --naranja: ${primaryColor}; --verde-menta: #00b48a; --gris-bordes: #eef2f5; --texto-claro: #5b6e8c; }
        
        .main-header { position: sticky; top: 0; background: ${content.header.backgroundColor}; backdrop-filter: blur(8px); border-bottom: 1px solid var(--gris-bordes); z-index: 100; }
        .header-top { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; flex-wrap: wrap; }
        .logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .logo-icon img { width: ${content.header.logoWidth}; height: ${content.header.logoHeight}; border-radius: 12px; object-fit: cover; }
        .logo-text { font-weight: 800; font-size: 1.2rem; color: ${content.header.textColor}; }
        .logo-text span { color: var(--naranja); }
        .btn-wa { background: var(--naranja); padding: 10px 24px; border-radius: 40px; text-decoration: none; color: white; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
        
        .hero { padding: 140px 0; color: white; text-align: center; background-size: cover !important; }
        .hero h1 { font-size: 4.2rem; font-weight: 800; margin-bottom: 20px; }
        .hero h1 span { color: var(--naranja); }
        .hero p { font-size: 1.2rem; max-width: 600px; margin: 0 auto 32px; }
        .hero-buttons { display: flex; gap: 20px; justify-content: center; }
        .btn-primary { background: var(--naranja); padding: 14px 36px; border-radius: 60px; text-decoration: none; color: white; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
        .btn-outline { background: transparent; border: 1px solid white; padding: 12px 32px; border-radius: 60px; text-decoration: none; color: white; font-weight: 500; }
        
        .paquetes { padding: 100px 0; background: ${content.seccionPaquetes.backgroundColor}; }
        .section-title { font-size: 3rem; font-weight: 800; text-align: center; margin-bottom: 16px; }
        .section-sub { text-align: center; color: var(--texto-claro); margin-bottom: 64px; }
        .paquetes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; }
        
        .card-paquete { background: white; border-radius: 24px; overflow: hidden; border: 1px solid var(--gris-bordes); cursor: pointer; transition: 0.3s; }
        .card-paquete:hover { transform: translateY(-8px); box-shadow: 0 24px 36px -12px rgba(0,0,0,0.15); }
        .card-img { height: 240px; background-size: cover; background-position: center; }
        .card-content { padding: 28px 24px; }
        .card-title { font-size: 1.6rem; font-weight: 700; margin-bottom: 8px; }
        .price { font-size: 2rem; font-weight: 800; color: var(--naranja); margin: 16px 0; }
        .badge { display: inline-block; background: var(--naranja); color: white; font-size: 0.7rem; font-weight: 700; padding: 4px 12px; border-radius: 50px; margin-bottom: 12px; }
        .features { display: flex; flex-wrap: wrap; gap: 16px; margin: 20px 0; font-size: 0.85rem; color: var(--texto-claro); border-top: 1px solid var(--gris-bordes); padding-top: 20px; }
        .features i { color: var(--verde-menta); margin-right: 6px; }
        .btn-card { background: #eef2fa; border: none; padding: 14px; border-radius: 40px; font-weight: 600; cursor: pointer; width: 100%; text-align: center; }
        .btn-card:hover { background: var(--naranja); color: white; }
        
        .benefits { background: ${content.seccionBeneficios.backgroundColor}; padding: 80px 0; }
        .benefits-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; text-align: center; }
        .benefit i { font-size: 2rem; color: var(--naranja); margin-bottom: 20px; }
        
        .footer { background: ${content.footer.backgroundColor}; color: ${content.footer.textColor}; padding: 60px 0 30px; }
        .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; }
        .footer-col h4 { color: white; margin-bottom: 20px; }
        .footer-col a { display: block; color: rgba(255,255,255,0.7); text-decoration: none; margin-bottom: 12px; }
        .footer-bottom { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
        
        .hero-slide { display: none; }
        .hero-slide.active { display: block; animation: fadeIn 0.5s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .hero-dots { position: absolute; bottom: 20px; left: 0; right: 0; display: flex; justify-content: center; gap: 12px; }
        .hero-dot { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.5); border: none; cursor: pointer; }
        .hero-dot.active { background: var(--naranja); transform: scale(1.2); }
        
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.2rem; }
            .paquetes-grid { grid-template-columns: 1fr; }
            .benefits-grid { grid-template-columns: 1fr; }
            .container { padding: 0 24px; }
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
        <a href="${whatsappUrl}" class="btn-wa" target="_blank"><i class="fab fa-whatsapp"></i> ${content.header.whatsappText}</a>
    </div>
</header>

<div class="hero-slider" id="hero-slider">
    ${heroSlidesHTML}
    <div class="hero-dots">${heroDotsHTML}</div>
</div>

<section class="paquetes">
    <div class="container">
        <h2 class="section-title">${content.seccionPaquetes.title}</h2>
        <div class="section-sub">${content.seccionPaquetes.subtitle}</div>
        <div class="paquetes-grid">${paquetesHTML}</div>
    </div>
</section>

<section class="benefits">
    <div class="container">
        <h2 class="section-title">${content.seccionBeneficios.title}</h2>
        <div class="benefits-grid">${beneficiosHTML}</div>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer-grid">${footerColumnasHTML}</div>
        <div class="footer-bottom"><p>${content.footer.copyright}</p></div>
    </div>
</footer>

<script>
    const paquetes = ${paquetesJson};
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    
    function showSlide(index) {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        currentSlide = index;
    }
    
    if (slides.length > 1) {
        setInterval(() => {
            showSlide((currentSlide + 1) % slides.length);
        }, ${content.hero.autoplaySpeed || 5000});
        dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
    }
    
    document.querySelectorAll('.card-paquete').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            window.open('${whatsappUrl}?text=Hola%21%20Quiero%20reservar%20' + encodeURIComponent(paquetes[id]?.nombre || ''), '_blank');
        });
    });
</script>
</body>
</html>`;
    
    fs.writeFileSync('index.html', html);
    console.log('✅ Sitio generado exitosamente en index.html');
    console.log('📊 Datos cargados:', content.paquetes?.length || 0, 'paquetes,', content.beneficios?.length || 0, 'beneficios');
    console.log('🎠 Hero slides:', content.hero?.slides?.length || 0);
}

generateHTML();