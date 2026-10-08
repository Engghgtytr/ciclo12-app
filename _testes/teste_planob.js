// Plano B: notebook sem internet, site rodando no próprio notebook (localhost). Bloqueia tudo que não é localhost.
const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch({channel:'msedge'});
for (const [n,u,sel,extra] of [['Hub','index.html','#perto-lista li'],['Hub mapa','index.html#mapa','#lista-pontos .item-ponto'],['Site','site/','#form-calc'],['Chatbot','chatbot/','#conversa .msg'],['App','app/','#lista-pontos .ponto-item'],['Plataforma','plataforma/','.contas-demo']]) {
  const ctx=await b.newContext();const p=await ctx.newPage();const erros=[];p.on('pageerror',e=>erros.push(e.message));
  await p.route(u=>!/^http:\/\/localhost/.test(u.href), r=>r.abort('internetdisconnected'));
  await p.goto('http://localhost:8766/'+u,{waitUntil:'load'});
  try{await p.waitForSelector(sel,{timeout:15000});}catch(e){}
  const ok=(await p.locator(sel).count())>0;
  let info='';
  if(n==='Plataforma'){info=' | modo: '+(await p.textContent('#modo-info')).trim().slice(0,60)+' | faixa demo: '+(await p.locator('#faixa-demo').isVisible());}
  if(n==='Hub mapa'){info=' | mapa: '+(await p.textContent('#mapa-area')).trim().slice(0,50);}
  console.log(n.padEnd(11),'| abre e funciona:',ok?'SIM':'NÃO',info,erros.length?'| erros JS: '+erros.join(' | '):'');
  await ctx.close();}
await b.close();})();
