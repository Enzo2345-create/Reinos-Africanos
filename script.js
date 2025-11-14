/* JS separado do index.html */

const kingdoms={
    kush:{name:'Reino de Kush',summary:'Kush foi uma poderosa civilização ao sul do Egito — com centros como Napata e depois Meroé.',facts:['Capital: Napata / Meroé','Economia: metalurgia e comércio','Relação com o Egito: Dinastia XXV']},
    axum:{name:'Reino de Axum',summary:'Axum tornou-se um centro comercial entre Roma/Bizâncio e a Índia.',facts:['Porto no Mar Vermelho','Adoção do cristianismo no século IV','Moedas próprias para comércio']},
    meroe:{name:'Meroé',summary:'Meroé foi um centro cultural e industrial famoso por suas pirâmides e forjas de ferro.',facts:['Centro tardio de Kush','Metalurgia avançada','Trocas com povos do interior']}
  };
  
  const contentEl=document.getElementById('kingdom-content');
  
  function renderKingdom(key){
    const k=kingdoms[key];
    contentEl.innerHTML=`
    <h2>${k.name}</h2>
    <p class="mini">${k.summary}</p>
    <ul>${k.facts.map(f=>`<li>${f}</li>`).join('')}</ul>
    <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
      <button onclick="highlightTrade('${key}')">Ver rotas associadas</button>
      <button onclick="openFacts('${key}')">Abrir curiosidades</button>
    </div>
    <div id="extra-${key}" class="hidden" style="margin-top:8px"></div>`;
  }
  renderKingdom('kush');
  
  function selectTab(e){
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    e.currentTarget.classList.add('active');
    renderKingdom(e.currentTarget.dataset.kingdom);
  }
  
  function mapClick(region){
    document.querySelectorAll('#svgMap g').forEach(g=>g.style.opacity='0.6');
    const g=document.getElementById(region);
    if(g) g.style.opacity='1';
    renderKingdom(region);
  }
  
  function highlightTrade(key){alert('Rotas comerciais relacionadas a: '+kingdoms[key].name)}
  
  function openFacts(key){
    const el=document.getElementById('extra-'+key);
    if(!el)return;
    if(el.classList.contains('hidden')){
      el.classList.remove('hidden');
      el.innerHTML='<div class="card" style="padding:8px;margin-top:8px">Curiosidades históricas adicionais deste reino.</div>';
    }else{
      el.classList.add('hidden');
      el.innerHTML='';
    }
  }
  
  function updateYear(v){
    const year=parseInt(v);
    document.getElementById('yearLabel').textContent=(year<0?`c.${Math.abs(year)} a.C.`:`Ano ${year}`);
  }
  
  function setYear(y){
    document.getElementById('timeRange').value=y;
    updateYear(y);
  }
  
  function toggleMobileMenu(){
    const nav=document.querySelector('nav');
    if(!nav)return;
    nav.style.display=nav.style.display==='block'?'none':'block';
  }
  