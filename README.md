# ♻️ Desafio da Reciclagem — Jogo Educativo de Coleta Seletiva

Um jogo educativo interativo e moderno desenvolvido para ensinar a separação correta de resíduos, promovendo a conscientização ambiental, descarte sustentável e preservação do planeta.

---

## 🎮 Como Jogar

1. **Abra o Jogo**:
   - Basta dar um duplo clique no arquivo [`index.html`](file:///c:/Users/Pedro/Documents/jogo-reciclagem/index.html) para abrir diretamente no seu navegador favorito (Google Chrome, Microsoft Edge, Firefox, Safari, etc.).
   - Não requer instalação, Node.js ou servidores externos. Funciona 100% offline e sem necessidade de conexão!

2. **Mecânica Principal Ágil**:
   - Um resíduo/objeto aparece no centro da tela (ex: 🥫 Lata de refrigerante, 🍌 Casca de banana, 🥤 Garrafa PET).
   - **Dois modos de jogar**:
     - **Toque direto**: Basta tocar na lixeira correta para descartar o resíduo imediatamente!
     - **Arrastar e Soltar**: Arraste o resíduo até a lixeira desejada e solte.
   - **Acertou**:
     - O resíduo **desaparece suavemente dentro da lixeira** com animação e efeito sonoro de sucesso!
     - Você ganha **+10 pontos** e confetes!
     - Um aviso educativo rápido com a dica do material aparece no topo.
     - **O próximo resíduo surge instantaneamente na tela** com animação suave para continuar o jogo!
   - **Errou**:
     - O resíduo treme (*shake*), você perde **-5 pontos** e pode tentar novamente.

---

## 🆙 Sistema de Níveis e Progressão de Dificuldade

Ao acertar todos os resíduos de uma etapa, o **nível aumenta automaticamente**:

- 🟢 **Nível 1 — Fácil**: Itens clássicos do dia a dia (Banana, Papel, Garrafa PET, Lata de refrigerante, Garrafa de vidro, Maçã). Ideal para aquecer e memorizar as cores!
- 🟡 **Nível 2 — Médio**: Materiais que geram mais dúvidas (Caixas de leite longa vida Tetra Pak, Caixas de papelão, Caixas de suco, Jornal, Xampu, Latas de conserva) e primeiros itens de rejeitos (Papel higiênico, Esponja de louça).
- 🔴 **Nível 3 — Desafio Rápido**: Materiais complexos e desafiadores (Marmita de isopor, Bituca de cigarro, Sacola plástica, Pote de vidro, Borra de café, Fita adesiva, Tampinha metálica, Perfume) com **cronômetro de 60 segundos**!
- 🏆 **Tela de Resultados**: Exibe a pontuação final, total de acertos, erros, taxa de precisão (%) e o título ecológico alcançado (ex: *Mestre Supremo da Sustentabilidade*).

---

## 🗑️ As 6 Lixeiras Oficiais (Resolução CONAMA 275)

| Ícone | Lixeira | Cor Oficial | Exemplos de Resíduos |
| :---: | :---: | :---: | :--- |
| 🟤 | **Orgânico** | Marrom | Casca de banana, maçã, restos de refeições, borra de café |
| 🔵 | **Papel** | Azul | Folhas sulfite, caixas de papelão, jornais, caixas Tetra Pak |
| 🔴 | **Plástico** | Vermelho | Garrafas PET, embalagens de xampu, isopor limpo, sacolas |
| 🟡 | **Metal** | Amarelo | Latinhas de refrigerante, latas de milho/conserva, tampinhas |
| 🟢 | **Vidro** | Verde | Garrafas de vidro, potes de conserva/geleia, frascos de perfume |
| ⚫ | **Rejeitos** | Preto / Cinza | Papel higiênico usado, esponjas de cozinha, fita adesiva, bitucas de cigarro |

---

## 📱 Totalmente Otimizado para Celulares e Computadores

- **Sem Rolagem**: Enquadramento automático em `100dvh` para que todas as 6 lixeiras e o resíduo fiquem sempre visíveis na tela.
- **Grade 3x2 no Celular**: Lixeiras em alcance ergonômico para os polegares.
- **Zero Latência**: Efeitos sonoros sintetizados via Web Audio API nativo.
