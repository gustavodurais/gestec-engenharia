const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 3,
    },
    420: {
      slidesPerView: 4,
    }
  }
});


function handleResize() {
    const btn = document.querySelector('.content_btn_contact');
    const header = document.querySelector('.header');
    const navigator = document.querySelector('.navigator');

    // Verifica se o botão existe
    if (!btn) return;

    // Se a largura da tela for maior que 870px, move o botão para o header
    if (window.innerWidth > 870) {
        // Verifica se o botão está na navegação, se sim, move para o header
        if (navigator.contains(btn)) {
            navigator.removeChild(btn);
            header.appendChild(btn);
        }
    } else {
        // Se a largura da tela for menor ou igual a 870px, move o botão para dentro da navegação
        if (header.contains(btn)) {
            header.removeChild(btn);
            navigator.appendChild(btn);
        }
    }
}

// Executa a função no carregamento da página
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(handleResize, 100); // Adiciona um pequeno delay para garantir que o DOM foi totalmente carregado
});

// Executa a função sempre que a janela for redimensionada
window.addEventListener('resize', handleResize);



const hamburger = document.getElementById('hamburger');
const navigator = document.getElementById('navigator');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlayBlur');

    hamburger.addEventListener('click', () => {
      navigator.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      navigator.classList.remove('active');
    });


// Também fecha o menu se clicar no fundo
overlay.addEventListener('click', () => {
    navigator.classList.remove('active');
    overlay.style.display = 'none';
  });





