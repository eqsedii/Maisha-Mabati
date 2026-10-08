(function(){
const WA='254758839249';
const P=[
 {n:'Box Profile',d:'Strong, clean lines for homes, stores and factories.',img:'box-profile',p:{30:400,28:500}},
 {n:'Dumuzaz',d:'Fine-ribbed sheet with a neat modern finish.',img:'dumuzaz',p:{30:300,28:350}},
 {n:'Corrugated',d:'The classic wave profile. Light and economical.',img:'corrugated',p:{30:350,28:400}},
 {n:'Romantile',d:'Rounded tile look for a premium roof.',img:'romantile',p:{30:600,28:650}},
 {n:'Versatile',d:'Stepped tile pattern that suits any house design.',img:'versatile',p:{30:500,28:600}},
 {n:'Eurotile',d:'European tile styling in a durable steel sheet.',img:'eurotile',p:{30:600,28:700}},
 {n:'Orientile',d:'Deep tile profile with a bold roof shadow.',img:'orientile',p:{30:700,28:600}},
 {n:'Zee Tile',d:'Sharp tile pattern. Gauge 28 price on request.',img:'zee-tile',p:{30:500,28:null}}
];
const COLORS=['Charcoal Grey','Royal Blue','Forest Green','Brick Red','Chocolate Brown','Maroon','Bright Red','Teal','Orange Red','White'];
const G=[['box-blue','Royal blue box profile'],['box-green','Green box profile'],['box-brown','Chocolate brown box profile'],['orange','Orange-red corrugated'],['box-red','Bright red box profile'],['box-dark','Charcoal box profile'],['box-teal','Teal box profile'],['corrugated','Corrugated in three colours'],['box-maroon','Maroon box profile'],['box-white','White box profile'],['box-green2','Forest green box profile'],['tile-charcoal','Charcoal textured tile sheet'],['maroon-ridge-nails','Maroon tile with ridge caps and roofing nails'],['tile-grey','Grey tile profile']];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const fmt=n=>'Ksh '+n.toLocaleString('en-KE');
let cart=[];

/* loader */
const L=$('#loader');
function loader(txt,ms,cb){$('#ldtxt').textContent=txt;L.classList.add('on');setTimeout(()=>{cb&&cb();},ms)}
function hide(){L.classList.remove('on')}
window.addEventListener('load',()=>setTimeout(hide,1100));
setTimeout(hide,3500);

/* products */
const grid=$('#grid');
P.forEach((x,i)=>{
 const c=document.createElement('article');c.className='card rv';c.dataset.i=i;c.dataset.g=x.p[30]?30:28;
 c.innerHTML=`<div class="ph"><img src="images/${x.img}.jpg" alt="${x.n} mabati" loading="lazy"></div>
 <div class="bd"><h3>${x.n}</h3><p class="d">${x.d}</p>
 <div class="seg"><button class="on" data-g="30">Gauge 30</button><button data-g="28" ${x.p[28]?'':'disabled'}>Gauge 28</button></div>
 <div class="price"><span class="pv">${fmt(x.p[30])}</span> <small>per metre</small></div>
 <select class="col" aria-label="Colour">${COLORS.map(k=>`<option>${k}</option>`).join('')}</select>
 <div class="row"><div class="qty"><button class="m" aria-label="Less">−</button><input type="number" class="q" value="10" min="1" inputmode="numeric" aria-label="Metres"><button class="a" aria-label="More">+</button></div><span>metres</span></div>
 <button class="btn btn-navy add">Add to order</button></div>`;
 grid.appendChild(c);
});
grid.addEventListener('click',e=>{
 const c=e.target.closest('.card');if(!c)return;const x=P[c.dataset.i];
 const q=c.querySelector('.q');
 if(e.target.matches('.seg button:not(:disabled)')){
  c.dataset.g=e.target.dataset.g;$$('.seg button',c);c.querySelectorAll('.seg button').forEach(b=>b.classList.toggle('on',b===e.target));
  c.querySelector('.pv').textContent=fmt(x.p[c.dataset.g]);
 }
 if(e.target.matches('.m'))q.value=Math.max(1,(+q.value||1)-5);
 if(e.target.matches('.a'))q.value=(+q.value||0)+5;
 if(e.target.matches('.add')){
  const m=Math.max(1,+q.value||1),g=c.dataset.g,col=c.querySelector('.col').value;
  const ex=cart.find(k=>k.i==c.dataset.i&&k.g==g&&k.col==col);
  if(ex)ex.m+=m;else cart.push({i:+c.dataset.i,g,col,m});
  render();e.target.textContent='Added ✓';setTimeout(()=>e.target.textContent='Add to order',1100);
 }
});
function render(){
 const ul=$('#items');ul.innerHTML='';let t=0,n=0;
 cart.forEach((k,idx)=>{const pr=P[k.i].p[k.g],s=pr*k.m;t+=s;n++;
  const li=document.createElement('li');
  li.innerHTML=`<span><b>${P[k.i].n}, Gauge ${k.g}</b>${k.col} · ${k.m} m × ${fmt(pr)}<br>${fmt(s)}</span><button aria-label="Remove" data-r="${idx}">×</button>`;ul.appendChild(li)});
 $('#empty').style.display=n?'none':'block';$('#total').textContent=fmt(t);$('#send').disabled=!n;
 $('#pc').textContent=n;$('#pill').classList.toggle('show',n>0);
}
$('#items').addEventListener('click',e=>{if(e.target.dataset.r!==undefined){cart.splice(+e.target.dataset.r,1);render()}});
$('#pill').onclick=()=>go('#panel');

function openWA(text,txt){
 const url=`https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
 loader(txt||'Opening WhatsApp…',900,()=>{window.location.href=url;setTimeout(hide,1500)});
}
$('#send').onclick=()=>{
 if(!cart.length)return;let t=0;
 const lines=cart.map((k,i)=>{const pr=P[k.i].p[k.g],s=pr*k.m;t+=s;return `${i+1}. ${P[k.i].n} | Gauge ${k.g} | ${k.col} | ${k.m} metres @ ${fmt(pr)} = ${fmt(s)}`});
 const name=$('#cname').value.trim(),loc=$('#cloc').value.trim();
 openWA(`Hello Maisha Mabati, I would like to place an order:\n\n${lines.join('\n')}\n\nEstimated total: ${fmt(t)}\nName: ${name||'-'}\nDelivery location: ${loc||'-'}\n\nPlease confirm availability and delivery.`,'Sending your order…');
};
$('#enq').addEventListener('submit',e=>{e.preventDefault();
 openWA(`Hello Maisha Mabati, my name is ${$('#en').value}${$('#ep').value?' ('+$('#ep').value+')':''}.\n\n${$('#em').value}`,'Opening WhatsApp…')});
$$('.wa-link').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openWA('Hello Maisha Mabati, I would like to make an enquiry about your mabati.')}));

/* tables */
['30','28'].forEach(g=>{$('#t'+g).innerHTML=P.map(x=>`<tr><td>${x.n} Mabati</td><td>${x.p[g]?fmt(x.p[g])+' / m':'Call for price'}</td></tr>`).join('')});

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
