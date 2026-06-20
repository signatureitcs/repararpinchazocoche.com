export type CityArea = {
  slug: string
  name: string
  address: string
  postcode: string
}

export type District = {
  slug: string
  name: string
  address: string
  areas: CityArea[]
}

export const LOCATIONS: District[] = [
  {
    slug: 'madrid',
    name: 'Madrid',
    address: 'Calle Gran Vía 1, 28013 Madrid',
    areas: [
      { slug: 'salamanca', name: 'Salamanca', address: 'Calle de Serrano 10, 28001 Madrid', postcode: '28001' },
      { slug: 'chamberi', name: 'Chamberí', address: 'Calle de Fuencarral 80, 28004 Madrid', postcode: '28004' },
      { slug: 'centro', name: 'Centro', address: 'Puerta del Sol 1, 28013 Madrid', postcode: '28013' },
      { slug: 'retiro', name: 'Retiro', address: 'Calle de Ibiza 5, 28009 Madrid', postcode: '28009' },
      { slug: 'arganzuela', name: 'Arganzuela', address: 'Paseo de las Delicias 10, 28045 Madrid', postcode: '28045' },
      { slug: 'carabanchel', name: 'Carabanchel', address: 'Calle de Aluche 3, 28044 Madrid', postcode: '28044' },
      { slug: 'vallecas', name: 'Vallecas', address: 'Calle de la Oca 1, 28031 Madrid', postcode: '28031' },
      { slug: 'hortaleza', name: 'Hortaleza', address: 'Calle de Silvano 1, 28043 Madrid', postcode: '28043' },
      { slug: 'fuencarral', name: 'Fuencarral', address: 'Calle de Fuencarral 200, 28033 Madrid', postcode: '28033' },
      { slug: 'latina', name: 'Latina', address: 'Calle de la Paloma 1, 28005 Madrid', postcode: '28005' },
      { slug: 'moncloa', name: 'Moncloa', address: 'Paseo de Moret 1, 28008 Madrid', postcode: '28008' },
      { slug: 'usera', name: 'Usera', address: 'Calle de Pradillo 1, 28026 Madrid', postcode: '28026' },
      { slug: 'tetuan', name: 'Tetuán', address: 'Calle de Bravo Murillo 1, 28020 Madrid', postcode: '28020' },
      { slug: 'barajas', name: 'Barajas', address: 'Calle de Barajas 1, 28042 Madrid', postcode: '28042' },
      { slug: 'alcala-de-henares', name: 'Alcalá de Henares', address: 'Calle Mayor 1, 28801 Alcalá de Henares', postcode: '28801' },
      { slug: 'mostoles', name: 'Móstoles', address: 'Calle Pradillo 1, 28933 Móstoles', postcode: '28933' },
      { slug: 'getafe', name: 'Getafe', address: 'Plaza de la Constitución 1, 28901 Getafe', postcode: '28901' },
      { slug: 'alcorcon', name: 'Alcorcón', address: 'Calle Mayor 1, 28920 Alcorcón', postcode: '28920' },
      { slug: 'leganes', name: 'Leganés', address: 'Plaza Mayor 1, 28911 Leganés', postcode: '28911' },
      { slug: 'torrejon-de-ardoz', name: 'Torrejón de Ardoz', address: 'Calle Mayor 1, 28850 Torrejón de Ardoz', postcode: '28850' },
      { slug: 'alcobendas', name: 'Alcobendas', address: 'Plaza Mayor 1, 28100 Alcobendas', postcode: '28100' },
      { slug: 'pozuelo-de-alarcon', name: 'Pozuelo de Alarcón', address: 'Calle Mayor 1, 28223 Pozuelo de Alarcón', postcode: '28223' },
      { slug: 'las-rozas', name: 'Las Rozas', address: 'Calle Mayor 1, 28231 Las Rozas', postcode: '28231' },
    ],
  },
  {
    slug: 'barcelona',
    name: 'Barcelona',
    address: 'Las Ramblas 1, 08002 Barcelona',
    areas: [
      { slug: 'eixample', name: 'Eixample', address: 'Carrer del Consell de Cent 1, 08011 Barcelona', postcode: '08011' },
      { slug: 'gracia', name: 'Gràcia', address: 'Carrer de Gràcia 1, 08012 Barcelona', postcode: '08012' },
      { slug: 'sant-marti', name: 'Sant Martí', address: 'Rambla del Poblenou 1, 08005 Barcelona', postcode: '08005' },
      { slug: 'sants-montjuic', name: 'Sants-Montjuïc', address: 'Carrer de Sants 1, 08014 Barcelona', postcode: '08014' },
      { slug: 'horta-guinardo', name: 'Horta-Guinardó', address: 'Carrer del Carmel 1, 08032 Barcelona', postcode: '08032' },
      { slug: 'nou-barris', name: 'Nou Barris', address: 'Passeig de Valldaura 1, 08042 Barcelona', postcode: '08042' },
      { slug: 'sant-andreu', name: 'Sant Andreu', address: 'Passeig de Torres i Bages 1, 08030 Barcelona', postcode: '08030' },
      { slug: 'les-corts', name: 'Les Corts', address: 'Carrer de les Corts 1, 08028 Barcelona', postcode: '08028' },
      { slug: 'hospitalet-de-llobregat', name: "L'Hospitalet de Llobregat", address: 'Avinguda de la Granvia 1, 08901 L\'Hospitalet', postcode: '08901' },
      { slug: 'badalona', name: 'Badalona', address: 'Carrer del Mar 1, 08911 Badalona', postcode: '08911' },
      { slug: 'sabadell', name: 'Sabadell', address: 'Carrer de la Salut 1, 08201 Sabadell', postcode: '08201' },
      { slug: 'terrassa', name: 'Terrassa', address: 'Carrer de la Rutlla 1, 08221 Terrassa', postcode: '08221' },
    ],
  },
  {
    slug: 'valencia',
    name: 'Valencia',
    address: 'Plaza del Ayuntamiento 1, 46002 Valencia',
    areas: [
      { slug: 'ciutat-vella', name: 'Ciutat Vella', address: 'Carrer de la Llotja 1, 46001 Valencia', postcode: '46001' },
      { slug: 'eixample-valencia', name: 'Eixample', address: 'Carrer de Colón 1, 46004 Valencia', postcode: '46004' },
      { slug: 'campanar', name: 'Campanar', address: 'Carrer de Campanar 1, 46015 Valencia', postcode: '46015' },
      { slug: 'rascanya', name: 'Rascanya', address: 'Carrer de Burjassot 1, 46025 Valencia', postcode: '46025' },
      { slug: 'benimaclet', name: 'Benimaclet', address: 'Carrer de Benimaclet 1, 46020 Valencia', postcode: '46020' },
      { slug: 'torrent', name: 'Torrent', address: 'Carrer Major 1, 46900 Torrent', postcode: '46900' },
      { slug: 'gandia', name: 'Gandia', address: 'Carrer Major 1, 46700 Gandia', postcode: '46700' },
      { slug: 'sagunto', name: 'Sagunto', address: 'Carrer Major 1, 46500 Sagunto', postcode: '46500' },
    ],
  },
  {
    slug: 'sevilla',
    name: 'Sevilla',
    address: 'Plaza de San Francisco 1, 41004 Sevilla',
    areas: [
      { slug: 'triana', name: 'Triana', address: 'Calle Betis 1, 41010 Sevilla', postcode: '41010' },
      { slug: 'macarena', name: 'Macarena', address: 'Calle San Luis 1, 41003 Sevilla', postcode: '41003' },
      { slug: 'centro-sevilla', name: 'Centro', address: 'Avenida de la Constitución 1, 41004 Sevilla', postcode: '41004' },
      { slug: 'nervion', name: 'Nervión', address: 'Avenida de Luis Montoto 1, 41005 Sevilla', postcode: '41005' },
      { slug: 'cerro-amate', name: 'Cerro-Amate', address: 'Calle San Juan de la Cruz 1, 41006 Sevilla', postcode: '41006' },
      { slug: 'dos-hermanas', name: 'Dos Hermanas', address: 'Avenida de la Libertad 1, 41700 Dos Hermanas', postcode: '41700' },
      { slug: 'alcala-de-guadaira', name: 'Alcalá de Guadaíra', address: 'Calle Real 1, 41500 Alcalá de Guadaíra', postcode: '41500' },
    ],
  },
  {
    slug: 'zaragoza',
    name: 'Zaragoza',
    address: 'Plaza del Pilar 1, 50003 Zaragoza',
    areas: [
      { slug: 'centro-zaragoza', name: 'Centro', address: 'Calle Alfonso I 1, 50003 Zaragoza', postcode: '50003' },
      { slug: 'delicias', name: 'Delicias', address: 'Avenida de Madrid 1, 50010 Zaragoza', postcode: '50010' },
      { slug: 'oliver', name: 'Oliver', address: 'Calle de Oliver 1, 50017 Zaragoza', postcode: '50017' },
      { slug: 'torrero', name: 'Torrero', address: 'Calle de Cádiz 1, 50007 Zaragoza', postcode: '50007' },
      { slug: 'utebo', name: 'Utebo', address: 'Calle Mayor 1, 50180 Utebo', postcode: '50180' },
    ],
  },
  {
    slug: 'malaga',
    name: 'Málaga',
    address: 'Plaza de la Constitución 1, 29015 Málaga',
    areas: [
      { slug: 'centro-malaga', name: 'Centro', address: 'Calle Larios 1, 29015 Málaga', postcode: '29015' },
      { slug: 'churriana', name: 'Churriana', address: 'Calle Real 1, 29140 Churriana', postcode: '29140' },
      { slug: 'cruz-de-humilladero', name: 'Cruz de Humilladero', address: 'Avenida de Velázquez 1, 29006 Málaga', postcode: '29006' },
      { slug: 'fuengirola', name: 'Fuengirola', address: 'Avenida Jesús Santos Rein 1, 29640 Fuengirola', postcode: '29640' },
      { slug: 'marbella', name: 'Marbella', address: 'Avenida Ricardo Soriano 1, 29600 Marbella', postcode: '29600' },
    ],
  },
  {
    slug: 'bilbao',
    name: 'Bilbao',
    address: 'Plaza Mayor 1, 48001 Bilbao',
    areas: [
      { slug: 'casco-viejo', name: 'Casco Viejo', address: 'Calle del Correo 1, 48005 Bilbao', postcode: '48005' },
      { slug: 'deusto', name: 'Deusto', address: 'Calle de Deusto 1, 48014 Bilbao', postcode: '48014' },
      { slug: 'begona', name: 'Begoña', address: 'Calle Begoña 1, 48006 Bilbao', postcode: '48006' },
      { slug: 'barakaldo', name: 'Barakaldo', address: 'Calle San Vicente 1, 48901 Barakaldo', postcode: '48901' },
      { slug: 'getxo', name: 'Getxo', address: 'Calle Mayor 1, 48930 Getxo', postcode: '48930' },
    ],
  },
  {
    slug: 'alicante',
    name: 'Alicante',
    address: 'Plaza del Ayuntamiento 1, 03002 Alicante',
    areas: [
      { slug: 'centro-alicante', name: 'Centro', address: 'Avenida de la Constitución 1, 03002 Alicante', postcode: '03002' },
      { slug: 'carolinas', name: 'Carolinas', address: 'Calle Carolinas 1, 03007 Alicante', postcode: '03007' },
      { slug: 'san-blas', name: 'San Blas', address: 'Avenida de Denia 1, 03016 Alicante', postcode: '03016' },
      { slug: 'elche', name: 'Elche', address: 'Calle Mayor 1, 03201 Elche', postcode: '03201' },
    ],
  },
  {
    slug: 'murcia',
    name: 'Murcia',
    address: 'Plaza Cardinal Belluga 1, 30001 Murcia',
    areas: [
      { slug: 'centro-murcia', name: 'Centro', address: 'Calle Trapería 1, 30001 Murcia', postcode: '30001' },
      { slug: 'espinardo', name: 'Espinardo', address: 'Calle Mayor 1, 30100 Espinardo', postcode: '30100' },
      { slug: 'el-palmar', name: 'El Palmar', address: 'Calle Real 1, 30120 El Palmar', postcode: '30120' },
      { slug: 'cartagena', name: 'Cartagena', address: 'Calle Mayor 1, 30201 Cartagena', postcode: '30201' },
    ],
  },
  {
    slug: 'valladolid',
    name: 'Valladolid',
    address: 'Plaza Mayor 1, 47001 Valladolid',
    areas: [
      { slug: 'centro-valladolid', name: 'Centro', address: 'Calle Santiago 1, 47001 Valladolid', postcode: '47001' },
      { slug: 'parquesol', name: 'Parquesol', address: 'Calle Salamanca 1, 47014 Valladolid', postcode: '47014' },
      { slug: 'las-delicias', name: 'Las Delicias', address: 'Calle Panaderos 1, 47004 Valladolid', postcode: '47004' },
    ],
  },
]

export function getDistrictBySlug(slug: string): District | undefined {
  return LOCATIONS.find((d) => d.slug === slug)
}

export function getAreaBySlug(districtSlug: string, areaSlug: string): CityArea | undefined {
  const district = getDistrictBySlug(districtSlug)
  return district?.areas.find((a) => a.slug === areaSlug)
}
