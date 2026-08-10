const fs=require('fs');
const path=require('path');
const vm=require('vm');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const assert=(condition,message)=>{if(!condition)throw new Error(message)};

for(const file of ['app.js','data.js','motion.js','service-worker.js'])new Function(read(file));

const context={};
vm.createContext(context);
vm.runInContext(`${read('data.js')};this.exercises=EXERCISES`,context);
const exercises=context.exercises;
assert(exercises.length===69,`Sunt ${exercises.length} exerciții, nu 69`);
assert(new Set(exercises.map(item=>item.id)).size===69,'ID-uri de exercițiu duplicate');
assert(exercises.every(item=>item.cues.length===3&&item.cues[0].startsWith(item.name+': ')),'Instrucțiuni nespecifice detectate');
assert(exercises.every(item=>item.mistake&&item.mistake.length>35),'Greșeală specifică lipsă');

const app=read('app.js');
const media=[...app.matchAll(/'([^']+)':'([^']+\.webp)'/g)].map(match=>[match[1],match[2]]);
const mapped=new Map(media);
assert(exercises.every(item=>mapped.has(item.name)),'Lipsește o demonstrație premium');
assert(media.every(([,file])=>fs.existsSync(path.join(root,'assets',file))),'Lipsește un fișier WebP mapat');

const html=read('index.html'),worker=read('service-worker.js'),netlify=read('netlify.toml');
for(const asset of ['styles.css','data.js','motion.js','app.js'])assert(html.includes(`${asset}?v=18`),`Versiune v18 lipsă pentru ${asset}`);
assert(worker.includes("VERSION='v18'"),'Cache-ul nu este v18');
assert(netlify.includes('Content-Security-Policy'),'CSP lipsă');
assert(netlify.includes('Strict-Transport-Security'),'HSTS lipsă');
assert(!netlify.includes('from = "/*"'),'Fallback-ul care ascundea resursele 404 este încă activ');
assert(html.includes('id="exportData"')&&html.includes('id="importData"'),'Backup UI lipsă');
assert(read('.gitignore').includes('.env'),'Protecția secretelor Git lipsește');
assert(read('.netlifyignore').includes('.git/'),'Protecția publish Netlify lipsește');

console.log(`FitStart audit OK: ${exercises.length} exerciții, ${mapped.size} demonstrații unice, CSP/cache/backup/protecții validate.`);
