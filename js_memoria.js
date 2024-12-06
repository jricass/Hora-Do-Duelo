const tabuleiro = document.querySelector('.tabuleiro');
const scoreDisplay = document.getElementById('score');
document.getElementById('startButton').addEventListener('click', iniciarJogo);

// Criando objetos de imagem
const imagens = [
  criarImagem('assets/carta1.jpg'),
  criarImagem('assets/carta2.jpg'),
  criarImagem('assets/carta3.jpg'),
  criarImagem('assets/carta4.jpg'),
  criarImagem('assets/carta5.jpg'),
  criarImagem('assets/carta6.jpg')
];

let cartas = [...imagens, ...imagens];
let cartasSelecionadas = [];
let cartasBloqueadas = true;
let score = 0;
let chances = 3;

cartas.sort(() => Math.random() - 0.5);

function iniciarJogo() {
  const cartasElementos = document.querySelectorAll('.carta');
  cartasElementos.forEach(carta => carta.classList.add('flip'));

  setTimeout(() => {
    cartasElementos.forEach(carta => carta.classList.remove('flip'));
    cartasBloqueadas = false;
  }, 2000);

  cartasBloqueadas = true;
  score = 0;
  chances = 3;
  atualizarPlacar();
}

cartas.forEach(imagem => {
  const carta = document.createElement('div');
  carta.classList.add('carta');
  carta.innerHTML = `
        <div class="carta-inner">
            <div class="frente">${imagem.outerHTML}</div>
            <div class="verso"></div>
        </div>
    `;
  tabuleiro.appendChild(carta);

  carta.addEventListener('click', () => {
    if (!carta.classList.contains('flip') && !cartasBloqueadas) {
      carta.classList.add('flip');
      cartasSelecionadas.push(carta);

      if (cartasSelecionadas.length === 2) {
        verificarPar();
      }
    }
  });
});

function verificarPar() {
  cartasBloqueadas = true;
  const [primeiraCarta, segundaCarta] = cartasSelecionadas;

  if (primeiraCarta.innerHTML === segundaCarta.innerHTML) {
    score += 3;
    resetarSelecao();
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove('flip');
      segundaCarta.classList.remove('flip');
      score -= 2;
      chances--;
      resetarSelecao();
    }, 1000);
  }
}

function resetarSelecao() {
  cartasSelecionadas = [];
  cartasBloqueadas = false;
  score = Math.max(0, score);
  atualizarPlacar();

  if (chances === 0 || document.querySelectorAll('.carta:not(.flip)').length === 0) {
    setTimeout(() => alert(chances === 0 ? 'Tu Perdeu Meu Fi!' : 'Egua tu ganhou!!!'), 500);
    setTimeout(() => location.reload(), 1000);
  }
}

function atualizarPlacar() {
  scoreDisplay.textContent = `Pontos: ${score} | Vidas: ${chances}`;
}

function criarImagem(src) {
  const imagem = new Image();
  imagem.src = src;
  return imagem;
}
