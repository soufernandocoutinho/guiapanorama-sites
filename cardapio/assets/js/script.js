/* Documentação: comportamento e integrações específicas desta página. */
(() => {
  "use strict";

  const phoneNumber = "5518991938657";
  const billingButtons = document.querySelectorAll("[data-period]");
  const priceValues = document.querySelectorAll(".plan-price-value");
  const annualTotals = document.querySelectorAll(".annual-total");
  const periodLabels = document.querySelectorAll(".price-period");
  const billingNote = document.getElementById("billing-note");
  const planButtons = document.querySelectorAll(".plan-cta");

  const formatMessage = (plan, period) => {
    if (period === "annual") {
      return `Olá! Tenho interesse no plano ${plan}, na modalidade anual à vista com 15% de desconto via Pix ou boleto. Gostaria de receber mais informações.`;
    }
    return `Olá! Tenho interesse no plano ${plan}, na modalidade mensal com cobrança recorrente no cartão de crédito. Gostaria de receber mais informações.`;
  };

  // Alterna a periodicidade e sincroniza preços, rótulos e links de contato.

  function setBillingPeriod(period) {
    const isAnnual = period === "annual";

    billingButtons.forEach((button) => {
      const active = button.dataset.period === period;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    priceValues.forEach((price) => {
      const value = isAnnual ? price.dataset.annual : price.dataset.monthly;
      price.textContent = `R$ ${value}`;
    });

    periodLabels.forEach((label) => {
      label.textContent = isAnnual ? "/ mês equivalente" : "/ mês";
    });

    annualTotals.forEach((total) => {
      total.classList.toggle("d-none", !isAnnual);
    });

    billingNote.textContent = isAnnual
      ? "Valor anual com 15% de desconto para pagamento à vista via Pix ou boleto."
      : "Cobrança mensal recorrente no cartão de crédito.";

    planButtons.forEach((button) => {
      const plan = button.dataset.plan;
      const message = formatMessage(plan, period);
      button.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      button.setAttribute("aria-label", `Solicitar ${plan} na modalidade ${isAnnual ? "anual à vista" : "mensal"}`);
    });
  }

  billingButtons.forEach((button) => {
    button.addEventListener("click", () => setBillingPeriod(button.dataset.period));
  });

  // Fecha o menu mobile após a escolha de uma seção.
  const nav = document.getElementById("mainNav");
  if (nav && window.bootstrap) {
    nav.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 991.98px)").matches) {
          const instance = bootstrap.Collapse.getInstance(nav);
          if (instance) instance.hide();
        }
      });
    });
  }

  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // Evento preparado para mensuração futura; só é emitido se houver dataLayer configurado.
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: "whatsapp_click",
          destination: "guia_panorama",
          link_text: (link.textContent || "").trim()
        });
      }
    });
  });
})();
