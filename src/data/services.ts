export const services = [
  {
    slug: "instalacion-residencial",
    title: "Instalación residencial",
    summary:
      "Placas solares para viviendas unifamiliares, chalets y comunidades de vecinos, dimensionadas según tu consumo real.",
    description: [
      "Diseñamos la instalación fotovoltaica de tu vivienda a partir de tu factura eléctrica real, la orientación del tejado y las horas de sombra a lo largo del año, para que el número de paneles se ajuste a lo que realmente consumes.",
      "Nos encargamos de todo el proceso: proyecto técnico, instalación, alta de autoconsumo ante la compañía eléctrica y, si el ayuntamiento lo requiere, la tramitación de la licencia correspondiente. Tú solo tienes que firmar y empezar a ahorrar.",
    ],
    benefits: [
      "Reduce tu factura eléctrica desde el primer mes de funcionamiento",
      "Diseño a medida según tu tejado, orientación y consumo real",
      "Gestión completa de permisos y alta de autoconsumo",
      "Posibilidad de añadir batería de acumulación para consumir tu propia energía por la noche",
    ],
  },
  {
    slug: "instalacion-industrial-comercial",
    title: "Instalación comercial e industrial",
    summary:
      "Autoconsumo fotovoltaico para naves, oficinas, comercios y explotaciones agrícolas, con estudio de amortización previo.",
    description: [
      "Para negocios, naves industriales y explotaciones agrícolas, el consumo eléctrico suele concentrarse en horario diurno, justo cuando la producción solar es mayor. Eso hace que el autoconsumo industrial tenga, en la mayoría de los casos, un retorno de la inversión más rápido que en vivienda.",
      "Estudiamos tu curva de consumo, dimensionamos la instalación para tu actividad y te entregamos un informe de amortización estimada antes de que tomes ninguna decisión. Nos encargamos de la ingeniería, la instalación y la legalización de instalaciones de mayor potencia.",
    ],
    benefits: [
      "Reduce costes operativos y mejora el margen del negocio",
      "Estudio de amortización y retorno de la inversión incluido en el presupuesto",
      "Dimensionado para consumos elevados y horarios comerciales o industriales",
      "Gestión de la normativa y trámites de instalaciones de mayor potencia",
    ],
  },
  {
    slug: "mantenimiento-revision",
    title: "Mantenimiento y revisión",
    summary:
      "Revisión periódica, limpieza y monitorización de instalaciones existentes para mantener el rendimiento y la garantía al día.",
    description: [
      "Una instalación fotovoltaica sin mantenimiento pierde rendimiento con el tiempo: suciedad acumulada, conexiones que se aflojan o inversores que empiezan a fallar sin que se note en el día a día. Ofrecemos revisión de instalaciones propias y también de instalaciones hechas por otra empresa.",
      "Cada revisión incluye limpieza de módulos, comprobación del inversor y del cableado, y verificación de que la producción registrada coincide con la esperada para la época del año. Te entregamos un informe técnico con el resultado y, si detectamos algo, te lo explicamos antes de actuar.",
    ],
    benefits: [
      "Mantiene el rendimiento óptimo de tus paneles durante toda su vida útil",
      "Detecta averías antes de que afecten a tu ahorro",
      "Conserva la garantía del fabricante al cumplir con el mantenimiento exigido",
      "Informe técnico por escrito después de cada visita",
    ],
  },
] as const;
