/* Documentação: comportamento e interações da página. */

(() => {
  const carousel = document.querySelector("[data-testimonial-carousel]");
  if (!carousel) return;
  const track = carousel.querySelector("#testimonialTrack");
  const slides = Array.from(track.children);
  const prev = carousel.querySelector("#testimonialPrev");
  const next = carousel.querySelector("#testimonialNext");
  const position = carousel.querySelector("#testimonialPosition");
  let index = 0;
  const visibleCount = () =>
    window.matchMedia("(max-width: 575.98px)").matches
      ? 1
      : window.matchMedia("(max-width: 991.98px)").matches
        ? 2
        : 4;
  const maxIndex = () => Math.max(0, slides.length - visibleCount());
  function render() {
    index = Math.min(index, maxIndex());
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    prev.disabled = index === 0;
    next.disabled = index >= maxIndex();
    position.textContent = `${index + 1}–${Math.min(index + visibleCount(), slides.length)} / ${slides.length}`;
  }
  prev.addEventListener("click", () => {
    index = Math.max(0, index - 1);
    render();
  });
  next.addEventListener("click", () => {
    index = Math.min(maxIndex(), index + 1);
    render();
  });
  window.addEventListener("resize", render, { passive: true });
  carousel
    .querySelector("#testimonialViewport")
    .addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        index = Math.max(0, index - 1);
        render();
      }
      if (event.key === "ArrowRight") {
        index = Math.min(maxIndex(), index + 1);
        render();
      }
    });
  render();
})();
