import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const source = JSON.parse(fs.readFileSync('content/editorial.json','utf8'));
const errors = [];
const files = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir,{withFileTypes:true})) {
    const p=path.join(dir,ent.name);
    if(ent.isDirectory()) walk(p); else files.push(p);
  }
}
walk(root);
const html=files.filter(f=>f.endsWith('.html'));
const pagePath=(url)=> {
  let p=decodeURIComponent(url.split(/[?#]/)[0]);
  if(p==='/') return path.join(root,'index.html');
  p=p.replace(/^\//,'');
  if(p.endsWith('/')) return path.join(root,p,'index.html');
  return path.join(root,p);
};
function bad(message){errors.push(message)}
for(const file of html){
  const body=fs.readFileSync(file,'utf8');
  const relative=path.relative(root,file);
  if(!/<title\b[^>]*>[^<]+<\/title>/i.test(body)) bad(relative+': missing title');
  if(!/<h1\b/i.test(body)) bad(relative+': missing h1');
  if(!/name=["']viewport["']/i.test(body)) bad(relative+': missing viewport');
  for (const match of body.matchAll(/(?:href|src)=["'](\/[^"']*)["']/g)){
    const link=match[1];
    if (link.startsWith('//')) continue;
    const dest=pagePath(link);
    if(!dest.startsWith(root+path.sep) && dest!==root) {bad(relative+': unsafe link '+link);continue}
    if(!fs.existsSync(dest)) bad(relative+': broken link '+link);
  }
}
const pub=process.env.PUBLICATION_READY==='true';
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!pub && !/noindex/i.test(home)) bad('Preview site must remain noindex');
if(pub && /noindex/i.test(home)) bad('Published site still has noindex');
if(pub && !fs.existsSync(path.join(root,'sitemap.xml'))) bad('Published sitemap missing');
if(!pub && fs.existsSync(path.join(root,'sitemap.xml'))) bad('Preview sitemap should not exist');
if(source.posts.length!==9) bad('Expected nine editorial stories');
for(const s of source.posts){
  if(!s.slug||!s.title||!s.body||!s.take||!s.source)bad('Incomplete story '+(s.slug||'?'));
  if(!/^https:\/\//.test(s.source))bad('Source URL is not HTTPS: '+s.slug);
  if(!fs.existsSync(path.join(root,'istorijos',s.slug,'index.html')))bad('Missing story: '+s.slug);
}
for(const p of source.playbooks){
  if(!source.posts.some(s=>s.slug===p.story))bad('Missing related story: '+p.slug);
}
const deep=fs.readFileSync(path.join(root,"istorijos/tesla-cybercab/index.html"),"utf8");
if((deep.match(/class="deep-chart"/g)||[]).length!==2)bad("Missing Cybercab charts");
for(const id of ["front","interior","side"]){const p=path.join(root,"media","cybercab-"+id+".jpg");if(!fs.existsSync(p)||fs.statSync(p).size<4000)bad("Missing Cybercab photo "+id);}
if(!deep.includes("CC BY 2.0")||!deep.includes("deep-gallery"))bad("Missing gallery attribution");
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('Validated '+html.length+' HTML pages, local assets/links, metadata, editorial structure and publication guard.');
