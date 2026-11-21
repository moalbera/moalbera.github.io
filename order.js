// صفحة الطلب: نوع الطلب ← أسئلة ← يوصل إيميل (FormSubmit) + خيار واتساب
const WHEN=['خلال أسبوع','خلال أسبوعين','خلال شهر','مش مستعجل'];

const ABOUT_YOU=[
  {h:'معلوماتك'},
  {k:'الاسم',type:'text',req:1,ph:'اسمك الكامل'},
  {k:'رقم الواتساب',type:'tel',req:1,ph:'09X XXX XXXX',ltr:1},
  {k:'الإيميل',type:'email',ph:'اختياري',ltr:1},
  {k:'اسم الجهة أو النشاط',type:'text',ph:'شركة، مشروع، مبادرة… أو شخصي'},
];

const FORMS={
  logo:{
    t:'شعار وهوية بصرية', d:'شعار جديد، هوية بصرية كاملة، أو تجديد شعار موجود.', ic:'◎',
    f:[
      {h:'العلامة'},
      {k:'شن تحتاج بالضبط؟',type:'radio',req:1,o:['شعار بس','شعار + هوية بصرية كاملة','تجديد شعار موجود']},
      {k:'الاسم اللي يتكتب في الشعار',type:'text',req:1,ph:'بالعربي و/أو الإنجليزي، زي ما تبيه يطلع'},
      {k:'مجال النشاط',type:'textarea',req:1,ph:'شن تدير بالضبط؟ وشن اللي يميزك على غيرك؟'},
      {k:'لمين موجّه شغلك؟',type:'text',ph:'مثلاً: شباب، عائلات، شركات، طلبة…'},
      {k:'تبي الناس تحس بشنو لما تشوف الشعار؟',type:'text',ph:'مثلاً: فخامة، ثقة، شباب ومرح، بساطة'},
      {h:'الشكل'},
      {k:'شكل الشعار اللي يعجبك',type:'check',vis:1,hint:'تقدر تختار أكثر من واحد. الصور مجرد توضيح.',o:[{"v": "كتابة بس", "svg": "<svg viewBox=\"0 0 160 90\"><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-family=\"Rubik,sans-serif\" font-weight=\"700\" font-size=\"34\" fill=\"#fff\">Sama<tspan fill=\"#ff7a1a\">.</tspan></text></svg>", "d": "اسمك بخط مميز، من غير رسمة"}, {"v": "رسمة + كتابة", "svg": "<svg viewBox=\"0 0 160 90\"><circle cx=\"42\" cy=\"45\" r=\"17\" fill=\"#ff7a1a\"/><path d=\"M25 47.55h34M27.55 53.5h28.9\" stroke=\"#14141a\" stroke-width=\"2.7\" stroke-linecap=\"round\"/><text x=\"68\" y=\"56\" font-family=\"Rubik,sans-serif\" font-weight=\"700\" font-size=\"28\" fill=\"#fff\">Sama</text></svg>", "d": "رمز صغير جنب الاسم، وهو الأكثر استعمالاً"}, {"v": "رسمة بس", "svg": "<svg viewBox=\"0 0 160 90\"><circle cx=\"80\" cy=\"45\" r=\"27\" fill=\"#ff7a1a\"/><path d=\"M53 49.05h54M57.05 58.5h45.9\" stroke=\"#14141a\" stroke-width=\"4.3\" stroke-linecap=\"round\"/></svg>", "d": "رمز يتعرف من غير ما يتكتب الاسم"}, {"v": "حرف أول", "svg": "<svg viewBox=\"0 0 160 90\"><rect x=\"54\" y=\"19\" width=\"52\" height=\"52\" rx=\"15\" fill=\"none\" stroke=\"#ff7a1a\" stroke-width=\"3.5\"/><text x=\"80\" y=\"58\" text-anchor=\"middle\" font-family=\"Rubik,sans-serif\" font-weight=\"700\" font-size=\"32\" fill=\"#fff\">S</text></svg>", "d": "أول حرف من الاسم بشكل مميز"}, {"v": "مش متأكد، نبي رأيك", "svg": "<svg viewBox=\"0 0 160 90\"><circle cx=\"80\" cy=\"45\" r=\"25\" fill=\"none\" stroke=\"rgba(255,255,255,.35)\" stroke-width=\"3\" stroke-dasharray=\"6 6\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-family=\"Rubik,sans-serif\" font-weight=\"600\" font-size=\"30\" fill=\"#ff7a1a\">?</text></svg>", "d": "نختارولك الأنسب لنشاطك"}]},
      {k:'الألوان',type:'text',ph:'مثلاً: أزرق وذهبي (اختياري)'},
      {k:'عناصر الهوية المطلوبة',type:'check',show:'شن تحتاج بالضبط؟=شعار + هوية بصرية كاملة',o:['كروت شخصية','أوراق رسمية وفواتير','قوالب سوشيال ميديا','يونيفورم','تغليف','لافتات ويافطات','دليل الهوية (Brand guide)']},
      {k:'أمثلة عجبتك',type:'textarea',ph:'لو شفت شعار ولا صفحة عجبك شكلها، حط رابطها هني (اختياري)',ltr:1},
      {k:'الشعار الحالي',type:'text',show:'شن تحتاج بالضبط؟=تجديد شعار موجود',ph:'رابط للشعار الحالي، وشن اللي ما يعجبكش فيه',ltr:1},
      {h:'الموعد'},
      {k:'متى تحتاجه؟',type:'radio',req:1,o:WHEN},
      {k:'ملاحظات إضافية',type:'textarea',ph:'أي حاجة تبي تضيفها'},
    ]},
  social:{
    t:'تصاميم سوشيال ميديا', d:'بوستات، ستوريز، كاروسيل وإعلانات لصفحاتك.', ic:'▦',
    f:[
      {h:'الصفحة'},
      {k:'المنصات',type:'check',req:1,o:['Instagram','Facebook','TikTok','LinkedIn','X']},
      {k:'رابط صفحتك',type:'text',ph:'لو عندك صفحة شغالة',ltr:1},
      {k:'مجال النشاط',type:'textarea',req:1,ph:'شن تدير، ولمين تحكي؟'},
      {h:'التصاميم'},
      {k:'نوع التصاميم',type:'check',req:1,o:['بوستات','ستوريز','كاروسيل (بوست فيه أكثر من صورة)','غلاف الصفحة','إعلانات ممولة','غلاف الريلز']},
      {k:'نوع الشغل',type:'radio',req:1,o:['طلب لمرة وحدة','باقة شهرية']},
      {k:'كم تصميم تقريباً؟',type:'text',ph:'مثلاً: 10 بوستات، أو 12 تصميم في الشهر'},
      {k:'عندك شعار وألوان ثابتة لصفحتك؟',type:'radio',o:['أيه، عندي شعار وألوان','عندي شعار بس','لا، ما عنديش']},
      {k:'الكلام اللي يتكتب في التصاميم',type:'radio',o:['أنا نكتبه','نبيكم تكتبوه']},
      {k:'أمثلة عجبتك',type:'textarea',ph:'لو شفت صفحة ولا تصاميم عجبك شكلها، حط رابطها هني (اختياري)',ltr:1},
      {h:'الموعد'},
      {k:'متى تبي تبدأ؟',type:'radio',req:1,o:WHEN},
      {k:'ملاحظات إضافية',type:'textarea',ph:'أي حاجة تبي تضيفها'},
    ]},
  event:{
    t:'فعاليات وإيفنتات', d:'هوية الفعالية، الإعلانات، والمطبوعات من البداية للنهاية.', ic:'✦',
    f:[
      {h:'الفعالية'},
      {k:'اسم الفعالية',type:'text',req:1},
      {k:'نوع الفعالية',type:'radio',req:1,o:['مؤتمر أو ملتقى','ورشة أو دورة','حفل أو تكريم','معرض','فعالية رياضية','نشاط طلابي','حاجة ثانية']},
      {k:'تاريخ الفعالية',type:'date',req:1},
      {k:'المكان',type:'text',ph:'المدينة والقاعة'},
      {k:'الجهة المنظمة والرعاة',type:'textarea',ph:'المنظم، الشركاء، والرعاة (لو فيه). هل شعاراتهم جاهزة؟'},
      {k:'عدد الحضور المتوقع',type:'text',ph:'تقريباً (اختياري)'},
      {h:'المطلوب'},
      {k:'شن تحتاج؟',type:'check',req:1,o:['شعار الفعالية','هوية بصرية للفعالية','بوستات إعلان وعدّ تنازلي','تصاميم المتحدثين والفقرات','بانرات ورول أب','الخلفية الكبيرة ورا المنصة','بطاقات تعريف الحضور','شهادات','دعوات','تيشيرتات','تصاميم شاشات']},
      {k:'مقاسات الطباعة',type:'text',ph:'لو تعرفها، وإلا خليها فاضية ونحددوها مع بعض'},
      {k:'عندكم شعار وألوان للفعالية؟',type:'radio',o:['أيه، جاهزين','عندنا شعار بس','لا، نبوها من الصفر']},
      {k:'أمثلة عجبتك',type:'textarea',ph:'لو شفت فعالية عجبك شكل تصاميمها، حط رابطها هني (اختياري)',ltr:1},
      {h:'الموعد'},
      {k:'آخر موعد تحتاج فيه التصاميم',type:'date',req:1},
      {k:'ملاحظات إضافية',type:'textarea',ph:'أي حاجة تبي تضيفها'},
    ]},
};

let D=null, TYPE=null;
const $=s=>document.querySelector(s);
const fid=k=>'f_'+[...k].map(c=>c.charCodeAt(0).toString(36)).join('');

function drawTypes(){
  $('#types').innerHTML=Object.entries(FORMS).map(([k,F],i)=>`
    <button type="button" class="od-type glass spot rv" data-k="${k}">
      <span class="n ltr">0${i+1}</span><span class="ic">${F.ic}</span>
      <b>${esc(F.t)}</b><span class="d">${esc(F.d)}</span><span class="go">ابدأ ←</span>
    </button>`).join('');
  $('#types').onclick=e=>{const b=e.target.closest('[data-k]');if(b)pick(b.dataset.k);};
}

function field(x){
  if(x.h) return `<h3 class="od-h">${esc(x.h)}</h3>`;
  const id=fid(x.k), req=x.req?' <i>*</i>':'', show=x.show?` data-show="${esc(x.show)}"`:'';
  const dir=x.ltr?' dir="ltr"':' dir="auto"';
  let inner;
  if(x.type==='textarea') inner=`<textarea id="${id}" name="${esc(x.k)}"${dir} placeholder="${esc(x.ph||'')}" ${x.req?'required':''}></textarea>`;
  else if(x.vis){
    const t=x.type==='radio'?'radio':'checkbox';
    inner=`<div class="vchips">${x.o.map(o=>`<label class="vchip"><input type="${t}" name="${esc(x.k)}" value="${esc(o.v)}"><span><i>${o.svg}</i><b>${esc(o.v)}</b><small>${esc(o.d)}</small></span></label>`).join('')}</div>`;
  }
  else if(x.type==='radio'||x.type==='check'){
    const t=x.type==='radio'?'radio':'checkbox';
    inner=`<div class="chips" role="group">${x.o.map(o=>`<label class="chip"><input type="${t}" name="${esc(x.k)}" value="${esc(o)}"><span>${esc(o)}</span></label>`).join('')}</div>`;
  } else inner=`<input id="${id}" type="${x.type}" name="${esc(x.k)}"${dir} placeholder="${esc(x.ph||'')}" ${x.req?'required':''}>`;
  return `<div class="od-f" data-k="${esc(x.k)}" data-type="${x.type}"${x.req?' data-req':''}${show}><label class="od-l" for="${id}">${esc(x.k)}${req}</label>${x.hint?`<span class="od-hint">${esc(x.hint)}</span>`:''}${inner}<span class="od-msg"></span></div>`;
}

function pick(k,noPush){
  if(!FORMS[k])return; TYPE=k; const F=FORMS[k];
  $('#types').hidden=true; $('#form').hidden=false; $('#done').hidden=true;
  $('#odTitle').textContent='طلب '+F.t; $('#odSub').textContent=F.d+' جاوب على اللي تقدر عليه، والنجمة (*) معناها ضروري.';
  $('#fields').innerHTML=[...ABOUT_YOU,...F.f].map(field).join('');
  toggleShow();
  if(!noPush) history.pushState({k},'','?type='+k);
  scrollTo({top:0,behavior:'smooth'});
}
function back(noPush){
  TYPE=null; $('#types').hidden=false; $('#form').hidden=true; $('#done').hidden=true;
  $('#odTitle').textContent='شن تبي نصمملك؟'; $('#odSub').textContent='اختار نوع الطلب وجاوب على كم سؤال. ياخذ دقيقتين، ونرجعلك في أقرب وقت.';
  if(!noPush) history.pushState({},'','order.html');
}
function val(box){
  const t=box.dataset.type, k=box.dataset.k;
  if(t==='radio') return (box.querySelector('input:checked')||{}).value||'';
  if(t==='check') return [...box.querySelectorAll('input:checked')].map(i=>i.value).join('، ');
  return box.querySelector('input,textarea').value.trim();
}
function toggleShow(){
  document.querySelectorAll('.od-f[data-show]').forEach(b=>{
    const [k,v]=b.dataset.show.split('=');const src=[...document.querySelectorAll('.od-f')].find(x=>x.dataset.k===k);
    b.hidden=!(src&&val(src)===v);
  });
}
function collect(){
  const out={}; let bad=null;
  document.querySelectorAll('.od-f').forEach(b=>{
    if(b.hidden)return; const v=val(b); b.classList.remove('bad'); b.querySelector('.od-msg').textContent='';
    if(b.dataset.req!==undefined&&!v){b.classList.add('bad');b.querySelector('.od-msg').textContent='هذي ضرورية';bad=bad||b;}
    if(v&&b.dataset.type==='email'&&!/^\S+@\S+\.\S+$/.test(v)){b.classList.add('bad');b.querySelector('.od-msg').textContent='الإيميل مش مكتوب صح';bad=bad||b;}
    if(v&&b.dataset.type==='tel'&&v.replace(/\D/g,'').length<9){b.classList.add('bad');b.querySelector('.od-msg').textContent='اكتب الرقم كامل';bad=bad||b;}
    if(v) out[b.dataset.k]=v;
  });
  return {out,bad};
}
function waText(out){
  return 'السلام عليكم، بعتلك طلب من الموقع ('+FORMS[TYPE].t+')\n'+Object.entries(out).map(([k,v])=>'• '+k+': '+v).join('\n');
}

async function send(e){
  e.preventDefault(); if(!TYPE)return;
  const {out,bad}=collect();
  if(bad){bad.scrollIntoView({behavior:'smooth',block:'center'});return;}
  if(document.querySelector('.hp').value)return; // سبام
  const btn=$('#send'); btn.disabled=true; btn.textContent='جاري الإرسال…'; $('#err').hidden=true;
  const to=(D.contact.ordersEmail||D.contact.email||'').trim();
  const body={_subject:'طلب جديد من الموقع: '+FORMS[TYPE].t+' — '+(out['الاسم']||''),_template:'table',_captcha:'false',
    'نوع الطلب':FORMS[TYPE].t,...out};
  if(out['الإيميل']) body._replyto=out['الإيميل'];
  const wa='https://wa.me/'+String(D.contact.whatsapp||'').replace(/\D/g,'')+'?text='+encodeURIComponent(waText(out));
  try{
    const key=(D.contact.web3key||'').trim(); let r;
    if(key){ // Web3Forms (الأساسي)
      r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
        body:JSON.stringify({access_key:key,subject:body._subject,from_name:'موقع Mo Albera',...(body._replyto?{replyto:body._replyto}:{}),'نوع الطلب':body['نوع الطلب'],...out})});
    } else { // FormSubmit (احتياطي)
      r=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(to),{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)});
    }
    const j=await r.json().catch(()=>({}));
    if(!r.ok||String(j.success)!=='true') throw new Error(j.message||'send failed');
    $('#form').hidden=true; $('#done').hidden=false; $('#waNext').href=wa;
    $('#odTitle').textContent='تم استلام طلبك'; $('#odSub').textContent='';
    scrollTo({top:0,behavior:'smooth'});
  }catch(err){
    $('#err').hidden=false;
    $('#err').innerHTML=`ما قدرناش نبعتو الطلب توا. <a href="${esc(wa)}" target="_blank" rel="noopener">ابعته على واتساب بضغطة وحدة</a>، والكلام اللي كتبته يمشي معاه.`;
  }finally{btn.disabled=false;btn.textContent='ابعت الطلب';}
}

loadData().then(d=>{
  D=d; fillCommon(D); drawTypes();
  $('#back').onclick=()=>back();
  $('#form').addEventListener('change',toggleShow);
  $('#form').addEventListener('input',e=>{const b=e.target.closest('.od-f.bad');if(b){b.classList.remove('bad');b.querySelector('.od-msg').textContent='';}});
  $('#form').addEventListener('submit',send);
  addEventListener('popstate',()=>{const k=new URLSearchParams(location.search).get('type');k?pick(k,1):back(1);});
  const k=new URLSearchParams(location.search).get('type'); if(k) pick(k,1);
  stagger(); reveal(); motion();
});
