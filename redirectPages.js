const handleMenuClick = (e) => {
  const url = e.currentTarget.getAttribute('data-url');
  if (url) {
    window.location.href = url;
  }
};

const screenView = () => {
  document.querySelectorAll('.menu-item').forEach(item => {
    // Remove sempre o antigo
    item.removeEventListener('click', handleMenuClick);
  });

  if (window.innerWidth < 870) {
    // Adiciona somente se for menor que 870
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', handleMenuClick);
    });
  }
};

// Chama ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  screenView();
});

//atualiza dinamicamente se redimensionar a tela
window.addEventListener('resize', screenView);
