(function(){
const WA='254103615364';
const P=[
 {n:'Box Profile',d:'Strong, clean lines for homes, stores and factories.',img:'box-profile',s:{'3':1200,'2.5':950,'2':800}},
 {n:'Dumuzaz',d:'Fine-ribbed sheet with a neat modern finish.',img:'dumuzaz',p:{30:300,28:350}},
 {n:'Ordinary Corrugated',d:'The classic wave profile. Light and economical.',img:'corrugated',s:{'3':900,'2.5':750,'2':600}},
 {n:'Roman Tile',d:'Rounded tile look for a premium roof.',img:'romantile',s:{'3':1800,'2.5':1500,'2':1200}},
 {n:'Versatile',d:'Stepped tile pattern that suits any house design.',img:'versatile',p:{30:500,28:600}},
 {n:'Eurotile',d:'European tile styling in a durable steel sheet.',img:'eurotile',p:{30:600,28:700}},
 {n:'Orientile',d:'Deep tile profile with a bold roof shadow.',img:'orientile',p:{30:700,28:600}},
 {n:'Zee Tile',d:'Sharp tile pattern. Gauge 28 price on request.',img:'zee-tile',p:{30:500,28:null}}
];
const LENS=['3','2.5','2'];
const price=(x,g,l)=>x.s?x.s[l]:x.p[g];
const unit=x=>x.s?'sheet':'metre';
const COLORS=['Charcoal Grey','Royal Blue','Forest Green','Brick Red','Chocolate Brown','Maroon','Bright Red','Teal','Orange Red','White'];
const G=[['box-blue','Royal blue box profile'],['box-green','Green box profile'],['box-brown','Chocolate brown box profile'],['orange','Orange-red corrugated'],['box-red','Bright red box profile'],['box-dark','Charcoal box profile'],['box-teal','Teal box profile'],['corrugated','Corrugated in three colours'],['box-maroon','Maroon box profile'],['box-white','White box profile'],['box-green2','Forest green box profile'],['tile-charcoal','Charcoal textured tile sheet'],['maroon-ridge-nails','Maroon tile with ridge caps and roofing nails'],['tile-grey','Grey tile profile']];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const fmt=n=>'Ksh '+n.toLocaleString('en-KE');
const KEY='maisha_cart_v1';
let cart=[];
try{const s=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(s))cart=s.filter(k=>P[k.i]&&k.m>0&&(P[k.i].s?P[k.i].s[k.l]:P[k.i].p[k.g]))}catch(e){cart=[]}
const CK='maisha_cust_v1';
function saveCust(){try{localStorage.setItem(CK,JSON.stringify({n:$('#cname').value,l:$('#cloc').value}))}catch(e){}}
function loadCust(){try{const s=JSON.parse(localStorage.getItem(CK)||'{}');$('#cname').value=s.n||'';$('#cloc').value=s.l||''}catch(e){}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(cart))}catch(e){}}

/* loader */
const L=$('#loader');
function loader(txt,ms,cb){$('#ldtxt').textContent=txt;L.classList.add('on');setTimeout(()=>{cb&&cb();},ms)}
function hide(){L.classList.remove('on')}
window.addEventListener('load',()=>setTimeout(hide,1100));
setTimeout(hide,3500);

/* products */
const grid=$('#grid');
P.forEach((x,i)=>{
 const c=document.createElement('article');c.className='card rv';c.dataset.i=i;c.dataset.g=30;c.dataset.l='3';
 c.innerHTML=`<div class="ph"><img src="images/${x.img}.jpg" alt="${x.n} mabati" loading="lazy"></div>
 <div class="bd"><h3>${x.n}</h3><p class="d">${x.d}</p>
 <div class="seg gs"><button class="on" data-g="30">Gauge 30</button><button data-g="28" ${(x.s||!x.p[28])?'disabled':''}>Gauge 28</button></div>
 ${x.s?`<div class="seg ls">${LENS.map((l,k)=>`<button class="${k?'':'on'}" data-l="${l}">${l}M</button>`).join('')}</div>`:''}
 <div class="price"><span class="pv">${fmt(price(x,30,'3'))}</span> <small>per ${unit(x)}${x.s?' (Gauge 30)':''}</small></div>
 <select class="col" aria-label="Colour">${COLORS.map(k=>`<option>${k}</option>`).join('')}</select>
 <div class="row"><div class="qty"><button class="m" aria-label="Less">−</button><input type="number" class="q" value="10" min="1" inputmode="numeric" aria-label="Quantity"><button class="a" aria-label="More">+</button></div><span>${unit(x)==='sheet'?'sheets':'metres'}</span></div>
 <button class="btn btn-navy add">Add to order</button></div>`;
 grid.appendChild(c);
});
grid.addEventListener('click',e=>{
 const c=e.target.closest('.card');if(!c)return;const x=P[c.dataset.i];
 const q=c.querySelector('.q'),step=x.s?1:5;
 const upd=()=>{c.querySelector('.pv').textContent=fmt(price(x,c.dataset.g,c.dataset.l))};
 if(e.target.matches('.gs button:not(:disabled)')){
  c.dataset.g=e.target.dataset.g;c.querySelectorAll('.gs button').forEach(b=>b.classList.toggle('on',b===e.target));upd();
 }
 if(e.target.matches('.ls button')){
  c.dataset.l=e.target.dataset.l;c.querySelectorAll('.ls button').forEach(b=>b.classList.toggle('on',b===e.target));upd();
 }
 if(e.target.matches('.m'))q.value=Math.max(1,(+q.value||1)-step);
 if(e.target.matches('.a'))q.value=(+q.value||0)+step;
 if(e.target.matches('.add')){
  const m=Math.max(1,+q.value||1),g=c.dataset.g,col=c.querySelector('.col').value,l=x.s?c.dataset.l:null;
  const ex=cart.find(k=>k.i==c.dataset.i&&k.g==g&&k.col==col&&k.l==l);
  if(ex)ex.m+=m;else cart.push({i:+c.dataset.i,g,col,m,l});
  render();e.target.textContent='Added ✓';setTimeout(()=>e.target.textContent='Add to order',1100);
 }
});
function desc(k){const x=P[k.i];return x.s?`${x.n}, Gauge ${k.g}, ${k.l}M sheet`:`${x.n}, Gauge ${k.g}`}
function qtxt(k){const x=P[k.i];return x.s?`${k.m} sheet${k.m>1?'s':''}`:`${k.m} m`}
function render(){
 const ul=$('#items');ul.innerHTML='';let t=0,n=0;
 cart.forEach((k,idx)=>{const pr=price(P[k.i],k.g,k.l),s=pr*k.m;t+=s;n++;
  const li=document.createElement('li');
  li.innerHTML=`<span><b>${desc(k)}</b>${k.col} · ${qtxt(k)} × ${fmt(pr)}<br>${fmt(s)}</span><button aria-label="Remove" data-r="${idx}">×</button>`;ul.appendChild(li)});
 $('#empty').style.display=n?'none':'block';$('#clr').style.display=n?'block':'none';$('#total').textContent=fmt(t);$('#send').disabled=!n;
 $('#pc').textContent=n;save();updPill();
}
$('#items').addEventListener('click',e=>{if(e.target.dataset.r!==undefined){cart.splice(+e.target.dataset.r,1);render()}});
const panelEl=$('#panel');
function updPill(){const p=$('#pill'),had=p.classList.contains('on'),has=cart.length>0;p.classList.toggle('on',has);
 if(has){p.classList.remove('bump');void p.offsetWidth;p.classList.add('bump')}}
function openPanel(){panelEl.classList.add('open');$('#pback').classList.add('open');panelEl.setAttribute('aria-hidden','false');document.body.classList.add('noscroll')}
function closePanel(){panelEl.classList.remove('open');$('#pback').classList.remove('open');panelEl.setAttribute('aria-hidden','true');document.body.classList.remove('noscroll')}
function viewOrder(){
 if(panelEl.classList.contains('open'))return;
 $('#menu').classList.remove('open');
 loader('Opening your order…',650,()=>{openPanel();setTimeout(hide,150)});
}
$('#pclose').onclick=closePanel;$('#pback').onclick=closePanel;
document.addEventListener('keydown',e=>{if(e.key==='Escape')closePanel()});
$('#pill').onclick=viewOrder;

function openWA(text,txt){
 const url=`https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
 loader(txt||'Opening WhatsApp…',900,()=>{window.location.href=url;setTimeout(hide,1500)});
}
$('#send').onclick=()=>{
 if(!cart.length)return;let t=0;
 const lines=cart.map((k,i)=>{const x=P[k.i],pr=price(x,k.g,k.l),s=pr*k.m;t+=s;return x.s?`${i+1}. ${x.n} | Gauge ${k.g} | ${k.l}M sheet | ${k.col} | ${k.m} sheets @ ${fmt(pr)} = ${fmt(s)}`:`${i+1}. ${x.n} | Gauge ${k.g} | ${k.col} | ${k.m} metres @ ${fmt(pr)} = ${fmt(s)}`});
 const name=$('#cname').value.trim(),loc=$('#cloc').value.trim();
 openWA(`Hello Maisha Mabati, I would like to place an order:\n\n${lines.join('\n')}\n\nEstimated total: ${fmt(t)}\nName: ${name||'-'}\nDelivery location: ${loc||'-'}\n\nPlease confirm availability and delivery.`,'Sending your order…');
};
$('#enq').addEventListener('submit',e=>{e.preventDefault();
 openWA(`Hello Maisha Mabati, my name is ${$('#en').value}${$('#ep').value?' ('+$('#ep').value+')':''}.\n\n${$('#em').value}`,'Opening WhatsApp…')});
$$('.wa-link').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openWA('Hello Maisha Mabati, I would like to make an enquiry about your mabati.')}));

/* tables */
const SH=P.filter(x=>x.s);
$('#tsheet').innerHTML='<tr class="th"><td>Profile</td>'+LENS.map(l=>`<td>${l}M</td>`).join('')+'</tr>'+SH.map(x=>`<tr><td>${x.n}</td>${LENS.map(l=>`<td>${fmt(x.s[l])}</td>`).join('')}</tr>`).join('');
['30','28'].forEach(g=>{$('#t'+g).innerHTML=P.filter(x=>!x.s).map(x=>`<tr><td>${x.n} Mabati</td><td>${x.p[g]?fmt(x.p[g])+' / m':'Call for price'}</td></tr>`).join('')});

/* gallery */
$('#gal').innerHTML=G.map(g=>`<figure><img src="images/${g[0]}.jpg" alt="${g[1]}" loading="lazy"><figcaption>${g[1]}</figcaption></figure>`).join('');
$('#gal').addEventListener('click',e=>{const f=e.target.closest('figure');if(f){$('#lb img').src=f.querySelector('img').src;$('#lb').classList.add('on')}});
$('#lb').onclick=()=>$('#lb').classList.remove('on');
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#lb').classList.remove('on')});

/* pages: one screen at a time, no endless scrolling */
const MAP={'#top':'home','#why':'home','#order':'order','#prices':'prices','#gallery':'gallery','#contact':'contact','#panel':'order'};
function showPage(name,anchor){
 $$('.pg').forEach(el=>el.classList.toggle('act',el.dataset.pg===name));
 $$('#menu a').forEach(a=>a.classList.toggle('cur',MAP[a.getAttribute('href')]===name&&(name!=='home'||a.getAttribute('href')==='#why'&&anchor==='#why')));
 const t=anchor&&anchor!=='#top'&&anchor!=='#order'&&anchor!=='#prices'&&anchor!=='#gallery'&&anchor!=='#contact'?document.querySelector(anchor):null;
 if(t)t.scrollIntoView({behavior:'smooth'});else window.scrollTo({top:0,behavior:'smooth'});
 if(history.replaceState)history.replaceState(null,'','#'+(anchor?anchor.slice(1):name));
}
function go(h){showPage(MAP[h]||'home',h)}
$('#burger').onclick=()=>$('#menu').classList.toggle('open');
$$('[data-load]').forEach(a=>a.addEventListener('click',e=>{
 e.preventDefault();$('#menu').classList.remove('open');const h=a.getAttribute('href');
 loader('One moment…',450,()=>{go(h);setTimeout(hide,200)});
}));
go(MAP[location.hash]?location.hash:'#top');
$$('[data-load-ext]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();loader('Calling…',700,()=>{location.href=a.href;setTimeout(hide,1200)})}));
$('#yr').textContent=new Date().getFullYear();
loadCust();['#cname','#cloc'].forEach(s=>$(s).addEventListener('input',saveCust));
$('#clr').onclick=()=>{if(cart.length&&confirm('Remove all items from your order?')){cart=[];render()}};
render();$('#pill').classList.remove('bump');

/* hero slideshow: mabati photos + logo + blue */
const BG=['romantile','box-blue','tile-charcoal','versatile','box-brown','tile-grey','eurotile','box-teal','maroon-ridge-nails','corrugated'];
$('#bgshow').innerHTML=BG.map(n=>`<img src="images/${n}.jpg" alt="">`).join('');
const SL=[{logo:1},{i:'romantile',t:'Royal blue romantile'},{i:'box-brown',t:'Chocolate brown box profile'},{i:'versatile',t:'Green versatile tile'},{i:'box-blue',t:'Blue box profile'},{logo:1},{i:'eurotile',t:'Eurotile'},{i:'tile-charcoal',t:'Charcoal textured tile sheet'},{i:'maroon-ridge-nails',t:'Maroon tile with ridge caps and nails'},{i:'tile-grey',t:'Grey tile profile'},{i:'box-red',t:'Bright red box profile'}];
$('#slides').innerHTML=SL.map(x=>x.logo?`<div class="slide logo-slide"><img src="images/logo.jpg" alt="Maisha Mabati logo"></div>`:`<div class="slide"><img class="ph" src="images/${x.i}.jpg" alt="${x.t}"></div>`).join('');
$('#dots').innerHTML=SL.map((_,i)=>`<button aria-label="Slide ${i+1}"></button>`).join('');
const bgs=$$('#bgshow img'),sls=$$('#slides .slide'),dts=$$('#dots button');
let bi=0,si=0,timer;
function setBg(n){bgs.forEach((e,k)=>e.classList.toggle('on',k===n))}
function setSl(n){si=(n+sls.length)%sls.length;sls.forEach((e,k)=>e.classList.toggle('on',k===si));dts.forEach((e,k)=>e.classList.toggle('on',k===si))}
function play(){clearInterval(timer);timer=setInterval(()=>{setSl(si+1);bi=(bi+1)%bgs.length;setBg(bi)},3600)}
setBg(0);setSl(0);play();
dts.forEach((d,k)=>d.addEventListener('click',()=>{setSl(k);play()}));
$('#show').addEventListener('mouseenter',()=>clearInterval(timer));$('#show').addEventListener('mouseleave',play);

/* logo tilt effect */
const lf=$('#logofx'),lg=lf.querySelector('.logo-big');
lf.addEventListener('mousemove',e=>{const r=lf.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;lg.style.transform=`rotateY(${x*16}deg) rotateX(${-y*16}deg) scale(1.03)`});
lf.addEventListener('mouseleave',()=>lg.style.transform='');

/* reveal + whatsapp tip */
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
$$('.rv').forEach(el=>io.observe(el));
setTimeout(()=>{$('#wa').classList.add('tip');setTimeout(()=>$('#wa').classList.remove('tip'),4000)},5000);
})();
