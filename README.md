# Mistério no Tapete Vermelho

RPG em pixel art (mesmo motor do *Estrelas da Chácara*): você chega de van a uma festa de gala
com tapete vermelho, cria o personagem com o seu rosto no camarim e conversa com todo mundo
para descobrir o **tema secreto**. Com as 4 pistas, vá até o letreiro coberto do cinema: o
**bebê João** aparece e fala o nome — HOLLYWOOD.

Jogue em: https://sah123campos.github.io/misterio/

## Onde editar
| O quê | Arquivo |
|---|---|
| Mapa, posições das pessoas e objetos interativos | `src/dados/mapa.js` |
| Cenário (desenho do tapete, cinema, chafariz…) | `src/arte/cenario.js` |
| Pessoas e falas | `src/dados/npcs.js` e `src/dados/npcsExtras.js` |
| Camarim | `src/dados/guardaroupa.js` |

Quem jogou: o nome vai para o mesmo Formulário Google dos outros jogos, com a situação
"Mistério: Entrou" / "Mistério: Finalizou". Contador de acessos: `src/contador.js`.

Rodar local: `python3 -m http.server 8080`. Arquivo único: `npm install && python3 build-artifact.py`.
