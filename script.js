let jogador = "x";

function render() {
    const resultDiv = document.getElementById("result");
    
    if (verificarVencedor("x")) {
        resultDiv.textContent = "Jogador X venceu!";
        desativarCliques();
    } else if (verificarVencedor("o")) {
        resultDiv.textContent = "Jogador O venceu!";
        desativarCliques();
    } else if (tabuleiroCompleto()) {
        resultDiv.textContent = "Empate!";
    }
}

function play(cell) {
    if (cell.innerHTML === "") {
        cell.innerHTML = jogador;
        render();
    } else {
        return;
    }

    jogador = (jogador === "x") ? "o" : "x";
}

function verificarVencedor(jogadorAtual) {
    const tabuleiro = document.querySelectorAll(".square");
    for (let i = 0; i < 3; i++) {
        if (
            (tabuleiro[i * 3].innerHTML === jogadorAtual &&
                tabuleiro[i * 3 + 1].innerHTML === jogadorAtual &&
                tabuleiro[i * 3 + 2].innerHTML === jogadorAtual) ||
            (tabuleiro[i].innerHTML === jogadorAtual &&
                tabuleiro[i + 3].innerHTML === jogadorAtual &&
                tabuleiro[i + 6].innerHTML === jogadorAtual)
        ) {
            return true;
        }
    }

    // Verificar diagonais
    if (
        (tabuleiro[0].innerHTML === jogadorAtual &&
            tabuleiro[4].innerHTML === jogadorAtual &&
            tabuleiro[8].innerHTML === jogadorAtual) ||
        (tabuleiro[2].innerHTML === jogadorAtual &&
            tabuleiro[4].innerHTML === jogadorAtual &&
            tabuleiro[6].innerHTML === jogadorAtual)
    ) {
        return true;
    }

    return false;
}



function tabuleiroCompleto() {
    const tabuleiro = document.querySelectorAll(".square");
    for (const cell of tabuleiro) {
        if (cell.innerHTML === "") {
            return false;
        }
    }
    return true;
}

function desativarCliques() {
    const tabuleiro = document.querySelectorAll(".square");
    for (const cell of tabuleiro) {
        cell.onclick = null; // Desativa a função de clique
    }
}
