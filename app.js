// Tab logic
const tabs = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-content');
tabs.forEach(btn=>{
btn.addEventListener('click',()=>{
tabs.forEach(b=>{b.classList.remove('is-active'); b.setAttribute('aria-selected','false')});
panels.forEach(p=>p.classList.remove('is-active'));
btn.classList.add('is-active');
btn.setAttribute('aria-selected','true');
document.getElementById(btn.dataset.tab).classList.add('is-active');
window.scrollTo({top:0,behavior:'smooth'});
});
});


// PWA install prompt
let deferredPrompt; const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); deferredPrompt=e; installBtn.hidden=false; });
installBtn?.addEventListener('click', async ()=>{ if(!deferredPrompt) return; deferredPrompt.prompt(); const {outcome}=await deferredPrompt.userChoice; deferredPrompt=null; installBtn.hidden=true; console.log('PWA install:',outcome); });


// Register service worker
if('serviceWorker' in navigator){
window.addEventListener('load',()=>{
navigator.serviceWorker.register('./sw.js').catch(console.error);
});
}
