const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch({channel:'msedge'});
for (const [n,u,sel] of [['App','app/','#lista-pontos .ponto-item'],['Chatbot','chatbot/','#conversa .msg'],['Plataforma demo','plataforma/?modo=demo','.contas-demo'],['Hub','index.html','#perto-lista li'],['Site','site/','#form-calc']]) {
  const ctx=await b.newContext();const p=await ctx.newPage();
  await p.goto('http://localhost:8766/'+u,{waitUntil:'networkidle'});
  if(n==='App'||n==='Chatbot'){await p.evaluate(()=>navigator.serviceWorker.ready);await p.reload({waitUntil:'networkidle'});}
  await p.waitForTimeout(800);
  // 1) aba continua aberta e a rede cai
  await ctx.setOffline(true);
  let abertaFunciona='-';
  if(n==='Chatbot'){await p.fill('#pergunta','pneu');await p.press('#pergunta','Enter');await p.waitForTimeout(700);abertaFunciona=/Pneu pode ir/.test(await p.textContent('#conversa'))?'sim':'não';}
  // 2) recarregar (ou abrir de novo) sem internet
  let reabre;try{await p.reload({waitUntil:'load',timeout:10000});await p.waitForTimeout(800);reabre=(await p.locator(sel).count())>0?'SIM':'NÃO (página não abre)';}catch(e){reabre='NÃO ('+e.message.split('\n')[0].slice(0,50)+')';}
  console.log(n.padEnd(16),'| aba aberta, rede caiu, ainda responde:',abertaFunciona,'| reabrir sem internet:',reabre);
  await ctx.close();}
await b.close();})();
