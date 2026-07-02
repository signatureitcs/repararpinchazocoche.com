const fs = require('fs')

const MADRID_AREAS = [
  { slug: 'salamanca', name: 'Salamanca', address: 'Calle de Serrano 10, 28001 Madrid' },
  { slug: 'chamberi', name: 'Chamberí', address: 'Calle de Fuencarral 80, 28004 Madrid' },
  { slug: 'centro', name: 'Centro', address: 'Puerta del Sol 1, 28013 Madrid' },
  { slug: 'retiro', name: 'Retiro', address: 'Calle de Ibiza 5, 28009 Madrid' },
  { slug: 'arganzuela', name: 'Arganzuela', address: 'Paseo de las Delicias 10, 28045 Madrid' },
  { slug: 'carabanchel', name: 'Carabanchel', address: 'Calle de Aluche 3, 28044 Madrid' },
  { slug: 'vallecas', name: 'Vallecas', address: 'Calle de la Oca 1, 28031 Madrid' },
  { slug: 'hortaleza', name: 'Hortaleza', address: 'Calle de Silvano 1, 28043 Madrid' },
  { slug: 'fuencarral', name: 'Fuencarral', address: 'Calle de Fuencarral 200, 28033 Madrid' },
  { slug: 'latina', name: 'Latina', address: 'Calle de la Paloma 1, 28005 Madrid' },
  { slug: 'moncloa', name: 'Moncloa', address: 'Paseo de Moret 1, 28008 Madrid' },
  { slug: 'usera', name: 'Usera', address: 'Calle de Pradillo 1, 28026 Madrid' },
  { slug: 'tetuan', name: 'Tetuan', address: 'Calle de Bravo Murillo 1, 28020 Madrid' },
  { slug: 'barajas', name: 'Barajas', address: 'Calle de Barajas 1, 28042 Madrid' },
  { slug: 'vicalvaro', name: 'Vicalvaro', address: 'Calle de Vicalvaro 1, 28032 Madrid' },
  { slug: 'moratalaz', name: 'Moratalaz', address: 'Calle de Arroyo de las Pilillas 1, 28030 Madrid' },
  { slug: 'villaverde', name: 'Villaverde', address: 'Calle de Villaverde 1, 28021 Madrid' },
  { slug: 'san-blas', name: 'San Blas Canillejas', address: 'Calle de Canillejas 1, 28022 Madrid' },
  { slug: 'ciudad-lineal', name: 'Ciudad Lineal', address: 'Calle de Arturo Soria 1, 28017 Madrid' },
  { slug: 'chamartin', name: 'Chamartin', address: 'Calle de Alberto Alcocer 1, 28016 Madrid' },
  { slug: 'villa-de-vallecas', name: 'Villa de Vallecas', address: 'Calle de Vallecas 1, 28053 Madrid' },
  { slug: 'parla', name: 'Parla', address: 'Plaza Mayor 1, 28980 Parla' },
  { slug: 'pinto', name: 'Pinto', address: 'Calle Mayor 1, 28320 Pinto' },
  { slug: 'arganda-del-rey', name: 'Arganda del Rey', address: 'Calle Mayor 1, 28500 Arganda del Rey' },
  { slug: 'rivas-vaciamadrid', name: 'Rivas-Vaciamadrid', address: 'Calle Mayor 1, 28522 Rivas-Vaciamadrid' },
  { slug: 'coslada', name: 'Coslada', address: 'Calle Mayor 1, 28820 Coslada' },
  { slug: 'san-fernando-de-henares', name: 'San Fernando de Henares', address: 'Calle Mayor 1, 28830 San Fernando de Henares' },
  { slug: 'majadahonda', name: 'Majadahonda', address: 'Calle Mayor 1, 28220 Majadahonda' },
  { slug: 'boadilla-del-monte', name: 'Boadilla del Monte', address: 'Calle Mayor 1, 28660 Boadilla del Monte' },
  { slug: 'tres-cantos', name: 'Tres Cantos', address: 'Calle Mayor 1, 28760 Tres Cantos' },
  { slug: 'alcala-de-henares', name: 'Alcala de Henares', address: 'Calle Mayor 1, 28801 Alcala de Henares' },
  { slug: 'mostoles', name: 'Mostoles', address: 'Calle Pradillo 1, 28933 Mostoles' },
  { slug: 'getafe', name: 'Getafe', address: 'Plaza de la Constitucion 1, 28901 Getafe' },
  { slug: 'alcorcon', name: 'Alcorcon', address: 'Calle Mayor 1, 28920 Alcorcon' },
  { slug: 'leganes', name: 'Leganes', address: 'Plaza Mayor 1, 28911 Leganes' },
  { slug: 'torrejon-de-ardoz', name: 'Torrejon de Ardoz', address: 'Calle Mayor 1, 28850 Torrejon de Ardoz' },
  { slug: 'alcobendas', name: 'Alcobendas', address: 'Plaza Mayor 1, 28100 Alcobendas' },
  { slug: 'pozuelo-de-alarcon', name: 'Pozuelo de Alarcon', address: 'Calle Mayor 1, 28223 Pozuelo de Alarcon' },
  { slug: 'las-rozas', name: 'Las Rozas', address: 'Calle Mayor 1, 28231 Las Rozas' },
  { slug: 'collado-villalba', name: 'Collado Villalba', address: 'Calle Mayor 1, 28400 Collado Villalba' },
  { slug: 'torrelodones', name: 'Torrelodones', address: 'Calle Mayor 1, 28250 Torrelodones' },
  { slug: 'galapagar', name: 'Galapagar', address: 'Calle Mayor 1, 28260 Galapagar' },
  { slug: 'colmenar-viejo', name: 'Colmenar Viejo', address: 'Calle Mayor 1, 28770 Colmenar Viejo' },
  { slug: 'navalcarnero', name: 'Navalcarnero', address: 'Calle Mayor 1, 28600 Navalcarnero' },
  { slug: 'aranjuez', name: 'Aranjuez', address: 'Plaza de San Antonio 1, 28300 Aranjuez' },
  { slug: 'valdemoro', name: 'Valdemoro', address: 'Calle Mayor 1, 28340 Valdemoro' },
  { slug: 'ciempozuelos', name: 'Ciempozuelos', address: 'Calle Mayor 1, 28350 Ciempozuelos' },
  { slug: 'paracuellos-de-jarama', name: 'Paracuellos de Jarama', address: 'Calle Mayor 1, 28860 Paracuellos de Jarama' },
  { slug: 'algete', name: 'Algete', address: 'Calle Mayor 1, 28110 Algete' },
  { slug: 'el-escorial', name: 'El Escorial', address: 'Calle Mayor 1, 28280 El Escorial' },
  { slug: 'brunete', name: 'Brunete', address: 'Calle Mayor 1, 28690 Brunete' },
  { slug: 'villanueva-de-la-canada', name: 'Villanueva de la Canada', address: 'Calle Mayor 1, 28691 Villanueva de la Canada' },
  { slug: 'meco', name: 'Meco', address: 'Calle Mayor 1, 28880 Meco' },
  { slug: 'mejorada-del-campo', name: 'Mejorada del Campo', address: 'Calle Mayor 1, 28840 Mejorada del Campo' },
  { slug: 'loeches', name: 'Loeches', address: 'Calle Mayor 1, 28890 Loeches' },
  { slug: 'torres-de-la-alameda', name: 'Torres de la Alameda', address: 'Calle Mayor 1, 28813 Torres de la Alameda' },
  { slug: 'nuevo-baztan', name: 'Nuevo Baztan', address: 'Calle Mayor 1, 28514 Nuevo Baztan' },
  { slug: 'campo-real', name: 'Campo Real', address: 'Calle Mayor 1, 28510 Campo Real' },
  { slug: 'villaconejos', name: 'Villaconejos', address: 'Calle Mayor 1, 28380 Villaconejos' },
  { slug: 'titulcia', name: 'Titulcia', address: 'Calle Mayor 1, 28359 Titulcia' },
  { slug: 'cubas-de-la-sagra', name: 'Cubas de la Sagra', address: 'Calle Mayor 1, 28816 Cubas de la Sagra' },
  { slug: 'humanes-de-madrid', name: 'Humanes de Madrid', address: 'Calle Mayor 1, 28970 Humanes de Madrid' },
  { slug: 'grinon', name: 'Grinon', address: 'Calle Mayor 1, 28971 Grinon' },
  { slug: 'batres', name: 'Batres', address: 'Calle Mayor 1, 28977 Batres' },
  { slug: 'torrejon-de-la-calzada', name: 'Torrejon de la Calzada', address: 'Calle Mayor 1, 28981 Torrejon de la Calzada' },
  { slug: 'torrejon-de-velasco', name: 'Torrejon de Velasco', address: 'Calle Mayor 1, 28983 Torrejon de Velasco' },
  { slug: 'serranillos-del-valle', name: 'Serranillos del Valle', address: 'Calle Mayor 1, 28979 Serranillos del Valle' },
  { slug: 'daganzo-de-arriba', name: 'Daganzo de Arriba', address: 'Calle Mayor 1, 28814 Daganzo de Arriba' },
  { slug: 'ajalvir', name: 'Ajalvir', address: 'Calle Mayor 1, 28864 Ajalvir' },
  { slug: 'cobena', name: 'Cobena', address: 'Calle Mayor 1, 28863 Cobena' },
  { slug: 'san-sebastian-de-los-reyes', name: 'San Sebastian de los Reyes', address: 'Calle Mayor 1, 28700 San Sebastian de los Reyes' },
  { slug: 'moraleja-de-enmedio', name: 'Moraleja de Enmedio', address: 'Calle Mayor 1, 28950 Moraleja de Enmedio' },
  { slug: 'el-molar', name: 'El Molar', address: 'Calle Mayor 1, 28710 El Molar' },
  { slug: 'guadalix-de-la-sierra', name: 'Guadalix de la Sierra', address: 'Calle Mayor 1, 28794 Guadalix de la Sierra' },
  { slug: 'miraflores-de-la-sierra', name: 'Miraflores de la Sierra', address: 'Calle Mayor 1, 28792 Miraflores de la Sierra' },
  { slug: 'villanueva-del-pardillo', name: 'Villanueva del Pardillo', address: 'Calle Mayor 1, 28229 Villanueva del Pardillo' },
  { slug: 'las-matas', name: 'Las Matas', address: 'Calle Mayor 1, 28290 Las Matas' },
  { slug: 'pedrezuela', name: 'Pedrezuela', address: 'Calle Mayor 1, 28723 Pedrezuela' },
  { slug: 'anchuelo', name: 'Anchuelo', address: 'Calle Mayor 1, 28840 Anchuelo' },
  { slug: 'olmeda-de-las-fuentes', name: 'Olmeda de las Fuentes', address: 'Calle Mayor 1, 28511 Olmeda de las Fuentes' },
  { slug: 'camarma-de-esteruelas', name: 'Camarma de Esteruelas', address: 'Calle Mayor 1, 28816 Camarma de Esteruelas' },
]

// Safe SQL string — no special chars that break postgres
function q(str) {
  return str.replace(/'/g, ' ').replace(/\n/g, ' ').replace(/\r/g, ' ')
}

function makeAreaSQL(area) {
  const n = area.name
  const s = area.slug
  const a = area.address

  const intro = q(`La reparacion de neumaticos de camion en ${n} es un servicio esencial para transportistas, empresas logisticas y autonomos que operan en la Comunidad de Madrid. Cuando un vehiculo pesado sufre un pinchazo en ${n}, la consecuencia inmediata es la inmovilizacion del camion y la perdida de tiempo de entrega. Nuestro equipo de tecnicos especializados en neumaticos de camion esta operativo las 24 horas del dia, los 7 dias de la semana, incluidos festivos, para desplazarse directamente hasta el lugar donde se encuentra tu vehiculo en ${n}. No importa si el pinchazo ocurre en plena autovia, en un poligono industrial o en cualquier calle de ${n}: nuestros tecnicos llegan hasta ti con todo el equipamiento necesario para resolver la averia in situ, sin necesidad de grua. El tiempo medio de llegada en ${n} es de 30 a 60 minutos desde que realizas la llamada. Si tienes una emergencia ahora mismo en ${n}, llama al +34 911 676 448 y un tecnico saldra hacia ti de inmediato.`)

  const body = q(`En ${n}, la actividad industrial y logistica genera un importante trafico de vehiculos pesados. Los camiones estan expuestos a pinchazos por objetos en la calzada, desgaste prematuro o sobrecargas. Contar con un servicio de reparacion de neumaticos de camion a domicilio en ${n} disponible 24 horas marca la diferencia. Nuestros tecnicos llegan equipados con compresores profesionales, herramientas de desmontaje para neumaticos de gran diametro y materiales de reparacion industrial. Evaluamos el estado del neumatico y determinamos si es posible una reparacion segura o si es necesaria la sustitucion. El trabajo se realiza directamente en ${n} sin traslado a taller. Emitimos factura para empresas y autonomos.`)

  const deep = q(`Servicio completo de reparacion de neumaticos de camion en ${n}. Los neumaticos de vehiculos pesados requieren herramientas especificas y experiencia real. Nuestro equipo lleva anos prestando servicio a transportistas en ${n} y toda la Comunidad de Madrid. Conocemos las rutas mas frecuentadas y los poligonos industriales de la zona. Trabajamos con todas las marcas: Michelin, Bridgestone, Continental, Goodyear, Pirelli, Yokohama, Dunlop y Hankook. Reparamos pinchazos cuando el dano esta en la banda de rodadura y no supera los 6 mm, mediante parche interior combinado con tapon de goma segun normas ETRTO. Para reventones graves procedemos a la sustitucion inmediata. Tambien: sustitucion de neumaticos desgastados, revision de presiones en toda la flota y asistencia por perdida lenta de presion. Cubrimos ${n} con tiempo de respuesta inferior a 60 minutos. Llama al +34 911 676 448 disponible 24 horas.`)

  const faq = q(`Q1: Cuanto tiempo tardan en llegar a ${n}?|A: El tiempo medio de llegada a ${n} es de 30 a 60 minutos desde que realizas la llamada.|||Q2: Vienen sin necesidad de grua a ${n}?|A: Si. Los tecnicos se desplazan hasta tu vehiculo en ${n} con todo el equipamiento necesario.|||Q3: El servicio en ${n} esta disponible por la noche?|A: Si, operativos 24 horas los 7 dias de la semana incluidos festivos.|||Q4: Que tipos de camiones atienden en ${n}?|A: Camiones rigidos, articulados, semirremolques, trailers, frigorificos y cisterna. Tambien furgonetas como servicio complementario.|||Q5: Puedo pedir presupuesto antes de que vengan a ${n}?|A: Si. Llamando al +34 911 676 448 te damos una estimacion antes de desplazarnos.|||Q6: Que ocurre si el neumatico no tiene reparacion en ${n}?|A: Procedemos a la sustitucion inmediata. Llevamos stock de los tamanos mas habituales.|||Q7: Emiten factura para empresas en ${n}?|A: Si, factura completa con IVA. Para flotas en ${n} podemos gestionar acuerdos de servicio.|||Q8: Atienden en poligonos industriales de ${n}?|A: Si, los poligonos son una de las zonas donde mas frecuentemente prestamos servicio.|||Q9: Cuanto cuesta reparar un pinchazo de camion en ${n}?|A: Depende del tipo de averia y la medida del neumatico. Llama al +34 911 676 448 para presupuesto sin compromiso.|||Q10: Tambien atienden furgonetas en ${n}?|A: Si, aunque la especialidad son camiones pesados, tambien atendemos furgonetas en ${n}.`)

  const blog = q(`Que hacer si tu camion tiene un pinchazo en ${n}. Un pinchazo de camion en ${n} puede ocurrir en cualquier momento: en plena autovia, en un poligono industrial o en el aparcamiento de un cliente. Paso 1: No frenes bruscamente. Si sientes que un neumatico se desinfla en ${n}, reduce la velocidad progresivamente y busca un lugar seguro donde detener el camion. Paso 2: Senaliza correctamente. Activa las luces de emergencia y coloca los triangulos de senalizacion a la distancia reglamentaria. Ponte el chaleco reflectante antes de salir de la cabina. Paso 3: Evalua el neumatico. Observa el estado visible desde una posicion segura. No intentes quitar ningun objeto incrustado. Anota la posicion del neumatico afectado. Paso 4: Llama a un servicio especializado. No intentes cambiar el neumatico de un camion pesado sin el equipamiento adecuado. Llama al +34 911 676 448, disponible las 24 horas, y un tecnico especializado se desplazara a tu posicion en ${n}. Paso 5: Facilita tu ubicacion exacta. Indica el nombre de la calle, carretera o punto kilometrico en ${n}. Consejos para prevenir pinchazos: revisa la presion semanalmente, inspecciona los neumaticos antes de cada ruta y respeta la carga maxima del vehiculo. Si tienes una emergencia en ${n} ahora mismo, llama al +34 911 676 448. Disponibles 24 horas, 365 dias al ano.`)

  const blogTitle = q(`Pinchazo de camion en ${n} que hacer y a quien llamar`)
  const blogExcerpt = q(`Guia completa para actuar si tu camion sufre un pinchazo en ${n}. Pasos de seguridad, a quien llamar y como minimizar el tiempo de parada.`)

  return `
INSERT INTO pages (slug,service_type,h1,meta_title,meta_description,intro,body_section,deep_section,address,city,district,status,indexed_google) VALUES ('neumaticos-camion/madrid/${s}','neumaticos-camion','Reparacion de Neumaticos de Camion en ${n} Servicio 24h','Reparacion Neumaticos Camion ${n} Servicio Urgente 24h Madrid','Pinchazo de camion en ${n}? Tecnicos disponibles 24h. Llegamos en 30-60 min. Llama: +34 911 676 448','${intro}','${body}','${deep}','${a}','${n}','Madrid','published',false) ON CONFLICT (slug) DO UPDATE SET h1=EXCLUDED.h1,meta_title=EXCLUDED.meta_title,meta_description=EXCLUDED.meta_description,intro=EXCLUDED.intro,body_section=EXCLUDED.body_section,deep_section=EXCLUDED.deep_section,status=EXCLUDED.status,updated_at=NOW();

INSERT INTO pages (slug,service_type,h1,meta_title,meta_description,body_section,address,city,district,status,indexed_google) VALUES ('neumaticos-camion/madrid/${s}/faq','neumaticos-camion','Preguntas Frecuentes Reparacion Neumaticos Camion en ${n}','FAQ Neumaticos Camion ${n} Preguntas Frecuentes 24h','Resolvemos tus dudas sobre reparacion de pinchazos de camion en ${n}. Servicio 24h. Tel: +34 911 676 448','${faq}','${a}','${n}','Madrid','published',false) ON CONFLICT (slug) DO UPDATE SET h1=EXCLUDED.h1,meta_title=EXCLUDED.meta_title,meta_description=EXCLUDED.meta_description,body_section=EXCLUDED.body_section,status=EXCLUDED.status,updated_at=NOW();

INSERT INTO blog_posts (slug,title,excerpt,content,meta_title,meta_desc,category,read_time,district,city,published_at) VALUES ('pinchazo-camion-${s}-que-hacer','${blogTitle}','${blogExcerpt}','${blog}','${blogTitle} Reparacion Pinchazos Camion 24h','${blogExcerpt}','pinchazos-madrid',6,'madrid','${s}',NOW()) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title,excerpt=EXCLUDED.excerpt,content=EXCLUDED.content,meta_title=EXCLUDED.meta_title,meta_desc=EXCLUDED.meta_desc;
`
}

// Split into chunks of 27 areas each (3 files)
const chunkSize = 27
for (let i = 0; i < MADRID_AREAS.length; i += chunkSize) {
  const chunk = MADRID_AREAS.slice(i, i + chunkSize)
  const partNum = Math.floor(i / chunkSize) + 1
  
  let sql = `-- DAY 1 MADRID - PART ${partNum} of 3 (areas ${i+1} to ${Math.min(i+chunkSize, MADRID_AREAS.length)})\n`
  
  // Add hub to part 1
  if (partNum === 1) {
    sql += `INSERT INTO pages (slug,service_type,h1,meta_title,meta_description,intro,body_section,deep_section,address,city,district,status,indexed_google) VALUES ('neumaticos-camion/madrid','neumaticos-camion','Reparacion de Neumaticos de Camion en Madrid Servicio Urgente 24h','Reparacion Neumaticos Camion Madrid Servicio 24h Toda la Provincia','Servicio urgente de reparacion de pinchazos de camion en Madrid y toda la provincia. Tecnicos 24h. 30-60 min llegada. +34 911 676 448','Somos el servicio de referencia para la reparacion urgente de neumaticos de camion en Madrid y toda su area metropolitana. Disponibles 24 horas, 365 dias, para desplazarnos hasta la posicion exacta de tu vehiculo sin necesidad de grua ni traslado a taller. Cubrimos todos los barrios de Madrid capital, todos los municipios del area metropolitana y los principales poligonos industriales de la provincia.','Nuestros tecnicos especializados en vehiculos pesados trabajan con camiones de todos los tipos y marcas de neumaticos. Tiempo medio de llegada de 30 a 60 minutos en toda la provincia de Madrid.','Reparacion de neumaticos de camion en toda la provincia de Madrid. Madrid es el mayor nodo logistico de Espana. La concentracion de poligonos industriales, centros de distribucion y plataformas logisticas hace que la provincia de Madrid sea una de las areas con mayor demanda de servicios de reparacion de neumaticos de camion urgentes. Nuestro equipo cubre toda la provincia con tecnicos distribuidos estrategicamente para garantizar tiempos de llegada inferiores a 60 minutos.','Calle Gran Via 1, 28013 Madrid','Madrid','Madrid','published',false) ON CONFLICT (slug) DO UPDATE SET h1=EXCLUDED.h1,meta_title=EXCLUDED.meta_title,status=EXCLUDED.status,updated_at=NOW();\n`
  }

  for (const area of chunk) {
    sql += makeAreaSQL(area)
  }

  const filename = `/mnt/user-data/outputs/day1-madrid-part${partNum}.sql`
  fs.writeFileSync(filename, sql)
  console.log(`✅ Part ${partNum}: ${chunk.length} areas → ${chunk.length * 3} pages → ${filename}`)
}

console.log(`\n📊 TOTAL: ${MADRID_AREAS.length * 3 + 1} pages across 3 files`)
