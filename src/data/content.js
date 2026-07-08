/* =========================================================================
   ASCEND HAIR STUDIO — content & assets
   Structural data lives here; per-item copy is carried inline as {cs,en,es}
   so components can read `item.name[lang]` directly.
   Photos: real Unsplash imagery (natural / editorial mood).
   ========================================================================= */

const U = (slug, w = 1400) =>
  `https://images.unsplash.com/${slug}?auto=format&fit=crop&w=${w}&q=80`

export const IMG = {
  salonSilver: U('photo-1600948836101-f9ffda59d250', 1920),
  salonChairs: U('photo-1626383137804-ff908d2753a2', 1600),
  modelEditorial: U('photo-1536180931879-fd2d652efddc', 1400),
  modelBlonde: U('photo-1524504388940-b1c1722653e1', 1200),
  modelMischelle: U('photo-1523264766116-1e09b3145b84', 1200),
  modelBeauty: U('photo-1616358278773-e5e4154a336f', 1200),
  sageTwigs: U('photo-1726994804363-5c7ce2255254', 1600),
  leaf: U('photo-1554929081-f8f43f603f93', 1200),
  leaves: U('photo-1557842458-ab4b8925e3cb', 1600),
  herbs: U('photo-1514733670139-4d87a1941d55', 1400),
  texture1: U('photo-1748543669178-efd3de4e64e0', 1100),
  texture2: U('photo-1748543668687-624e058c367c', 1100),
  texture3: U('photo-1748543668646-e81cda0890f3', 1100),
  jar: U('photo-1611073761742-bce90ccd60ae', 1100),
  hairTexture: U('photo-1560264641-1b5191cc63e2', 1400),
  hairMacro: U('photo-1589389068756-fc2ad63f54d6', 1400),
}

/* — Product line (natural hair care, made in Czechia) — */
export const PRODUCTS = [
  {
    id: 'root-volume',
    img: IMG.texture1,
    price: 'Kč 420',
    badge: { cs: 'Bestseller', en: 'Bestseller', es: 'Más vendido' },
    name: {
      cs: 'Kořen & Objem',
      en: 'Root & Volume',
      es: 'Raíz & Volumen',
    },
    type: { cs: 'Šampon · 250 ml', en: 'Shampoo · 250 ml', es: 'Champú · 250 ml' },
    tagline: {
      cs: 'Čisticí šampon z kopřivy a rozmarýnu, který dodá vlasům objem od kořínků.',
      en: 'A nettle-and-rosemary cleanser that lifts hair with volume from the root.',
      es: 'Champú de ortiga y romero que aporta volumen desde la raíz.',
    },
    hero: { cs: 'Kopřiva', en: 'Nettle', es: 'Ortiga' },
  },
  {
    id: 'silk-serum',
    img: IMG.jar,
    price: 'Kč 690',
    badge: { cs: 'Novinka', en: 'New', es: 'Nuevo' },
    name: {
      cs: 'Hedvábné Sérum',
      en: 'Silk Serum',
      es: 'Sérum Seda',
    },
    type: { cs: 'Sérum · 50 ml', en: 'Serum · 50 ml', es: 'Sérum · 50 ml' },
    tagline: {
      cs: 'Lehké sérum z konopného oleje uhlazuje roztřepené konečky bez zatížení.',
      en: 'A weightless hemp-oil serum that seals split ends without any residue.',
      es: 'Sérum ligero de aceite de cáñamo que sella las puntas sin apelmazar.',
    },
    hero: { cs: 'Konopí', en: 'Hemp', es: 'Cáñamo' },
  },
  {
    id: 'botanical-mask',
    img: IMG.texture2,
    price: 'Kč 560',
    badge: null,
    name: {
      cs: 'Botanická Maska',
      en: 'Botanical Mask',
      es: 'Mascarilla Botánica',
    },
    type: { cs: 'Maska · 200 ml', en: 'Mask · 200 ml', es: 'Mascarilla · 200 ml' },
    tagline: {
      cs: 'Hloubková regenerace z lopuchu a heřmánku pro suché a barvené vlasy.',
      en: 'Deep repair with burdock and chamomile for dry, colour-treated hair.',
      es: 'Reparación profunda con bardana y manzanilla para cabello seco o teñido.',
    },
    hero: { cs: 'Lopuch', en: 'Burdock', es: 'Bardana' },
  },
  {
    id: 'daily-oil',
    img: IMG.texture3,
    price: 'Kč 640',
    badge: null,
    name: {
      cs: 'Denní Olej',
      en: 'Daily Oil',
      es: 'Aceite Diario',
    },
    type: { cs: 'Olej · 100 ml', en: 'Oil · 100 ml', es: 'Aceite · 100 ml' },
    tagline: {
      cs: 'Vyživující směs studeně lisovaných olejů pro každodenní lesk.',
      en: 'A nourishing blend of cold-pressed oils for everyday shine.',
      es: 'Mezcla nutritiva de aceites prensados en frío para brillo diario.',
    },
    hero: { cs: 'Šalvěj', en: 'Sage', es: 'Salvia' },
  },
  {
    id: 'pure-conditioner',
    img: IMG.texture1,
    price: 'Kč 460',
    badge: null,
    name: {
      cs: 'Čistý Kondicionér',
      en: 'Pure Conditioner',
      es: 'Acondicionador Puro',
    },
    type: {
      cs: 'Kondicionér · 250 ml',
      en: 'Conditioner · 250 ml',
      es: 'Acondicionador · 250 ml',
    },
    tagline: {
      cs: 'Rozčesává a hydratuje bez silikonů — jen rostliny a čistá voda.',
      en: 'Detangles and hydrates without silicones — just plants and clean water.',
      es: 'Desenreda e hidrata sin siliconas — solo plantas y agua pura.',
    },
    hero: { cs: 'Heřmánek', en: 'Chamomile', es: 'Manzanilla' },
  },
  {
    id: 'scalp-tonic',
    img: IMG.jar,
    price: 'Kč 520',
    badge: { cs: 'Limitka', en: 'Limited', es: 'Edición limitada' },
    name: {
      cs: 'Bylinný Tonik',
      en: 'Herbal Tonic',
      es: 'Tónico Herbal',
    },
    type: { cs: 'Tonikum · 120 ml', en: 'Tonic · 120 ml', es: 'Tónico · 120 ml' },
    tagline: {
      cs: 'Osvěžující tonikum na pokožku hlavy podporující zdravý růst vlasů.',
      en: 'A refreshing scalp tonic that supports healthy, resilient growth.',
      es: 'Tónico refrescante para el cuero cabelludo que favorece el crecimiento.',
    },
    hero: { cs: 'Rozmarýn', en: 'Rosemary', es: 'Romero' },
  },
]

/* — Studio services — */
export const SERVICES = [
  {
    id: 'cut-styling',
    img: IMG.modelBlonde,
    duration: { cs: '60–90 min', en: '60–90 min', es: '60–90 min' },
    price: 'Kč 850',
    name: { cs: 'Střih & Styling', en: 'Cut & Styling', es: 'Corte & Estilo' },
    desc: {
      cs: 'Přesný střih šitý na míru vaší struktuře vlasů a stylu života.',
      en: 'A precision cut tailored to your hair structure and the way you live.',
      es: 'Corte de precisión adaptado a tu tipo de cabello y estilo de vida.',
    },
  },
  {
    id: 'natural-color',
    img: IMG.modelMischelle,
    duration: { cs: '120–180 min', en: '120–180 min', es: '120–180 min' },
    price: 'Kč 1 690',
    name: { cs: 'Přírodní Barvení', en: 'Natural Colour', es: 'Color Natural' },
    desc: {
      cs: 'Barvení šetrné k vlasům s recepturami bez čpavku a s nízkým obsahem PPD.',
      en: 'Hair-kind colour built on ammonia-free, low-PPD formulas.',
      es: 'Coloración respetuosa con fórmulas sin amoníaco y bajo PPD.',
    },
  },
  {
    id: 'regen-treatment',
    img: IMG.modelBeauty,
    duration: { cs: '45 min', en: '45 min', es: '45 min' },
    price: 'Kč 990',
    name: {
      cs: 'Regenerační Péče',
      en: 'Regenerative Care',
      es: 'Cuidado Regenerativo',
    },
    desc: {
      cs: 'Rituál hloubkové obnovy s botanickou maskou a masáží pokožky hlavy.',
      en: 'A deep-restore ritual with a botanical mask and scalp massage.',
      es: 'Ritual de restauración profunda con mascarilla botánica y masaje.',
    },
  },
  {
    id: 'consultation',
    img: IMG.hairMacro,
    duration: { cs: '30 min', en: '30 min', es: '30 min' },
    price: { cs: 'Zdarma', en: 'Free', es: 'Gratis' },
    name: {
      cs: 'Konzultace Vlasů',
      en: 'Hair Consultation',
      es: 'Consulta Capilar',
    },
    desc: {
      cs: 'Analýza vlasů a pokožky hlavy a osobní plán péče — bez závazků.',
      en: 'A hair-and-scalp analysis with a personal care plan — no strings.',
      es: 'Análisis de cabello y cuero cabelludo con un plan personal — sin compromiso.',
    },
  },
  {
    id: 'bridal',
    img: IMG.modelEditorial,
    duration: { cs: '90 min', en: '90 min', es: '90 min' },
    price: 'Kč 2 200',
    name: { cs: 'Svatební Účes', en: 'Bridal Styling', es: 'Peinado de Novia' },
    desc: {
      cs: 'Účes pro váš velký den, včetně zkoušky a péče o vlasy předem.',
      en: 'Styling for your big day, including a trial and pre-event care.',
      es: 'Peinado para tu gran día, con prueba previa y cuidado anticipado.',
    },
  },
  {
    id: 'scalp-care',
    img: IMG.hairTexture,
    duration: { cs: '50 min', en: '50 min', es: '50 min' },
    price: 'Kč 780',
    name: {
      cs: 'Péče o Pokožku Hlavy',
      en: 'Scalp Care',
      es: 'Cuidado del Cuero Cabelludo',
    },
    desc: {
      cs: 'Detoxikační ošetření pokožky hlavy bylinným tonikem a peelingem.',
      en: 'A detoxifying scalp treatment with herbal tonic and exfoliation.',
      es: 'Tratamiento detox del cuero cabelludo con tónico herbal y exfoliación.',
    },
  },
]

/* — Botanical ingredients — */
export const INGREDIENTS = [
  {
    id: 'hemp',
    latin: 'Cannabis sativa',
    name: { cs: 'Konopný olej', en: 'Hemp Oil', es: 'Aceite de Cáñamo' },
    note: {
      cs: 'Omega mastné kyseliny pro hloubkovou hydrataci a lesk.',
      en: 'Omega fatty acids for deep hydration and shine.',
      es: 'Ácidos grasos omega para hidratación profunda y brillo.',
    },
  },
  {
    id: 'nettle',
    latin: 'Urtica dioica',
    name: { cs: 'Kopřiva', en: 'Nettle', es: 'Ortiga' },
    note: {
      cs: 'Posiluje kořínky a podporuje objem.',
      en: 'Strengthens the root and supports volume.',
      es: 'Fortalece la raíz y aporta volumen.',
    },
  },
  {
    id: 'sage',
    latin: 'Salvia officinalis',
    name: { cs: 'Šalvěj', en: 'Sage', es: 'Salvia' },
    note: {
      cs: 'Vyrovnává pokožku hlavy a dodává hloubku barvě.',
      en: 'Balances the scalp and deepens colour.',
      es: 'Equilibra el cuero cabelludo y realza el color.',
    },
  },
  {
    id: 'chamomile',
    latin: 'Matricaria chamomilla',
    name: { cs: 'Heřmánek', en: 'Chamomile', es: 'Manzanilla' },
    note: {
      cs: 'Zklidňuje a rozjasňuje světlé tóny.',
      en: 'Soothes and brightens light tones.',
      es: 'Calma e ilumina los tonos claros.',
    },
  },
  {
    id: 'rosemary',
    latin: 'Rosmarinus officinalis',
    name: { cs: 'Rozmarýn', en: 'Rosemary', es: 'Romero' },
    note: {
      cs: 'Prokrvuje pokožku a osvěžuje.',
      en: 'Stimulates the scalp and refreshes.',
      es: 'Estimula el cuero cabelludo y refresca.',
    },
  },
  {
    id: 'burdock',
    latin: 'Arctium lappa',
    name: { cs: 'Lopuch', en: 'Burdock', es: 'Bardana' },
    note: {
      cs: 'Regeneruje a chrání před lámavostí.',
      en: 'Repairs and guards against breakage.',
      es: 'Repara y protege contra la rotura.',
    },
  },
]

/* — Studio ritual steps — */
export const RITUAL = [
  {
    id: '01',
    name: { cs: 'Konzultace', en: 'Consultation', es: 'Consulta' },
    desc: {
      cs: 'Posloucháme. Poznáme vaše vlasy, rutinu a cíl.',
      en: 'We listen. We learn your hair, your routine, your goal.',
      es: 'Escuchamos. Conocemos tu cabello, tu rutina y tu meta.',
    },
  },
  {
    id: '02',
    name: { cs: 'Analýza', en: 'Analysis', es: 'Análisis' },
    desc: {
      cs: 'Zmapujeme strukturu vlasu a stav pokožky hlavy.',
      en: 'We map the hair fibre and the condition of your scalp.',
      es: 'Mapeamos la fibra capilar y el estado del cuero cabelludo.',
    },
  },
  {
    id: '03',
    name: { cs: 'Rituál', en: 'The Ritual', es: 'El Ritual' },
    desc: {
      cs: 'Ošetření pouze z rostlinných receptur, ušité na míru.',
      en: 'A treatment built only from plant formulas, tailored to you.',
      es: 'Un tratamiento solo con fórmulas vegetales, hecho a tu medida.',
    },
  },
  {
    id: '04',
    name: { cs: 'Výsledek', en: 'The Result', es: 'El Resultado' },
    desc: {
      cs: 'Vlasy, které vzlínají — a domácí plán, jak to udržet.',
      en: 'Hair that rises — and a home plan to keep it there.',
      es: 'Cabello que asciende — y un plan en casa para mantenerlo.',
    },
  },
]

/* — Numbers strip — */
export const STATS = [
  { value: '100%', label: { cs: 'Přírodní složení', en: 'Natural formula', es: 'Fórmula natural' } },
  { value: '0', label: { cs: 'Zbytečných chemikálií', en: 'Needless chemicals', es: 'Químicos innecesarios' } },
  { value: '12', label: { cs: 'Let řemesla', en: 'Years of craft', es: 'Años de oficio' } },
  { value: 'CZ', label: { cs: 'Vyrobeno v Česku', en: 'Made in Czechia', es: 'Hecho en Chequia' } },
]
