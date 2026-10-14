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
  // ── Eberron: La Forja del Artífice ───────────────────
  "Cambiante de Eberron",
  "Kalashtar",
  "Khoravar (Medio Elfo de Eberron)",
  "Linaje Artificial (Warforged)",
  "Mutante (Shifter)",
  // ── Spelljammer ───────────────────────────────────────
  "Autognomo",
  "Giff",
  "Hadozee",
  "Plasmoide",
  "Thri-kreen",
  // ── Ravenloft: Horrors Within ─────────────────────────
  "Dhampir",
  "Hexblood",
  "Lupin",
  "Renacido (Reborn)",
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
  // ── Personalizado ─────────────────────────────────────
  "Personalizado",
  // ── PHB 2024 ──────────────────────────────────────────
  "Acólito",
  "Animador",
  "Artesano",
  "Campesino",
  "Charlatán",
  "Comerciante",
  "Criminal",
  "Ermitaño",
  "Erudito",
  "Escriba",
  "Guardia",
  "Guía",
  "Marinero",
  "Noble",
  "Soldado",
  "Vagabundo",
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
  // ── Ravenloft: Horrors Within ─────────────────────────
  "El Acosado",
  "Errante de la Niebla",
  "Investigador (Ravenloft)",
  "Médium Espiritual",
  // ── Eberron: La Forja del Artífice ───────────────────
  "Heredero Aberrante",
  "Arqueólogo",
  "Agente de la Casa",
  "Inquisitivo",
  "Heredero de la Casa Cannith",
  "Heredero de la Casa Deneith",
  "Heredero de la Casa Ghallanda",
  "Heredero de la Casa Jorasco",
  "Heredero de la Casa Kundarak",
  "Heredero de la Casa Lyrandar",
  "Heredero de la Casa Medani",
  "Heredero de la Casa Orien",
  "Heredero de la Casa Phiarlan",
  "Heredero de la Casa Sivis",
  "Heredero de la Casa Tharashk",
  "Heredero de la Casa Thuranni",
  "Heredero de la Casa Vadalis",
  // ── Héroes de Faerún ──────────────────────────────────
  "Arpista",
  "Caballero del Guantelete",
  "Cuidador del Enclave Esmeralda",
  "Errante Rashemí",
  "Escudero del Dragón Púrpura",
  "Expulsado de los Amos de las Sombras",
  "Filibustero Chondathano",
  "Guardián de los Mythales",
  "Iniciado en el Fuego Mágico",
  "Ladrón de Tumbas Mulhorandín",
  "Mercenario de los Zhentarim",
  "Mercenario del Puño Ardiente",
  "Morador de Tierras sin Magia",
  "Peregrino de los Manantiales Lunares",
  "Pescador en Hielo",
  "Sectario del Dragón",
  "Tocado por un Genio",
  "Vasallo de la Alianza de los Lores",
  // ── Arcana Unleashed ──────────────────────────────────
  "Agente del Noveno Plumón",
  "Aprendiz Vidente",
  "Cazador de Tormentas del Crisol",
  "Entrenador de Familiar",
  "Espía del Conclave Enjoyado",
  "Experimento del Alba Cósmica",
  "Iniciado de los Tejedores del Horizonte",
  "Pupilo de las Manos Protectoras",
  "Recluta del Pacto de la Tumba",
  "Troupero del Circo Fantasmático",
];
const ALINEAMIENTOS = ["Legal Bueno","Neutral Bueno","Caótico Bueno","Legal Neutral","Neutral Verdadero","Caótico Neutral","Legal Malvado","Neutral Malvado","Caótico Malvado"];
const DADO_CLASE = {
  "Bárbaro": "d12", "Bardo": "d8", "Brujo": "d8", "Clérigo": "d8",
  "Druida": "d8", "Explorador": "d10", "Guerrero": "d10", "Hechicero": "d6",
  "Mago": "d6", "Monje": "d10", "Paladín": "d10", "Pícaro": "d8",
  "Artificiero": "d8",
};

// ops: IDs de habilidades elegibles | null = cualquiera | n: número a elegir
const PROF_CLASE = {
  "Bárbaro":    { salv:["fue","con"], ops:["trato_animales","atletismo","intimidacion","naturaleza","percepcion","supervivencia"], n:2 },
  "Bardo":      { salv:["des","car"], ops:null, n:3 },
  "Brujo":      { salv:["sab","car"], ops:["arcanos","engano","historia","intimidacion","investigacion","naturaleza","religion"], n:2 },
  "Clérigo":    { salv:["sab","car"], ops:["historia","perspicacia","medicina","persuasion","religion"], n:2 },
  "Druida":     { salv:["int","sab"], ops:["arcanos","trato_animales","perspicacia","medicina","naturaleza","percepcion","religion","supervivencia"], n:2 },
  "Explorador": { salv:["fue","des"], ops:["trato_animales","atletismo","perspicacia","investigacion","naturaleza","percepcion","sigilo","supervivencia"], n:3 },
  "Guerrero":   { salv:["fue","con"], ops:["acrobacia","trato_animales","atletismo","historia","perspicacia","intimidacion","percepcion","supervivencia"], n:2 },
  "Hechicero":  { salv:["con","car"], ops:["arcanos","engano","perspicacia","intimidacion","persuasion","religion"], n:2 },
  "Mago":       { salv:["int","sab"], ops:["arcanos","historia","perspicacia","investigacion","medicina","religion"], n:2 },
  "Monje":      { salv:["fue","des"], ops:["acrobacia","atletismo","historia","perspicacia","religion","sigilo"], n:2 },
  "Paladín":    { salv:["sab","car"], ops:["atletismo","perspicacia","intimidacion","medicina","persuasion","religion"], n:2 },
  "Pícaro":     { salv:["des","int"], ops:["acrobacia","atletismo","engano","perspicacia","intimidacion","investigacion","percepcion","actuacion","persuasion","juego_manos","sigilo"], n:4 },
  "Artificiero":{ salv:["con","int"], ops:["arcanos","historia","investigacion","medicina","naturaleza","percepcion","juego_manos"], n:2 },
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
    "Colegio de los Espíritus",  // Ravenloft: Horrors Within
    "Colegio de la Luna",        // Héroes de Faerún
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
    "Patrón No Muerto",   // Ravenloft: Horrors Within
    "Patrón Vestigio",    // Arcana Unleashed
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
    "Guardián Hueco",    // Ravenloft: Horrors Within
    "Caminante Invernal",  // Héroes de Faerún
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
    "Arquero Arcano",    // Arcana Unleashed
    "Abanderado",        // Héroes de Faerún
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
    "Magia de las Sombras",          // Ravenloft: Horrors Within
    "Hechicería del Fuego Mágico",  // Héroes de Faerún
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
    "Conjurador",        // Arcana Unleashed
    "Encantador",        // Arcana Unleashed
    "Nigromante",        // Arcana Unleashed
    "Transmutador",      // Arcana Unleashed
    "Hojacantante",      // Héroes de Faerún
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
    "Guerrero de las Artes Místicas",  // Arcana Unleashed
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
    "Juramento de los Genios Nobles",  // Héroes de Faerún
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
    "Vástago de los Tres",  // Héroes de Faerún
  ],
  "Artificiero": [
    "Alquimista",
    "Artillero",
    "Armero",
    "Herrero de Batalla",
    "Cartógrafo",          // Eberron: La Forja del Artífice
    "Reanimador",          // Ravenloft: Horrors Within
  ],
};

// Dotes PHB 2024 (✦ = Origen | ★ = Don Épico | sin marca = General)
const DOTES_PHB = [
  // ── Origen (nivel 1, otorgadas por trasfondo) ─────────
  "✦ Afortunado",
  "✦ Alerta",
  "✦ Atacante salvaje",
  "✦ Duro",
  "✦ Fabricante",
  "✦ Habilidoso",
  "✦ Iniciado en la magia",
  "✦ Matón de taberna",
  "✦ Músico",
  "✦ Sanador",
  // ── Dotes de origen — Héroes de Faerún ───────────────
  "✦ Agente de la Alianza de los Lores",
  "✦ Agente de los Arpistas",
  "✦ Aprendiz del Dragón Púrpura",
  "✦ Chispa del fuego mágico",
  "✦ Iniciado del Culto del Dragón",
  "✦ Novato del Guantelete",
  "✦ Principiante del Enclave Esmeralda",
  "✦ Rufián de los Zhentarim",
  // ── Generales (nivel 4+) ───────────────────────────────
  "Acechador",
  "Actor",
  "Apresador",
  "Atacante a la carga",
  "Atleta",
  "Azote de magos",
  "Centinela",
  "Chef",
  "Combatiente con dos armas",
  "Combatiente montado",
  "Duelista defensivo",
  "Entrenamiento con armas marciales",
  "Envenenador",
  "Experto en ballestas",
  "Experto en habilidades",
  "Influencia feérica",
  "Influencia sombría",
  "Lanzador en combate",
  "Lanzador preciso",
  "Lanzador ritual",
  "Líder inspirador",
  "Ligeramente acorazado",
  "Maestro de armas",
  "Maestro en armaduras medias",
  "Maestro en armaduras pesadas",
  "Maestro en armas de asta",
  "Maestro en armas pesadas",
  "Maestro en escudos",
  "Mejora de característica",
  "Mente aguda",
  "Moderadamente acorazado",
  "Muy acorazado",
  "Observador",
  "Perforador",
  "Rebanador",
  "Resiliente",
  "Resistente",
  "Telepático",
  "Telequinético",
  "Tirador de primera",
  "Triturador",
  "Veloz",
  "Versado en un elemento",
  // ── Dotes generales — Héroes de Faerún ───────────────
  "Colaboración de los Arpistas",
  "Comandante del Dragón Púrpura",
  "Conjurador de frío",
  "Determinación señorial",
  "Dracoseñalado",
  "Embaucador feérico",
  "Justicia callejera",
  "Magia de genio",
  "Magia del Enclave",
  "Resistencia de la Orden",
  "Tácticas de los Zhentarim",
  "Tocado por los mythales",
  "Versado en el fuego mágico",
  // ── Estilos de combate ────────────────────────────────
  "Combate con armas a dos manos",
  "Combate con armas arrojadizas",
  "Combate con dos armas",
  "Combate sin armas",
  "Defensa",
  "Duelo",
  "Intercepción",
  "Lucha a ciegas",
  "Protección",
  "Tiro con arco",
  "Guerrero Arcano",   // Arcana Unleashed — estilo de combate
  // ── Dones épicos (nivel 19+) ──────────────────────────
  "★ Don de la fortaleza",
  "★ Don de la habilidad",
  "★ Don de la pericia en combate",
  "★ Don de la recuperación",
  "★ Don de la resistencia a energías",
  "★ Don de la velocidad",
  "★ Don de la visión verdadera",
  "★ Don del ataque imparable",
  "★ Don del destino",
  "★ Don del espíritu de la noche",
  "★ Don del recuerdo de conjuros",
  "★ Don del viaje dimensional",
  "★ Don de la Potencia de Conjuro Eruptiva",  // Arcana Unleashed
  "★ Don del Dominio de Escuela de Magia",     // Arcana Unleashed
  "★ Don de la Mente de Hierro",               // Arcana Unleashed
  // ── Dones épicos — Héroes de Faerún ──────────────────
  "★ Don de la absorción de almas",
  "★ Don de la comunicación",
  "★ Don de la furia de la tormenta",
  "★ Don de la resistencia desesperada",
  "★ Don de la salud plena",
  "★ Don de las formas fluidas",
  "★ Don del derramamiento de sangre",
  "★ Don del dominio de los venenos",
  "★ Don del favor de la fortuna",
  "★ Don del fulgor exquisito",
  "★ Don del jolgorio",
  "★ Don del sol brillante",
  "★ Don del terror",
  // ── Dotes de origen — Ravenloft: Horrors Within ───────
  "✦ Ojo Agudo",       // Sharp Eye
  "✦ Superviviente",   // Survivor
  // ── Dotes de origen — Arcana Unleashed ───────────────
  "✦ Artista Arcano",
  "✦ Elocuencia Arcana",
  "✦ Infiltrador Arcano",
  "✦ Presagios Arcanos",
  "✦ Sobrecarga Arcana",
  "✦ Salvaguarda Arcana",
  "✦ Sepulturero Arcano",
  "✦ Amigo Familiar",
  "✦ Saltador de Portal",
  "✦ Anatomía Transmutada",
  // ── Dotes de Marca de Dragón — Eberron: La Forja del Artífice ──
  // (requieren campaña de Eberron; se obtienen mediante trasfondo de Casa Heredera a nivel 1 o dote libre en nivel 4+)
  "Marca de Dragón Aberrante",
  "Marca de Creación",
  "Marca de Curación",
  "Marca de Detección",
  "Marca de Elaboración (Fabricación)",
  "Marca de Escriba",
  "Marca de Hallazgo",
  "Marca de Hospitalidad",
  "Marca de Manejo",
  "Marca del Centinela",
  "Marca del Guardián (Protección)",
  "Marca del Paso",
  "Marca del Trueno (Tormenta)",
  "Marca de Sombra",
  // ── Marcas Mayores (General, nivel 4+) — Eberron ──────
  "Marca Aberrante Mayor",
  "Marca de Creación Mayor",
  "Marca de Curación Mayor",
  "Marca de Detección Mayor",
  "Marca de Elaboración Mayor",
  "Marca de Escriba Mayor",
  "Marca de Hallazgo Mayor",
  "Marca de Hospitalidad Mayor",
  "Marca de Manejo Mayor",
  "Marca del Centinela Mayor",
  "Marca del Guardián Mayor",
  "Marca del Paso Mayor",
  "Marca del Trueno Mayor",
  "Marca de Sombra Mayor",
  "Marca Dragón Potente",
  // ── Don Épico — Eberron ───────────────────────────────
  "★ Don de Siberys",
  // ── Dones Oscuros — Ravenloft: Horrors Within ─────────
  // (alternativa a dotes de Origen; concedidos por trasfondo o el DM)
  "Anatomía Aberrante",
  "Alma Resonante",
  "Susurros Reunidos",
  "Sombra Viviente",
  "Caminante de la Niebla",
  "Segunda Piel",
  "Ser Simbiótico",
  "Toque de Muerte",
  "Vigías",
  // ── Dotes generales — Arcana Unleashed ───────────────
  "Adepto de Abjuración",
  "Adepto de Conjuración",
  "Adepto de Adivinación",
  "Adepto de Encantamiento",
  "Adepto de Evocación",
  "Adepto de Nigromancia",
  "Adepto de Transmutación",
  "Familiar Elemental",
  "Familiar de Otro Mundo",
  "Familiar Sanador",
  "Familiar Belicoso",
  "Conocedor Mágico",
  "Resistente a la Magia",
  "Subterfugio de Conjuro",
];

// Descripciones mecánicas y ASI de las dotes PHB 2024 (nombres exactos del Manual del Jugador en español)
const DATOS_DOTE = {
  // ── Dotes de origen ──────────────────────────────────────────────────────
  "✦ Afortunado":          { desc: "Puntos de suerte = bon. comp. Gasta 1 para ventaja en cualquier tirada d20 o para imponer desventaja a un atacante. Recuperas tras descanso largo.", asi: null },
  "✦ Alerta":              { desc: "Competencia en iniciativa (suma bon. comp.). Intercambio de iniciativa: justo al tirar, puedes cambiar tu resultado con el de un aliado dispuesto (no si alguno está incapacitado).", asi: null },
  "✦ Atacante salvaje":    { desc: "Una vez por turno, cuando aciertes con un arma, tira dos veces el dado de daño y usa el resultado que prefieras.", asi: null },
  "✦ Duro":                { desc: "PG máx. aumentan en 2 × nivel al adquirir esta dote. A partir de entonces, +2 PG máx. cada vez que subas nivel de personaje.", asi: null },
  "✦ Fabricante":          { desc: "Competencia con 3 herramientas de artesano a elegir. Descuento del 20% en objetos no mágicos. Fabricación rápida: tras descanso largo, crea hasta 2 objetos sencillos.", asi: null },
  "✦ Habilidoso":          { desc: "Gana competencia en 3 habilidades o herramientas de tu elección. Repetible.", asi: null },
  "✦ Iniciado en la magia":{ desc: "Elige una clase lanzadora. Aprende 2 trucos y 1 conjuro de nivel 1 de esa lista. Lanzas ese conjuro una vez sin ranura/descanso largo. +1 al atributo de lanzamiento de esa clase. Repetible.", asi: { elige: 1 } },
  "✦ Matón de taberna":    { desc: "Competencia con armas improvisadas y el arma de asta (palo). +1d4 daño con armas improvisadas. En AO con arma improvisada, puedes elegir empujar 1,5 m al objetivo.", asi: null },
  "✦ Músico":              { desc: "Competencia con un instrumento musical. Canción alentadora: tras un descanso corto, los aliados que te hayan oído ganan PG temporales = bon. comp.", asi: null },
  "✦ Sanador":             { desc: "Competencia con kits de curación. Estabilizar como acción bonus. Con kit de curación: restaura 1d8 + niv. del objetivo PG (una vez por criatura por descanso corto).", asi: null },
  // ── Dotes generales ──────────────────────────────────────────────────────
  "Acechador":             { desc: "+1 a DES o INT. Visión ciega 3 m. Ocultarte sin penalización por atacar (el estado oculto no se pierde automáticamente al atacar).", asi: { elige: 1, opciones: ["des","int"] } },
  "Actor":                 { desc: "+1 a CAR. Ventaja en Engaño/Actuación al hacerte pasar por otra criatura. Puedes imitar la voz de alguien que hayas oído al menos 1 minuto.", asi: { car: 1 } },
  "Apresador":             { desc: "+1 a FUE o DES. Golpear y agarrar: cuando aciertes sin armas como parte de Atacar, puedes aplicar daño Y agarrar a la vez. Ventaja en ataques contra criaturas que agarres.", asi: { elige: 1, opciones: ["fue","des"] } },
  "Atacante a la carga":   { desc: "+1 a FUE o DES. Velocidad +3 m cuando usas Correr. Al moverte ≥3 m en línea recta y atacar, puedes intentar derribar al objetivo (TS FUE CD 8 + bon. comp. + mod. FUE).", asi: { elige: 1, opciones: ["fue","des"] } },
  "Atleta":                { desc: "+1 a FUE o DES. Levantarse cuesta solo 1,5 m de movimiento. Subir a velocidad normal. Al saltar de pie, distancia de salto +1,5 m.", asi: { elige: 1, opciones: ["fue","des"] } },
  "Azote de magos":        { desc: "+1 a FUE o DES. Cuando dañes a una criatura concentrada, tendrá desventaja en la TS de Constitución para mantener la concentración.", asi: { elige: 1, opciones: ["fue","des"] } },
  "Centinela":             { desc: "Cuando golpeas en AO, velocidad del objetivo = 0 hasta el fin de su turno. Puedes usar AO aunque use Desengancharse. AO también contra criaturas que ataquen a aliados adyacentes a ti.", asi: null },
  "Chef":                  { desc: "+1 a CON o SAB. Competencia con útiles de cocinero. Comida reconstituyente en descanso corto: aliados recuperan 1d8 PG adicionales (máx. = bon. comp. de porciones).", asi: { elige: 1, opciones: ["con","sab"] } },
  "Combatiente con dos armas":{ desc: "+1 a FUE o DES. Añades el modificador de atributo al daño del arma secundaria. Cuando uses la acción Atacar con arma ligera, puedes atacar con otra arma ligera en la mano contraria como acción adicional.", asi: { elige: 1, opciones: ["fue","des"] } },
  "Combatiente montado":   { desc: "+1 a FUE, DES o SAB. Ventaja vs. criaturas sin montura más pequeñas. Redirige ataques a tu montura hacia ti. Tu montura no hace TS de DES (si falla, 0 daño; si pasa, daño normal).", asi: { elige: 1, opciones: ["fue","des","sab"] } },
  "Duelista defensivo":    { desc: "+1 a DES. Reacción: cuando seas atacado con arma cuerpo a cuerpo empuñando un arma de filo, añade tu bon. comp. a la CA para ese ataque.", asi: { des: 1 } },
  "Entrenamiento con armas marciales":{ desc: "+1 a FUE o DES. Obtienes competencia con todas las armas marciales.", asi: { elige: 1, opciones: ["fue","des"] } },
  "Envenenador":           { desc: "Competencia con kit de envenenador. Puedes aplicar veneno como acción bonus. Inmune a los venenos que tú preparas. Crea venenos con descanso largo.", asi: null },
  "Experto en ballestas":  { desc: "+1 a DES. Sin penalización por carga de ballesta de mano (sin manos libres). Sin desventaja a corta distancia. Ataque bonus con ballesta de mano al usar la acción Atacar.", asi: { des: 1 } },
  "Experto en habilidades":{ desc: "+1 a un atributo. Gana competencia en 1 habilidad. Gana experiencia en otra habilidad con competencia (doble bon. comp.).", asi: { elige: 1 } },
  "Influencia feérica":    { desc: "+1 a INT, SAB o CAR. 1/descanso largo: lanzar Encanto de Persona o Adormecer sin ranura de conjuro (CD = 8 + bon. comp. + mod. del atributo elegido).", asi: { elige: 1 } },
  "Influencia sombría":    { desc: "+1 a INT, SAB o CAR. 1/descanso largo: lanzar Pasos de Sombra o Armadura de Agathys sin ranura de conjuro (CD = 8 + bon. comp. + mod. del atributo elegido).", asi: { elige: 1 } },
  "Lanzador en combate":   { desc: "+1 a INT, SAB o CAR. Ventaja en TS de CON para mantener concentración. Puedes lanzar conjuros aunque estés agarrado. Puedes lanzar un truco como AO cuando un enemigo entra o sale de tu alcance.", asi: { elige: 1 } },
  "Lanzador preciso":      { desc: "+1 a INT, SAB o CAR. Rango de ataques de conjuro ×2. Ignoras cobertura media y tres cuartos. 1/descanso largo: repite un ataque de conjuro fallido.", asi: { elige: 1 } },
  "Lanzador ritual":       { desc: "Aprende 2 conjuros de ritual de cualquier lista de conjuros. Puedes lanzarlos como ritual. Añades los conjuros al aprender nuevos rituales. Usa INT o SAB como atributo.", asi: null },
  "Líder inspirador":      { desc: "+1 a SAB o CAR. 1/descanso corto: discurso de 1 minuto otorga PG temporales = bon. comp. + mod. CAR a aliados (máx. 6 criaturas) que puedan oírte y entenderte.", asi: { elige: 1, opciones: ["sab","car"] } },
  "Ligeramente acorazado": { desc: "+1 a FUE o DES. Obtienes competencia con armaduras ligeras y escudos.", asi: { elige: 1, opciones: ["fue","des"] } },
  "Maestro de armas":      { desc: "+1 a FUE o DES. Puedes usar la propiedad de maestría de un arma sencilla o marcial con la que tengas competencia. Puedes cambiar el arma elegida tras descanso largo.", asi: { elige: 1, opciones: ["fue","des"] } },
  "Maestro en armaduras medias":{ desc: "+1 a DES o FUE. Requisito: competencia con armaduras medias. Con armadura media puedes añadir hasta +3 de tu mod. DES a la CA (en vez de hasta +2).", asi: { elige: 1, opciones: ["des","fue"] } },
  "Maestro en armaduras pesadas":{ desc: "+1 a CON o FUE. Requisito: competencia con armaduras pesadas. Con armadura pesada, el daño contundente, de filo y perforante se reduce en tu bon. comp.", asi: { elige: 1, opciones: ["con","fue"] } },
  "Maestro en armas de asta":{ desc: "+1 a FUE o DES. Requisito: FUE o DES 13+. AO cuando una criatura entra en tu alcance. Ataque bonus con el extremo del asta (1d4 daño de golpe + mod. FUE o DES).", asi: { elige: 1, opciones: ["fue","des"] } },
  "Maestro en armas pesadas":{ desc: "+1 a FUE. Requisito: FUE 13+. Con armas pesadas, causas daño extra = bon. comp. Avasallar: inmediatamente después de reducir a 0 PG, mueve hasta 4,5 m y ataca de nuevo.", asi: { fue: 1 } },
  "Maestro en escudos":    { desc: "+1 a FUE. Requisito: competencia con escudos. Golpe con escudo tras acertar cuerpo a cuerpo: TS FUE del objetivo o es empujado 1,5 m. Reacción: ventaja en TS de DES si llevas escudo.", asi: { fue: 1 } },
  "Mejora de característica":{ desc: "+2 a una puntuación de característica, o +1 a dos puntuaciones diferentes (máximo 20). Repetible.", asi: { elige: 2 } },
  "Mente aguda":           { desc: "+1 a INT. Requisito: INT 13+. Competencia (o experiencia si ya tienes) en Arcanos, Historia, Investigación, Naturaleza o Religión. 1/descanso largo: lanza Detectar Magia sin ranura.", asi: { int: 1 } },
  "Moderadamente acorazado":{ desc: "+1 a FUE o DES. Requisito: competencia con armaduras ligeras. Obtienes competencia con armaduras medias.", asi: { elige: 1, opciones: ["fue","des"] } },
  "Muy acorazado":         { desc: "+1 a CON o FUE. Requisito: competencia con armaduras medias. Obtienes competencia con armaduras pesadas.", asi: { elige: 1, opciones: ["con","fue"] } },
  "Observador":            { desc: "+1 a INT o SAB. Requisito: INT o SAB 13+. Lees los labios de criaturas que hablen un idioma conocido. Percepción pasiva e Investigación pasiva +5.", asi: { elige: 1, opciones: ["int","sab"] } },
  "Perforador":            { desc: "+1 a FUE o DES. Con daño perforante: repite uno de los dados de daño y usa el resultado mayor. Crítico: añade un dado de daño extra.", asi: { elige: 1, opciones: ["fue","des"] } },
  "Rebanador":             { desc: "+1 a FUE o DES. Con daño de filo: el objetivo pierde 1d6 PG extra al inicio de su siguiente turno. Crítico: el daño del dado de daño es el máximo posible.", asi: { elige: 1, opciones: ["fue","des"] } },
  "Resiliente":            { desc: "+1 a un atributo. Ganas competencia en las tiradas de salvación del atributo elegido.", asi: { elige: 1 } },
  "Resistente":            { desc: "+1 a CON. Ventaja en las tiradas de salvación contra muerte.", asi: { con: 1 } },
  "Telepático":            { desc: "+1 a INT, SAB o CAR. Comunicación telepática hasta 18 m con una criatura que conozcas. Leer superficie de pensamientos (acción): como Detectar Pensamientos sin ranura 1/DL.", asi: { elige: 1 } },
  "Telequinético":         { desc: "+1 a INT, SAB o CAR. Empuje mental (bonus): mueve 1,5 m a una criatura (TS FUE CD = 8 + bon. comp. + mod. del atributo). Movimiento telequinético: mueve objetos hasta 9 m (acción de magia).", asi: { elige: 1 } },
  "Tirador de primera":    { desc: "+1 a DES. Sin penalización por distancia larga. Ignoras cobertura media y tres cuartos. −5 a la tirada de ataque, +10 al daño con armas a distancia.", asi: { des: 1 } },
  "Triturador":            { desc: "+1 a FUE o CON. Con daño contundente: mueves al objetivo 1,5 m. Crítico: el objetivo queda Derribado.", asi: { elige: 1, opciones: ["fue","con"] } },
  "Veloz":                 { desc: "+1 a DES. Tu velocidad aumenta 9 m. Las oportunidades de ataque contra ti tienen desventaja.", asi: { des: 1 } },
  "Versado en un elemento":{ desc: "Elige un tipo de daño de energía (ácido, frío, fuego, rayo o trueno). Tus conjuros de ese tipo ignoran resistencia. 1/DL: mínimo 1 por dado de daño de ese tipo. Repetible (diferente elemento).", asi: null },
  // ── Estilos de combate ───────────────────────────────────────────────────
  "Combate con armas a dos manos":{ desc: "Dote de estilo de combate. Al sacar 1 o 2 en un dado de daño con arma versátil (a dos manos) o arma a dos manos, repite ese dado (usa el nuevo resultado).", asi: null },
  "Combate con armas arrojadizas":{ desc: "Dote de estilo de combate. Puedes sacar un arma con la propiedad Arrojadiza como parte del ataque. +2 a tiradas de daño con armas arrojadizas.", asi: null },
  "Combate con dos armas": { desc: "Dote de estilo de combate. Cuando luches con dos armas, añades el modificador de atributo al daño del arma secundaria.", asi: null },
  "Combate sin armas":     { desc: "Dote de estilo de combate. Golpes sin armas: 1d6 + mod. FUE de daño (1d8 si las dos manos están libres). Al inicio de tu turno puedes infligir 1d4 de daño a una criatura que estés aferrando.", asi: null },
  "Defensa":               { desc: "Dote de estilo de combate. +1 a la CA mientras lleves puesta una armadura.", asi: null },
  "Duelo":                 { desc: "Dote de estilo de combate. +2 a tiradas de daño cuando empuñas un arma de cuerpo a cuerpo en una mano y ningún otro arma.", asi: null },
  "Intercepción":          { desc: "Dote de estilo de combate. Reacción: cuando una criatura que no seas tú sea golpeada por un ataque, reduce el daño en 1d10 + bon. comp. (debes estar a 1,5 m del objetivo).", asi: null },
  "Lucha a ciegas":        { desc: "Dote de estilo de combate. Tienes visión ciega hasta 3 m. Puedes ver a criaturas invisibles en ese radio a menos que estén ocultas con éxito.", asi: null },
  "Protección":            { desc: "Dote de estilo de combate. Reacción: cuando una criatura ataque a un aliado adyacente a ti, si llevas escudo puedes imponerle desventaja en esa tirada de ataque.", asi: null },
  "Tiro con arco":         { desc: "Dote de estilo de combate. +2 a las tiradas de ataque con armas a distancia.", asi: null },
  // ── Dones épicos (nivel 19+) ─────────────────────────────────────────────
  "★ Don de la fortaleza": { desc: "+1 a CON. PG máx. aumentan en bon. comp. Acumulable: cada vez que adquieras este don, PG máx. aumentan de nuevo.", asi: { con: 1 } },
  "★ Don de la habilidad": { desc: "+1 a un atributo. Gana experiencia (doble bon. comp.) en 2 habilidades con las que ya tengas competencia.", asi: { elige: 1 } },
  "★ Don de la pericia en combate":{ desc: "+1 a FUE. No puedes ser Asustado. Una vez por turno, cuando aciertes con un arma, causas 1d6 de daño extra del mismo tipo.", asi: { fue: 1 } },
  "★ Don de la recuperación":{ desc: "+1 a CON. 1/descanso largo: como acción bonus, recupera PG = bon. comp. × 1d6 + mod. CON.", asi: { con: 1 } },
  "★ Don de la resistencia a energías":{ desc: "+1 a INT, SAB o CAR. Resistencia a un tipo de daño de energía elegido. Puedes cambiar el tipo con cada descanso largo.", asi: { elige: 1 } },
  "★ Don de la velocidad":  { desc: "+1 a DES. +9 m de velocidad. Las oportunidades de ataque contra ti tienen desventaja.", asi: { des: 1 } },
  "★ Don de la visión verdadera":{ desc: "+1 a INT, SAB o CAR. Tienes visión verdadera hasta 6 m (ves formas reales, ilusiones, objetos etéreos y en oscuridad mágica).", asi: { elige: 1 } },
  "★ Don del ataque imparable":{ desc: "+1 a FUE o DES. Tus ataques de arma ignoran la resistencia al tipo de daño que causen.", asi: { elige: 1, opciones: ["fue","des"] } },
  "★ Don del destino":      { desc: "+1 a INT, SAB o CAR. Reacción: 1/descanso largo, fuerza a una criatura que puedas ver a repetir una tirada con d20 y usar el nuevo resultado.", asi: { elige: 1 } },
  "★ Don del espíritu de la noche":{ desc: "+1 a INT, SAB o CAR. Visión en la oscuridad 24 m. Acción bonus: te vuelves invisible hasta el inicio de tu siguiente turno (solo en penumbra u oscuridad).", asi: { elige: 1 } },
  "★ Don del recuerdo de conjuros":{ desc: "+1 a INT, SAB o CAR. 1/descanso largo: recupera una ranura de conjuro de nivel 5 o inferior.", asi: { elige: 1 } },
  "★ Don del viaje dimensional":{ desc: "+1 a INT, SAB o CAR. Acción bonus: teletranspórtate hasta 9 m a un espacio que puedas ver. Puedes llevar a un aliado voluntario de tu tamaño o menor.", asi: { elige: 1 } },
  // ── Dotes de origen — Héroes de Faerún ──────────────────────────────────────
  "✦ Agente de la Alianza de los Lores": { desc: "Golpe inspirador: 1/turno, en crítico contra una criatura puedes otorgar inspiración heroica a un aliado a 9 m que te vea u oiga. Reafirmar el honor: cuando un enemigo dañe a un aliado a 1,5 m de ti, tienes ventaja en tu siguiente ataque contra ese enemigo antes de tu siguiente turno.", asi: null },
  "✦ Agente de los Arpistas":   { desc: "Conoces la jerga de ladrones. Competencia con un instrumento musical. Melodía distractora: cuando uses Ayudar en una tirada de ataque, el enemigo al que distraigas puede estar a 9 m (no solo 1,5 m) siempre que pueda verte u oírte.", asi: null },
  "✦ Aprendiz del Dragón Púrpura": { desc: "Súplica: competencia en Interpretación, Perspicacia o Persuasión (elige una). Llamada a las armas: al tirar iniciativa sin el estado de incapacitado, puedes dar inspiración heroica a un número de criaturas a 9 m igual a tu bon. comp. Recarga en descanso largo.", asi: null },
  "✦ Chispa del fuego mágico":  { desc: "Absorción de magia: 1/turno, cuando recibas daño de conjuro o efecto mágico, reduce el daño en 1d4. Llama del fuego mágico: aprendes el truco llama sagrada (aptitud a elegir). Puedes lanzarlo como acción adicional un número de veces = bon. comp. (recuperas tras descanso largo).", asi: null },
  "✦ Iniciado del Culto del Dragón": { desc: "Lengua del dragón: conoces dracónico (o un idioma extra si ya lo sabías). Terror del dragón: acción de magia, atemoriza una criatura a 9 m (TS SAB CD 8 + bon. comp. + mod. SAB o queda asustada hasta el fin de tu siguiente turno; inmune 24 h si supera). Inspirado por el miedo: cuando asustes a una criatura, ganas inspiración heroica si no la tenías; 1/descanso corto o largo.", asi: null },
  "✦ Novato del Guantelete":    { desc: "Mantener firme: reacción para impedir que un aliado a 1,5 m sea empujado o atraído. Vigilante: cuando prepares una acción, la siguiente tirada de ataque contra ti tiene desventaja hasta el inicio de tu siguiente turno.", asi: null },
  "✦ Principiante del Enclave Esmeralda": { desc: "Hablar con los animales siempre preparado; puedes lanzarlo con cualquier espacio; cuando se lanza como ritual dura 8 horas. Relevo: cuando uses la acción de Ayudar, puedes intercambiar posición con un aliado voluntario a 1,5 m sin provocar ataques de oportunidad.", asi: null },
  "✦ Rufián de los Zhentarim":  { desc: "Punto vulnerable: al tirar daño en un ataque de oportunidad, tira dos veces los dados y usa el mayor. La familia es lo primero: si tienes inspiración heroica al tirar iniciativa, puedes gastarla para que todos tus aliados (y tú) tengáis ventaja en esa tirada.", asi: null },
  // ── Dotes generales — Héroes de Faerún ──────────────────────────────────────
  "Colaboración de los Arpistas": { desc: "+1 a DES o CAR. Req.: dote Agente de los Arpistas. Juego de palabras mordaz: cuando uses Ayudar en un ataque contra un enemigo, ese enemigo también tiene desventaja en la primera TS que haga hasta el inicio de tu siguiente turno. Fuerza de voluntad inspiradora: cuando superes una TS para librarte de asustado o paralizado, puedes libertar de inmediato a un aliado a 9 m con el mismo estado.", asi: { elige: 1, opciones: ["des","car"] } },
  "Comandante del Dragón Púrpura": { desc: "+1 a FUE o DES. Req.: dote Aprendiz del Dragón Púrpura o competencia con armas marciales. Alentar a aliado: acción adicional, otorga PG temporales = 2d6 + mod. aumento a un aliado a 9 m; usos = bon. comp. (DL). Último esfuerzo: ventaja en ataques mientras estés maltrecho.", asi: { elige: 1, opciones: ["fue","des"] } },
  "Conjurador de frío":          { desc: "+1 a INT, SAB o CAR. Aprende rayo de escarcha (u otro truco de mago si ya lo tenías); aptitud = atributo aumentado. Congelar: 1/turno, cuando aciertes y causes daño de frío, el objetivo resta 1d4 a la siguiente TS que haga antes del fin de tu siguiente turno.", asi: { elige: 1 } },
  "Determinación señorial":      { desc: "+1 a FUE o CAR. Req.: dote Agente de la Alianza de los Lores. Adalid: acción adicional, hasta 3 criaturas a 18 m que te vean pueden levantarse (poner fin al estado de derribado) como reacción. Además, se refuerzan durante 1 min: inmunes a ser poseídas, asustadas o hechizadas (o con ventaja en nuevas TS si ya lo estaban). 1/DL.", asi: { elige: 1, opciones: ["fue","car"] } },
  "Dracoseñalado":               { desc: "+1 a CON o CAR. Req.: dote Iniciado del Culto del Dragón. Resistencia al daño: elige ácido, frío, fuego, rayo o veneno; tienes resistencia a ese tipo. Poder temible: cuando causes daño como parte de Atacar o una acción de magia, puedes usar Terror del dragón como acción adicional ese turno.", asi: { elige: 1, opciones: ["con","car"] } },
  "Embaucador feérico":          { desc: "+1 a DES o CAR. Trotador de senderos feéricos: al Destrabarte, el terreno difícil no cuesta movimiento extra el resto del turno. Golpe desquiciador: al acertar un ataque, el objetivo falla TS SAB (CD 8 + bon. comp. + mod. atributo) o tiene desventaja en TS hasta el fin de tu siguiente turno; usos = bon. comp. (DL).", asi: { elige: 1, opciones: ["des","car"] } },
  "Justicia callejera":          { desc: "+1 a FUE o DES. Llave de cabeza: tus aliados tienen ventaja en ataques contra una criatura a la que estés agarrando. Nudo firme: al atar a una criatura con cadena, cuerda o esposas, suma bon. comp. a la CD para liberarse. Discurso contundente: la actitud hostil de una criatura no impone desventaja en tus pruebas de CAR (Intimidación) contra ella.", asi: { elige: 1, opciones: ["fue","des"] } },
  "Magia de genio":              { desc: "+1 a INT, SAB o CAR. Magia deseada: acción de magia, lanza un conjuro de nivel 1 de la lista de hechicero con tiempo de lanzamiento de 1 acción (1/DL); aptitud = atributo aumentado. A nivel 11 se lanza como nivel 2; a nivel 17 como nivel 3.", asi: { elige: 1 } },
  "Magia del Enclave":           { desc: "+1 a INT, SAB o CAR. Req.: dote Principiante del Enclave Esmeralda. Amigo de los animales: ventaja en pruebas para influir en bestias. Dos almas, una mente: sentidos de la bestia siempre preparado; puedes lanzarlo 1/DL sin ranura y sin concentración; con ranura sí requiere concentración.", asi: { elige: 1 } },
  "Resistencia de la Orden":     { desc: "+1 a FUE, SAB o CAR. Req.: dote Novato del Guantelete. Levantarse: ponerse en pie cuesta solo 1,5 m de movimiento. La unión hace la fuerza: si estás a 1,5 m de un aliado no incapacitado, ambos tenéis ventaja en TS de FUE.", asi: { elige: 1, opciones: ["fue","sab","car"] } },
  "Tácticas de los Zhentarim":   { desc: "+1 a DES o CAR. Req.: dote Rufián de los Zhentarim. Tomar represalias: inmediatamente después de que una criatura a 1,5 m te acierte en cuerpo a cuerpo, puedes hacer un ataque de oportunidad contra ella. Mercenario versátil: tras un descanso largo, elige una habilidad con competencia; tienes pericia en ella hasta el siguiente descanso largo.", asi: { elige: 1, opciones: ["des","car"] } },
  "Tocado por los mythales":     { desc: "+1 a INT, SAB o CAR. Protección de los mythales: reacción cuando te acierte un ataque de conjuro o falles una TS contra un conjuro; tira 1d20 en la tabla de Magia de los mythales para crear un efecto mágico (CD = 8 + bon. comp. + mod. atributo). Usos = bon. comp. (DL).", asi: { elige: 1 } },
  "Versado en el fuego mágico":  { desc: "+1 a INT, SAB o CAR. Req.: dote Chispa del fuego mágico o rasgo Magia del pacto. Fuego mágico avivado: 1/turno, cuando causes daño radiante con un conjuro, gasta hasta 2 dados de golpe, tíralos y súmalos al daño. Fuego mágico abrasador: tus tiradas de daño radiante ignoran resistencia a ese daño.", asi: { elige: 1 } },
  // ── Dones épicos — Héroes de Faerún ─────────────────────────────────────────
  "★ Don de la absorción de almas": { desc: "+1 a una característica (máx. 30). Resistencia sepulcral: resistencia al daño de frío y necrótico. Extraer vida: reacción cuando un enemigo a 36 m se reduce a 0 PG; recuperas 50 PG. 1/descanso corto o largo.", asi: { elige: 1 } },
  "★ Don de la comunicación":    { desc: "+1 a INT, SAB o CAR (máx. 30). Orador astuto: sin desventaja en pruebas para influir en criaturas hostiles. Intérprete talentoso: entiendes el significado literal de cualquier idioma. Comunicación mental: telepatía hasta 36 m.", asi: { elige: 1 } },
  "★ Don de la furia de la tormenta": { desc: "+1 a INT, SAB o CAR (máx. 30). Req.: rasgo Lanzamiento de conjuros o Magia del pacto. Ojo de la tormenta: resistencia al daño de rayo y trueno; inmunidad si estás maltrecho. Fuerza de la tormenta: las criaturas tienen desventaja en TS contra tus conjuros de rayo o trueno.", asi: { elige: 1 } },
  "★ Don de la resistencia desesperada": { desc: "+1 a FUE o CON (máx. 30). Defensa del cuerpo y la mente: mientras estés maltrecho, resistencia a todos los tipos de daño excepto fuerza.", asi: { elige: 1, opciones: ["fue","con"] } },
  "★ Don de la salud plena":     { desc: "+1 a una característica (máx. 30). Salud aumentada: cuando obtengas PG temporales, la cantidad aumenta en 5. Recuperación superior: cuando gastes dados de golpe para recuperar PG, puedes usar el máximo de cada dado en lugar de tirar.", asi: { elige: 1 } },
  "★ Don de las formas fluidas": { desc: "+1 a INT, SAB o CAR (máx. 30). Cambiaformas: acción de magia, adoptas la forma de una bestia, humanoide o monstruosidad de VD ≤10 durante 1 hora; obtienes sus PG temporales. 1/DL. Transformación resistente: +20 a los PG temporales al cambiar de forma.", asi: { elige: 1 } },
  "★ Don del derramamiento de sangre": { desc: "+1 a una característica (máx. 30). Fortuna del asesino: cuando los PG de un enemigo visible se reduzcan a 0, tienes ventaja en tu siguiente ataque antes del final de tu siguiente turno. Poder doloroso: 1/turno, al atacar mientras estés maltrecho, causa daño adicional = bon. comp. del mismo tipo.", asi: { elige: 1 } },
  "★ Don del dominio de los venenos": { desc: "+1 a una característica (máx. 30). Antitóxico: inmunidad al daño de veneno y al estado de envenenado. Envenenador perfecto: 1/turno, cuando tires daño de veneno de tu ataque, conjuro o rasgo, puedes usar el máximo de cada dado.", asi: { elige: 1 } },
  "★ Don del favor de la fortuna": { desc: "+1 a una característica (máx. 30). Repetir tiradas de salvación: cuando falles una TS, puedes repetirla y usar el nuevo resultado. 1/hasta el inicio de tu siguiente turno.", asi: { elige: 1 } },
  "★ Don del fulgor exquisito":  { desc: "+1 a una característica (máx. 30). Descanso eterno: las criaturas a las que reduzcas a 0 PG no pueden convertirse en muertos vivientes. Fulgor poderoso: cuando tires daño radiante, puedes usar el máximo de cada dado; 1/DL.", asi: { elige: 1 } },
  "★ Don del jolgorio":          { desc: "+1 a INT, SAB o CAR (máx. 30). A bailar: baile irresistible de Otto siempre preparado; puedes lanzarlo 1/DL sin ranura ni componentes, sin perder la concentración por daño. Mientras la criatura esté hechizada, no puede lanzar conjuros con componentes verbales y, si puede cantar, canta tonterías.", asi: { elige: 1 } },
  "★ Don del sol brillante":     { desc: "+1 a CON, SAB o CAR (máx. 30). Presencia diurna: acción adicional, irradia emanación de 9 m de luz solar que disipa conjuros de oscuridad; dura hasta que la disipes, mueras o quedes incapacitado. Resplandor fortaleciente: mientras activa, al inicio de cada turno tú y los aliados visibles en el área obtienen 10 PG temporales.", asi: { elige: 1, opciones: ["con","sab","car"] } },
  "★ Don del terror":            { desc: "+1 a CAR (máx. 30). Intrepidez: inmunidad al estado de asustado. ¡Huid, mentecatos!: reacción cuando una criatura asustada comience su turno a 18 m de ti: si la ves y no está tras cobertura total, TS SAB (CD 8 + bon. comp. + mod. CAR) o emplea su turno en huir de ti; 1/descanso corto o largo. Intimidante: competencia y pericia en Intimidación.", asi: { car: 1 } },
};

// Datos mecánicos de los trasfondos PHB 2024 (español)
// asi: array de 3 características — el jugador reparte +2/+1/0 (sugerido) o +1/+1/+1 (tres1)
// Personalizado: el jugador elige libremente las 3 características y la dote de origen
const DATOS_TRASFONDO = {
  "Acólito":     { asi: ["int","sab","car"], habilidades: ["perspicacia","religion"],       herramienta: "Suministros de calígrafo",         dote: "✦ Iniciado en la magia" },
  "Animador":    { asi: ["fue","des","car"], habilidades: ["acrobacia","actuacion"],         herramienta: "Instrumento musical (elige)",       dote: "✦ Músico" },
  "Artesano":    { asi: ["fue","des","int"], habilidades: ["investigacion","persuasion"],    herramienta: "Herramientas de artesano (elige)",  dote: "✦ Fabricante" },
  "Campesino":   { asi: ["fue","con","sab"], habilidades: ["trato_animales","naturaleza"],  herramienta: "Herramientas de carpintero",        dote: "✦ Duro" },
  "Charlatán":   { asi: ["des","con","car"], habilidades: ["engano","juego_manos"],          herramienta: "Kit de disfraz",                   dote: "✦ Habilidoso" },
  "Comerciante": { asi: ["con","int","car"], habilidades: ["perspicacia","persuasion"],      herramienta: "Herramientas de navegante",         dote: "✦ Afortunado" },
  "Criminal":    { asi: ["des","con","int"], habilidades: ["juego_manos","sigilo"],          herramienta: "Herramientas de ladrón",            dote: "✦ Alerta" },
  "Ermitaño":    { asi: ["con","sab","car"], habilidades: ["medicina","religion"],           herramienta: "Herramientas de herbolario",        dote: "✦ Sanador" },
  "Erudito":     { asi: ["con","int","sab"], habilidades: ["arcanos","historia"],            herramienta: "Suministros de calígrafo",          dote: "✦ Iniciado en la magia" },
  "Escriba":     { asi: ["des","int","sab"], habilidades: ["investigacion","percepcion"],    herramienta: "Suministros de calígrafo",          dote: "✦ Habilidoso" },
  "Guardia":     { asi: ["fue","int","sab"], habilidades: ["atletismo","percepcion"],        herramienta: "Juego de mesa (elige)",             dote: "✦ Alerta" },
  "Guía":        { asi: ["des","con","sab"], habilidades: ["sigilo","supervivencia"],        herramienta: "Herramientas de cartógrafo",        dote: "✦ Iniciado en la magia" },
  "Marinero":    { asi: ["fue","des","sab"], habilidades: ["acrobacia","percepcion"],        herramienta: "Herramientas de navegante",         dote: "✦ Matón de taberna" },
  "Noble":       { asi: ["fue","int","car"], habilidades: ["historia","persuasion"],         herramienta: "Juego de mesa (elige)",             dote: "✦ Habilidoso" },
  "Soldado":     { asi: ["fue","des","con"], habilidades: ["atletismo","intimidacion"],      herramienta: "Juego de mesa (elige)",             dote: "✦ Atacante salvaje" },
  "Vagabundo":   { asi: ["des","sab","car"], habilidades: ["perspicacia","sigilo"],          herramienta: "Herramientas de ladrón",            dote: "✦ Afortunado" },
  // ── Ravenloft: Horrors Within ──────────────────────────────────────────────────
  // Ravenloft: Mist Wanderer y Spirit Medium solo ofrecen Dones Oscuros; Haunted One e Investigator permiten elegir entre dote de origen o Don Oscuro
  "El Acosado":           { asi: ["con","sab","car"], habilidades: ["arcanos","supervivencia"],     herramienta: "Juego de mesa (elige)",             dote: "✦ Superviviente / Don Oscuro" },
  "Errante de la Niebla": { asi: ["des","con","sab"], habilidades: ["supervivencia","sigilo"],      herramienta: "Herramientas de artesano (elige)",  dote: "Caminante de la Niebla (Don Oscuro, recomendado)" },
  "Investigador (Ravenloft)": { asi: ["int","sab","car"], habilidades: ["perspicacia","investigacion"], herramienta: "Kit de disfraz",               dote: "✦ Ojo Agudo / Don Oscuro" },
  "Médium Espiritual":    { asi: ["con","int","sab"], habilidades: ["perspicacia","religion"],      herramienta: "Juego de mesa (elige)",             dote: "Susurros Reunidos (Don Oscuro, recomendado)" },
  // ── Eberron: La Forja del Artífice ────────────────────────────────────────────
  // Los trasfondos de Casa Heredera otorgan dotes de Dragonmark en lugar de dotes de origen
  "Heredero Aberrante":   { asi: ["fue","con","car"], habilidades: ["historia","intimidacion"],     herramienta: "Kit de disfraz",                   dote: "Marca de Dragón Aberrante" },
  "Arqueólogo":           { asi: ["des","int","sab"], habilidades: ["historia","supervivencia"],    herramienta: "Herramientas de cartógrafo",        dote: "✦ Habilidoso" },
  "Agente de la Casa":    { asi: ["fue","int","car"], habilidades: ["investigacion","persuasion"],  herramienta: "Herramientas de artesano (elige)",  dote: "✦ Afortunado" },
  "Inquisitivo":          { asi: ["con","int","car"], habilidades: ["perspicacia","investigacion"], herramienta: "Herramientas de ladrón",            dote: "✦ Alerta" },
  "Heredero de la Casa Cannith":   { asi: ["fue","des","int"], habilidades: ["investigacion","juego_manos"], herramienta: "Herramientas de artesano (elige)", dote: "Marca de Creación" },
  "Heredero de la Casa Deneith":   { asi: ["fue","con","sab"], habilidades: ["perspicacia","percepcion"],   herramienta: "Juego de mesa (elige)",           dote: "Marca del Centinela" },
  "Heredero de la Casa Ghallanda": { asi: ["des","sab","car"], habilidades: ["perspicacia","persuasion"],   herramienta: "Herramientas de cocinero",        dote: "Marca de la Hospitalidad" },
  "Heredero de la Casa Jorasco":   { asi: ["con","sab","car"], habilidades: ["medicina","naturaleza"],      herramienta: "Herramientas de herbolario",      dote: "Marca de la Curación" },
  "Heredero de la Casa Kundarak":  { asi: ["fue","con","int"], habilidades: ["atletismo","percepcion"],     herramienta: "Herramientas de ladrón",          dote: "Marca del Guardián" },
  "Heredero de la Casa Lyrandar":  { asi: ["des","con","car"], habilidades: ["acrobacia","percepcion"],     herramienta: "Herramientas de navegante",       dote: "Marca de la Tormenta" },
  "Heredero de la Casa Medani":    { asi: ["des","int","sab"], habilidades: ["perspicacia","investigacion"],  herramienta: "Kit de disfraz",              dote: "Marca de la Detección" },
  "Heredero de la Casa Orien":     { asi: ["fue","des","con"], habilidades: ["atletismo","acrobacia"],      herramienta: "Herramientas de vehículos (terrestres)", dote: "Marca del Paso" },
  "Heredero de la Casa Phiarlan":  { asi: ["des","sab","car"], habilidades: ["actuacion","engano"],         herramienta: "Instrumento musical (elige)",     dote: "Marca de la Sombra" },
  "Heredero de la Casa Sivis":     { asi: ["des","int","car"], habilidades: ["historia","persuasion"],      herramienta: "Suministros de calígrafo",        dote: "Marca del Centinela" },
  "Heredero de la Casa Tharashk":  { asi: ["fue","des","sab"], habilidades: ["investigacion","supervivencia"], herramienta: "Herramientas de navegante",   dote: "Marca del Hallazgo" },
  "Heredero de la Casa Thuranni":  { asi: ["des","int","car"], habilidades: ["actuacion","sigilo"],         herramienta: "Kit de veneno",                  dote: "Marca de la Sombra" },
  "Heredero de la Casa Vadalis":   { asi: ["fue","sab","car"], habilidades: ["trato_animales","naturaleza"],  herramienta: "Herramientas de herbolario",  dote: "Marca del Manejo" },
  // ── Arcana Unleashed ──────────────────────────────────────────────────────────
  "Agente del Noveno Plumón":         { asi: ["des","int","car"], habilidades: ["arcanos","juego_manos"],     herramienta: "Herramientas de ladrón",          dote: "✦ Infiltrador Arcano" },
  "Aprendiz Vidente":                 { asi: ["int","sab","car"], habilidades: ["historia","perspicacia"],    herramienta: "Herramientas de navegante",        dote: "✦ Presagios Arcanos" },
  "Cazador de Tormentas del Crisol":  { asi: ["fue","con","int"], habilidades: ["atletismo","naturaleza"],    herramienta: "Herramientas de soplador de vidrio", dote: "✦ Sobrecarga Arcana" },
  "Entrenador de Familiar":           { asi: ["con","int","sab"], habilidades: ["trato_animales","arcanos"],  herramienta: "Juego de mesa (elige)",            dote: "✦ Amigo Familiar" },
  "Espía del Conclave Enjoyado":      { asi: ["des","sab","car"], habilidades: ["engano","percepcion"],       herramienta: "Kit de disfraz",                   dote: "✦ Elocuencia Arcana" },
  "Experimento del Alba Cósmica":     { asi: ["fue","des","con"], habilidades: ["atletismo","supervivencia"], herramienta: "Herramientas de artesano (elige)", dote: "✦ Anatomía Transmutada" },
  "Iniciado de los Tejedores del Horizonte": { asi: ["des","con","sab"], habilidades: ["acrobacia","supervivencia"], herramienta: "Herramientas de tejedor",  dote: "✦ Saltador de Portal" },
  "Pupilo de las Manos Protectoras":  { asi: ["con","sab","car"], habilidades: ["perspicacia","medicina"],    herramienta: "Útiles de cocinero",               dote: "✦ Salvaguarda Arcana" },
  "Recluta del Pacto de la Tumba":    { asi: ["fue","int","sab"], habilidades: ["historia","medicina"],       herramienta: "Herramientas de herbolario",        dote: "✦ Sepulturero Arcano" },
  "Troupero del Circo Fantasmático":  { asi: ["des","con","car"], habilidades: ["engano","actuacion"],        herramienta: "Kit de disfraz",                   dote: "✦ Artista Arcano" },
  // ── Héroes de Faerún ──────────────────────────────────────────────────────────
  "Arpista":                       { asi: ["des","int","car"], habilidades: ["actuacion","juego_manos"],      herramienta: "útiles para disfrazarse",              dote: "✦ Agente de los Arpistas" },
  "Caballero del Guantelete":      { asi: ["fue","int","sab"], habilidades: ["atletismo","medicina"],         herramienta: "herramientas de herrero",               dote: "✦ Novato del Guantelete" },
  "Cuidador del Enclave Esmeralda":{ asi: ["con","int","sab"], habilidades: ["naturaleza","supervivencia"],   herramienta: "útiles de herborista",                 dote: "✦ Principiante del Enclave Esmeralda" },
  "Errante Rashemí":               { asi: ["fue","con","car"], habilidades: ["intimidacion","percepcion"],    herramienta: "herramientas de cartógrafo",            dote: "✦ Duro" },
  "Escudero del Dragón Púrpura":   { asi: ["fue","sab","car"], habilidades: ["perspicacia","trato_animales"], herramienta: "herramientas de navegante",             dote: "✦ Aprendiz del Dragón Púrpura" },
  "Expulsado de los Amos de las Sombras": { asi: ["des","int","car"], habilidades: ["acrobacia","sigilo"],   herramienta: "herramientas de ladrón",                dote: "✦ Atacante salvaje" },
  "Filibustero Chondathano":       { asi: ["fue","des","sab"], habilidades: ["atletismo","juego_manos"],      herramienta: "herramientas de tejedor",               dote: "✦ Habilidoso" },
  "Guardián de los Mythales":      { asi: ["int","sab","car"], habilidades: ["arcanos","historia"],           herramienta: "herramientas de joyero",                dote: "✦ Fabricante" },
  "Iniciado en el Fuego Mágico":   { asi: ["con","int","car"], habilidades: ["arcanos","percepcion"],         herramienta: "Juego de mesa (elige)",                 dote: "✦ Chispa del fuego mágico" },
  "Ladrón de Tumbas Mulhorandín":  { asi: ["des","con","int"], habilidades: ["investigacion","religion"],     herramienta: "herramientas de albañil",               dote: "✦ Afortunado" },
  "Mercenario de los Zhentarim":   { asi: ["fue","des","car"], habilidades: ["intimidacion","percepcion"],    herramienta: "útiles para falsificar",                dote: "✦ Rufián de los Zhentarim" },
  "Mercenario del Puño Ardiente":  { asi: ["fue","con","car"], habilidades: ["intimidacion","percepcion"],    herramienta: "herramientas de herrero",               dote: "✦ Duro" },
  "Morador de Tierras sin Magia":  { asi: ["fue","con","sab"], habilidades: ["medicina","supervivencia"],     herramienta: "herramientas de curtidor",              dote: "✦ Sanador" },
  "Peregrino de los Manantiales Lunares": { asi: ["con","sab","car"], habilidades: ["naturaleza","actuacion"], herramienta: "suministros de pintor",               dote: "✦ Iniciado en la magia" },
  "Pescador en Hielo":             { asi: ["fue","des","con"], habilidades: ["atletismo","trato_animales"],   herramienta: "herramientas de ebanista",              dote: "✦ Alerta" },
  "Sectario del Dragón":           { asi: ["des","con","int"], habilidades: ["engano","sigilo"],              herramienta: "suministros de calígrafo",              dote: "✦ Iniciado del Culto del Dragón" },
  "Tocado por un Genio":           { asi: ["des","sab","car"], habilidades: ["percepcion","persuasion"],      herramienta: "herramientas de soplador de vidrio",   dote: "✦ Iniciado en la magia" },
  "Vasallo de la Alianza de los Lores": { asi: ["fue","int","car"], habilidades: ["perspicacia","persuasion"], herramienta: "suministros de calígrafo",             dote: "✦ Agente de la Alianza de los Lores" },
  // Trasfondo personalizado: el jugador elige las 3 características y la dote de origen
  "Personalizado": { asi: [], habilidades: [], herramienta: "(libre)", dote: null },
};

// Dotes de origen disponibles (para el trasfondo Personalizado)
const DOTES_ORIGEN = [
  // PHB 2024
  "✦ Alerta", "✦ Afortunado", "✦ Atacante salvaje", "✦ Duro",
  "✦ Fabricante", "✦ Habilidoso", "✦ Iniciado en la magia",
  "✦ Matón de taberna", "✦ Músico", "✦ Sanador",
  // Ravenloft: Horrors Within
  "✦ Ojo Agudo", "✦ Superviviente",
  // Arcana Unleashed
  "✦ Artista Arcano", "✦ Elocuencia Arcana", "✦ Infiltrador Arcano",
  "✦ Presagios Arcanos", "✦ Sobrecarga Arcana", "✦ Salvaguarda Arcana",
  "✦ Sepulturero Arcano", "✦ Amigo Familiar", "✦ Saltador de Portal",
  "✦ Anatomía Transmutada",
  // Héroes de Faerún
  "✦ Agente de la Alianza de los Lores",
  "✦ Agente de los Arpistas",
  "✦ Aprendiz del Dragón Púrpura",
  "✦ Chispa del fuego mágico",
  "✦ Iniciado del Culto del Dragón",
  "✦ Novato del Guantelete",
  "✦ Principiante del Enclave Esmeralda",
  "✦ Rufián de los Zhentarim",
];

// ─── Armas PHB 2024 ───────────────────────────────────────────────────────────
// cat: simple/marcial | tipo: melee/ranged | props: propiedades | maestria: maestría
const ARMAS_DB = [
  // ── Armas Simples de Cuerpo a Cuerpo ─────────────────────────────────────
  { nombre:"Garrote",           cat:"simple", tipo:"melee",  dano:"1d4 golpe",      props:"Ligera",                         maestria:"Lenta"        },
  { nombre:"Daga",              cat:"simple", tipo:"melee",  dano:"1d4 perforante", props:"Finura, Ligera, Arrojadiza 6/18",maestria:"Nick"         },
  { nombre:"Hacha de mano",     cat:"simple", tipo:"melee",  dano:"1d6 filo",       props:"Ligera, Arrojadiza 6/18",        maestria:"Nick"         },
  { nombre:"Lanza",             cat:"simple", tipo:"melee",  dano:"1d6 perforante", props:"Versátil (1d8), Arrojadiza 6/18",maestria:"Empuje"       },
  { nombre:"Maza",              cat:"simple", tipo:"melee",  dano:"1d6 golpe",      props:"—",                              maestria:"Empuje"       },
  { nombre:"Martillo de mano",  cat:"simple", tipo:"melee",  dano:"1d4 golpe",      props:"Ligera, Arrojadiza 6/18",        maestria:"Nick"         },
  { nombre:"Hoz",               cat:"simple", tipo:"melee",  dano:"1d4 filo",       props:"Ligera",                         maestria:"Nick"         },
  { nombre:"Vara",              cat:"simple", tipo:"melee",  dano:"1d6 golpe",      props:"Versátil (1d8)",                 maestria:"Empuje"       },
  { nombre:"Jabalina",          cat:"simple", tipo:"ranged", dano:"1d6 perforante", props:"Arrojadiza 9/36",                maestria:"Lenta"        },
  // ── Armas Simples a Distancia ─────────────────────────────────────────────
  { nombre:"Ballesta ligera",   cat:"simple", tipo:"ranged", dano:"1d8 perforante", props:"Carga, Dos manos, 24/96",        maestria:"Lenta"        },
  { nombre:"Dardo",             cat:"simple", tipo:"ranged", dano:"1d4 perforante", props:"Finura, Arrojadiza 6/18",        maestria:"Nick"         },
  { nombre:"Honda",             cat:"simple", tipo:"ranged", dano:"1d4 golpe",      props:"24/96",                          maestria:"Lenta"        },
  { nombre:"Arco corto",        cat:"simple", tipo:"ranged", dano:"1d6 perforante", props:"Dos manos, 24/96",               maestria:"Respuesta"    },
  // ── Armas Marciales de Cuerpo a Cuerpo ───────────────────────────────────
  { nombre:"Espada corta",      cat:"marcial",tipo:"melee",  dano:"1d6 perforante", props:"Finura, Ligera",                 maestria:"Nick"         },
  { nombre:"Espada larga",      cat:"marcial",tipo:"melee",  dano:"1d8 filo",       props:"Versátil (1d10)",                maestria:"Entorpecer"   },
  { nombre:"Espadón",           cat:"marcial",tipo:"melee",  dano:"2d6 filo",       props:"Dos manos, Pesada",              maestria:"Derribar"     },
  { nombre:"Hacha de guerra",   cat:"marcial",tipo:"melee",  dano:"1d8 filo",       props:"Versátil (1d10)",                maestria:"Tomador"      },
  { nombre:"Hacha grande",      cat:"marcial",tipo:"melee",  dano:"1d12 filo",      props:"Dos manos, Pesada",              maestria:"Derribar"     },
  { nombre:"Mandoble",          cat:"marcial",tipo:"melee",  dano:"2d6 filo",       props:"Dos manos, Pesada, Alcance",     maestria:"Derribar"     },
  { nombre:"Estoque",           cat:"marcial",tipo:"melee",  dano:"1d8 perforante", props:"Finura",                         maestria:"Empuje"       },
  { nombre:"Espada bastarda",   cat:"marcial",tipo:"melee",  dano:"1d10 filo",      props:"Dos manos, Pesada",              maestria:"Entorpecer"   },
  { nombre:"Mayal de guerra",   cat:"marcial",tipo:"melee",  dano:"1d8 golpe",      props:"—",                              maestria:"Sacudir"      },
  { nombre:"Lanza de guerra",   cat:"marcial",tipo:"melee",  dano:"1d12 perforante",props:"Dos manos, Pesada, Alcance",     maestria:"Empuje"       },
  { nombre:"Alabarda",          cat:"marcial",tipo:"melee",  dano:"1d10 filo",      props:"Dos manos, Pesada, Alcance",     maestria:"Barrer"       },
  { nombre:"Pica",              cat:"marcial",tipo:"melee",  dano:"1d10 perforante",props:"Dos manos, Pesada, Alcance",     maestria:"Empuje"       },
  { nombre:"Lanza larga",       cat:"marcial",tipo:"melee",  dano:"1d10 perforante",props:"Dos manos, Alcance",             maestria:"Empuje"       },
  { nombre:"Guadaña",           cat:"marcial",tipo:"melee",  dano:"1d10 filo",      props:"Dos manos, Pesada, Alcance",     maestria:"Barrer"       },
  { nombre:"Mazo de guerra",    cat:"marcial",tipo:"melee",  dano:"2d6 golpe",      props:"Dos manos, Pesada",              maestria:"Empuje"       },
  { nombre:"Tridente",          cat:"marcial",tipo:"melee",  dano:"1d8 perforante", props:"Versátil (1d10), Arrojadiza 6/18",maestria:"Tropezar"    },
  { nombre:"Porra",             cat:"marcial",tipo:"melee",  dano:"1d8 golpe",      props:"—",                              maestria:"Sacudir"      },
  { nombre:"Látigo",            cat:"marcial",tipo:"melee",  dano:"1d4 filo",       props:"Finura, Alcance",                maestria:"Lenta"        },
  { nombre:"Escudo con pinchos",cat:"marcial",tipo:"melee",  dano:"1d6 perforante", props:"—",                              maestria:"Empuje"       },
  // ── Armas Marciales a Distancia ──────────────────────────────────────────
  { nombre:"Ballesta de mano",  cat:"marcial",tipo:"ranged", dano:"1d6 perforante", props:"Ligera, Carga, 9/36",            maestria:"Nick"         },
  { nombre:"Ballesta pesada",   cat:"marcial",tipo:"ranged", dano:"1d10 perforante",props:"Dos manos, Pesada, Carga, 30/120",maestria:"Empuje"      },
  { nombre:"Arco largo",        cat:"marcial",tipo:"ranged", dano:"1d8 perforante", props:"Dos manos, Pesada, 45/180",      maestria:"Lenta"        },
  { nombre:"Arco de batalla",   cat:"marcial",tipo:"ranged", dano:"1d8 perforante", props:"Dos manos, 30/120",              maestria:"Respuesta"    },
  { nombre:"Red",               cat:"marcial",tipo:"ranged", dano:"—",              props:"Especial, Arrojadiza 1.5/4.5",   maestria:"Lenta"        },
];

// ─── Armaduras PHB 2024 ──────────────────────────────────────────────────────
const ARMADURAS_DB = [
  // ── Armaduras Ligeras ─────────────────────────────────────────────────────
  { nombre:"Cuero",             tipo:"Ligera",  caBase:"11 + mod DES",   fueMín:0,  sigilo:false, peso:"10 lb"  },
  { nombre:"Cuero tachonado",   tipo:"Ligera",  caBase:"12 + mod DES",   fueMín:0,  sigilo:false, peso:"13 lb"  },
  { nombre:"Cota de mallas",    tipo:"Ligera",  caBase:"13 + mod DES",   fueMín:0,  sigilo:false, peso:"20 lb"  },
  // ── Armaduras Medias ──────────────────────────────────────────────────────
  { nombre:"Cuero endurecido",  tipo:"Media",   caBase:"13 + mod DES (máx 2)", fueMín:0, sigilo:false, peso:"20 lb" },
  { nombre:"Camisote de mallas",tipo:"Media",   caBase:"13 + mod DES (máx 2)", fueMín:0, sigilo:false, peso:"20 lb" },
  { nombre:"Cota de escamas",   tipo:"Media",   caBase:"14 + mod DES (máx 2)", fueMín:0, sigilo:true,  peso:"45 lb" },
  { nombre:"Corsé",             tipo:"Media",   caBase:"14 + mod DES (máx 2)", fueMín:0, sigilo:false, peso:"20 lb" },
  { nombre:"Media armadura",    tipo:"Media",   caBase:"15 + mod DES (máx 2)", fueMín:0, sigilo:true,  peso:"40 lb" },
  // ── Armaduras Pesadas ─────────────────────────────────────────────────────
  { nombre:"Armadura de anillas",tipo:"Pesada", caBase:"14",             fueMín:0,  sigilo:true,  peso:"40 lb"  },
  { nombre:"Cota de bandas",    tipo:"Pesada",  caBase:"16",             fueMín:15, sigilo:true,  peso:"55 lb"  },
  { nombre:"Armadura de placas",tipo:"Pesada",  caBase:"18",             fueMín:15, sigilo:true,  peso:"65 lb"  },
  // ── Escudos ───────────────────────────────────────────────────────────────
  { nombre:"Escudo",            tipo:"Escudo",  caBase:"+2",             fueMín:0,  sigilo:false, peso:"6 lb"   },
];

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

// ─── Rasgos de Clase por Nivel (PHB 2024) ────────────────────────────────────
const RASGOS_CLASE = {
  "Bárbaro": {
    1:  ["Rabia (2/descanso largo)","Defensa sin Armadura (10+mod DES+mod CON)"],
    2:  ["Ataque Desenfrenado","Sentido del Peligro"],
    3:  ["Camino del Bárbaro (subclase)","Conocimiento Primigenio"],
    4:  ["Mejora de Puntuación de Característica"],
    5:  ["Ataque Extra","Movimiento Rápido (+3 m)"],
    6:  ["Rasgo de Camino del Bárbaro"],
    7:  ["Instinto de Fiera","Conocimiento Instintivo"],
    8:  ["Mejora de Puntuación de Característica"],
    9:  ["Rabia Brutal (1d10 extra en críticos)"],
    10: ["Rasgo de Camino del Bárbaro"],
    11: ["Rabia Implacable (PG→1 al caer a 0, 1/rabia)"],
    12: ["Mejora de Puntuación de Característica"],
    13: ["Rabia Brutal mejorada"],
    14: ["Rasgo de Camino del Bárbaro"],
    15: ["Rabia Persistente"],
    16: ["Mejora de Puntuación de Característica"],
    17: ["Rabia Brutal mejorada"],
    18: ["Poder Indomable"],
    19: ["Mejora de Puntuación de Característica (Épica)"],
    20: ["Campeón Primigenio"],
  },
  "Bardo": {
    1:  ["Competencias de Bardo","Lanzamiento de Conjuros","Inspiración Bárdica (1d6)"],
    2:  ["Acción Ingeniosa","Canción de Descanso (1d6)"],
    3:  ["Maestría en Habilidades","Inspiración Bárdica (1d8)","Colegio de Bardo (subclase)"],
    4:  ["Mejora de Puntuación de Característica"],
    5:  ["Inspiración Bárdica (1d8)","Fuente de Inspiración"],
    6:  ["Contraencanto","Rasgo de Colegio de Bardo"],
    7:  ["Maestría en Habilidades (nueva)"],
    8:  ["Mejora de Puntuación de Característica"],
    9:  ["Inspiración Bárdica (1d10)","Secretos Mágicos (nivel 9)"],
    10: ["Genio Mágico","Inspiración Bárdica (1d10)"],
    11: ["Inspiración Bárdica (1d10)"],
    12: ["Mejora de Puntuación de Característica"],
    13: ["Inspiración Bárdica (1d12)","Canción de Descanso (1d10)"],
    14: ["Rasgo de Colegio de Bardo","Secretos Mágicos (nivel 14)"],
    15: ["Inspiración Bárdica (1d12)"],
    16: ["Mejora de Puntuación de Característica"],
    17: ["Canción de Descanso (1d12)","Secretos Mágicos (nivel 17)"],
    18: ["Magia Superior"],
    19: ["Mejora de Puntuación de Característica (Épica)"],
    20: ["Inspiración de la Leyenda"],
  },
  "Clérigo": {
    1:  ["Lanzamiento de Conjuros","Dominio Divino (subclase)","Conjuros de Dominio"],
    2:  ["Canalizar Divinidad (1 uso)","Rasgo de Dominio Divino"],
    3:  ["Conjuros de Dominio de nivel 3"],
    4:  ["Mejora de Puntuación de Característica"],
    5:  ["Destruir Muertos Vivientes (CR ½)","Conjuros de Dominio de nivel 5"],
    6:  ["Canalizar Divinidad (2 usos)","Rasgo de Dominio Divino"],
    7:  ["Conjuros de Dominio de nivel 7"],
    8:  ["Mejora de Puntuación de Característica","Destruir Muertos Vivientes (CR 1)","Golpe Divino / Potencia Divina"],
    9:  ["Conjuros de Dominio de nivel 9"],
    10: ["Intervención Divina"],
    11: ["Destruir Muertos Vivientes (CR 2)"],
    12: ["Mejora de Puntuación de Característica"],
    13: ["Destruir Muertos Vivientes (CR 3)"],
    14: ["Rasgo de Dominio Divino"],
    15: ["Destruir Muertos Vivientes (CR 4)"],
    16: ["Mejora de Puntuación de Característica"],
    17: ["Destruir Muertos Vivientes (CR 4)"],
    18: ["Canalizar Divinidad (3 usos)"],
    19: ["Mejora de Puntuación de Característica (Épica)"],
    20: ["Intervención Divina Mejorada"],
  },
  "Druida": {
    1:  ["Drúidico","Lanzamiento de Conjuros"],
    2:  ["Forma Salvaje (CR ¼)","Círculo Druídico (subclase)"],
    3:  ["Forma Salvaje (CR ½)"],
    4:  ["Mejora de Puntuación de Característica","Forma Salvaje mejorada"],
    5:  ["Forma Salvaje (CR 1)"],
    6:  ["Rasgo de Círculo Druídico"],
    7:  ["Forma Salvaje (CR 2)"],
    8:  ["Mejora de Puntuación de Característica","Forma Salvaje (CR 2 vuelo)"],
    9:  [],
    10: ["Rasgo de Círculo Druídico"],
    11: [],
    12: ["Mejora de Puntuación de Característica"],
    13: [],
    14: ["Rasgo de Círculo Druídico"],
    15: [],
    16: ["Mejora de Puntuación de Característica"],
    17: [],
    18: ["Forma Salvaje Bestial (CR 3)","Mente Intemporal (no envejecer)"],
    19: ["Mejora de Puntuación de Característica (Épica)"],
    20: ["Archidruida"],
  },
  "Guerrero": {
    1:  ["Estilo de Combate","Segundo Aliento (1d10+nivel/descanso corto)"],
    2:  ["Oleada de Acción (1/descanso corto)"],
    3:  ["Arquetipo Marcial (subclase)"],
    4:  ["Mejora de Puntuación de Característica"],
    5:  ["Ataque Extra (2)"],
    6:  ["Mejora de Puntuación de Característica"],
    7:  ["Rasgo de Arquetipo Marcial"],
    8:  ["Mejora de Puntuación de Característica"],
    9:  ["Inamovible (ventaja en TDE FUE/CON)"],
    10: ["Rasgo de Arquetipo Marcial"],
    11: ["Ataque Extra (3)"],
    12: ["Mejora de Puntuación de Característica"],
    13: ["Inamovible mejorado"],
    14: ["Mejora de Puntuación de Característica"],
    15: ["Rasgo de Arquetipo Marcial"],
    16: ["Mejora de Puntuación de Característica"],
    17: ["Oleada de Acción (2/descanso corto)"],
    18: ["Rasgo de Arquetipo Marcial"],
    19: ["Mejora de Puntuación de Característica (Épica)"],
    20: ["Ataque Extra (4)"],
  },
  "Monje": {
    1:  ["Artes Marciales (1d6)","Sin Armadura"],
    2:  ["Puntos de Ki (2)","Paso sin Viento","Aguacero de Golpes"],
    3:  ["Tradición Monástica (subclase)","Desviar Proyectiles"],
    4:  ["Mejora de Puntuación de Característica","Caída Lenta"],
    5:  ["Ataque Extra","Ataque Aturdidor (Ki)"],
    6:  ["Golpes de Ki (daño mágico)","Rasgo de Tradición Monástica"],
    7:  ["Evasión","Calma"],
    8:  ["Mejora de Puntuación de Característica"],
    9:  ["Artes Marciales (1d8)","Acrobacias Mejoradas"],
    10: ["Mente Pura","Rasgo de Tradición Monástica"],
    11: ["Artes Marciales (1d8)"],
    12: ["Mejora de Puntuación de Característica"],
    13: ["Lengua del Sol y la Luna"],
    14: ["Alma de Diamante"],
    15: ["Alma Intemporal (no envejecer)"],
    16: ["Mejora de Puntuación de Característica"],
    17: ["Rasgo de Tradición Monástica","Artes Marciales (1d10)"],
    18: ["Forma Vacía"],
    19: ["Mejora de Puntuación de Característica (Épica)"],
    20: ["Ser Perfecto"],
  },
  "Paladín": {
    1:  ["Detección Divina","Imposición de Manos (5×nivel PG)"],
    2:  ["Estilo de Combate","Lanzamiento de Conjuros","Golpe Divino (2d8)"],
    3:  ["Sagrado Juramento (subclase)","Conjuros de Juramento"],
    4:  ["Mejora de Puntuación de Característica"],
    5:  ["Ataque Extra","Golpe Divino (3d8)"],
    6:  ["Aura de Protección (+bon. CAR a TDE aliados en 3 m)"],
    7:  ["Rasgo de Sagrado Juramento"],
    8:  ["Mejora de Puntuación de Característica"],
    9:  ["Golpe Divino (4d8)"],
    10: ["Aura de Valentía (aliados inmunes a Miedo en 3 m)"],
    11: ["Golpe Divino (5d8)"],
    12: ["Mejora de Puntuación de Característica"],
    13: ["Golpe Divino (6d8)"],
    14: ["Toque Purificador"],
    15: ["Rasgo de Sagrado Juramento","Golpe Divino (7d8)"],
    16: ["Mejora de Puntuación de Característica"],
    17: ["Golpe Divino (8d8)"],
    18: ["Aura mejorada (18 m)"],
    19: ["Mejora de Puntuación de Característica (Épica)"],
    20: ["Forma Sagrada"],
  },
  "Explorador": {
    1:  ["Enemigo Favorito","Explorador Natural"],
    2:  ["Estilo de Combate","Conjuros"],
    3:  ["Arquetipo de Explorador (subclase)","Consciencia Primaria"],
    4:  ["Mejora de Puntuación de Característica"],
    5:  ["Ataque Extra"],
    6:  ["Enemigo Favorito mejorado","Explorador Natural mejorado"],
    7:  ["Rasgo de Arquetipo de Explorador"],
    8:  ["Mejora de Puntuación de Característica","Paso por la Tierra"],
    9:  [],
    10: ["Ocultación Natural","Rasgo de Arquetipo de Explorador"],
    11: ["Atacante Feroz (crítico adicional)"],
    12: ["Mejora de Puntuación de Característica"],
    13: [],
    14: ["Desaparecer","Rasgo de Arquetipo de Explorador"],
    15: ["Mente Salvaje"],
    16: ["Mejora de Puntuación de Característica"],
    17: [],
    18: ["Sentidos Férreos","Ojo Férreo"],
    19: ["Mejora de Puntuación de Característica (Épica)"],
    20: ["Cazador de Asesinos"],
  },
  "Pícaro": {
    1:  ["Maestría en Competencias","Ataque Furtivo (1d6)","Jerga de Ladrones"],
    2:  ["Acción Astuta"],
    3:  ["Arquetipo de Pícaro (subclase)","Ataque Furtivo (2d6)","Reducción de Daño"],
    4:  ["Mejora de Puntuación de Característica"],
    5:  ["Ataque Furtivo (3d6)","Esquiva Asombrosa"],
    6:  ["Maestría en Competencias (nueva)","Ataque Furtivo (3d6)"],
    7:  ["Evasión","Ataque Furtivo (4d6)"],
    8:  ["Mejora de Puntuación de Característica","Ataque Furtivo (4d6)"],
    9:  ["Rasgo de Arquetipo de Pícaro","Ataque Furtivo (5d6)"],
    10: ["Mejora de Puntuación de Característica","Ataque Furtivo (5d6)"],
    11: ["Talento Confiable","Ataque Furtivo (6d6)"],
    12: ["Mejora de Puntuación de Característica","Ataque Furtivo (6d6)"],
    13: ["Rasgo de Arquetipo de Pícaro","Ataque Furtivo (7d6)"],
    14: ["Mente Deslizante","Ataque Furtivo (7d6)"],
    15: ["Inaferrable","Ataque Furtivo (8d6)"],
    16: ["Mejora de Puntuación de Característica","Ataque Furtivo (8d6)"],
    17: ["Rasgo de Arquetipo de Pícaro","Ataque Furtivo (9d6)"],
    18: ["Esquiva con Estilo","Ataque Furtivo (9d6)"],
    19: ["Mejora de Puntuación de Característica (Épica)","Ataque Furtivo (10d6)"],
    20: ["Golpe del Destino","Ataque Furtivo (10d6)"],
  },
  "Hechicero": {
    1:  ["Origen Sobrenatural (subclase)","Lanzamiento de Conjuros","Fuente Innata"],
    2:  ["Puntos de Hechicería (2)","Metamagia"],
    3:  ["Metamagia (segunda opción)"],
    4:  ["Mejora de Puntuación de Característica"],
    5:  [],
    6:  ["Rasgo de Origen Sobrenatural"],
    7:  [],
    8:  ["Mejora de Puntuación de Característica"],
    9:  [],
    10: ["Metamagia (tercera opción)"],
    11: [],
    12: ["Mejora de Puntuación de Característica"],
    13: [],
    14: ["Rasgo de Origen Sobrenatural"],
    15: [],
    16: ["Mejora de Puntuación de Característica"],
    17: ["Metamagia (cuarta opción)"],
    18: ["Rasgo de Origen Sobrenatural"],
    19: ["Mejora de Puntuación de Característica (Épica)"],
    20: ["Poder Sobrenatural Épico"],
  },
  "Brujo": {
    1:  ["Patrón Extraplanar (subclase)","Magia del Patrón","Invocaciones Oscuras (1)"],
    2:  ["Invocaciones Oscuras (2)"],
    3:  ["Favor del Patrón (Pacto)","Invocaciones Oscuras (2)"],
    4:  ["Mejora de Puntuación de Característica"],
    5:  ["Invocaciones Oscuras (3)"],
    6:  ["Rasgo del Patrón Extraplanar"],
    7:  ["Invocaciones Oscuras (4)"],
    8:  ["Mejora de Puntuación de Característica"],
    9:  ["Invocaciones Oscuras (5)"],
    10: ["Rasgo del Patrón Extraplanar"],
    11: ["Conjuro Místico (nivel 6)","Invocaciones Oscuras (5)"],
    12: ["Mejora de Puntuación de Característica"],
    13: ["Conjuro Místico (nivel 7)","Invocaciones Oscuras (6)"],
    14: ["Rasgo del Patrón Extraplanar"],
    15: ["Conjuro Místico (nivel 8)","Invocaciones Oscuras (6)"],
    16: ["Mejora de Puntuación de Característica"],
    17: ["Conjuro Místico (nivel 9)","Invocaciones Oscuras (7)"],
    18: ["Invocaciones Oscuras (8)"],
    19: ["Mejora de Puntuación de Característica (Épica)"],
    20: ["Magia Evocada"],
  },
  "Mago": {
    1:  ["Lanzamiento de Conjuros","Recuperación Arcana"],
    2:  ["Tradición Arcana (subclase)"],
    3:  [],
    4:  ["Mejora de Puntuación de Característica"],
    5:  [],
    6:  ["Rasgo de Tradición Arcana"],
    7:  [],
    8:  ["Mejora de Puntuación de Característica"],
    9:  [],
    10: ["Rasgo de Tradición Arcana"],
    11: [],
    12: ["Mejora de Puntuación de Característica"],
    13: [],
    14: ["Rasgo de Tradición Arcana"],
    15: [],
    16: ["Mejora de Puntuación de Característica"],
    17: [],
    18: ["Dominio de Conjuros (nivel 1 y 2 sin ranura)"],
    19: ["Mejora de Puntuación de Característica (Épica)"],
    20: ["Firma de Conjuros"],
  },
  "Artificiero": {
    1:  ["Conocimiento Mágico","Concentración en Herramientas"],
    2:  ["Infusiones Arcanas (2 ítems, 4 recetas)"],
    3:  ["Especialidad de Artificiero (subclase)","El Arma Correcta"],
    4:  ["Mejora de Puntuación de Característica"],
    5:  ["Ataque Extra","Lanzamiento con Arma de Artificiero"],
    6:  ["Rasgo de Especialidad","Infusiones (3 ítems, 6 recetas)"],
    7:  ["Flash de Genialidad"],
    8:  ["Mejora de Puntuación de Característica","Infusiones (4 ítems, 6 recetas)"],
    9:  [],
    10: ["Rasgo de Especialidad","Inteligencia de Magia","Infusiones (4 ítems, 8 recetas)"],
    11: ["Almacenamiento de Conjuro"],
    12: ["Mejora de Puntuación de Característica"],
    13: ["Infusiones (5 ítems, 8 recetas)"],
    14: ["Rasgo de Especialidad"],
    15: ["Perfección del Alma"],
    16: ["Mejora de Puntuación de Característica","Infusiones (5 ítems, 10 recetas)"],
    17: [],
    18: ["Rasgo de Especialidad","Infusiones (6 ítems, 10 recetas)"],
    19: ["Mejora de Puntuación de Característica (Épica)"],
    20: ["Alma del Artificiero"],
  },
};

// ─── Rasgos de Subclase por Nivel (PHB 2024, selección) ──────────────────────
const RASGOS_SUBCLASE = {
  // ── Guerrero ──────────────────────────────────────────────────────────────
  "Campeón": {
    3: ["Crítico Mejorado (19-20)"],
    7: ["Atleta Extraordinario (bon. comp./2 a FUE, DES, CON sin comp.)"],
    10:["Estilo de Combate Adicional"],
    15:["Crítico Superior (18-20)"],
    18:["Superviviente (recupera 5+mod CON PG/turno cuando ≤mitad PG máx)"],
  },
  "Maestro de Batalla": {
    3: ["Maniobras de Combate (4 elegidas, CD=8+prof+FUE/DES)","Dados de Superioridad (4d8)"],
    7: ["Maniobras Adicionales","Dados de Superioridad (5d8)","Conocer el Enemigo"],
    10:["Maniobras Adicionales","Dados de Superioridad (5d10)","Versatilidad"],
    15:["Maniobras Adicionales","Dados de Superioridad (6d10)"],
    18:["Implacable (recupera 1 DS si no tienes al inicio del combate)","Dados de Superioridad (6d12)"],
  },
  "Caballero Arcano": {
    3: ["Lanzamiento de Conjuros (Abjuración+Evocación)","Vínculo con Arma"],
    7: ["Golpe de Guerra"],
    10:["Conjuro del Más Allá","Vínculo con Arma Adicional"],
    15:["Carga Arcana"],
    18:["Maestría en Conjuros Mejorada"],
  },
  // ── Pícaro ────────────────────────────────────────────────────────────────
  "Ladrón": {
    3: ["Manos Rápidas (bonus: Usar Objeto/Usar Herramientas de Ladrón)","Escalador Ágil (+3 m al trepar, ambas manos libres en pared)"],
    9: ["Influencia del Ladrón Supremo (acción bonus en turno de otro)"],
    13:["Utilizar Objetos Mágicos"],
    17:["Reflejos de Ladrón (2 reacciones/ronda)"],
  },
  "Asesino": {
    3: ["Asesino","Infiltrado"],
    9: ["Impostora"],
    13:["Matar en Silencio"],
    17:["Muerte en un Abrir y Cerrar de Ojos"],
  },
  "Embaucador Arcano": {
    3: ["Lanzamiento de Conjuros (Encantamiento+Ilusión)","Mano Tramposa del Mago","Hurto Mágico"],
    9: ["Trampas Mágicas"],
    13:["Ladrón de Versátil"],
    17:["Cuerpo y Alma"],
  },
  // ── Mago ──────────────────────────────────────────────────────────────────
  "Escuela de Evocación": {
    2: ["Magia Esculpida","Canalizador de Evocación"],
    6: ["Evocación Potenciada (relanzar daño, hasta bon. INT veces)"],
    10:["Evocación Empoderada (añade bon. INT a tiradas de daño)"],
    14:["Sobreevocación"],
  },
  "Escuela de Abjuración": {
    2: ["Magia de Abjuración","Escudo Arcano (2+nivel/2 PG temp por nivel de conjuro)"],
    6: ["Conjuración Proyectada"],
    10:["Purificación de Mejoras"],
    14:["Resistencia de Daño Mágico"],
  },
  "Escuela de Ilusión": {
    2: ["Ilusionista Mejorado","Sombras Maleables"],
    6: ["Visión Ilusoria"],
    10:["Ilusión Maleable"],
    14:["Doble Ilusorio"],
  },
  // ── Clérigo ───────────────────────────────────────────────────────────────
  "Dominio de la Vida": {
    1: ["Sanador de Armas Pesadas","Conjuros de Dominio de Vida"],
    2: ["Preservar la Vida (Canalizar Divinidad)"],
    6: ["Curación Bendita (+bon. SAB a curaciones)"],
    8: ["Golpe Divino (1d8 radiante)"],
    17:["Curación Suprema (máximo en dados de curación)"],
  },
  "Dominio de la Luz": {
    1: ["Lengua de Llamas","Conjuros de Dominio de Luz"],
    2: ["Luz Radiante (Canalizar Divinidad)"],
    6: ["Destello Mejorado"],
    8: ["Golpe Divino (1d8 fuego)"],
    17:["Corona de Luz"],
  },
  "Dominio de la Guerra": {
    1: ["Competencia con Armas y Armaduras de Guerrero","Conjuros de Dominio de Guerra"],
    2: ["Golpe Divino (Canalizar Divinidad)"],
    6: ["Dios de la Guerra (Ataque Extra)"],
    8: ["Golpe Divino (1d8 tipo daño arma)"],
    17:["Avatar de la Batalla (resistencia a golpe/filo/perforante no mágico)"],
  },
  // ── Druida ────────────────────────────────────────────────────────────────
  "Círculo de la Luna": {
    2: ["Forma de la Luna (CR 1, acceso a elementales)","Guardianes de la Noche"],
    6: ["Forma Primaria Elemental"],
    10:["Forma de la Luna Mejorada (CR=nivel/3)"],
    14:["La Bestia en la Luna"],
  },
  "Círculo de la Tierra": {
    2: ["Recuperación Natural","Conjuros del Círculo (bioma)"],
    6: ["Paso por la Tierra"],
    10:["Mente de la Naturaleza"],
    14:["Santuario de la Tierra"],
  },
  // ── Brujo ─────────────────────────────────────────────────────────────────
  "El Gran Anciano": {
    1: ["Telepathy Expandida","Conjuros del Gran Anciano"],
    6: ["Mente Defendida"],
    10:["Telepatía Transmutadora"],
    14:["Crear Familiar Aberración"],
  },
  "El Diablo": {
    1: ["Lengua oscura del Diablo","Conjuros del Diablo"],
    6: ["Suerte del Diablo (sumar CAR a TDE 1/descanso)"],
    10:["Intimidación Infernal"],
    14:["Exigir Alma (dominar monstruo)"],
  },
  // ── Bárbaro ───────────────────────────────────────────────────────────────
  "Camino del Berserker": {
    3: ["Frenesí (rabia: bonus ataque; agotamiento 1 al acabar)"],
    6: ["Presencia Intimidante (Intimidación como bonus durante rabia)"],
    10:["Represalia (al ser dañado, bonus de ataque)"],
    14:["Matador (irrumpir en Frenesí sin agotamiento 1/descanso largo)"],
  },
  "Camino del Totem": {
    3: ["Guía de Espíritu","Tótem del Guerrero (oso/águila/lobo)"],
    6: ["Aspecto del Bestia"],
    10:["Caminante de Espíritu"],
    14:["Tótem de Ataque"],
  },
  // ── Paladín ───────────────────────────────────────────────────────────────
  "Juramento de Devoción": {
    3: ["Armas Sagradas (Canalizar Divinidad)","Arma Sagrada (Canalizar Divinidad)","Conjuros de Juramento"],
    7: ["Aura de Devoción (aliados inmunes a Encantado en 3 m durante rabia)"],
    15:["Pureza del Espíritu"],
    20:["Forma de Paladín Santo"],
  },
  "Juramento de los Vengadores": {
    3: ["Marca del Vengador (Canalizar Divinidad)","Conjuros de Juramento"],
    7: ["Aura de la Ira (aliados +bon. SAB a daño de arma)"],
    15:["Alma del Vengador"],
    20:["Ángel de la Ira"],
  },
  // ── Bardo ─────────────────────────────────────────────────────────────────
  "Colegio del Saber": {
    3: ["Palabras Cortantes (Usar Inspiración Bárdica para reducir tirada enemigo)","Habilidades Adicionales"],
    6: ["Secretos Mágicos Adicionales (nivel 6)"],
    14:["Conocimiento Peerless (añadir 1d6 a habilidades propias)"],
  },
  "Colegio del Valor": {
    3: ["Competencias de Combate","Inspiración de Combate"],
    6: ["Ataque Extra"],
    14:["Magia en Combate"],
  },
  // ── Monje ─────────────────────────────────────────────────────────────────
  "Tradición de la Mano Abierta": {
    3: ["Técnicas de la Mano Abierta (empuje, derribo o negar reacción en Aguacero)"],
    6: ["Totalidad del Cuerpo (curar bon. ki × SAB PG como acción)"],
    11:["Paz Tranquila (vacío durante movimiento, evita AO)"],
    17:["Palma de Temblor (3 ki; mata o inflige 10d10 necrótico diferido)"],
  },
  "Tradición de las Cuatro Estaciones": {
    3: ["Elemental Discipline (ki para conjuros elementales básicos)"],
    6: ["Golpes Elementales (ki extra en Aguacero para daño elemental)"],
    11:["Zancada del Viento (vuelo temporal)"],
    17:["Avatar del Elemento"],
  },
  // ── Hechicero ─────────────────────────────────────────────────────────────
  "Origen Dracónico": {
    1: ["Linaje Dracónico (tipo de daño)","Resistencia Dracónica (CA=13+DES sin armadura, PG extra)"],
    6: ["Afinidad Elemental (bono con tipo daño linaje)"],
    14:["Alas Dracónicas"],
    18:["Presencia Dracónica (Aterrar o Fascinar)"],
  },
  "Alma Silvestre": {
    1: ["Magia Salvaje Expandida","Oleada de Magia Salvaje (también en conjuros nivel 1+)"],
    6: ["Sobreimpulso Controlado"],
    14:["Magia Salvaje Controlada"],
    18:["Pozo de Poder"],
  },
  // ── Explorador ────────────────────────────────────────────────────────────
  "Cazador": {
    3: ["Presa del Cazador (Matar a Hordas / Defensa Colosal / Luchador Coloso)"],
    7: ["Tácticas Defensivas"],
    11:["Multiataque"],
    15:["Voluntad Superior"],
  },
  "Bestia del Bosque": {
    3: ["Compañero Bestia","Vínculo de Bestia"],
    7: ["Protector de la Bestia"],
    11:["Mente de Bestia"],
    15:["Compartir Conjuros"],
  },
  // ── Eberron: La Forja del Artífice ───────────────────────────────────────
  "Alquimista": {
    3: ["Herramientas del Oficio (competencia Suministros de Alquimista + Kit de Herbología; fabricación de pociones en la mitad de tiempo)","Hechizos de Alquimista","Elixir Experimental (2 elixires gratis tras descanso largo; efectos aleatorios d6: Curación/Velocidad/Resiliencia/Audacia/Vuelo/Elección; crear adicionales gastando ranura)"],
    5: ["Sabio Alquímico (bono=mod INT a tiradas de curación o daño Ácido/Fuego/Veneno con Suministros de Alquimista como enfoque)","Elixir Experimental (3 elixires)"],
    9: ["Reactivos Restauradores (Restauración Menor sin ranura, usos=mod INT; recupera en descanso largo)","Elixir Experimental (4 elixires)"],
    15:["Maestría Química (Erupción Alquímica: 2d8 Fuerza extra; Resistencia Química: Resistencia Ácido y Veneno, Inmunidad Envenenado; Caldero Invocado: 1/descanso largo)","Elixir Experimental (5 elixires)"],
  },
  "Armero": {
    3: ["Herramientas del Oficio (Entrenamiento armadura Pesada; competencia Herramientas de Herrero; fabricación de armaduras en la mitad de tiempo)","Hechizos del Armador","Armadura Arcana (convertir armadura que portas: sin requisito FUE, equipar como Acción de Utilizar, enfoque de conjuro)","Modelo de Armadura (elegir Dreadnaught/Guardián/Infiltrador; cambiar en descanso corto; usar modificador INT para ataques)"],
    5: ["Ataque Adicional"],
    9: ["Armorer Mejorado (plan extra Replicar Objeto Mágico categoría Armadura; Arsenal Mejorado: +1 a ataques y daño con arma especial)"],
    15:["Armadura Perfeccionada (Dreadnaught: d2×6 daño, Talla Gigante mejorada; Guardián: d1×10 daño, Reacción para atraer criaturas; Infiltrador: d2×6 daño, vuelo bonus con mod INT usos/descanso largo)"],
  },
  "Artillero": {
    3: ["Herramientas del Oficio (competencia armas a distancia marciales + herramientas de tallado; fabricación de varitas en la mitad de tiempo)","Hechizos de Artillerista","Cañón Arcano (crear cañón Pequeño/Muy Pequeño; Lanzallamas 2d8/cono 15ft, Ballesta de Fuerza 2d8+empuje, Protector 1d8+INT PG temp; Acción Bonus para activar)"],
    5: ["Arma Arcana (convertir arma en enfoque de conjuro; 1d8 bono a tiradas de daño de conjuros de Artífice)"],
    9: ["Cañón Explosivo (Detonar: reacción 3d10 Fuerza en 20ft; Poder de Fuego: +1d8 a daño del cañón y PG temporales de Protector)"],
    15:["Posición Fortificada (Disparo Doble: dos cañones simultáneos, misma Acción Bonus; Campo Brillante: Cobertura Mediana a 10ft del cañón para aliados)"],
  },
  "Herrero de Batalla": {
    3: ["Herramientas del Oficio (competencia Herramientas de Herrero; fabricación de armas en la mitad de tiempo)","Hechizos de Herrero de Batalla","Listo para Batallar (Empoderamiento Arcano: usar mod INT para ataques con armas mágicas; Conocimiento de Armas: competencia armas marciales, usar arma como enfoque)","Defensor de Acero (compañero constructo; CA=12+INT; PV=5+5×nv; Desgarrón Potenciado; Reparar 2d8+INT 3/día; Desviar Ataque reacción)"],
    5: ["Ataque Extra (puede renunciar a un ataque para que el Defensor use Desgarrón)"],
    9: ["Golpe Arcano (1 vez/turno al acertar: Energía Destructiva 2d6 Fuerza, o Energía Restauradora 2d6 curación a aliado en 30ft; usos=mod INT/descanso largo)"],
    15:["Defensor Mejorado (Descarga Mejorada: 4d6; Desviación Mejorada: 1d4+INT daño al atacante al usar Desviar)"],
  },
  "Cartógrafo": {
    3: ["Herramientas del Oficio (competencia Materiales de Caligrafía + Herramientas de Cartógrafo; fabricación de pergaminos en la mitad de tiempo)","Hechizos del Cartógrafo","Atlas del Aventurero (tras descanso largo: mapas mágicos para 1+INT criaturas; portadores: +1d4 Iniciativa, conocen posición mutua y pueden apuntar sin ver)","Magia de Mapeo (Fuego de Hada sin ranura usos=mod INT; Salto de Portal: gastar ½ movimiento para teleportarse 10ft o junto a portador de mapa)"],
    5: ["Precisión Guiada (1 vez/turno: añadir mod INT a daño de conjuros del Cartógrafo o ataques a objetivo con Fuego de Hada; no perder concentración en Fuego de Hada por daño)"],
    9: ["Movimiento Ingenioso (al usar Destello de Genio: tú o un aliado puede teleportarse 9m a un espacio visible)"],
    15:["Atlas Superior (Refugio Seguro: portador que caiga a 0 PG puede destruir mapa para recuperar 2×nv PG y teletransportarse; Camino Inquebrantable: Find the Path sin ranura 1/descanso largo)"],
  },
  // ── Ravenloft: Horrors Within ──────────────────────────────────────────────
  "Reanimador": {
    3: ["Conjuros de Reanimador","Impulso Vital (ampliar Spare the Dying: 1d6+nv PG al objetivo + 2d4 rayo a adyacentes, usos=mod INT)","Herramientas de Reanimador (competencia Utensilios Alquimistas)","Reanimado (compañero no-muerto: CA=10+INT+5×nv, Explosión Mortal 2d4 necrótico, Absorción Rayo)"],
    5: ["Modificaciones Extrañas (elegir 1 al crear el Reanimado: Conducto Arcano/Ferocidad/Modificación Reanimada)"],
    9: ["Reanimado Mejorado (Explosión Mortal 4d4, daño necrótico ignora resistencia)","Modificaciones Macabras (elegir 1 más: Hinchado/Escuálido/Húmedo)"],
    15:["Reanimación Refinada (Raise Dead sin espacio con herramientas; Transferencia de Vida: Reacción para ganar PG del compañero; 3 opciones para Modificaciones Superiores)"],
  },
  "Colegio de los Espíritus": {
    3: ["Susurros Guiadores (Orientación rango 60 ft)","Foco Espiritual (Juego de Mesa/Foco/Vela como foco de conjuro)","Invocar Espíritu (Bonus: dar dado IB y canalizar espíritu aleatorio de la tabla; desencadenar como Acción Mágica)"],
    6: ["Poderoso Más Allá (1/turno al conjurar: tirar 1d6 y añadir a daño o curación)","Manifestación Espiritual (Spirit Guardians siempre preparado, sin espacio 1/descanso; la mitad de cubierta para aliados en el área si se modifica)"],
    14:["Canalización Mística (tirar dado de IB dos veces al invocar espíritu, elegir efecto; si coinciden, elegir cualquiera)"],
  },
  "Dominio de la Tumba": {
    3: ["Conjuros de Dominio de la Tumba","Círculo de la Mortalidad (1d4 necrótico extra a criatura sin todos sus PG; Spare the Dying como Acción Bonus; máximo en dados de curación a criatura a 0 PG)","Camino a la Tumba (Canalizar Divinidad: maldecir criatura 30 ft, desventaja en ataque y TS; al acertar el aliado puede romper la maldición para añadir daño necrótico/radiante = nivel)"],
    6: ["Centinela a las Puertas de la Muerte (Reacción al golpear a ti o aliado Ensangrentado: reducir el daño a la mitad, usos=mod SAB)"],
    17:["Segadora Divina (Necronomía Mejorada: conjuros de nigromancia nv≤5 o de dominio afectan 2ª criatura; Guardiana de Almas: al morir enemigo a 60 ft, tú o aliado a 60 ft recupera PG=nivel Clérigo, 1/descanso)"],
  },
  "Guardián Hueco": {
    3: ["Conjuros de Guardián Hueco (Golpe Colérico, Alterar Yo, Fuerza Fantasmal, Dominar Bestia, Golpe Viento de Acero)","Cólera de lo Salvaje (Acción Bonus usando Enemigo Favorecido: 1 min, +1 CA (+2 nv 11), Represalia Acechadora, Aura Perturbadora (TS SAB o Aterrorizado))"],
    7: ["Devorador Hambriento (bono a TS de CON = mod SAB; 1/turno al acertar transformado y Ensangrentado: recuperar 1d10+SAB PG)"],
    11:["Podredumbre y Violencia (Aura Amenazadora: al fallar TS de Aura, sin recuperar PG ni Reacciones hasta sig. turno; Raíces Estrangulantes: activar maestría Cargada/Lenta adicional al acertar)"],
    15:["Poder Antiguo (Golpes Ominosos: daño extra=mod Explorador vs Aterrorizado; Cólera Persistente: al caer a 0 PG transformado, PG=2×nivel 1/descanso; Intemporal: Inmunidad a Agotamiento)"],
  },
  "Fantasma": {
    3: ["Lamentos de la Tumba (tras Ataque Furtivo: daño necrótico = ½ dados SA a 2ª criatura a 30 ft, usos=mod DES)","Susurros de los Muertos (en descanso: ganar competencia de habilidad/herramienta de los muertos)","Fichas del Difunto (2 fichas de alma: Toque Mortal/Esencia Vital/Consulta Espiritual; reacción al morir criatura a 30 ft para ganar ficha)","Hablar con los Muertos (sin espacio, mod DES, 1/descanso corto)"],
    9: ["Forma Fantasmal (Acción Bonus: 10 min, Vuelo 10 ft, ataques con desventaja contra ti, Movimiento Incorpóreo)"],
    13:["Umbral de la Muerte (Lamento de la Muerte: daño a ambas criaturas; Atracción de la Muerte: al sacar 1 en D20 Test sin fichas, ganar ficha)"],
    17:["Deambulación Mortífera (Paso de Sombra mejorado; Muerte Fantasmal: al matar criatura, recuperar 1 uso de Lamentos)"],
  },
  "Magia de las Sombras": {
    3: ["Conjuros de Sombra (Perdición, Oscuridad, Infligir Heridas, Paso sin Rastro; nv5: Hambre de Hadar, Silencio; nv7: Invisibilidad Mayor, Asesino Fantasmal; nv9: Plaga, Dominar Persona)","Poder de las Sombras (Visión en la Oscuridad 120 ft + Sentido Ciego 10 ft; en la oscuridad propia visión normal)","Forma de Pavor (Acción Bonus: 1 min, PG temp=1d10+nv, Inmunidad Aterrorizado; 1/turno TS SAB o Aterrorizado; usos=mod CAR)"],
    6: ["Bestias de Mal Agüero (3 PC: Invocar Bestia como Acción Bonus sin espacio sin concentración opcional 1 min; aliados en 5 ft de bestia: desventaja en TS contra tus conjuros)"],
    14:["Paso de Sombra (Acción Bonus: teleportar 120 ft entre zonas de luz tenue/oscuridad)"],
    18:["Forma Umbrosa (con Hechicería Innata: Movimiento Incorpóreo, Resistencia a todo daño salvo Fuerza y Radiante)"],
  },
  "Patrón No Muerto": {
    3: ["Conjuros de No-Muerto (Perdición, Ceguera/Sordera, Fuerza Fantasmal, Visión de la Muerte; nv5: Hablar con Muertos, Invocar No-Muerto; nv7: Invisibilidad Mayor, Asesino Fantasmal; nv9: Concha Anti-vida, Levantar Muertos)","Forma de Pavor (Acción Bonus, 1 min: PG temp=1d10+nv Brujo, Inmunidad Aterrorizado, al acertar forzar TS SAB o Aterrorizado hasta fin sig. turno; usos=mod CAR)"],
    6: ["Toque de la Tumba (Necrosis Arcana: daño necrótico ignora Resistencia; Necrosis Aterradora: +1 dado daño necrótico en Forma de Pavor; No Necesita Dormir ni ser envenenado/deshidratado)"],
    10:["Cuerpo Mortal (Resistencia a necrótico; en Forma de Pavor: Inmunidad necrótico; Resurrección Impía: al caer a 0 PG, 2d10+CAR daño necrótico en 30 ft, PG=2×nv Brujo, +1 Agotamiento 1/descanso)"],
    14:["Forma de Pavor Mejorada (Resistencia a golpe/filo/perforante; Vuelo Fantasmal: vuelo=velocidad, Movimiento Incorpóreo; Lanzamiento Profano: sin componentes V/S/M en conjuros Conjuración/Nigromancia salvo costosos)"],
  },
  // ── Héroes de Faerún ──────────────────────────────────────────────────────
  "Colegio de la Luna": {
    3: ["Conjuros del Colegio de la Luna (siempre preparados: Luz Lunar, Relámpago Cromático, Caída de Plumas, Detectar Magia; nv5: Nube de Dagas, Rayo, Levitar; nv7: Invocar Elemental del Aire, Relámpago; nv9: Convocar Dragón, Teletransporte)","Imagen de la Luna (Acción: creas un espejismo visual y auditivo de hasta 9 m³ a 9 m; dura 1 min; CD SAB = 8+bon. comp+INT; usos = bon. comp.; recupera tras DL)"],
    6: ["Magia de la Luna (Acción Bonus: puedes lanzar un conjuro de colegio de nivel 1-5 sin gastar ranura 1/turno; recuperas usos = bon. comp. tras DL)"],
    14:["Forma Lunar (Acción: te transformas en un lobo lunar de VD 3 durante 1 hora; ganas PG temp = nv bardo × 3; mantienes rasgos de clase; vuelta a la normalidad si caes a 0 PG; 1/DL)"],
  },
  "Dominio del Conocimiento": {
    3: ["Conjuros de Dominio del Conocimiento (Identificar, Proyectil Mágico; nv3: Sugestión, Levitar; nv5: Disipar Magia, Volar; nv7: Confusión, Arcanista Secreto; nv9: Telepatía, Muro de Fuerza)","Bendiciones del Conocimiento (pericia en 2 habilidades de Arcanos, Historia, Naturaleza o Religión)","Canal Divino: Conocimiento de las Edades (acción bonus: dominas una habilidad o herramienta durante 10 min; 1/descanso)"],
    6: ["Canal Divino: Leer Pensamientos (acción: leer los pensamientos de una criatura a 18 m; TS SAB CD = 8+bon. comp.+SAB; si falla quedas enterado de sus pensamientos superficiales durante 1 min y puedes lanzar Sugestión sin ranura; 1/descanso)"],
    17:["Visiones del Pasado (acción: concentración 1 min, ves el pasado de un objeto o lugar a tu alrededor; 1/DL)"],
  },
  "Caminante Invernal": {
    3: ["Conjuros del Caminante Invernal (Crear o Destruir Agua como Escarcha, Velocidad de la Hoja de Viento, Detectar Magia; nv3: Rayo de Frío, Oscuridad; nv5: Contrahechizo, Ventisca de Espadas; nv7: Libertad de Movimiento, Tormenta de Granizo; nv9: Conjurar Elemental [Aire/Agua], Cono de Frío)","Uno con el Hielo (ventaja en TS CON contra frío; resistencia al daño de frío; ignoras terreno difícil causado por hielo o nieve)","Envolvente Helado (reacción cuando golpeas con ataque: 1d8 daño frío adicional y objetivo reduce velocidad 3 m hasta inicio de tu siguiente turno; usos = bon. comp.; recupera tras DL)"],
    7: ["Presencia Aterradora del Invierno (aura 9 m: criaturas hostiles en el aura al inicio de su turno hacen TS SAB CD = 8+bon. comp.+SAB o no pueden tomar reacciones y mueven a la mitad hasta inicio de tu siguiente turno)"],
    11:["Glaciar (acción: concentración 1 min, área de 18 m de hielo a 30 m de ti; difícil para enemigos, no para aliados; 1/DL)"],
    15:["Heraldo del Invierno (inmunidad al daño de frío; tus conjuros de frío ignoran resistencia e inmunidad)"],
  },
  "Abanderado": {
    3: ["Presencia Galvanizadora (aura 9 m mientras estés consciente: aliados ganan bon. comp. en tiradas de iniciativa)","Posición Heroica (reacción cuando un aliado a 9 m es atacado: concedes +5 CA al aliado hasta el inicio de tu siguiente turno; usos = bon. comp.; recupera tras DL)"],
    7: ["Pancarta Protectora (los aliados en tu aura tienen ventaja en TS contra ser asustados o hechizados)"],
    10:["Inspiración Marcial (acción bonus: todos los aliados a 9 m que puedan verte u oírte obtienen inspiración heroica; 1/DL)"],
    15:["Pancarta Fortalecida (los aliados en tu aura obtienen +2 a las tiradas de ataque y TS mientras tú estés consciente)"],
    18:["Campeón Supremo (cuando usas Posición Heroica, también obtienes tú +5 CA hasta el inicio de tu siguiente turno)"],
  },
  "Hechicería del Fuego Mágico": {
    3: ["Conjuros del Fuego Mágico (Llama Sagrada truco; Ráfaga de Color, Detectar Magia; nv3: Arma Espiritual, Ceguera/Sordera; nv5: Disipar Magia, Luz del Día; nv7: Mano del Guardián, Purificar; nv9: Ira de la Naturaleza, Comunión)","Llama del Fuego Mágico (tu Llama Sagrada truco usa tu modificador de aptitud de Hechicero; 1/turno al impactar con un conjuro, puedes gastar 1 PC para añadir 1d6 daño radiante)","Escudo de Fuego Mágico (reacción cuando recibes daño: gastas 1 PC para reducir el daño en 1d6 + bon. comp.)"],
    6: ["Purificación de Fuego Mágico (la llama elimina un efecto mágico adverso en un aliado a 9 m; usos = bon. comp.; recupera tras DL)"],
    14:["Fuego Mágico Avivado (tus dados de daño de llama mágica son d8; gastas PC para añadir dados d8 adicionales; al impactar criatura con PG máx, añades bon. comp. al daño)"],
    18:["Ascensión del Fuego Mágico (1 acción: te envuelves en fuego mágico durante 1 min; vuelas velocidad caminata; inmunidad daño radiante; irradias 9 m de luz; criaturas hostiles que terminen turno en luz hacen TS CON CD = 8+bon. comp.+CAR o quedan cegadas; 1/DL)"],
  },
  "Hojacantante": {
    3: ["Conjuros del Hojacantante (Mensaje truco; Comprensión de Idiomas, Detectar Magia; nv3: Sugestión, Ver la Invisibilidad; nv5: Disipar Magia, Hablar con Muertos; nv7: Arcano Secreto, Plano Astral; nv9: Proyección Astral, Teletransporte)","Escritura Arcana (creas pergaminos de conjuro de nivel 1 a 5 gastando ranura + 1 hora por nivel; el pergamino lanza el conjuro a nivel base o al nivel deseado con ranura adicional)","Palabras de Poder (1/DL: al lanzar un conjuro del Hojacantante, puedes añadir un efecto adicional: marcar, silenciar o revelar la ubicación de la criatura)"],
    6: ["Escudo de Palabras (reacción cuando fallarías una TS de INT, SAB o CAR: puedes usar INT en su lugar; bon. comp. usos; recupera tras DL)"],
    10:["Pergamino Maestro (tus pergaminos pueden contener conjuros hasta nivel 7; CD de conjuro = tu CD de conjuro)"],
    14:["Arcanista Supremo (1/DL: lanza un conjuro del Hojacantante de cualquier nivel sin gastar ranura ni componentes materiales)"],
  },
  "Juramento de los Genios Nobles": {
    3: ["Conjuros del Juramento (Ráfaga de Color, Detectar Magia; nv3: Ver la Invisibilidad, Viento; nv5: Disipar Magia, Vuelo; nv7: Dimensión Puerta, Éter; nv9: Dominar Persona, Prisionero del Plano)","Canal Divino: Destierro de los Genios (acción: desterrar a una criatura a una semiesfera del Plano Elemental por 1 min; TS CAR CD = 8+bon. comp.+CAR; regresa si rompe concentración; 1/descanso)","Canal Divino: Deseos Concedidos (acción bonus: un aliado a 9 m recibe 1 deseo menor: PG temp = 10+nv paladín, ventaja en siguiente tirada, o velocidad +9 m hasta fin de turno; 1/descanso)"],
    7: ["Aura de los Genios (aura 9 m: aliados tienen resistencia a daño de ácido, frío, fuego, rayo o trueno —el tipo que elijas al obtener esta subclase—)"],
    15:["Capricho de los Genios (cuando un aliado en tu aura haga una tirada de ataque, prueba de característica o TS y obtenga un 1, puede repetirla; 1/aliado por descanso corto o largo)"],
    20:["Forma del Genio (acción: adoptas una forma etérea de genio durante 1 min; vuelas velocidad caminata; inmunidad al tipo de tu aura; gastas Canal Divino extra para lanzar Deseos Menores; 1/DL)"],
  },
  "Vástago de los Tres": {
    3: ["Don de los Tres (al nivel 3, elige un rasgo de Ladrón, Asesino o Embaucador Arcano; al nivel 9 elige un segundo don)","Acto Versátil (cuando aciertas Ataque Furtivo, elige un efecto adicional: +1d6 daño; cegar hasta fin de tu sig. turno; o reducir velocidad a 0 hasta inicio de tu sig. turno)"],
    9: ["Don de los Tres Mejorado (elige el segundo don de Ladrón, Asesino o Embaucador Arcano)","Acto Refinado (tus efectos de Acto Versátil no requieren acción adicional)"],
    13:["Síntesis de los Tres (cuando uses los tres rasgos en el mismo turno, recuperas usos de Acto Versátil gastados = bon. comp.)"],
    17:["Maestría Absoluta (1/DL: cuando no tengas inspiración heroica al inicio de tu turno, ganas inspiración heroica; además, Ataque Furtivo añade 2 dados de daño en lugar de 1 si ya tienes ventaja)"],
  },
};

// ─── Objetos Mágicos DMG 2024 ────────────────────────────────────────────────
// cat: Arma/Armadura/Varita/Anillo/Maravilloso/Pociones/Pergamino/Varilla/Báculo/Otros
// rar: Común/Poco común/Raro/Muy raro/Legendario | sint: requiere sintonización
const OBJETOS_MAGICOS_DB = [
  // ── Pociones ─────────────────────────────────────────────────────────────────
  { nombre:"Poción de curación",           cat:"Pociones",    rar:"Común",       sint:false, desc:"Recuperas 2d4+2 PG al beberla." },
  { nombre:"Poción de curación mayor",     cat:"Pociones",    rar:"Poco común",  sint:false, desc:"Recuperas 4d4+4 PG al beberla." },
  { nombre:"Poción de curación superior",  cat:"Pociones",    rar:"Raro",        sint:false, desc:"Recuperas 8d4+8 PG al beberla." },
  { nombre:"Poción de curación suprema",   cat:"Pociones",    rar:"Muy raro",    sint:false, desc:"Recuperas 10d4+20 PG al beberla." },
  { nombre:"Poción de gigante de la colina",cat:"Pociones",   rar:"Poco común",  sint:false, desc:"FUE 21 durante 1 hora (si tu FUE es menor)." },
  { nombre:"Poción de gigante de la piedra",cat:"Pociones",   rar:"Raro",        sint:false, desc:"FUE 23 durante 1 hora." },
  { nombre:"Poción de gigante de la escarcha",cat:"Pociones", rar:"Raro",        sint:false, desc:"FUE 23 durante 1 hora." },
  { nombre:"Poción de gigante del fuego",  cat:"Pociones",    rar:"Raro",        sint:false, desc:"FUE 25 durante 1 hora." },
  { nombre:"Poción de gigante de las nubes",cat:"Pociones",   rar:"Muy raro",    sint:false, desc:"FUE 27 durante 1 hora." },
  { nombre:"Poción de gigante de las tormentas",cat:"Pociones",rar:"Legendario", sint:false, desc:"FUE 29 durante 1 hora." },
  { nombre:"Poción de heroísmo",           cat:"Pociones",    rar:"Poco común",  sint:false, desc:"Ganas 10 PG temporales y el estado Bendecido durante 1 hora." },
  { nombre:"Poción de invisibilidad",      cat:"Pociones",    rar:"Muy raro",    sint:false, desc:"Te vuelves invisible durante 1 hora (termina si atacas o lanzas conjuro)." },
  { nombre:"Poción de resistencia",        cat:"Pociones",    rar:"Poco común",  sint:false, desc:"Resistencia a un tipo de daño durante 1 hora." },
  { nombre:"Poción de velocidad",          cat:"Pociones",    rar:"Raro",        sint:false, desc:"Como bajo efecto del conjuro Apresuramiento durante 1 minuto." },
  { nombre:"Poción de vuelo",              cat:"Pociones",    rar:"Muy raro",    sint:false, desc:"Velocidad de vuelo 18 m durante 1 hora." },
  { nombre:"Poción de veneno",             cat:"Pociones",    rar:"Poco común",  sint:false, desc:"Veneno: 3d6 veneno y Envenenado 1 hora (sal. CON CD 10 niega)." },
  // ── Pergaminos de conjuro ─────────────────────────────────────────────────────
  { nombre:"Pergamino de conjuro (truco)", cat:"Pergamino",   rar:"Común",       sint:false, desc:"Contiene un conjuro de nivel 0. Cualquier clase puede intentar usarlo." },
  { nombre:"Pergamino de conjuro (niv. 1)",cat:"Pergamino",   rar:"Común",       sint:false, desc:"Conjuro de nivel 1. CD de conjuro 13, ataque +5." },
  { nombre:"Pergamino de conjuro (niv. 2)",cat:"Pergamino",   rar:"Poco común",  sint:false, desc:"Conjuro de nivel 2. CD 13, ataque +5." },
  { nombre:"Pergamino de conjuro (niv. 3)",cat:"Pergamino",   rar:"Poco común",  sint:false, desc:"Conjuro de nivel 3. CD 15, ataque +7." },
  { nombre:"Pergamino de conjuro (niv. 4)",cat:"Pergamino",   rar:"Raro",        sint:false, desc:"Conjuro de nivel 4. CD 15, ataque +7." },
  { nombre:"Pergamino de conjuro (niv. 5)",cat:"Pergamino",   rar:"Raro",        sint:false, desc:"Conjuro de nivel 5. CD 17, ataque +9." },
  // ── Armas mágicas: usa "Bon. mág." (+1/+2/+3) y "Prop. mágica" en la tabla de armas.
  // Ejemplos de propiedad: Matagigantes, Matadragones, Vorpal, Llameante, Solar,
  // Lanza del Cazador, Arco de Velocidad, Cuchilla de Destrucción, etc.
  // ── Armaduras mágicas (usa el campo Bono +X en la tabla de armaduras para +1/+2/+3) ──
  { nombre:"Armadura de invulnerabilidad", cat:"Armadura",    rar:"Legendario",  sint:true,  desc:"Armadura de placas. 1/día: inmunidad a daño no mágico durante 10 minutos." },
  { nombre:"Armadura de escamas de dragón",cat:"Armadura",    rar:"Muy raro",    sint:true,  desc:"+1 CA. Ventaja en sal. contra Aliento de dragón del mismo tipo. Resistencia al daño de ese tipo." },
  { nombre:"Armadura adamantina",          cat:"Armadura",    rar:"Poco común",  sint:false, desc:"Los impactos contra ti nunca son críticos." },
  { nombre:"Armadura de mitril",           cat:"Armadura",    rar:"Poco común",  sint:false, desc:"Cualquier desventaja de armadura media o pesada desaparece. Sin requisito de FUE." },
  // ── Anillos ───────────────────────────────────────────────────────────────────
  { nombre:"Anillo de protección",         cat:"Anillo",      rar:"Raro",        sint:true,  desc:"+1 CA y a todas las tiradas de salvación." },
  { nombre:"Anillo de invisibilidad",      cat:"Anillo",      rar:"Legendario",  sint:true,  desc:"Invisible mientras lo lleves (termina si atacas o lanzas conjuro)." },
  { nombre:"Anillo de resistencia",        cat:"Anillo",      rar:"Raro",        sint:true,  desc:"Resistencia a un tipo de daño (según gema engarzada)." },
  { nombre:"Anillo de guardar conjuros",   cat:"Anillo",      rar:"Raro",        sint:true,  desc:"Almacena hasta 5 niveles de conjuros. Cualquier portador puede lanzarlos (CD 17)." },
  { nombre:"Anillo de tres deseos",        cat:"Anillo",      rar:"Legendario",  sint:true,  desc:"3 cargas. Gasta 1 para lanzar el conjuro Deseo." },
  { nombre:"Anillo de caminar por el agua",cat:"Anillo",      rar:"Poco común",  sint:false, desc:"Puedes caminar sobre superficies líquidas como si fueran suelo firme." },
  { nombre:"Anillo de caída de pluma",     cat:"Anillo",      rar:"Poco común",  sint:true,  desc:"Cuando caes, desciendes lentamente (18 m/asalto) sin daño al aterrizar." },
  // ── Varitas ───────────────────────────────────────────────────────────────────
  { nombre:"Varita de proyectiles mágicos",cat:"Varita",      rar:"Común",       sint:false, desc:"7 cargas. Gasta 1 para lanzar Proyectil mágico (5 dardos). Recarga 1d6+1/día." },
  { nombre:"Varita de bolas de fuego",     cat:"Varita",      rar:"Raro",        sint:true,  desc:"7 cargas. Gasta cargas para lanzar Bola de fuego (1 carga/nivel, CD 15). Recarga 1d6+1/día." },
  { nombre:"Varita del mago de guerra +1", cat:"Varita",      rar:"Poco común",  sint:true,  desc:"+1 ataque de conjuro. Al lanzar Proyectil mágico, añade +1 dardo." },
  { nombre:"Varita del mago de guerra +2", cat:"Varita",      rar:"Raro",        sint:true,  desc:"+2 ataque de conjuro." },
  { nombre:"Varita del mago de guerra +3", cat:"Varita",      rar:"Muy raro",    sint:true,  desc:"+3 ataque de conjuro." },
  { nombre:"Varita de metamagia",          cat:"Varita",      rar:"Raro",        sint:true,  desc:"5 cargas. Gasta 1 para ignorar componentes M (no consumibles) en un conjuro." },
  // ── Báculos ───────────────────────────────────────────────────────────────────
  { nombre:"Báculo de curación",           cat:"Báculo",      rar:"Raro",        sint:true,  desc:"10 cargas. Gasta para lanzar Curar heridas (1c), Restaurar menor (2c) o Restaurar mayor (5c). Recarga 1d6+4/día." },
  { nombre:"Báculo de poder",              cat:"Báculo",      rar:"Muy raro",    sint:true,  desc:"20 cargas. Puede lanzar múltiples conjuros. Puede usar como +2 a ataque/daño. Recarga 2d8+4/día." },
  { nombre:"Báculo del mago",              cat:"Báculo",      rar:"Raro",        sint:true,  desc:"20 cargas. Lanza hasta 10 conjuros distintos (1–7 cargas). Recarga 2d8+4/día." },
  // ── Objetos maravillosos ──────────────────────────────────────────────────────
  { nombre:"Bolsa de transporte",          cat:"Maravilloso", rar:"Poco común",  sint:false, desc:"Espacio interior de 4×4×4 pies. Puede contener hasta 500 lb / 64 pies³. Pesa siempre 15 lb." },
  { nombre:"Capa de invisibilidad",        cat:"Maravilloso", rar:"Legendario",  sint:true,  desc:"Invisible mientras la lleves. Termina si atacas, lanzas conjuro o te la quitas." },
  { nombre:"Capa de protección",           cat:"Maravilloso", rar:"Poco común",  sint:true,  desc:"+1 CA y a todas las tiradas de salvación." },
  { nombre:"Capa de desplazamiento",       cat:"Maravilloso", rar:"Raro",        sint:true,  desc:"Proyecta una imagen desplazada de ti. Los atacantes tienen desventaja hasta que te impacten." },
  { nombre:"Botas de velocidad",           cat:"Maravilloso", rar:"Raro",        sint:true,  desc:"Tu velocidad se duplica. Puedes hacer una acción adicional por turno (1 hora). Recarga tras descanso largo." },
  { nombre:"Botas élvicas",               cat:"Maravilloso", rar:"Poco común",  sint:true,  desc:"Tus pasos no hacen ruido. Ventaja en pruebas de Sigilo con movimiento." },
  { nombre:"Guanteletes de la fuerza del ogro",cat:"Maravilloso",rar:"Poco común",sint:true, desc:"FUE 19 mientras los lleves (si tu FUE es menor)." },
  { nombre:"Cinturón de la fuerza del gigante",cat:"Maravilloso",rar:"Poco común",sint:true, desc:"FUE 21-29 según variante de cinturón (colina/piedra/escarcha/fuego/nubes/tormentas)." },
  { nombre:"Gemas de visión",              cat:"Maravilloso", rar:"Raro",        sint:true,  desc:"Visión verdadera 60 pies durante 10 minutos. 3 cargas, recarga al amanecer." },
  { nombre:"Cabeza de carnero iridiscente",cat:"Maravilloso", rar:"Legendario",  sint:true,  desc:"3 cargas. Gasta para empujar, aturdir o matar a criaturas (CD 17 sal. CON)." },
  { nombre:"Bolsa de truco",               cat:"Maravilloso", rar:"Poco común",  sint:false, desc:"3 usos/día. Saca un animal pequeño que sigue tus órdenes durante 1 hora." },
  { nombre:"Cuerno de demolición",         cat:"Maravilloso", rar:"Raro",        sint:false, desc:"Soplar: los cristales y la cerámica en 18 m se rompen. Concentración de un conjuro de 5 m cuadrados." },
  { nombre:"Espejo del conjuro",           cat:"Maravilloso", rar:"Raro",        sint:false, desc:"Refleja el siguiente conjuro de nivel 1-5 que te sea lanzado de vuelta a su origen." },
  { nombre:"Collar de adaptación",         cat:"Maravilloso", rar:"Poco común",  sint:true,  desc:"Puedes respirar en cualquier ambiente (incluso bajo el agua o sin aire)." },
  { nombre:"Manual de ejercitación",       cat:"Maravilloso", rar:"Muy raro",    sint:false, desc:"Al leer (48h en 6 días): FUE +2 (máximo 24) de forma permanente." },
  { nombre:"Tomo de claridad mental",      cat:"Maravilloso", rar:"Muy raro",    sint:false, desc:"Al leer (48h en 6 días): INT +2 (máximo 24) de forma permanente." },
  { nombre:"Tomo de comprensión",          cat:"Maravilloso", rar:"Muy raro",    sint:false, desc:"Al leer (48h en 6 días): SAB +2 (máximo 24) de forma permanente." },
];

const OBJETOS_CAT = [...new Set(OBJETOS_MAGICOS_DB.map(o => o.cat))];
const OBJETOS_RAR_ORDEN = ["Común","Poco común","Raro","Muy raro","Legendario"];

const mkHabMap = () => Object.fromEntries(HABS.map(h => [h.id, false]));

const mkChar = () => ({
  nombre: "", jugador: "", especie: "",
  progresion: [{ clase: "", subclase: "", niveles: 1 }],
  trasfondo: "", xp: 0, alineamiento: "", divinidad: "", inspiracion: false,
  trasfondoAplicado: "", asiAplicado: {}, profClases: {},
  trasfondoModo: "sugerido",       // "sugerido" | "tres1"
  trasfondoAsiLibre: ["","",""],   // para modo tres1 + Personalizado: 3 attrs con +1
  trasfondoAsiCustom: ["",""],     // para modo sugerido: [attr+2, attr+1]
  trasfondoDoteCustom: "",         // solo para Personalizado: dote de origen elegida
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
  armas: [], armaduras: [], objetosMagicos: [],
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

function TabBasico({ char, u, un, handleTrasfondo, handleTrasfondoModo, handleAsiLibreChange, handleAsiCustomChange, handleTrasfondoDoteCustom, handleProgClase, handleProgHab }) {
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

        {char.progresion.map((p, i) => {
          const profData  = PROF_CLASE[p.clase];
          const habEleg   = char.profClases[p.clase]?.hab || [];
          const opciones  = profData ? (profData.ops || HABS.map(h => h.id)) : [];

          return (
            <div key={i} style={{ marginBottom: 10 }}>
              {/* Fila principal */}
              <div style={{ display: "grid",
                gridTemplateColumns: "1fr 1fr 88px auto", gap: 6, marginBottom: 4,
                alignItems: "center" }}>

                <select value={p.clase}
                  onChange={e => handleProgClase(i, e.target.value)}
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

              {/* Panel de proficiencias de la clase */}
              {profData && (
                <div style={{
                  background: P.surface, border: `1px solid ${P.borderDim}`,
                  borderRadius: 4, padding: "8px 10px", fontSize: 12,
                }}>
                  <div style={{ marginBottom: 6, color: P.textDim }}>
                    <span style={{ color: P.gold }}>✦ Salvaciones auto-aplicadas: </span>
                    {profData.salv.map(s => ATTR_NOMBRE[s]).join(", ")}
                    <span style={{ marginLeft: 10, color: habEleg.length >= profData.n ? "#7fc47f" : P.textDim }}>
                      · Habilidades: {habEleg.length}/{profData.n}
                      {habEleg.length >= profData.n ? " ✓" : " (elige)"}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px" }}>
                    {opciones.map(habId => {
                      const hab = HABS.find(h => h.id === habId);
                      if (!hab) return null;
                      const checked   = habEleg.includes(habId);
                      const bloqueado = !checked && habEleg.length >= profData.n;
                      return (
                        <label key={habId} style={{
                          display: "flex", alignItems: "center", gap: 5,
                          cursor: bloqueado ? "not-allowed" : "pointer",
                          opacity: bloqueado ? 0.35 : 1, color: checked ? P.goldLt : P.text,
                        }}>
                          <input type="checkbox" checked={checked}
                            disabled={bloqueado}
                            onChange={e => handleProgHab(p.clase, habId, e.target.checked)}
                            style={{ accentColor: P.gold, cursor: "pointer" }} />
                          {hab.nombre}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

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

        {/* Panel de ASI de trasfondo */}
        {char.trasfondo && (
          <div style={{ marginTop: 10 }}>
            {/* Toggle de modo */}
            <div style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: P.textDim }}>Bonificación de Característica:</span>
              {["sugerido","tres1"].map(m => (
                <button key={m} onClick={() => handleTrasfondoModo(m)} style={{
                  padding: "3px 10px", borderRadius: 4, fontSize: 11, cursor: "pointer",
                  border: `1px solid ${char.trasfondoModo === m ? P.gold : P.borderDim}`,
                  background: char.trasfondoModo === m ? `${P.gold}25` : "transparent",
                  color: char.trasfondoModo === m ? P.gold : P.textDim,
                }}>
                  {m === "sugerido" ? "+2 / +1 sugerido" : "Tres +1 (libre)"}
                </button>
              ))}
            </div>

            {/* Modo sugerido + trasfondo estándar: elige +2 y +1 entre las 3 características del trasfondo */}
            {char.trasfondoModo === "sugerido" && char.trasfondo !== "Personalizado" && datosT && (() => {
              const asiStats = datosT.asi; // array de 3 características
              const sel = char.trasfondoAsiCustom || ["",""];
              return (
                <div style={{ background: `${P.gold}12`, border: `1px solid ${P.gold}45`,
                  borderRadius: 5, padding: "10px 12px", fontSize: 12 }}>
                  <div style={{ color: P.gold, fontFamily: "Cinzel, serif",
                    fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                    ✦ Reparte +2 y +1 entre las 3 características del trasfondo
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
                    <Field label="+2 a característica">
                      <select value={sel[0]}
                        onChange={e => handleAsiCustomChange(0, e.target.value)}
                        style={{ ...baseInput, cursor: "pointer" }}>
                        <option value="">— elige —</option>
                        {asiStats.filter(a => a !== sel[1]).map(a =>
                          <option key={a} value={a}>{ATTR_NOMBRE[a]}</option>
                        )}
                      </select>
                    </Field>
                    <Field label="+1 a característica">
                      <select value={sel[1]}
                        onChange={e => handleAsiCustomChange(1, e.target.value)}
                        style={{ ...baseInput, cursor: "pointer" }}>
                        <option value="">— elige —</option>
                        {asiStats.filter(a => a !== sel[0]).map(a =>
                          <option key={a} value={a}>{ATTR_NOMBRE[a]}</option>
                        )}
                      </select>
                    </Field>
                  </div>
                  <div style={{ fontSize: 11, color: P.textDim }}>
                    La tercera característica ({asiStats.filter(a => a !== sel[0] && a !== sel[1]).map(a => ATTR_NOMBRE[a]).join("") || "—"}) no recibe bonificación.
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", fontSize: 11, color: P.textDim, marginTop: 6 }}>
                    <div><span>Competencias: </span>
                      <span style={{ color: P.text }}>{datosT.habilidades.map(id => HABS.find(h => h.id === id)?.nombre).join(", ")}</span>
                    </div>
                    <div><span>Herramienta: </span><span style={{ color: P.text }}>{datosT.herramienta}</span></div>
                    <div><span>Dote: </span><span style={{ color: P.goldLt }}>{datosT.dote}</span></div>
                  </div>
                </div>
              );
            })()}

            {/* Modo sugerido + Personalizado: elige libremente +2 y +1 (de las 6 características) + dote */}
            {char.trasfondoModo === "sugerido" && char.trasfondo === "Personalizado" && (
              <div style={{ background: `${P.gold}12`, border: `1px solid ${P.gold}45`,
                borderRadius: 5, padding: "10px 12px", fontSize: 12 }}>
                <div style={{ color: P.gold, fontFamily: "Cinzel, serif",
                  fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  ✦ Elige características para +2 y +1, y tu dote de origen
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                  <Field label="+2 a característica">
                    <select value={(char.trasfondoAsiCustom||["",""])[0]}
                      onChange={e => handleAsiCustomChange(0, e.target.value)}
                      style={{ ...baseInput, cursor: "pointer" }}>
                      <option value="">— elige —</option>
                      {ATTRS.map(a => <option key={a} value={a}>{ATTR_NOMBRE[a]}</option>)}
                    </select>
                  </Field>
                  <Field label="+1 a característica">
                    <select value={(char.trasfondoAsiCustom||["",""])[1]}
                      onChange={e => handleAsiCustomChange(1, e.target.value)}
                      style={{ ...baseInput, cursor: "pointer" }}>
                      <option value="">— elige —</option>
                      {ATTRS.filter(a => a !== (char.trasfondoAsiCustom||["",""])[0]).map(a => <option key={a} value={a}>{ATTR_NOMBRE[a]}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Dote de origen">
                  <select value={char.trasfondoDoteCustom || ""}
                    onChange={e => handleTrasfondoDoteCustom(e.target.value)}
                    style={{ ...baseInput, cursor: "pointer" }}>
                    <option value="">— elige dote —</option>
                    {DOTES_ORIGEN.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
                <div style={{ marginTop: 8, color: P.textDim, fontSize: 11 }}>
                  Las habilidades y herramienta de herramienta se marcan manualmente en las pestañas correspondientes.
                </div>
              </div>
            )}

            {/* Modo tres +1 + trasfondo estándar: las 3 características del trasfondo suben +1 automáticamente */}
            {char.trasfondoModo === "tres1" && char.trasfondo !== "Personalizado" && datosT && (
              <div style={{ background: `${P.gold}12`, border: `1px solid ${P.gold}45`,
                borderRadius: 5, padding: "10px 12px", fontSize: 12 }}>
                <div style={{ color: P.gold, fontFamily: "Cinzel, serif",
                  fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  ✦ Las tres características del trasfondo suben +1 cada una
                </div>
                <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                  {datosT.asi.map(a => (
                    <div key={a} style={{ background: `${P.gold}22`, border: `1px solid ${P.gold}55`,
                      borderRadius: 4, padding: "4px 10px", textAlign: "center" }}>
                      <div style={{ color: P.gold, fontSize: 13, fontWeight: "bold" }}>+1</div>
                      <div style={{ color: P.text, fontSize: 11 }}>{ATTR_NOMBRE[a]}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", fontSize: 11, color: P.textDim }}>
                  <div><span>Competencias: </span>
                    <span style={{ color: P.text }}>{datosT.habilidades.map(id => HABS.find(h=>h.id===id)?.nombre).join(", ")}</span>
                  </div>
                  <div><span>Herramienta: </span><span style={{ color: P.text }}>{datosT.herramienta}</span></div>
                  <div><span>Dote: </span><span style={{ color: P.goldLt }}>{datosT.dote}</span></div>
                </div>
              </div>
            )}

            {/* Modo tres +1 + Personalizado: el jugador elige las 3 características y la dote */}
            {char.trasfondoModo === "tres1" && char.trasfondo === "Personalizado" && (
              <div style={{ background: `${P.gold}12`, border: `1px solid ${P.gold}45`,
                borderRadius: 5, padding: "10px 12px", fontSize: 12 }}>
                <div style={{ color: P.gold, fontFamily: "Cinzel, serif",
                  fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  ✦ Elige las tres características que suben +1 y tu dote de origen
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
                  {[0,1,2].map(idx => {
                    const elegidas = (char.trasfondoAsiLibre||["","",""]).filter((_,j)=>j!==idx).filter(Boolean);
                    return (
                      <Field key={idx} label={`+1 · opción ${idx+1}`}>
                        <select value={(char.trasfondoAsiLibre||["","",""])[idx]}
                          onChange={e => handleAsiLibreChange(idx, e.target.value)}
                          style={{ ...baseInput, cursor: "pointer" }}>
                          <option value="">— elige —</option>
                          {ATTRS.filter(a => !elegidas.includes(a)).map(a => <option key={a} value={a}>{ATTR_NOMBRE[a]}</option>)}
                        </select>
                      </Field>
                    );
                  })}
                </div>
                <Field label="Dote de origen">
                  <select value={char.trasfondoDoteCustom || ""}
                    onChange={e => handleTrasfondoDoteCustom(e.target.value)}
                    style={{ ...baseInput, cursor: "pointer" }}>
                    <option value="">— elige dote —</option>
                    {DOTES_ORIGEN.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
                <div style={{ marginTop: 8, color: P.textDim, fontSize: 11 }}>
                  Las habilidades y herramienta se marcan manualmente en las pestañas correspondientes.
                </div>
              </div>
            )}
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
          {char.dotes.map((d, i) => {
            const dataDote = DATOS_DOTE[d.nombre] || null;
            const descAuto = dataDote ? dataDote.desc : "";
            const asiInfo  = dataDote ? dataDote.asi : null;
            return (
              <div key={i} style={{
                background: P.surface, border: `1px solid ${P.border}`,
                borderRadius: 5, padding: 10, display: "grid",
                gridTemplateColumns: "1fr auto", gap: 8, alignItems: "start",
              }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <input value={d.nombre}
                    onChange={e => {
                      const nombre = e.target.value;
                      const datos = DATOS_DOTE[nombre];
                      u("dotes", char.dotes.map((x, j) => j === i ? { ...x, nombre, desc: datos ? datos.desc : x.desc } : x));
                    }}
                    placeholder="Nombre de la dote"
                    list="dotes-list"
                    style={{ ...baseInput, fontWeight: 700, color: P.goldLt }} />
                  {descAuto && (
                    <div style={{ fontSize: 12, color: P.textDim, lineHeight: 1.5,
                      background: P.card, borderRadius: 4, padding: "6px 8px",
                      border: `1px solid ${P.borderDim}` }}>
                      {descAuto}
                    </div>
                  )}
                  {asiInfo && (
                    <div style={{ fontSize: 11, color: P.gold, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ fontWeight: 700 }}>ASI:</span>
                      {asiInfo.elige ? (
                        <span>+{asiInfo.elige} a característica elegida
                          {asiInfo.opciones ? ` (${asiInfo.opciones.map(a => ATTR_CORTO[a]).join("/")})` : ""}
                        </span>
                      ) : (
                        Object.entries(asiInfo).map(([a, v]) =>
                          <span key={a}>{ATTR_NOMBRE[a] || a} +{v}</span>
                        )
                      )}
                      {ATTRS.filter(a => asiInfo[a]).map(a => (
                        <div key={a} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span>{ATTR_CORTO[a]}</span>
                          <Num value={d.asi?.[a] || 0}
                            onChange={v => {
                              const newAsi = { ...(d.asi || {}), [a]: v };
                              u("dotes", char.dotes.map((x, j) => j === i ? { ...x, asi: newAsi } : x));
                            }}
                            min={0} max={asiInfo[a]}
                            style={{ width: 50, textAlign: "center" }} />
                        </div>
                      ))}
                    </div>
                  )}
                  <textarea value={d.desc}
                    onChange={e => u("dotes", char.dotes.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))}
                    placeholder={descAuto ? "Notas adicionales..." : "Descripción del beneficio..."}
                    rows={descAuto ? 1 : 2}
                    style={{ ...baseInput, resize: "vertical", lineHeight: 1.5, fontSize: 12,
                      color: P.textDim }} />
                </div>
                <button
                  onClick={() => u("dotes", char.dotes.filter((_, j) => j !== i))}
                  style={{ background: "transparent", border: "none",
                    color: P.crimsonLt, cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 0 }}>
                  ✕
                </button>
              </div>
            );
          })}
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

      {/* Rasgos de Clase (automáticos) */}
      <Card>
        <SecTitle>Rasgos de Clase y Subclase</SecTitle>
        {char.progresion.filter(p => p.clase).length === 0 ? (
          <div style={{ fontSize: 12, color: P.textDim }}>Añade clases en la pestaña Personaje para ver los rasgos automáticamente.</div>
        ) : (
          char.progresion.filter(p => p.clase).map((prog, pi) => {
            const claseFeat = RASGOS_CLASE[prog.clase] || {};
            const subFeat   = prog.subclase ? (RASGOS_SUBCLASE[prog.subclase] || {}) : {};
            // Reunir todos los niveles del 1 al nivel actual de esta clase
            const filas = [];
            for (let nv = 1; nv <= (prog.niveles || 1); nv++) {
              const cRasgos = claseFeat[nv] || [];
              const sRasgos = subFeat[nv]   || [];
              if (cRasgos.length || sRasgos.length) {
                filas.push({ nv, cRasgos, sRasgos });
              }
            }
            return (
              <div key={pi} style={{ marginBottom: pi < char.progresion.filter(p=>p.clase).length-1 ? 14 : 0 }}>
                <div style={{ fontSize: 13, fontFamily: "Cinzel, serif", color: P.gold,
                  fontWeight: 700, marginBottom: 6, borderBottom: `1px solid ${P.borderDim}`, paddingBottom: 4 }}>
                  {prog.clase} (Nv. {prog.niveles || 1})
                  {prog.subclase ? <span style={{ color: P.goldLt, fontWeight: 400, fontSize: 12 }}> · {prog.subclase}</span> : null}
                </div>
                <div style={{ display: "grid", gap: 4 }}>
                  {filas.map(({ nv, cRasgos, sRasgos }) => (
                    <div key={nv} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 6, alignItems: "start" }}>
                      <div style={{ fontSize: 10, color: P.textDim, fontFamily: "Cinzel, serif",
                        background: P.surface, borderRadius: 3, textAlign: "center", padding: "2px 0", marginTop: 2 }}>
                        {nv}
                      </div>
                      <div style={{ fontSize: 12, lineHeight: 1.6 }}>
                        {cRasgos.map((r, ri) => (
                          <span key={ri} style={{ color: P.text }}>
                            {ri > 0 && <span style={{ color: P.textDim }}> · </span>}{r}
                          </span>
                        ))}
                        {sRasgos.map((r, ri) => (
                          <span key={"s"+ri} style={{ color: P.goldLt }}>
                            {(cRasgos.length > 0 || ri > 0) && <span style={{ color: P.textDim }}> · </span>}{r}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {filas.length === 0 && (
                    <div style={{ fontSize: 12, color: P.textDim }}>Sin rasgos registrados para estos niveles.</div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div style={{ marginTop: 10, borderTop: `1px solid ${P.borderDim}`, paddingTop: 8 }}>
          <div style={{ fontSize: 11, color: P.textDim, marginBottom: 4 }}>Rasgos de especie y notas adicionales:</div>
          <Ta value={char.rasgosEspeciales}
            onChange={v => u("rasgosEspeciales", v)}
            placeholder="Rasgos de especie, habilidades especiales, notas..." rows={3} />
        </div>
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
  const [nuevoArma, setNuevoArma] = useState("");
  const [nuevaArmadura, setNuevaArmadura] = useState("");
  const [nuevoObjeto, setNuevoObjeto] = useState("");
  const [filtroObjetoCat, setFiltroObjetoCat] = useState("");

  const monedas = [
    { k: "pp", label: "Platino",  color: "#d0d8e8" },
    { k: "po", label: "Oro",      color: P.gold },
    { k: "pe", label: "Electro",  color: "#8ab8c8" },
    { k: "pa", label: "Plata",    color: "#c0c0c0" },
    { k: "pc", label: "Cobre",    color: "#c87838" },
  ];

  const addArma = () => {
    const base = ARMAS_DB.find(a => a.nombre === nuevoArma);
    if (!base) return;
    u("armas", [...(char.armas || []), { ...base, bonus: 0, notas: "" }]);
    setNuevoArma("");
  };

  const addArmadura = () => {
    const base = ARMADURAS_DB.find(a => a.nombre === nuevaArmadura);
    if (!base) return;
    u("armaduras", [...(char.armaduras || []), { ...base, bonus: 0, equipada: false }]);
    setNuevaArmadura("");
  };

  const addObjeto = () => {
    const base = OBJETOS_MAGICOS_DB.find(o => o.nombre === nuevoObjeto);
    if (!base) return;
    u("objetosMagicos", [...(char.objetosMagicos || []), { ...base, sintonizado: false, notas: "" }]);
    setNuevoObjeto("");
  };

  const thStyle = { fontSize: 10, color: P.textDim, fontFamily: "Cinzel, serif",
    textTransform: "uppercase", letterSpacing: "0.06em", padding: "4px 6px",
    borderBottom: `1px solid ${P.borderDim}`, textAlign: "left" };
  const tdStyle = { fontSize: 12, padding: "5px 6px", borderBottom: `1px solid ${P.borderDim}` };

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

      {/* Armas */}
      <Card>
        <SecTitle>Armas</SecTitle>
        <div style={{ fontSize: 10, color: P.textDim, marginBottom: 8 }}>
          El bono mágico (+1/+2/+3) se aplica directamente en la columna <strong style={{ color: P.gold }}>Bon. mág.</strong> de cada arma.
        </div>
        {(char.armas || []).length > 0 && (
          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Arma</th>
                  <th style={thStyle}>Daño</th>
                  <th style={thStyle}>Tipo</th>
                  <th style={thStyle}>Propiedades</th>
                  <th style={thStyle}>Maestría</th>
                  <th style={{ ...thStyle, width: 60 }}>Bon. mág.</th>
                  <th style={{ ...thStyle, minWidth: 120 }}>Prop. mágica</th>
                  <th style={{ ...thStyle, width: 30 }}></th>
                </tr>
              </thead>
              <tbody>
                {(char.armas || []).map((a, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? P.surface : "transparent" }}>
                    <td style={{ ...tdStyle, fontWeight: 700, color: P.goldLt }}>{a.nombre}</td>
                    <td style={tdStyle}>{a.dano}</td>
                    <td style={{ ...tdStyle, fontSize: 10, color: P.textDim }}>
                      {a.cat === "marcial" ? "Marcial" : "Simple"} {a.tipo === "melee" ? "CaC" : "Dist."}
                    </td>
                    <td style={{ ...tdStyle, fontSize: 11, color: P.textDim }}>{a.props}</td>
                    <td style={{ ...tdStyle, fontSize: 11, color: P.gold }}>{a.maestria}</td>
                    <td style={tdStyle}>
                      <Num value={a.bonus || 0}
                        onChange={v => u("armas", (char.armas||[]).map((x,j) => j===i ? {...x, bonus:v} : x))}
                        min={0} max={3}
                        style={{ width: 50, textAlign: "center" }} />
                    </td>
                    <td style={tdStyle}>
                      <input value={a.propMagica || ""}
                        onChange={e => u("armas", (char.armas||[]).map((x,j) => j===i ? {...x, propMagica: e.target.value} : x))}
                        style={{ ...baseInput, fontSize: 11, padding: "2px 4px", width: "100%" }}
                        placeholder="Matagigantes, Llameante…" />
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => u("armas", (char.armas||[]).filter((_,j) => j!==i))}
                        style={{ background: "transparent", border: "none", color: P.crimsonLt,
                          cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0 }}>✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select value={nuevoArma} onChange={e => setNuevoArma(e.target.value)}
            style={{ ...baseInput, flex: 1 }}>
            <option value="">— Seleccionar arma —</option>
            <optgroup label="Simples">
              {ARMAS_DB.filter(a => a.cat === "simple").map(a => (
                <option key={a.nombre} value={a.nombre}>{a.nombre} ({a.dano})</option>
              ))}
            </optgroup>
            <optgroup label="Marciales">
              {ARMAS_DB.filter(a => a.cat === "marcial").map(a => (
                <option key={a.nombre} value={a.nombre}>{a.nombre} ({a.dano})</option>
              ))}
            </optgroup>
          </select>
          <Btn onClick={addArma} variant="gold" disabled={!nuevoArma}>+ Añadir</Btn>
        </div>
      </Card>

      {/* Armaduras */}
      <Card>
        <SecTitle>Armaduras y Escudos</SecTitle>
        <div style={{ fontSize: 10, color: P.textDim, marginBottom: 8 }}>
          El bono mágico (+1/+2/+3) se aplica en la columna <strong style={{ color: P.gold }}>Bon. mág.</strong> de la armadura equipada.
        </div>
        {(char.armaduras || []).length > 0 && (
          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Armadura</th>
                  <th style={thStyle}>Tipo</th>
                  <th style={thStyle}>CA base</th>
                  <th style={{ ...thStyle, width: 60 }}>Bon. mág.</th>
                  <th style={{ ...thStyle, width: 70 }}>Equipada</th>
                  <th style={{ ...thStyle, width: 30 }}></th>
                </tr>
              </thead>
              <tbody>
                {(char.armaduras || []).map((arm, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? P.surface : "transparent" }}>
                    <td style={{ ...tdStyle, fontWeight: 700, color: P.goldLt }}>{arm.nombre}</td>
                    <td style={{ ...tdStyle, fontSize: 11, color: P.textDim }}>{arm.tipo}</td>
                    <td style={tdStyle}>{arm.caBase}{arm.bonus > 0 ? ` +${arm.bonus}` : ""}</td>
                    <td style={tdStyle}>
                      <Num value={arm.bonus || 0}
                        onChange={v => u("armaduras", (char.armaduras||[]).map((x,j) => j===i ? {...x, bonus:v} : x))}
                        min={0} max={3}
                        style={{ width: 50, textAlign: "center" }} />
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <input type="checkbox" checked={arm.equipada || false}
                        onChange={e => u("armaduras", (char.armaduras||[]).map((x,j) => j===i ? {...x, equipada:e.target.checked} : x))}
                        style={{ accentColor: P.gold, width: 16, height: 16 }} />
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => u("armaduras", (char.armaduras||[]).filter((_,j) => j!==i))}
                        style={{ background: "transparent", border: "none", color: P.crimsonLt,
                          cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0 }}>✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(char.armaduras||[]).some(a => a.equipada && a.tipo !== "Escudo") && (
              <div style={{ fontSize: 11, color: P.gold, marginTop: 4 }}>
                CA activa: {(() => {
                  const equipadas = (char.armaduras||[]).filter(a => a.equipada);
                  const arm = equipadas.find(a => a.tipo !== "Escudo");
                  const escudo = equipadas.find(a => a.tipo === "Escudo");
                  if (!arm) return char.ca || "—";
                  return `${arm.caBase}${arm.bonus > 0 ? ` +${arm.bonus} mág.` : ""}${escudo ? ` + escudo (+2${escudo.bonus > 0 ? ` +${escudo.bonus}` : ""})` : ""}`;
                })()}
              </div>
            )}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select value={nuevaArmadura} onChange={e => setNuevaArmadura(e.target.value)}
            style={{ ...baseInput, flex: 1 }}>
            <option value="">— Seleccionar armadura —</option>
            {["Ligera","Media","Pesada","Escudo"].map(tipo => (
              <optgroup key={tipo} label={tipo}>
                {ARMADURAS_DB.filter(a => a.tipo === tipo).map(a => (
                  <option key={a.nombre} value={a.nombre}>{a.nombre} ({a.caBase})</option>
                ))}
              </optgroup>
            ))}
          </select>
          <Btn onClick={addArmadura} variant="gold" disabled={!nuevaArmadura}>+ Añadir</Btn>
        </div>
      </Card>

      <Card>
        <SecTitle>Objetos Mágicos</SecTitle>
        {(char.objetosMagicos || []).length > 0 && (
          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Nombre","Tipo","Rareza","Sint.","Notas",""].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(char.objetosMagicos || []).map((obj, i) => (
                  <tr key={i}>
                    <td style={tdStyle}>
                      <span title={obj.desc} style={{ cursor: "help", borderBottom: "1px dotted "+P.textDim }}>
                        {obj.nombre}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: P.textDim, fontSize: 11 }}>{obj.cat}</td>
                    <td style={{ ...tdStyle, fontSize: 11, color:
                      obj.rar === "Legendario" ? "#e8b84b" :
                      obj.rar === "Muy raro"  ? "#c060d0" :
                      obj.rar === "Raro"      ? "#4090d0" :
                      obj.rar === "Poco común"? "#50c050" : P.textDim
                    }}>{obj.rar}</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      {obj.sint ? (
                        <input type="checkbox" checked={!!obj.sintonizado}
                          onChange={e => u("objetosMagicos", (char.objetosMagicos||[]).map((x,j) =>
                            j===i ? {...x, sintonizado: e.target.checked} : x))} />
                      ) : <span style={{ color: P.textDim, fontSize: 10 }}>—</span>}
                    </td>
                    <td style={tdStyle}>
                      <input value={obj.notas || ""} onChange={e => u("objetosMagicos",
                        (char.objetosMagicos||[]).map((x,j) => j===i ? {...x, notas: e.target.value} : x))}
                        style={{ ...baseInput, fontSize: 11, padding: "2px 4px", width: "100%" }}
                        placeholder="notas..." />
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => u("objetosMagicos", (char.objetosMagicos||[]).filter((_,j) => j!==i))}
                        style={{ background: "transparent", border: "none", color: P.textDim,
                          cursor: "pointer", fontSize: 14, padding: "0 4px" }}>✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(char.objetosMagicos||[]).filter(o => o.sint && o.sintonizado).length > 0 && (
              <div style={{ fontSize: 11, color: P.gold, marginTop: 4 }}>
                Sintonizados: {(char.objetosMagicos||[]).filter(o => o.sint && o.sintonizado).length}/3
              </div>
            )}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <select value={filtroObjetoCat} onChange={e => { setFiltroObjetoCat(e.target.value); setNuevoObjeto(""); }}
            style={{ ...baseInput, minWidth: 120 }}>
            <option value="">Todas las categorías</option>
            {OBJETOS_CAT.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={nuevoObjeto} onChange={e => setNuevoObjeto(e.target.value)}
            style={{ ...baseInput, flex: 1 }}>
            <option value="">— Seleccionar objeto mágico —</option>
            {OBJETOS_RAR_ORDEN.map(rar => {
              const items = OBJETOS_MAGICOS_DB.filter(o =>
                o.rar === rar && (!filtroObjetoCat || o.cat === filtroObjetoCat));
              if (!items.length) return null;
              return (
                <optgroup key={rar} label={rar}>
                  {items.map(o => (
                    <option key={o.nombre} value={o.nombre}>
                      {o.nombre}{o.sint ? " ⬥" : ""}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
          <Btn onClick={addObjeto} variant="gold" disabled={!nuevoObjeto}>+ Añadir</Btn>
        </div>
        <div style={{ fontSize: 10, color: P.textDim, marginTop: 4 }}>
          ⬥ = Requiere sintonización · Pasa el ratón sobre el nombre para ver descripción
        </div>
      </Card>

      <Card>
        <SecTitle>Equipo y Objetos</SecTitle>
        <Ta value={char.equipo} onChange={v => u("equipo", v)}
          placeholder={"Pack de aventurero\nCuerda de cáñamo (15 m)\nAntorcha × 10\nRaciones × 5 días\n..."}
          rows={8} />
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

  // Cambio de clase en una fila de progresión:
  // deshace salvaciones/habilidades de la clase anterior y aplica las de la nueva
  const handleProgClase = (i, nuevaClase) => {
    setChar(c => {
      const viejaClase = c.progresion[i]?.clase;
      const next = {
        ...c,
        salv: { ...c.salv },
        hab:  { ...c.hab  },
        profClases: { ...c.profClases },
      };

      // Deshacer proficiencias de la clase anterior
      if (viejaClase && next.profClases[viejaClase]) {
        const prev = next.profClases[viejaClase];
        for (const s of (prev.salv || [])) {
          const otraLaDa = c.progresion.some(
            (p, idx) => idx !== i && PROF_CLASE[p.clase]?.salv.includes(s)
          );
          if (!otraLaDa) next.salv[s] = false;
        }
        const habTrasfondo = DATOS_TRASFONDO[c.trasfondo]?.habilidades || [];
        for (const h of (prev.hab || [])) {
          if (!habTrasfondo.includes(h)) next.hab[h] = false;
        }
        delete next.profClases[viejaClase];
      }

      next.progresion = c.progresion.map((p, idx) =>
        idx === i ? { ...p, clase: nuevaClase, subclase: "" } : p
      );

      if (nuevaClase && PROF_CLASE[nuevaClase]) {
        const prof = PROF_CLASE[nuevaClase];
        for (const s of prof.salv) next.salv[s] = true;
        next.profClases[nuevaClase] = { salv: prof.salv, hab: [] };
      }

      return next;
    });
  };

  // Selección de habilidades de clase (con límite n)
  const handleProgHab = (clase, habId, checked) => {
    const prof = PROF_CLASE[clase];
    if (!prof) return;
    setChar(c => {
      const actual = c.profClases[clase]?.hab || [];
      if (checked && actual.length >= prof.n && !actual.includes(habId)) return c;
      const nuevaHab = checked
        ? [...actual.filter(h => h !== habId), habId]
        : actual.filter(h => h !== habId);
      return {
        ...c,
        hab: { ...c.hab, [habId]: checked },
        profClases: {
          ...c.profClases,
          [clase]: { ...(c.profClases[clase] || {}), hab: nuevaHab },
        },
      };
    });
  };

  // Helper: deshace el ASI de trasfondo activo
  const _deshacerAsi = (next) => {
    if (next.asiAplicado) {
      for (const [attr, bonus] of Object.entries(next.asiAplicado)) {
        next[attr] = (next[attr] || 10) - bonus;
      }
    }
    next.asiAplicado = {};
    next.trasfondoAsiLibre = ["","",""];
    next.trasfondoAsiCustom = ["",""];
  };

  // Cambio de trasfondo: deshace el anterior y aplica el nuevo
  const handleTrasfondo = (nuevo) => {
    setChar(c => {
      let next = { ...c, hab: { ...c.hab } };

      // 1. Deshacer ASI del trasfondo anterior
      _deshacerAsi(next);

      // 2. Si venimos de Personalizado, quitar la dote custom anterior
      if (c.trasfondo === "Personalizado" && c.trasfondoDoteCustom) {
        next.dotes = next.dotes.filter(d => d.nombre !== c.trasfondoDoteCustom);
      }
      next.trasfondoDoteCustom = "";

      // 3. Registrar nuevo trasfondo y resetear modo
      next.trasfondo = nuevo;
      next.trasfondoAplicado = nuevo;
      next.trasfondoModo = "sugerido";

      const data = DATOS_TRASFONDO[nuevo];
      if (data && nuevo !== "Personalizado") {
        // 4. Marcar competencias de habilidad
        for (const skill of data.habilidades) {
          next.hab[skill] = true;
        }

        // 5. Añadir dote de origen si no existe ya
        if (data.dote) {
          const yaExiste = next.dotes.some(d => d.nombre === data.dote);
          if (!yaExiste) next.dotes = [...next.dotes, { nombre: data.dote, desc: "" }];
        }
        // El jugador elige manualmente qué característica recibe +2 y cuál +1
      }

      return next;
    });
  };

  // Cambio de la dote de origen para trasfondo Personalizado
  const handleTrasfondoDoteCustom = (doteName) => {
    setChar(c => {
      const next = { ...c };
      // Quitar la dote anterior del listado
      if (c.trasfondoDoteCustom) {
        next.dotes = c.dotes.filter(d => d.nombre !== c.trasfondoDoteCustom);
      }
      next.trasfondoDoteCustom = doteName;
      // Añadir la nueva dote si no existe ya
      if (doteName && !next.dotes.some(d => d.nombre === doteName)) {
        next.dotes = [...(next.dotes || []), { nombre: doteName, desc: "" }];
      }
      return next;
    });
  };

  // Cambio de modo ASI (+2/+1 sugerido vs tres +1)
  const handleTrasfondoModo = (modo) => {
    setChar(c => {
      let next = { ...c, hab: { ...c.hab } };

      // Deshacer ASI previo
      _deshacerAsi(next);
      next.trasfondoModo = modo;

      const data = DATOS_TRASFONDO[c.trasfondo];

      // Tres +1: para trasfondos estándar, auto-aplica +1 a las 3 características del trasfondo
      if (modo === "tres1" && data && c.trasfondo !== "Personalizado" && data.asi.length === 3) {
        const asiAplicado = {};
        for (const attr of data.asi) {
          next[attr] = (next[attr] || 10) + 1;
          asiAplicado[attr] = 1;
        }
        next.asiAplicado = asiAplicado;
        next.trasfondoAsiLibre = [...data.asi]; // registrar qué stats se tocaron
      }
      // Para Personalizado + tres1: el jugador elige los 3 stats via selects (sin auto-aplicar)

      return next;
    });
  };

  // Cambio de uno de los tres +1 libres (idx 0..2, attr = stat id o "")
  const handleAsiLibreChange = (idx, attr) => {
    setChar(c => {
      let next = { ...c, hab: { ...c.hab } };
      const prevLibre = [...(c.trasfondoAsiLibre || ["","",""])];
      const prevAttr = prevLibre[idx];

      // Deshacer el +1 anterior en este slot
      if (prevAttr) {
        next[prevAttr] = (next[prevAttr] || 10) - 1;
        const newAsi = { ...next.asiAplicado };
        newAsi[prevAttr] = (newAsi[prevAttr] || 0) - 1;
        if (newAsi[prevAttr] === 0) delete newAsi[prevAttr];
        next.asiAplicado = newAsi;
      }

      // Aplicar el nuevo +1
      prevLibre[idx] = attr;
      next.trasfondoAsiLibre = prevLibre;
      if (attr) {
        next[attr] = (next[attr] || 10) + 1;
        next.asiAplicado = { ...next.asiAplicado, [attr]: (next.asiAplicado[attr] || 0) + 1 };
      }

      return next;
    });
  };

  // Cambio de ASI personalizado sugerido (idx 0=+2, 1=+1; attr = stat id o "")
  const handleAsiCustomChange = (idx, attr) => {
    setChar(c => {
      let next = { ...c, hab: { ...c.hab } };
      const bonuses = [2, 1];
      const bonus = bonuses[idx];
      const prevCustom = [...(c.trasfondoAsiCustom || ["",""])];
      const prevAttr = prevCustom[idx];

      // Deshacer el bono anterior en este slot
      if (prevAttr) {
        next[prevAttr] = (next[prevAttr] || 10) - bonus;
        const newAsi = { ...next.asiAplicado };
        newAsi[prevAttr] = (newAsi[prevAttr] || 0) - bonus;
        if (newAsi[prevAttr] === 0) delete newAsi[prevAttr];
        next.asiAplicado = newAsi;
      }

      // Aplicar el nuevo bono
      prevCustom[idx] = attr;
      next.trasfondoAsiCustom = prevCustom;
      if (attr) {
        next[attr] = (next[attr] || 10) + bonus;
        next.asiAplicado = { ...next.asiAplicado, [attr]: (next.asiAplicado[attr] || 0) + bonus };
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

  const tabProps = { char, u, un, handleTrasfondo, handleTrasfondoModo, handleAsiLibreChange, handleAsiCustomChange, handleTrasfondoDoteCustom, handleProgClase, handleProgHab };

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
