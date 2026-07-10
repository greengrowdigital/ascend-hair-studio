/* =========================================================================
   ASCEND — content & assets
   One hero product: ASCEND Hair Matte Clay (the real tin — silver aluminium,
   black lid, grey Czech clay, 100 g). Per-item copy is inline as {cs,en,es}
   so components read `item.name[lang]` directly. Prices are NUMBERS (Kč) so
   the cart can total.

   Product shots (transparent PNGs, float on any background):
     /product/clay-diagonal.png  — three-quarter hero angle
     /product/clay-top.png       — open tin, top-down (shows the clay)
   ========================================================================= */

const U = (slug, w = 1400) =>
  `https://images.unsplash.com/${slug}?auto=format&fit=crop&w=${w}&q=80`

/* Product PNGs (client-supplied, transparent). */
export const CLAY_DIAGONAL = '/product/clay-diagonal.png'
export const CLAY_TOP = '/product/clay-top.png'

/* Real Unsplash imagery for lifestyle / texture / science moments. */
export const IMG = {
  model: U('photo-1621607512214-68297480165e', 1400),
  modelEditorial: U('photo-1503342217505-b0a15ec3261c', 1400),
  hairTexture: U('photo-1560264641-1b5191cc63e2', 1400),
  hairMacro: U('photo-1589389068756-fc2ad63f54d6', 1400),
  clayTexture: U('photo-1620916566398-39f1143ab7be', 1200),
  herbs: U('photo-1514733670139-4d87a1941d55', 1400),
  leaf: U('photo-1554929081-f8f43f603f93', 1200),
  hands: U('photo-1599110364868-364162bc1720', 1200),
}

/* — The product — */
export const PRODUCT = {
  id: 'matte-clay',
  slug: 'clay',
  brand: 'ASCEND',
  name: { cs: 'Matná hlína', en: 'Matte Clay', es: 'Clay Mate' },
  category: { cs: 'Matná hlína na vlasy', en: 'Hair Matte Clay', es: 'Clay Mate para Cabello' },
  edition: 'Nº01',
  currency: 'Kč',
  priceFrom: 340,
  weight: '100 g',
  finish: { cs: 'Matný', en: 'Matte', es: 'Mate' },
  hold: { cs: 'Silná · 8/10', en: 'Strong · 8/10', es: 'Fuerte · 8/10' },
  scent: { cs: 'Cedr & šalvěj', en: 'Cedar & sage', es: 'Cedro & salvia' },
  heroImage: CLAY_DIAGONAL,
  gallery: [CLAY_DIAGONAL, CLAY_TOP, U('photo-1621607512214-68297480165e', 1200)],
  tagline: {
    cs: 'Matná modelovací hlína pro celodenní držení, které kdykoli přetvoříš.',
    en: 'A matte clay for all-day hold you can restyle anytime.',
    es: 'Una clay mate con fijación todo el día que puedes reestilizar cuando quieras.',
  },
  intro: {
    cs: 'Silné, ale poddajné držení. Zemitá česká hlína s konopným olejem — struktura a objem bez lesku a bez zbytečné chemie.',
    en: 'Strong yet pliable hold. Earthy Czech clay cut with hemp oil — texture and volume with zero shine and no needless chemistry.',
    es: 'Fijación fuerte pero maleable. Arcilla checa con aceite de cáñamo — textura y volumen sin brillo y sin química innecesaria.',
  },
}

/* — Variants (sizes, in grams) — priced in whole Kč — */
export const VARIANTS = [
  {
    id: '50',
    size: '50 g',
    price: 340,
    label: { cs: '50 g', en: '50 g', es: '50 g' },
    note: { cs: 'Na vyzkoušení', en: 'Try it out', es: 'Para probar' },
    badge: null,
  },
  {
    id: '100',
    size: '100 g',
    price: 590,
    label: { cs: '100 g', en: '100 g', es: '100 g' },
    note: { cs: 'Vydrží ~3 měsíce', en: 'Lasts ~3 months', es: 'Dura ~3 meses' },
    badge: { cs: 'Nejlepší hodnota', en: 'Best value', es: 'Mejor valor' },
  },
  {
    id: 'duo',
    size: '2 × 100 g',
    price: 1090,
    label: { cs: 'Duo · 2 × 100 g', en: 'Duo · 2 × 100 g', es: 'Dúo · 2 × 100 g' },
    note: { cs: 'Ušetři 90 Kč', en: 'Save 90 Kč', es: 'Ahorra 90 Kč' },
    badge: { cs: 'Duo', en: 'Duo', es: 'Dúo' },
  },
]

export const DEFAULT_VARIANT = '100'

/* — Apple-style product statements (the scroll story) — */
export const FEATURES = [
  {
    id: 'matte',
    kicker: { cs: 'Povrch', en: 'Finish', es: 'Acabado' },
    title: { cs: 'Matný. Nikdy mastný.', en: 'Matte. Never greasy.', es: 'Mate. Nunca grasoso.' },
    body: {
      cs: 'Hliněná báze pohltí světlo, místo aby ho odrážela — přírodní, suchý vzhled, jako bys nic nepoužil.',
      en: 'A clay base drinks light instead of bouncing it — a natural, dry look, like you used nothing at all.',
      es: 'Una base de arcilla absorbe la luz en vez de reflejarla — un look natural y seco, como si no usaras nada.',
    },
    img: U('photo-1621607512214-68297480165e', 1200),
  },
  {
    id: 'hold',
    kicker: { cs: 'Držení', en: 'Hold', es: 'Fijación' },
    title: {
      cs: 'Drží celý den. Přetvoříš ho kdykoli.',
      en: 'Holds all day. Restyle it anytime.',
      es: 'Fija todo el día. Reestiliza cuando quieras.',
    },
    body: {
      cs: 'Silné držení, které nezatuhne na kámen. Projeď vlasy prsty ve tři odpoledne a účes se vrátí k životu.',
      en: 'A strong hold that never sets like concrete. Run your fingers through at 3pm and the shape springs back.',
      es: 'Fijación fuerte que no se endurece como cemento. Pasa los dedos a las 3pm y la forma vuelve a la vida.',
    },
    img: U('photo-1503342217505-b0a15ec3261c', 1200),
  },
  {
    id: 'clean',
    kicker: { cs: 'Čistota', en: 'Clean', es: 'Limpio' },
    title: {
      cs: '92 % přírodní. Nula zbytků.',
      en: '92% natural. Zero residue.',
      es: '92% natural. Cero residuo.',
    },
    body: {
      cs: 'Bez silikonů, bez sulfátů, bez parabenů. Vymyje se jedním mytím — žádný povlak, žádné bílé vločky.',
      en: 'No silicones, no sulfates, no parabens. Rinses out in a single wash — no coating, no white flakes.',
      es: 'Sin siliconas, sin sulfatos, sin parabenos. Se enjuaga en un solo lavado — sin película, sin residuo blanco.',
    },
    img: CLAY_TOP,
  },
]

/* — Botanical actives inside the clay — */
export const INGREDIENTS = [
  {
    id: 'bentonite',
    latin: 'Bentonite',
    name: { cs: 'Česká jílová hlína', en: 'Czech Bentonite Clay', es: 'Arcilla Bentonita Checa' },
    note: {
      cs: 'Zemitá báze pro matný povrch a objem od kořínků.',
      en: 'The earthy base — a matte finish and volume from the root.',
      es: 'La base terrosa — acabado mate y volumen desde la raíz.',
    },
  },
  {
    id: 'hemp',
    latin: 'Cannabis sativa',
    name: { cs: 'Konopný olej', en: 'Hemp Oil', es: 'Aceite de Cáñamo' },
    note: {
      cs: 'Změkčuje hlínu, aby se dala roztírat bez tahání.',
      en: 'Softens the clay so it spreads without pulling.',
      es: 'Suaviza la arcilla para que se extienda sin jalar.',
    },
  },
  {
    id: 'candelilla',
    latin: 'Euphorbia cerifera',
    name: { cs: 'Kandelilový vosk', en: 'Candelilla Wax', es: 'Cera de Candelilla' },
    note: {
      cs: 'Rostlinný vosk pro pružné, celodenní držení.',
      en: 'A plant wax for pliable, all-day hold.',
      es: 'Una cera vegetal para fijación maleable todo el día.',
    },
  },
  {
    id: 'nettle',
    latin: 'Urtica dioica',
    name: { cs: 'Kopřiva', en: 'Nettle', es: 'Ortiga' },
    note: {
      cs: 'Posiluje vlas a podporuje zdravou pokožku hlavy.',
      en: 'Strengthens the strand and supports a healthy scalp.',
      es: 'Fortalece la hebra y cuida el cuero cabelludo.',
    },
  },
  {
    id: 'sage',
    latin: 'Salvia officinalis',
    name: { cs: 'Šalvěj', en: 'Sage', es: 'Salvia' },
    note: {
      cs: 'Přírodní vůně a rovnováha pro pokožku hlavy.',
      en: 'Natural scent and balance for the scalp.',
      es: 'Aroma natural y equilibrio para el cuero cabelludo.',
    },
  },
  {
    id: 'rosemary',
    latin: 'Rosmarinus officinalis',
    name: { cs: 'Rozmarýn', en: 'Rosemary', es: 'Romero' },
    note: {
      cs: 'Prokrvuje pokožku hlavy a osvěžuje.',
      en: 'Stimulates the scalp and refreshes.',
      es: 'Estimula el cuero cabelludo y refresca.',
    },
  },
]

/* — How to use (mirrors the instructions printed on the tin) — */
export const RITUAL = [
  {
    id: '01',
    name: { cs: 'Navlhči', en: 'Dampen', es: 'Humedece' },
    desc: {
      cs: 'Lehce navlhči vlasy. Pomáhá to hlínu rovnoměrně rozprostřít.',
      en: 'Lightly dampen your hair. It helps the clay spread evenly.',
      es: 'Humedece ligeramente el cabello. Ayuda a repartir la clay de forma uniforme.',
    },
  },
  {
    id: '02',
    name: { cs: 'Rozetři', en: 'Warm it', es: 'Calienta' },
    desc: {
      cs: 'Naber množství velikosti hrášku a důkladně rozetři mezi dlaněmi.',
      en: 'Take a pea-sized amount and rub it thoroughly between your hands.',
      es: 'Toma una cantidad tamaño chícharo y frótala bien entre las manos.',
    },
  },
  {
    id: '03',
    name: { cs: 'Nanes', en: 'Apply', es: 'Aplica' },
    desc: {
      cs: 'Nanes rovnoměrně od kořínků a vytvaruj účes podle sebe.',
      en: 'Apply evenly from the roots and shape your style as desired.',
      es: 'Aplica de forma uniforme desde la raíz y da forma a tu estilo.',
    },
  },
  {
    id: '04',
    name: { cs: 'Přetvoř', en: 'Restyle', es: 'Reestiliza' },
    desc: {
      cs: 'Kdykoli během dne projeď vlasy prsty — účes se vrátí zpět.',
      en: 'Any time of day, run your fingers through — the style comes back.',
      es: 'A cualquier hora, pasa los dedos — el estilo regresa.',
    },
  },
]

/* — Numbers strip — */
export const STATS = [
  { value: '92%', label: { cs: 'Přírodní složení', en: 'Natural formula', es: 'Fórmula natural' } },
  { value: '0', label: { cs: 'Zbytečných chemikálií', en: 'Needless chemicals', es: 'Químicos innecesarios' } },
  { value: '24h', label: { cs: 'Držení', en: 'Hold', es: 'Fijación' } },
  { value: 'CZ', label: { cs: 'Vyrobeno v Česku', en: 'Made in Czechia', es: 'Hecho en Chequia' } },
]

/* — Spec table (product page) — */
export const SPECS = [
  {
    label: { cs: 'Povrch', en: 'Finish', es: 'Acabado' },
    value: { cs: 'Matný, bez lesku', en: 'Matte, no shine', es: 'Mate, sin brillo' },
  },
  {
    label: { cs: 'Držení', en: 'Hold', es: 'Fijación' },
    value: { cs: 'Silné · 8/10 · přetvořitelné', en: 'Strong · 8/10 · restylable', es: 'Fuerte · 8/10 · reestilizable' },
  },
  {
    label: { cs: 'Vůně', en: 'Scent', es: 'Aroma' },
    value: { cs: 'Cedr & šalvěj', en: 'Cedar & sage', es: 'Cedro & salvia' },
  },
  {
    label: { cs: 'Báze', en: 'Base', es: 'Base' },
    value: { cs: 'Česká jílová hlína', en: 'Czech bentonite clay', es: 'Arcilla bentonita checa' },
  },
  {
    label: { cs: 'Balení', en: 'Format', es: 'Formato' },
    value: { cs: 'Hliníková dóza · 50 / 100 g', en: 'Aluminium tin · 50 / 100 g', es: 'Lata de aluminio · 50 / 100 g' },
  },
  {
    label: { cs: 'Původ', en: 'Origin', es: 'Origen' },
    value: { cs: 'Vyrobeno v Česku 🇨🇿', en: 'Made in Czechia 🇨🇿', es: 'Hecho en Chequia 🇨🇿' },
  },
]

/* — FAQ (product page) — */
export const FAQ = [
  {
    q: { cs: 'Jak silné je držení?', en: 'How strong is the hold?', es: '¿Qué tan fuerte es la fijación?' },
    a: {
      cs: 'Silné (8/10), ale poddajné. Udrží tvar celý den, přesto ho kdykoli přetvoříš prsty — nezatuhne na kámen.',
      en: 'Strong (8/10) but pliable. It holds shape all day, yet you can restyle with your fingers anytime — it never sets like concrete.',
      es: 'Fuerte (8/10) pero maleable. Mantiene la forma todo el día, pero puedes reestilizar con los dedos cuando quieras — nunca se endurece como cemento.',
    },
  },
  {
    q: { cs: 'Vymyje se snadno?', en: 'Does it wash out easily?', es: '¿Se enjuaga fácil?' },
    a: {
      cs: 'Ano. Bez silikonů a voskových povlaků se vymyje jedním mytím běžným šamponem — žádné bílé vločky.',
      en: 'Yes. With no silicones or heavy waxes, it rinses out in a single wash with normal shampoo — no white flakes.',
      es: 'Sí. Sin siliconas ni ceras pesadas, se enjuaga en un solo lavado con champú normal — sin residuo blanco.',
    },
  },
  {
    q: { cs: 'Je opravdu přírodní?', en: 'Is it really natural?', es: '¿Es realmente natural?' },
    a: {
      cs: '92 % složení je rostlinného či minerálního původu. Bez sulfátů, parabenů a syntetických silikonů. Netestováno na zvířatech.',
      en: '92% of the formula is plant- or mineral-derived. No sulfates, parabens, or synthetic silicones. Never tested on animals.',
      es: 'El 92% de la fórmula es de origen vegetal o mineral. Sin sulfatos, parabenos ni siliconas sintéticas. No testado en animales.',
    },
  },
  {
    q: { cs: 'Kdy dorazí?', en: 'When will it arrive?', es: '¿Cuándo llega?' },
    a: {
      cs: 'Ukázkový obchod — objednávky se neúčtují. V ostrém provozu: doručení v ČR do 2–3 dnů, po EU do 5–7 dnů.',
      en: 'This is a demo store — orders are not charged. Live, it would ship in 2–3 days within CZ and 5–7 days across the EU.',
      es: 'Es una tienda demo — los pedidos no se cobran. En vivo, enviaría en 2–3 días en CZ y 5–7 días en la UE.',
    },
  },
]
