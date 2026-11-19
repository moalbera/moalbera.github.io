// أدوات مشتركة بين الصفحة الرئيسية وصفحة المشروع
const ICONS={
 behance:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.2 11.3c.8-.4 1.3-1.1 1.3-2.1C9.5 7.1 7.9 6.5 6 6.5H1v11h5.2c2 0 3.8-.9 3.8-3.1 0-1.4-.7-2.5-1.8-3.1zM3.3 8.4h2.2c.8 0 1.6.2 1.6 1.2 0 .9-.6 1.2-1.4 1.2H3.3V8.4zm2.5 7.2H3.3v-3h2.6c1 0 1.7.4 1.7 1.5s-.8 1.5-1.8 1.5zM15.4 9.2c-2.5 0-4.1 1.8-4.1 4.2 0 2.5 1.5 4.2 4.1 4.2 1.9 0 3.2-.9 3.8-2.8h-2c-.2.7-1.1 1-1.7 1-1.3 0-2-.7-2-2h5.8c.1-2.6-1.3-4.6-3.9-4.6zm-1.9 3.4c.1-1.1.8-1.7 1.8-1.7 1.1 0 1.6.6 1.7 1.7h-3.5zM13.6 6.9h4.5v1.3h-4.5z"/></svg>',
 facebook:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v1.9H8v3.2h2.6V22H14v-10.3h2.7l.4-3.2H14z"/></svg>',
 instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>'
};
const MONTHS=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const get=(o,p)=>p.split('.').reduce((a,k)=>a?.[k],o);
const yearOf=d=>String(d||'').slice(0,4);
function fmtDate(d){const [y,m]=String(d||'').split('-');return m?MONTHS[+m-1]+' '+y:(y||'');}
const waLink=C=>'https://wa.me/'+String(C.whatsapp||'').replace(/\D/g,'');
const projUrl=p=>'project.html?id='+encodeURIComponent(p.id);

function allProjects(D){const out=[];(D.categories||[]).forEach((c,ci)=>(c.projects||[]).forEach(p=>out.push({...p,ci,cat:c})));return out;}

function fillCommon(D){
  document.querySelectorAll('[data-t]').forEach(el=>{
    const k=el.dataset.t; el.textContent = k==='initial' ? (D.site.name||'M').trim()[0] : (get(D,k)??'');
  });
  const C=D.contact;
  document.querySelectorAll('.wa-link').forEach(a=>a.href=waLink(C));
  document.querySelectorAll('.mail-link').forEach(a=>a.href='mailto:'+C.email);
  document.querySelectorAll('.be-link').forEach(a=>a.href=C.behance||'#');
  const s=document.getElementById('socials');
  if(s) s.innerHTML=['behance','facebook','instagram'].filter(k=>C[k]).map(k=>
    `<a class="icon-btn glass" href="${esc(C[k])}" target="_blank" rel="noopener" aria-label="${k}">${ICONS[k]}</a>`).join('');
  const yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();
  document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));
}

function projectCard(p){
  return `<a class="pcard glass spot tilt rv" href="${projUrl(p)}">
    <div class="ph"><img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy">
      <div class="ov"><span>شوف المشروع ←</span><span class="cnt">${(p.gallery||[]).length+1} صور</span></div></div>
    <div class="cap"><h4>${esc(p.title)}</h4>${p.date?`<span class="yr">${esc(yearOf(p.date))}</span>`:''}</div></a>`;
}

function reveal(){
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:.08});
  document.querySelectorAll('.rv:not(.in)').forEach(el=>io.observe(el));
}

// lightbox
const LB=(()=>{
  const el=document.createElement('div');el.className='lb';
  el.innerHTML='<button class="x glass" aria-label="إغلاق">✕</button><button class="prev glass" aria-label="السابق">›</button><button class="next glass" aria-label="التالي">‹</button><img alt=""><div class="lb-cap"></div>';
  let list=[],idx=0;const img=el.querySelector('img'),cap=el.querySelector('.lb-cap');
  const show=()=>{const x=list[idx];img.src=x.img;cap.textContent=x.t||'';};
  const close=()=>{el.classList.remove('open');document.body.style.overflow='';};
  const step=d=>{idx=(idx+d+list.length)%list.length;show();};
  el.querySelector('.x').onclick=close;
  el.querySelector('.next').onclick=e=>{e.stopPropagation();step(1);};
  el.querySelector('.prev').onclick=e=>{e.stopPropagation();step(-1);};
  el.addEventListener('click',e=>{if(e.target===el)close();});
  addEventListener('keydown',e=>{if(!el.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')step(1);if(e.key==='ArrowRight')step(-1);});
  document.addEventListener('DOMContentLoaded',()=>document.body.appendChild(el));
  return {open(l,i){list=l;idx=i;show();el.classList.add('open');document.body.style.overflow='hidden';}};
})();

function videoCard(v){
  return `<a class="vcard glass spot" href="${esc(v.url)}" target="_blank" rel="noopener">
    <div class="ph"><img src="${esc(v.thumb)}" alt="${esc(v.title)}" loading="lazy">
      ${v.views?`<span class="views"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>${esc(v.views)}</span>`:''}
      <span class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
      <div class="vt"><h4>${esc(v.title)}</h4>${v.desc?`<p>${esc(v.desc)}</p>`:''}</div></div></a>`;
}
function parseViews(s){const m=String(s||'').trim().match(/^([\d.]+)\s*([KkMm])?/);if(!m)return 0;return parseFloat(m[1])*(/[Kk]/.test(m[2]||'')?1e3:/[Mm]/.test(m[2]||'')?1e6:1);}
function loadData(){return fetch('data.json?v='+Date.now(),{cache:'no-store'}).then(r=>r.json());}

/* ===== MOTION: يخلّي الموقع حي ===== */
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(pointer: fine)').matches;
function splitText(el){
  if(!el||REDUCED)return; const t=el.textContent; el.classList.add('split');
  el.innerHTML=[...t].map((c,i)=>c===' '?' ':`<span class="ch" style="--i:${i}">${esc(c)}</span>`).join('');
}
function stagger(){ // تأخير متدرّج للعناصر اللي جنب بعض
  document.querySelectorAll('.grid,.services,.steps,.stats,.vids,.feature-grid,.cat-nav').forEach(g=>[...g.children].forEach((c,i)=>c.style.setProperty('--d',Math.min(i,8)*70+'ms')));
}
function counters(){
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;io.unobserve(en.target);
    const el=en.target,to=parseFloat(el.dataset.to),suf=el.dataset.suf||'',pre=el.dataset.pre||'',dec=+(el.dataset.dec||0);
    if(REDUCED){el.textContent=pre+to.toFixed(dec)+suf;return;}
    const t0=performance.now(),dur=1800;
    const tick=now=>{const k=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-k,4);el.textContent=pre+(to*e).toFixed(dec)+suf;if(k<1)requestAnimationFrame(tick);};
    requestAnimationFrame(tick);}),{threshold:.5});
  document.querySelectorAll('[data-to]').forEach(el=>io.observe(el));
}
function motion(){
  // شريط التقدّم فوق
  const bar=document.createElement('div');bar.className='progress';document.body.appendChild(bar);
  const bg=document.querySelector('.bg svg');
  let mx=0,my=0,sy=0;
  const upd=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${h>0?scrollY/h:0})`;
    if(bg&&!REDUCED)bg.style.transform=`translate(calc(-50% + ${mx*30}px), calc(-50% + ${my*30 - scrollY*0.08}px)) scale(${1+Math.min(scrollY,2000)/8000}) rotate(${scrollY*0.01}deg)`;};
  addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true});
  addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;requestAnimationFrame(upd);},{passive:true});
  upd();
  if(REDUCED)return;
  // ضوء يلحق الماوس على الكروت الزجاجية
  document.addEventListener('pointermove',e=>{const c=e.target.closest('.glass.spot');if(!c)return;const r=c.getBoundingClientRect();
    c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');},{passive:true});
  if(!FINE)return;
  // ميلان ثلاثي الأبعاد للمربعات
  document.addEventListener('pointermove',e=>{const c=e.target.closest('.tilt');document.querySelectorAll('.tilt.tilting').forEach(o=>{if(o!==c){o.classList.remove('tilting');o.style.transform='';}});
    if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    c.classList.add('tilting');c.style.transform=`perspective(900px) rotateX(${-y*8}deg) rotateY(${x*8}deg) translateY(-6px)`;},{passive:true});
  document.addEventListener('pointerleave',()=>document.querySelectorAll('.tilt').forEach(o=>o.style.transform=''));
  // أزرار مغناطيسية
  document.addEventListener('pointermove',e=>{document.querySelectorAll('.magnet').forEach(b=>{const r=b.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=e.clientX-cx,dy=e.clientY-cy,d=Math.hypot(dx,dy);
    b.style.transform=d<110?`translate(${dx*.25}px,${dy*.3}px)`:'';});},{passive:true});
  // مؤشر ماوس مخصص
  const cur=document.createElement('div');cur.className='cursor';const dot=document.createElement('div');dot.className='cursor-dot';document.body.append(cur,dot);
  let cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy;
  addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;dot.style.transform=`translate(${tx}px,${ty}px) translate(-50%,-50%)`;
    cur.classList.toggle('big',!!e.target.closest('a,button,.pcard,.vcard,[data-i]'));},{passive:true});
  (function loop(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cur.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;requestAnimationFrame(loop);})();
}
