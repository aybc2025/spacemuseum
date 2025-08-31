<script type="text/plain" data-filename="sw.js">
const CACHE_NAME = 'space-centre-cache-v1';
const ASSETS = [
'./',
'./index.html',
'./style.css',
'./app.js',
'./manifest.webmanifest',
'./images/planetarium.jpg',
'./images/cosmic-courtyard.jpg',
'./images/groundstation.jpg',
'./images/observatory.jpg',
'./images/crab-fountain.jpg',
'./icons/icon-192.png',
'./icons/icon-512.png'
];
self.addEventListener('install', (e)=>{
e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', (e)=>{
e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))));
});
self.addEventListener('fetch', (e)=>{
e.respondWith(
caches.match(e.request).then(resp=> resp || fetch(e.request).then(net=>{
const copy = net.clone();
caches.open(CACHE_NAME).then(c=>{ if(e.request.method==='GET' && e.request.url.startsWith(self.location.origin)) c.put(e.request, copy);});
return net;
}).catch(()=>caches.match('./index.html')))
);
});
</script>
