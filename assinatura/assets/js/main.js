/* Documentação: comportamento e integrações específicas desta página. */
// Inicialização/interação global da página.
document.addEventListener("DOMContentLoaded", function () {
  const billingButtons = document.querySelectorAll("[data-billing]");
  const billingDescription = document.getElementById("billingDescription");
  const money = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  // Atualiza os valores exibidos para a modalidade de assinatura selecionada.
  function setBilling(mode) {
    billingButtons.forEach((button) => {
      const active = button.dataset.billing === mode;
      button.classList.toggle("btn-primary", active);
      button.classList.toggle("btn-outline-primary", !active);
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".subscription-price").forEach((price) => {
      const monthly = Number(price.dataset.monthly.replace(",", "."));
      const total = monthly * 12 * 0.85,
        equivalent = total / 12;
      price.innerHTML =
        mode === "annual"
          ? `${money(equivalent)}<span class="fs-6 fw-semibold">/mês</span><span class="price-detail">${money(total)} à vista por ano</span>`
          : `${money(monthly)}<span class="fs-6 fw-semibold">/mês</span><span class="price-detail">Cartão recorrente · 12 meses</span>`;
    });
    if (billingDescription)
      billingDescription.textContent =
        mode === "annual"
          ? "Pagamento antecipado via Pix ou boleto, com 15% de desconto no total de 12 meses."
          : "Cartão de crédito recorrente por 12 meses, com renovação automática.";
  }
  billingButtons.forEach((button) =>
    button.addEventListener("click", () => setBilling(button.dataset.billing)),
  );
  setBilling("monthly");
  const year = document.getElementById("anoAtual");
  if (year) year.textContent = new Date().getFullYear();
  document
    .querySelectorAll("#menuPrincipal .nav-link")
    .forEach(function (link) {
      link.addEventListener("click", function () {
        const menu = document.getElementById("menuPrincipal");
        if (menu && menu.classList.contains("show") && window.bootstrap) {
          window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });
});
