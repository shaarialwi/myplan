self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
// Never cache authenticated pages or user records.
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate')e.respondWith(fetch(e.request).catch(()=>new Response('<!doctype html><meta name="viewport" content="width=device-width"><title>Myplan — Offline</title><body style="font:18px system-ui;padding:40px;background:#252630;color:#f5f4fa"><h1>Myplan.</h1><p>You’re offline. Reconnect to load and save your plans.</p><button onclick="location.reload()">Try again</button>',{headers:{'Content-Type':'text/html'}})))});
