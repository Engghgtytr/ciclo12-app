/* =========================================================
   Ciclo Bot — service worker (funcionar sem internet)
   - Guarda a página do chatbot, a base de conhecimento e a lista de pontos.
   - Caminhos RELATIVOS a este arquivo: funciona no GitHub Pages em subpasta.
   - Arquivos do site: rede primeiro, cópia guardada se estiver offline.
   - Cache com nome próprio ("ciclo-bot-"), separado do app ("ciclo-ponto-").
   Ao mudar arquivos do chatbot, aumente o número da VERSAO.
   ========================================================= */
var VERSAO = "ciclo-bot-v1";
var ARQUIVOS = [
  "./",
  "./index.html",
  "./bot.css",
  "./bot.js",
  "./conhecimento.js",
  "../shared/estilo.css",
  "../shared/pontos.js",
  "../shared/logo.svg",
  "../shared/favicon.svg",
  "../shared/animacao.js"
].map(function (c) { return new URL(c, self.location).href; });

self.addEventListener("install", function (ev) {
  ev.waitUntil(
    caches.open(VERSAO).then(function (cache) { return cache.addAll(ARQUIVOS); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (ev) {
  ev.waitUntil(
    caches.keys().then(function (nomes) {
      return Promise.all(nomes.filter(function (n) { return n.indexOf("ciclo-bot-") === 0 && n !== VERSAO; })
        .map(function (n) { return caches.delete(n); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (ev) {
  var req = ev.request;
  if (req.method !== "GET") { return; }
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) { return; }
  ev.respondWith(
    fetch(req).then(function (resp) {
      if (resp && resp.ok) { var copia = resp.clone(); caches.open(VERSAO).then(function (c) { c.put(req, copia); }); }
      return resp;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (guardado) {
        if (guardado) { return guardado; }
        if (req.mode === "navigate") { return caches.match(new URL("./index.html", self.location).href); }
        return new Response("Sem internet e sem cópia guardada deste arquivo.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
      });
    })
  );
});
