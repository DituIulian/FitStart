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
  const cues=cueFor(g.group,part); n++;
  return {id:'ex'+n,name,group:g.group,part,equipment:inferEquipment(name,equipment),difficulty:i===2?'Intermediar':'Începător',sets:i===2?'3 × 8–10':'3 × 10–12',rest:i===2?120:90,cues,
    mistake:`Evită ${g.group==='Picioare'?'prăbușirea genunchilor spre interior':g.group==='Spate'?'balansul trunchiului și tragerea doar din brațe':g.group==='Abdomen'?'arcuirea zonei lombare și graba':'folosirea elanului sau a unei greutăți care strică postura'}.`,
    safety:`Începe cu o greutate ușoară. Oprește seria dacă apare durere ascuțită; cere ajutorul unui antrenor dacă nu poți menține poziția.`,color:g.color};
})));

const PLAN = [
 {name:'Ziua A',focus:'Împins + picioare',items:['Genuflexiune la cutie','Împins la piept cu gantere','Ramat la aparat cu sprijin','Ridicări laterale cu gantere','Dead bug controlat']},
 {name:'Ziua B',focus:'Tras + posterior',items:['Îndreptări românești cu gantere','Tracțiuni la helcometru priză neutră','Presă deasupra capului la aparat','Flexii preacher la aparat','Împingeri cu frânghia']},
 {name:'Ziua C',focus:'Corp complet',items:['Presă pentru picioare','Împins înclinat la aparat','Ramat la cablu din șezut','Hip thrust la aparat','Pallof press']}
];
