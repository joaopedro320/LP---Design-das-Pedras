/* Design das Pedras | LP QH4 v2 */
(function () {
  'use strict';
  var WHATS = '5521969079523';
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.dataLayer = window.dataLayer || [];
  function evento(nome, dados) { var o = { event: nome }; for (var k in dados) o[k] = dados[k]; window.dataLayer.push(o); }

  var ano = document.getElementById('ano'); if (ano) ano.textContent = new Date().getFullYear();

  /* barra ganha fio ao rolar */
  var barra = document.getElementById('barra');
  function rolar() { barra.classList.toggle('is-rolada', window.scrollY > 10); }
  window.addEventListener('scroll', rolar, { passive: true }); rolar();

  /* entrada ao rolar */
  var alvos = document.querySelectorAll('.pecas__cab, .indice__item, .detalhe__cab, .detalhe__geral, .detalhe__zooms li, .lav__fixo, .lav__f, .degraus__txt, .mede__topo, .etapas li, .nota, .ficha, .duvidas h2, .duvidas__lista > div');
  alvos.forEach(function (el) { el.setAttribute('data-r', ''); });
  var regua = document.querySelector('.regua');
  if ('IntersectionObserver' in window && !reduz) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visivel'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    alvos.forEach(function (el) {
      var irmaos = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      if (el.matches('.indice__item, .etapas li, .lav__f, .detalhe__zooms li, .duvidas__lista > div')) el.style.transitionDelay = (irmaos % 4) * 90 + 'ms';
      io.observe(el);
    });
    if (regua) io.observe(regua);
  } else {
    alvos.forEach(function (el) { el.classList.add('is-visivel'); });
    if (regua) regua.classList.add('is-visivel');
  }

  /* índice: foto flutuante seguindo o cursor */
  var flutua = document.querySelector('.flutua');
  if (flutua && window.matchMedia('(hover: hover) and (min-width: 761px)').matches) {
    var fimg = flutua.querySelector('img');
    var x = 0, y = 0, fx = 0, fy = 0, rodando = false;
    function anima() {
      fx += (x - fx) * 0.18; fy += (y - fy) * 0.18;
      flutua.style.transform = 'translate(' + (fx - 120) + 'px,' + (fy - 150) + 'px) scale(' + (flutua.classList.contains('is-on') ? 1 : .85) + ') rotate(' + ((x - fx) * 0.04) + 'deg)';
      if (rodando) requestAnimationFrame(anima);
    }
    document.querySelectorAll('.indice__item').forEach(function (li) {
      li.addEventListener('mouseenter', function () {
        if (!li.dataset.foto) return;
        fimg.src = li.dataset.foto; flutua.classList.add('is-on');
        if (!rodando) { rodando = true; anima(); }
      });
      li.addEventListener('mouseleave', function () { flutua.classList.remove('is-on'); setTimeout(function () { if (!flutua.classList.contains('is-on')) rodando = false; }, 400); });
      li.addEventListener('mousemove', function (e) { x = e.clientX + 40; y = e.clientY; });
    });
  }

  /* eventos de clique */
  document.querySelectorAll('.js-wa').forEach(function (a) { a.addEventListener('click', function () { evento('clique_whatsapp', { origem: a.dataset.origem || 'link' }); }); });
  document.querySelectorAll('.js-cta').forEach(function (a) { a.addEventListener('click', function () { evento('clique_cta_orcamento', { origem: a.dataset.origem || 'link' }); }); });
  document.querySelectorAll('.js-google').forEach(function (a) { a.addEventListener('click', function () { evento('clique_avaliacoes_google', {}); }); });

  /* ficha de orçamento */
  var form = document.getElementById('form-orcamento');
  if (!form) return;
  var enviar = document.getElementById('f-enviar');
  var status = document.getElementById('f-status');
  var tel = document.getElementById('f-whats');
  var comecou = false;
  tel.addEventListener('input', function () {
    var d = tel.value.replace(/\D/g, '').slice(0, 11), c = d.length === 11 ? 7 : 6, v = d;
    if (d.length > 2) v = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 6) v = '(' + d.slice(0, 2) + ') ' + d.slice(2, c) + '-' + d.slice(c);
    tel.value = v;
  });
  function checar() {
    var ok = form.checkValidity();
    enviar.disabled = !ok;
    status.textContent = ok ? 'Pronto. O WhatsApp abre com a sua mensagem escrita.' : 'Preencha nome, WhatsApp, local e peça para liberar o envio.';
  }
  form.addEventListener('input', function (e) {
    if (!comecou) { comecou = true; evento('form_inicio', {}); }
    var c = e.target.closest('.campo'); if (c) c.classList.remove('is-erro');
    checar();
  });
  form.addEventListener('change', checar);
  form.querySelectorAll('input[type=text],input[type=tel]').forEach(function (el) {
    el.addEventListener('blur', function () { if (el.value && !el.checkValidity()) el.closest('.campo').classList.add('is-erro'); });
  });
  checar();
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { checar(); return; }
    var f = form.elements;
    var pedra = (form.querySelector('input[name=pedra]:checked') || {}).value || 'Ainda não sei';
    var peca = form.querySelector('input[name=peca]:checked').value;
    var linhas = [
      'Olá, vim pelo site da Design das Pedras e quero um orçamento.', '',
      '*Nome:* ' + f.nome.value.trim(),
      '*WhatsApp:* ' + f.whatsapp.value.trim(),
      '*Local da obra:* ' + f.local.value.trim(),
      '*Peça:* ' + peca,
      '*Pedra:* ' + pedra
    ];
    if (f.mensagem.value.trim()) linhas.push('*Observações:* ' + f.mensagem.value.trim());
    var url = 'https://wa.me/' + WHATS + '?text=' + encodeURIComponent(linhas.join('\n'));
    evento('form_envio', { peca: peca, pedra: pedra });
    enviar.disabled = true; enviar.textContent = 'Abrindo o WhatsApp...';
    try { sessionStorage.setItem('dp_wa', url); } catch (err) {}
    window.location.href = 'obrigado.html?wa=' + encodeURIComponent(url);
  });
})();
