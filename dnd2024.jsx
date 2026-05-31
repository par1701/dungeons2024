import { useState } from "react";

// ─── Datos del sistema ────────────────────────────────────────────────────────

const HABS = [
  { id: "acrobacia",      nombre: "Acrobacia",           attr: "des" },
  { id: "trato_animales", nombre: "Trato con Animales",  attr: "sab" },
  { id: "arcanos",        nombre: "Arcanos",             attr: "int" },
  { id: "atletismo",      nombre: "Atletismo",           attr: "fue" },
  { id: "engano",         nombre: "Engaño",              attr: "car" },
  { id: "historia",       nombre: "Historia",            attr: "int" },
  { id: "perspicacia",    nombre: "Perspicacia",         attr: "sab" },
  { id: "intimidacion",   nombre: "Intimidación",        attr: "car" },
  { id: "investigacion",  nombre: "Investigación",       attr: "int" },
  { id: "medicina",       nombre: "Medicina",            attr: "sab" },
  { id: "naturaleza",     nombre: "Naturaleza",          attr: "int" },
  { id: "percepcion",     nombre: "Percepción",          attr: "sab" },
  { id: "actuacion",      nombre: "Actuación",           attr: "car" },
  { id: "persuasion",     nombre: "Persuasión",          attr: "car" },
  { id: "religion",       nombre: "Religión",            attr: "int" },
  { id: "juego_manos",    nombre: "Juego de Manos",      attr: "des" },
  { id: "sigilo",         nombre: "Sigilo",              attr: "des" },
  { id: "supervivencia",  nombre: "Supervivencia",       attr: "sab" },
];

const ATTRS = ["fue", "des", "con", "int", "sab", "car"];
const ATTR_NOMBRE = { fue: "Fuerza", des: "Destreza", con: "Constitución", int: "Inteligencia", sab: "Sabiduría", car: "Carisma" };
const ATTR_CORTO  = { fue: "FUE",    des: "DES",      con: "CON",          int: "INT",          sab: "SAB",       car: "CAR" };

// PHB 2024 + suplementos (Tasha's, Fizban's, Monsters of the Multiverse, Spelljammer, SCAG, Eberron...)
const ESPECIES = [
  // ── PHB 2024 ──────────────────────────────────────────
  "Aasimar",
  "Dracónido",
  "Elfo",
  "Enano",
  "Gnomo",
  "Mediano",
  "Humano",
  "Orco",
  "Tiefling",
  // ── Subespecies de PHB ────────────────────────────────
  "Dracónido Abismal",
  "Dracónido Cromatico",
  "Dracónido Metálico",
  "Elfo del Amanecer (Eladrin)",
  "Elfo del Bosque",
  "Elfo del Mar",
  "Elfo de las Sombras (Shadar-kai)",
  "Elfo Drow",
  "Elfo Astral",
  "Enano de las Colinas",
  "Enano de las Montañas",
  "Enano Gris (Duergar)",
  "Gnomo de las Profundidades",
  "Gnomo de las Rocas",
  "Gnomo Forestal",
  "Mediano Apacible",
  "Mediano Fornido",
  "Tiefling de Asmodeo",
  "Tiefling de Baalzebul",
  "Tiefling de Dispater",
  "Tiefling de Fierna",
  "Tiefling de Glasya",
  "Tiefling de Levistus",
  "Tiefling de Mammon",
  "Tiefling de Mephistófeles",
  "Tiefling de Zariel",
  // ── Tasha's / MotM ────────────────────────────────────
  "Aarakocra",
  "Bugbear",
  "Cambiante (Changeling)",
  "Centauro",
  "Fauno (Sátiro)",
  "Firbolg",
  "Genasi de Agua",
  "Genasi de Aire",
  "Genasi de Fuego",
  "Genasi de Tierra",
  "Goblin",
  "Goliath",
  "Harengon",
  "Hobgoblin",
  "Kenku",
  "Kobold",
  "Lagartija (Lizardfolk)",
  "Leonino",
  "Loxodón",
  "Minotauro",
  "Simic Híbrido",
  "Tabaxi",
  "Tortle",
  "Tritón",
  "Vedalken",
  "Yuan-ti",
  // ── Eberron ───────────────────────────────────────────
  "Cambiante de Eberron",
  "Kalashtar",
  "Linaje Artificial (Warforged)",
  "Mutante (Shifter)",
  // ── Spelljammer ───────────────────────────────────────
  "Autognomo",
  "Giff",
  "Hadozee",
  "Plasmoide",
  "Thri-kreen",
  // ── Otro ──────────────────────────────────────────────
  "Linaje Personalizado",
  "Otra",
];

const CLASES = [
  // PHB 2024
  "Bárbaro",
  "Bardo",
  "Brujo",
  "Clérigo",
  "Druida",
  "Explorador",
  "Guerrero",
  "Hechicero",
  "Mago",
  "Monje",
  "Paladín",
  "Pícaro",
  // Tasha's Cauldron of Everything
  "Artificiero",
];

const TRASFONDOS = [
  // ── PHB 2024 ──────────────────────────────────────────
  "Acólito",
  "Artesano",
  "Charlatán",
  "Criminal",
  "Entretenido",
  "Ermitaño",
  "Escriba",
  "Granjero",
  "Guardia",
  "Guía",
  "Marinero",
  "Mercader",
  "Noble",
  "Sabio",
  "Soldado",
  "Viajero",
  // ── Sword Coast Adventurer's Guide ────────────────────
  "Artesano del Clan",
  "Ciudad Vigilante",
  "Contrabandista",
  "Faccioso de la Ciudad",
  "Heredero",
  "Iniciado de Harpers",
  "Investigador",
  "Mercenario Veterano",
  "Navegante",
  "Orfebre",
  "Pirata",
  "Viajero Lejano",
  // ── Xanathar's Guide to Everything ───────────────────
  "Secuaz del Crimen Organizado",
];
const ALINEAMIENTOS = ["Legal Bueno","Neutral Bueno","Caótico Bueno","Legal Neutral","Neutral Verdadero","Caótico Neutral","Legal Malvado","Neutral Malvado","Caótico Malvado"];
const DADO_CLASE = {
  "Bárbaro": "d12", "Bardo": "d8", "Brujo": "d8", "Clérigo": "d8",
  "Druida": "d8", "Explorador": "d10", "Guerrero": "d10", "Hechicero": "d6",
  "Mago": "d6", "Monje": "d10", "Paladín": "d10", "Pícaro": "d8",
  "Artificiero": "d8",
};
const MAESTRIAS    = ["—","Lento","Empuje","Volteo","Corte","Pinchazo","Rápido","Flex","Alerta"];

// Subclases por clase (PHB 2024 marcadas con ✦, suplementos sin marca)
const SUBCLASES = {
  "Bárbaro": [
    "✦ Camino del Berserker",
    "✦ Camino del Corazón Salvaje",
    "✦ Camino del Árbol del Mundo",
    "✦ Camino del Zelota",
    "Camino del Espíritu Ancestral",
    "Camino del Abolidor de Magia",
    "Camino de la Bestia",
    "Camino de la Tormenta",
    "Camino de la Fuerza Primordial",
  ],
  "Bardo": [
    "✦ Colegio de la Danza",
    "✦ Colegio del Glamour",
    "✦ Colegio del Saber",
    "✦ Colegio del Valor",
    "Colegio de la Creación",
    "Colegio de la Elocuencia",
    "Colegio de las Espadas",
    "Colegio de los Susurros",
  ],
  "Brujo": [
    "✦ Patrón del Gran Antiguo",
    "✦ Patrón Celestial",
    "✦ Patrón del Archifeérico",
    "✦ Patrón del Diablo",
    "Patrón de la Hoja de la Estrella",
    "Patrón del Genio",
    "Patrón del Hundido",
    "Patrón de la Entidad del Más Allá",
  ],
  "Clérigo": [
    "✦ Dominio de la Vida",
    "✦ Dominio de la Luz",
    "✦ Dominio de la Travesura",
    "✦ Dominio de la Guerra",
    "Dominio Arcano",
    "Dominio de la Forja",
    "Dominio de la Tumba",
    "Dominio del Conocimiento",
    "Dominio de la Muerte",
    "Dominio de la Naturaleza",
    "Dominio del Orden",
    "Dominio de la Paz",
    "Dominio de la Tempestad",
    "Dominio del Crepúsculo",
  ],
  "Druida": [
    "✦ Círculo de la Tierra",
    "✦ Círculo de la Luna",
    "✦ Círculo del Mar",
    "✦ Círculo de las Estrellas",
    "Círculo de las Esporas",
    "Círculo del Pastor",
    "Círculo de los Sueños",
    "Círculo del Fuego Salvaje",
  ],
  "Explorador": [
    "✦ Conclave del Maestro de Bestias",
    "✦ Conclave del Cazador",
    "✦ Conclave del Trotamundos Feérico",
    "✦ Conclave del Merodeador del Crepúsculo",
    "Conclave del Explorador del Horizonte",
    "Conclave del Navegante Místico",
  ],
  "Guerrero": [
    "✦ Maestro de Batalla",
    "✦ Campeón",
    "✦ Caballero Arcano",
    "✦ Guerrero Psíquico",
    "Guerrero Arcano Rúnico",
    "Caballero del Eco",
    "Caballero Púrpura",
    "Samurái",
  ],
  "Hechicero": [
    "✦ Linaje Dracónico",
    "✦ Alma Silvestre",
    "✦ Mente Aberrante",
    "✦ Alma Mecánica",
    "Magia de Tormenta",
    "Alma del Crepúsculo",
    "Corazón de Fuego",
    "Magia Divina",
  ],
  "Mago": [
    "✦ Escuela de Abjuración",
    "✦ Escuela de Adivinación",
    "✦ Escuela de Conjuración",
    "✦ Escuela de Encantamiento",
    "✦ Escuela de Evocación",
    "✦ Escuela de Ilusión",
    "✦ Escuela de Nigromancia",
    "✦ Escuela de Transmutación",
    "Tradición de la Hoja de Guerra",
    "Tradición del Orden de los Escribas",
    "Cronurgia",
    "Graviturgia",
  ],
  "Monje": [
    "✦ Tradición del Puño Abierto",
    "✦ Tradición de la Sombra",
    "✦ Tradición de los Cuatro Elementos",
    "✦ Tradición de la Misericordia",
    "Tradición del Alma Kensai",
    "Tradición del Alma Ebria",
    "Tradición del Sol",
    "Tradición del Puño Largo",
  ],
  "Paladín": [
    "✦ Juramento de Devoción",
    "✦ Juramento de los Antiguos",
    "✦ Juramento de Venganza",
    "✦ Juramento de Gloria",
    "Juramento del Conquistador",
    "Juramento de la Corona",
    "Juramento de Redención",
    "Juramento de los Centinelas",
    "Ruptura de Juramento",
  ],
  "Pícaro": [
    "✦ Embaucador Arcano",
    "✦ Asesino",
    "✦ Ladrón",
    "✦ Alma Afilada",
    "Explorador Inquisidor",
    "Fantasma",
    "Maestro de los Cuchillos",
    "Mensajero",
  ],
  "Artificiero": [
    "Alquimista",
    "Artillero",
    "Armero",
    "Herrero de Batalla",
  ],
};

// Dotes PHB 2024 (✦ = Origen | ★ = Don Épico | sin marca = General)
const DOTES_PHB = [
  // ── Origen (nivel 1) ───────────────────────────────────
  "✦ Alerta",
  "✦ Artesano",
  "✦ Afortunado",
  "✦ Atacante Salvaje",
  "✦ Habilidoso",
  "✦ Iniciado en Magia: Clérigo",
  "✦ Iniciado en Magia: Druida",
  "✦ Iniciado en Magia: Mago",
  "✦ Músico",
  "✦ Pendenciero de Taberna",
  "✦ Robusto",
  "✦ Sanador",
  // ── Generales (nivel 4+) ───────────────────────────────
  "Actor",
  "Adepto Elemental",
  "Aplastador",
  "Atleta",
  "Cargador",
  "Centinela",
  "Combatiente Montado",
  "Cortador",
  "Duelista Defensivo",
  "Durable",
  "Experto con Ballesta",
  "Experto en Habilidades",
  "Exploradora de Mazmorras",
  "Golpeador",
  "Gran Maestro de Armas",
  "Hechicero en Combate",
  "Iniciado Ritual",
  "Inspirador",
  "Luchador con Dos Armas",
  "Maestro de Armadura Pesada",
  "Maestro de Armas de Asta",
  "Maestro del Escudo",
  "Mejora de Puntuación de Característica",
  "Merodeador",
  "Observador",
  "Perforador",
  "Resiliente",
  "Sniper de Conjuros",
  "Telequinético",
  "Telepático",
  "Tirador Certero",
  "Tocado por el Feérico",
  "Tocado por las Sombras",
  "Velocista",
  // ── Estilos de Combate (dotes en 2024) ────────────────
  "Estilo: Arquería",
  "Estilo: Combate a Ciegas",
  "Estilo: Defensa",
  "Estilo: Duelo",
  "Estilo: Lucha con Armas Grandes",
  "Estilo: Intercepción",
  "Estilo: Protección",
  "Estilo: Armas Arrojadizas",
  "Estilo: Lucha con Dos Armas",
  "Estilo: Combate sin Armas",
  // ── Dones Épicos (nivel 19+) ──────────────────────────
  "★ Don: Valor en Combate",
  "★ Don: Viaje Dimensional",
  "★ Don: Resistencia a Energía",
  "★ Don: Destino",
  "★ Don: Fortaleza",
  "★ Don: Ataque Irresistible",
  "★ Don: Recuperación",
  "★ Don: Habilidades",
  "★ Don: Velocidad",
  "★ Don: Recuerdo de Conjuros",
  "★ Don: Espíritu Nocturno",
  "★ Don: Visión Verdadera",
];

// Datos mecánicos de los trasfondos PHB 2024
// ASI: qué atributos suben y cuánto | habilidades: IDs de competencias | dote: nombre de la dote de origen
const DATOS_TRASFONDO = {
  "Acólito":    { asi: { sab: 2, int: 1 }, habilidades: ["perspicacia", "religion"],       herramienta: "Suministros de calígrafo",           dote: "✦ Iniciado en Magia: Clérigo" },
  "Artesano":   { asi: { int: 2, sab: 1 }, habilidades: ["perspicacia", "persuasion"],      herramienta: "Herramientas de artesano (elige)",    dote: "✦ Artesano" },
  "Charlatán":  { asi: { car: 2, des: 1 }, habilidades: ["engano", "juego_manos"],          herramienta: "Kit de disfraz",                     dote: "✦ Habilidoso" },
  "Criminal":   { asi: { des: 2, int: 1 }, habilidades: ["sigilo", "engano"],               herramienta: "Herramientas de ladrón",             dote: "✦ Alerta" },
  "Entretenido":{ asi: { car: 2, des: 1 }, habilidades: ["acrobacia", "actuacion"],         herramienta: "Instrumento musical (elige)",         dote: "✦ Músico" },
  "Ermitaño":   { asi: { sab: 2, con: 1 }, habilidades: ["medicina", "religion"],           herramienta: "Herramientas de herbolario",          dote: "✦ Sanador" },
  "Escriba":    { asi: { int: 2, sab: 1 }, habilidades: ["investigacion", "percepcion"],    herramienta: "Suministros de calígrafo",           dote: "✦ Habilidoso" },
  "Granjero":   { asi: { con: 2, sab: 1 }, habilidades: ["trato_animales", "naturaleza"],   herramienta: "Herramientas de carpintero",          dote: "✦ Robusto" },
  "Guardia":    { asi: { fue: 2, int: 1 }, habilidades: ["atletismo", "percepcion"],        herramienta: "Instrumento musical (elige)",         dote: "✦ Alerta" },
  "Guía":       { asi: { sab: 2, des: 1 }, habilidades: ["atletismo", "supervivencia"],     herramienta: "Herramientas de cartógrafo",          dote: "✦ Iniciado en Magia: Druida" },
  "Marinero":   { asi: { fue: 2, des: 1 }, habilidades: ["atletismo", "percepcion"],        herramienta: "Herramientas de navegante",           dote: "✦ Pendenciero de Taberna" },
  "Mercader":   { asi: { car: 2, int: 1 }, habilidades: ["perspicacia", "persuasion"],      herramienta: "Herramientas de navegante",           dote: "✦ Afortunado" },
  "Noble":      { asi: { car: 2, int: 1 }, habilidades: ["historia", "persuasion"],         herramienta: "Juego de mesa (elige)",               dote: "✦ Habilidoso" },
  "Sabio":      { asi: { int: 2, sab: 1 }, habilidades: ["arcanos", "historia"],            herramienta: "Suministros de calígrafo",           dote: "✦ Iniciado en Magia: Mago" },
  "Soldado":    { asi: { fue: 2, con: 1 }, habilidades: ["atletismo", "intimidacion"],      herramienta: "Juego de mesa (elige)",               dote: "✦ Atacante Salvaje" },
  "Viajero":    { asi: { des: 2, sab: 1 }, habilidades: ["perspicacia", "sigilo"],          herramienta: "Herramientas de ladrón",             dote: "✦ Afortunado" },
};

// ─── Base de datos de conjuros PHB 2024 ──────────────────────────────────────
// v=nivel, esc=escuela, t=tiempo, alc=alcance, c=componentes, dur=duración,
// cls=clases, d=descripción mecánica breve (referencia rápida; consulta el PHB para reglas completas)

const ESCUELAS = ["Abjuración","Adivinación","Conjuración","Encantamiento","Evocación","Ilusión","Nigromancia","Transmutación"];

const CONJUROS_DB = [
  // ── TRUCOS (0) ────────────────────────────────────────────────────────────
  {nombre:"Estallido sobrenatural",   v:0,esc:"Evocación",    t:"1 acción",      alc:"27 m",          c:"V, S",    dur:"Instantáneo",   cls:["Brujo"],                                                  d:"1d10 fuerza; mejora con invocaciones del patrón."},
  {nombre:"Rayo de fuego",           v:0,esc:"Evocación",    t:"1 acción",      alc:"36 m",          c:"V, S",    dur:"Instantáneo",   cls:["Artificiero","Hechicero","Mago"],                         d:"Ataque de conjuro: 1d10 fuego (2d10 vs objetos inflamables)."},
  {nombre:"Taumaturgia",             v:0,esc:"Transmutación",t:"1 acción",      alc:"9 m",           c:"V",       dur:"Hasta 1 min",   cls:["Clérigo"],                                                d:"Efecto sobrenatural menor (voz, puertas, llamas, etc.)."},
  {nombre:"Orientación",             v:0,esc:"Adivinación",  t:"1 acción",      alc:"Toque",         c:"V, S",    dur:"Conc. 1 min",   cls:["Clérigo","Druida"],                                       d:"+1d4 a una tirada de habilidad del objetivo antes del fin del conjuro."},
  {nombre:"Luces danzarinas",        v:0,esc:"Ilusión",      t:"1 acción",      alc:"36 m",          c:"V, S, M", dur:"Conc. 1 min",   cls:["Artificiero","Bardo","Hechicero","Mago"],                  d:"Hasta 4 luces flotantes que puedes mover 18 m por acción."},
  {nombre:"Luz",                     v:0,esc:"Evocación",    t:"1 acción",      alc:"Toque",         c:"V, M",    dur:"1 hora",        cls:["Artificiero","Bardo","Clérigo","Hechicero","Mago"],        d:"Objeto tocado emite luz brillante 6 m y tenue otros 6 m."},
  {nombre:"Ilusión menor",           v:0,esc:"Ilusión",      t:"1 acción",      alc:"9 m",           c:"S, M",    dur:"1 min",         cls:["Bardo","Brujo","Hechicero","Mago"],                       d:"Sonido o imagen ilusoria en cubo de 1,5 m."},
  {nombre:"Mano de mago",            v:0,esc:"Conjuración",  t:"1 acción",      alc:"9 m",           c:"V, S",    dur:"1 min",         cls:["Artificiero","Bardo","Brujo","Hechicero","Mago"],          d:"Mano espectral que manipula objetos, abre puertas, etc."},
  {nombre:"Prestidigitación",        v:0,esc:"Transmutación",t:"1 acción",      alc:"3 m",           c:"V, S",    dur:"Hasta 1 hora",  cls:["Bardo","Brujo","Hechicero","Mago"],                       d:"Efectos mágicos menores: limpiar, enfriar, iluminar, sabor, etc."},
  {nombre:"Tañido de difuntos",      v:0,esc:"Nigromancia",  t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"Instantáneo",   cls:["Brujo","Clérigo","Mago"],                                 d:"1d8 necrótico (1d12 si objetivo tiene pocos PG). No afecta a no-muertos."},
  {nombre:"Burla mordaz",            v:0,esc:"Encantamiento",t:"1 acción",      alc:"18 m",          c:"V",       dur:"Instantáneo",   cls:["Bardo"],                                                  d:"1d4 psíquico; desventaja en sig. ataque (sal. SAB niega el daño)."},
  {nombre:"Rociada venenosa",        v:0,esc:"Conjuración",  t:"1 acción",      alc:"3 m",           c:"V, S",    dur:"Instantáneo",   cls:["Artificiero","Bruido","Druida","Hechicero","Mago"],        d:"1d12 veneno (sal. CON niega)."},
  {nombre:"Rayo de escarcha",        v:0,esc:"Evocación",    t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"Instantáneo",   cls:["Hechicero","Mago"],                                       d:"Ataque de conjuro: 1d8 frío; velocidad -3 m hasta tu sig. turno."},
  {nombre:"Toque helador",           v:0,esc:"Nigromancia",  t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"1 asalto",      cls:["Brujo","Hechicero","Mago"],                               d:"Ataque de conjuro: 1d8 necrótico; objetivo no recupera PG este asalto."},
  {nombre:"Llama sagrada",           v:0,esc:"Evocación",    t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"Instantáneo",   cls:["Clérigo"],                                                d:"1d8 radiante (sal. DES niega; sin bonificación por cobertura)."},
  {nombre:"Látigo de espinas",       v:0,esc:"Transmutación",t:"1 acción",      alc:"9 m",           c:"V, S, M", dur:"Instantáneo",   cls:["Druida"],                                                 d:"Ataque de conjuro: 1d6 perforante; acerca objetivo 3 m si impacta."},
  {nombre:"Artes druídicas",         v:0,esc:"Transmutación",t:"1 acción",      alc:"9 m",           c:"V, S",    dur:"Instantáneo",   cls:["Druida"],                                                 d:"Efectos menores de la naturaleza: luz, florecer plantas, puertas, etc."},
  {nombre:"Palabra de radiance",     v:0,esc:"Evocación",    t:"1 acción",      alc:"1,5 m",         c:"V",       dur:"Instantáneo",   cls:["Clérigo"],                                                d:"1d6 radiante a cada enemigo adyacente (sal. CON niega)."},
  {nombre:"Garrote",                 v:0,esc:"Transmutación",t:"Ac. adicional", alc:"Toque",         c:"V, S, M", dur:"Conc. 1 min",   cls:["Druida"],                                                 d:"Bastón mágico: usa SAB para atacar y causa 1d8 contundente."},
  {nombre:"Dar esperanza al moribundo",v:0,esc:"Abjuración", t:"1 acción",      alc:"Toque",         c:"V, S",    dur:"Instantáneo",   cls:["Clérigo","Druida"],                                       d:"Estabiliza una criatura con 0 PG."},
  {nombre:"Salpicadura ácida",       v:0,esc:"Conjuración",  t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"Instantáneo",   cls:["Hechicero","Mago"],                                       d:"1d6 ácido a 1–2 criaturas adyacentes (sal. DES niega a cada una)."},
  {nombre:"Trueno",                  v:0,esc:"Evocación",    t:"1 acción",      alc:"Personal (5 m)",c:"S",       dur:"Instantáneo",   cls:["Bardo","Druida","Hechicero","Mago","Brujo"],               d:"2d6 trueno a criaturas adyacentes (sal. CON mitad)."},
  {nombre:"Hoja retumbante",         v:0,esc:"Evocación",    t:"1 acción",      alc:"Personal",      c:"V, S, M", dur:"1 asalto",      cls:["Artificiero","Bardo","Hechicero","Mago"],                  d:"Ataque de arma c/c +1d8 trueno; objetivo envuelto en tormenta si se mueve."},
  {nombre:"Hoja llameante verde",    v:0,esc:"Evocación",    t:"1 acción",      alc:"Personal",      c:"V, S, M", dur:"Instantáneo",   cls:["Artificiero","Bardo","Hechicero","Mago"],                  d:"Ataque de arma c/c +1d8 fuego; salpica al objetivo más cercano."},
  {nombre:"Golpe certero",           v:0,esc:"Adivinación",  t:"1 acción",      alc:"Personal",      c:"S",       dur:"Conc. 1 asalto",cls:["Bardo","Brujo","Hechicero","Mago"],                       d:"Tu siguiente ataque tiene ventaja."},
  {nombre:"Reparación",              v:0,esc:"Transmutación",t:"1 min",         alc:"Toque",         c:"V, S, M", dur:"Instantáneo",   cls:["Artificiero","Bardo","Clérigo","Druida","Mago"],           d:"Repara un objeto roto (máximo 30 cm de rotura)."},
  {nombre:"Mensaje",                 v:0,esc:"Transmutación",t:"1 acción",      alc:"36 m",          c:"V, S, M", dur:"1 asalto",      cls:["Bardo","Hechicero","Mago"],                               d:"Susurras mensaje a un objetivo; puede responderte en susurros."},
  {nombre:"Mordedura helada",        v:0,esc:"Conjuración",  t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"Instantáneo",   cls:["Druida","Hechicero","Mago"],                              d:"1d6 frío (sal. CON niega); objetivo sin reacciones hasta su sig. turno."},
  // ── NIVEL 1 ───────────────────────────────────────────────────────────────
  {nombre:"Curar heridas",           v:1,esc:"Evocación",    t:"1 acción",      alc:"Toque",         c:"V, S",    dur:"Instantáneo",   cls:["Bardo","Clérigo","Druida","Explorador","Paladín"],        d:"1d8 + mod. conjuración PG recuperados."},
  {nombre:"Escudo",                  v:1,esc:"Abjuración",   t:"1 reacción",    alc:"Personal",      c:"V, S",    dur:"1 asalto",      cls:["Artificiero","Hechicero","Mago"],                         d:"+5 CA hasta inicio de tu sig. turno; inmune a Proyectil mágico."},
  {nombre:"Proyectil mágico",        v:1,esc:"Evocación",    t:"1 acción",      alc:"45 m",          c:"V, S",    dur:"Instantáneo",   cls:["Hechicero","Mago"],                                       d:"3 dardos de 1d4+1 fuerza, impacto automático."},
  {nombre:"Sueño",                   v:1,esc:"Encantamiento",t:"1 acción",      alc:"27 m",          c:"V, S, M", dur:"1 min",         cls:["Bardo","Hechicero","Mago"],                               d:"Duerme criaturas con ≤5d8 PG combinados (los de menor PG primero)."},
  {nombre:"Armadura de mago",        v:1,esc:"Abjuración",   t:"1 acción",      alc:"Toque",         c:"V, S, M", dur:"8 horas",       cls:["Hechicero","Mago"],                                       d:"CA base 13 + mod. DES si objetivo sin armadura."},
  {nombre:"Comprensión de idiomas",  v:1,esc:"Adivinación",  t:"1 acción",      alc:"Personal",      c:"V, S, M", dur:"1 hora",        cls:["Bardo","Brujo","Hechicero","Mago"],                       d:"Entiendes cualquier idioma hablado o escrito que percibas."},
  {nombre:"Detectar magia",          v:1,esc:"Adivinación",  t:"1 acción",      alc:"Personal",      c:"V, S",    dur:"Conc. 10 min",  cls:["Bardo","Clérigo","Druida","Explorador","Hechicero","Mago","Paladín"],d:"Sientes la magia en 9 m y percibes su escuela."},
  {nombre:"Imagen silenciosa",       v:1,esc:"Ilusión",      t:"1 acción",      alc:"18 m",          c:"V, S, M", dur:"Conc. 10 min",  cls:["Bardo","Hechicero","Mago"],                               d:"Imagen ilusoria de hasta 4,5×4,5 m (sin sonido)."},
  {nombre:"Hechizar persona",        v:1,esc:"Encantamiento",t:"1 acción",      alc:"9 m",           c:"V, S",    dur:"1 hora",        cls:["Bardo","Brujo","Clérigo","Druida","Hechicero","Mago"],     d:"Objetivo humanoide te considera amigo (sal. SAB niega)."},
  {nombre:"Palabra de curación",     v:1,esc:"Evocación",    t:"Ac. adicional", alc:"18 m",          c:"V",       dur:"Instantáneo",   cls:["Bardo","Clérigo","Druida"],                               d:"1d4 + mod. conjuración PG recuperados."},
  {nombre:"Bendecir",                v:1,esc:"Encantamiento",t:"1 acción",      alc:"9 m",           c:"V, S, M", dur:"Conc. 1 min",   cls:["Clérigo","Paladín"],                                      d:"Hasta 3 criaturas: +1d4 a tiradas de ataque y salvación."},
  {nombre:"Maldecir",                v:1,esc:"Encantamiento",t:"1 acción",      alc:"9 m",           c:"V, S, M", dur:"Conc. 1 hora",  cls:["Brujo","Clérigo"],                                        d:"Hasta 3 criaturas: -1d4 a tiradas de ataque y salvación."},
  {nombre:"Ola de trueno",           v:1,esc:"Evocación",    t:"1 acción",      alc:"Personal (3 m)",c:"V, S",    dur:"Instantáneo",   cls:["Bardo","Clérigo","Druida","Hechicero","Mago"],             d:"2d8 trueno a criaturas en 3 m y empuja 3 m (sal. CON mitad, no empuja)."},
  {nombre:"Enlace de maldición",     v:1,esc:"Encantamiento",t:"Ac. adicional", alc:"27 m",          c:"V, S",    dur:"Conc. 1 min",   cls:["Brujo"],                                                  d:"Objetivo con desventaja en salvaciones de una característica elegida."},
  {nombre:"Marca del cazador",       v:1,esc:"Adivinación",  t:"Ac. adicional", alc:"27 m",          c:"V",       dur:"Conc. 1 hora",  cls:["Explorador"],                                             d:"+1d6 daño al objetivo marcado en tu primer ataque de cada turno."},
  {nombre:"Identificar",             v:1,esc:"Adivinación",  t:"1 min",         alc:"Toque",         c:"V, S, M", dur:"Instantáneo",   cls:["Artificiero","Bardo","Mago"],                             d:"Conoces propiedades mágicas de un objeto y conjuros activos en él."},
  {nombre:"Caída de pluma",          v:1,esc:"Transmutación",t:"1 reacción",    alc:"18 m",          c:"V, M",    dur:"1 min",         cls:["Bardo","Hechicero","Mago"],                               d:"Hasta 5 criaturas descienden a 18 m/asalto y aterrizan sin daño."},
  {nombre:"Detectar bien y mal",     v:1,esc:"Adivinación",  t:"1 acción",      alc:"Personal",      c:"V, S",    dur:"Conc. 10 min",  cls:["Clérigo","Paladín"],                                      d:"Percibes aberraciones, celestiales, fiends y no-muertos en 9 m."},
  {nombre:"Arma mágica",             v:1,esc:"Transmutación",t:"Ac. adicional", alc:"Toque",         c:"V, S",    dur:"Conc. 1 hora",  cls:["Artificiero","Mago","Paladín"],                           d:"Arma mundana se convierte en +1 mágica."},
  {nombre:"Zancada veloz",           v:1,esc:"Transmutación",t:"1 acción",      alc:"Toque",         c:"V, S",    dur:"1 hora",        cls:["Bardo","Druida","Explorador","Hechicero","Mago"],          d:"Velocidad del objetivo +3 m."},
  {nombre:"Gracia feérica",          v:1,esc:"Transmutación",t:"1 acción",      alc:"9 m",           c:"V, S",    dur:"Conc. 1 min",   cls:["Bardo","Druida"],                                         d:"Ventaja en tiradas de DES; no activa trampas de presión ni suelo inestable."},
  {nombre:"Alarma",                  v:1,esc:"Abjuración",   t:"1 min",         alc:"9 m",           c:"V, S, M", dur:"8 horas",       cls:["Artificiero","Explorador","Mago"],                         d:"Alerta mental o sonora si una criatura entra en un área de hasta 6×6 m."},
  {nombre:"Esfera de fuego de Melf", v:1,esc:"Conjuración",  t:"1 acción",      alc:"18 m",          c:"V, S, M", dur:"Conc. 1 min",   cls:["Druida","Hechicero","Mago"],                              d:"Esfera 1,5 m: criaturas que la toquen sufren 2d6 fuego (sal. DES mitad)."},
  // ── NIVEL 2 ───────────────────────────────────────────────────────────────
  {nombre:"Invisibilidad",           v:2,esc:"Ilusión",      t:"1 acción",      alc:"Toque",         c:"V, S, M", dur:"Conc. 1 hora",  cls:["Artificiero","Bardo","Brujo","Hechicero","Mago"],          d:"Objetivo invisible hasta que ataque o lance un conjuro."},
  {nombre:"Sugestión",               v:2,esc:"Encantamiento",t:"1 acción",      alc:"9 m",           c:"V, M",    dur:"Conc. 8 horas", cls:["Bardo","Brujo","Hechicero","Mago"],                       d:"Objetivo sigue una sugestión razonable (sal. SAB niega)."},
  {nombre:"Visión en la oscuridad",  v:2,esc:"Transmutación",t:"1 acción",      alc:"Toque",         c:"V, S, M", dur:"8 horas",       cls:["Druida","Explorador","Hechicero","Mago"],                 d:"Objetivo gana visión en oscuridad hasta 18 m."},
  {nombre:"Arma espiritual",         v:2,esc:"Evocación",    t:"Ac. adicional", alc:"18 m",          c:"V, S",    dur:"1 min",         cls:["Clérigo"],                                                d:"Arma espectral que atacas como acción adicional (1d8 + mod. conj.)."},
  {nombre:"Silencio",                v:2,esc:"Ilusión",      t:"1 acción",      alc:"36 m",          c:"V, S",    dur:"Conc. 10 min",  cls:["Bardo","Clérigo","Explorador"],                           d:"Esfera 6 m sin sonido; bloquea conjuros con componente V."},
  {nombre:"Paso brumoso",            v:2,esc:"Conjuración",  t:"Ac. adicional", alc:"Personal",      c:"V",       dur:"Instantáneo",   cls:["Brujo","Hechicero","Mago"],                               d:"Teletransportación hasta 9 m a un espacio visible."},
  {nombre:"Oscuridad",               v:2,esc:"Evocación",    t:"1 acción",      alc:"18 m",          c:"V, M",    dur:"Conc. 10 min",  cls:["Brujo","Hechicero","Mago"],                               d:"Esfera 4,5 m de oscuridad mágica impenetrable para visión en la oscuridad normal."},
  {nombre:"Detectar pensamientos",   v:2,esc:"Adivinación",  t:"1 acción",      alc:"Personal",      c:"V, S, M", dur:"Conc. 1 min",   cls:["Bardo","Hechicero","Mago"],                               d:"Lees pensamientos superficiales de una criatura (sal. SAB niega)."},
  {nombre:"Imagen reflejada",        v:2,esc:"Ilusión",      t:"1 acción",      alc:"Personal",      c:"V, S",    dur:"1 min",         cls:["Brujo","Hechicero","Mago"],                               d:"3 duplicados ilusorios desvían ataques; tira 1d20 para ver si impactan."},
  {nombre:"Rayo abrasador",          v:2,esc:"Evocación",    t:"1 acción",      alc:"27 m",          c:"V, S",    dur:"Instantáneo",   cls:["Hechicero","Mago"],                                       d:"3 rayos de 2d6 fuego (cada uno es un ataque de conjuro por separado)."},
  {nombre:"Levitación",              v:2,esc:"Transmutación",t:"1 acción",      alc:"18 m",          c:"V, S, M", dur:"Conc. 10 min",  cls:["Artificiero","Hechicero","Mago"],                         d:"Objetivo sube/baja hasta 6 m por turno; no se mueve horizontalmente."},
  {nombre:"Viento cortante",         v:2,esc:"Evocación",    t:"1 acción",      alc:"Personal (18 m)",c:"V, S",   dur:"Instantáneo",   cls:["Druida","Hechicero","Mago"],                              d:"Línea 18×1,5 m: 3d8 frío y velocidad -50% (sal. CON mitad, vel. normal)."},
  {nombre:"Mantener a raya",         v:2,esc:"Encantamiento",t:"1 acción",      alc:"18 m",          c:"V, S, M", dur:"Conc. 1 min",   cls:["Clérigo","Paladín"],                                      d:"Hasta 3 criaturas quedan paralizadas (sal. SAB niega; repiten cada turno)."},
  {nombre:"Aguijón ácido de Melf",   v:2,esc:"Evocación",    t:"1 acción",      alc:"18 m",          c:"V, S, M", dur:"Fin sig. turno",cls:["Hechicero","Mago"],                                       d:"Ataque: 4d4 ácido inmediato + 2d4 ácido al inicio de tu sig. turno."},
  {nombre:"Calmar emociones",        v:2,esc:"Encantamiento",t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"Conc. 1 min",   cls:["Bardo","Clérigo"],                                        d:"Suprime hechizo o elimina hostilidad de criaturas en esfera 6 m."},
  {nombre:"Zona de verdad",          v:2,esc:"Encantamiento",t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"10 min",        cls:["Clérigo","Paladín"],                                      d:"Criaturas en esfera 4,5 m no pueden mentir intencionadamente."},
  {nombre:"Inmovilizar persona",     v:2,esc:"Encantamiento",t:"1 acción",      alc:"18 m",          c:"V, S, M", dur:"Conc. 1 min",   cls:["Bardo","Clérigo","Druida","Hechicero","Mago"],             d:"Humanoide paralizado (sal. SAB niega; repite al final de cada turno)."},
  // ── NIVEL 3 ───────────────────────────────────────────────────────────────
  {nombre:"Bola de fuego",           v:3,esc:"Evocación",    t:"1 acción",      alc:"45 m",          c:"V, S, M", dur:"Instantáneo",   cls:["Hechicero","Mago"],                                       d:"8d6 fuego en radio de 6 m (sal. DES mitad)."},
  {nombre:"Relámpago",               v:3,esc:"Evocación",    t:"1 acción",      alc:"Personal (27 m)",c:"V, S, M",dur:"Instantáneo",   cls:["Hechicero","Mago"],                                       d:"Línea 27 m: 8d6 rayo (sal. DES mitad)."},
  {nombre:"Contraconjuro",           v:3,esc:"Abjuración",   t:"1 reacción",    alc:"18 m",          c:"S",       dur:"Instantáneo",   cls:["Brujo","Hechicero","Mago"],                               d:"Cancela conjuro de nivel ≤3. Niveles superiores: tirada con mod. conjuración."},
  {nombre:"Disipar magia",           v:3,esc:"Abjuración",   t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"Instantáneo",   cls:["Bardo","Brujo","Clérigo","Druida","Hechicero","Mago","Paladín"],d:"Elimina efectos mágicos del objetivo. Vs. niveles superiores: tirada."},
  {nombre:"Vuelo",                   v:3,esc:"Transmutación",t:"1 acción",      alc:"Toque",         c:"V, S, M", dur:"Conc. 10 min",  cls:["Artificiero","Brujo","Hechicero","Mago"],                  d:"Objetivo gana velocidad de vuelo de 18 m."},
  {nombre:"Imagen mayor",            v:3,esc:"Ilusión",      t:"1 acción",      alc:"27 m",          c:"V, S, M", dur:"Conc. 10 min",  cls:["Bardo","Hechicero","Mago"],                               d:"Ilusión con imagen, sonido, olor y temperatura; cubo de hasta 6 m."},
  {nombre:"Tormenta de nieve",       v:3,esc:"Conjuración",  t:"1 acción",      alc:"45 m",          c:"V, S, M", dur:"Conc. 1 min",   cls:["Druida","Hechicero","Mago"],                              d:"Cilindro 6×3 m: 3d8 frío y terreno difícil (sal. DES mitad)."},
  {nombre:"Círculo mágico",          v:3,esc:"Abjuración",   t:"1 min",         alc:"3 m",           c:"V, S, M", dur:"1 hora",        cls:["Brujo","Clérigo","Mago","Paladín"],                        d:"Círculo de protección 3 m vs. tipo elegido de criaturas."},
  {nombre:"Hipnótico patrón",        v:3,esc:"Ilusión",      t:"1 acción",      alc:"27 m",          c:"S, M",    dur:"Conc. 1 min",   cls:["Bardo","Brujo","Hechicero","Mago"],                       d:"Patrón brillante: criaturas que lo vean quedan hechizadas e incapacitadas (sal. SAB niega)."},
  {nombre:"Revivir",                 v:3,esc:"Nigromancia",  t:"1 hora",        alc:"Toque",         c:"V, S, M", dur:"Instantáneo",   cls:["Bardo","Clérigo","Druida","Paladín"],                     d:"Resucita criatura muerta hace ≤1 minuto con 1 PG."},
  {nombre:"Conjurar animales",       v:3,esc:"Conjuración",  t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"Conc. 1 hora",  cls:["Druida","Explorador"],                                    d:"Conjura bestias al servicio: 1 CR2, 2 CR1, 4 CR½ u 8 CR¼."},
  {nombre:"Hablar con los muertos",  v:3,esc:"Nigromancia",  t:"1 acción",      alc:"3 m",           c:"V, S, M", dur:"10 min",        cls:["Bardo","Clérigo"],                                        d:"Un cadáver responde hasta 5 preguntas (solo sabe lo que sabía en vida)."},
  {nombre:"Aura de vitalidad",       v:3,esc:"Evocación",    t:"1 acción",      alc:"Personal",      c:"V",       dur:"Conc. 1 min",   cls:["Clérigo","Druida","Paladín"],                             d:"Como acción adicional, recupera 2d6 PG a una criatura en 9 m."},
  {nombre:"Hablar con las plantas",  v:3,esc:"Transmutación",t:"1 acción",      alc:"Personal",      c:"V, S",    dur:"10 min",        cls:["Bardo","Druida","Explorador"],                            d:"Hablas con las plantas; puedes pedirles que abran paso o te informen."},
  // ── NIVEL 4 ───────────────────────────────────────────────────────────────
  {nombre:"Puerta dimensional",      v:4,esc:"Conjuración",  t:"1 acción",      alc:"150 m",         c:"V",       dur:"Instantáneo",   cls:["Bardo","Brujo","Hechicero","Mago"],                       d:"Te teletransportas a un punto visible o bien conocido en el alcance."},
  {nombre:"Destierro",               v:4,esc:"Abjuración",   t:"1 acción",      alc:"9 m",           c:"V, S, M", dur:"Conc. 1 min",   cls:["Brujo","Clérigo","Hechicero","Mago","Paladín"],           d:"Objetivo enviado a otro plano (sal. CAR niega). Permanente si se mantiene 1 min."},
  {nombre:"Confusión",               v:4,esc:"Encantamiento",t:"1 acción",      alc:"27 m",          c:"V, S, M", dur:"Conc. 1 min",   cls:["Bardo","Druida","Hechicero","Mago"],                      d:"Criaturas en esfera 3 m actúan de forma errática (sal. SAB niega)."},
  {nombre:"Polimorfismo",            v:4,esc:"Transmutación",t:"1 acción",      alc:"18 m",          c:"V, S, M", dur:"Conc. 1 hora",  cls:["Bardo","Druida","Hechicero","Mago"],                      d:"Transforma objetivo en bestia (sal. SAB niega si es hostil)."},
  {nombre:"Tormenta de hielo",       v:4,esc:"Evocación",    t:"1 acción",      alc:"90 m",          c:"V, S, M", dur:"Instantáneo",   cls:["Druida","Hechicero","Mago"],                              d:"Cilindro 6×12 m: 2d8 contundente + 4d6 frío; terreno difícil hasta sig. turno."},
  {nombre:"Muro de fuego",           v:4,esc:"Evocación",    t:"1 acción",      alc:"36 m",          c:"V, S, M", dur:"Conc. 1 min",   cls:["Druida","Hechicero","Mago"],                              d:"Muro 18 m: 5d8 fuego al cruzarlo o empezar turno junto a él (sal. DES mitad)."},
  {nombre:"Libertad de movimientos", v:4,esc:"Abjuración",   t:"1 acción",      alc:"Toque",         c:"V, S, M", dur:"1 hora",        cls:["Bardo","Clérigo","Druida","Explorador"],                  d:"Objetivo ignora terreno difícil y efectos que reduzcan el movimiento."},
  {nombre:"Aura de vida",            v:4,esc:"Abjuración",   t:"1 acción",      alc:"Personal (9 m)",c:"V",       dur:"Conc. 10 min",  cls:["Paladín"],                                                d:"Criaturas aliadas en 9 m recuperan 1 PG al inicio de su turno si tienen 0 o menos."},
  {nombre:"Inmovilizar monstruo",    v:4,esc:"Encantamiento",t:"1 acción",      alc:"27 m",          c:"V, S, M", dur:"Conc. 1 min",   cls:["Bardo","Brujo","Hechicero","Mago"],                       d:"Cualquier criatura paralizada (sal. SAB niega; repite cada turno). No humanos."},
  // ── NIVEL 5 ───────────────────────────────────────────────────────────────
  {nombre:"Conjurar elemental",      v:5,esc:"Conjuración",  t:"1 min",         alc:"27 m",          c:"V, S, M", dur:"Conc. 1 hora",  cls:["Druida","Mago"],                                          d:"Conjura elemental de CR 5 o inferior (fuego, agua, tierra o aire)."},
  {nombre:"Viaje planar",            v:5,esc:"Conjuración",  t:"1 acción",      alc:"Toque",         c:"V, S, M", dur:"Instantáneo",   cls:["Brujo","Clérigo","Druida","Hechicero","Mago"],             d:"Hasta 8 criaturas voluntarias viajan a otro plano de existencia."},
  {nombre:"Dominar persona",         v:5,esc:"Encantamiento",t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"Conc. 1 min",   cls:["Bardo","Hechicero","Mago"],                               d:"Controlas las acciones de un humanoide (sal. SAB niega; repite al recibir daño)."},
  {nombre:"Curación masiva",         v:5,esc:"Evocación",    t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"Instantáneo",   cls:["Clérigo","Druida"],                                       d:"Hasta 6 criaturas recuperan 3d8 + mod. conjuración PG cada una."},
  {nombre:"Teletransportación",      v:5,esc:"Conjuración",  t:"1 acción",      alc:"3 m",           c:"V",       dur:"Instantáneo",   cls:["Bardo","Hechicero","Mago"],                               d:"Hasta 8 criaturas al mismo destino conocido en el mismo plano."},
  {nombre:"Romper encantamientos",   v:5,esc:"Abjuración",   t:"1 acción",      alc:"Toque",         c:"V, S",    dur:"Instantáneo",   cls:["Bardo","Clérigo","Druida","Mago","Paladín"],              d:"Termina todos los conjuros que afecten al objetivo."},
  {nombre:"Reencarnación",           v:5,esc:"Transmutación",t:"1 hora",        alc:"Toque",         c:"V, S, M", dur:"Instantáneo",   cls:["Druida"],                                                 d:"Resucita muerto de hace ≤10 días en un cuerpo de especie aleatoria."},
  {nombre:"Resurrección",            v:5,esc:"Nigromancia",  t:"1 hora",        alc:"Toque",         c:"V, S, M", dur:"Instantáneo",   cls:["Bardo","Clérigo","Paladín"],                              d:"Resucita criatura muerta hace ≤10 días con 1 PG, siempre que su alma no esté retenida."},
  {nombre:"Muro de piedra",          v:5,esc:"Evocación",    t:"1 acción",      alc:"36 m",          c:"V, S, M", dur:"Conc. 10 min",  cls:["Druida","Hechicero","Mago"],                              d:"Hasta 10 paneles de 3×3 m de piedra sólida no mágica."},
  // ── NIVEL 6 ───────────────────────────────────────────────────────────────
  {nombre:"Visión verdadera",        v:6,esc:"Adivinación",  t:"1 acción",      alc:"Toque",         c:"V, S, M", dur:"1 hora",        cls:["Bardo","Brujo","Clérigo","Hechicero","Mago"],             d:"Objetivo ve 18 m en oscuridad, percibe lo invisible y los planos etéreos."},
  {nombre:"Sugestión masiva",        v:6,esc:"Encantamiento",t:"1 acción",      alc:"18 m",          c:"V, M",    dur:"24 horas",      cls:["Bardo","Brujo","Hechicero","Mago"],                       d:"Hasta 12 criaturas siguen una sugestión razonable (sal. SAB niega)."},
  {nombre:"Desintegrar",             v:6,esc:"Transmutación",t:"1 acción",      alc:"18 m",          c:"V, S, M", dur:"Instantáneo",   cls:["Hechicero","Mago"],                                       d:"10d6+40 fuerza (sal. DES mitad). Si cae a 0 PG queda reducido a polvo."},
  {nombre:"Círculo de la muerte",    v:6,esc:"Nigromancia",  t:"1 acción",      alc:"45 m",          c:"V, S, M", dur:"Instantáneo",   cls:["Brujo","Hechicero","Mago"],                               d:"8d6 necrótico a criaturas en esfera 18 m (sal. CON mitad)."},
  {nombre:"Muro de hielo",           v:6,esc:"Evocación",    t:"1 acción",      alc:"27 m",          c:"V, S, M", dur:"Conc. 10 min",  cls:["Hechicero","Mago"],                                       d:"Hasta 10 paneles de 3×3 m de hielo o hemiesfera de 3 m de radio."},
  {nombre:"Cadena de relámpagos",    v:6,esc:"Evocación",    t:"1 acción",      alc:"45 m",          c:"V, S, M", dur:"Instantáneo",   cls:["Hechicero","Mago"],                                       d:"10d8 rayo al objetivo; salta hasta 3 criaturas en 9 m (sal. DES mitad cada una)."},
  // ── NIVEL 7 ───────────────────────────────────────────────────────────────
  {nombre:"Dedo de la muerte",       v:7,esc:"Nigromancia",  t:"1 acción",      alc:"18 m",          c:"V, S",    dur:"Instantáneo",   cls:["Brujo","Hechicero","Mago"],                               d:"7d8+30 necrótico (sal. CON mitad). Si muere, se levanta como zombi."},
  {nombre:"Invertir gravedad",       v:7,esc:"Transmutación",t:"1 acción",      alc:"27 m",          c:"V, S, M", dur:"Conc. 1 min",   cls:["Druida","Hechicero","Mago"],                              d:"Gravedad invertida en cilindro 30 m; criaturas sin anclaje caen hacia arriba."},
  {nombre:"Proyección astral",       v:7,esc:"Transmutación",t:"1 hora",        alc:"3 m",           c:"V, S, M", dur:"Especial",      cls:["Brujo","Clérigo","Hechicero","Mago"],                     d:"Hasta 8 criaturas viajan al plano astral en forma de proyección."},
  {nombre:"Teletransportación por círculo",v:7,esc:"Conjuración",t:"1 min",    alc:"3 m",           c:"V, M",    dur:"1 asalto",      cls:["Bardo","Clérigo","Hechicero","Mago"],                     d:"Abre portal a un círculo de teletransportación permanente conocido."},
  // ── NIVEL 8 ───────────────────────────────────────────────────────────────
  {nombre:"Palabra de poder: aturdir",v:8,esc:"Encantamiento",t:"1 acción",    alc:"18 m",          c:"V",       dur:"Especial",      cls:["Bardo","Hechicero","Mago"],                               d:"Objetivo con ≤150 PG queda aturdido (sal. CON para terminar al fin de su turno)."},
  {nombre:"Controlar el clima",      v:8,esc:"Transmutación",t:"10 min",        alc:"Personal",      c:"V, S, M", dur:"Conc. 8 horas", cls:["Clérigo","Druida","Mago"],                                d:"Cambias el tiempo meteorológico en un radio de 8 km."},
  {nombre:"Tormenta de fuego",       v:8,esc:"Evocación",    t:"1 acción",      alc:"45 m",          c:"V, S",    dur:"Instantáneo",   cls:["Clérigo","Druida","Hechicero","Mago"],                    d:"7d10 fuego en hasta 10 cubos de 3 m conectados (sal. DES mitad)."},
  {nombre:"Mente en blanco",         v:8,esc:"Abjuración",   t:"1 acción",      alc:"Toque",         c:"V, S",    dur:"24 horas",      cls:["Bardo","Hechicero","Mago"],                               d:"Objetivo inmune a lectura de mente, adivinación y visión remota durante 24 horas."},
  // ── NIVEL 9 ───────────────────────────────────────────────────────────────
  {nombre:"Deseo",                   v:9,esc:"Conjuración",  t:"1 acción",      alc:"Personal",      c:"V",       dur:"Instantáneo",   cls:["Hechicero","Mago"],                                       d:"Duplica cualquier conjuro de nivel ≤8 o logra cualquier efecto concebible (con riesgos)."},
  {nombre:"Palabra de poder: matar", v:9,esc:"Encantamiento",t:"1 acción",      alc:"18 m",          c:"V",       dur:"Instantáneo",   cls:["Bardo","Hechicero","Mago"],                               d:"Objetivo con ≤100 PG muere instantáneamente sin tirada de salvación."},
  {nombre:"Previsión",               v:9,esc:"Adivinación",  t:"1 min",         alc:"Toque",         c:"V, S, M", dur:"8 horas",       cls:["Bardo","Druida","Mago"],                                  d:"Ventaja en ataques, salvaciones y DES; enemigos con desventaja al atacarte."},
  {nombre:"Tormenta de venganza",    v:9,esc:"Conjuración",  t:"1 acción",      alc:"Personal",      c:"V, S",    dur:"Conc. 1 min",   cls:["Druida"],                                                 d:"Nube de tormenta 150 m de radio; cada turno: relámpagos, viento, lluvia ácida o hielo."},
  {nombre:"Puerta",                  v:9,esc:"Conjuración",  t:"1 acción",      alc:"18 m",          c:"V, S, M", dur:"Conc. 1 min",   cls:["Clérigo","Hechicero","Mago"],                             d:"Portal circular de 3 m a otro plano. Puede invocar a una criatura del plano destino."},
];

const mkHabMap = () => Object.fromEntries(HABS.map(h => [h.id, false]));

const mkChar = () => ({
  nombre: "", jugador: "", especie: "",
  progresion: [{ clase: "", subclase: "", niveles: 1 }],
  trasfondo: "", xp: 0, alineamiento: "", divinidad: "", inspiracion: false,
  trasfondoAplicado: "", asiAplicado: {},
  fue: 10, des: 10, con: 10, int: 10, sab: 10, car: 10,
  salv: Object.fromEntries(ATTRS.map(a => [a, false])),
  hab:  mkHabMap(),
  exp:  mkHabMap(),
  ca: "", velocidad: "9 m",
  pvMax: 0, pvActuales: 0, pvTemp: 0,
  dadoGolpeUsado: 0,
  muerteExito: 0, muerteFallo: 0,
  ataques: [],
  monedas: { pp: 0, po: 0, pe: 0, pa: 0, pc: 0 },
  equipo: "", proficiencias: "", lenguas: "", rasgosEspeciales: "",
  conjAttr: "", cdConjuro: "", bonusAtaqueConjuro: "",
  conjuros: [],
  ranuras: Object.fromEntries([1,2,3,4,5,6,7,8,9].map(n => [n, { max: 0, usadas: 0 }])),
  rasgoPersonalidad: "", ideal: "", vinculo: "", defecto: "",
  edad: "", altura: "", peso: "", ojos: "", cabello: "", piel: "",
  apariencia: "", historia: "",
  dotes: [],
});

// Nivel total = suma de niveles en todas las clases
const nivelTotal = prog => prog.reduce((s, c) => s + (c.niveles || 0), 0);

// Resumen de dados de golpe: [{ dado, cantidad, clase }]
const dadosGolpePool = prog =>
  prog.filter(c => c.clase).map(c => ({
    dado: DADO_CLASE[c.clase] || "d8",
    cantidad: c.niveles || 0,
    clase: c.clase,
  }));

// Texto resumen: "5d10 (Guerrero) + 3d8 (Pícaro)"
const dadosGolpeTexto = prog => {
  const pool = dadosGolpePool(prog);
  if (!pool.length) return "—";
  return pool.map(p => `${p.cantidad}${p.dado} (${p.clase})`).join(" + ");
};

const P = {
  bg:        "#0c0905",
  surface:   "#161009",
  card:      "#1e1509",
  border:    "#5a3a18",
  borderDim: "#3a2510",
  crimson:   "#8b1515",
  crimsonLt: "#b03030",
  gold:      "#c8922a",
  goldLt:    "#e0b050",
  text:      "#e8d5a3",
  textDim:   "#8a7040",
  input:     "#140f07",
  green:     "#4a7c4a",
};

// ─── Primitivas de UI ─────────────────────────────────────────────────────────

const baseInput = {
  background: P.input, border: `1px solid ${P.border}`, color: P.text,
  borderRadius: 4, padding: "4px 8px", fontFamily: "inherit",
  fontSize: 14, width: "100%", outline: "none", boxSizing: "border-box",
};

const Lbl = ({ children }) => (
  <div style={{ color: P.textDim, fontSize: 10, textTransform: "uppercase",
    letterSpacing: "0.1em", marginBottom: 3, fontFamily: "Cinzel, serif" }}>
    {children}
  </div>
);

const Field = ({ label, children, style }) => (
  <div style={{ ...style }}>
    {label && <Lbl>{label}</Lbl>}
    {children}
  </div>
);

const Card = ({ children, style }) => (
  <div style={{ background: P.card, border: `1px solid ${P.border}`,
    borderRadius: 6, padding: 14, ...style }}>
    {children}
  </div>
);

const SecTitle = ({ children }) => (
  <div style={{ color: P.gold, fontFamily: "Cinzel, serif", fontSize: 12,
    fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em",
    borderBottom: `1px solid ${P.gold}40`, paddingBottom: 5, marginBottom: 10 }}>
    {children}
  </div>
);

const Inp = ({ value, onChange, placeholder, style }) => (
  <input value={value} onChange={e => onChange(e.target.value)}
    placeholder={placeholder} style={{ ...baseInput, ...style }} />
);

const Num = ({ value, onChange, min = 0, max, style }) => (
  <input type="number" value={value}
    onChange={e => onChange(Number(e.target.value))}
    min={min} max={max}
    style={{ ...baseInput, textAlign: "center", ...style }} />
);

const Sel = ({ value, onChange, options, placeholder }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    style={{ ...baseInput, cursor: "pointer" }}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
);

const Ta = ({ value, onChange, placeholder, rows = 4 }) => (
  <textarea value={value} onChange={e => onChange(e.target.value)}
    placeholder={placeholder} rows={rows}
    style={{ ...baseInput, resize: "vertical", lineHeight: 1.5 }} />
);

const Btn = ({ onClick, children, variant = "default" }) => {
  const variants = {
    default: { background: "transparent", border: `1px solid ${P.border}`, color: P.textDim },
    gold:    { background: "transparent", border: `1px solid ${P.gold}`, color: P.gold },
    crimson: { background: P.crimson, border: "none", color: "#fff" },
    ghost:   { background: "transparent", border: "none", color: P.crimsonLt },
    green:   { background: "transparent", border: `1px solid ${P.green}`, color: "#7fc47f" },
  };
  return (
    <button onClick={onClick} style={{
      ...variants[variant], borderRadius: 4, padding: "6px 14px",
      cursor: "pointer", fontSize: 12, fontFamily: "Cinzel, serif",
      letterSpacing: "0.05em",
    }}>{children}</button>
  );
};

// Círculo de competencia: click cicla entre ninguna → competencia → maestría
const CompCircle = ({ comp, exp, onCycle }) => (
  <button onClick={onCycle} title={exp ? "Maestría" : comp ? "Competencia" : "Sin competencia"}
    style={{
      width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
      border: `2px solid ${comp ? P.gold : P.border}`,
      background: comp ? (exp ? P.gold : P.crimson) : "transparent",
      cursor: "pointer", padding: 0, fontSize: 7, color: P.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
    {exp ? "✦" : ""}
  </button>
);

// ─── Cálculos ─────────────────────────────────────────────────────────────────

const calcMod  = s => Math.floor((s - 10) / 2);
const fmtBono  = n => (n >= 0 ? `+${n}` : `${n}`);
const calcProf = nivel => 2 + Math.floor((nivel - 1) / 4);

const habValor = (char, h) => {
  const base = calcMod(char[h.attr]);
  const prof = calcProf(char.nivel);
  const bonus = char.hab[h.id] ? (char.exp[h.id] ? prof * 2 : prof) : 0;
  return base + bonus;
};

const salvValor = (char, a) =>
  calcMod(char[a]) + (char.salv[a] ? calcProf(nivelTotal(char.progresion)) : 0);

// ─── Pestaña: Básico ─────────────────────────────────────────────────────────

const btnSmall = {
  width: 26, height: 26, borderRadius: 4, border: `1px solid ${P?.border || "#5a3a18"}`,
  background: "transparent", cursor: "pointer", fontSize: 16, lineHeight: 1,
  display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
  flexShrink: 0,
};

function TabBasico({ char, u, un, handleTrasfondo }) {
  const datosT = DATOS_TRASFONDO[char.trasfondo];
  const nTotal = nivelTotal(char.progresion);
  const prof   = calcProf(nTotal);

  const updProg = (i, campo, valor) =>
    u("progresion", char.progresion.map((p, idx) =>
      idx === i ? { ...p, [campo]: valor } : p
    ));

  const addClase = () =>
    u("progresion", [...char.progresion, { clase: "", subclase: "", niveles: 1 }]);

  const delClase = i =>
    u("progresion", char.progresion.filter((_, idx) => idx !== i));

  return (
    <div style={{ display: "grid", gap: 12 }}>

      {/* Nombre e inspiración */}
      <Card>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <Field label="Nombre del Personaje" style={{ flex: 1 }}>
            <Inp value={char.nombre} onChange={v => u("nombre", v)}
              placeholder="Thorin el Valiente..."
              style={{ fontSize: 20, fontFamily: "Cinzel, serif", padding: "6px 10px" }} />
          </Field>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <Lbl>Inspiración</Lbl>
            <button onClick={() => u("inspiracion", !char.inspiracion)} style={{
              width: 46, height: 46, borderRadius: "50%",
              background: char.inspiracion ? P.gold : "transparent",
              border: `2px solid ${P.gold}`,
              color: char.inspiracion ? P.bg : P.gold,
              fontSize: 22, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}>✦</button>
          </div>
        </div>
      </Card>

      {/* Progresión de clase */}
      <Card>
        <SecTitle>Progresión de Clase</SecTitle>
        <div style={{ display: "grid",
          gridTemplateColumns: "1fr 1fr 88px auto", gap: 6, marginBottom: 4 }}>
          <Lbl>Clase</Lbl><Lbl>Subclase</Lbl><Lbl>Niveles</Lbl><span/>
        </div>

        {char.progresion.map((p, i) => (
          <div key={i} style={{ display: "grid",
            gridTemplateColumns: "1fr 1fr 88px auto", gap: 6, marginBottom: 8,
            alignItems: "center" }}>

            <select value={p.clase}
              onChange={e => { updProg(i, "clase", e.target.value); updProg(i, "subclase", ""); }}
              style={{ ...baseInput, cursor: "pointer" }}>
              <option value="">— elige —</option>
              {CLASES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <div>
              <input value={p.subclase}
                onChange={e => updProg(i, "subclase", e.target.value)}
                list={`sc-${i}`}
                placeholder={p.clase ? "Subclase…" : "—"}
                disabled={!p.clase}
                style={{ ...baseInput, color: p.clase ? P.text : P.textDim }} />
              <datalist id={`sc-${i}`}>
                {(SUBCLASES[p.clase] || []).map(s => <option key={s} value={s} />)}
              </datalist>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button onClick={() => updProg(i, "niveles", Math.max(1, p.niveles - 1))}
                style={{ ...btnSmall, color: P.crimsonLt, border: `1px solid ${P.border}` }}>−</button>
              <div style={{ flex: 1, textAlign: "center", fontWeight: 700,
                color: P.gold, fontSize: 16 }}>{p.niveles}</div>
              <button onClick={() => {
                  const resto = 20 - nTotal + p.niveles;
                  updProg(i, "niveles", Math.min(resto, p.niveles + 1));
                }}
                style={{ ...btnSmall, color: P.goldLt, border: `1px solid ${P.border}` }}>+</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 10, color: P.textDim, minWidth: 22 }}>
                {p.clase ? DADO_CLASE[p.clase] : ""}
              </span>
              {char.progresion.length > 1 && (
                <button onClick={() => delClase(i)}
                  style={{ background: "transparent", border: "none",
                    color: P.crimsonLt, cursor: "pointer", fontSize: 15, padding: 0 }}>✕</button>
              )}
            </div>
          </div>
        ))}

        <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 4, flexWrap: "wrap" }}>
          {nTotal < 20 && <Btn onClick={addClase} variant="gold">+ Multiclase</Btn>}
          <div style={{ fontSize: 13, color: P.textDim }}>
            Niv. total <span style={{ color: P.gold, fontWeight: 700 }}>{nTotal}/20</span>
            {" · "}Competencia <span style={{ color: P.gold, fontWeight: 700 }}>{fmtBono(prof)}</span>
            {" · "}Dados: <span style={{ color: P.goldLt }}>{dadosGolpeTexto(char.progresion)}</span>
          </div>
        </div>
      </Card>

      {/* Especie, Trasfondo */}
      <Card>
        <SecTitle>Origen</SecTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <Field label="Especie">
            <Sel value={char.especie} onChange={v => u("especie", v)} options={ESPECIES} placeholder="— elige —" />
          </Field>
          <Field label="Alineamiento">
            <Sel value={char.alineamiento} onChange={v => u("alineamiento", v)} options={ALINEAMIENTOS} placeholder="— elige —" />
          </Field>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <Field label="Trasfondo">
            <select value={char.trasfondo} onChange={e => handleTrasfondo(e.target.value)}
              style={{ ...baseInput, cursor: "pointer" }}>
              <option value="">— elige —</option>
              {TRASFONDOS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Divinidad Patrona">
            <Inp value={char.divinidad} onChange={v => u("divinidad", v)} placeholder="Ej. Tyr, Lolth…" />
          </Field>
          <Field label="Puntos de Experiencia">
            <Num value={char.xp} onChange={v => u("xp", Math.max(0, v))} min={0} />
          </Field>
        </div>
        {datosT && (
          <div style={{ marginTop: 10, background: `${P.gold}12`, border: `1px solid ${P.gold}45`,
            borderRadius: 5, padding: "10px 12px", fontSize: 12,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
            <div style={{ gridColumn: "1/-1", color: P.gold, fontFamily: "Cinzel, serif",
              fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
              ✦ Bonos aplicados automáticamente
            </div>
            <div><span style={{ color: P.textDim }}>ASI: </span>
              <span>{Object.entries(datosT.asi).map(([a,v]) => `${ATTR_NOMBRE[a]} +${v}`).join(" · ")}</span>
            </div>
            <div><span style={{ color: P.textDim }}>Herramienta: </span><span>{datosT.herramienta}</span></div>
            <div><span style={{ color: P.textDim }}>Competencias: </span>
              <span>{datosT.habilidades.map(id => HABS.find(h => h.id === id)?.nombre).join(", ")}</span>
            </div>
            <div><span style={{ color: P.textDim }}>Dote: </span>
              <span style={{ color: P.goldLt }}>{datosT.dote}</span>
            </div>
          </div>
        )}
      </Card>

      <Card>
        <SecTitle>Información del Jugador</SecTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Nombre del Jugador">
            <Inp value={char.jugador} onChange={v => u("jugador", v)} />
          </Field>
          <Field label="Divinidad Patrona" style={{ display: "none" }}><span/></Field>
        </div>
      </Card>

      <div style={{ background: `${P.crimson}18`, border: `1px solid ${P.crimson}55`,
        borderRadius: 6, padding: "10px 14px", fontSize: 12, color: P.textDim, lineHeight: 1.6 }}>
        <span style={{ color: P.crimsonLt, fontWeight: 700, fontFamily: "Cinzel, serif" }}>✦ Reglas 2024 — </span>
        Los <strong style={{ color: P.text }}>trasfondos</strong> otorgan bonificaciones a características (+2/+1) y una <strong style={{ color: P.text }}>dote de nivel 1</strong>.
        Las <strong style={{ color: P.text }}>especies</strong> ya no otorgan bonos de característica.
        El multiclase tiene requisitos mínimos de característica según las clases combinadas.
      </div>
    </div>
  );
}

// ─── Pestaña: Atributos ───────────────────────────────────────────────────────

function TabAtributos({ char, u, un }) {
  const prof = calcProf(nivelTotal(char.progresion));
  const percPasiva = 10 + habValor(char, HABS.find(h => h.id === "percepcion"));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 12 }}>

      {/* Columna izquierda: puntuaciones + salvaciones */}
      <div style={{ display: "grid", gap: 12, alignContent: "start" }}>

        {/* Info rápida */}
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: P.textDim, marginBottom: 4 }}>Bono de Competencia</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: P.gold, fontFamily: "Cinzel, serif" }}>
            {fmtBono(prof)}
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: P.textDim }}>Percepción Pasiva</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: P.goldLt }}>{percPasiva}</div>
        </Card>

        {/* Puntuaciones de característica */}
        <Card>
          <SecTitle>Características</SecTitle>
          <div style={{ display: "grid", gap: 6 }}>
            {ATTRS.map(a => {
              const mod = calcMod(char[a]);
              return (
                <div key={a} style={{
                  background: P.surface, border: `1px solid ${P.border}`,
                  borderRadius: 6, padding: "6px 8px", textAlign: "center",
                }}>
                  <div style={{ fontSize: 9, color: P.textDim, textTransform: "uppercase",
                    letterSpacing: "0.1em", fontFamily: "Cinzel, serif" }}>
                    {ATTR_NOMBRE[a]}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: P.gold, lineHeight: 1.1 }}>
                    {fmtBono(mod)}
                  </div>
                  <input type="number" value={char[a]}
                    onChange={e => u(a, Math.max(1, Math.min(30, Number(e.target.value))))}
                    min={1} max={30}
                    style={{ ...baseInput, textAlign: "center", width: "60px",
                      fontSize: 13, padding: "2px 4px", margin: "4px auto 0" }} />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Tiradas de salvación */}
        <Card>
          <SecTitle>Tiradas de Salvación</SecTitle>
          {ATTRS.map(a => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <CompCircle comp={char.salv[a]} exp={false}
                onCycle={() => un("salv", a, !char.salv[a])} />
              <span style={{ fontWeight: 700, color: P.goldLt, minWidth: 26, fontSize: 13, textAlign: "right" }}>
                {fmtBono(salvValor(char, a))}
              </span>
              <span style={{ fontSize: 12, color: P.text }}>{ATTR_NOMBRE[a]}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Columna derecha: habilidades */}
      <Card>
        <SecTitle>Habilidades</SecTitle>
        <div style={{ fontSize: 11, color: P.textDim, marginBottom: 10, lineHeight: 1.6 }}>
          Clic para ciclar: Sin competencia → <span style={{ color: P.crimson }}>● Competencia</span> → <span style={{ color: P.gold }}>✦ Maestría</span> (doble bono, nuevo en 2024)
        </div>
        <div style={{ display: "grid", gap: 3 }}>
          {HABS.map(h => {
            const val = habValor(char, h);
            const comp = char.hab[h.id];
            const exp  = char.exp[h.id];
            const onCycle = () => {
              if (!comp)     { un("hab", h.id, true); un("exp", h.id, false); }
              else if (!exp) { un("exp", h.id, true); }
              else           { un("hab", h.id, false); un("exp", h.id, false); }
            };
            return (
              <div key={h.id} style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "3px 6px", borderRadius: 4,
                background: comp ? `${P.crimson}15` : "transparent",
              }}>
                <CompCircle comp={comp} exp={exp} onCycle={onCycle} />
                <span style={{ fontWeight: 700, color: P.goldLt, minWidth: 28,
                  fontSize: 13, textAlign: "right" }}>
                  {fmtBono(val)}
                </span>
                <span style={{ fontSize: 13, color: P.text, flex: 1 }}>{h.nombre}</span>
                <span style={{ fontSize: 9, color: P.textDim }}>{ATTR_CORTO[h.attr]}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ─── Pestaña: Combate ─────────────────────────────────────────────────────────

function TabCombate({ char, u }) {
  const mod = calcMod(char.des);
  const caDisplay = char.ca !== "" ? char.ca : 10 + mod;

  const addAtaque = () => u("ataques", [
    ...char.ataques,
    { nombre: "", bono: "", dano: "", tipo: "", maestria: "—" },
  ]);
  const delAtaque = i => u("ataques", char.ataques.filter((_, idx) => idx !== i));
  const updAtaque = (i, k, v) =>
    u("ataques", char.ataques.map((a, idx) => (idx === i ? { ...a, [k]: v } : a)));

  return (
    <div style={{ display: "grid", gap: 12 }}>

      {/* Estadísticas principales */}
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "Clase de Armadura", content: (
              <input type="number" value={char.ca}
                onChange={e => u("ca", e.target.value)}
                placeholder={`${caDisplay}`}
                style={{ ...baseInput, fontSize: 30, fontWeight: 700, textAlign: "center",
                  color: P.gold, background: "transparent", border: "none",
                  padding: 0, width: "100%" }} />
            )},
            { label: "Iniciativa", content: (
              <div>
                <div style={{ fontSize: 30, fontWeight: 700, color: P.gold,
                  textAlign: "center", fontFamily: "Cinzel, serif" }}>
                  {fmtBono(mod)}
                </div>
                <div style={{ fontSize: 10, color: P.textDim, textAlign: "center" }}>
                  DES {fmtBono(mod)}
                </div>
              </div>
            )},
            { label: "Velocidad", content: (
              <Inp value={char.velocidad} onChange={v => u("velocidad", v)}
                style={{ fontSize: 22, textAlign: "center", color: P.gold }} />
            )},
          ].map(({ label, content }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <Lbl>{label}</Lbl>
              {content}
            </div>
          ))}
        </div>
      </Card>

      {/* Puntos de golpe */}
      <Card>
        <SecTitle>Puntos de Golpe</SecTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <Lbl>Máximo</Lbl>
            <Num value={char.pvMax} onChange={v => u("pvMax", v)}
              style={{ fontSize: 22, textAlign: "center", color: P.gold }} />
          </div>
          <div>
            <Lbl>Actuales</Lbl>
            <Num value={char.pvActuales} onChange={v => u("pvActuales", v)}
              style={{ fontSize: 22, textAlign: "center",
                color: char.pvActuales <= 0 ? P.crimsonLt : P.text }} />
          </div>
          <div>
            <Lbl>Temporales</Lbl>
            <Num value={char.pvTemp} onChange={v => u("pvTemp", v)}
              style={{ fontSize: 22, textAlign: "center", color: "#6fa8dc" }} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <Lbl>Pool de Dados (de clases)</Lbl>
            <div style={{ fontSize: 13, color: P.goldLt, padding: "6px 0", lineHeight: 1.6 }}>
              {dadosGolpeTexto(char.progresion)}
            </div>
          </div>
          <div>
            <Lbl>Dados Usados / Disponibles</Lbl>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Num value={char.dadoGolpeUsado}
                onChange={v => u("dadoGolpeUsado", Math.max(0, v))} min={0}
                style={{ color: P.textDim }} />
              <span style={{ color: P.textDim }}>/</span>
              <div style={{ fontSize: 20, fontWeight: 700,
                color: nivelTotal(char.progresion) - char.dadoGolpeUsado > 0 ? P.gold : P.crimsonLt }}>
                {Math.max(0, nivelTotal(char.progresion) - char.dadoGolpeUsado)}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tiradas de muerte */}
      <Card>
        <SecTitle>Tiradas de Muerte</SecTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { key: "muerteExito", label: "✓ Éxitos",  color: "#4a9c4a" },
            { key: "muerteFallo", label: "✗ Fallos",  color: P.crimsonLt },
          ].map(({ key, label, color }) => (
            <div key={key}>
              <Lbl>{label}</Lbl>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                {[1, 2, 3].map(i => (
                  <button key={i}
                    onClick={() => u(key, char[key] === i ? i - 1 : i)}
                    style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: i <= char[key] ? color : "transparent",
                      border: `2px solid ${color}`, cursor: "pointer",
                    }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Ataques */}
      <Card>
        <SecTitle>Ataques y Acciones de Combate</SecTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${P.border}` }}>
                {["Nombre", "Bono de Ataque", "Daño / Tipo", "Maestría (2024)", ""].map((h, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "4px 6px",
                    color: P.textDim, fontFamily: "Cinzel, serif", fontSize: 10,
                    textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {char.ataques.map((a, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${P.borderDim}` }}>
                  {["nombre", "bono", "dano"].map(k => (
                    <td key={k} style={{ padding: "3px 4px" }}>
                      <input value={a[k]} onChange={e => updAtaque(i, k, e.target.value)}
                        style={{ ...baseInput, padding: "3px 6px", fontSize: 12 }} />
                    </td>
                  ))}
                  <td style={{ padding: "3px 4px" }}>
                    <select value={a.maestria} onChange={e => updAtaque(i, "maestria", e.target.value)}
                      style={{ ...baseInput, padding: "3px 6px", fontSize: 12 }}>
                      {MAESTRIAS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "3px 4px" }}>
                    <button onClick={() => delAtaque(i)}
                      style={{ background: "transparent", border: "none",
                        color: P.crimsonLt, cursor: "pointer", fontSize: 16 }}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 10 }}>
          <Btn onClick={addAtaque} variant="gold">+ Añadir ataque</Btn>
        </div>
      </Card>

      {/* Dotes */}
      <Card>
        <SecTitle>Dotes</SecTitle>
        <div style={{ fontSize: 11, color: P.textDim, marginBottom: 10 }}>
          En 2024 obtienes una dote de trasfondo al nivel 1, y más en niveles de mejora de característica.
        </div>
        <div style={{ display: "grid", gap: 8, marginBottom: 10 }}>
          {char.dotes.map((d, i) => (
            <div key={i} style={{
              background: P.surface, border: `1px solid ${P.border}`,
              borderRadius: 5, padding: 10, display: "grid",
              gridTemplateColumns: "1fr auto", gap: 8, alignItems: "start",
            }}>
              <div style={{ display: "grid", gap: 6 }}>
                <input value={d.nombre}
                  onChange={e => u("dotes", char.dotes.map((x, j) => j === i ? { ...x, nombre: e.target.value } : x))}
                  placeholder="Nombre de la dote"
                  list="dotes-list"
                  style={{ ...baseInput, fontWeight: 700, color: P.goldLt }} />
                <textarea value={d.desc}
                  onChange={e => u("dotes", char.dotes.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))}
                  placeholder="Descripción del beneficio..."
                  rows={2}
                  style={{ ...baseInput, resize: "vertical", lineHeight: 1.5, fontSize: 13 }} />
              </div>
              <button
                onClick={() => u("dotes", char.dotes.filter((_, j) => j !== i))}
                style={{ background: "transparent", border: "none",
                  color: P.crimsonLt, cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 0 }}>
                ✕
              </button>
            </div>
          ))}
        </div>
        <Btn onClick={() => u("dotes", [...char.dotes, { nombre: "", desc: "" }])} variant="gold">
          + Añadir dote
        </Btn>
        <datalist id="dotes-list">
          {DOTES_PHB.map(d => <option key={d} value={d} />)}
        </datalist>
        <div style={{ marginTop: 10, fontSize: 11, color: P.textDim }}>
          ✦ Origen · sin marca = General · ★ Don Épico (niv. 19+)
        </div>
      </Card>

      {/* Rasgos especiales */}
      <Card>
        <SecTitle>Rasgos de Especie y Clase</SecTitle>
        <Ta value={char.rasgosEspeciales}
          onChange={v => u("rasgosEspeciales", v)}
          placeholder="Describe rasgos de especie, habilidades de clase, etc." rows={5} />
      </Card>
    </div>
  );
}

// ─── Pestaña: Conjuros ────────────────────────────────────────────────────────

const NIVEL_LABEL = ["Truco","1","2","3","4","5","6","7","8","9"];

function TabConjuros({ char, u }) {
  const [busq, setBusq]   = useState("");
  const [fNivel, setFNiv] = useState("todos");
  const [fEsc, setFEsc]   = useState("todas");
  const [mostrarBuscador, setMostrarBuscador] = useState(false);
  const [formPers, setFormPers] = useState(false);
  const [nuevo, setNuevo] = useState({ nombre:"", v:0, esc:"Evocación", t:"", alc:"", c:"", dur:"", d:"" });

  // Clases del personaje para filtrar por defecto
  const clasesPj = char.progresion.filter(p => p.clase).map(p => p.clase);

  // Conjuros ya en la hoja
  const yaEnHoja = new Set(char.conjuros.map(c => c.nombre));

  // Filtrado del catálogo
  const conjFiltrados = CONJUROS_DB.filter(c => {
    if (fNivel !== "todos" && c.v !== Number(fNivel)) return false;
    if (fEsc !== "todas" && c.esc !== fEsc) return false;
    if (clasesPj.length && !clasesPj.some(cl => c.cls.includes(cl))) return false;
    if (busq && !c.nombre.toLowerCase().includes(busq.toLowerCase())) return false;
    return true;
  });

  const addConjuro = (c) => {
    if (yaEnHoja.has(c.nombre)) return;
    u("conjuros", [...char.conjuros, { ...c, preparado: true, custom: false }]);
  };

  const addPersonalizado = () => {
    if (!nuevo.nombre.trim()) return;
    u("conjuros", [...char.conjuros, { ...nuevo, preparado: true, custom: true }]);
    setNuevo({ nombre:"", v:0, esc:"Evocación", t:"", alc:"", c:"", dur:"", d:"" });
    setFormPers(false);
  };

  const delConjuro = (i) => u("conjuros", char.conjuros.filter((_, j) => j !== i));
  const togPrep = (i) => u("conjuros", char.conjuros.map((c, j) =>
    j === i ? { ...c, preparado: !c.preparado } : c
  ));

  // Agrupar por nivel para mostrar
  const porNivel = Array.from({ length: 10 }, (_, n) =>
    char.conjuros.filter(c => c.v === n)
  );

  const setR = (n, k, v) => u("ranuras", {
    ...char.ranuras, [n]: { ...char.ranuras[n], [k]: Math.max(0, v) }
  });

  return (
    <div style={{ display: "grid", gap: 12 }}>

      {/* ── Aptitud de conjuración ── */}
      <Card>
        <SecTitle>Aptitud de Conjuración</SecTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <Field label="Atributo">
            <Sel value={char.conjAttr} onChange={v => u("conjAttr", v)}
              options={ATTRS.map(a => ATTR_NOMBRE[a])} placeholder="— elige —" />
          </Field>
          <Field label="CD de Conjuro">
            <Num value={char.cdConjuro} onChange={v => u("cdConjuro", v)} />
          </Field>
          <Field label="Bono de Ataque">
            <Inp value={char.bonusAtaqueConjuro} onChange={v => u("bonusAtaqueConjuro", v)} placeholder="+0" />
          </Field>
        </div>
      </Card>

      {/* ── Ranuras ── */}
      <Card>
        <SecTitle>Ranuras de Conjuro</SecTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {[1,2,3,4,5,6,7,8,9].map(n => {
            const r = char.ranuras[n];
            const disp = Math.max(0, r.max - r.usadas);
            return (
              <div key={n} style={{ background: P.surface, border: `1px solid ${P.border}`,
                borderRadius: 6, padding: 8 }}>
                <div style={{ fontSize: 10, color: P.textDim, fontFamily: "Cinzel, serif",
                  textTransform: "uppercase", marginBottom: 6 }}>Nivel {n}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9, color: P.textDim, marginBottom: 2 }}>Máx</div>
                    <Num value={r.max} onChange={v => setR(n, "max", v)} min={0} max={9}
                      style={{ padding: "2px 4px", fontSize: 13 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9, color: P.textDim, marginBottom: 2 }}>Usadas</div>
                    <Num value={r.usadas} onChange={v => setR(n, "usadas", v)} min={0} max={9}
                      style={{ padding: "2px 4px", fontSize: 13, color: P.textDim }} />
                  </div>
                  <div style={{ textAlign: "center", minWidth: 28 }}>
                    <div style={{ fontSize: 9, color: P.textDim, marginBottom: 2 }}>Disp.</div>
                    <div style={{ fontSize: 18, fontWeight: 700,
                      color: disp > 0 ? P.gold : P.crimsonLt }}>{disp}</div>
                  </div>
                </div>
                {r.max > 0 && (
                  <div style={{ display: "flex", gap: 3, marginTop: 6, flexWrap: "wrap" }}>
                    {Array.from({ length: r.max }).map((_, i) => (
                      <div key={i} style={{ width: 10, height: 10, borderRadius: "50%",
                        background: i < r.usadas ? P.borderDim : P.gold,
                        border: `1px solid ${i < r.usadas ? P.border : P.gold}` }} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── Buscador de conjuros ── */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: mostrarBuscador ? 12 : 0 }}>
          <SecTitle style={{ marginBottom: 0 }}>Añadir Conjuro del Catálogo</SecTitle>
          <button onClick={() => setMostrarBuscador(b => !b)} style={{
            background: "transparent", border: `1px solid ${P.gold}`, color: P.gold,
            borderRadius: 4, padding: "3px 10px", cursor: "pointer", fontSize: 12,
            fontFamily: "Cinzel, serif",
          }}>{mostrarBuscador ? "▲ Cerrar" : "▼ Abrir"}</button>
        </div>

        {mostrarBuscador && (
          <>
            {/* Filtros */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 130px", gap: 8, marginBottom: 10 }}>
              <input value={busq} onChange={e => setBusq(e.target.value)}
                placeholder="Buscar por nombre…"
                style={{ ...baseInput }} />
              <select value={fNivel} onChange={e => setFNiv(e.target.value)}
                style={{ ...baseInput, cursor: "pointer" }}>
                <option value="todos">Todos los niveles</option>
                {[0,1,2,3,4,5,6,7,8,9].map(n =>
                  <option key={n} value={n}>{n === 0 ? "Truco" : `Nivel ${n}`}</option>
                )}
              </select>
              <select value={fEsc} onChange={e => setFEsc(e.target.value)}
                style={{ ...baseInput, cursor: "pointer" }}>
                <option value="todas">Todas las escuelas</option>
                {ESCUELAS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>

            {clasesPj.length > 0 && (
              <div style={{ fontSize: 11, color: P.textDim, marginBottom: 8 }}>
                Mostrando conjuros de: <span style={{ color: P.goldLt }}>{clasesPj.join(", ")}</span>
                {" · "}{conjFiltrados.length} resultado{conjFiltrados.length !== 1 ? "s" : ""}
              </div>
            )}

            {/* Lista de resultados */}
            <div style={{ maxHeight: 320, overflowY: "auto", display: "grid", gap: 4 }}>
              {conjFiltrados.length === 0 && (
                <div style={{ color: P.textDim, fontSize: 13, textAlign: "center", padding: 16 }}>
                  Sin resultados. Prueba a cambiar los filtros o usar el modo personalizado.
                </div>
              )}
              {conjFiltrados.map((c, i) => {
                const enHoja = yaEnHoja.has(c.nombre);
                return (
                  <div key={i} style={{
                    display: "grid", gridTemplateColumns: "28px 1fr auto",
                    gap: 8, alignItems: "start",
                    background: enHoja ? `${P.green}15` : P.surface,
                    border: `1px solid ${enHoja ? P.green : P.borderDim}`,
                    borderRadius: 5, padding: "6px 10px",
                  }}>
                    {/* Nivel badge */}
                    <div style={{ textAlign: "center", paddingTop: 2 }}>
                      <div style={{ fontSize: 9, color: P.gold, fontFamily: "Cinzel, serif",
                        textTransform: "uppercase" }}>{c.v === 0 ? "T" : `N${c.v}`}</div>
                    </div>
                    {/* Info */}
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: P.text }}>{c.nombre}</div>
                      <div style={{ fontSize: 10, color: P.textDim, marginTop: 1 }}>
                        {c.esc} · {c.t} · {c.alc} · {c.c} · {c.dur}
                      </div>
                      <div style={{ fontSize: 11, color: P.textDim, marginTop: 2, fontStyle: "italic" }}>
                        {c.d}
                      </div>
                    </div>
                    {/* Botón */}
                    <button
                      onClick={() => !enHoja && addConjuro(c)}
                      style={{
                        background: enHoja ? "transparent" : P.crimson,
                        border: `1px solid ${enHoja ? P.green : P.crimson}`,
                        color: enHoja ? "#7fc47f" : "#fff",
                        borderRadius: 4, padding: "3px 8px", cursor: enHoja ? "default" : "pointer",
                        fontSize: 11, whiteSpace: "nowrap", flexShrink: 0,
                      }}>
                      {enHoja ? "✓ En hoja" : "+ Añadir"}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Card>

      {/* ── Conjuro personalizado ── */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: formPers ? 12 : 0 }}>
          <SecTitle style={{ marginBottom: 0 }}>Conjuro Personalizado</SecTitle>
          <Btn onClick={() => setFormPers(f => !f)} variant="gold">
            {formPers ? "▲ Cancelar" : "+ Personalizado"}
          </Btn>
        </div>
        {formPers && (
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 130px", gap: 8 }}>
              <Field label="Nombre">
                <Inp value={nuevo.nombre} onChange={v => setNuevo(n => ({...n, nombre:v}))} placeholder="Nombre del conjuro" />
              </Field>
              <Field label="Nivel">
                <select value={nuevo.v} onChange={e => setNuevo(n => ({...n, v:Number(e.target.value)}))}
                  style={{ ...baseInput, cursor: "pointer" }}>
                  {[0,1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n}>{n === 0 ? "Truco" : n}</option>)}
                </select>
              </Field>
              <Field label="Escuela">
                <Sel value={nuevo.esc} onChange={v => setNuevo(n => ({...n, esc:v}))} options={ESCUELAS} />
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
              <Field label="Tiempo"><Inp value={nuevo.t} onChange={v => setNuevo(n => ({...n, t:v}))} placeholder="1 acción" /></Field>
              <Field label="Alcance"><Inp value={nuevo.alc} onChange={v => setNuevo(n => ({...n, alc:v}))} placeholder="18 m" /></Field>
              <Field label="Componentes"><Inp value={nuevo.c} onChange={v => setNuevo(n => ({...n, c:v}))} placeholder="V, S, M" /></Field>
              <Field label="Duración"><Inp value={nuevo.dur} onChange={v => setNuevo(n => ({...n, dur:v}))} placeholder="Instantáneo" /></Field>
            </div>
            <Field label="Descripción breve">
              <Inp value={nuevo.d} onChange={v => setNuevo(n => ({...n, d:v}))} placeholder="Efecto mecánico del conjuro…" />
            </Field>
            <div>
              <Btn onClick={addPersonalizado} variant="crimson">+ Añadir a la hoja</Btn>
            </div>
          </div>
        )}
      </Card>

      {/* ── Lista de conjuros del personaje ── */}
      {char.conjuros.length > 0 && (
        <Card>
          <SecTitle>
            Conjuros en la Hoja ({char.conjuros.length})
          </SecTitle>
          <div style={{ fontSize: 11, color: P.textDim, marginBottom: 10 }}>
            ✦ = preparado · ○ = no preparado. Las descripciones son referencia rápida; consulta el PHB para reglas completas.
          </div>
          {porNivel.map((grupo, nivel) => {
            if (!grupo.length) return null;
            return (
              <div key={nivel} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: P.gold, fontFamily: "Cinzel, serif",
                  textTransform: "uppercase", letterSpacing: "0.12em",
                  borderBottom: `1px solid ${P.gold}40`, paddingBottom: 3, marginBottom: 6 }}>
                  {nivel === 0 ? "Trucos (Nivel 0)" : `Nivel ${nivel}`}
                </div>
                <div style={{ display: "grid", gap: 4 }}>
                  {grupo.map((c, idx) => {
                    const realIdx = char.conjuros.indexOf(c);
                    return (
                      <div key={idx} style={{
                        display: "grid", gridTemplateColumns: "24px 1fr auto",
                        gap: 8, alignItems: "start",
                        background: c.preparado ? `${P.crimson}10` : "transparent",
                        border: `1px solid ${c.preparado ? P.border : P.borderDim}`,
                        borderRadius: 4, padding: "5px 8px",
                      }}>
                        {/* Preparado toggle */}
                        <button onClick={() => togPrep(realIdx)} title={c.preparado ? "Preparado" : "No preparado"}
                          style={{ background: "transparent", border: "none", cursor: "pointer",
                            fontSize: 14, color: c.preparado ? P.gold : P.border, padding: 0 }}>
                          {c.preparado ? "✦" : "○"}
                        </button>
                        {/* Datos */}
                        <div>
                          <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                            <span style={{ fontWeight: 700, fontSize: 13 }}>{c.nombre}</span>
                            {c.custom && <span style={{ fontSize: 9, color: P.textDim, border: `1px solid ${P.border}`, padding: "1px 4px", borderRadius: 3 }}>personalizado</span>}
                            <span style={{ fontSize: 10, color: P.textDim }}>{c.esc}</span>
                          </div>
                          <div style={{ fontSize: 10, color: P.textDim, marginTop: 1 }}>
                            {[c.t, c.alc, c.c, c.dur].filter(Boolean).join(" · ")}
                          </div>
                          {c.d && <div style={{ fontSize: 11, color: P.textDim, marginTop: 2, fontStyle: "italic" }}>{c.d}</div>}
                        </div>
                        {/* Eliminar */}
                        <button onClick={() => delConjuro(realIdx)}
                          style={{ background: "transparent", border: "none",
                            color: P.crimsonLt, cursor: "pointer", fontSize: 15, padding: 0 }}>✕</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );
}

// ─── Pestaña: Equipo ──────────────────────────────────────────────────────────

function TabEquipo({ char, u, un }) {
  const monedas = [
    { k: "pp", label: "Platino",  color: "#d0d8e8" },
    { k: "po", label: "Oro",      color: P.gold },
    { k: "pe", label: "Electro",  color: "#8ab8c8" },
    { k: "pa", label: "Plata",    color: "#c0c0c0" },
    { k: "pc", label: "Cobre",    color: "#c87838" },
  ];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <SecTitle>Monedas</SecTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          {monedas.map(({ k, label, color }) => (
            <div key={k} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>🪙</div>
              <div style={{ fontSize: 9, color: color, fontFamily: "Cinzel, serif",
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                {label}
              </div>
              <Num value={char.monedas[k]} onChange={v => un("monedas", k, Math.max(0, v))} min={0}
                style={{ textAlign: "center", fontSize: 16, color }} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SecTitle>Equipo y Objetos</SecTitle>
        <Ta value={char.equipo} onChange={v => u("equipo", v)}
          placeholder={"Armadura de cuero (+1 CA)\nEspada corta (1d6 perforante, Finura, Ligera)\nPack de aventurero\n..."}
          rows={10} />
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Card>
          <SecTitle>Proficiencias</SecTitle>
          <Ta value={char.proficiencias} onChange={v => u("proficiencias", v)}
            placeholder={"Armaduras: Ligera, Media\nArmas: Marciales, Simples\nHerramientas: Instrumentos de cuerda"}
            rows={6} />
        </Card>
        <Card>
          <SecTitle>Lenguas</SecTitle>
          <Ta value={char.lenguas} onChange={v => u("lenguas", v)}
            placeholder={"Común\nElfo\nEnano\n..."} rows={6} />
        </Card>
      </div>
    </div>
  );
}

// ─── Pestaña: Trasfondo ───────────────────────────────────────────────────────

function TabTrasfondo({ char, u }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <SecTitle>Rasgos de Personalidad</SecTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Rasgo de Personalidad">
            <Ta value={char.rasgoPersonalidad} onChange={v => u("rasgoPersonalidad", v)}
              placeholder="¿Cómo se comporta tu personaje? Sus manías, costumbres..." rows={3} />
          </Field>
          <Field label="Ideal">
            <Ta value={char.ideal} onChange={v => u("ideal", v)}
              placeholder="¿Qué principio o creencia lo motiva?" rows={3} />
          </Field>
          <Field label="Vínculo">
            <Ta value={char.vinculo} onChange={v => u("vinculo", v)}
              placeholder="¿Qué personas, lugares u objetivos le importan más?" rows={3} />
          </Field>
          <Field label="Defecto">
            <Ta value={char.defecto} onChange={v => u("defecto", v)}
              placeholder="Su debilidad, vicio o secreto comprometedor..." rows={3} />
          </Field>
        </div>
      </Card>

      <Card>
        <SecTitle>Apariencia Física</SecTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 10 }}>
          {[
            ["edad", "Edad"], ["altura", "Altura"], ["peso", "Peso"],
            ["ojos", "Color de Ojos"], ["cabello", "Color de Cabello"], ["piel", "Color de Piel"],
          ].map(([k, label]) => (
            <Field key={k} label={label}>
              <Inp value={char[k]} onChange={v => u(k, v)} />
            </Field>
          ))}
        </div>
        <Field label="Descripción adicional (marcas, cicatrices, vestimenta...)">
          <Ta value={char.apariencia} onChange={v => u("apariencia", v)} rows={3} />
        </Field>
      </Card>

      <Card>
        <SecTitle>Historia Personal</SecTitle>
        <Ta value={char.historia} onChange={v => u("historia", v)}
          placeholder="El origen de tu personaje, sus motivaciones, lo que le trajo a esta vida de aventuras..."
          rows={10} />
      </Card>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

const TABS = [
  { id: "basico",     label: "Básico" },
  { id: "atributos",  label: "Atributos" },
  { id: "combate",    label: "Combate" },
  { id: "conjuros",   label: "Conjuros" },
  { id: "equipo",     label: "Equipo" },
  { id: "trasfondo",  label: "Trasfondo" },
];

export default function DnDCreator() {
  const [tab, setTab]   = useState("basico");
  const [char, setChar] = useState(mkChar());

  // Helpers de actualización
  const u  = (k, v)          => setChar(c => ({ ...c, [k]: v }));
  const un = (k, sk, v)      => setChar(c => ({ ...c, [k]: { ...c[k], [sk]: v } }));

  // Cambio de trasfondo: deshace el anterior y aplica el nuevo
  const handleTrasfondo = (nuevo) => {
    setChar(c => {
      let next = { ...c, hab: { ...c.hab } };

      // 1. Deshacer ASI del trasfondo anterior
      if (c.trasfondoAplicado && c.asiAplicado) {
        for (const [attr, bonus] of Object.entries(c.asiAplicado)) {
          next[attr] = (next[attr] || 10) - bonus;
        }
      }

      // 2. Registrar nuevo trasfondo
      next.trasfondo = nuevo;
      next.trasfondoAplicado = nuevo;
      next.asiAplicado = {};

      const data = DATOS_TRASFONDO[nuevo];
      if (data) {
        // 3. Aplicar nuevos ASI
        const asiAplicado = {};
        for (const [attr, bonus] of Object.entries(data.asi)) {
          next[attr] = (next[attr] || 10) + bonus;
          asiAplicado[attr] = bonus;
        }
        next.asiAplicado = asiAplicado;

        // 4. Marcar competencias de habilidad
        for (const skill of data.habilidades) {
          next.hab[skill] = true;
        }

        // 5. Añadir dote de origen si no existe ya
        const yaExiste = next.dotes.some(d => d.nombre === data.dote);
        if (!yaExiste) {
          next.dotes = [...next.dotes, { nombre: data.dote, desc: "" }];
        }
      }

      return next;
    });
  };

  const nTotal = nivelTotal(char.progresion);
  const prof = calcProf(nTotal);

  // Import / Export
  const doExport = () => {
    const blob = new Blob([JSON.stringify(char, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${char.nombre || "personaje"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const doImport = e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        // Merge with default to handle missing keys from older exports
        setChar({ ...mkChar(), ...data });
      } catch {
        alert("Error al leer el archivo JSON. ¿Es un personaje válido?");
      }
    };
    r.readAsText(f);
    e.target.value = "";
  };

  const doNuevo = () => {
    if (confirm("¿Crear nuevo personaje? Se perderán los cambios no exportados.")) {
      setChar(mkChar());
      setTab("basico");
    }
  };

  // ── Exportar a PDF ──────────────────────────────────────────────────────────
  const exportToPDF = () => {
    const nT    = nivelTotal(char.progresion);
    const profV = calcProf(nT);
    const md    = s => Math.floor((s - 10) / 2);
    const fm    = n => n >= 0 ? `+${n}` : `${n}`;

    const claseStr = char.progresion
      .filter(p => p.clase)
      .map(p => `${p.clase}${p.subclase ? ` (${p.subclase})` : ""} ${p.niveles}`)
      .join(" / ") || "—";

    const hv = h => {
      const base = md(char[h.attr]);
      const b = char.hab[h.id] ? (char.exp[h.id] ? profV * 2 : profV) : 0;
      return base + b;
    };
    const sv = a => md(char[a]) + (char.salv[a] ? profV : 0);
    const percPas = 10 + hv(HABS.find(h => h.id === "percepcion"));
    const dadosTxt = dadosGolpeTexto(char.progresion);

    const atkRows = char.ataques.length
      ? char.ataques.map(a =>
          `<tr><td>${a.nombre||"—"}</td><td>${a.bono||"—"}</td><td>${a.dano||"—"}</td><td>${a.maestria||"—"}</td></tr>`
        ).join("")
      : `<tr><td colspan="4" style="color:#aaa;text-align:center;font-style:italic">Sin ataques registrados</td></tr>`;

    const spellSlots = [1,2,3,4,5,6,7,8,9].map(n => {
      const r = char.ranuras[n];
      if (!r.max) return "";
      return `<div class="slot-g"><span class="sl">Niv.${n}</span><span class="sv">${r.max - r.usadas}/${r.max}</span></div>`;
    }).join("");

    const trucosPDF = char.conjuros.filter(c => c.v === 0).map(c => c.nombre).join(", ") || "—";
    const conjurosPorNivel = [1,2,3,4,5,6,7,8,9].map(n => {
      const grupo = char.conjuros.filter(c => c.v === n);
      if (!grupo.length) return "";
      return `<div style="margin-bottom:2mm"><strong style="color:#7b0000;font-size:6pt">Niv.${n}: </strong>`
        + grupo.map(c => `${c.preparado ? "✦" : "○"} ${c.nombre}`).join(" · ")
        + `</div>`;
    }).join("");

    const doteHtml = char.dotes.map(d =>
      `<div style="margin-bottom:1mm"><strong style="color:#7b0000">${d.nombre}</strong>${d.desc ? `: ${d.desc}` : ""}</div>`
    ).join("");

    const circle = (filled, exp) => exp ? "◆" : filled ? "●" : "○";
    const dotCls  = (filled, exp) => exp ? "exp" : filled ? "filled" : "";

    const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8">
<title>${char.nombre || "Personaje"} — D&amp;D 2024</title>
<style>
  @page { size: A4 portrait; margin: 7mm; }
  *{ box-sizing:border-box; margin:0; padding:0; }
  body{ font-family:'Book Antiqua',Palatino,Georgia,serif; font-size:7.5pt; color:#111;
        background:#fff; -webkit-print-color-adjust:exact; print-color-adjust:exact; }

  .banner{ background:#7b0000; color:#fff; text-align:center; padding:2.5mm 0 2mm; margin-bottom:2mm; }
  .banner h1{ font-size:13pt; letter-spacing:.3em; text-transform:uppercase; }
  .banner p { font-size:5.5pt; letter-spacing:.4em; text-transform:uppercase; opacity:.85; margin-top:.5mm; }

  .char-header{ border:1.5pt solid #7b0000; margin-bottom:2mm; }
  .char-name{ background:#7b0000; color:#fff; font-size:12pt; font-weight:bold;
              padding:2mm 3mm; letter-spacing:.05em; }
  .char-fields{ display:flex; flex-wrap:wrap; }
  .cf{ flex:1; min-width:50pt; padding:1.5mm 2mm; border-right:.5pt solid #ddd; }
  .cf:last-child{ border-right:none; }
  .cf .lb{ display:block; font-size:5pt; color:#7b0000; text-transform:uppercase;
            letter-spacing:.1em; margin-bottom:.5mm; }
  .cf .vl{ font-size:8pt; font-weight:bold; }

  .main{ display:flex; gap:2mm; align-items:flex-start; }
  .c1{ width:44mm; flex-shrink:0; }
  .c2{ width:50mm; flex-shrink:0; }
  .c3{ flex:1; }

  .sec{ border:1pt solid #7b0000; margin-bottom:2mm; page-break-inside:avoid; }
  .sec-t{ background:#7b0000; color:#fff; font-size:5.5pt; text-transform:uppercase;
           letter-spacing:.15em; padding:1mm 2mm; font-weight:bold; }
  .sec-b{ padding:1.5mm 2mm; }

  .ip{ display:flex; gap:1.5mm; margin-bottom:2mm; }
  .badge{ flex:1; border:1pt solid #7b0000; text-align:center; padding:1.5mm 1mm; }
  .badge .bv{ font-size:13pt; font-weight:bold; display:block; line-height:1; }
  .badge .bl{ font-size:5pt; text-transform:uppercase; color:#7b0000;
               letter-spacing:.08em; display:block; margin-top:.5mm; }

  .attrs{ display:flex; flex-direction:column; gap:1.5mm; }
  .abox{ border:1pt solid #7b0000; text-align:center; padding:1.5mm 1mm; }
  .aname{ font-size:5pt; text-transform:uppercase; letter-spacing:.1em;
           color:#7b0000; margin-bottom:.5mm; }
  .amod{ font-size:18pt; font-weight:bold; line-height:1; }
  .ascore{ display:inline-block; border:1pt solid #7b0000; font-size:8pt;
            font-weight:bold; padding:.5mm 3mm; margin-top:1mm; }

  .chk{ display:flex; align-items:center; gap:1.5mm; margin-bottom:.8mm; line-height:1.2; }
  .dot{ font-size:7pt; width:3.5mm; text-align:center; flex-shrink:0; color:#ccc; }
  .dot.filled{ color:#7b0000; }
  .dot.exp{ color:#c8922a; font-weight:bold; }
  .cv{ font-size:7.5pt; font-weight:bold; width:6mm; text-align:right; flex-shrink:0; }
  .cn{ font-size:7pt; }
  .at{ color:#aaa; font-size:6pt; }

  .ctop{ display:flex; gap:1.5mm; margin-bottom:2mm; }
  .cbadge{ flex:1; border:1pt solid #7b0000; text-align:center; padding:1.5mm 1mm; }
  .cbadge .val{ font-size:13pt; font-weight:bold; }
  .cbadge .lbl{ font-size:5pt; text-transform:uppercase; color:#7b0000;
                letter-spacing:.08em; display:block; margin-top:.5mm; }

  .hpg{ display:flex; gap:1.5mm; margin-bottom:1mm; }
  .hpb{ flex:1; border:1pt solid #aaa; padding:1mm 1.5mm; }
  .hpb .hl{ font-size:5pt; color:#7b0000; text-transform:uppercase;
             letter-spacing:.08em; display:block; margin-bottom:.5mm; }
  .hpb .hv{ font-size:12pt; font-weight:bold; }

  table.atk{ width:100%; border-collapse:collapse; font-size:7pt; }
  table.atk th{ background:#f5ece4; color:#7b0000; font-size:5.5pt; text-transform:uppercase;
                letter-spacing:.08em; padding:1mm 1.5mm; text-align:left;
                border-bottom:.5pt solid #7b0000; }
  table.atk td{ padding:.8mm 1.5mm; border-bottom:.3pt solid #eee; }
  table.atk tr:last-child td{ border-bottom:none; }

  .slot-row{ display:flex; flex-wrap:wrap; gap:1.5mm; margin-bottom:1.5mm; }
  .slot-g{ border:.5pt solid #7b0000; padding:.5mm 1mm; text-align:center; min-width:11mm; }
  .sl{ font-size:5pt; color:#7b0000; display:block; text-transform:uppercase; }
  .sv{ font-size:8pt; font-weight:bold; }

  .coins{ display:flex; gap:1.5mm; flex-wrap:wrap; margin-bottom:1.5mm; }
  .coin{ border:.5pt solid #aaa; padding:.5mm 1.5mm; text-align:center; min-width:8mm; }
  .coinv{ font-weight:bold; font-size:8pt; }
  .coink{ font-size:5pt; color:#7b0000; text-transform:uppercase; }

  .dcrow{ display:flex; gap:1.5mm; align-items:center; margin-bottom:.8mm; }
  .dcc{ width:3.5mm; height:3.5mm; border-radius:50%; border:.8pt solid currentColor;
         display:inline-block; }
  .dcc.f{ background:currentColor; }

  .pgrid{ display:flex; gap:1.5mm; margin-top:2mm; }
  .pbox{ flex:1; border:1pt solid #7b0000; }
  .pt{ background:#7b0000; color:#fff; font-size:5pt; text-transform:uppercase;
       letter-spacing:.1em; padding:.8mm 1.5mm; font-weight:bold; }
  .pb{ padding:1.5mm; font-size:7pt; min-height:10mm; line-height:1.4; }

  .two{ display:flex; gap:2mm; }
  .two>*{ flex:1; }
  .txt{ font-size:7pt; line-height:1.5; white-space:pre-wrap; word-break:break-word; }
  .muted{ color:#aaa; font-style:italic; }
  .pb2{ page-break-before:always; }

  @media print{
    body{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  }
</style></head><body>

<div class="banner">
  <h1>⚔ Hoja de Personaje</h1>
  <p>Dungeons &amp; Dragons · Edición 2024</p>
</div>

<div class="char-header">
  <div class="char-name">${char.nombre || "Sin nombre"}</div>
  <div class="char-fields">
    <div class="cf" style="flex:2"><span class="lb">Clase y Nivel</span><span class="vl">${claseStr}</span></div>
    <div class="cf"><span class="lb">Nivel Total</span><span class="vl">${nT}</span></div>
    <div class="cf"><span class="lb">Trasfondo</span><span class="vl">${char.trasfondo || "—"}</span></div>
    <div class="cf"><span class="lb">Jugador</span><span class="vl">${char.jugador || "—"}</span></div>
    <div class="cf"><span class="lb">Especie</span><span class="vl">${char.especie || "—"}</span></div>
    <div class="cf"><span class="lb">Alineamiento</span><span class="vl">${char.alineamiento || "—"}</span></div>
    <div class="cf"><span class="lb">XP</span><span class="vl">${char.xp}</span></div>
  </div>
</div>

<div class="main">

  <!-- Columna 1: Características -->
  <div class="c1">
    <div class="ip">
      <div class="badge">
        <span class="bv">${char.inspiracion ? "✦" : "○"}</span>
        <span class="bl">Inspiración</span>
      </div>
      <div class="badge">
        <span class="bv">${fm(profV)}</span>
        <span class="bl">Competencia</span>
      </div>
    </div>
    <div class="sec">
      <div class="sec-t">Características</div>
      <div class="sec-b">
        <div class="attrs">
          ${ATTRS.map(a => `
          <div class="abox">
            <div class="aname">${ATTR_NOMBRE[a]}</div>
            <div class="amod">${fm(md(char[a]))}</div>
            <div class="ascore">${char[a]}</div>
          </div>`).join("")}
        </div>
      </div>
    </div>
    <div class="sec">
      <div class="sec-t">Percepción Pasiva</div>
      <div class="sec-b" style="text-align:center;font-size:16pt;font-weight:bold">${percPas}</div>
    </div>
    <div class="sec">
      <div class="sec-t">Proficiencias y Lenguas</div>
      <div class="sec-b">
        <div class="txt">${char.proficiencias || ""}</div>
        ${char.lenguas ? `<div class="txt" style="margin-top:1mm"><em>Lenguas:</em> ${char.lenguas}</div>` : ""}
        ${!char.proficiencias && !char.lenguas ? `<span class="muted">—</span>` : ""}
      </div>
    </div>
  </div>

  <!-- Columna 2: Salvaciones y Habilidades -->
  <div class="c2">
    <div class="sec">
      <div class="sec-t">Tiradas de Salvación</div>
      <div class="sec-b">
        ${ATTRS.map(a => `
        <div class="chk">
          <span class="dot ${char.salv[a] ? "filled" : ""}">${char.salv[a] ? "●" : "○"}</span>
          <span class="cv">${fm(sv(a))}</span>
          <span class="cn">${ATTR_NOMBRE[a]}</span>
        </div>`).join("")}
      </div>
    </div>
    <div class="sec">
      <div class="sec-t">Habilidades &nbsp;<span style="font-size:4.5pt;letter-spacing:0">● Comp. ◆ Maestría</span></div>
      <div class="sec-b">
        ${HABS.map(h => `
        <div class="chk">
          <span class="dot ${dotCls(char.hab[h.id], char.exp[h.id])}">${circle(char.hab[h.id], char.exp[h.id])}</span>
          <span class="cv">${fm(hv(h))}</span>
          <span class="cn">${h.nombre} <span class="at">(${ATTR_CORTO[h.attr]})</span></span>
        </div>`).join("")}
      </div>
    </div>
  </div>

  <!-- Columna 3: Combate, Ataques, Equipo -->
  <div class="c3">
    <div class="ctop">
      <div class="cbadge"><span class="val">${char.ca || (10 + md(char.des))}</span><span class="lbl">Clase de Armadura</span></div>
      <div class="cbadge"><span class="val">${fm(md(char.des))}</span><span class="lbl">Iniciativa</span></div>
      <div class="cbadge"><span class="val">${char.velocidad}</span><span class="lbl">Velocidad</span></div>
    </div>

    <div class="sec">
      <div class="sec-t">Puntos de Golpe</div>
      <div class="sec-b">
        <div class="hpg">
          <div class="hpb"><span class="hl">Máximo</span><span class="hv">${char.pvMax}</span></div>
          <div class="hpb"><span class="hl">Actuales</span><span class="hv">${char.pvActuales}</span></div>
          <div class="hpb"><span class="hl">Temporales</span><span class="hv">${char.pvTemp}</span></div>
        </div>
      </div>
    </div>

    <div class="two" style="margin-bottom:2mm">
      <div class="sec" style="margin-bottom:0">
        <div class="sec-t">Dados de Golpe</div>
        <div class="sec-b">
          <div style="font-size:7pt;margin-bottom:.5mm">${dadosTxt}</div>
          <div style="font-size:6pt;color:#7b0000">Usados: ${char.dadoGolpeUsado} / Total: ${nT}</div>
        </div>
      </div>
      <div class="sec" style="margin-bottom:0">
        <div class="sec-t">Tiradas de Muerte</div>
        <div class="sec-b">
          <div class="dcrow" style="color:#2a7a2a">
            <span style="font-size:6pt;width:9mm">Éxitos</span>
            ${[1,2,3].map(i => `<div class="dcc ${i <= char.muerteExito ? "f" : ""}" style="color:#2a7a2a"></div>`).join("")}
          </div>
          <div class="dcrow" style="color:#7b0000">
            <span style="font-size:6pt;width:9mm">Fallos</span>
            ${[1,2,3].map(i => `<div class="dcc ${i <= char.muerteFallo ? "f" : ""}" style="color:#7b0000"></div>`).join("")}
          </div>
        </div>
      </div>
    </div>

    <div class="sec">
      <div class="sec-t">Ataques y Acciones de Combate</div>
      <div class="sec-b" style="padding:0">
        <table class="atk">
          <thead><tr><th>Nombre</th><th>Bono Ataque</th><th>Daño / Tipo</th><th>Maestría</th></tr></thead>
          <tbody>${atkRows}</tbody>
        </table>
      </div>
    </div>

    ${(doteHtml || char.rasgosEspeciales) ? `
    <div class="sec">
      <div class="sec-t">Dotes y Rasgos Especiales</div>
      <div class="sec-b">
        ${doteHtml}
        ${char.rasgosEspeciales ? `<div class="txt" style="margin-top:1mm">${char.rasgosEspeciales}</div>` : ""}
      </div>
    </div>` : ""}

    <div class="sec">
      <div class="sec-t">Equipo y Monedas</div>
      <div class="sec-b">
        <div class="coins">
          ${Object.entries(char.monedas).map(([k,v]) =>
            `<div class="coin"><div class="coinv">${v}</div><div class="coink">${k}</div></div>`
          ).join("")}
        </div>
        <div class="txt">${char.equipo || '<span class="muted">—</span>'}</div>
      </div>
    </div>
  </div>
</div>

<div class="pgrid">
  ${[["Rasgo de Personalidad", char.rasgoPersonalidad],
     ["Ideal", char.ideal],
     ["Vínculo", char.vinculo],
     ["Defecto", char.defecto]
  ].map(([label, val]) => `
  <div class="pbox">
    <div class="pt">${label}</div>
    <div class="pb">${val || '<span class="muted">—</span>'}</div>
  </div>`).join("")}
</div>

<!-- Página 2 -->
<div class="pb2"></div>
<div class="banner"><h1>⚔ Conjuros e Historia — ${char.nombre || "Personaje"}</h1></div>

<div class="two" style="margin-bottom:2mm">
  <div>
    <div class="sec">
      <div class="sec-t">Conjuración</div>
      <div class="sec-b">
        <div style="display:flex;gap:3mm;margin-bottom:2mm;flex-wrap:wrap">
          <div><span style="font-size:5pt;color:#7b0000;text-transform:uppercase;letter-spacing:.08em;display:block">Atributo</span><strong>${char.conjAttr || "—"}</strong></div>
          <div><span style="font-size:5pt;color:#7b0000;text-transform:uppercase;letter-spacing:.08em;display:block">CD Conjuro</span><strong>${char.cdConjuro || "—"}</strong></div>
          <div><span style="font-size:5pt;color:#7b0000;text-transform:uppercase;letter-spacing:.08em;display:block">Bono Ataque</span><strong>${char.bonusAtaqueConjuro || "—"}</strong></div>
        </div>
        ${spellSlots ? `<div class="slot-row">${spellSlots}</div>` : ""}
        ${char.trucos ? `<div style="margin-bottom:1mm"><strong style="font-size:6pt;color:#7b0000;text-transform:uppercase">Trucos: </strong><span class="txt">${trucosPDF}</span></div>` : ""}
        <div class="txt">${conjurosPorNivel || '<span class="muted">Sin conjuros registrados</span>'}</div>
      </div>
    </div>
  </div>
  <div>
    ${(char.edad || char.altura || char.apariencia) ? `
    <div class="sec">
      <div class="sec-t">Apariencia Física</div>
      <div class="sec-b">
        <div style="display:flex;flex-wrap:wrap;gap:2mm;font-size:7pt;margin-bottom:1mm">
          ${char.edad ? `<span><strong>Edad:</strong> ${char.edad}</span>` : ""}
          ${char.altura ? `<span><strong>Altura:</strong> ${char.altura}</span>` : ""}
          ${char.peso ? `<span><strong>Peso:</strong> ${char.peso}</span>` : ""}
          ${char.ojos ? `<span><strong>Ojos:</strong> ${char.ojos}</span>` : ""}
          ${char.cabello ? `<span><strong>Cabello:</strong> ${char.cabello}</span>` : ""}
          ${char.piel ? `<span><strong>Piel:</strong> ${char.piel}</span>` : ""}
        </div>
        ${char.apariencia ? `<div class="txt">${char.apariencia}</div>` : ""}
      </div>
    </div>` : ""}
    ${char.historia ? `
    <div class="sec">
      <div class="sec-t">Historia Personal</div>
      <div class="sec-b"><div class="txt">${char.historia}</div></div>
    </div>` : ""}
  </div>
</div>

</body></html>`;

    const win = window.open("", "_blank", "width=860,height=1100");
    if (!win) { alert("Permite ventanas emergentes para exportar el PDF."); return; }
    win.document.write(html);
    win.document.close();
    setTimeout(() => { win.focus(); win.print(); }, 600);
  };

  const tabProps = { char, u, un, handleTrasfondo };

  return (
    <div style={{ background: P.bg, minHeight: "100vh", color: P.text,
      fontFamily: "Crimson Pro, Georgia, serif" }}>

      {/* Fuentes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.4; }
        select option { background: #140f07; color: #e8d5a3; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #161009; }
        ::-webkit-scrollbar-thumb { background: #5a3a18; border-radius: 3px; }
        textarea:focus, input:focus, select:focus {
          border-color: #c8922a !important; outline: none;
          box-shadow: 0 0 0 1px #c8922a40;
        }
        button:focus { outline: 1px dashed #c8922a; outline-offset: 2px; }
      `}</style>

      {/* ── Cabecera ── */}
      <header style={{ background: P.surface, borderBottom: `2px solid ${P.gold}60`,
        padding: "12px 20px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 960, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: 18, color: P.gold,
              letterSpacing: "0.08em" }}>
              ⚔ Hoja de Personaje
            </div>
            <div style={{ fontSize: 10, color: P.textDim, letterSpacing: "0.18em",
              textTransform: "uppercase" }}>
              Dungeons & Dragons · Edición 2024
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <Btn onClick={doNuevo} variant="default">+ Nuevo</Btn>
            <label style={{
              background: "transparent", border: `1px solid ${P.gold}`,
              color: P.gold, borderRadius: 4, padding: "6px 14px",
              cursor: "pointer", fontSize: 12, fontFamily: "Cinzel, serif",
              letterSpacing: "0.05em",
            }}>
              ↑ Importar
              <input type="file" accept=".json" onChange={doImport}
                style={{ display: "none" }} />
            </label>
            <Btn onClick={doExport} variant="crimson">↓ JSON</Btn>
            <Btn onClick={exportToPDF} variant="crimson">📄 PDF</Btn>
          </div>
        </div>
      </header>

      {/* ── Barra de resumen ── */}
      {char.nombre && (
        <div style={{ background: `${P.crimson}20`, borderBottom: `1px solid ${P.crimson}35`,
          padding: "6px 20px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", fontSize: 13,
            display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ color: P.gold, fontWeight: 700, fontFamily: "Cinzel, serif" }}>
              {char.nombre}
            </span>
            {char.especie && <span style={{ color: P.textDim }}>{char.especie}</span>}
            {char.progresion.filter(p => p.clase).map((p, i) => (
              <span key={i}>
                {p.clase}{p.subclase ? ` (${p.subclase})` : ""} {p.niveles}
              </span>
            ))}
            {nTotal > 0 && (
              <span style={{ color: P.textDim }}>· Niv. {nTotal}</span>
            )}
            {char.trasfondo && <span style={{ color: P.textDim }}>· {char.trasfondo}</span>}
            <span style={{ marginLeft: "auto", color: P.textDim }}>
              Competencia <span style={{ color: P.gold }}>{fmtBono(prof)}</span>
              {char.pvMax > 0 && (
                <span style={{ marginLeft: 12 }}>
                  PG <span style={{ color: char.pvActuales <= 0 ? P.crimsonLt : P.text }}>
                    {char.pvActuales}
                  </span>/{char.pvMax}
                </span>
              )}
            </span>
          </div>
        </div>
      )}

      {/* ── Barra de pestañas ── */}
      <nav style={{ background: P.surface, borderBottom: `1px solid ${P.border}`,
        position: "sticky", top: 57, zIndex: 99 }}>
        <div style={{ maxWidth: 960, margin: "0 auto",
          display: "flex", overflowX: "auto" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: "transparent", border: "none",
              padding: "10px 18px",
              fontFamily: "Cinzel, serif", fontSize: 11,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: tab === t.id ? P.gold : P.textDim,
              borderBottom: tab === t.id
                ? `2px solid ${P.gold}`
                : "2px solid transparent",
              cursor: "pointer", whiteSpace: "nowrap",
              transition: "color 0.15s",
            }}>{t.label}</button>
          ))}
        </div>
      </nav>

      {/* ── Contenido ── */}
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "16px 16px 60px" }}>
        {tab === "basico"    && <TabBasico    {...tabProps} />}
        {tab === "atributos" && <TabAtributos {...tabProps} />}
        {tab === "combate"   && <TabCombate   {...tabProps} />}
        {tab === "conjuros"  && <TabConjuros  {...tabProps} />}
        {tab === "equipo"    && <TabEquipo    {...tabProps} />}
        {tab === "trasfondo" && <TabTrasfondo {...tabProps} />}
      </main>
    </div>
  );
}
