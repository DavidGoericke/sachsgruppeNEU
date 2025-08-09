
async function loadJSON(p){ const r=await fetch(p,{cache:'no-store'}); if(!r.ok) throw new Error('Fetch failed '+p); return r.json(); }
function setText(sel,txt){ const el=document.querySelector(sel); if(el) el.textContent=txt; }
function setHTML(sel,html){ const el=document.querySelector(sel); if(el) el.innerHTML=html; }
function setImg(sel,src,alt){ const el=document.querySelector(sel); if(el){ el.src=src; if(alt) el.alt=alt; } }

document.addEventListener('DOMContentLoaded', async () => {
  const page = document.body.dataset.page;
  try {
    if(page==='index'){
      const d = await loadJSON('content/index.json');
      setText('[data-hero-title]', d.hero_title);
      setText('[data-hero-text]', d.hero_text);
      setImg('[data-hero-image]', d.hero_image, 'Hero Bild');
    }
    if(['energiehaus','gebaeudemanagement','sicherheit'].includes(page)){
      const d = await loadJSON(`content/${page}.json`);
      setText('[data-title]', d.title);
      setText('[data-intro]', d.intro);
      const cards = document.querySelector('[data-cards]');
      if(cards && d.cards) cards.innerHTML = d.cards.map(c => `<article class="card"><img src="${c.image}" alt="${c.title}"><h3>${c.title}</h3><p>${c.text}</p></article>`).join('');
    }
    if(page==='legal'){
      const d = await loadJSON('content/legal.json');
      setHTML('[data-impressum]', d.impressum_html);
      setHTML('[data-datenschutz]', d.datenschutz_html);
    }
  } catch(e){ console.error(e); }
});
