// Database de Resíduos do Jogo "Desafio da Reciclagem"
// Baseado nas diretrizes do CONAMA 275/2001 e normas de reciclagem brasileiras
// Todas as ilustrações são SVGs vetoriais puros para evitar erros de renderização (retângulos vazios / fontes ausentes no Windows)

const SVG_ICONS = {
  banana: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 48C18 52 38 52 50 24C52 19 50 14 47 12C45 11 41 13 40 16C36 28 26 38 14 40C11 41 10 46 12 48Z" fill="#FDD835"/>
    <path d="M48 13C46 18 36 34 18 42C14 44 11 46 12 48C14 49 19 49 26 46C38 40 47 28 50 19C51 16 50 13 48 13Z" fill="#FBC02D"/>
    <path d="M50 14L54 9C55 8 57 8 57 10L55 15C53 16 51 15 50 14Z" fill="#5D4037"/>
    <circle cx="13" cy="46" r="2" fill="#5D4037"/>
  </svg>`,

  'papel-sulfite': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="8" width="36" height="48" rx="3" fill="#FFFFFF" stroke="#CFD8DC" stroke-width="2"/>
    <path d="M38 8V18C38 19 39 20 40 20H50L38 8Z" fill="#ECEFF1"/>
    <line x1="20" y1="26" x2="38" y2="26" stroke="#90A4AE" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="20" y1="33" x2="44" y2="33" stroke="#B0BEC5" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="20" y1="40" x2="44" y2="40" stroke="#B0BEC5" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="20" y1="47" x2="32" y2="47" stroke="#B0BEC5" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  'garrafa-pet': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="27" y="6" width="10" height="5" rx="1.5" fill="#1E88E5"/>
    <rect x="29" y="11" width="6" height="4" fill="#81D4FA"/>
    <path d="M25 18C27 15 37 15 39 18L43 27C44 29 44 32 44 35V52C44 56 41 58 37 58H27C23 58 20 56 20 52V35C20 32 20 29 21 27L25 18Z" fill="#B3E5FC" stroke="#0288D1" stroke-width="1.5"/>
    <rect x="20" y="32" width="24" height="12" fill="#E53935"/>
    <line x1="23" y1="38" x2="41" y2="38" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <path d="M23 22L23 52" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 3"/>
  </svg>`,

  'lata-refrigerante': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="14" rx="14" ry="4" fill="#E0E0E0" stroke="#BDBDBD" stroke-width="1.5"/>
    <ellipse cx="32" cy="13" rx="4" ry="2" fill="#9E9E9E"/>
    <path d="M18 14V50C18 53 24 55 32 55C40 55 46 53 46 50V14H18Z" fill="#E53935"/>
    <path d="M18 26C24 29 40 23 46 28V36C40 31 24 37 18 34V26Z" fill="#FFFFFF"/>
    <ellipse cx="32" cy="50" rx="14" ry="4" fill="#C62828" opacity="0.3"/>
  </svg>`,

  'garrafa-vidro': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="29" y="6" width="6" height="4" rx="1" fill="#FFB74D"/>
    <path d="M29 10H35V20L41 29C42 31 43 34 43 37V54C43 57 40 59 36 59H28C24 59 21 57 21 54V37C21 34 22 31 23 29L29 20V10Z" fill="#388E3C" stroke="#2E7D32" stroke-width="1.5"/>
    <path d="M25 32V52" stroke="#A5D6A7" stroke-width="2" stroke-linecap="round"/>
    <rect x="24" y="38" width="16" height="10" rx="1" fill="#FFF9C4" stroke="#FBC02D" stroke-width="1"/>
  </svg>`,

  maca: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 15C31 10 35 6 38 5" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M35 8C40 6 45 9 46 13C41 14 36 12 35 8Z" fill="#43A047"/>
    <path d="M32 18C26 13 14 17 14 29C14 43 25 56 32 57C39 56 50 43 50 29C50 17 38 13 32 18Z" fill="#E53935"/>
    <circle cx="24" cy="26" r="4" fill="#FF8A80" opacity="0.7"/>
    <path d="M43 28C41 30 40 33 41 36C39 37 38 40 39 42C43 44 48 40 48 37C48 33 46 29 43 28Z" fill="#FFF8E1"/>
  </svg>`,

  'caixa-papelao': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 8L52 18V44L32 56L12 44V18L32 8Z" fill="#D7CCC8" stroke="#8D6E63" stroke-width="2"/>
    <path d="M32 8L52 18L32 29L12 18L32 8Z" fill="#BCAAA4"/>
    <path d="M32 29V56" stroke="#8D6E63" stroke-width="2"/>
    <path d="M12 18L32 29L52 18" stroke="#8D6E63" stroke-width="2"/>
    <rect x="28" y="16" width="8" height="26" fill="#FFE082" opacity="0.8"/>
  </svg>`,

  'caixa-leite': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 18L32 11L42 18V56H22V18Z" fill="#1976D2" stroke="#0D47A1" stroke-width="1.5"/>
    <path d="M22 18L32 11L42 18H22Z" fill="#0D47A1"/>
    <rect x="22" y="24" width="20" height="24" fill="#FFFFFF"/>
    <circle cx="37" cy="15" r="2.5" fill="#E53935"/>
    <path d="M26 36C28 34 32 38 34 35C36 33 39 35 40 33V44H26V36Z" fill="#1976D2"/>
    <text x="32" y="32" font-family="sans-serif" font-weight="900" font-size="7" fill="#1976D2" text-anchor="middle">LEITE</text>
  </svg>`,

  'caixa-suco': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M36 6L40 10L37 17" stroke="#F57F17" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M20 18L32 14L44 18V56H20V18Z" fill="#FB8C00" stroke="#E65100" stroke-width="1.5"/>
    <rect x="20" y="26" width="24" height="22" fill="#FFF3E0"/>
    <circle cx="32" cy="37" r="7" fill="#FF9800"/>
    <path d="M32 32C33 34 33 39 32 42" stroke="#FFE082" stroke-width="1.5"/>
    <text x="32" y="24" font-family="sans-serif" font-weight="900" font-size="6" fill="#E65100" text-anchor="middle">SUCO</text>
  </svg>`,

  jornal: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="12" width="40" height="42" rx="2" fill="#ECEFF1" stroke="#90A4AE" stroke-width="2"/>
    <rect x="17" y="17" width="30" height="6" fill="#37474F"/>
    <rect x="17" y="26" width="13" height="12" fill="#B0BEC5"/>
    <line x1="33" y1="27" x2="47" y2="27" stroke="#78909C" stroke-width="2"/>
    <line x1="33" y1="32" x2="47" y2="32" stroke="#78909C" stroke-width="2"/>
    <line x1="33" y1="37" x2="47" y2="37" stroke="#78909C" stroke-width="2"/>
    <line x1="17" y1="42" x2="47" y2="42" stroke="#90A4AE" stroke-width="1.5"/>
    <line x1="17" y1="47" x2="47" y2="47" stroke="#90A4AE" stroke-width="1.5"/>
  </svg>`,

  'papel-higienico': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="26" cy="24" rx="12" ry="16" fill="#FFFFFF" stroke="#CFD8DC" stroke-width="2"/>
    <ellipse cx="26" cy="24" rx="5" ry="7" fill="#8D6E63"/>
    <path d="M26 8C36 8 46 14 46 24V46C46 52 38 56 26 56C24 56 20 55 18 54L26 8Z" fill="#F5F5F5" opacity="0.6"/>
    <path d="M26 40H44V56C44 57 43 58 42 58H32L26 40Z" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="1.5"/>
    <line x1="32" y1="40" x2="32" y2="58" stroke="#ECEFF1" stroke-dasharray="2 2"/>
  </svg>`,

  'esponja-cozinha': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="16" width="36" height="8" rx="2" fill="#2E7D32"/>
    <rect x="14" y="24" width="36" height="24" rx="3" fill="#FDD835" stroke="#F57F17" stroke-width="1.5"/>
    <circle cx="20" cy="30" r="2" fill="#F57F17" opacity="0.5"/>
    <circle cx="32" cy="34" r="3" fill="#F57F17" opacity="0.5"/>
    <circle cx="42" cy="31" r="2.5" fill="#F57F17" opacity="0.5"/>
    <circle cx="24" cy="40" r="2.5" fill="#F57F17" opacity="0.5"/>
    <circle cx="36" cy="42" r="2" fill="#F57F17" opacity="0.5"/>
  </svg>`,

  'frasco-xampu': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 6H34V12H30V6Z" fill="#E0E0E0"/>
    <path d="M26 8H38C39 8 40 9 40 10H24C24 9 25 8 26 8Z" fill="#BDBDBD"/>
    <path d="M24 14C27 12 37 12 40 14C43 17 44 26 44 38C44 50 40 56 36 57H28C24 56 20 50 20 38C20 26 21 17 24 14Z" fill="#AB47BC" stroke="#7B1FA2" stroke-width="1.5"/>
    <rect x="24" y="28" width="16" height="18" rx="2" fill="#FFFFFF"/>
    <line x1="27" y1="34" x2="37" y2="34" stroke="#AB47BC" stroke-width="2"/>
    <line x1="27" y1="39" x2="35" y2="39" stroke="#CE93D8" stroke-width="1.5"/>
  </svg>`,

  'lata-conserva': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="18" rx="16" ry="6" fill="#F57F17" stroke="#B0BEC5" stroke-width="1.5"/>
    <path d="M16 18V44C16 48 23 52 32 52C41 52 48 48 48 44V18" fill="#B0BEC5" stroke="#78909C" stroke-width="1.5"/>
    <line x1="16" y1="28" x2="48" y2="28" stroke="#78909C" stroke-width="1"/>
    <line x1="16" y1="36" x2="48" y2="36" stroke="#78909C" stroke-width="1"/>
    <ellipse cx="32" cy="18" rx="13" ry="4" fill="#FFD54F"/>
    <circle cx="28" cy="18" r="1.5" fill="#E65100"/>
    <circle cx="34" cy="17" r="1.5" fill="#E65100"/>
    <circle cx="31" cy="20" r="1.5" fill="#E65100"/>
  </svg>`,

  'pote-geleia': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="10" width="20" height="7" rx="2" fill="#E53935" stroke="#C62828" stroke-width="1.5"/>
    <path d="M20 17H44L46 22V50C46 54 42 56 38 56H26C22 56 18 54 18 50V22L20 17Z" fill="#C8E6C9" stroke="#388E3C" stroke-width="1.5" opacity="0.9"/>
    <rect x="22" y="28" width="20" height="18" rx="2" fill="#FFF9C4" stroke="#FBC02D" stroke-width="1"/>
    <circle cx="32" cy="37" r="5" fill="#E53935"/>
    <path d="M22 24L22 48" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  'borra-cafe': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 18L26 50C28 54 36 54 38 50L52 18H12Z" fill="#FFF8E1" stroke="#D7CCC8" stroke-width="2"/>
    <ellipse cx="32" cy="20" rx="18" ry="6" fill="#4E342E"/>
    <ellipse cx="32" cy="20" rx="14" ry="4" fill="#3E2723"/>
    <circle cx="30" cy="20" r="2" fill="#5D4037"/>
    <circle cx="35" cy="21" r="1.5" fill="#5D4037"/>
  </svg>`,

  'marmita-isopor': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 28L18 16C19 14 22 13 25 13H39C42 13 45 14 46 16L50 28H14Z" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="1.5"/>
    <rect x="12" y="27" width="40" height="5" rx="1" fill="#ECEFF1" stroke="#90A4AE" stroke-width="1.5"/>
    <path d="M14 32L18 50C19 53 22 55 26 55H38C42 55 45 53 46 50L50 32H14Z" fill="#FAFAFA" stroke="#CFD8DC" stroke-width="1.5"/>
    <line x1="22" y1="38" x2="42" y2="38" stroke="#ECEFF1" stroke-width="2"/>
  </svg>`,

  'bituca-cigarro': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-30 32 32)">
      <rect x="14" y="28" width="16" height="8" rx="1" fill="#FFA726" stroke="#E65100" stroke-width="1"/>
      <rect x="30" y="28" width="16" height="8" fill="#ECEFF1" stroke="#B0BEC5" stroke-width="1"/>
      <rect x="46" y="28" width="4" height="8" fill="#424242"/>
      <circle cx="49" cy="32" r="1.5" fill="#FF5722"/>
    </g>
  </svg>`,

  'sacola-plastica': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 10V22H16L18 54C18 56 22 58 32 58C42 58 46 56 46 54L48 22H42V10C42 8 40 6 38 6H26C24 6 22 8 22 10Z" fill="#E53935" opacity="0.85" stroke="#C62828" stroke-width="1.5"/>
    <rect x="28" y="10" width="8" height="12" rx="3" fill="#FFFFFF"/>
    <path d="M24 30C26 38 38 38 40 30" stroke="#FFFFFF" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
  </svg>`,

  'tampinha-garrafa': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="20" fill="#FDD835" stroke="#F57F17" stroke-width="2"/>
    <circle cx="32" cy="32" r="14" fill="#FBC02D" stroke="#E65100" stroke-width="1" stroke-dasharray="3 2"/>
    <circle cx="32" cy="32" r="8" fill="#FDD835"/>
    <path d="M28 26L36 38M36 26L28 38" stroke="#F57F17" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  'frasco-perfume': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="29" y="8" width="6" height="5" fill="#FFB300"/>
    <rect x="30" y="13" width="4" height="5" fill="#E0E0E0"/>
    <rect x="20" y="18" width="24" height="36" rx="4" fill="#80CBC4" stroke="#00897B" stroke-width="1.5"/>
    <rect x="24" y="26" width="16" height="20" rx="1" fill="#E0F2F1" stroke="#004D40" stroke-width="1"/>
    <line x1="28" y1="36" x2="36" y2="36" stroke="#00796B" stroke-width="1.5"/>
    <path d="M23 22V50" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  'fita-adesiva': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="32" r="18" fill="#D7CCC8" stroke="#8D6E63" stroke-width="2"/>
    <circle cx="30" cy="32" r="10" fill="#FFFFFF" stroke="#8D6E63" stroke-width="1.5"/>
    <path d="M30 14H48C50 14 52 16 52 18V26H46V18H30V14Z" fill="#BCAAA4" stroke="#8D6E63" stroke-width="1.5"/>
  </svg>`
};

const BINS = {
  organico: {
    id: 'organico',
    name: 'Orgânico',
    color: '#795548',
    colorName: 'Marrom',
    emoji: '🟤',
    description: 'Restos de alimentos, cascas e resíduos biodegradáveis'
  },
  papel: {
    id: 'papel',
    name: 'Papel',
    color: '#1976d2',
    colorName: 'Azul',
    emoji: '🔵',
    description: 'Papéis limpos, jornais, papelão e embalagens cartonadas'
  },
  plastico: {
    id: 'plastico',
    name: 'Plástico',
    color: '#d32f2f',
    colorName: 'Vermelho',
    emoji: '🔴',
    description: 'Garrafas PET, potes, sacolas, isopor e embalagens'
  },
  metal: {
    id: 'metal',
    name: 'Metal',
    color: '#f57f17',
    colorName: 'Amarelo',
    emoji: '🟡',
    description: 'Latinhas de alumínio, tampinhas, latas de conserva'
  },
  vidro: {
    id: 'vidro',
    name: 'Vidro',
    color: '#2e7d32',
    colorName: 'Verde',
    emoji: '🟢',
    description: 'Garrafas, frascos de vidro, potes e cacos'
  },
  rejeito: {
    id: 'rejeito',
    name: 'Rejeitos',
    color: '#37474f',
    colorName: 'Cinza / Preto',
    emoji: '⚫',
    description: 'Papel higiênico, esponjas, fita adesiva e itens não recicláveis'
  }
};

const GAME_PHASES = [
  {
    id: 1,
    name: 'Nível 1 — Fácil',
    badge: '🟢 Nível 1 — Fácil',
    description: 'Identifique os materiais mais comuns do dia a dia!',
    speedFactor: 1.0,
    timeLimit: null,
    items: [
      {
        id: 'banana',
        name: 'Casca de Banana',
        emoji: '🍌',
        svg: SVG_ICONS.banana,
        bin: 'organico',
        tip: 'Resto de fruta natural e biodegradável.',
        explanation: 'Restos de alimentos são resíduos orgânicos e podem ser destinados à compostagem, gerando um adubo natural rico em nutrientes!',
        curiosity: 'Na compostagem, restos de alimentos viram fertilizante fértil em cerca de 60 a 90 dias.'
      },
      {
        id: 'papel-sulfite',
        name: 'Folha de Papel',
        emoji: '📄',
        svg: SVG_ICONS['papel-sulfite'],
        bin: 'papel',
        tip: 'Folha de papel sulfite limpa e seca.',
        explanation: 'Papéis secos e sem gordura devem ir para a lixeira azul. A reciclagem de papel poupa milhares de árvores e economiza até 80% de água!',
        curiosity: 'Cada tonelada de papel reciclado preserva cerca de 20 árvores adultas.'
      },
      {
        id: 'garrafa-pet',
        name: 'Garrafa PET',
        emoji: '🥤',
        svg: SVG_ICONS['garrafa-pet'],
        bin: 'plastico',
        tip: 'Garrafa plástica de refrigerante ou água.',
        explanation: 'O plástico pode ser reciclado quando descartado na lixeira vermelha! Pode virar novas garrafas, tecidos, carpetes e vassouras.',
        curiosity: 'Uma garrafa plástica jogada na natureza pode levar mais de 400 anos para se decompor.'
      },
      {
        id: 'lata-refrigerante',
        name: 'Lata de Refrigerante',
        emoji: '🥫',
        svg: SVG_ICONS['lata-refrigerante'],
        bin: 'metal',
        tip: 'Lata de alumínio de bebida.',
        explanation: 'O alumínio é 100% reciclável infinitas vezes sem perder qualidade! O Brasil é líder mundial na reciclagem de latinhas.',
        curiosity: 'Uma latinha de alumínio reciclada volta às prateleiras do mercado como nova em menos de 60 dias.'
      },
      {
        id: 'garrafa-vidro',
        name: 'Garrafa de Vidro',
        emoji: '🍾',
        svg: SVG_ICONS['garrafa-vidro'],
        bin: 'vidro',
        tip: 'Garrafa de vidro verde ou transparente.',
        explanation: 'O vidro nunca perde suas propriedades na reciclagem. Descarte sempre na lixeira verde para ser fundido e virar novas garrafas!',
        curiosity: 'O vidro é composto por areia, calcário e barrilha, e pode durar mais de 4.000 anos se jogado no meio ambiente.'
      },
      {
        id: 'maca',
        name: 'Resto de Maçã',
        emoji: '🍎',
        svg: SVG_ICONS.maca,
        bin: 'organico',
        tip: 'Fruta consumida, material vegetal.',
        explanation: 'Talos e sementes de frutas são resíduos orgânicos perfeitos para alimentar minhocas na compostagem doméstica!',
        curiosity: 'Quase 50% de todo o lixo gerado no Brasil é matéria orgânica que poderia virar adubo!'
      }
    ]
  },
  {
    id: 2,
    name: 'Nível 2 — Médio',
    badge: '🟡 Nível 2 — Médio',
    description: 'Atenção aos materiais que costumam gerar dúvidas!',
    speedFactor: 1.2,
    timeLimit: null,
    items: [
      {
        id: 'caixa-papelao',
        name: 'Caixa de Papelão',
        emoji: '📦',
        svg: SVG_ICONS['caixa-papelao'],
        bin: 'papel',
        tip: 'Embalagem de papel ondulado.',
        explanation: 'Caixas de papelão limpas devem ser desmontadas e achatadas antes de irem para a lixeira azul, otimizando o transporte!',
        curiosity: 'Papelão desmontado ocupa até 80% menos espaço nos caminhões de coleta seletiva.'
      },
      {
        id: 'caixa-leite',
        name: 'Caixa de Leite (Longa Vida)',
        emoji: '🥛',
        svg: SVG_ICONS['caixa-leite'],
        bin: 'papel',
        tip: 'Embalagem cartonada composta por 75% papel.',
        explanation: 'Embalagens Tetra Pak têm 75% de celulose (papel) e devem ser descartadas na lixeira azul de Papel (esvazie antes do descarte)!',
        curiosity: 'Na fábrica de reciclagem, as camadas de papel, plástico e alumínio da caixinha são separadas por hidropolpação.'
      },
      {
        id: 'caixa-suco',
        name: 'Caixinha de Suco',
        emoji: '🧃',
        svg: SVG_ICONS['caixa-suco'],
        bin: 'papel',
        tip: 'Embalagem cartonada tipo Tetra Pak.',
        explanation: 'Assim como a caixa de leite, caixinhas de suco devem ir para a lixeira azul de Papel. Não se esqueça de tirar o canudinho se for de outro material!',
        curiosity: 'O plástico e alumínio recuperados das caixas de suco viram telhas térmicas ecológicas.'
      },
      {
        id: 'jornal',
        name: 'Jornal Velho',
        emoji: '📰',
        svg: SVG_ICONS.jornal,
        bin: 'papel',
        tip: 'Folhas impressas de notícias.',
        explanation: 'Jornais e revistas são de papel limpo e reciclável. Vão para a lixeira azul para serem transformados em novas folhas e papel reciclado!',
        curiosity: 'O papel de jornal pode ser reciclado de 5 a 7 vezes até que as fibras de celulose fiquem curtas demais.'
      },
      {
        id: 'papel-higienico',
        name: 'Papel Higiênico Usado',
        emoji: '🧻',
        svg: SVG_ICONS['papel-higienico'],
        bin: 'rejeito',
        tip: 'Papel sanitário com resíduos biológicos.',
        explanation: 'Papel higiênico, lenços usados e fraldas não podem ser reciclados por motivos sanitários. Devem ir sempre para a lixeira de Rejeitos!',
        curiosity: 'Rejeitos são encaminhados para aterros sanitários devidamente impermeabilizados.'
      },
      {
        id: 'esponja-cozinha',
        name: 'Esponja de Lavar Louça',
        emoji: '🧽',
        svg: SVG_ICONS['esponja-cozinha'],
        bin: 'rejeito',
        tip: 'Esponja de poliuretano com gordura.',
        explanation: 'Esponjas de cozinha comuns são complexas de reciclar e acumulam bactérias e gordura. Por isso, vão para a lixeira de rejeitos!',
        curiosity: 'Já existem programas especializados para reciclagem de esponjas, mas na coleta seletiva comum elas são tratadas como rejeito.'
      },
      {
        id: 'frasco-xampu',
        name: 'Frasco de Xampu',
        emoji: '🧴',
        svg: SVG_ICONS['frasco-xampu'],
        bin: 'plastico',
        tip: 'Frasco plástico de higiene pessoal.',
        explanation: 'Frascos plásticos de xampu, sabonete líquido e detergente são de plástico (vermelho). Basta enxaguar levemente antes de descartar!',
        curiosity: 'Plásticos do tipo PEAD usados em xampus são muito valorizados pelas cooperativas de reciclagem.'
      },
      {
        id: 'lata-conserva',
        name: 'Lata de Milho / Conserva',
        emoji: '🥫',
        svg: SVG_ICONS['lata-conserva'],
        bin: 'metal',
        tip: 'Lata de aço para alimentos.',
        explanation: 'Latas de aço de conservas são 100% recicláveis! Retire os restos de alimento e coloque na lixeira de Metal (amarela).',
        curiosity: 'As cooperativas usam ímãs gigantes para separar o aço de outros metais rapidamente.'
      }
    ]
  },
  {
    id: 3,
    name: 'Nível 3 — Desafio Rápido',
    badge: '🔴 Nível 3 — Desafio',
    description: 'Mistura completa com cronômetro! Pense rápido e não erre!',
    speedFactor: 1.5,
    timeLimit: 60,
    items: [
      {
        id: 'pote-geleia',
        name: 'Pote de Vidro de Geleia',
        emoji: '🫙',
        svg: SVG_ICONS['pote-geleia'],
        bin: 'vidro',
        tip: 'Recipiente transparente de vidro.',
        explanation: 'Potes de conserva e geleia são de vidro e devem ir para a lixeira verde. Tampas de metal devem ir na lixeira amarela!',
        curiosity: 'Reutilizar potes de vidro para guardar mantimentos é uma excelente atitude sustentável antes de reciclar.'
      },
      {
        id: 'borra-cafe',
        name: 'Borra de Café e Filtro',
        emoji: '☕',
        svg: SVG_ICONS['borra-cafe'],
        bin: 'organico',
        tip: 'Pó de café coado com filtro usado.',
        explanation: 'A borra de café e o coador de papel usado são resíduos orgânicos excelentes para enriquecer a terra e afastar pragas de plantas!',
        curiosity: 'A borra de café é rica em nitrogênio, potássio e fósforo, nutrientes vitais para o solo.'
      },
      {
        id: 'marmita-isopor',
        name: 'Embalagem de Isopor',
        emoji: '🥡',
        svg: SVG_ICONS['marmita-isopor'],
        bin: 'plastico',
        tip: 'EPS (Poliestireno Expandido) limpo.',
        explanation: 'O isopor é 98% ar e 2% plástico! Quando limpo, deve ser descartado na lixeira vermelha de Plástico para ser reciclado.',
        curiosity: 'O isopor reciclado pode ser compactado e transformado em molduras de quadros, rodapés e réguas.'
      },
      {
        id: 'bituca-cigarro',
        name: 'Bituca de Cigarro',
        emoji: '🚬',
        svg: SVG_ICONS['bituca-cigarro'],
        bin: 'rejeito',
        tip: 'Filtro com substâncias tóxicas retidas.',
        explanation: 'Bitucas de cigarro não são recicláveis na coleta convencional e contêm centenas de toxinas. Devem ser descartadas na lixeira de Rejeito!',
        curiosity: 'Uma única bituca jogada no chão pode poluir até 50 litros de água potável.'
      },
      {
        id: 'sacola-plastica',
        name: 'Sacola Plástica',
        emoji: '🛍️',
        svg: SVG_ICONS['sacola-plastica'],
        bin: 'plastico',
        tip: 'Filme plástico flexível.',
        explanation: 'Sacolas plásticas devem ir para a lixeira vermelha. Melhor ainda é usar ecobags reutilizáveis para evitar seu consumo!',
        curiosity: 'Milhões de sacolas plásticas acabam nos rios e oceanos todos os anos se não forem recicladas.'
      },
      {
        id: 'tampinha-garrafa',
        name: 'Tampinha Metálica',
        emoji: '🪙',
        svg: SVG_ICONS['tampinha-garrafa'],
        bin: 'metal',
        tip: 'Tampinha de garrafa de refrigerante/cerveja.',
        explanation: 'As tampinhas de garrafas de vidro são de aço (metal) e devem ser descartadas na lixeira amarela!',
        curiosity: 'Juntar tampinhas metálicas e plásticas para doação ajuda diversas instituições de caridade e proteção animal.'
      },
      {
        id: 'frasco-perfume',
        name: 'Frasco de Perfume',
        emoji: '🧴',
        svg: SVG_ICONS['frasco-perfume'],
        bin: 'vidro',
        tip: 'Frasco de vidro grosso.',
        explanation: 'Frascos de vidro de perfume devem ir na lixeira verde. Se a válvula for plástica/metálica, separe se possível.',
        curiosity: 'O vidro pode ser reciclado continuamente sem jamais perder o brilho e a transparência.'
      },
      {
        id: 'fita-adesiva',
        name: 'Pedaço de Fita Adesiva',
        emoji: '🩹',
        svg: SVG_ICONS['fita-adesiva'],
        bin: 'rejeito',
        tip: 'Fita adesiva com cola e película mista.',
        explanation: 'Fitas adesivas, adesivos comuns e fitas crepe não são recicláveis devido à cola plástica. Devem ir para Rejeito!',
        curiosity: 'Sempre que possível, remova pedaços grandes de fita adesiva das caixas de papelão antes de reciclá-las.'
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.BINS = BINS;
  window.GAME_PHASES = GAME_PHASES;
  window.SVG_ICONS = SVG_ICONS;
}
