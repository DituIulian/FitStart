const MUSCLE_DATA = [
  {group:'Piept', icon:'P', color:'#e88369', parts:[
    ['Piept superior',['Împins înclinat cu gantere','Împins înclinat la aparat','Fluturări de jos în sus la cablu'],'gantere'],
    ['Piept median',['Împins la piept cu gantere','Presă la aparat pentru piept','Flotări clasice'],'greutatea corpului'],
    ['Piept inferior',['Flotări cu mâinile ridicate','Împins declinat la aparat','Fluturări de sus în jos la cablu'],'cablu'] ]},
  {group:'Spate', icon:'S', color:'#4e8f83', parts:[
    ['Marele dorsal',['Tracțiuni asistate','Tracțiuni la helcometru priză neutră','Pullover la cablu'],'cablu'],
    ['Spate superior',['Ramat la aparat cu sprijin','Ramat la cablu din șezut','Fluturări inverse la aparat'],'aparat'],
    ['Lombari',['Extensii lombare','Bird-dog controlat','Îndreptări românești ușoare'],'greutatea corpului'] ]},
  {group:'Umeri', icon:'U', color:'#d9aa55', parts:[
    ['Deltoid anterior',['Presă deasupra capului la aparat','Ridicări frontale cu disc','Landmine press unilateral'],'aparat'],
    ['Deltoid lateral',['Ridicări laterale cu gantere','Ridicări laterale la cablu','Ridicări laterale la aparat'],'gantere'],
    ['Deltoid posterior',['Fluturări inverse la aparat','Face pull la cablu','Ridicări posterioare pe bancă'],'cablu'] ]},
  {group:'Picioare', icon:'Pi', color:'#8f7567', parts:[
    ['Cvadriceps',['Genuflexiune la cutie','Presă pentru picioare','Extensii pentru picioare'],'aparat'],
    ['Biceps femural',['Flexii femurali la aparat','Îndreptări românești cu gantere','Flexii femurali cu mingea'],'gantere'],
    ['Fesieri',['Hip thrust la aparat','Podul fesier','Abducții la aparat'],'aparat'],
    ['Gambe',['Ridicări pe vârfuri din picioare','Ridicări pe vârfuri din șezut','Presă pentru gambe'],'aparat'] ]},
  {group:'Biceps', icon:'B', color:'#9a79a9', parts:[
    ['Cap lung',['Flexii înclinate cu gantere','Flexii ciocan','Flexii la cablu din spate'],'gantere'],
    ['Cap scurt',['Flexii preacher la aparat','Flexii concentrate','Flexii cu bara EZ priză largă'],'bara EZ'] ]},
  {group:'Triceps', icon:'T', color:'#668fba', parts:[
    ['Cap lung',['Extensii deasupra capului la cablu','Extensii cu gantera din șezut','Skull crusher cu bara EZ'],'cablu'],
    ['Cap lateral',['Împingeri la cablu cu bara','Împingeri la cablu priză inversă','Flotări cu priză îngustă la bancă'],'cablu'],
    ['Cap medial',['Împingeri cu frânghia','Presă la aparat priză îngustă','Extensii unilaterale la cablu'],'cablu'] ]},
  {group:'Abdomen', icon:'A', color:'#c27676', parts:[
    ['Abdomen superior',['Crunch la aparat','Crunch pe saltea','Crunch la cablu din genunchi'],'greutatea corpului'],
    ['Abdomen inferior',['Ridicări de genunchi la scaun','Reverse crunch','Dead bug controlat'],'greutatea corpului'],
    ['Oblici și core',['Pallof press','Planșă laterală pe genunchi','Wood chop la cablu'],'cablu'] ]},
  {group:'Antebrațe', icon:'An', color:'#799864', parts:[
    ['Flexori',['Flexii ale încheieturii cu gantere','Strângere cu gripper','Menținere statică cu gantere'],'gantere'],
    ['Extensori',['Extensii ale încheieturii','Flexii inverse cu bara EZ','Pronație-supinație cu gantera'],'gantere'] ]},
];

const cueFor = (group, part) => {
  const cues = {
    Piept:['Omoplații ușor retrași, pieptul sus și tălpile stabile.','Coatele la aproximativ 45° față de trunchi; împinge fără să ridici umerii.'],
    Spate:['Ține pieptul sus și inițiază mișcarea din omoplați.','Trage coatele spre șolduri, fără balans sau smucire.'],
    Umeri:['Coastele rămân coborâte și gâtul relaxat.','Mișcă lent; nu ridica greutatea prin balans.'],
    Picioare:['Genunchii urmăresc direcția degetelor, talpa rămâne lipită.','Coboară doar cât poți păstra bazinul și coloana controlate.'],
    Biceps:['Ține coatele fixe lângă trunchi și încheieturile neutre.','Ridică fără elan, apoi coboară în 2–3 secunde.'],
    Triceps:['Ține coatele stabile și umerii departe de urechi.','Extinde controlat fără a bloca agresiv cotul.'],
    Abdomen:['Expiră și apropie coastele de bazin fără să tragi de gât.','Menține abdomenul încordat și zona lombară controlată.'],
    Antebrațe:['Sprijină antebrațul și mișcă doar încheietura.','Folosește amplitudine confortabilă și priză controlată.']
  }; return cues[group];
};

// Instrucțiunile sunt derivate din biomecanica fiecărei mișcări, nu doar din grupa
// musculară. Numele exercițiului este inclus intenționat, astfel încât fiecare fișă
// să rămână autonomă și să poată fi verificată automat.
const guideFor = (name, group, equipment) => {
  const s=name.toLowerCase();
  let setup='', action='', mistake='';
  if(/împins|presă la aparat pentru piept/.test(s)&&group==='Piept'){
    setup=s.includes('gantere')?'Așază ganterele deasupra coatelor, cu tălpile ferme și omoplații retrași.':'Reglează șezutul astfel încât mânerele să fie la mijlocul pieptului și ține omoplații retrași.';
    action=s.includes('înclinat')?'Împinge oblic în sus, fără să apropii umerii de urechi, apoi revino până simți pieptul întins.':'Împinge înainte până aproape de extensia coatelor și revino lent, păstrând antebrațele verticale.';
    mistake='Nu desprinde umerii de sprijin și nu lăsa coatele să se deschidă la 90°.';
  }else if(s.includes('fluturări')&&group==='Piept'){
    setup='Stai stabil, cu trunchiul ușor înclinat și coatele moi, păstrate la același unghi.';
    action=s.includes('jos în sus')?'Adu mânerele din lateral-jos spre nivelul sternului, pe un arc larg.':'Adu mânerele din lateral-sus spre partea de jos a sternului, pe un arc larg.';
    mistake='Nu transforma fluturarea într-o împingere și nu trece mâinile mult dincolo de linia mediană.';
  }else if(s.includes('flotări')){
    setup=s.includes('ridicate')?'Pune palmele pe un sprijin stabil, puțin mai late decât umerii, și aliniază capul, trunchiul și bazinul.':s.includes('îngustă')?'Sprijină palmele pe bancă la lățimea umerilor și ține coatele aproape de corp.':'Pune palmele puțin mai late decât umerii și formează o linie dreaptă de la cap la călcâie.';
    action='Coboară pieptul controlat spre sprijin, apoi împinge podeaua fără să pierzi alinierea trunchiului.';
    mistake='Nu lăsa bazinul să cadă și nu deschide coatele excesiv.';
  }else if(/tracțiuni|helcometru/.test(s)){
    setup='Prinde bara neutru și fixează trunchiul; începe cu umerii coborâți, nu ridicați spre urechi.';
    action=s.includes('asistate')?'Coboară coatele spre coaste până bărbia ajunge aproape de bară, apoi întinde brațele controlat.':'Trage mânerul spre partea de sus a pieptului, conducând cu coatele, apoi revino fără să pierzi tensiunea.';
    mistake='Nu te lăsa pe spate și nu smuci bara din brațe.';
  }else if(s.includes('ramat')){
    setup=s.includes('sprijin')?'Reglează suportul la stern, prinde mânerele și menține pieptul lipit de pernă.':'Stai înalt pe șezut, cu genunchii moi și coloana neutră.';
    action='Trage coatele înapoi spre șolduri și apropie omoplații; revino până brațele se întind fără rotunjirea spatelui.';
    mistake='Nu ridica umerii și nu transforma repetarea într-un balans al trunchiului.';
  }else if(s.includes('pullover')){
    setup='Stai cu fața la cablu, brațele aproape întinse și șoldurile împinse ușor înapoi.';
    action='Coboară bara în arc spre coapse folosind dorsalii, apoi revino numai până coastele rămân coborâte.';
    mistake='Nu flexa și extinde coatele ca la o împingere de triceps.';
  }else if(/îndreptări românești/.test(s)){
    setup='Ține greutatea aproape de coapse, tălpile la lățimea șoldurilor și genunchii ușor flexați.';
    action='Împinge șoldurile înapoi cu spatele neutru, apoi strânge fesierii pentru a reveni în picioare.';
    mistake='Nu rotunji zona lombară și nu coborî greutatea mai jos decât permite mobilitatea femuralilor.';
  }else if(s.includes('extensii lombare')){
    setup='Reglează suportul sub pliul șoldului și fixează tălpile; trunchiul rămâne lung.';
    action='Coboară din șolduri și revino până corpul formează o linie dreaptă, strângând fesierii.';
    mistake='Nu hiperextinde coloana și nu arunca trunchiul peste linia corpului.';
  }else if(s.includes('bird-dog')){
    setup='Așază palmele sub umeri și genunchii sub șolduri, cu abdomenul activ și spatele neutru.';
    action='Întinde simultan brațul și piciorul opus fără să rotești bazinul; revino lent și schimbă partea.';
    mistake='Nu arcui zona lombară și nu ridica piciorul mai sus decât șoldul.';
  }else if(/presă deasupra|landmine/.test(s)){
    setup=s.includes('landmine')?'Stai în fandare stabilă, ține capătul barei la umărul opus piciorului din față.':'Reglează șezutul pentru ca mânerele să pornească la nivelul umerilor și sprijină spatele.';
    action=s.includes('landmine')?'Împinge bara oblic înainte și în sus, lăsând omoplatul să se rotească natural.':'Împinge mânerele deasupra capului fără să ridici umerii, apoi coboară controlat.';
    mistake='Nu arcui zona lombară și nu compensa prin împingerea coastelor înainte.';
  }else if(s.includes('ridicări laterale')){
    setup='Ține brațele ușor în fața trunchiului, coatele moi și umerii coborâți.';
    action='Ridică brațele în lateral până aproape de nivelul umerilor, conducând cu coatele, apoi coboară lent.';
    mistake='Nu ridica umerii, nu balansa trunchiul și nu duce mâinile mult peste nivelul umerilor.';
  }else if(s.includes('ridicări frontale')){
    setup='Ține discul în fața coapselor, genunchii moi și coastele coborâte.';
    action='Ridică discul până la nivelul umerilor cu brațele aproape întinse, apoi coboară controlat.';
    mistake='Nu te lăsa pe spate pentru a porni greutatea.';
  }else if(/face pull|inverse|posterioare/.test(s)){
    setup=s.includes('bancă')?'Sprijină pieptul pe banca înclinată și lasă brațele sub umeri.':'Poziționează mânerele la nivelul feței sau pieptului și menține trunchiul fix.';
    action=s.includes('face pull')?'Trage frânghia spre sprâncene, separând capetele și rotind ușor brațele în exterior.':'Deschide brațele în lateral până omoplații se apropie, apoi revino lent.';
    mistake='Nu ridica umerii și nu împinge capul înainte.';
  }else if(s.includes('genuflexiune')){
    setup='Stai în fața cutiei, cu tălpile puțin mai late decât șoldurile și greutatea distribuită pe toată talpa.';
    action='Împinge șoldurile înapoi, atinge ușor cutia și ridică-te împingând podeaua.';
    mistake='Nu te prăbuși pe cutie și nu lăsa genunchii să cadă spre interior.';
  }else if(s==='presă pentru picioare'){
    setup='Așază tălpile la lățimea umerilor pe platformă și păstrează bazinul lipit de spătar.';
    action='Coboară platforma până genunchii rămân controlați, apoi împinge prin toată talpa.';
    mistake='Nu desprinde bazinul de spătar și nu bloca agresiv genunchii.';
  }else if(s==='extensii pentru picioare'){
    setup='Aliniază axul aparatului cu genunchiul și așază ruloul deasupra gleznelor.';
    action='Întinde genunchii fără elan, oprește scurt sus și coboară lent.';
    mistake='Nu lovi greutățile și nu ridica șoldurile de pe șezut.';
  }else if(s.includes('flexii femurali')){
    setup=s.includes('mingea')?'Culcă-te cu călcâiele pe minge și ridică bazinul într-o linie stabilă.':'Aliniază genunchiul cu axul aparatului și fixează bazinul pe suport.';
    action=s.includes('mingea')?'Trage mingea spre bazin flexând genunchii, apoi întinde picioarele fără să cobori șoldurile.':'Adu călcâiele spre fesieri, oprește scurt și revino controlat.';
    mistake='Nu arcui zona lombară și nu pierde controlul în revenire.';
  }else if(/hip thrust|podul fesier/.test(s)){
    setup=s.includes('aparat')?'Centrează centura peste bazin, tălpile ferme și spatele sprijinit.':'Culcă-te cu genunchii îndoiți și tălpile la o distanță la care tibia devine aproape verticală sus.';
    action='Împinge prin călcâie și ridică bazinul până trunchiul și coapsele se aliniază; coboară controlat.';
    mistake='Nu hiperextinde zona lombară și nu împinge din vârfuri.';
  }else if(s.includes('abducții')){
    setup='Așază genunchii pe pernele aparatului și păstrează pelvisul neutru, lipit de șezut.';
    action='Deschide genunchii controlat, oprește scurt și revino fără ca plăcile să se lovească.';
    mistake='Nu balansa trunchiul și nu forța amplitudinea din zona lombară.';
  }else if(/vârfuri|gambe/.test(s)){
    setup='Așază partea din față a tălpilor stabil pe platformă și lasă călcâiele să coboare confortabil.';
    action='Ridică-te pe vârfuri cât poți fără balans, oprește sus și coboară lent.';
    mistake='Nu ricoșa în poziția de jos și nu roti gleznele spre exterior.';
  }else if(group==='Biceps'){
    setup=s.includes('preacher')?'Aliniază coatele pe suport și păstrează brațele lipite de pernă.':s.includes('concentrate')?'Sprijină cotul pe interiorul coapsei și fixează umărul.':'Ține coatele stabile și încheieturile neutre, adaptând poziția la cablu sau gantere.';
    action='Flexează coatele până bicepsul se scurtează fără deplasarea umărului, apoi coboară în 2–3 secunde.';
    mistake='Nu folosi elan și nu lăsa coatele să fugă înainte.';
  }else if(group==='Triceps'){
    setup=/deasupra|gantera|skull/.test(s)?'Fixează brațele lângă cap și ține coatele orientate înainte.':'Stai stabil la cablu sau aparat, cu coatele lipite de trunchi.';
    action=/deasupra|gantera|skull/.test(s)?'Îndoaie coatele controlat, apoi întinde antebrațele fără să miști brațele.':'Extinde coatele până aproape de capăt, oprește scurt și revino lent.';
    mistake='Nu deschide coatele și nu mișca umerii pentru a termina repetarea.';
  }else if(/crunch/.test(s)){
    setup=s.includes('cablu')?'Îngenunchează sub cablu și ține frânghia lângă tâmple fără să tragi cu brațele.':s.includes('aparat')?'Reglează aparatul pentru ca axul de flexie să fie în dreptul trunchiului.':'Culcă-te cu tălpile sprijinite și mâinile ușor lângă cap, fără să tragi de ceafă.';
    action='Apropie coastele de bazin printr-o flexie scurtă a trunchiului, expirând, apoi revino controlat.';
    mistake='Nu trage de gât și nu transforma mișcarea într-o flexie din șold.';
  }else if(/ridicări de genunchi|reverse crunch/.test(s)){
    setup=s.includes('scaun')?'Sprijină antebrațele și spatele pe scaun, cu umerii coborâți.':'Culcă-te și ține coapsele deasupra șoldurilor, cu zona lombară controlată.';
    action='Rulează bazinul spre coaste și ridică genunchii fără balans, apoi coboară lent.';
    mistake='Nu balansa picioarele și nu arcui zona lombară la coborâre.';
  }else if(s.includes('dead bug')){
    setup='Culcă-te cu brațele sus și șoldurile/genunchii la 90°, lipind ușor zona lombară de saltea.';
    action='Coboară brațul și piciorul opus fără să pierzi contactul lombar, apoi schimbă partea.';
    mistake='Nu grăbi alternarea și nu lăsa coastele să se ridice.';
  }else if(s.includes('pallof')){
    setup='Stai lateral față de cablu, tălpile stabile, și ține mânerul la stern.';
    action='Împinge mânerul drept înainte și rezistă rotației trunchiului, apoi revino la stern.';
    mistake='Nu roti umerii spre cablu și nu deplasa bazinul.';
  }else if(s.includes('planșă laterală')){
    setup='Sprijină cotul sub umăr și genunchii îndoiți, cu capul, trunchiul și coapsele aliniate.';
    action='Ridică bazinul și menține respirația calmă, apoi coboară controlat.';
    mistake='Nu lăsa umărul să se prăbușească și nu roti pieptul spre podea.';
  }else if(s.includes('wood chop')){
    setup='Stai lateral față de cablu, cu tălpile stabile și brațele aproape întinse.';
    action='Rotește trunchiul și bazinul împreună pe diagonală, controlând revenirea.';
    mistake='Nu trage doar din brațe și nu bloca genunchii în timpul rotației.';
  }else if(/încheieturii|pronație|inverse/.test(s)&&group==='Antebrațe'){
    setup='Sprijină antebrațul pe bancă și lasă numai mâna să se miște, cu o greutate mică.';
    action=s.includes('pronație')?'Rotește lent palma în sus și în jos, fără să deplasezi cotul.':'Mișcă încheietura prin amplitudinea confortabilă și revino lent.';
    mistake='Nu ridica antebrațul de pe sprijin și nu forța capătul amplitudinii.';
  }else if(s.includes('gripper')){
    setup='Ține gripperul adânc în palmă, cu încheietura neutră și umărul relaxat.';
    action='Strânge mânerele controlat, oprește scurt și deschide degetele lent.';
    mistake='Nu îndoi încheietura și nu lăsa mânerul să sară la revenire.';
  }else{
    setup='Ține ganterele lângă corp, pieptul sus, umerii coborâți și încheieturile neutre.';
    action='Menține poziția fără să te înclini, respirând normal și păstrând priza constantă.';
    mistake='Nu ridica umerii și nu compensa prin balans lateral.';
  }
  return {cues:[`${name}: ${setup}`,action,'Inspiră la revenire și expiră în partea solicitantă a mișcării.'],mistake};
};
let n=0;
const inferEquipment = (name,fallback) => {
  const s=name.toLowerCase();
  if(s.includes('genuflexiune la cutie')) return 'scaun';
  if(s==='ridicări pe vârfuri din picioare') return 'greutatea corpului';
  if(s.includes('ganter')) return 'gantere';
  if(s.includes('cablu')||s.includes('helcometru')||s.includes('pallof')||s.includes('face pull')||s.includes('wood chop')) return 'cablu';
  if(s.includes('bara ez')) return 'bara EZ';
  if(s.includes('aparat')||s.includes('presă')||s.includes('extensii pentru')||s.includes('flexii femurali')) return 'aparat';
  if(s.includes('flotări')||s.includes('planșă')||s.includes('crunch pe')||s.includes('bird-dog')||s.includes('dead bug')||s.includes('podul')||s.includes('reverse crunch')||s.includes('ridicări de genunchi')||s.includes('tracțiuni asistate')) return 'greutatea corpului';
  return fallback;
};
const HOME_READY_NAMES=new Set(['Flotări clasice','Flotări cu mâinile ridicate','Bird-dog controlat','Genuflexiune la cutie','Podul fesier','Ridicări pe vârfuri din picioare','Flotări cu priză îngustă la bancă','Crunch pe saltea','Reverse crunch','Dead bug controlat','Planșă laterală pe genunchi']);
const BASE_EXERCISES = MUSCLE_DATA.flatMap(g => g.parts.flatMap(([part,names,equipment]) => names.map((name,i)=>{
  const equipmentName=inferEquipment(name,equipment),guide=guideFor(name,g.group,equipmentName); n++;
  return {id:'ex'+n,name,group:g.group,part,equipment:equipmentName,difficulty:i===2?'Intermediar':'Începător',sets:i===2?'3 × 8–10':'3 × 10–12',rest:i===2?120:90,cues:guide.cues,
    mistake:guide.mistake,
    safety:`Începe cu o greutate ușoară. Oprește seria dacă apare durere ascuțită; cere ajutorul unui antrenor dacă nu poți menține poziția.`,color:g.color,locations:HOME_READY_NAMES.has(name)?['gym','home']:['gym']};
})));

const HOME_EQUIPMENT=['greutatea corpului','scaun','perete','prosop','obiecte casnice'];
const HOME_EXERCISE_BLUEPRINTS=[
  {name:'Flotări la perete',group:'Piept',part:'Piept median',equipment:'perete',difficulty:'Începător',sets:'3 × 10–15',rest:60,motion:'wallpush',setup:'Așază palmele pe perete la nivelul pieptului și fă doi pași mici înapoi, cu corpul drept.',action:'Îndoaie coatele la aproximativ 45°, apropie pieptul de perete și împinge controlat până revii.',mistake:'Nu lăsa bazinul să cadă, nu ridica umerii și nu depărta coatele la 90°.',safety:'Folosește un perete liber și uscat. Mărește distanța numai dacă poți păstra corpul aliniat.'},
  {name:'Flotări cu mâinile pe scaun',group:'Piept',part:'Piept inferior',equipment:'scaun',difficulty:'Începător',sets:'3 × 8–12',rest:75,motion:'inclinepush',setup:'Blochează un scaun solid lângă perete și pune palmele pe marginea șezutului, puțin mai late decât umerii.',action:'Coboară pieptul spre scaun păstrând corpul drept, apoi împinge fără să pierzi tensiunea abdomenului.',mistake:'Nu folosi un scaun cu roți și nu lăsa șoldurile să se apropie primele de sprijin.',safety:'Testează stabilitatea scaunului înainte de serie și oprește-te dacă simți durere în încheieturi sau umeri.'},
  {name:'Flotări pe genunchi',group:'Piept',part:'Piept median',equipment:'greutatea corpului',difficulty:'Începător',sets:'3 × 8–12',rest:75,motion:'kneepush',setup:'Sprijină palmele puțin mai late decât umerii și genunchii pe o saltea, cu trunchiul aliniat până la genunchi.',action:'Coboară pieptul între palme, apoi împinge podeaua menținând abdomenul activ.',mistake:'Nu îndoi corpul din șold și nu apropia bărbia de podea înaintea pieptului.',safety:'Folosește o suprafață antiderapantă și o pernă sub genunchi dacă este necesar.'},
  {name:'Ramat izometric cu prosopul din șezut',group:'Spate',part:'Marele dorsal',equipment:'prosop',difficulty:'Începător',sets:'3 × 20–30 sec',rest:60,motion:'seatedrow',setup:'Stai pe podea cu picioarele ușor îndoite, trece prosopul după tălpi și prinde capetele ferm.',action:'Trage coatele spre șolduri în timp ce împingi tălpile în prosop; menține tensiunea fără să te deplasezi.',mistake:'Nu rotunji spatele și nu trage prosopul direct spre față cu umerii ridicați.',safety:'Folosește un prosop întreg, fără rupturi, și nu îl înfășura în jurul încheieturilor.'},
  {name:'Îngeri inversați pe podea',group:'Spate',part:'Spate superior',equipment:'greutatea corpului',difficulty:'Începător',sets:'3 × 8–12',rest:60,motion:'reverseangel',setup:'Culcă-te pe burtă, fruntea pe un prosop și brațele întinse pe lângă corp, cu palmele în jos.',action:'Ridică ușor brațele și descrie lent un arc până deasupra capului, apoi revino fără să ridici coastele.',mistake:'Nu forța extensia gâtului și nu transforma mișcarea într-o arcuire a zonei lombare.',safety:'Mișcă brațele numai în amplitudinea fără durere și ține fruntea sprijinită.'},
  {name:'Ridicări Y-T-W pe podea',group:'Spate',part:'Spate superior',equipment:'greutatea corpului',difficulty:'Intermediar',sets:'3 × 6 din fiecare',rest:75,motion:'ytw',setup:'Culcă-te pe burtă cu fruntea sprijinită și abdomenul ușor activ.',action:'Ridică brațele controlat în forma literei Y, apoi T și W, apropiind omoplații fără să ridici umerii.',mistake:'Nu smuci brațele și nu compensa prin ridicarea capului sau arcuirea spatelui.',safety:'Începe fără obiecte în mâini; amplitudinea mică și controlată este suficientă.'},
  {name:'Flotări pike asistate de scaun',group:'Umeri',part:'Deltoid anterior',equipment:'scaun',difficulty:'Intermediar',sets:'3 × 6–10',rest:90,motion:'pike',setup:'Blochează scaunul la perete, pune palmele pe podea și sprijină vârfurile pe șezut, cu șoldurile ridicate.',action:'Îndoaie coatele și coboară creștetul între palme, apoi împinge podeaua până brațele se întind controlat.',mistake:'Nu privi înainte, nu lăsa coatele să se deschidă excesiv și nu pierde poziția ridicată a bazinului.',safety:'Alege varianta cu tălpile pe podea dacă scaunul nu este perfect stabil sau dacă presiunea pe umeri este prea mare.'},
  {name:'Ridicări laterale cu sticle',group:'Umeri',part:'Deltoid lateral',equipment:'obiecte casnice',difficulty:'Începător',sets:'3 × 12–15',rest:60,motion:'lateral',setup:'Ține două sticle identice, stai drept cu coatele ușor îndoite și umerii coborâți.',action:'Ridică brațele lateral până aproape de nivelul umerilor și coboară în două-trei secunde.',mistake:'Nu balansa trunchiul, nu ridica umerii spre urechi și nu turna sticlele cu gura în jos.',safety:'Începe cu sticle mici, bine închise, și oprește ridicarea sub nivelul la care apare disconfort.'},
  {name:'Alunecări ale brațelor pe perete',group:'Umeri',part:'Deltoid posterior',equipment:'perete',difficulty:'Începător',sets:'3 × 8–12',rest:60,motion:'wallslide',setup:'Stai cu spatele la perete, coastele coborâte și coatele îndoite, cât mai aproape de suprafață.',action:'Alunecă lent brațele în sus fără să arcuiești zona lombară, apoi revino controlat.',mistake:'Nu forța contactul mâinilor cu peretele și nu compensa prin ridicarea coastelor.',safety:'Lucrează într-o amplitudine confortabilă; contactul complet cu peretele nu este obligatoriu.'},
  {name:'Genuflexiuni la scaun',group:'Picioare',part:'Cvadriceps',equipment:'scaun',difficulty:'Începător',sets:'3 × 10–15',rest:75,motion:'squat',setup:'Așază un scaun stabil în spate, tălpile la lățimea umerilor și brațele înainte.',action:'Împinge șoldurile înapoi până atingi ușor șezutul, apoi ridică-te apăsând toată talpa în podea.',mistake:'Nu te prăbuși pe scaun și nu lăsa genunchii să cadă spre interior.',safety:'Scaunul trebuie să fie blocat lângă perete; alege o înălțime care permite control complet.'},
  {name:'Fandări inverse asistate de scaun',group:'Picioare',part:'Cvadriceps',equipment:'scaun',difficulty:'Începător',sets:'3 × 8–10 / picior',rest:75,motion:'lunge',setup:'Stai lângă un scaun stabil și sprijină o mână ușor pe spătar pentru echilibru.',action:'Du un picior înapoi, coboară vertical cât este confortabil și împinge prin talpa piciorului din față pentru revenire.',mistake:'Nu trage de scaun, nu lovi genunchiul de podea și nu lăsa genunchiul din față să cadă spre interior.',safety:'Sprijinul este doar pentru echilibru. Redu amplitudinea dacă genunchiul sau șoldul devin dureroase.'},
  {name:'Pod fesier unilateral',group:'Picioare',part:'Fesieri',equipment:'greutatea corpului',difficulty:'Intermediar',sets:'3 × 8–12 / picior',rest:75,motion:'singlehip',setup:'Culcă-te cu un picior sprijinit, celălalt ridicat și bazinul orientat drept înainte.',action:'Împinge prin călcâiul sprijinit și ridică bazinul până trunchiul se aliniază cu coapsa, apoi coboară lent.',mistake:'Nu roti bazinul și nu hiperextinde zona lombară pentru a urca mai sus.',safety:'Începe cu podul fesier pe ambele picioare dacă nu poți menține bazinul nivelat.'},
  {name:'Flexii femurali pe prosop',group:'Picioare',part:'Biceps femural',equipment:'prosop',difficulty:'Intermediar',sets:'3 × 8–12',rest:90,motion:'towelcurl',setup:'Culcă-te pe spate, pune călcâiele pe un prosop așezat pe podea netedă și ridică ușor bazinul.',action:'Trage călcâiele spre bazin fără să îl lași să cadă, apoi întinde picioarele lent.',mistake:'Nu smuci prosopul și nu arcui spatele când femuralii obosesc.',safety:'Nu executa pe covor sau pe o suprafață unde prosopul se poate bloca brusc.'},
  {name:'Ridicări pe vârfuri la perete',group:'Picioare',part:'Gambe',equipment:'perete',difficulty:'Începător',sets:'3 × 15–20',rest:60,motion:'calf',setup:'Pune degetele ușor pe perete pentru echilibru, cu tălpile paralele și genunchii moi.',action:'Ridică ambele călcâie cât poți fără balans, menține o secundă și coboară lent.',mistake:'Nu împinge puternic în perete, nu ricoșa jos și nu roti gleznele spre exterior.',safety:'Execută pe podea plană, fără treaptă, până controlezi complet mișcarea.'},
  {name:'Flexii cu rucsacul',group:'Biceps',part:'Cap scurt',equipment:'obiecte casnice',difficulty:'Începător',sets:'3 × 10–15',rest:60,motion:'curl',setup:'Închide rucsacul, prinde mânerul cu ambele mâini și ține coatele aproape de trunchi.',action:'Îndoaie coatele și ridică rucsacul spre piept fără să miști umerii, apoi coboară lent.',mistake:'Nu balansa trunchiul și nu folosi un rucsac cu obiecte care se pot deplasa sau sparge.',safety:'Încarcă rucsacul simetric cu obiecte moi și verifică mânerul înainte de fiecare serie.'},
  {name:'Flexii izometrice cu prosopul sub talpă',group:'Biceps',part:'Cap lung',equipment:'prosop',difficulty:'Începător',sets:'3 × 20–30 sec / braț',rest:60,motion:'curl',setup:'Pune mijlocul prosopului sub talpă, prinde un capăt și fixează cotul lângă trunchi la aproximativ 90°.',action:'Trage de prosop în sus în timp ce piciorul opune rezistență constantă, fără mișcare vizibilă.',mistake:'Nu ridica umărul și nu elibera brusc tensiunea din prosop.',safety:'Crește presiunea treptat și folosește un prosop fără margini rupte.'},
  {name:'Flexii alternative cu sticle',group:'Biceps',part:'Cap lung',equipment:'obiecte casnice',difficulty:'Începător',sets:'3 × 12–15',rest:60,motion:'curl',setup:'Ține câte o sticlă bine închisă în fiecare mână, cu palmele înainte și coatele fixe.',action:'Ridică alternativ câte o sticlă spre umăr și coboară complet în două-trei secunde.',mistake:'Nu împinge coatele înainte și nu înclina trunchiul pentru a termina repetarea.',safety:'Folosește sticle de aceeași mărime și verifică dopurile înainte de antrenament.'},
  {name:'Extensii de triceps la perete',group:'Triceps',part:'Cap lung',equipment:'perete',difficulty:'Începător',sets:'3 × 10–15',rest:60,motion:'walltri',setup:'Așază palmele pe perete puțin mai îngust decât umerii și retrage picioarele, păstrând corpul drept.',action:'Apropie fruntea de perete îndoind doar coatele, apoi împinge prin palme până revii.',mistake:'Nu depărta coatele și nu transforma exercițiul într-o flotare din umeri.',safety:'Începe aproape de perete; unghiul mai mare crește rapid solicitarea coatelor.'},
  {name:'Flotări înguste cu mâinile pe scaun',group:'Triceps',part:'Cap lateral',equipment:'scaun',difficulty:'Începător',sets:'3 × 8–12',rest:75,motion:'closeincline',setup:'Blochează scaunul la perete și pune palmele pe șezut la lățimea umerilor, cu corpul aliniat.',action:'Coboară pieptul controlat ținând coatele aproape de trunchi, apoi împinge până aproape de extensie.',mistake:'Nu folosi un scaun instabil și nu lăsa umerii să coboare înaintea pieptului.',safety:'Oprește-te dacă apare disconfort anterior în umăr și alege extensiile la perete ca variantă mai ușoară.'},
  {name:'Flotări diamant pe genunchi',group:'Triceps',part:'Cap medial',equipment:'greutatea corpului',difficulty:'Intermediar',sets:'3 × 6–10',rest:75,motion:'kneepush',setup:'Sprijină genunchii pe saltea și apropie palmele sub piept fără să forțezi degetele într-un diamant perfect.',action:'Coboară pieptul între palme cu coatele orientate înapoi, apoi împinge podeaua controlat.',mistake:'Nu deschide coatele lateral și nu lăsa zona lombară să se arcuiască.',safety:'Depărtează palmele puțin dacă poziția îngustă provoacă durere în încheieturi.'},
  {name:'Dead bug cu tălpile la perete',group:'Abdomen',part:'Abdomen inferior',equipment:'perete',difficulty:'Începător',sets:'3 × 8–10 / parte',rest:60,motion:'deadbug',setup:'Culcă-te cu șoldurile și genunchii la 90°, tălpile pe perete și zona lombară ușor presată în saltea.',action:'Îndepărtează alternativ un picior de perete și întinde-l fără să pierzi controlul lombar, apoi revino.',mistake:'Nu coborî piciorul atât de mult încât spatele să se desprindă de podea.',safety:'Scurtează amplitudinea și expiră lent dacă simți tensiune în zona lombară.'},
  {name:'Crunch cu picioarele pe scaun',group:'Abdomen',part:'Abdomen superior',equipment:'scaun',difficulty:'Începător',sets:'3 × 12–15',rest:60,motion:'crunch',setup:'Culcă-te cu gambele pe șezutul unui scaun stabil și mâinile ușor lângă cap.',action:'Apropie coastele de bazin ridicând doar omoplații, expiră, apoi revino lent.',mistake:'Nu trage de ceafă și nu folosi picioarele pentru a te balansa.',safety:'Păstrează bărbia ușor retrasă și oprește-te dacă apare durere în gât sau spate.'},
  {name:'Planșă laterală scurtă',group:'Abdomen',part:'Oblici și core',equipment:'greutatea corpului',difficulty:'Începător',sets:'3 × 15–30 sec / parte',rest:60,motion:'sideplank',setup:'Sprijină cotul sub umăr și genunchii îndoiți, cu trunchiul și coapsele aliniate.',action:'Ridică bazinul, menține respirația calmă și coboară controlat după interval.',mistake:'Nu lăsa umărul să se prăbușească și nu roti pieptul spre podea.',safety:'Ține cotul exact sub umăr și scurtează intervalul dacă pierzi alinierea.'},
  {name:'Stoarcerea prosopului',group:'Antebrațe',part:'Flexori',equipment:'prosop',difficulty:'Începător',sets:'3 × 30 sec',rest:45,motion:'grip',setup:'Rulează un prosop și prinde-l cu ambele mâini la nivelul pieptului, cu încheieturile neutre.',action:'Rotește mâinile în sensuri opuse ca și cum ai stoarce apă, apoi schimbă sensul la jumătatea intervalului.',mistake:'Nu îndoi excesiv încheieturile și nu ridica umerii spre urechi.',safety:'Folosește tensiune moderată și oprește-te dacă apar furnicături sau durere în degete.'},
  {name:'Menținere statică a rucsacului',group:'Antebrațe',part:'Flexori',equipment:'obiecte casnice',difficulty:'Începător',sets:'3 × 20–40 sec / mână',rest:60,motion:'carry',setup:'Închide și echilibrează rucsacul, apoi prinde mânerul cu o mână și stai drept.',action:'Menține rucsacul lângă corp cu încheietura neutră, fără să te înclini, apoi schimbă mâna.',mistake:'Nu ridica umărul și nu compensa prin înclinarea trunchiului.',safety:'Verifică mânerul și nu folosi obiecte fragile sau ascuțite ca încărcătură.'},
  {name:'Extensii ale degetelor cu elastic casnic',group:'Antebrațe',part:'Extensori',equipment:'obiecte casnice',difficulty:'Începător',sets:'3 × 15–20',rest:45,motion:'grip',setup:'Pune un elastic lat în jurul vârfurilor degetelor și ține încheietura neutră.',action:'Deschide degetele lent împotriva elasticului, oprește scurt și revino controlat.',mistake:'Nu folosi un elastic deteriorat și nu lăsa revenirea să lovească degetele.',safety:'Alege un elastic moale, inspectat înainte de utilizare, și ține-l departe de față.'}
];
const HOME_EXERCISES=HOME_EXERCISE_BLUEPRINTS.map((item,index)=>{const color=MUSCLE_DATA.find(group=>group.group===item.group)?.color||'#1e8069';return{id:`home${index+1}`,name:item.name,group:item.group,part:item.part,equipment:item.equipment,difficulty:item.difficulty,sets:item.sets,rest:item.rest,motion:item.motion,locations:['home'],cues:[`${item.name}: ${item.setup}`,item.action,'Inspiră la revenire și expiră în partea solicitantă a mișcării.'],mistake:item.mistake,safety:item.safety,color}});
const EXERCISES=[...BASE_EXERCISES,...HOME_EXERCISES];

const PLAN = [
 {name:'Ziua A',focus:'Împins + picioare',items:['Genuflexiune la cutie','Împins la piept cu gantere','Ramat la aparat cu sprijin','Ridicări laterale cu gantere','Dead bug controlat']},
 {name:'Ziua B',focus:'Tras + posterior',items:['Îndreptări românești cu gantere','Tracțiuni la helcometru priză neutră','Presă deasupra capului la aparat','Flexii preacher la aparat','Împingeri cu frânghia']},
 {name:'Ziua C',focus:'Corp complet',items:['Presă pentru picioare','Împins înclinat la aparat','Ramat la cablu din șezut','Hip thrust la aparat','Pallof press']}
];
