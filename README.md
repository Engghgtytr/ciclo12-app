# Ciclo 12

Trabalho escolar sobre a **ODS 12 — Consumo e Produção Responsáveis**.

- **Grupo:** Enzo Penchel, Bárbara Valentina, Davi Biguetti e Julia Ayumi
- **Escola:** Colégio Progresso, Av. Timóteo Penteado, 4405, Vila Galvão, Guarulhos/SP (endereço ainda a confirmar com a secretaria)
- **Entrega:** 08/10/2026

O Ciclo 12 é **um sistema só, com 4 módulos**. Cada módulo ataca um ou mais dos 5 problemas
(lixo eletrônico, roupas, desperdício de alimentos, reciclagem e consumo de água/energia).

## Módulos

| Pasta | Módulo | Problema que resolve | Situação |
|---|---|---|---|
| `/` (`index.html`) | **Hub** | Mostra os 5 problemas com dados e fonte, o mapa de descarte e os links para os módulos | pronto (Etapa 1) |
| `/site/` | **Ciclo Consumo** (site) | Consumo de água e energia: conteúdo, calculadora, gráfico e cadastro simples | a fazer (Etapa 2) |
| `/chatbot/` | **Ciclo Bot** (chatbot) | Dúvidas sobre reciclagem, funciona por regras, offline e sem chave de API | a fazer (Etapa 3) |
| `/app/` | **Ciclo Ponto** (app PWA) | Lixo eletrônico e roupas/objetos: GPS, câmera e lembretes, instalável no celular | a fazer (Etapa 4) |
| `/plataforma/` | **Ciclo Prato** (plataforma) | Desperdício de alimentos: login, 3 perfis (doador, receptor, admin), doações com status e painel | a fazer (Etapa 5) |

## Estrutura de pastas

```
ciclo12/
├── index.html          (hub, Etapa 1)
├── app/                (Ciclo Ponto)
├── plataforma/         (Ciclo Prato)
├── chatbot/            (Ciclo Bot)
├── site/               (Ciclo Consumo)
├── shared/             (arquivos usados por todos os módulos)
│   ├── estilo.css      cores claro/escuro, botões, cartões, abas, formulários, avisos
│   ├── logo.svg        logo próprio (duas setas formando um ciclo)
│   ├── favicon.svg     ícone da aba do navegador
│   └── pontos.js       lista de pontos de coleta (Etapa 1)
├── _dados/             dados brutos e pendências (não aparecem no site)
│   └── pevs_guarulhos.md
└── _referencia/        material de consulta
```

## Como rodar no seu computador

Abrir o `index.html` com dois cliques não basta. Alguns recursos (mapa, app instalável, câmera,
GPS) só funcionam quando a página vem de um servidor. O Python já traz um servidor simples:

1. Abra o terminal (PowerShell) **dentro da pasta `ciclo12`**.
2. Rode:
   ```
   python -m http.server 8000
   ```
   (se o comando `python` não existir, tente `py -m http.server 8000`)
3. Abra no navegador: <http://localhost:8000>
4. Para parar o servidor, volte ao terminal e aperte `Ctrl + C`.

**Para testar no celular:** o celular precisa estar no mesmo Wi-Fi. Mesmo assim, GPS, câmera e
instalação do app exigem HTTPS, então teste esses recursos no link do GitHub Pages (abaixo).

## Como publicar no GitHub Pages (grátis, com HTTPS)

1. Crie uma conta em <https://github.com> (se ainda não tiver).
2. Clique em **New repository**, dê o nome `ciclo12` e marque **Public**.
3. Envie os arquivos desta pasta: na página do repositório, use **Add file → Upload files**,
   arraste o conteúdo da pasta `ciclo12` e clique em **Commit changes**.
   (Ou, pelo terminal, com `git remote add origin ...` e `git push`.)
4. Vá em **Settings → Pages**. Em *Build and deployment*, escolha **Deploy from a branch**,
   branch **main**, pasta **/ (root)**, e clique em **Save**.
5. Espere 1 a 2 minutos. O link fica assim: `https://SEU-USUARIO.github.io/ciclo12/`

**Atenção:** o repositório é público, então qualquer pessoa vê os arquivos.
**Nunca** coloque senha ou chave secreta nele. A chave `service_role` do Supabase nunca entra no código.

## Regras de dados do projeto

- Nenhum dado inventado. Dado sem fonte aparece como **TODO** na tela.
- Dado de exemplo aparece com o rótulo **EXEMPLO**.
- Ponto de coleta não confirmado aparece com o rótulo **a confirmar**.
- Os PEVs vêm da matéria da Agência Mural (10/10/2025). Confirme horários e materiais com a
  Prefeitura de Guarulhos.

## Tecnologia

HTML, CSS e JavaScript puros, sem framework e sem etapa de build. Dependências externas:
Leaflet (mapa, via cdnjs) e, só na plataforma, o cliente do Supabase via CDN.
