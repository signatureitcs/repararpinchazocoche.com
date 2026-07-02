const fs = require('fs')

const MADRID_AREAS = [
  { slug: 'salamanca', name: 'Salamanca', postcode: '28001', address: 'Calle de Serrano 10, 28001 Madrid' },
  { slug: 'chamberi', name: 'Chamberí', postcode: '28004', address: 'Calle de Fuencarral 80, 28004 Madrid' },
  { slug: 'centro', name: 'Centro', postcode: '28013', address: 'Puerta del Sol 1, 28013 Madrid' },
  { slug: 'retiro', name: 'Retiro', postcode: '28009', address: 'Calle de Ibiza 5, 28009 Madrid' },
  { slug: 'arganzuela', name: 'Arganzuela', postcode: '28045', address: 'Paseo de las Delicias 10, 28045 Madrid' },
  { slug: 'carabanchel', name: 'Carabanchel', postcode: '28044', address: 'Calle de Aluche 3, 28044 Madrid' },
  { slug: 'vallecas', name: 'Vallecas', postcode: '28031', address: 'Calle de la Oca 1, 28031 Madrid' },
  { slug: 'hortaleza', name: 'Hortaleza', postcode: '28043', address: 'Calle de Silvano 1, 28043 Madrid' },
  { slug: 'fuencarral', name: 'Fuencarral', postcode: '28033', address: 'Calle de Fuencarral 200, 28033 Madrid' },
  { slug: 'latina', name: 'Latina', postcode: '28005', address: 'Calle de la Paloma 1, 28005 Madrid' },
  { slug: 'moncloa', name: 'Moncloa', postcode: '28008', address: 'Paseo de Moret 1, 28008 Madrid' },
  { slug: 'usera', name: 'Usera', postcode: '28026', address: 'Calle de Pradillo 1, 28026 Madrid' },
  { slug: 'tetuan', name: 'Tetuán', postcode: '28020', address: 'Calle de Bravo Murillo 1, 28020 Madrid' },
  { slug: 'barajas', name: 'Barajas', postcode: '28042', address: 'Calle de Barajas 1, 28042 Madrid' },
  { slug: 'vicalvaro', name: 'Vicálvaro', postcode: '28032', address: 'Calle de Vicálvaro 1, 28032 Madrid' },
  { slug: 'moratalaz', name: 'Moratalaz', postcode: '28030', address: 'Calle de Arroyo de las Pilillas 1, 28030 Madrid' },
  { slug: 'villaverde', name: 'Villaverde', postcode: '28021', address: 'Calle de Villaverde 1, 28021 Madrid' },
  { slug: 'san-blas', name: 'San Blas-Canillejas', postcode: '28022', address: 'Calle de Canillejas 1, 28022 Madrid' },
  { slug: 'ciudad-lineal', name: 'Ciudad Lineal', postcode: '28017', address: 'Calle de Arturo Soria 1, 28017 Madrid' },
  { slug: 'chamartin', name: 'Chamartín', postcode: '28016', address: 'Calle de Alberto Alcocer 1, 28016 Madrid' },
  { slug: 'villa-de-vallecas', name: 'Villa de Vallecas', postcode: '28053', address: 'Calle de Vallecas 1, 28053 Madrid' },
  { slug: 'parla', name: 'Parla', postcode: '28980', address: 'Plaza Mayor 1, 28980 Parla' },
  { slug: 'pinto', name: 'Pinto', postcode: '28320', address: 'Calle Mayor 1, 28320 Pinto' },
  { slug: 'arganda-del-rey', name: 'Arganda del Rey', postcode: '28500', address: 'Calle Mayor 1, 28500 Arganda del Rey' },
  { slug: 'rivas-vaciamadrid', name: 'Rivas-Vaciamadrid', postcode: '28522', address: 'Calle Mayor 1, 28522 Rivas-Vaciamadrid' },
  { slug: 'coslada', name: 'Coslada', postcode: '28820', address: 'Calle Mayor 1, 28820 Coslada' },
  { slug: 'san-fernando-de-henares', name: 'San Fernando de Henares', postcode: '28830', address: 'Calle Mayor 1, 28830 San Fernando de Henares' },
  { slug: 'majadahonda', name: 'Majadahonda', postcode: '28220', address: 'Calle Mayor 1, 28220 Majadahonda' },
  { slug: 'boadilla-del-monte', name: 'Boadilla del Monte', postcode: '28660', address: 'Calle Mayor 1, 28660 Boadilla del Monte' },
  { slug: 'tres-cantos', name: 'Tres Cantos', postcode: '28760', address: 'Calle Mayor 1, 28760 Tres Cantos' },
  { slug: 'alcala-de-henares', name: 'Alcalá de Henares', postcode: '28801', address: 'Calle Mayor 1, 28801 Alcalá de Henares' },
  { slug: 'mostoles', name: 'Móstoles', postcode: '28933', address: 'Calle Pradillo 1, 28933 Móstoles' },
  { slug: 'getafe', name: 'Getafe', postcode: '28901', address: 'Plaza de la Constitución 1, 28901 Getafe' },
  { slug: 'alcorcon', name: 'Alcorcón', postcode: '28920', address: 'Calle Mayor 1, 28920 Alcorcón' },
  { slug: 'leganes', name: 'Leganés', postcode: '28911', address: 'Plaza Mayor 1, 28911 Leganés' },
  { slug: 'torrejon-de-ardoz', name: 'Torrejón de Ardoz', postcode: '28850', address: 'Calle Mayor 1, 28850 Torrejón de Ardoz' },
  { slug: 'alcobendas', name: 'Alcobendas', postcode: '28100', address: 'Plaza Mayor 1, 28100 Alcobendas' },
  { slug: 'pozuelo-de-alarcon', name: 'Pozuelo de Alarcón', postcode: '28223', address: 'Calle Mayor 1, 28223 Pozuelo de Alarcón' },
  { slug: 'las-rozas', name: 'Las Rozas', postcode: '28231', address: 'Calle Mayor 1, 28231 Las Rozas' },
  { slug: 'collado-villalba', name: 'Collado Villalba', postcode: '28400', address: 'Calle Mayor 1, 28400 Collado Villalba' },
  { slug: 'torrelodones', name: 'Torrelodones', postcode: '28250', address: 'Calle Mayor 1, 28250 Torrelodones' },
  { slug: 'galapagar', name: 'Galapagar', postcode: '28260', address: 'Calle Mayor 1, 28260 Galapagar' },
  { slug: 'colmenar-viejo', name: 'Colmenar Viejo', postcode: '28770', address: 'Calle Mayor 1, 28770 Colmenar Viejo' },
  { slug: 'navalcarnero', name: 'Navalcarnero', postcode: '28600', address: 'Calle Mayor 1, 28600 Navalcarnero' },
  { slug: 'aranjuez', name: 'Aranjuez', postcode: '28300', address: 'Plaza de San Antonio 1, 28300 Aranjuez' },
  { slug: 'valdemoro', name: 'Valdemoro', postcode: '28340', address: 'Calle Mayor 1, 28340 Valdemoro' },
  { slug: 'ciempozuelos', name: 'Ciempozuelos', postcode: '28350', address: 'Calle Mayor 1, 28350 Ciempozuelos' },
  { slug: 'paracuellos-de-jarama', name: 'Paracuellos de Jarama', postcode: '28860', address: 'Calle Mayor 1, 28860 Paracuellos de Jarama' },
  { slug: 'algete', name: 'Algete', postcode: '28110', address: 'Calle Mayor 1, 28110 Algete' },
  { slug: 'el-escorial', name: 'El Escorial', postcode: '28280', address: 'Calle Mayor 1, 28280 El Escorial' },
  { slug: 'brunete', name: 'Brunete', postcode: '28690', address: 'Calle Mayor 1, 28690 Brunete' },
  { slug: 'villanueva-de-la-canada', name: 'Villanueva de la Cañada', postcode: '28691', address: 'Calle Mayor 1, 28691 Villanueva de la Cañada' },
  { slug: 'meco', name: 'Meco', postcode: '28880', address: 'Calle Mayor 1, 28880 Meco' },
  { slug: 'mejorada-del-campo', name: 'Mejorada del Campo', postcode: '28840', address: 'Calle Mayor 1, 28840 Mejorada del Campo' },
  { slug: 'loeches', name: 'Loeches', postcode: '28890', address: 'Calle Mayor 1, 28890 Loeches' },
  { slug: 'torres-de-la-alameda', name: 'Torres de la Alameda', postcode: '28813', address: 'Calle Mayor 1, 28813 Torres de la Alameda' },
  { slug: 'nuevo-baztan', name: 'Nuevo Baztán', postcode: '28514', address: 'Calle Mayor 1, 28514 Nuevo Baztán' },
  { slug: 'campo-real', name: 'Campo Real', postcode: '28510', address: 'Calle Mayor 1, 28510 Campo Real' },
  { slug: 'villaconejos', name: 'Villaconejos', postcode: '28380', address: 'Calle Mayor 1, 28380 Villaconejos' },
  { slug: 'titulcia', name: 'Titulcia', postcode: '28359', address: 'Calle Mayor 1, 28359 Titulcia' },
  { slug: 'cubas-de-la-sagra', name: 'Cubas de la Sagra', postcode: '28816', address: 'Calle Mayor 1, 28816 Cubas de la Sagra' },
  { slug: 'humanes-de-madrid', name: 'Humanes de Madrid', postcode: '28970', address: 'Calle Mayor 1, 28970 Humanes de Madrid' },
  { slug: 'grinon', name: 'Griñón', postcode: '28971', address: 'Calle Mayor 1, 28971 Griñón' },
  { slug: 'batres', name: 'Batres', postcode: '28977', address: 'Calle Mayor 1, 28977 Batres' },
  { slug: 'torrejon-de-la-calzada', name: 'Torrejón de la Calzada', postcode: '28981', address: 'Calle Mayor 1, 28981 Torrejón de la Calzada' },
  { slug: 'torrejon-de-velasco', name: 'Torrejón de Velasco', postcode: '28983', address: 'Calle Mayor 1, 28983 Torrejón de Velasco' },
  { slug: 'serranillos-del-valle', name: 'Serranillos del Valle', postcode: '28979', address: 'Calle Mayor 1, 28979 Serranillos del Valle' },
  { slug: 'daganzo-de-arriba', name: 'Daganzo de Arriba', postcode: '28814', address: 'Calle Mayor 1, 28814 Daganzo de Arriba' },
  { slug: 'ajalvir', name: 'Ajalvir', postcode: '28864', address: 'Calle Mayor 1, 28864 Ajalvir' },
  { slug: 'cobena', name: 'Cobeña', postcode: '28863', address: 'Calle Mayor 1, 28863 Cobeña' },
  { slug: 'san-sebastian-de-los-reyes', name: 'San Sebastián de los Reyes', postcode: '28700', address: 'Calle Mayor 1, 28700 San Sebastián de los Reyes' },
  { slug: 'moraleja-de-enmedio', name: 'Moraleja de Enmedio', postcode: '28950', address: 'Calle Mayor 1, 28950 Moraleja de Enmedio' },
  { slug: 'el-molar', name: 'El Molar', postcode: '28710', address: 'Calle Mayor 1, 28710 El Molar' },
  { slug: 'guadalix-de-la-sierra', name: 'Guadalix de la Sierra', postcode: '28794', address: 'Calle Mayor 1, 28794 Guadalix de la Sierra' },
  { slug: 'miraflores-de-la-sierra', name: 'Miraflores de la Sierra', postcode: '28792', address: 'Calle Mayor 1, 28792 Miraflores de la Sierra' },
  { slug: 'villanueva-del-pardillo', name: 'Villanueva del Pardillo', postcode: '28229', address: 'Calle Mayor 1, 28229 Villanueva del Pardillo' },
  { slug: 'las-matas', name: 'Las Matas', postcode: '28290', address: 'Calle Mayor 1, 28290 Las Matas' },
  { slug: 'pedrezuela', name: 'Pedrezuela', postcode: '28723', address: 'Calle Mayor 1, 28723 Pedrezuela' },
  { slug: 'anchuelo', name: 'Anchuelo', postcode: '28840', address: 'Calle Mayor 1, 28840 Anchuelo' },
  { slug: 'olmeda-de-las-fuentes', name: 'Olmeda de las Fuentes', postcode: '28511', address: 'Calle Mayor 1, 28511 Olmeda de las Fuentes' },
  { slug: 'camarma-de-esteruelas', name: 'Camarma de Esteruelas', postcode: '28816', address: 'Calle Mayor 1, 28816 Camarma de Esteruelas' },
]

function esc(str) {
  return (str || '').replace(/'/g, "''")
}

function serviceIntro(name) {
  return `La reparación de neumáticos de camión en ${name} es un servicio esencial para todos los transportistas, empresas logísticas y autónomos que operan en esta zona de la Comunidad de Madrid. Cuando un vehículo pesado sufre un pinchazo en ${name}, la consecuencia inmediata es la inmovilización del camión, la pérdida de tiempo de entrega y un coste económico significativo. Nuestro equipo de técnicos especializados en neumáticos de camión está operativo las 24 horas del día, los 7 días de la semana, incluidos festivos, para desplazarse directamente hasta el lugar donde se encuentra tu vehículo en ${name}. No importa si el pinchazo ocurre en plena autovía, en el interior de un polígono industrial, en el aparcamiento de un centro logístico o en cualquier calle de ${name}: nuestros técnicos llegan hasta ti con todo el equipamiento necesario para resolver la avería sin necesidad de grúa. El tiempo medio de llegada en ${name} es de 30 a 60 minutos desde que realizas la llamada. Contamos con técnicos distribuidos por toda la Comunidad de Madrid para garantizar los tiempos de respuesta más bajos posibles. Si tienes una emergencia ahora mismo en ${name}, llama al +34 911 676 448 y un técnico saldrá hacia ti de inmediato.`
}

function serviceBody(name) {
  return `En ${name}, la actividad industrial y logística genera un importante tráfico de vehículos pesados a lo largo de todo el día y la noche. Los camiones que operan en esta zona están expuestos a pinchazos causados por objetos en la calzada, desgaste prematuro, sobrecargas o defectos en la vía. Contar con un servicio de reparación de neumáticos de camión a domicilio en ${name} disponible las 24 horas marca la diferencia entre una parada de 30 minutos y una parada de varias horas. Nuestros técnicos llegan equipados con compresores profesionales, herramientas de desmontaje para neumáticos de gran diámetro, parches industriales y neumáticos de repuesto en los tamaños más habituales. Evaluamos el estado del neumático afectado y determinamos si es posible una reparación segura o si es necesaria la sustitución completa. En ambos casos el trabajo se realiza directamente en ${name} sin traslado a taller. Emitimos factura para empresas y autónomos con todos los detalles del servicio prestado.`
}

function serviceDeep(name) {
  return `<h2>Servicio completo de reparación de neumáticos de camión en ${name}</h2><p>Los neumáticos de vehículos pesados requieren herramientas específicas, conocimientos avanzados y experiencia real. Nuestro equipo lleva años prestando servicio a transportistas profesionales en ${name} y toda la Comunidad de Madrid. Conocemos las rutas más frecuentadas, los polígonos industriales de la zona y los accesos a las principales autovías.</p><h3>Tipos de avería que atendemos en ${name}</h3><p>El servicio más frecuente es la reparación de pinchazo por perforación con clavo, tornillo o cristal. Si el daño está en la banda de rodadura y no supera los 6 mm, realizamos una reparación definitiva mediante parche interior combinado con tapón de goma según normas ETRTO. Para reventones y daños graves, procedemos a la sustitución inmediata.</p><p>También atendemos: sustitución de neumáticos desgastados, cambio por rueda de repuesto del propio vehículo, revisión y ajuste de presiones en toda la flota, y asistencia por pérdida lenta de presión por válvulas defectuosas o llantas dañadas.</p><h3>Cobertura en ${name} y municipios cercanos</h3><p>Cubrimos ${name} con tiempo de respuesta garantizado inferior a 60 minutos. También atendemos municipios y polígonos del entorno inmediato. Nuestro servicio está disponible para flotas de transporte, empresas de logística, transportistas autónomos, empresas de construcción y cualquier operador de vehículos pesados.</p><h3>Cómo solicitar el servicio en ${name}</h3><p>Llámanos al +34 911 676 448 disponible 24 horas, o rellena el formulario y te llamamos en menos de 15 minutos. Facilítanos tu ubicación exacta en ${name}, el tipo de vehículo y la medida del neumático si la conoces.</p>`
}

function faqContent(name) {
  return [
    `Q1: ¿Cuánto tiempo tardan en llegar a ${name}?\\nA: El tiempo medio de llegada a ${name} es de 30 a 60 minutos desde que realizas la llamada. Disponemos de técnicos distribuidos por toda la Comunidad de Madrid.`,
    `Q2: ¿Reparan neumáticos de camión en ${name} sin necesidad de grúa?\\nA: Sí. Los técnicos se desplazan hasta la posición exacta de tu vehículo en ${name} con todo el equipamiento necesario para realizar la reparación in situ.`,
    `Q3: ¿El servicio en ${name} está disponible por la noche y los fines de semana?\\nA: Sí, estamos operativos las 24 horas del día, los 7 días de la semana, incluidos sábados, domingos y festivos.`,
    `Q4: ¿Qué tipos de camiones atienden en ${name}?\\nA: Atendemos camiones rígidos, articulados, semirremolques, trailers, camiones frigoríficos y cisterna. También furgonetas de reparto como servicio complementario.`,
    `Q5: ¿Puedo pedir presupuesto antes de que vengan a ${name}?\\nA: Sí. Cuando llamas al +34 911 676 448 te damos una estimación del coste antes de desplazarnos. El precio final se confirma tras evaluar el neumático en ${name}.`,
    `Q6: ¿Qué ocurre si el neumático no tiene reparación en ${name}?\\nA: Procedemos a la sustitución inmediata. Llevamos stock de los tamaños más habituales para camiones que operan en ${name} y la Comunidad de Madrid.`,
    `Q7: ¿Emiten factura para empresas con base en ${name}?\\nA: Sí, emitimos factura completa con IVA. Para flotas con base en ${name} también podemos gestionar acuerdos de servicio con condiciones especiales.`,
    `Q8: ¿Atienden en polígonos industriales de ${name}?\\nA: Sí, los polígonos industriales son una de las zonas donde más frecuentemente prestamos servicio en ${name} y sus alrededores.`,
    `Q9: ¿Cuánto cuesta reparar un pinchazo de camión en ${name}?\\nA: El precio depende del tipo de avería, la medida del neumático y la hora. Llama al +34 911 676 448 para obtener un presupuesto orientativo sin compromiso.`,
    `Q10: ¿También atienden furgonetas en ${name}?\\nA: Sí, aunque nuestra especialidad son los camiones pesados, también atendemos furgonetas de reparto y vehículos comerciales ligeros en ${name}.`,
  ].join('|||')
}

function blogContent(name) {
  return `<h2>Qué hacer si tu camión tiene un pinchazo en ${name}</h2><p>Un pinchazo de camión en ${name} puede ocurrir en cualquier momento: en plena autovía, en un polígono industrial, en una calle secundaria o en el aparcamiento de un cliente. La forma en que reacciones en los primeros minutos determina el tiempo total de parada y el coste de la incidencia.</p><h3>Paso 1: No frenes bruscamente</h3><p>Si sientes que un neumático se desinfla mientras circulas por ${name}, no frenes bruscamente. Mantén el control del vehículo, reduce la velocidad progresivamente y busca un lugar seguro donde detener el camión: un arcén amplio, una zona de servicio o el interior de un polígono.</p><h3>Paso 2: Señaliza correctamente</h3><p>Activa las luces de emergencia inmediatamente. En vías interurbanas, coloca los triángulos de señalización a la distancia reglamentaria. Ponte el chaleco reflectante antes de salir de la cabina.</p><h3>Paso 3: Evalúa el neumático</h3><p>Observa el estado visible del neumático desde una posición segura. No intentes quitar ningún objeto incrustado. Anota la posición del neumático afectado para comunicársela al técnico.</p><h3>Paso 4: Llama a un servicio especializado</h3><p>No intentes cambiar el neumático de un camión pesado sin el equipamiento adecuado. Llama al <strong>+34 911 676 448</strong>, disponible las 24 horas, y un técnico especializado se desplazará a tu posición en ${name}.</p><h3>Paso 5: Facilita tu ubicación exacta en ${name}</h3><p>Indica el nombre de la calle, carretera o punto kilométrico, o comparte las coordenadas GPS. Cuanta más información proporciones sobre tu posición en ${name}, antes llegará el técnico.</p><h3>Consejos para prevenir pinchazos en ${name}</h3><p>Revisa la presión de los neumáticos semanalmente. Inspecciona visualmente el estado de los neumáticos antes de cada ruta. Respeta la carga máxima del vehículo. Sustituye los neumáticos cuando el dibujo llegue al mínimo legal de 1,6 mm.</p><p>Si tienes una emergencia en ${name} ahora mismo, llama al <strong>+34 911 676 448</strong>. Disponibles 24 horas, 365 días al año.</p>`
}

let sql = `-- ============================================================
-- DAY 1: MADRID — ${MADRID_AREAS.length} áreas × 3 páginas = ${MADRID_AREAS.length * 3 + 1} páginas
-- Pegar en Supabase SQL Editor y ejecutar
-- ============================================================

`

// District hub
sql += `INSERT INTO pages (slug, service_type, h1, meta_title, meta_description, intro, body_section, deep_section, address, city, district, status, indexed_google)
VALUES (
  'neumaticos-camion/madrid',
  'neumaticos-camion',
  'Reparación de Neumáticos de Camión en Madrid — Servicio Urgente 24h',
  'Reparación Neumáticos Camión Madrid | Servicio 24h Toda la Provincia',
  'Servicio urgente de reparación de pinchazos de camión en Madrid y toda la provincia. Técnicos 24h. Llegamos en 30-60 min. +34 911 676 448',
  'Somos el servicio de referencia para la reparación urgente de neumáticos de camión en Madrid y toda su área metropolitana. Disponibles 24 horas, 365 días, para desplazarnos hasta la posición exacta de tu vehículo sin necesidad de grúa ni traslado a taller. Cubrimos todos los barrios de Madrid capital, todos los municipios del área metropolitana y los principales polígonos industriales de la provincia.',
  'Nuestros técnicos especializados en vehículos pesados trabajan con camiones de todos los tipos y marcas de neumáticos. Tiempo medio de llegada de 30 a 60 minutos en toda la provincia de Madrid.',
  '<h2>Reparación de neumáticos de camión en toda la provincia de Madrid</h2><p>Madrid es el mayor nodo logístico de España. La concentración de polígonos industriales, centros de distribución y plataformas logísticas hace que la provincia de Madrid sea una de las áreas con mayor demanda de servicios de reparación de neumáticos de camión urgentes. Nuestro equipo cubre toda la provincia con técnicos distribuidos estratégicamente para garantizar tiempos de llegada inferiores a 60 minutos.</p>',
  'Calle Gran Vía 1, 28013 Madrid',
  'Madrid',
  'Madrid',
  'published',
  false
) ON CONFLICT (slug) DO UPDATE SET
  h1 = EXCLUDED.h1, meta_title = EXCLUDED.meta_title, meta_description = EXCLUDED.meta_description,
  intro = EXCLUDED.intro, body_section = EXCLUDED.body_section, deep_section = EXCLUDED.deep_section,
  status = EXCLUDED.status, updated_at = NOW();

`

for (const area of MADRID_AREAS) {
  const n = area.name
  const s = area.slug
  const a = area.address

  // Service page
  sql += `INSERT INTO pages (slug, service_type, h1, meta_title, meta_description, intro, body_section, deep_section, address, city, district, status, indexed_google)
VALUES (
  'neumaticos-camion/madrid/${s}',
  'neumaticos-camion',
  'Reparación de Neumáticos de Camión en ${n} — Servicio 24h',
  'Reparación Neumáticos Camión ${n} | Servicio Urgente 24h Madrid',
  'Pinchazo de camión en ${n}? Técnicos disponibles 24h. Llegamos en 30-60 min. Sin grúa. Llama: +34 911 676 448',
  '${esc(serviceIntro(n))}',
  '${esc(serviceBody(n))}',
  '${esc(serviceDeep(n))}',
  '${esc(a)}',
  '${esc(n)}',
  'Madrid',
  'published',
  false
) ON CONFLICT (slug) DO UPDATE SET
  h1 = EXCLUDED.h1, meta_title = EXCLUDED.meta_title, meta_description = EXCLUDED.meta_description,
  intro = EXCLUDED.intro, body_section = EXCLUDED.body_section, deep_section = EXCLUDED.deep_section,
  status = EXCLUDED.status, updated_at = NOW();

`

  // FAQ page
  sql += `INSERT INTO pages (slug, service_type, h1, meta_title, meta_description, body_section, address, city, district, status, indexed_google)
VALUES (
  'neumaticos-camion/madrid/${s}/faq',
  'neumaticos-camion',
  'Preguntas Frecuentes — Reparación Neumáticos Camión en ${n}',
  'FAQ Neumáticos Camión ${n} | Preguntas Frecuentes Servicio 24h',
  'Resolvemos tus dudas sobre reparación de pinchazos de camión en ${n}. Servicio 24h disponible ahora. Tel: +34 911 676 448',
  '${esc(faqContent(n))}',
  '${esc(a)}',
  '${esc(n)}',
  'Madrid',
  'published',
  false
) ON CONFLICT (slug) DO UPDATE SET
  h1 = EXCLUDED.h1, meta_title = EXCLUDED.meta_title, meta_description = EXCLUDED.meta_description,
  body_section = EXCLUDED.body_section, status = EXCLUDED.status, updated_at = NOW();

`

  // Blog post
  const blogTitle = `Pinchazo de camión en ${n}: qué hacer y a quién llamar`
  const blogExcerpt = `Guía completa para actuar si tu camión sufre un pinchazo en ${n}. Pasos de seguridad, a quién llamar y cómo minimizar el tiempo de parada.`

  sql += `INSERT INTO blog_posts (slug, title, excerpt, content, meta_title, meta_desc, category, read_time, district, city, published_at)
VALUES (
  'pinchazo-camion-${s}-que-hacer',
  '${esc(blogTitle)}',
  '${esc(blogExcerpt)}',
  '${esc(blogContent(n))}',
  '${esc(blogTitle)} | Reparación Pinchazos Camión 24h',
  '${esc(blogExcerpt)}',
  'pinchazos-madrid',
  6,
  'madrid',
  '${s}',
  NOW()
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, excerpt = EXCLUDED.excerpt, content = EXCLUDED.content,
  meta_title = EXCLUDED.meta_title, meta_desc = EXCLUDED.meta_desc;

`
}

fs.writeFileSync('/home/claude/repararpinchazocoche/scripts/day1-madrid.sql', sql)
console.log(`✅ SQL file generated`)
console.log(`📄 Pages: ${MADRID_AREAS.length} service + ${MADRID_AREAS.length} FAQ + 1 hub = ${MADRID_AREAS.length * 2 + 1}`)
console.log(`📝 Blog posts: ${MADRID_AREAS.length}`)
console.log(`📊 TOTAL: ${MADRID_AREAS.length * 3 + 1}`)
