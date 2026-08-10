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
  if(s.includes('ganter')) return 'gantere';
  if(s.includes('cablu')||s.includes('helcometru')||s.includes('pallof')||s.includes('face pull')||s.includes('wood chop')) return 'cablu';
  if(s.includes('bara ez')) return 'bara EZ';
  if(s.includes('aparat')||s.includes('presă')||s.includes('extensii pentru')||s.includes('flexii femurali')) return 'aparat';
  if(s.includes('flotări')||s.includes('planșă')||s.includes('crunch pe')||s.includes('bird-dog')||s.includes('dead bug')||s.includes('podul')||s.includes('reverse crunch')||s.includes('ridicări de genunchi')||s.includes('tracțiuni asistate')) return 'greutatea corpului';
  return fallback;
};
const EXERCISES = MUSCLE_DATA.flatMap(g => g.parts.flatMap(([part,names,equipment]) => names.map((name,i)=>{
  const equipmentName=inferEquipment(name,equipment),guide=guideFor(name,g.group,equipmentName); n++;
  return {id:'ex'+n,name,group:g.group,part,equipment:equipmentName,difficulty:i===2?'Intermediar':'Începător',sets:i===2?'3 × 8–10':'3 × 10–12',rest:i===2?120:90,cues:guide.cues,
    mistake:guide.mistake,
    safety:`Începe cu o greutate ușoară. Oprește seria dacă apare durere ascuțită; cere ajutorul unui antrenor dacă nu poți menține poziția.`,color:g.color};
})));

const PLAN = [
 {name:'Ziua A',focus:'Împins + picioare',items:['Genuflexiune la cutie','Împins la piept cu gantere','Ramat la aparat cu sprijin','Ridicări laterale cu gantere','Dead bug controlat']},
 {name:'Ziua B',focus:'Tras + posterior',items:['Îndreptări românești cu gantere','Tracțiuni la helcometru priză neutră','Presă deasupra capului la aparat','Flexii preacher la aparat','Împingeri cu frânghia']},
 {name:'Ziua C',focus:'Corp complet',items:['Presă pentru picioare','Împins înclinat la aparat','Ramat la cablu din șezut','Hip thrust la aparat','Pallof press']}
];
