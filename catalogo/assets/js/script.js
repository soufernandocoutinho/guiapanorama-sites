/* Documentação: comportamento e integrações específicas desta página. */
(() => {
  "use strict";

  const whatsappNumber = "5518991938657";
  const generalMessage =
    "Olá! Conheci a Guia Panorama Digital e gostaria de receber informações sobre os planos disponíveis para minha empresa.";
  const plans = [
    {
      id: 1,
      name: "E-commerce",
      group: "Vendas online",
      priceCents: 39790,
      oldPriceCents: 49700,
      recommended: true,
      description:
        "Comece a vender pela internet com uma loja para apresentar produtos, receber pedidos e oferecer opções de pagamento.",
      limits: ["Até 1.000 produtos", "Até 500 vendas/mês"],
      features: [
        "Até 1.000 produtos",
        "Até 500 vendas por mês",
        "Mercado Pago, PagSeguro e Cielo*",
        "Cartão e boleto conforme configuração",
        "Cupons de desconto",
        "Departamentos e marcas ilimitados",
        "Blog, banners e personalização",
        "WhatsApp e chat online",
      ],
    },
    {
      id: 2,
      name: "E-commerce Plus",
      group: "Vendas online",
      priceCents: 74990,
      oldPriceCents: 89700,
      description:
        "Mais capacidade para ampliar o catálogo e o volume de pedidos da sua loja virtual.",
      limits: ["Até 2.000 produtos", "Até 1.000 vendas/mês"],
      features: [
        "Até 2.000 produtos",
        "Até 1.000 vendas por mês",
        "Recursos de pagamento do plano E-commerce*",
        "Cartão e boleto conforme configuração",
        "Cupons de desconto",
        "Departamentos e marcas ilimitados",
        "Blog, banners e personalização",
        "WhatsApp e chat online",
      ],
    },
    {
      id: 3,
      name: "E-commerce Ilimitado",
      group: "Vendas online",
      priceCents: 146990,
      oldPriceCents: 149700,
      description:
        "Liberdade para ampliar o catálogo e o volume de vendas da sua empresa.",
      limits: ["Produtos ilimitados", "Vendas ilimitadas"],
      features: [
        "Produtos ilimitados",
        "Vendas ilimitadas",
        "Recursos de pagamento do plano E-commerce*",
        "Cartão e boleto conforme configuração",
        "Cupons de desconto",
        "Departamentos e marcas ilimitados",
        "Blog, banners e personalização",
        "WhatsApp e chat online",
      ],
    },
    {
      id: 4,
      name: "E-commerce + ERP",
      group: "Vendas com ERP integrado",
      priceCents: 61990,
      oldPriceCents: 86700,
      description:
        "Loja virtual conectada à gestão comercial. Organize o estoque e integre a operação física e digital.",
      limits: ["Até 1.000 produtos", "Até 500 vendas/mês"],
      features: [
        "Até 1.000 produtos e 500 vendas/mês",
        "Recursos de e-commerce correspondentes ao plano*",
        "ERP Digisat G6 Administrador Comercial",
        "Integração de estoque físico e digital",
        "Integração com Mercado Pago e Shopee*",
        "Emissão de notas fiscais*",
        "Gestão comercial pelo ERP",
      ],
    },
    {
      id: 5,
      name: "E-commerce Plus + ERP",
      group: "Vendas com ERP integrado",
      priceCents: 109990,
      oldPriceCents: 126700,
      description:
        "Mais capacidade de vendas e uma operação comercial integrada para empresas em expansão.",
      limits: ["Até 2.000 produtos", "Até 1.000 vendas/mês"],
      features: [
        "Até 2.000 produtos e 1.000 vendas/mês",
        "Recursos de e-commerce correspondentes ao plano*",
        "ERP Digisat G6 Administrador Comercial",
        "Integração de estoque físico e digital",
        "Integração com Mercado Pago e Shopee*",
        "Emissão de notas fiscais*",
      ],
    },
    {
      id: 6,
      name: "E-commerce Ilimitado + ERP",
      group: "Vendas com ERP integrado",
      priceCents: 168990,
      oldPriceCents: 186700,
      description:
        "Uma operação digital de grande capacidade conectada à gestão comercial.",
      limits: ["Produtos ilimitados", "Vendas ilimitadas"],
      features: [
        "Produtos e vendas ilimitados",
        "Recursos de e-commerce correspondentes ao plano*",
        "ERP Digisat G6 Administrador Comercial",
        "Integração de estoque físico e digital",
        "Integração com Mercado Pago e Shopee*",
        "Emissão de notas fiscais*",
      ],
    },
  ];

  const currency = (cents) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  const moneyNumber = (cents) =>
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(cents / 100);
  const annualCents = (monthlyCents) => Math.round(monthlyCents * 12 * 0.85);
  const savingCents = (monthlyCents) =>
    monthlyCents * 12 - annualCents(monthlyCents);
  let billing = "monthly";

  // Monta a mensagem de contato associada ao plano selecionado.

  function planMessage(planName) {
    return `Olá! Tenho interesse no plano ${planName} da Guia Panorama Digital. Gostaria de receber mais informações sobre contratação e implantação.`;
  }

  // Gera a apresentação visual de um plano e suas condições.

  function planCard(plan) {
    const annual = annualCents(plan.priceCents);
    const priceMarkup =
      billing === "monthly"
        ? `<div class="price-old"><del>${currency(plan.oldPriceCents)}</del></div><div class="price-main"><span class="price-currency">R$</span><span class="price-value">${moneyNumber(plan.priceCents)}</span></div><div class="price-period">por mês</div>`
        : `<div class="price-main"><span class="price-currency">R$</span><span class="price-value">${moneyNumber(annual)}</span></div><div class="price-period">total anual antecipado</div><div class="annual-equivalent">Equivale a ${currency(Math.round(annual / 12))} por mês*</div><div class="annual-saving">Economia de ${currency(savingCents(plan.priceCents))} no ano</div>`;
    const li = plan.features.map((feature) => `<li>${feature}</li>`).join("");
    const chips = plan.limits
      .map((limit) => `<span class="limit-chip">${limit}</span>`)
      .join("");
    const label = `Tenho interesse no plano ${plan.name} da Guia Panorama Digital. Gostaria de receber mais informações sobre contratação e implantação.`;
    const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! ${label}`)}`;
    return `<div class="col-12 col-md-6 col-lg-4 plan-col"><article class="plan-card${plan.recommended ? " recommended" : ""}" data-plan="${plan.id}">${plan.recommended ? '<span class="plan-ribbon">Recomendado para começar</span>' : ""}<span class="plan-type">${plan.group}</span><h4>${plan.name}</h4><p class="plan-description">${plan.description}</p><div class="plan-limits">${chips}</div><div class="price-area" aria-live="polite">${priceMarkup}</div><ul class="plan-features">${li}</ul><a class="btn btn-outline-primary plan-cta" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="Consultar sobre o plano ${plan.name} pelo WhatsApp">Quero este plano <span aria-hidden="true">→</span></a></article></div>`;
  }

  // Renderiza no documento a lista de planos disponíveis.

  function renderPlans() {
    const containers = {
      "Vendas online": document.getElementById("ecommercePlans"),
      "Vendas com ERP integrado": document.getElementById("erpPlans"),
    };
    plans.forEach((plan) => {
      const container = containers[plan.group];
      if (container) container.insertAdjacentHTML("beforeend", planCard(plan));
    });
  }

  // Atualiza os preços exibidos conforme a modalidade de cobrança.

  function updateBilling(nextBilling) {
    if (billing === nextBilling) return;
    billing = nextBilling;
    document.querySelectorAll("[data-billing]").forEach((button) => {
      const active = button.dataset.billing === billing;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const note = document.getElementById("billingNote");
    if (note) {
      note.textContent =
        billing === "annual"
          ? "Pagamento antecipado por Pix ou boleto. Desconto de 15% sobre 12 mensalidades. O equivalente mensal é apenas uma referência, não uma cobrança mensal."
          : "Cobrança recorrente mensal no cartão de crédito. Compromisso mínimo de 12 meses, conforme contrato.";
    }
    ["ecommercePlans", "erpPlans"]
      .map((id) => document.getElementById(id))
      .forEach((container) => {
        if (container) container.innerHTML = "";
      });
    renderPlans();
  }

  renderPlans();
  document
    .querySelectorAll("[data-billing]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        updateBilling(button.dataset.billing),
      ),
    );

  // Fecha o menu móvel após a escolha de um destino de navegação.
  document.querySelectorAll("#menuPrincipal .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("menuPrincipal");
      if (menu && menu.classList.contains("show") && window.bootstrap)
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });

  const year = document.getElementById("currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
})();
