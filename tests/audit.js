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
assert(exercises.length===95,`Sunt ${exercises.length} exerciții, nu 95`);
assert(new Set(exercises.map(item=>item.id)).size===exercises.length,'ID-uri de exercițiu duplicate');
assert(exercises.every(item=>item.cues.length===3&&item.cues[0].startsWith(item.name+': ')),'Instrucțiuni nespecifice detectate');
assert(exercises.every(item=>item.mistake&&item.mistake.length>35),'Greșeală specifică lipsă');

const app=read('app.js');
const media=[...app.matchAll(/'([^']+)':'([^']+\.(?:webp|mp4))'/g)].map(match=>[match[1],match[2]]);
const mapped=new Map(media);
assert(exercises.every(item=>mapped.has(item.name)),'Lipsește o demonstrație premium dedicată');
assert(media.every(([,file])=>fs.existsSync(path.join(root,'assets',file))),'Lipsește un fișier media mapat');
const home=exercises.filter(item=>item.locations?.includes('home'));
assert(home.length>=35,`Zona Acasă are doar ${home.length} exerciții`);
assert(['Piept','Spate','Umeri','Picioare','Biceps','Triceps','Abdomen','Antebrațe'].every(group=>home.some(item=>item.group===group)), 'Zona Acasă nu acoperă toate grupele');
assert(home.every(item=>['greutatea corpului','scaun','perete','prosop','obiecte casnice'].includes(item.equipment)), 'Echipament de sală găsit în zona Acasă');
assert(exercises.filter(item=>item.id.startsWith('home')).every(item=>item.motion&&item.safety.length>45), 'Animație sau recomandare de siguranță lipsă la un exercițiu Acasă');
assert(exercises.filter(item=>item.id.startsWith('home')).every(item=>mapped.has(item.name)), 'Un exercițiu nou Acasă nu folosește demonstrația premium');

const html=read('index.html'),worker=read('service-worker.js'),netlify=read('netlify.toml');
const version=worker.match(/VERSION='(v\d+)'/)?.[1];
assert(version,'Versiunea cache-ului lipsește');
for(const asset of ['styles.css','data.js','motion.js','app.js'])assert(html.includes(`${asset}?v=${version.slice(1)}`),`Versiunea ${version} lipsește pentru ${asset}`);
assert(netlify.includes('Content-Security-Policy'),'CSP lipsă');
assert(netlify.includes('Strict-Transport-Security'),'HSTS lipsă');
assert(!netlify.includes('from = "/*"'),'Fallback-ul care ascundea resursele 404 este încă activ');
assert(html.includes('id="exportData"')&&html.includes('id="importData"'),'Backup UI lipsă');
for(const id of ['activeWorkoutResume','workoutModal','finishWorkoutModal','replaceExerciseModal'])assert(html.includes(`id="${id}"`),`Interfața Etapei 1 lipsește: ${id}`);
for(const marker of ['planCompletions','activeWorkout','Salvează ca parțial','compatibleReplacements'])assert(app.includes(marker),`Logica Etapei 1 lipsește: ${marker}`);
for(const id of ['finishFeedbackForm','workoutHistory','editPlanDayModal','addPlanExerciseSelect'])assert(html.includes(`id="${id}"`),`Interfața Etapei 2 lipsește: ${id}`);
for(const marker of ['planAdaptations','planDayEdits','applyPlanAdaptation','workoutHistoryCard','savePlanDayEdit'])assert(app.includes(marker),`Logica Etapei 2 lipsește: ${marker}`);
for(const id of ['homeTrainingView','homePlanForm','homeGroupChips','homeExerciseGrid'])assert(html.includes(`id="${id}"`),`Interfața Acasă lipsește: ${id}`);
for(const marker of ['renderHomeTraining','homeFiltered',"mode:'home'",'candidate.locations?.includes'])assert(app.includes(marker),`Logica Acasă lipsește: ${marker}`);
assert(worker.includes("'Acasă':[")&&worker.includes("VERSION='v27'"),'Cache-ul offline Acasă sau versiunea v27 lipsește');
for(const item of home)assert(worker.includes(`'${mapped.get(item.name)}'`),`Demonstrația ${mapped.get(item.name)} lipsește din cache-ul offline Acasă`);
assert(app.includes('Actualizare instalată')&&app.includes('fitstart_update_complete'),'Confirmarea actualizării PWA lipsește');
assert(worker.includes("type:'UPDATE_INSTALLING'")&&worker.includes('await self.skipWaiting()'),'Activarea sigură a actualizării PWA lipsește');
assert(read('.gitignore').includes('.env'),'Protecția secretelor Git lipsește');
assert(read('.netlifyignore').includes('.git/'),'Protecția publish Netlify lipsește');

console.log(`FitStart audit OK: ${exercises.length} exerciții (${home.length} pentru acasă), ${mapped.size} fișiere premium unice, CSP/cache/backup/protecții validate.`);
