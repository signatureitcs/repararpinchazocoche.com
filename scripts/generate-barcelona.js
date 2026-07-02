const fs = require('fs')

const BARCELONA_AREAS = [
  { slug: 'eixample', name: 'Eixample', address: 'Carrer del Consell de Cent 1, 08011 Barcelona' },
  { slug: 'gracia', name: 'Gracia', address: 'Carrer de Gracia 1, 08012 Barcelona' },
  { slug: 'sant-marti', name: 'Sant Marti', address: 'Rambla del Poblenou 1, 08005 Barcelona' },
  { slug: 'sants-montjuic', name: 'Sants Montjuic', address: 'Carrer de Sants 1, 08014 Barcelona' },
  { slug: 'horta-guinardo', name: 'Horta Guinardo', address: 'Carrer del Carmel 1, 08032 Barcelona' },
  { slug: 'nou-barris', name: 'Nou Barris', address: 'Passeig de Valldaura 1, 08042 Barcelona' },
  { slug: 'sant-andreu', name: 'Sant Andreu', address: 'Passeig de Torres i Bages 1, 08030 Barcelona' },
  { slug: 'les-corts', name: 'Les Corts', address: 'Carrer de les Corts 1, 08028 Barcelona' },
  { slug: 'sarria-sant-gervasi', name: 'Sarria Sant Gervasi', address: 'Carrer de Sarria 1, 08017 Barcelona' },
  { slug: 'ciutat-vella', name: 'Ciutat Vella', address: 'Carrer de la Llotja 1, 08001 Barcelona' },
  { slug: 'hospitalet-de-llobregat', name: 'Hospitalet de Llobregat', address: 'Avinguda de la Granvia 1, 08901 Hospitalet' },
  { slug: 'badalona', name: 'Badalona', address: 'Carrer del Mar 1, 08911 Badalona' },
  { slug: 'sabadell', name: 'Sabadell', address: 'Carrer de la Salut 1, 08201 Sabadell' },
  { slug: 'terrassa', name: 'Terrassa', address: 'Carrer de la Rutlla 1, 08221 Terrassa' },
  { slug: 'mataro', name: 'Mataro', address: 'Carrer de Barcelona 1, 08301 Mataro' },
  { slug: 'santa-coloma-de-gramenet', name: 'Santa Coloma de Gramenet', address: 'Carrer Major 1, 08921 Santa Coloma de Gramenet' },
  { slug: 'cornella-de-llobregat', name: 'Cornella de Llobregat', address: 'Carrer de Sant Ildefons 1, 08940 Cornella' },
  { slug: 'sant-boi-de-llobregat', name: 'Sant Boi de Llobregat', address: 'Carrer Major 1, 08830 Sant Boi' },
  { slug: 'rubi', name: 'Rubi', address: 'Carrer de Colom 1, 08191 Rubi' },
  { slug: 'cerdanyola-del-valles', name: 'Cerdanyola del Valles', address: 'Carrer de Colon 1, 08290 Cerdanyola' },
  { slug: 'viladecans', name: 'Viladecans', address: 'Carrer Major 1, 08840 Viladecans' },
  { slug: 'gava', name: 'Gava', address: 'Carrer Major 1, 08850 Gava' },
  { slug: 'castelldefels', name: 'Castelldefels', address: 'Carrer Nuria 1, 08860 Castelldefels' },
  { slug: 'el-prat-de-llobregat', name: 'El Prat de Llobregat', address: 'Carrer Major 1, 08820 El Prat' },
  { slug: 'esplugues-de-llobregat', name: 'Esplugues de Llobregat', address: 'Carrer Major 1, 08950 Esplugues' },
  { slug: 'sant-joan-despi', name: 'Sant Joan Despi', address: 'Carrer Major 1, 08970 Sant Joan Despi' },
  { slug: 'molins-de-rei', name: 'Molins de Rei', address: 'Carrer Major 1, 08750 Molins de Rei' },
  { slug: 'sant-vincenc-dels-horts', name: 'Sant Vincenc dels Horts', address: 'Carrer Major 1, 08620 Sant Vincenc dels Horts' },
  { slug: 'palleja', name: 'Palleja', address: 'Carrer Major 1, 08780 Palleja' },
  { slug: 'cervellon', name: 'Cervellon', address: 'Carrer Major 1, 08758 Cervellon' },
  { slug: 'olesa-de-montserrat', name: 'Olesa de Montserrat', address: 'Carrer Major 1, 08640 Olesa de Montserrat' },
  { slug: 'martorell', name: 'Martorell', address: 'Carrer Major 1, 08760 Martorell' },
  { slug: 'abrera', name: 'Abrera', address: 'Carrer Major 1, 08630 Abrera' },
  { slug: 'esparreguera', name: 'Esparreguera', address: 'Carrer Major 1, 08292 Esparreguera' },
  { slug: 'sant-andreu-de-la-barca', name: 'Sant Andreu de la Barca', address: 'Carrer Major 1, 08740 Sant Andreu de la Barca' },
  { slug: 'granollers', name: 'Granollers', address: 'Carrer Major 1, 08400 Granollers' },
  { slug: 'mollet-del-valles', name: 'Mollet del Valles', address: 'Carrer Major 1, 08100 Mollet del Valles' },
  { slug: 'parets-del-valles', name: 'Parets del Valles', address: 'Carrer Major 1, 08150 Parets del Valles' },
  { slug: 'montornes-del-valles', name: 'Montornes del Valles', address: 'Carrer Major 1, 08170 Montornes del Valles' },
  { slug: 'montgat', name: 'Montgat', address: 'Carrer Major 1, 08390 Montgat' },
  { slug: 'premia-de-mar', name: 'Premia de Mar', address: 'Carrer Major 1, 08330 Premia de Mar' },
  { slug: 'el-masnou', name: 'El Masnou', address: 'Carrer Major 1, 08320 El Masnou' },
  { slug: 'alella', name: 'Alella', address: 'Carrer Major 1, 08328 Alella' },
  { slug: 'tiana', name: 'Tiana', address: 'Carrer Major 1, 08391 Tiana' },
  { slug: 'sant-adria-de-besos', name: 'Sant Adria de Besos', address: 'Carrer Major 1, 08930 Sant Adria de Besos' },
  { slug: 'barbera-del-valles', name: 'Barbera del Valles', address: 'Carrer Major 1, 08210 Barbera del Valles' },
  { slug: 'ripollet', name: 'Ripollet', address: 'Carrer Major 1, 08291 Ripollet' },
  { slug: 'montcada-i-reixac', name: 'Montcada i Reixac', address: 'Carrer Major 1, 08110 Montcada i Reixac' },
  { slug: 'sant-quirze-del-valles', name: 'Sant Quirze del Valles', address: 'Carrer Major 1, 08192 Sant Quirze del Valles' },
  { slug: 'sentmenat', name: 'Sentmenat', address: 'Carrer Major 1, 08181 Sentmenat' },
  { slug: 'caldes-de-montbui', name: 'Caldes de Montbui', address: 'Carrer Major 1, 08140 Caldes de Montbui' },
  { slug: 'la-llagosta', name: 'La Llagosta', address: 'Carrer Major 1, 08120 La Llagosta' },
  { slug: 'les-franqueses-del-valles', name: 'Les Franqueses del Valles', address: 'Carrer Major 1, 08520 Les Franqueses del Valles' },
  { slug: 'la-garriga', name: 'La Garriga', address: 'Carrer Major 1, 08530 La Garriga' },
  { slug: 'canet-de-mar', name: 'Canet de Mar', address: 'Carrer Major 1, 08360 Canet de Mar' },
  { slug: 'arenys-de-mar', name: 'Arenys de Mar', address: 'Carrer Major 1, 08350 Arenys de Mar' },
  { slug: 'malgrat-de-mar', name: 'Malgrat de Mar', address: 'Carrer Major 1, 08380 Malgrat de Mar' },
  { slug: 'pineda-de-mar', name: 'Pineda de Mar', address: 'Carrer Major 1, 08397 Pineda de Mar' },
  { slug: 'calella', name: 'Calella', address: 'Carrer Major 1, 08370 Calella' },
  { slug: 'blanes', name: 'Blanes', address: 'Carrer Major 1, 17300 Blanes' },
  { slug: 'lloret-de-mar', name: 'Lloret de Mar', address: 'Carrer Major 1, 17310 Lloret de Mar' },
  { slug: 'tordera', name: 'Tordera', address: 'Carrer Major 1, 08490 Tordera' },
  { slug: 'sant-celoni', name: 'Sant Celoni', address: 'Carrer Major 1, 08470 Sant Celoni' },
  { slug: 'cardedeu', name: 'Cardedeu', address: 'Carrer Major 1, 08440 Cardedeu' },
  { slug: 'vic', name: 'Vic', address: 'Carrer Major 1, 08500 Vic' },
  { slug: 'manresa', name: 'Manresa', address: 'Carrer Major 1, 08240 Manresa' },
  { slug: 'igualada', name: 'Igualada', address: 'Carrer Major 1, 08700 Igualada' },
  { slug: 'berga', name: 'Berga', address: 'Carrer Major 1, 08600 Berga' },
  { slug: 'sitges', name: 'Sitges', address: 'Carrer Major 1, 08870 Sitges' },
  { slug: 'vilanova-i-la-geltru', name: 'Vilanova i la Geltru', address: 'Carrer Major 1, 08800 Vilanova i la Geltru' },
  { slug: 'sant-pere-de-ribes', name: 'Sant Pere de Ribes', address: 'Carrer Major 1, 08810 Sant Pere de Ribes' },
  { slug: 'cubelles', name: 'Cubelles', address: 'Carrer Major 1, 08880 Cubelles' },
  { slug: 'cunit', name: 'Cunit', address: 'Carrer Major 1, 43881 Cunit' },
  { slug: 'el-vendrell', name: 'El Vendrell', address: 'Carrer Major 1, 43700 El Vendrell' },
  { slug: 'vilafranca-del-penedes', name: 'Vilafranca del Penedes', address: 'Carrer Major 1, 08720 Vilafranca del Penedes' },
  { slug: 'sant-sadurni-danoia', name: 'Sant Sadurni d Anoia', address: 'Carrer Major 1, 08770 Sant Sadurni d Anoia' },
  { slug: 'gelida', name: 'Gelida', address: 'Carrer Major 1, 08790 Gelida' },
  { slug: 'piera', name: 'Piera', address: 'Carrer Major 1, 08784 Piera' },
  { slug: 'terrassa-nord', name: 'Terrassa Nord', address: 'Carrer del Nord 1, 08222 Terrassa' },
  { slug: 'sabadell-sud', name: 'Sabadell Sud', address: 'Carrer del Sud 1, 08205 Sabadell' },
]

function q(str) {
  return str.replace(/'/g, ' ').replace(/\n/g, ' ').replace(/\r/g, ' ')
}

function makeAreaSQL(area, district) {
  const n = area.name
  const s = area.slug
  const a = area.address
  const d = district

  const intro = q(`La reparacion de neumaticos de camion en ${n} es un servicio fundamental para todos los transportistas, flotas logisticas y autonomos del sector del transporte que operan en la provincia de ${d}. Cuando un camion sufre un pinchazo en ${n}, cada minuto de parada representa una perdida economica directa para el transportista. Nuestro equipo de tecnicos especializados en neumaticos de vehiculos pesados esta disponible las 24 horas del dia, los 365 dias del ano, para desplazarse directamente hasta la posicion de tu camion en ${n} sin necesidad de grua ni traslado a taller. Atendemos todo tipo de camiones pesados: rigidos, articulados, semirremolques y trailers. El tiempo medio de llegada en ${n} es inferior a 60 minutos desde que realizas la llamada. Llama ahora al +34 911 676 448.`)

  const body = q(`El trafico de vehiculos pesados en ${n} es constante a lo largo de todo el dia, especialmente en zonas industriales y de distribucion logistica. Los pinchazos de camion en ${n} pueden producirse por objetos metalicos en la calzada, sobrecargas, desgaste excesivo del neumatico o fallos de valvula. Nuestro servicio de reparacion de neumaticos a domicilio en ${n} garantiza una respuesta rapida con tecnicos equipados con todo el material necesario: compresores industriales, desmontadoras portatiles para neumaticos de gran diametro, parches de reparacion homologados y stock de neumaticos en los tamaños mas comunes. Diagnosticamos la averia, reparamos si es posible o sustituimos el neumatico si el dano es irreparable, todo directamente en ${n}. Emitimos factura con IVA para empresas y autonomos.`)

  const deep = q(`Servicio de reparacion de neumaticos de camion en ${n}. Nuestros tecnicos trabajan con todas las marcas de neumaticos para vehiculos pesados: Michelin, Bridgestone, Continental, Goodyear, Pirelli, Yokohama, Dunlop y Hankook. Reparamos pinchazos en la banda de rodadura de hasta 6 mm de diametro mediante parche interior y tapon combinados segun norma ETRTO. Para reventones o danos en el flanco procedemos a la sustitucion inmediata. Otros servicios en ${n}: cambio de rueda por la de repuesto del vehiculo, revision y equilibrado de presiones en toda la flota, asistencia por perdida lenta de presion por valvulas defectuosas. Cobertura en ${n} y todos los municipios del entorno con tiempo de respuesta inferior a 60 minutos. Disponibles para flotas de transporte, empresas de distribucion, transportistas autonomos y cualquier operador de vehiculos pesados en ${n}. Llama al +34 911 676 448 disponible 24 horas todos los dias del ano.`)

  const faq = q(`Q1: Cuanto tiempo tardan en llegar a ${n}?|A: El tiempo medio de llegada a ${n} es de 30 a 60 minutos desde que realizas la llamada. Contamos con tecnicos estrategicamente situados en la provincia de ${d}.|||Q2: Reparan neumaticos de camion directamente en ${n}?|A: Si, nuestros tecnicos se desplazan hasta la posicion exacta de tu camion en ${n} con todo el equipamiento necesario sin necesidad de grua.|||Q3: El servicio en ${n} esta disponible 24 horas?|A: Si, disponibles las 24 horas del dia, los 7 dias de la semana incluidos festivos y fines de semana.|||Q4: Que tipos de camiones atienden en ${n}?|A: Camiones rigidos, articulados, semirremolques, trailers, camiones frigorificos y cisterna. Tambien furgonetas como servicio complementario.|||Q5: Puedo pedir presupuesto antes de que vengan a ${n}?|A: Si. Llama al +34 911 676 448 y te damos una estimacion del coste antes de desplazarnos a ${n}.|||Q6: Que pasa si el neumatico no tiene reparacion en ${n}?|A: Procedemos a la sustitucion inmediata. Llevamos stock de los tamanos mas habituales para camiones que operan en ${n}.|||Q7: Emiten factura para empresas en ${n}?|A: Si, emitimos factura completa con IVA. Para flotas con base en ${n} podemos gestionar acuerdos de servicio.|||Q8: Atienden en poligonos industriales cerca de ${n}?|A: Si, los poligonos industriales son una de nuestras zonas de servicio mas frecuentes en ${n}.|||Q9: Cuanto cuesta reparar un pinchazo de camion en ${n}?|A: El precio depende del tipo de averia y la medida del neumatico. Llama al +34 911 676 448 para presupuesto sin compromiso.|||Q10: Tambien atienden furgonetas en ${n}?|A: Si, ademas de camiones pesados, atendemos furgonetas de reparto y vehiculos comerciales ligeros en ${n}.`)

  const blog = q(`Que hacer si tu camion tiene un pinchazo en ${n}. Un pinchazo de camion en ${n} puede ocurrir en cualquier momento y en cualquier lugar: en la autopista, en un poligono industrial, en el puerto o en plena via urbana. Actuar con rapidez y seguridad minimiza el tiempo de parada y los riesgos para el conductor y el resto de usuarios de la via. Paso 1: No frenes bruscamente al notar el pinchazo en ${n}. Mantén el control del vehiculo, suelta el acelerador progresivamente y dirígete hacia un lugar seguro donde detener el camion. Paso 2: Senaliza el vehiculo. Activa las luces de emergencia y coloca los triangulos de senalizacion a la distancia reglamentaria. En vias de alta velocidad cerca de ${n}, coloca el triangulo a 150 metros por detras del vehiculo. Ponte el chaleco reflectante antes de bajar de la cabina. Paso 3: Evalua el neumatico desde una posicion segura. Identifica cual es el neumatico afectado y si hay algun objeto visible incrustado. No intentes extraer el objeto antes de la llegada del tecnico. Paso 4: Llama a un especialista en ${n}. Los neumaticos de camion pesado requieren equipamiento especifico. Llama al +34 911 676 448, disponible 24 horas, y un tecnico saldra hacia ${n} de inmediato. Paso 5: Indica tu posicion exacta en ${n}. Da el nombre de la via, punto kilometrico o coordenadas GPS para que el tecnico llegue cuanto antes. Tiempo de llegada estimado en ${n}: 30-60 minutos. Consejos para evitar pinchazos en ${n}: revisa la presion de los neumaticos semanalmente, inspecciona el estado del dibujo antes de cada ruta, respeta la carga maxima del vehiculo y sustituye los neumaticos antes de que el dibujo llegue al minimo legal. Llama al +34 911 676 448 si tienes una emergencia en ${n} ahora mismo.`)

  const blogTitle = q(`Pinchazo de camion en ${n} que hacer y a quien llamar`)
  const blogExcerpt = q(`Guia completa para actuar ante un pinchazo de camion en ${n}. Pasos de seguridad, consejos y el numero de asistencia 24h disponible en ${d}.`)

  return `
INSERT INTO pages (slug,service_type,h1,meta_title,meta_description,intro,body_section,deep_section,address,city,district,status,indexed_google) VALUES ('neumaticos-camion/${d.toLowerCase()}/${s}','neumaticos-camion','Reparacion de Neumaticos de Camion en ${n} Servicio 24h','Reparacion Neumaticos Camion ${n} Servicio Urgente 24h ${d}','Pinchazo de camion en ${n}? Tecnicos especializados disponibles 24h. Llegamos en 30-60 min. Sin grua. Llama: +34 911 676 448','${intro}','${body}','${deep}','${a}','${n}','${d}','published',false) ON CONFLICT (slug) DO UPDATE SET h1=EXCLUDED.h1,meta_title=EXCLUDED.meta_title,meta_description=EXCLUDED.meta_description,intro=EXCLUDED.intro,body_section=EXCLUDED.body_section,deep_section=EXCLUDED.deep_section,status=EXCLUDED.status,updated_at=NOW();

INSERT INTO pages (slug,service_type,h1,meta_title,meta_description,body_section,address,city,district,status,indexed_google) VALUES ('neumaticos-camion/${d.toLowerCase()}/${s}/faq','neumaticos-camion','Preguntas Frecuentes Reparacion Neumaticos Camion en ${n}','FAQ Neumaticos Camion ${n} Preguntas Frecuentes Servicio 24h','Resolvemos tus dudas sobre reparacion de pinchazos de camion en ${n}. Servicio urgente 24h disponible ahora. Tel: +34 911 676 448','${faq}','${a}','${n}','${d}','published',false) ON CONFLICT (slug) DO UPDATE SET h1=EXCLUDED.h1,meta_title=EXCLUDED.meta_title,meta_description=EXCLUDED.meta_description,body_section=EXCLUDED.body_section,status=EXCLUDED.status,updated_at=NOW();

INSERT INTO blog_posts (slug,title,excerpt,content,meta_title,meta_desc,category,read_time,district,city,published_at) VALUES ('pinchazo-camion-${s}-que-hacer','${blogTitle}','${blogExcerpt}','${blog}','${blogTitle} Reparacion Pinchazos Camion 24h','${blogExcerpt}','pinchazos-barcelona',6,'barcelona','${s}',NOW()) ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title,excerpt=EXCLUDED.excerpt,content=EXCLUDED.content,meta_title=EXCLUDED.meta_title,meta_desc=EXCLUDED.meta_desc;
`
}

const hubSQL = `INSERT INTO pages (slug,service_type,h1,meta_title,meta_description,intro,body_section,deep_section,address,city,district,status,indexed_google) VALUES ('neumaticos-camion/barcelona','neumaticos-camion','Reparacion de Neumaticos de Camion en Barcelona Servicio Urgente 24h','Reparacion Neumaticos Camion Barcelona Servicio 24h Toda la Provincia','Servicio urgente de reparacion de pinchazos de camion en Barcelona y toda la provincia. Tecnicos 24h. Llegamos en 30-60 min. +34 911 676 448','Somos especialistas en reparacion de neumaticos de camion en Barcelona y toda su area metropolitana. Disponibles las 24 horas del dia, los 365 dias del ano, para desplazarnos hasta la posicion exacta de tu vehiculo en cualquier punto de la provincia de Barcelona. Cubrimos todos los barrios de Barcelona ciudad, el area metropolitana, el Valles, el Baix Llobregat, el Maresme y todas las comarcas de la provincia.','Nuestros tecnicos especializados en vehiculos pesados trabajan con camiones de todos los tipos. La provincia de Barcelona concentra una de las mayores densidades de trafico de mercancias de Espana, con importantes poligonos industriales, el puerto de Barcelona y multiples plataformas logisticas.','Reparacion de neumaticos de camion en toda la provincia de Barcelona. Barcelona es el mayor puerto de mercancias del Mediterraneo occidental y uno de los principales nudos logisticos de Europa. Sus poligonos industriales, la Zona Franca, el puerto y el aeropuerto generan un trafico constante de camiones que hace imprescindible contar con un servicio de reparacion de neumaticos urgente disponible 24 horas. Cubrimos toda la provincia con tiempo de respuesta inferior a 60 minutos en cualquier punto.','Las Ramblas 1, 08002 Barcelona','Barcelona','Barcelona','published',false) ON CONFLICT (slug) DO UPDATE SET h1=EXCLUDED.h1,meta_title=EXCLUDED.meta_title,status=EXCLUDED.status,updated_at=NOW();\n`

const chunkSize = 27
for (let i = 0; i < BARCELONA_AREAS.length; i += chunkSize) {
  const chunk = BARCELONA_AREAS.slice(i, i + chunkSize)
  const partNum = Math.floor(i / chunkSize) + 1
  let sql = `-- DAY 2 BARCELONA - PART ${partNum} of 3 (areas ${i+1} to ${Math.min(i+chunkSize, BARCELONA_AREAS.length)})\n`
  if (partNum === 1) sql += hubSQL
  for (const area of chunk) sql += makeAreaSQL(area, 'Barcelona')
  const filename = `/mnt/user-data/outputs/day2-barcelona-part${partNum}.sql`
  fs.writeFileSync(filename, sql)
  console.log(`✅ Part ${partNum}: ${chunk.length} areas → ${chunk.length * 3} pages`)
}
console.log(`\n📊 TOTAL Day 2: ${BARCELONA_AREAS.length * 3 + 1} pages`)
