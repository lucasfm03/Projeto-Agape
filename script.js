// Rolagem suave entre seções
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Botão 'Ver portfólio' no hero
const verPortfolioBtn = document.querySelector('.hero-text button');
if (verPortfolioBtn) {
  verPortfolioBtn.addEventListener('click', (e) => {
    const portfolio = document.getElementById('portfolio');
    if (portfolio) portfolio.scrollIntoView({ behavior: 'smooth' });
  });
}

// LIGHTBOX: abrir imagem ampliada em modal
(() => {
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox ? lightbox.querySelector('img') : null;

  if (!lightbox || !lbImg) return;

  // selecionar imagens que devem abrir no lightbox
  const images = document.querySelectorAll('.galeria img, .sobre img');
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt || 'Imagem ampliada';
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      // evitar scroll de fundo
      document.body.style.overflow = 'hidden';
      // foco para fechar com ESC
      lightbox.focus && lightbox.focus();
    });
  });

  // fechar ao clicar no overlay (fora do conteúdo)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // evitar que clique na imagem feche o lightbox
  const content = lightbox.querySelector('.lightbox-content');
  if (content) content.addEventListener('click', (e) => e.stopPropagation());

  // fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }
})();
