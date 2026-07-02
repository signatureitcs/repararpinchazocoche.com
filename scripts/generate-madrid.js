const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://yfraehfbcblamjipoowz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcmFlaGZiY2JsYW1qaXBvb3d6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTg5NDM0MCwiZXhwIjoyMDk3NDcwMzQwfQ.QUW8yfklH6EEL2PeGMRpEcIJ7K7Rq_jWycMxsuWzpHI'
)

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
  { slug: 'casarrubuelos', name: 'Casarrubuelos', postcode: '28977', address: 'Calle Mayor 1, 28977 Casarrubuelos' },
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

function generateServicePage(areaName, postcode, address) {
  const intro = `La reparación de neumáticos de camión en ${areaName} es un servicio esencial para todos los transportistas, empresas logísticas y autónomos que operan en esta zona de la Comunidad de Madrid. Cuando un vehículo pesado sufre un pinchazo en ${areaName}, la consecuencia inmediata es la inmovilización del camión, la pérdida de tiempo de entrega y un coste económico que puede ser considerable si no se actúa con rapidez. Nuestro equipo de técnicos especializados en neumáticos de camión está operativo las 24 horas del día, los 7 días de la semana, incluidos festivos, para desplazarse directamente hasta el lugar donde se encuentra tu vehículo en ${areaName} o sus alrededores. No importa si el pinchazo ocurre en plena autovía, en el interior de un polígono industrial, en el aparcamiento de un centro logístico o en cualquier calle de ${areaName}: nuestros técnicos llegan hasta ti con todo el equipamiento necesario para resolver la avería in situ, sin necesidad de grúa ni de trasladar el camión a un taller. El tiempo medio de llegada en ${areaName} es de 30 a 60 minutos desde que realizas la llamada, lo que minimiza el impacto de la avería en tu jornada de trabajo. Contamos con técnicos distribuidos estratégicamente por toda la Comunidad de Madrid para garantizar los tiempos de respuesta más bajos posibles. Nuestro servicio está orientado principalmente a camiones pesados de todo tipo, aunque también atendemos furgonetas y vehículos de reparto de forma complementaria. Si tienes una emergencia ahora mismo en ${areaName}, llama al +34 911 676 448 y un técnico saldrá hacia ti de inmediato.`

  const bodySection = `En ${areaName}, la actividad industrial y logística genera un importante tráfico de vehículos pesados a lo largo de todo el día y la noche. Los camiones que operan en esta zona están expuestos a pinchazos causados por objetos en la calzada, desgaste prematuro del neumático, sobrecargas, temperaturas extremas o defectos en la vía. Cuando esto ocurre, contar con un servicio de reparación de neumáticos de camión a domicilio en ${areaName} disponible las 24 horas marca la diferencia entre una parada de 30 minutos y una parada de varias horas. Nuestros técnicos llegan equipados con compresores profesionales, herramientas de desmontaje para neumáticos de gran diámetro, parches y materiales de reparación de calidad industrial, así como neumáticos de repuesto para los tamaños más habituales. Evaluamos el estado del neumático afectado y determinamos si es posible una reparación segura o si es necesaria la sustitución completa. En ambos casos, el trabajo se realiza directamente en el lugar donde se encuentra el camión en ${areaName}, sin necesidad de desplazamiento a taller. También realizamos una revisión de la presión del resto de neumáticos del vehículo antes de finalizar el servicio, para asegurarnos de que el camión queda en perfectas condiciones para continuar su ruta. Emitimos factura para empresas y autónomos, con todos los detalles del servicio prestado.`

  const deepSection = `<h2>Servicio completo de reparación de neumáticos de camión en ${areaName}</h2><p>Cuando hablamos de reparación de neumáticos de camión en ${areaName}, nos referimos a un servicio técnico especializado que va mucho más allá de lo que puede ofrecer un taller convencional. Los neumáticos de vehículos pesados tienen dimensiones, presiones de trabajo y características técnicas completamente diferentes a los de un turismo, y requieren herramientas específicas, conocimientos avanzados y experiencia real en el manejo de este tipo de vehículos.</p><h3>Por qué elegirnos en ${areaName}</h3><p>Nuestro equipo lleva años prestando servicio a transportistas profesionales en ${areaName} y toda la Comunidad de Madrid. Conocemos las rutas más frecuentadas, los polígonos industriales de la zona, los accesos a las principales autovías y las particularidades del tráfico pesado en esta área. Esta experiencia local nos permite llegar más rápido y resolver la avería con mayor eficiencia.</p><p>Trabajamos con todas las marcas y medidas de neumáticos para camión: Michelin, Bridgestone, Continental, Goodyear, Pirelli, Yokohama, Dunlop, Hankook y muchas más. Tanto si tu camión monta neumáticos de primera línea como si utiliza neumáticos de economía, disponemos del material adecuado para atenderte en ${areaName}.</p><h3>Tipos de avería que atendemos en ${areaName}</h3><p>El servicio más frecuente es la reparación de pinchazo, cuando el neumático ha sufrido una perforación por un clavo, tornillo, cristal u otro objeto encontrado en la calzada. Si el daño está en la zona de la banda de rodadura y no supera los 6 mm de diámetro, generalmente es posible una reparación definitiva mediante un parche interior combinado con tapón de goma, siguiendo las normas ETRTO.</p><p>También atendemos reventones donde el neumático pierde toda la presión de forma repentina. En estos casos, habitualmente es necesaria la sustitución del neumático por uno nuevo. Llevamos stock de los tamaños más habituales para camiones que operan en ${areaName} y la Comunidad de Madrid.</p><p>Otros servicios que prestamos en ${areaName} incluyen la sustitución de neumáticos desgastados, el cambio de neumático pinchado por la rueda de repuesto del propio vehículo, la revisión y ajuste de presiones en toda la flota y la asistencia por pérdida lenta de presión causada por válvulas defectuosas o llantas dañadas.</p><h3>Cobertura en ${areaName} y municipios cercanos</h3><p>Desde nuestra base de operaciones en la Comunidad de Madrid, cubrimos ${areaName} con un tiempo de respuesta garantizado de menos de 60 minutos. También atendemos los municipios y polígonos industriales del entorno inmediato de ${areaName}, por lo que si el pinchazo ocurre en una carretera de acceso o en una zona limítrofe, igualmente podemos llegar hasta ti.</p><p>Nuestro servicio está disponible para flotas de transporte de mercancías, empresas de distribución y logística, transportistas autónomos, empresas de construcción con camiones de obra, vehículos de servicio municipal y cualquier otro operador de vehículos pesados que necesite asistencia urgente en ${areaName}.</p><h3>Cómo solicitar el servicio en ${areaName}</h3><p>Para solicitar asistencia urgente en ${areaName}, llámanos directamente al +34 911 676 448, disponible las 24 horas del día. También puedes rellenar el formulario de contacto en esta página y te llamamos en menos de 15 minutos. No dejes que un pinchazo en ${areaName} pare tu negocio más tiempo del necesario.</p>`

  return { intro, bodySection, deepSection }
}

function generateFaqContent(areaName) {
  return [
    `Q1: ¿Cuánto tiempo tardan en llegar a ${areaName}?\nA: El tiempo medio de llegada a ${areaName} es de 30 a 60 minutos. Disponemos de técnicos distribuidos por toda la Comunidad de Madrid para minimizar los tiempos de espera.`,
    `Q2: ¿Vienen a reparar el neumático en ${areaName} sin necesidad de grúa?\nA: Sí. Los técnicos se desplazan hasta la posición exacta de tu vehículo en ${areaName} con todo el equipamiento necesario para realizar la reparación o sustitución del neumático in situ.`,
    `Q3: ¿El servicio en ${areaName} está disponible durante la noche y los fines de semana?\nA: Sí, nuestro servicio en ${areaName} está operativo las 24 horas del día, los 7 días de la semana, incluidos sábados, domingos y festivos.`,
    `Q4: ¿Qué tipos de camiones atienden en ${areaName}?\nA: Atendemos todo tipo de vehículos pesados en ${areaName}: camiones rígidos, articulados, semirremolques, trailers, camiones frigoríficos, cisterna y de carga general. También furgonetas de reparto como servicio complementario.`,
    `Q5: ¿Puedo solicitar presupuesto antes de que vengan a ${areaName}?\nA: Sí. Cuando llamas al +34 911 676 448 te proporcionamos una estimación del coste. El presupuesto final se confirma una vez el técnico evalúa el estado del neumático en ${areaName}.`,
    `Q6: ¿Qué ocurre si el neumático no tiene reparación en ${areaName}?\nA: Si el neumático no es reparable de forma segura, procedemos a la sustitución inmediata. Llevamos stock de los tamaños más habituales en camiones que operan en ${areaName}.`,
    `Q7: ¿Emiten factura para empresas de transporte en ${areaName}?\nA: Sí, emitimos factura completa con todos los detalles del servicio, IVA incluido. También podemos gestionar acuerdos de servicio para flotas con base en ${areaName}.`,
    `Q8: ¿Atienden averías en polígonos industriales de ${areaName}?\nA: Sí, los polígonos industriales son una de las zonas donde más frecuentemente prestamos servicio en ${areaName} y sus alrededores.`,
    `Q9: ¿Cuánto cuesta la reparación de un pinchazo de camión en ${areaName}?\nA: El precio depende del tipo de avería, la medida del neumático y la hora del servicio. Llama al +34 911 676 448 para obtener un presupuesto orientativo sin compromiso.`,
    `Q10: ¿También atienden furgonetas en ${areaName}?\nA: Sí, aunque nuestra especialidad son los camiones pesados, también atendemos furgonetas de reparto y vehículos comerciales ligeros en ${areaName} como servicio complementario.`,
  ].join('|||')
}

function generateBlogPost(areaName, areaSlug) {
  const title = `Pinchazo de camión en ${areaName}: qué hacer y a quién llamar`
  const excerpt = `Guía completa para actuar si tu camión sufre un pinchazo en ${areaName}. Pasos de seguridad, quién llamar y cómo minimizar el tiempo de parada.`
  const content = `<h2>Qué hacer si tu camión tiene un pinchazo en ${areaName}</h2><p>Un pinchazo de camión en ${areaName} puede ocurrir en cualquier momento: en plena autovía, en el interior de un polígono industrial, en una calle secundaria o en el aparcamiento de un cliente. La forma en que reacciones en los primeros minutos determina en gran medida el tiempo total de parada y el coste de la incidencia.</p><h3>Paso 1: No frenes bruscamente</h3><p>Si sientes que un neumático se desinfla mientras circulas por ${areaName}, no frenes bruscamente ni gires el volante de forma brusca. Mantén el control, reduce la velocidad progresivamente y busca un lugar seguro donde detener el camión: un arcén amplio, una zona de servicio o el interior de un polígono.</p><h3>Paso 2: Señaliza correctamente</h3><p>Una vez detenido el camión en ${areaName}, activa las luces de emergencia inmediatamente. En vías interurbanas, coloca los triángulos de señalización a la distancia reglamentaria. Ponte el chaleco reflectante antes de salir de la cabina.</p><h3>Paso 3: Evalúa el neumático</h3><p>Desde una posición segura, observa el estado visible del neumático afectado. No intentes quitar ningún objeto incrustado en este momento. Anota la posición del neumático afectado para comunicársela al técnico cuando llames.</p><h3>Paso 4: Llama a un servicio especializado en ${areaName}</h3><p>No intentes cambiar el neumático de un camión pesado sin el equipamiento adecuado. Llama al servicio de reparación de neumáticos de camión a domicilio disponible en ${areaName}: nuestro número es el <strong>+34 911 676 448</strong>, disponible las 24 horas del día.</p><h3>Paso 5: Facilita tu ubicación exacta</h3><p>Al llamar, indica tu ubicación exacta en ${areaName}: nombre de la calle o carretera, punto kilométrico si estás en una vía interurbana, o las coordenadas GPS. Cuanta más información des, más rápido llegará el técnico a ${areaName}.</p><h3>Tiempo de llegada en ${areaName}</h3><p>El tiempo medio de llegada de nuestros técnicos a ${areaName} es de 30 a 60 minutos desde que realizas la llamada. Siempre te damos una estimación realista cuando llamas.</p><h3>Consejos para evitar pinchazos en ${areaName}</h3><p>Revisa la presión de los neumáticos al menos una vez por semana. Inspecciona visualmente el estado de los neumáticos buscando cortes o desgaste irregular. Respeta la carga máxima del vehículo. Sustituye los neumáticos cuando el dibujo llegue al mínimo legal.</p><p>Si tienes una emergencia en ${areaName} ahora mismo, llama al <strong>+34 911 676 448</strong>. Estamos disponibles 24 horas, 365 días al año.</p>`
  return { title, excerpt, content }
}

async function run() {
  let serviceCount = 0, faqCount = 0, blogCount = 0
  const errors = []

  console.log(`\n🚛 Generando ${MADRID_AREAS.length} áreas de Madrid...\n`)

  for (const area of MADRID_AREAS) {
    process.stdout.write(`  → ${area.name}... `)

    // Service page
    const { intro, bodySection, deepSection } = generateServicePage(area.name, area.postcode, area.address)
    const { error: e1 } = await supabase.from('pages').upsert({
      slug: `neumaticos-camion/madrid/${area.slug}`,
      service_type: 'neumaticos-camion',
      h1: `Reparación de Neumáticos de Camión en ${area.name} — Servicio 24h`,
      meta_title: `Reparación Neumáticos Camión ${area.name} | Servicio Urgente 24h Madrid`,
      meta_description: `Pinchazo de camión en ${area.name}? Técnicos disponibles 24h. Llegamos en 30-60 min. Sin grúa. Llama: +34 911 676 448`,
      intro, body_section: bodySection, deep_section: deepSection,
      address: area.address, city: area.name, district: 'Madrid',
      status: 'published', indexed_google: false,
    }, { onConflict: 'slug' })
    if (e1) errors.push(`Service ${area.slug}: ${e1.message}`); else serviceCount++

    // FAQ page
    const { error: e2 } = await supabase.from('pages').upsert({
      slug: `neumaticos-camion/madrid/${area.slug}/faq`,
      service_type: 'neumaticos-camion',
      h1: `Preguntas Frecuentes — Reparación Neumáticos Camión en ${area.name}`,
      meta_title: `FAQ Neumáticos Camión ${area.name} | Preguntas y Respuestas 24h`,
      meta_description: `Resolvemos tus dudas sobre reparación de pinchazos de camión en ${area.name}. Servicio 24h disponible ahora. Tel: +34 911 676 448`,
      body_section: generateFaqContent(area.name),
      address: area.address, city: area.name, district: 'Madrid',
      status: 'published', indexed_google: false,
    }, { onConflict: 'slug' })
    if (e2) errors.push(`FAQ ${area.slug}: ${e2.message}`); else faqCount++

    // Blog post
    const { title, excerpt, content } = generateBlogPost(area.name, area.slug)
    const { error: e3 } = await supabase.from('blog_posts').upsert({
      slug: `pinchazo-camion-${area.slug}-que-hacer`,
      title, excerpt, content,
      meta_title: `${title} | Reparación Pinchazos Camión 24h`,
      meta_desc: excerpt,
      category: 'pinchazos-madrid',
      read_time: 6,
      district: 'madrid', city: area.slug,
      published_at: new Date().toISOString(),
    }, { onConflict: 'slug' })
    if (e3) errors.push(`Blog ${area.slug}: ${e3.message}`); else blogCount++

    console.log(`✓`)
  }

  // District hub
  const { error: hubErr } = await supabase.from('pages').upsert({
    slug: 'neumaticos-camion/madrid',
    service_type: 'neumaticos-camion',
    h1: 'Reparación de Neumáticos de Camión en Madrid — Servicio Urgente 24h',
    meta_title: 'Reparación Neumáticos Camión Madrid | Servicio 24h Toda la Provincia',
    meta_description: 'Servicio urgente de reparación de pinchazos de camión en Madrid y toda la provincia. Técnicos 24h. 30-60 min llegada. +34 911 676 448',
    intro: 'Somos el servicio de referencia para la reparación urgente de neumáticos de camión en Madrid y toda su área metropolitana. Disponibles las 24 horas del día, los 365 días del año, para desplazarnos hasta la posición exacta de tu vehículo sin necesidad de grúa ni traslado a taller. Cubrimos todos los barrios de Madrid capital, todos los municipios del área metropolitana y los principales polígonos industriales de la provincia.',
    body_section: 'Nuestros técnicos especializados en vehículos pesados trabajan con camiones de todos los tipos y marcas de neumáticos. Tiempo medio de llegada de 30 a 60 minutos en toda la provincia de Madrid.',
    deep_section: '<h2>Servicio de reparación de neumáticos de camión en toda la provincia de Madrid</h2><p>Madrid es el mayor nodo logístico de España. Por sus autovías, carreteras nacionales y vías de acceso circulan a diario decenas de miles de vehículos pesados que abastecen a la capital, sus municipios y el resto del país. La concentración de polígonos industriales, centros de distribución y plataformas logísticas hace que la provincia de Madrid sea una de las áreas con mayor demanda de servicios de reparación de neumáticos de camión urgentes.</p><p>Nuestro servicio está organizado para cubrir toda esta demanda con la máxima rapidez. Disponemos de técnicos distribuidos estratégicamente por distintos puntos de la provincia para garantizar tiempos de llegada inferiores a 60 minutos en cualquier zona de Madrid.</p>',
    address: 'Calle Gran Vía 1, 28013 Madrid',
    city: 'Madrid', district: 'Madrid',
    status: 'published', indexed_google: false,
  }, { onConflict: 'slug' })

  console.log('\n════════════════════════════════════')
  console.log('        DAY 1 — MADRID RESULTS      ')
  console.log('════════════════════════════════════')
  console.log(`✅ Service pages:   ${serviceCount}`)
  console.log(`✅ FAQ pages:       ${faqCount}`)
  console.log(`✅ Blog posts:      ${blogCount}`)
  console.log(`✅ District hub:    ${hubErr ? '❌ ' + hubErr.message : '1'}`)
  console.log(`────────────────────────────────────`)
  console.log(`📄 TOTAL PAGES:    ${serviceCount + faqCount + blogCount + 1}`)
  console.log('════════════════════════════════════')
  if (errors.length > 0) {
    console.log(`\n❌ ${errors.length} errors:`)
    errors.forEach(e => console.log('  -', e))
  }
}

run().catch(console.error)
