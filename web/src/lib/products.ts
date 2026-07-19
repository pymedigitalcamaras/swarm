export const products = [
  {
    id: 1,
    model: 'OBT-050-DKFXRS',
    line: 'ACS',
    type: 'acs',
    compressor: '1 Compresor',
    capacity: 17.8,
    flow: '383 L/h',
    temp: '60°C',
    daily: '5.000 litros/día',
    application: 'residential',
    image: '/5P.jpg'
  },
  {
    id: 2,
    model: 'OBT-070-DKFXRS',
    line: 'ACS',
    type: 'acs',
    compressor: '1 Compresor',
    capacity: 22.3,
    flow: '499 L/h',
    temp: '60°C',
    daily: '5.000 litros/día',
    application: 'residential',
    image: '/5P.jpg'
  },
  {
    id: 3,
    model: 'OBT-100-DKFXRS',
    line: 'ACS',
    type: 'acs',
    compressor: '2 Compresores',
    capacity: 35.6,
    flow: '766 L/h',
    temp: '60°C',
    daily: '10.000 litros/día',
    application: 'commercial',
    image: '/10P-1.jpg'
  },
  {
    id: 4,
    model: 'OBT-120-DKFXRS',
    line: 'ACS',
    type: 'acs',
    compressor: '2 Compresores',
    capacity: 42,
    flow: '902 L/h',
    temp: '60°C',
    daily: '10.000 litros/día',
    application: 'commercial',
    image: '/10P-1.jpg'
  },
  {
    id: 5,
    model: 'OBT-100-DKFXRS (Vertical)',
    line: 'ACS',
    type: 'acs',
    compressor: '1 Compresor',
    capacity: 38.6,
    flow: '830 L/h',
    temp: '60°C',
    daily: '10.000 litros/día',
    application: 'commercial',
    image: '/14.jpg'
  },
  {
    id: 6,
    model: 'OBT-120-DKFXRS (Vertical)',
    line: 'ACS',
    type: 'acs',
    compressor: '1 Compresor',
    capacity: 44.2,
    flow: '950 L/h',
    temp: '60°C',
    daily: '10.000 litros/día',
    application: 'commercial',
    image: '/14.jpg'
  },
  {
    id: 7,
    model: 'DKFXRS-050H-HW',
    line: 'Piscina',
    type: 'pool',
    compressor: '1 Compresor',
    capacity: 20.5,
    consumption: '4,0 kW',
    temp: '28°C',
    volume: '32 m³',
    application: 'residential',
    image: '/3.png'
  },
  {
    id: 8,
    model: 'DKFXRS-100H-HW',
    line: 'Piscina',
    type: 'pool',
    compressor: '2 Compresores',
    capacity: 45,
    consumption: '8,2 kW',
    temp: '28°C',
    volume: '72 m³',
    application: 'commercial',
    image: '/3.png'
  },
  {
    id: 9,
    model: 'DKFXRS-050H',
    line: 'Climatización',
    type: 'clima',
    compressor: '1 Compresor',
    capacity: 5,
    area: '100-110 m²',
    buffer: '60L',
    pump: 'Wilo PUN-201',
    application: 'residential',
    image: '/5P.jpg'
  },
  {
    id: 10,
    model: 'DKFXRS-080H',
    line: 'Climatización',
    type: 'clima',
    compressor: '1 Compresor',
    capacity: 5,
    area: '150-160 m²',
    buffer: '120L',
    pump: 'Wilo PUN-601',
    application: 'residential',
    image: '/5P.jpg'
  },
  {
    id: 11,
    model: 'DKFXRS-100H',
    line: 'Climatización',
    type: 'clima',
    compressor: '1 Compresor',
    capacity: 5,
    area: '200-220 m²',
    buffer: '150L',
    pump: 'Wilo PUN-750',
    application: 'residential',
    image: '/5P.jpg'
  },
  {
    id: 12,
    model: 'CGK/D-52',
    line: 'Comercial/Industrial',
    type: 'clima',
    refrigerant: 'R410A',
    capacity: 52,
    format: 'Monoblock',
    controller: 'SPRSUN',
    application: 'industrial',
    image: '/10P-1.jpg'
  },
  {
    id: 13,
    model: 'CGK-151V4-B',
    line: 'Comercial/Industrial',
    type: 'clima',
    refrigerant: 'R290 DC Inverter',
    capacity: 50,
    controller: 'Touchscreen',
    modes: 'Hot water/Heating/Cooling',
    application: 'industrial',
    image: '/10P-1.jpg'
  },
  {
    id: 14,
    model: 'CGK-300V4-B',
    line: 'Comercial/Industrial',
    type: 'clima',
    refrigerant: 'R290 DC Inverter',
    capacity: 100,
    controller: 'Touchscreen',
    modes: 'Hot water/Heating/Cooling',
    application: 'industrial',
    image: '/14.jpg'
  },
  {
    id: 15,
    model: 'CGK-150V3L-B',
    line: 'Comercial/Industrial',
    type: 'clima',
    refrigerant: 'R32 DC Inverter',
    capacity: 45.1,
    controller: 'Touchscreen',
    modes: 'Hot water/Heating/Cooling',
    application: 'industrial',
    image: '/14.jpg'
  },
  {
    id: 16,
    model: 'Estanque cuadrado acero inoxidable',
    line: 'Accesorios',
    type: 'acs',
    material: 'Acero inoxidable',
    assembly: 'Para armar',
    volume: '1-10 m³',
    application: 'residential',
    image: '/estanque.jpg'
  },
  {
    id: 17,
    model: 'Estanque cilíndrico acero inoxidable',
    line: 'Accesorios',
    type: 'acs',
    material: 'Acero inoxidable',
    assembly: 'Armado',
    volume: '1-10 m³',
    application: 'residential',
    image: '/estanque.jpg'
  }
];

export const typeLabels: Record<string, string> = {
  acs: 'ACS',
  clima: 'Climatización',
  pool: 'Piscina'
};

export const appLabels: Record<string, string> = {
  residential: 'Residencial',
  commercial: 'Comercial',
  industrial: 'Industrial'
};