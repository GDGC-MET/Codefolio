/* ---------- small data for projects & skills ---------- */
const PROJECTS = [
  {id:'p1',title:'Itinno — AI Travel',desc:'AI itinerary generator with route optimisation and cost estimates.'},
  {id:'p2',title:'AgriSense',desc:'Sensor-backed yield predictions and farmer insights.'},
  {id:'p3',title:'HealthConnect',desc:'Secure clinical-data API with audit logging and roles.'},
  {id:'p4',title:'UI-Atoms',desc:'Tiny accessible component system for dashboards.'}
];
const SKILLS = [
  {name:'Full-Stack',val:92},
  {name:'Frontend',val:90},
  {name:'AI / ML',val:78},
  {name:'DevOps',val:66}
];

/* ---------- render projects & skills ---------- */
function mountProjects(){
  const el = document.getElementById('projects');
  PROJECTS.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'project-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="project-title">${escapeHtml(p.title)}</div>
      <div class="project-desc">${escapeHtml(p.desc)}</div>
    `;
    // simple hover parallax (transform based on mouse)
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${ -dy * 6 }deg) rotateY(${ dx * 8 }deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', ()=> card.style.transform = '');
    // click -> show details (simple alert for demo)
    card.addEventListener('click', ()=> alert(p.title + '\\n\\n' + p.desc));
    el.appendChild(card);
  });
}

function mountSkills(){
  const el = document.getElementById('skillsGrid');
  SKILLS.forEach(s=>{
    const deg = Math.round(s.val * 3.6);
    const wrapper = document.createElement('div');
    wrapper.className = 'skill-meter';
    wrapper.innerHTML = `
      <div class="meter-circle" style="--deg:${deg}deg">
        <div class="meter-inner">${s.val}%</div>
      </div>
      <div class="skill-info">
        <div class="skill-name">${escapeHtml(s.name)}</div>
        <div class="skill-meta">Proficiency &bull; ${s.val}%</div>
      </div>
    `;
    el.appendChild(wrapper);
  });
}

/* ---------- typewriter (simple, accessible) ---------- */
function startTypewriter(elId, words, speed=2200){
  const el = document.getElementById(elId);
  if(!el) return;
  let i = 0;
  setInterval(()=>{
    el.animate([{opacity:1, transform:'translateY(0)'},{opacity:0, transform:'translateY(-6px)'}],{duration:240,fill:'forwards'});
    setTimeout(()=> el.textContent = words[i++ % words.length], 260);
  }, speed);
}

/* ---------- scroll reveal using IntersectionObserver ---------- */
function initReveal(){
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(en => {
      if(en.isIntersecting){
        en.target.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.2,.9,.2,1)';
        en.target.style.opacity = 1;
        en.target.style.transform = 'translateY(0)';
        o.unobserve(en.target);
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.project-card, .skill-meter, .card-floating, .section-title').forEach(n=>{
    n.style.opacity = 0; n.style.transform = 'translateY(10px)'; obs.observe(n);
  });
}

/* ---------- background canvas subtle particles ---------- */
function initBackground(){
  const c = document.getElementById('bg-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let w = c.width = innerWidth;
  let h = c.height = innerHeight;
  const dots = Array.from({length: Math.max(20, Math.floor((w+h)/140))}).map(()=>{
    return {x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+0.6, vx:(Math.random()-0.5)/30, vy:(Math.random()-0.5)/30};
  });
  function resize(){ w = c.width = innerWidth; h = c.height = innerHeight; }
  window.addEventListener('resize', resize, {passive:true});
  function draw(){
    ctx.clearRect(0,0,w,h);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if(d.x < -20) d.x = w + 20; if(d.x > w + 20) d.x = -20;
      if(d.y < -20) d.y = h + 20; if(d.y > h + 20) d.y = -20;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(108,92,231,0.12)';
      ctx.arc(d.x, d.y, d.r+2, 0, Math.PI*2); ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0,224,255,0.06)';
      ctx.arc(d.x+30, d.y-20, d.r+1, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ---------- form handling (no network) ---------- */
function initForm(){
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  document.getElementById('clearForm').addEventListener('click', ()=> form.reset());
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name') || '';
    status.textContent = 'Sending...';
    setTimeout(()=>{
      status.textContent = `Thanks ${name.split(' ')[0] || ''}! Message queued (demo).`;
      form.reset();
      setTimeout(()=> status.textContent = '', 3600);
    }, 900);
  });
}

/* ---------- theme toggle (persist) ---------- */
function initTheme(){
  const btn = document.getElementById('themeToggle');
  const stored = localStorage.getItem('pref-theme') || 'dark';
  applyTheme(stored);
  btn.addEventListener('click', () => {
    const next = document.documentElement.style.getPropertyValue('--bg') === '#ffffff' ? 'dark' : 'light';
    applyTheme(next); localStorage.setItem('pref-theme', next);
  });
}
function applyTheme(name){
  if(name === 'light'){
    document.documentElement.style.setProperty('--bg','#ffffff');
    document.documentElement.style.setProperty('--muted','#5b6670');
    document.documentElement.style.setProperty('--panel','rgba(255,255,255,0.6)');
    document.documentElement.style.setProperty('--accent1','#6C5CE7');
    document.documentElement.style.setProperty('--accent2','#00E0FF');
  } else {
    document.documentElement.style.setProperty('--bg','#071026');
    document.documentElement.style.setProperty('--muted','#9aa3b2');
    document.documentElement.style.setProperty('--panel','rgba(9,12,20,0.6)');
  }
}

/* ---------- tiny helpers ---------- */
function escapeHtml(str){ return String(str).replace(/[&<>"']/g, s=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[s]); }

function boot(){
  mountProjects();
  mountSkills();
  startTypewriter('typewriter',['Full-Stack Developer','AI Experimenter','UI/UX Enthusiast','Problem Solver'],2600);
  initReveal();
  initBackground();
  initForm();
  initTheme();
  document.getElementById('year').textContent = new Date().getFullYear();
}

/* start when DOM ready */
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
