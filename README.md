# LP Design das Pedras Mármores e Granitos

Landing page da Design das Pedras (Seropédica/RJ), cliente QH4 Growth, produto **Start Stones** (contrato a partir de 06/10/2026).
Página estática pronta para a Vercel, sem build. **Versão 2** (refeita do zero com conceito próprio, sem repetir a estrutura de outras LPs).

## Estrutura

```
index.html            LP principal
obrigado.html         página de obrigado (noindex) que redireciona para o WhatsApp
404.html              página de erro personalizada (a Vercel usa automaticamente)
robots.txt            libera tudo, bloqueia obrigado.html
sitemap.xml
site.webmanifest
vercel.json           cache dos assets + headers de segurança
assets/css/style.css
assets/js/main.js
assets/img/           fotos .webp reais do cliente (incluindo 3 recortes de detalhe), logo PNG transparente, favicons e imagem OG
```

## Como publicar na Vercel

1. Descompacte o zip.
2. Na Vercel: Add New > Project > arraste a pasta (ou suba num repositório e importe).
3. Framework Preset: **Other**. Sem build command, output = raiz.
4. Depois do deploy, conecte o domínio em Settings > Domains.

## GTM

Instalado o container **GTM-T9LPBTFR** (head + noscript) em `index.html`, `obrigado.html` e `404.html`.

## Pendências antes de publicar

- **Domínio**: o cliente ainda não tem site. Usei `https://designdaspedras.com.br/` como provisório em canonical, Open Graph, JSON-LD, robots.txt e sitemap.xml. Troque tudo de uma vez (buscar `designdaspedras.com.br`).
- **WhatsApp**: (21) 96907-9523, número informado no briefing para os anúncios. Está em `main.js` (const `WHATS`), nos links `wa.me` do HTML e no `obrigado.html`.
- **Instagram da QH4** no rodapé: `instagram.com/qh4growth`. Confirmar o @.
- **Região de atendimento**: a página fala em Seropédica e "região" e o FAQ pede para confirmar o endereço pelo WhatsApp. Se o Júnior confirmar que atende Barra da Tijuca e outras regiões do Rio, dá para incluir os bairros na copy, no FAQ e no `areaServed` do JSON-LD (ajuda no Google Ads e no SEO local).
- **Endereço físico**: não foi colocado. O endereço que veio no briefing é do cadastro de domínio (dados pessoais), não da loja. Se a marmoraria tiver endereço comercial público, adicionar no rodapé e no `address` do JSON-LD.

## Formulário

Não há Google Apps Script para este cliente, então o formulário segue o padrão sem webhook:
- botão nasce desabilitado e só libera com todos os obrigatórios válidos (`checkValidity` a cada input/change);
- máscara de telefone (21) 90000-0000;
- ao enviar, monta a mensagem completa (nome, WhatsApp, local da obra, peça, pedra, observações), vai para `obrigado.html` e de lá abre o WhatsApp em ~2,6 s (com botão de fallback). O link é validado para só aceitar `wa.me/5521969079523`.

Se depois entrar um Apps Script, basta enviar o POST no submit do `main.js` antes do redirecionamento e trocar a mensagem do obrigado para "Olá, acabei de preencher o formulário no site. Aguardo mais informações." (já é o texto padrão do botão de fallback).

## Eventos de rastreamento (dataLayer)

| Evento | Quando |
|---|---|
| `clique_whatsapp` | qualquer link de WhatsApp (`origem`: topo, hero, rodape, flutuante) |
| `clique_cta_orcamento` | botões que levam ao formulário (`origem`) |
| `form_inicio` | primeira interação com o formulário |
| `form_envio` | envio válido (`peca`, `pedra`) |
| `lead_obrigado` | carregamento da página de obrigado (usar como conversão no Google Ads) |
| `clique_avaliacoes_google` | botão "Ler avaliações no Google" |

## Fonte do conteúdo

Tudo veio do briefing respondido pelo Paulo Celso (Júnior) e do resumo do contrato. Nada foi inventado:
- fundação em 2016 e a frase do propósito (resposta da história da empresa no briefing);
- serviços: soleiras, peitoris, escadas, lavatórios e bancadas de cozinha, com destaque para bancadas e lavatórios (pedido do cliente);
- tema principal "detalhe de acabamento" (pedido do cliente) virou a seção com a vista geral da bancada e três closes (escorredor, cuba, furação);
- diferenciais: atencioso, detalhista, saber ouvir e orientar; dono faz medição e instalação;
- horário: seg a sex 8h às 17h, sáb 8h às 12h;
- nota 5.0 no Google (resumo do contrato) com link para as avaliações enviado no briefing;
- FAQ: as perguntas "desconto" e "prazo" vieram do briefing sem resposta, então as respostas apenas dizem que isso é tratado no orçamento;
- posicionamento "Tradicional" e fundo escuro (briefing); nada de "chão de fábrica" nas fotos (pedido do cliente);
- nome do dono não aparece na página (ele marcou que não gosta de aparecer).
- Materiais: granito, mármore e quartzito aparecem só como opções do formulário (o cliente quer puxar o mix para quartzito).

## Conceito visual (v2)

A planta de medição: o diferencial do cliente é que o próprio dono mede e instala, então a página usa a linguagem de quem mede.
- Hero com a foto da ilha e **cotas de medição desenhadas por cima** (comprimento, altura da saia, recorte do cooktop), animadas ao carregar.
- Índice de peças em lista tipográfica grande; no desktop a foto da peça segue o cursor, no celular aparece em miniatura.
- Detalhe de acabamento: vista geral + três closes circulares, como lupa de conferência.
- Lavatórios com texto fixo e fotos rolando ao lado.
- Faixa panorâmica da escada.
- "Quem mede é quem instala" com uma **régua** que se desenha e as 4 etapas sobre ela.
- Formulário como **ficha de orçamento** em papel claro (tom de pedra), com campos sublinhados e escolha da peça/pedra em botões.
- Dúvidas abertas em duas colunas (sem sanfona), lidas como ficha técnica.
- Paleta: ardósia azulada (#151A21, não preto absoluto), quartzito claro no texto, azul de cota tirado da logo. Poppins leve (300) nos títulos + Inter no corpo.
Fotos todas do cliente (pasta do Drive + Instagram, só as sem marca d'água).

## Checklist de SEO

- [x] Title e meta description com "marmoraria" + Seropédica
- [x] H1 com "Marmoraria" + Seropédica (posicionamento alto padrão)
- [x] Canonical (provisório)
- [x] Open Graph completo + imagem 1200x630
- [x] Twitter Card
- [x] JSON-LD HomeAndConstructionBusiness + FAQPage
- [x] robots.txt, sitemap.xml, site.webmanifest, favicons
- [x] width/height em todas as imagens (CLS) e preload da imagem do hero
- [x] Imagens em WebP otimizadas (≈1 MB no total)
- [x] Página de obrigado (noindex) e 404 personalizada
- [x] vercel.json
- [x] Botão flutuante de WhatsApp à direita
- [x] Acessibilidade: foco visível, skip link, prefers-reduced-motion
