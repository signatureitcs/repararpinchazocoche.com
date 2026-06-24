const fs = require('fs')

const VALENCIA_AREAS = [
  { slug: 'ciutat-vella-valencia', name: 'Ciutat Vella Valencia', address: 'Carrer de la Llotja 1, 46001 Valencia', district: 'Valencia' },
  { slug: 'eixample-valencia', name: 'Eixample Valencia', address: 'Carrer de Colon 1, 46004 Valencia', district: 'Valencia' },
  { slug: 'campanar', name: 'Campanar', address: 'Carrer de Campanar 1, 46015 Valencia', district: 'Valencia' },
  { slug: 'rascanya', name: 'Rascanya', address: 'Carrer de Burjassot 1, 46025 Valencia', district: 'Valencia' },
  { slug: 'benimaclet', name: 'Benimaclet', address: 'Carrer de Benimaclet 1, 46020 Valencia', district: 'Valencia' },
  { slug: 'torrent', name: 'Torrent', address: 'Carrer Mayor 1, 46900 Torrent', district: 'Valencia' },
  { slug: 'gandia', name: 'Gandia', address: 'Carrer Mayor 1, 46700 Gandia', district: 'Valencia' },
  { slug: 'sagunto', name: 'Sagunto', address: 'Carrer Mayor 1, 46500 Sagunto', district: 'Valencia' },
  { slug: 'paterna', name: 'Paterna', address: 'Carrer Mayor 1, 46980 Paterna', district: 'Valencia' },
  { slug: 'burjassot', name: 'Burjassot', address: 'Carrer Mayor 1, 46100 Burjassot', district: 'Valencia' },
  { slug: 'mislata', name: 'Mislata', address: 'Carrer Mayor 1, 46920 Mislata', district: 'Valencia' },
  { slug: 'quart-de-poblet', name: 'Quart de Poblet', address: 'Carrer Mayor 1, 46930 Quart de Poblet', district: 'Valencia' },
  { slug: 'manises', name: 'Manises', address: 'Carrer Mayor 1, 46940 Manises', district: 'Valencia' },
  { slug: 'aldaia', name: 'Aldaia', address: 'Carrer Mayor 1, 46960 Aldaia', district: 'Valencia' },
  { slug: 'xirivella', name: 'Xirivella', address: 'Carrer Mayor 1, 46950 Xirivella', district: 'Valencia' },
  { slug: 'alaquás', name: 'Alaquas', address: 'Carrer Mayor 1, 46970 Alaquas', district: 'Valencia' },
  { slug: 'picanya', name: 'Picanya', address: 'Carrer Mayor 1, 46991 Picanya', district: 'Valencia' },
  { slug: 'paiporta', name: 'Paiporta', address: 'Carrer Mayor 1, 46900 Paiporta', district: 'Valencia' },
  { slug: 'sedavi', name: 'Sedavi', address: 'Carrer Mayor 1, 46910 Sedavi', district: 'Valencia' },
  { slug: 'alfafar', name: 'Alfafar', address: 'Carrer Mayor 1, 46910 Alfafar', district: 'Valencia' },
  { slug: 'benetusser', name: 'Benetusser', address: 'Carrer Mayor 1, 46911 Benetusser', district: 'Valencia' },
  { slug: 'massanassa', name: 'Massanassa', address: 'Carrer Mayor 1, 46912 Massanassa', district: 'Valencia' },
  { slug: 'catarroja', name: 'Catarroja', address: 'Carrer Mayor 1, 46470 Catarroja', district: 'Valencia' },
  { slug: 'albal', name: 'Albal', address: 'Carrer Mayor 1, 46940 Albal', district: 'Valencia' },
  { slug: 'silla', name: 'Silla', address: 'Carrer Mayor 1, 46460 Silla', district: 'Valencia' },
  { slug: 'sollana', name: 'Sollana', address: 'Carrer Mayor 1, 46420 Sollana', district: 'Valencia' },
  { slug: 'sueca', name: 'Sueca', address: 'Carrer Mayor 1, 46430 Sueca', district: 'Valencia' },
  { slug: 'cullera', name: 'Cullera', address: 'Carrer Mayor 1, 46400 Cullera', district: 'Valencia' },
  { slug: 'alzira', name: 'Alzira', address: 'Carrer Mayor 1, 46600 Alzira', district: 'Valencia' },
  { slug: 'algemesi', name: 'Algemesi', address: 'Carrer Mayor 1, 46680 Algemesi', district: 'Valencia' },
  { slug: 'carlet', name: 'Carlet', address: 'Carrer Mayor 1, 46620 Carlet', district: 'Valencia' },
  { slug: 'montserrat-valencia', name: 'Montserrat Valencia', address: 'Carrer Mayor 1, 46670 Montserrat', district: 'Valencia' },
  { slug: 'picassent', name: 'Picassent', address: 'Carrer Mayor 1, 46650 Picassent', district: 'Valencia' },
  { slug: 'tueris', name: 'Tueris', address: 'Carrer Mayor 1, 46640 Tueris', district: 'Valencia' },
  { slug: 'cheste', name: 'Cheste', address: 'Carrer Mayor 1, 46550 Cheste', district: 'Valencia' },
  { slug: 'chiva', name: 'Chiva', address: 'Carrer Mayor 1, 46540 Chiva', district: 'Valencia' },
  { slug: 'bunyol', name: 'Bunyol', address: 'Carrer Mayor 1, 46360 Bunyol', district: 'Valencia' },
  { slug: 'llíria', name: 'Llíria', address: 'Carrer Mayor 1, 46160 Llíria', district: 'Valencia' },
  { slug: 'riba-roja-de-túria', name: 'Riba roja de Túria', address: 'Carrer Mayor 1, 46190 Riba roja de Túria', district: 'Valencia' },
]

const SEVILLA_AREAS = [
  { slug: 'triana', name: 'Triana', address: 'Calle Betis 1, 41010 Sevilla', district: 'Sevilla' },
  { slug: 'macarena', name: 'Macarena', address: 'Calle San Luis 1, 41003 Sevilla', district: 'Sevilla' },
  { slug: 'centro-sevilla', name: 'Centro Sevilla', address: 'Avenida de la Constitucion 1, 41004 Sevilla', district: 'Sevilla' },
  { slug: 'nervion', name: 'Nervion', address: 'Avenida de Luis Montoto 1, 41005 Sevilla', district: 'Sevilla' },
  { slug: 'cerro-amate', name: 'Cerro Amate', address: 'Calle San Juan de la Cruz 1, 41006 Sevilla', district: 'Sevilla' },
  { slug: 'dos-hermanas', name: 'Dos Hermanas', address: 'Avenida de la Libertad 1, 41700 Dos Hermanas', district: 'Sevilla' },
  { slug: 'alcala-de-guadaira', name: 'Alcala de Guadaira', address: 'Calle Real 1, 41500 Alcala de Guadaira', district: 'Sevilla' },
  { slug: 'mairena-del-aljarafe', name: 'Mairena del Aljarafe', address: 'Calle Mayor 1, 41940 Mairena del Aljarafe', district: 'Sevilla' },
  { slug: 'san-juan-de-aznalfarache', name: 'San Juan de Aznalfarache', address: 'Calle Mayor 1, 41920 San Juan de Aznalfarache', district: 'Sevilla' },
  { slug: 'bormujos', name: 'Bormujos', address: 'Calle Mayor 1, 41930 Bormujos', district: 'Sevilla' },
  { slug: 'tomares', name: 'Tomares', address: 'Calle Mayor 1, 41940 Tomares', district: 'Sevilla' },
  { slug: 'camas', name: 'Camas', address: 'Calle Mayor 1, 41940 Camas', district: 'Sevilla' },
  { slug: 'santiponce', name: 'Santiponce', address: 'Calle Mayor 1, 41940 Santiponce', district: 'Sevilla' },
  { slug: 'gines', name: 'Gines', address: 'Calle Mayor 1, 41940 Gines', district: 'Sevilla' },
  { slug: 'castilleja-de-la-cuesta', name: 'Castilleja de la Cuesta', address: 'Calle Mayor 1, 41940 Castilleja de la Cuesta', district: 'Sevilla' },
  { slug: 'espartinas', name: 'Espartinas', address: 'Calle Mayor 1, 41940 Espartinas', district: 'Sevilla' },
  { slug: 'umbrete', name: 'Umbrete', address: 'Calle Mayor 1, 41940 Umbrete', district: 'Sevilla' },
  { slug: 'bollullos-de-la-mitacion', name: 'Bollullos de la Mitacion', address: 'Calle Mayor 1, 41940 Bollullos de la Mitacion', district: 'Sevilla' },
  { slug: 'benacazon', name: 'Benacazon', address: 'Calle Mayor 1, 41940 Benacazon', district: 'Sevilla' },
  { slug: 'sanlucar-la-mayor', name: 'Sanlucar la Mayor', address: 'Calle Mayor 1, 41940 Sanlucar la Mayor', district: 'Sevilla' },
  { slug: 'guillena', name: 'Guillena', address: 'Calle Mayor 1, 41940 Guillena', district: 'Sevilla' },
  { slug: 'la-rinconada', name: 'La Rinconada', address: 'Calle Mayor 1, 41940 La Rinconada', district: 'Sevilla' },
  { slug: 'alcala-del-rio', name: 'Alcala del Rio', address: 'Calle Mayor 1, 41940 Alcala del Rio', district: 'Sevilla' },
  { slug: 'brenes', name: 'Brenes', address: 'Calle Mayor 1, 41940 Brenes', district: 'Sevilla' },
  { slug: 'la-algaba', name: 'La Algaba', address: 'Calle Mayor 1, 41940 La Algaba', district: 'Sevilla' },
  { slug: 'coria-del-rio', name: 'Coria del Rio', address: 'Calle Mayor 1, 41940 Coria del Rio', district: 'Sevilla' },
  { slug: 'puebla-del-rio', name: 'Puebla del Rio', address: 'Calle Mayor 1, 41940 Puebla del Rio', district: 'Sevilla' },
  { slug: 'utrera', name: 'Utrera', address: 'Calle Mayor 1, 41940 Utrera', district: 'Sevilla' },
  { slug: 'los-palacios-y-villafranca', name: 'Los Palacios y Villafranca', address: 'Calle Mayor 1, 41940 Los Palacios y Villafranca', district: 'Sevilla' },
  { slug: 'las-cabezas-de-san-juan', name: 'Las Cabezas de San Juan', address: 'Calle Mayor 1, 41940 Las Cabezas de San Juan', district: 'Sevilla' },
  { slug: 'lebrija', name: 'Lebrija', address: 'Calle Mayor 1, 41940 Lebrija', district: 'Sevilla' },
  { slug: 'moron-de-la-frontera', name: 'Moron de la Frontera', address: 'Calle Mayor 1, 41940 Moron de la Frontera', district: 'Sevilla' },
  { slug: 'arahal', name: 'Arahal', address: 'Calle Mayor 1, 41940 Arahal', district: 'Sevilla' },
  { slug: 'marchena', name: 'Marchena', address: 'Calle Mayor 1, 41940 Marchena', district: 'Sevilla' },
  { slug: 'ecija', name: 'Ecija', address: 'Calle Mayor 1, 41940 Ecija', district: 'Sevilla' },
  { slug: 'osuna', name: 'Osuna', address: 'Calle Mayor 1, 41940 Osuna', district: 'Sevilla' },
  { slug: 'estepa', name: 'Estepa', address: 'Calle Mayor 1, 41940 Estepa', district: 'Sevilla' },
  { slug: 'carmona', name: 'Carmona', address: 'Calle Mayor 1, 41940 Carmona', district: 'Sevilla' },
  { slug: 'mairena-del-alcor', name: 'Mairena del Alcor', address: 'Calle Mayor 1, 41940 Mairena del Alcor', district: 'Sevilla' },
  { slug: 'el-viso-del-alcor', name: 'El Viso del Alcor', address: 'Calle Mayor 1, 41940 El Viso del Alcor', district: 'Sevilla' },
]

function q(str) {
  return str.replace(/'/g, ' ').replace(/\n/g, ' ').replace(/\r/g, ' ')
}

function makeAreaSQL(area) {
  const n = area.name
  const s = area.slug
  const a = area.address
  const d = area.district

  const intro = q(`La reparacion de neumaticos de camion en ${n} es un servicio esencial para todos los transportistas y empresas logisticas que operan en la provincia de ${d}. Cuando un camion sufre un pinchazo en ${n}, cada minuto de parada representa perdidas economicas para el transportista. Nuestro equipo de tecnicos especializados en neumaticos de vehiculos pesados esta disponible 24 horas del dia para desplazarse directamente hasta tu camion en ${n} sin necesidad de grua ni traslado a taller. Atendemos todo tipo de camiones: rigidos, articulados, semirremolques y trailers. El tiempo medio de llegada en ${n} es de 30 a 60 minutos desde que realizas la llamada. Llama ahora al +34 911 676 448.`)

  const body = q(`El trafico de vehiculos pesados en ${n} es constante a lo largo del dia. Los pinchazos pueden producirse por objetos metalicos, sobrecargas o desgaste del neumatico. Nuestro servicio de reparacion a domicilio en ${n} garantiza respuesta rapida con tecnicos equipados con compresores industriales, desmontadoras portatiles, parches de reparacion homologados y stock de neumaticos en los tamanos mas comunes. Diagnosticamos la averia, reparamos si es posible o sustituimos el neumatico si el dano es irreparable. Emitimos factura con IVA.`)

  const deep = q(`Servicio de reparacion de neumaticos de camion en ${n}. Nuestros tecnicos trabajan con todas las marcas: Michelin, Bridgestone, Continental, Goodyear, Pirelli, Yokohama, Dunlop y Hankook. Reparamos pinchazos en la banda de rodadura hasta 6 mm de diametro mediante parche interior y tapon combinados segun norma ETRTO. Para reventones procedemos a la sustitucion inmediata. Cobertura en ${n} y municipios del entorno con tiempo inferior a 60 minutos. Disponibles para flotas de transporte, empresas de distribucion y transportistas autonomos. Llama al +34 911 676 448 disponible 24 horas.`)

  const faq = q(`Q1: Cuanto tiempo tardan en llegar a ${n}?|A: El tiempo medio de llegada a ${n} es de 30 a 60 minutos desde que realizas la llamada.|||Q2: Reparan neumaticos de camion en ${n} sin necesidad de grua?|A: Si, nos desplazamos hasta tu camion en ${n} con todo el equipamiento necesario.|||Q3: El servicio en ${n} esta disponible 24 horas?|A: Si, disponibles las 24 horas los 7 dias de la semana incluidos festivos.|||Q4: Que tipos de camiones atienden?|A: Camiones rigidos, articulados, semirremolques y trailers. Tambien furgonetas como servicio complementario.|||Q5: Puedo pedir presupuesto?|A: Si. Llama al +34 911 676 448 y te damos una estimacion antes de desplazarnos.|||Q6: Que pasa si el neumatico no tiene reparacion?|A: Procedemos a la sustitucion inmediata. Llevamos stock de los tamanos mas habituales.|||Q7: Emiten factura para empresas?|A: Si, factura completa con IVA. Podemos gestionar acuerdos para flotas.|||Q8: Atienden en poligonos industriales?|A: Si, los poligonos son una de nuestras zonas de servicio mas frecuentes.|||Q9: Cuanto cuesta?|A: Depende del tipo de averia. Llama para presupuesto sin compromiso.|||Q10: Tambien atienden furgonetas?|A: Si, furgonetas y vehiculos comerciales ligeros tambien.`)

  const blog = q(`Que hacer si tu camion tiene un pinchazo en ${n}. Un pinchazo de camion en ${n} puede ocurrir en cualquier momento. Paso 1: No frenes bruscamente. Mantén el control, reduce la velocidad progresivamente y busca un lugar seguro. Paso 2: Senaliza correctamente. Activa luces de emergencia y coloca triangulos de senalizacion. Ponte el chaleco reflectante. Paso 3: Evalua el neumatico desde una posicion segura. Identifica cual es el neumatico afectado. No intentes extraer ningun objeto. Paso 4: Llama a un especialista en ${n}. Los neumaticos de camion pesado requieren equipamiento especifico. Llama al +34 911 676 448, disponible 24 horas. Paso 5: Indica tu posicion exacta en ${n}. Da el nombre de la via, punto kilometrico o coordenadas GPS. Tiempo estimado de llegada en ${n}: 30-60 minutos. Consejos: revisa la presion semanalmente, inspecciona el estado antes de cada ruta, respeta la carga maxima y sustituye los neumaticos antes del minimo legal. Llama al +34 911 676 448 si tienes emergencia.`)

  const blogTitle = q(`Pinchazo de camion en ${n} que hacer y a quien llamar`)
  const blogExcerpt = q(`Guia completa para actuar ante un pinchazo de camion en ${n}. Pasos de seguridad, consejos y numero de asistencia 24h.`)

  return `
INSERT INTO pages (slug,service_type,h1,meta_title,meta_description,intro,body_section,deep_section,address,city,district,status,indexed_google) VALUES ('neumaticos-camion/${d.toLowerCase()}/${s}','neumaticos-camion','Reparacion de Neumaticos de Camion en ${n} Servicio 24h','Reparacion Neumaticos Camion ${n} Servicio Urgente 24h ${d}','Pinchazo de camion en ${n}? Tecnicos 24h. Llegamos en 30-60 min. Sin grua. +34 911 676 448','${intro}','${body}','${deep}','${a}','${n}','${d}','published',false) ON CONFLICT (slug) DO UPDATE SET h1=EXCLUDED.h1,meta_title=EXCLUDED.meta_title,status=EXCLUDED.status,updated_at=NOW();

INSERT INTO pages (slug,service_type,h1,meta_title,meta_description,body_section,address,city,district,status,indexed_google) VALUES ('neumaticos-camion/${d.toLowerCase()}/${s}/faq','neumaticos-camion','Preguntas Frecuentes Reparacion Neumaticos Camion en ${n}','FAQ Neumaticos Camion ${n} Preguntas Frecuentes 24h','Dudas sobre reparacion de pinchazos de camion en ${n}? Servicio 24h. Tel: +34 911 676 448','${faq}','${a}','${n}','${d}','published',false) ON CONFLICT (slug) DO UPDATE SET h1=EXCLUDED.h1,status=EXCLUDED.status,updated_at=NOW();

INSERT INTO blog_posts (slug,title,excerpt,content,meta_title,meta_desc,category,read_time,district,city,published_at) VALUES ('pinchazo-camion-${s}-que-hacer','${blogTitle}','${blogExcerpt}','${blog}','${blogTitle} Reparacion Pinchazos 24h','${blogExcerpt}','pinchazos-dia3',6,'${d.toLowerCase()}','${s}',NOW()) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title,content=EXCLUDED.content;
`
}

const ALL_AREAS = [...VALENCIA_AREAS, ...SEVILLA_AREAS]
const chunkSize = 28

for (let i = 0; i < ALL_AREAS.length; i += chunkSize) {
  const chunk = ALL_AREAS.slice(i, i + chunkSize)
  const partNum = Math.floor(i / chunkSize) + 1
  let sql = `-- DAY 3 VALENCIA + SEVILLA - PART ${partNum} of 3 (areas ${i+1} to ${Math.min(i+chunkSize, ALL_AREAS.length)})\n`
  
  if (partNum === 1) {
    sql += `INSERT INTO pages (slug,service_type,h1,meta_title,meta_description,intro,body_section,deep_section,address,city,district,status,indexed_google) VALUES ('neumaticos-camion/valencia','neumaticos-camion','Reparacion de Neumaticos de Camion en Valencia Servicio 24h','Reparacion Neumaticos Camion Valencia Servicio 24h Toda la Provincia','Servicio urgente en Valencia y toda la provincia. Tecnicos 24h. Llegamos en 30-60 min. +34 911 676 448','Especialistas en reparacion de neumaticos de camion en Valencia y su area metropolitana. Disponibles 24 horas para desplazarnos hasta tu vehiculo sin necesidad de grua ni traslado a taller. Cubrimos toda la provincia de Valencia.','Nuestros tecnicos trabajan con camiones de todos los tipos. La provincia de Valencia concentra importantes poligonos industriales y puertos de carga.','Reparacion de neumaticos de camion en toda la provincia de Valencia. La actividad portuaria y logistica genera constante trafico de camiones que hace imprescindible un servicio urgente disponible 24 horas.','Carrer de la Llotja 1, 46001 Valencia','Valencia','Valencia','published',false) ON CONFLICT (slug) DO UPDATE SET h1=EXCLUDED.h1,status=EXCLUDED.status,updated_at=NOW();\n`
    sql += `INSERT INTO pages (slug,service_type,h1,meta_title,meta_description,intro,body_section,deep_section,address,city,district,status,indexed_google) VALUES ('neumaticos-camion/sevilla','neumaticos-camion','Reparacion de Neumaticos de Camion en Sevilla Servicio 24h','Reparacion Neumaticos Camion Sevilla Servicio 24h Toda la Provincia','Servicio urgente en Sevilla y toda la provincia. Tecnicos 24h. Llegamos en 30-60 min. +34 911 676 448','Especialistas en reparacion de neumaticos de camion en Sevilla y su area metropolitana. Disponibles 24 horas para desplazarnos hasta tu vehiculo. Cubrimos toda la provincia de Sevilla.','Nuestros tecnicos trabajan con camiones de todos los tipos. Sevilla es un importante nodo logistico de Andalucia.','Reparacion de neumaticos de camion en toda la provincia de Sevilla. Servicio urgente disponible 24 horas en cualquier punto de la provincia.','Avenida de la Constitucion 1, 41004 Sevilla','Sevilla','Sevilla','published',false) ON CONFLICT (slug) DO UPDATE SET h1=EXCLUDED.h1,status=EXCLUDED.status,updated_at=NOW();\n`
  }
  
  for (const area of chunk) sql += makeAreaSQL(area)
  
  const filename = `/mnt/user-data/outputs/day3-part${partNum}.sql`
  fs.writeFileSync(filename, sql)
  console.log(`✅ Part ${partNum}: ${chunk.length} areas → ${chunk.length * 3} pages`)
}

console.log(`\n📊 TOTAL Day 3: ${ALL_AREAS.length * 3 + 2} pages (${VALENCIA_AREAS.length} Valencia + ${SEVILLA_AREAS.length} Sevilla areas + 2 hubs)`)
