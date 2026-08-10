# FitStart

Aplicație statică mobile-first în limba română pentru începători la sală.

## Utilizare locală

Poți deschide direct `index.html` pentru o verificare rapidă. Instalarea și modul offline necesită HTTPS (Netlify) sau un server local pe `localhost`.

## Publicare pe Netlify

1. Intră pe https://app.netlify.com/drop.
2. Trage folderul `fitstart` sau conținutul arhivei ZIP în zona de încărcare.
3. Netlify publică site-ul automat; nu este nevoie de comandă de build.

## Instalare și testare pe dispozitive

- Android, Chrome: deschide adresa Netlify, apasă butonul `+` din antet și apoi „Instalează aplicația”.
- iPhone, Safari: deschide adresa Netlify, apasă `Partajare`, apoi „Adăugați pe ecranul principal”.
- Windows, Edge sau Chrome: deschide adresa Netlify și folosește butonul `+` din aplicație ori pictograma de instalare din bara browserului.
- Aplicația instalată se deschide într-o fereastră proprie. Datele rămân locale fiecărui dispozitiv.

Din butonul `⇩` poți descărca separat numai grupele musculare dorite. Nucleul aplicației este disponibil offline automat; animațiile mari sunt încărcate la cerere și nu mai blochează prima deschidere. Actualizările sunt aplicate numai după confirmarea utilizatorului, iar grupele deja descărcate rămân păstrate.

## Date și confidențialitate

Favoritele, istoricul, progresul, tema și notițele sunt salvate doar în `localStorage`, în browserul utilizatorului. Nu există backend, conturi, tracking sau servicii plătite.

Pagina „Progres” permite exportul tuturor datelor într-un backup JSON și restaurarea unei copii validate. Fișierele de backup sunt excluse implicit din Git și din publicarea Netlify.

## Verificare înainte de publicare

Rulează `npm test`. Auditul verifică numărul și instrucțiunile exercițiilor, existența demonstrațiilor, versiunea cache-ului, CSP, backupul și protecțiile Git/Netlify. Workflow-ul GitHub rulează aceeași verificare la pull request și la push în `main`; activați-l ca status check obligatoriu în regulile ramurii.

## Funcții incluse

- 69 de exerciții pentru 23 de porțiuni musculare din 8 grupe;
- două animații Canvas pe cadre pentru fiecare exercițiu: corect (verde) și greșeală specifică (roșu), cu poziții articulare, traiectorii și echipament;
- același manechin anatomic articulat este folosit în toate demonstrațiile, construit din componente generate după ghidul vizual al aplicației;
- exercițiul „Extensii lombare” include demonstrația anatomică premium, montată cadru cu cadru și explicată în română;
- toate cele 9 exerciții din grupa Spate au demonstrații anatomice premium validate și disponibile offline;
- toate cele 9 exerciții din grupa Piept au demonstrații anatomice premium cu 116 cadre, mișcare completă și revenire fluidă, disponibile offline;
- toate cele 9 exerciții din grupa Umeri au demonstrații anatomice premium; animația pentru fluturări inverse este reutilizată în siguranță, iar celelalte 8 sunt secvențe dedicate;
- toate cele 12 exerciții din grupa Picioare au demonstrații anatomice premium dedicate pentru cvadriceps, femurali, fesieri și gambe;
- toate cele 6 exerciții din grupa Biceps au demonstrații anatomice premium dedicate capului lung și capului scurt;
- toate cele 9 exerciții din grupa Triceps au demonstrații anatomice premium dedicate capului lung, lateral și medial;
- toate cele 9 exerciții din grupa Abdomen au demonstrații anatomice premium pentru abdomen superior, inferior, oblici și core;
- toate cele 6 exerciții din grupa Antebrațe au demonstrații anatomice premium pentru flexori, extensori, priză și rotația antebrațului;
- player nativ cu memorie redusă pentru demonstrațiile anatomice, inclusiv fallback sigur pe iPhone și dispozitive cu memorie limitată;
- repere vizuale opționale, fără săgeți direcționale, adaptate tipului de mișcare: coloană și șold, genunchi, coate și amplitudine;
- animația originală rămâne disponibilă ca variantă de rezervă dacă browserul nu poate decoda individual cadrele WebP;
- căutare și filtre după grupă, dificultate și echipament;
- jurnal individual pentru fiecare exercițiu, cu greutate, serii și repetări, ultima performanță precompletată și istoric local;
- sugestie prudentă pentru următoarea sesiune, adaptată intervalului de repetări și exercițiilor cu greutatea corpului;
- pagina „Progres” afișează performanțele recente și diferențele de greutate față de sesiunea precedentă;
- favorite, istoric, notițe și progres local;
- cronometru configurabil cu vibrație la final;
- plan de 3 zile și progres săptămânal;
- generator de program personalizat după obiectiv, 2–5 zile disponibile, durata ședinței și echipamente;
- filtrare preventivă pentru genunchi, zona lombară, umeri și încheieturi, cu avertisment clar că opțiunile nu înlocuiesc recomandarea unui specialist;
- volum adaptat obiectivului și acces direct din program la demonstrația fiecărui exercițiu;
- programul generat și preferințele sunt salvate local și pot fi înlocuite oricând cu planul implicit;
- mod întunecat, design responsive, navigare accesibilă;
- funcționare fără API-uri sau dependențe externe.
- instalare PWA pe Android, iPhone/iPad și Windows, cu instrucțiuni adaptate platformei;
- nucleu offline compact, animații încărcate la cerere și descărcare offline selectivă pe grupe;
- actualizări controlate, fără înlocuirea aplicației în mijlocul antrenamentului.

