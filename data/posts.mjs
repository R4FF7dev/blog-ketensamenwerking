// Bronwaarheid voor alle blogartikelen.
//
// Deze content is gemigreerd vanaf de bestaande live blog op https://ketensamenwerking.blog/
// (WordPress). Slugs zijn 1-op-1 overgenomen van de oorspronkelijke URL's zodat eventuele
// bestaande links blijven werken. Voor artikelen waarvan de volledige tekst op de bron alleen
// als losse PDF-download of extern gepubliceerd artikel beschikbaar is, staat hier de originele
// introductietekst plus een link naar de volledige publicatie: er is geen inhoud bijverzonnen.
//
// Elk object bevat platte metadata (title, slug, category, date, excerpt, cover, author) plus
// een `bodyHtml`-string met de artikeltekst als schone, semantische HTML. Deze scheiding is
// bewust: build/generate.mjs rendert hier statische pagina's uit, maar het model mapt ook direct
// op WordPress-postvelden (titel, uitgelicht beeld, categorie, post_content) mocht de site ooit
// naar een CMS verhuizen.

export const AUTHOR = {
  name: "dr.ing. Marcel Noordhuis",
  role: "Ketensamenwerking Interim & Advies",
  email: "m.noordhuis@ketensamenwerking.nl",
  photo: "assets/marcel-noordhuis-portret.jpg",
  bio: "Marcel Noordhuis is gepromoveerd op de waarde van ketensamenwerking bij nieuwbouw-, onderhouds- en renovatieprojecten en adviseert al ruim vijftien jaar woningcorporaties, bouwbedrijven en installateurs bij het inrichten en verbeteren van ketensamenwerking en RGS.",
};

export const SITE = {
  name: "Ketensamenwerking Blog",
  tagline: "Kennis en inzichten over ketensamenwerking in bouw en vastgoed",
  domain: "ketensamenwerking.blog",
  url: "https://ketensamenwerking.blog",
  description:
    "Artikelen, onderzoek en publicaties van dr.ing. Marcel Noordhuis over ketensamenwerking en RGS in de corporatie-, bouw- en installatiesector.",
  email: "m.noordhuis@ketensamenwerking.nl",
  linkedin: "https://www.linkedin.com/in/marcelnoordhuis/",
  siteUrl: "https://www.ketensamenwerking.nl/",
  platformUrl: "https://www.platform-ketensamenwerking.nl/",
};

export const CATEGORIES = [
  "Artikelen & publicaties",
  "Onderzoek Ketensamenwerking",
  "Resultaten (cijfers) - praktijk",
];

export const POSTS = [
  {
    slug: "kenmerken-van-ketensamenwerking-in-de-bouw",
    title: "Kenmerken van ketensamenwerking in de bouw",
    category: "Artikelen & publicaties",
    date: "2025-08-04",
    dateLabel: "4 augustus 2025",
    readingTime: "3 min leestijd",
    excerpt:
      "Wat maakt dat organisaties écht ketensamenwerking toepassen, en niet slechts een traditionele manier van werken hernoemen? De kenmerken van interne en externe ketensamenwerking op een rij.",
    cover: "assets/marcel-noordhuis.png",
    coverAlt: "dr.ing. Marcel Noordhuis, auteur van Ketensamenwerking Blog",
    featured: true,
    externalHref: "https://ketensamenwerking.blog/kenmerken-van-ketensamenwerking-in-de-bouw/",
    externalLabel: "Lees het volledige artikel",
    bodyHtml: `
      <p class="text-lg leading-relaxed text-slate-soft">
        Opdrachtgevers en opdrachtnemers in de bouw erkennen steeds meer dat strategische
        samenwerking op basis van de principes van ketensamenwerking kan helpen complexe
        vraagstukken rond duurzaamheid aan te pakken en faalkosten te voorkomen. Prestatiedoorbraken
        ontstaan pas als partijen langdurig, projectoverschrijdend samenwerken: teams hebben tijd
        nodig om elkaar te leren kennen, en leercurve-effecten treden vooral op wanneer dezelfde
        kernbezetting over meerdere projecten heen blijft samenwerken.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        Het artikel onderscheidt drie niveaus van ketensamenwerking: <strong class="font-semibold text-navy-deep">intern</strong>
        (tussen afdelingen, en tussen werkmaatschappijen van hetzelfde concern) en
        <strong class="font-semibold text-navy-deep">extern</strong> (tussen zelfstandige organisaties zonder
        hiërarchische structuur, gebaseerd op een win-winprincipe). Voor elk niveau worden de
        kenmerken uitgewerkt: van strategie, KPI&rsquo;s en procesoriëntatie bij interne
        samenwerking, tot vroege partnerbetrokkenheid, gedeelde dashboarding en een gezamenlijk
        incentivesysteem met winst- en risicodeling bij externe ketensamenwerking.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        Conclusie: idealiter richten organisaties eerst de interne niveaus in voordat ze aan externe
        ketensamenwerking beginnen. In de praktijk ontstaan vaak hybride vormen, waarbij een vast
        team ketensamenwerking toepast (de &ldquo;speedboot&rdquo;) terwijl de rest van de
        organisatie (de &ldquo;olietanker&rdquo;) nog traditioneel opereert.
      </p>
    `,
  },
  {
    slug: "leiderschap-bij-ketensamenwerking-2",
    title: "Leiderschap bij ketensamenwerking",
    category: "Onderzoek Ketensamenwerking",
    date: "2025-05-01",
    dateLabel: "1 mei 2025",
    readingTime: "2 min leestijd",
    excerpt:
      "Implementatie van ketensamenwerking vergt een heel ander type leiderschap dan het traditionele, hiërarchische leiderschap. Zes aandachtspunten voor leiderschap in de keten.",
    cover: "assets/covers/leiderschap.jpg",
    coverAlt: "Leiderschap bij ketensamenwerking",
    featured: false,
    externalHref: "https://ketensamenwerking.blog/leiderschap-bij-ketensamenwerking-2/",
    externalLabel: "Download de volledige publicatie",
    bodyHtml: `
      <p class="text-lg leading-relaxed text-slate-soft">
        Prof.dr. Jack van der Veen, hoogleraar Supply Chain Management, onderzocht wat goed
        leiderschap is voor supply chain managers die een samenwerkingsgerichte aanpak
        implementeren. Implementatie van ketensamenwerking vergt namelijk een heel ander type
        leiderschap dan het traditionele, hiërarchische leiderschap.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        De publicatie beschrijft hoe goed leiderschap binnen de ketencontext wordt gedefinieerd,
        bakent Supply Chain Management formeel af en laat zien waar de supply chain manager past
        binnen productieketens. Zes aandachtspunten voor leiderschap in de keten worden nader
        uitgewerkt.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        De volledige publicatie &ldquo;Leiderschap bij ketensamenwerking&rdquo; is als download
        beschikbaar op de oorspronkelijke publicatie.
      </p>
    `,
  },
  {
    slug: "publicatie-gelijkwaardig-samenwerken-door-rws",
    title: "Publicatie gelijkwaardig samenwerken door RWS",
    category: "Resultaten (cijfers) - praktijk",
    date: "2025-01-06",
    dateLabel: "6 januari 2025",
    readingTime: "2 min leestijd",
    excerpt:
      "Rijkswaterstaat en marktpartijen werkten met de Klankbordgroep Markt en Assetmanagement aan de vraag hoe vanuit meer gezamenlijkheid invulling kan worden gegeven aan assetmanagement.",
    cover: "assets/covers/gelijkwaardig-samenwerken.jpg",
    coverAlt: "Gelijkwaardig samenwerken, publicatie Rijkswaterstaat",
    featured: false,
    externalHref: "https://ketensamenwerking.blog/publicatie-gelijkwaardig-samenwerken-door-rws/",
    externalLabel: "Download het boekje Visie Gelijkwaardig Samenwerken",
    bodyHtml: `
      <p class="text-lg leading-relaxed text-slate-soft">
        Met tientallen onderhoudscontracten, verspreid over het hele land, werken Rijkswaterstaat en
        marktpartijen samen aan het onderhoud van de Nederlandse infrastructuur. De Klankbordgroep
        Markt en Assetmanagement onderzocht hoe daarin vanuit meer gezamenlijkheid invulling kan
        worden gegeven aan assetmanagement.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        Een belangrijke conclusie: gezamenlijkheid krijgt pas waarde als die wordt voorafgegaan door
        gelijkwaardig samenwerken: het herkennen en erkennen van elkaars belangen, positie en
        inbreng, vanuit wederzijds respect en oprechte interesse. Dat resulteerde in het boekje
        &ldquo;Visie Gelijkwaardig Samenwerken&rdquo;, ontwikkeld door RWS en de markt samen: geen
        handleiding voor succes, maar een handreiking met praktische voorbeelden, omdat de
        toepassing per project verschilt.
      </p>
    `,
  },
  {
    slug: "ontketen-je-netwerk-in-de-bouw-en-vastgoedsector",
    title: "Ontketen je netwerk in de bouw en vastgoedsector",
    category: "Artikelen & publicaties",
    date: "2025-01-06",
    dateLabel: "6 januari 2025",
    readingTime: "2 min leestijd",
    excerpt:
      "Vertrouwen, wederzijds begrip en open communicatie zijn de basis van elke goede samenwerking. Een gesprek met Luc Reusken, Frans Brouwers en Stan van den Thillart, die de corporatie- én de aannemerswereld van binnenuit kennen.",
    cover: "assets/covers/ontketen-je-netwerk.jpg",
    coverAlt: "Netwerken in de bouw en vastgoedsector",
    featured: false,
    externalHref: "https://ketensamenwerking.blog/ontketen-je-netwerk-in-de-bouw-en-vastgoedsector/",
    externalLabel: "Lees het volledige gesprek",
    bodyHtml: `
      <p class="text-lg leading-relaxed text-slate-soft">
        Vraag het een willekeurige relatietherapeut, en die zal het beamen: vertrouwen, wederzijds
        begrip en open communicatie zijn de basis van elke goede relatie. Niet alleen privé, maar ook
        binnen professionele samenwerkingen. Toch is dat makkelijker gezegd dan gedaan. In de praktijk
        betekent het compromissen sluiten, geven en nemen, vertrouwen hebben, en vooral: je kunnen
        verplaatsen in de ander.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        Wie dat als geen ander kan? Degenen die aan beide kanten van de samenwerking hebben gestaan.
        Zoals Luc Reusken, Frans Brouwers en Stan van den Thillart. Zij kennen alle drie zowel de
        corporatie als de aannemerswereld van binnenuit. Een verslag van een gesprek over onder andere
        onderbuikgevoelens, geld, risico, imago en innovatie.
      </p>
    `,
  },
  {
    slug: "de-mogelijke-inrichting-van-kpi-dashboards-bij-de-implementatie-van-ketensamenwerking",
    title: "De mogelijke inrichting van KPI-dashboards bij de implementatie van ketensamenwerking",
    category: "Artikelen & publicaties",
    date: "2024-10-03",
    dateLabel: "3 oktober 2024",
    readingTime: "2 min leestijd",
    excerpt:
      "Stuur je in ketensamenwerking op output of op proces? En aan welke resultaatgebieden kun je dan denken? Over het inrichten van een KPI-dashboard dat ketenpartners zelf de regie geeft.",
    cover: "assets/covers/kpi-dashboards.jpg",
    coverAlt: "KPI-dashboard bij ketensamenwerking",
    featured: false,
    externalHref:
      "https://ketensamenwerking.blog/de-mogelijke-inrichting-van-kpi-dashboards-bij-de-implementatie-van-ketensamenwerking/",
    externalLabel: "Lees het volledige artikel",
    bodyHtml: `
      <p class="text-lg leading-relaxed text-slate-soft">
        Ketensamenwerking vraagt om maximaal gebruik van leercurve-effecten tussen ketenpartners. Om
        vast te stellen of dat lukt, is prestatiemeten (dashboarding) onmisbaar. Maar waarop
        stuur je dan: op output, of op proces?
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        Het artikel bepleit te sturen op outputperformance (resultaatgebieden), vergelijkbaar met de
        resultaatgebieden uit het INK-model. Pas bij grote afwijkingen tussen beoogde en
        gerealiseerde resultaten loont het om het onderliggende proces in detail te analyseren, met
        een multidisciplinair verbeterteam van de betrokken ketenpartners. Bewust wordt gekozen voor
        weinig KPI&rsquo;s (&ldquo;less is more&rdquo;) en voor het teruggeven van de regie aan
        ketenpartners over hóé zij hun prestaties realiseren, in plaats van dat opdrachtgevers dat
        voorschrijven.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        Conclusie: idealiter neemt de ketenregisseur het initiatief om afwijkingen samen met
        ketenpartners op te lossen, maar bij een goed ingericht incentivesysteem, waarin
        partners zelf de pijn voelen van niet-gerealiseerde prestaties, nemen partners dat
        initiatief ook uit zichzelf.
      </p>
    `,
  },
  {
    slug: "het-belang-van-dashboarding-bij-het-implementeren-van-ketensamenwerking",
    title: "Het belang van dashboarding bij het implementeren van ketensamenwerking",
    category: "Artikelen & publicaties",
    date: "2024-10-02",
    dateLabel: "2 oktober 2024",
    readingTime: "2 min leestijd",
    excerpt:
      "Een van de beloften van ketensamenwerking is dat de toepassing resulteert in verbeterde prestaties. Maar zonder dashboarding vanaf de start blijft die belofte onbewezen.",
    cover: "assets/covers/belang-van-dashboarding.webp",
    coverAlt: "Dashboarding bij ketensamenwerking",
    featured: false,
    externalHref:
      "https://ketensamenwerking.blog/het-belang-van-dashboarding-bij-het-implementeren-van-ketensamenwerking/",
    externalLabel: "Lees het volledige artikel",
    bodyHtml: `
      <p class="text-lg leading-relaxed text-slate-soft">
        Een van de belangrijkste beloften van ketensamenwerking is dat de toepassing resulteert in
        verbeterde prestaties op tijd, geld, kwaliteit, aantallen en duurzaamheid ten opzichte van
        traditionele samenwerkingsvormen. Om die belofte waar te kunnen maken, moet vanaf het
        allereerste begin, nog vóór de samenwerking geformaliseerd wordt, worden
        vastgesteld wat de gezamenlijke, strategische doelstellingen zijn, met voldoende win-win voor
        alle ketenpartners.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        In de praktijk blijft de daadwerkelijke concretisering van een monitoring- en
        dashboardinginfrastructuur na het sluiten van de samenwerkingsovereenkomst echter vaak veel te
        lang liggen. Daardoor is niet vast te stellen wat de nulmeting (baseline) was, in welke mate
        jaardoelen worden gehaald, en of er over de jaren heen daadwerkelijk verbeterde prestaties
        zijn gerealiseerd.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        Conclusie: zonder data over de daadwerkelijk geleverde prestaties is niet vast te stellen of
        de doelen uit de samenwerkingsovereenkomst zijn gehaald, en kan er onvoldoende gestuurd worden
        op het continu verbeteren waar ketensamenwerking nu juist op is gebaseerd. Wie niet
        weet waar hij staat, weet ook niet waarop hij moet ingrijpen.
      </p>
    `,
  },
  {
    slug: "corporaties-en-bouwpartijen-die-al-jarenlang-aan-ketensamenwerking-doen-hebben-nog-steeds-verbeterpotentieel-op-de-onderliggende-principes-van-ketensamenwerking",
    title:
      "Corporaties en bouwpartijen die al jarenlang aan ketensamenwerking doen hebben nog steeds verbeterpotentieel",
    category: "Onderzoek Ketensamenwerking",
    date: "2024-08-13",
    dateLabel: "13 augustus 2024",
    readingTime: "2 min leestijd",
    excerpt:
      "Onderzoek onder 15 vastgoedonderhoudsbedrijven en zo'n 45 woningcorporaties laat zien dat er op meerdere onderliggende principes van ketensamenwerking nog verbetering te realiseren is.",
    cover: "assets/covers/verbeterpotentieel.jpg",
    coverAlt: "Onderzoek naar ketensamenwerking tussen corporaties en bouwpartijen",
    featured: false,
    externalHref:
      "https://ketensamenwerking.blog/corporaties-en-bouwpartijen-die-al-jarenlang-aan-ketensamenwerking-doen-hebben-nog-steeds-verbeterpotentieel-op-de-onderliggende-principes-van-ketensamenwerking/",
    externalLabel: "Download het volledige onderzoek",
    bodyHtml: `
      <p class="text-lg leading-relaxed text-slate-soft">
        Onderzoek onder 15 vastgoedonderhoudsbedrijven, die al jarenlang in ketensamenwerking
        samenwerken met circa 45 woningcorporaties, brengt de implementatieknelpunten van
        ketensamenwerking tussen woningcorporaties en bouwpartijen in kaart.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        Uit het onderzoek blijkt dat er op meerdere onderliggende, kenmerkende principes van
        ketensamenwerking verbetering te realiseren is. Een betere toepassing van deze principes zou
        de beoogde prestatieverbeteringen op voorspelbaarheid, tijd, kosten, kwaliteit en
        duurzaamheid dichterbij kunnen brengen.
      </p>
    `,
  },
  {
    slug: "ketensamenwerking-leidt-tot-betere-prestaties-de-ervaringen-van-zowonen-partners",
    title: "Ketensamenwerking leidt tot betere prestaties: de ervaringen van ZOwonen &amp; partners",
    category: "Resultaten (cijfers) - praktijk",
    date: "2024-04-24",
    dateLabel: "24 april 2024",
    readingTime: "2 min leestijd",
    excerpt:
      "Vele partijen zijn bezig met de toepassing van ketensamenwerking, maar we komen nog te veel partijen tegen die onder die noemer vooral een traditionele manier van werken hernoemen. Bij ZOwonen en haar ketenpartners is dat anders.",
    cover: null,
    featured: false,
    externalHref:
      "https://ketensamenwerking.blog/ketensamenwerking-leidt-tot-betere-prestaties-de-ervaringen-van-zowonen-partners/",
    externalLabel: "Bekijk de video en het volledige verhaal",
    bodyHtml: `
      <p class="text-lg leading-relaxed text-slate-soft">
        Vele partijen zijn tegenwoordig bezig met de toepassing van ketensamenwerking. We komen echter
        nog te veel partijen tegen die onder de noemer ketensamenwerking eigenlijk een traditionele
        manier van werken hernoemen. Het daadwerkelijk implementeren van ketensamenwerking vraagt om
        een fundamenteel andere manier van werken.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        De belofte van ketensamenwerking is dat je daarmee tot verbeterde prestaties komt op tijd,
        geld, kwaliteit en aantallen, en daardoor meer klantwaarde realiseert dan op de traditionele
        manier van werken. Weinig organisaties kunnen die belofte met meetbare resultaten
        onderbouwen. Bij ZOwonen en haar ketenpartners is dat anders: de toepassing van
        ketensamenwerking heeft daar daadwerkelijk geleid tot meetbaar betere prestaties.
      </p>
    `,
  },
  {
    slug: "organisatienetwerken-ook-voor-corporaties-de-organisatievorm-van-de-toekomst",
    title: "Organisatienetwerken: ook voor corporaties de organisatievorm van de toekomst",
    category: "Artikelen & publicaties",
    date: "2024-03-16",
    dateLabel: "16 maart 2024",
    readingTime: "2 min leestijd",
    excerpt:
      "Waarom zou je je als corporatie moeten bezighouden met organisatienetwerken, en hoe groot is de kans dat zo'n netwerk daadwerkelijk slaagt? Ritske Dankert in gesprek met hoogleraar Patrick Kenis.",
    cover: null,
    featured: false,
    externalHref: "https://decorporatiestrateeg.nl/",
    externalLabel: "Lees het volledige artikel op De Corporatie Strateeg",
    bodyHtml: `
      <p class="text-lg leading-relaxed text-slate-soft">
        Voor u gelezen in een online artikel van &ldquo;De Corporatie Strateeg&rdquo;. Waarom zou je
        je als corporatie moeten bezighouden met organisatienetwerken? En hoe groot is de kans dat
        zo&rsquo;n organisatienetwerk daadwerkelijk slaagt? Ritske Dankert ging hierover in gesprek met
        Patrick Kenis, hoogleraar Public Governance aan de Tilburg School of Economics and Management
        (Universiteit van Tilburg). Patrick deed uitgebreid onderzoek naar governance binnen diverse
        sectoren en naar de effectiviteit van samenwerking binnen organisatienetwerken.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        <strong class="font-semibold text-navy-deep">Noot Marcel:</strong> de beschrijving van
        organisatienetwerken lijkt wel heel erg op de principes van externe ketensamenwerking
        (ketensamenwerking niveau 3): het stroomlijnen van zelfstandige organisaties die samen
        producten en diensten realiseren. Ik ben zeer benieuwd hoe u dat ziet.
      </p>
    `,
  },
  {
    slug: "mogelijkheden-en-kansen-voor-de-toepassing-van-ketensamenwerking-indien-woningcorporaties-aanbestedingsplichtig-worden",
    title: "Mogelijkheden en kansen voor ketensamenwerking als woningcorporaties aanbestedingsplichtig worden",
    category: "Artikelen & publicaties",
    date: "2023-04-16",
    dateLabel: "16 april 2023",
    readingTime: "2 min leestijd",
    excerpt:
      "Blijft ketensamenwerking een haalbare optie als woningcorporaties aanbestedingsplichtig worden? Een publicatie over mededingingsrecht, aanbestedingsprocedures en de huidige regelgeving voor corporaties.",
    cover: null,
    featured: false,
    externalHref:
      "https://ketensamenwerking.blog/mogelijkheden-en-kansen-voor-de-toepassing-van-ketensamenwerking-indien-woningcorporaties-aanbestedingsplichtig-worden/",
    externalLabel: "Download de volledige publicatie",
    bodyHtml: `
      <p class="text-lg leading-relaxed text-slate-soft">
        Een publicatie van Bettina Hertstein, Andrea Chao en dr.ing. Marcel Noordhuis over de vraag of
        (en hoe) ketensamenwerking haalbaar blijft op het moment dat woningcorporaties
        aanbestedingsplichtig worden.
      </p>
      <p class="mt-5 text-base leading-relaxed text-slate-soft">
        De publicatie gaat in op de belangrijkste pijlers van het mededingingsrecht en
        aanbestedingsprocedures, de huidige regelgeving voor woningcorporaties, en sluit af met
        aanbevelingen en conclusies over de mogelijkheden en kansen die overblijven voor
        ketensamenwerking binnen een aanbestedingsplichtig kader.
      </p>
    `,
  },
  {
    slug: "ketensamenwerking-bij-woonbedrijf-2022",
    title: "Ketensamenwerking bij Woonbedrijf [2022]",
    category: "Resultaten (cijfers) - praktijk",
    date: "2022-06-25",
    dateLabel: "25 juni 2022",
    readingTime: "1 min leestijd",
    excerpt:
      "Een publicatie in het blad van Woonbedrijf (Eindhoven) over het ketensamenwerkingsprogramma dat de corporatie daar heeft uitgerold.",
    cover: "assets/covers/woonbedrijf-2022.jpg",
    coverAlt: "Ketensamenwerkingsprogramma bij Woonbedrijf Eindhoven",
    featured: false,
    externalHref: "https://ketensamenwerking.blog/ketensamenwerking-bij-woonbedrijf-2022/",
    externalLabel: "Lees de publicatie van Woonbedrijf",
    bodyHtml: `
      <p class="text-lg leading-relaxed text-slate-soft">
        Een publicatie in het blad van Woonbedrijf (Eindhoven), waarin de corporatie stilstaat bij het
        ketensamenwerkingsprogramma dat ze daar hebben uitgerold.
      </p>
    `,
  },
];

export function sortedPosts() {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function featuredPost() {
  return POSTS.find((p) => p.featured) ?? sortedPosts()[0];
}
