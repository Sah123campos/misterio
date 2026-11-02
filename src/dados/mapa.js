// ============================================================================
// MAPA — NOITE DE ESTREIA (tapete vermelho). Coordenadas em METROS.
// x = leste, z = sul (o "norte" fica em cima na tela). O tema fica escondido
// no letreiro coberto em cima do cinema, até o bebê João falar o nome.
// ============================================================================
import { PX_POR_METRO } from "../config.js";

export const LIMITES = { x0: -56, x1: 56, z0: -48, z1: 48 };
export const LARGURA_PX = (LIMITES.x1 - LIMITES.x0) * PX_POR_METRO;
export const ALTURA_PX = (LIMITES.z1 - LIMITES.z0) * PX_POR_METRO;
export const px = (x) => Math.round((x - LIMITES.x0) * PX_POR_METRO);
export const py = (z) => Math.round((z - LIMITES.z0) * PX_POR_METRO);
export const m = (v) => v * PX_POR_METRO;

export const MAPA = {
  inicio: { x: 0, z: 36.5, dir: "cima" },
  portao: { x: 0, z: 39 }, // entrada da festa (a van para na avenida logo abaixo)
  cinema: { x: 0, z: -24, w: 64 },
  letreiro: { x: 0, z: -38, espaco: 6.2 }, // 9 formas cobertas em cima do cinema
  tapete: { x: 0, z0: -23, z1: 44, larg: 6 },
  chafariz: { x: -30, z: -8, r: 5 },
  palco: { x: 30, z: -10, w: 14, d: 6 },
  fotos: { x: -17, z: 6 },
  camarim: { x: 17, z: 6 },
  pipoca: { x: -33, z: 22 },
  bilheteria: { x: 24, z: 24 },
  estacionamento: { x: 38, z: 37 },
  biblia: { x: 46, z: 12 },

  // posições das pessoas neste mapa (sobrepõem o "local" do cadastro)
  posicoes: {
    davi_dicaprio: { x: -30, z: -1.6 }, taylor_frisso: { x: 26, z: -4 }, thais_grande: { x: -33, z: 27 },
    samuel_pitt: { x: 4, z: 10 }, joao: { x: -30, z: 29 },
    renan: { x: -22, z: -6 }, jaque: { x: -23.6, z: -5.2 }, nathaly: { x: -14, z: 12 }, gaby: { x: -12.4, z: 12.8 },
    izabelle: { x: 14, z: 12 }, lara: { x: 20, z: 13 }, mj: { x: 10, z: -16 }, brayan: { x: -8, z: 20 }, kenedy: { x: 9, z: 26 },
    thama: { x: -27, z: 22 }, debora: { x: -39, z: 22 }, douglas: { x: 36, z: 2 }, julio: { x: 38.5, z: 3 }, vinicius: { x: 37, z: 5.5 },
    pedro: { x: 30, z: -6.8 }, almerao: { x: -6, z: 4 }, mylena: { x: 20, z: 30 }, dener: { x: 21.6, z: 30.8 },
  },
  patrulhas: {
    samuel_pitt: [[5, 10], [5, -14], [-5, -14], [-5, 10]],
    brayan: [[-8, 20], [-8, 34], [-14, 34], [-14, 20]],
    almerao: [[-6, 4], [-6, -16], [6, -18], [8, 16], [-6, 30]],
  },
  pontos: {
    inicio: { x: 0, z: 36 }, cinema: { x: 0, z: -21 }, chafariz: { x: -30, z: 0 }, palco: { x: 30, z: -4 },
    fotos: { x: -17, z: 10 }, pipoca: { x: -33, z: 27 }, banco_lago: { x: -30, z: -1.6 }, piscina_borda: { x: 26, z: -4 }, cozinha: { x: -33, z: 27 },
  },
  rotulos: [
    ["cinema", "Cinema"], ["chafariz", "Chafariz"], ["palco", "Palco"], ["fotos", "Parede de fotos"], ["camarim", "Camarim"],
    ["pipoca", "Pipoca e comidas"], ["bilheteria", "Bilheteria"], ["estacionamento", "Limusines"], ["portao", "Entrada"],
  ],

  arvores: [
    ...[-10, 10].flatMap((x) => [-14, -2, 10, 22, 34].map((z) => ({ tipo: "palmeira", x, z, s: 0.75 }))),
    ...Array.from({ length: 10 }, (_, i) => ({ tipo: "copa", x: -52 + (i % 2) * 3, z: -40 + i * 9, s: 0.8 })),
    ...Array.from({ length: 10 }, (_, i) => ({ tipo: "copa", x: 51 + (i % 2) * 3, z: -40 + i * 9, s: 0.8 })),
    { tipo: "arbusto", x: -44, z: 6, s: 1 }, { tipo: "arbusto", x: 44, z: 30, s: 1 }, { tipo: "arbusto", x: -44, z: 36, s: 1 },
  ],

  interativos: [
    { id: "letreiro", x: 0, z: -21.5, r: 5, rotulo: "Olhar o letreiro coberto", acao: "letreiro" },
    { id: "espelho", x: 17, z: 8.6, r: 2.8, rotulo: "Abrir o camarim", acao: "camarim" },
    { id: "fotos", x: -17, z: 8.6, r: 3.2, rotulo: "Posar na parede de fotos", acao: "foto", texto: "FLASH! FLASH! Os fotógrafos gritam seu nome. Você faz sua melhor pose… e alguém pergunta de que filme você é." },
    { id: "chafariz", x: -30, z: -1, r: 4, rotulo: "Jogar uma moeda no chafariz", texto: "Plim! A moedinha brilha no fundo do chafariz. Dizem que quem joga uma moeda aqui volta pra próxima estreia." },
    { id: "pipoca", x: -33, z: 19.6, r: 3.4, rotulo: "Pegar pipoca", texto: "Pipoca quentinha, doce e salgada, num balde listrado. Tem tanta pipoca que daria pra uma sessão inteira…" },
    { id: "bilheteria", x: 24, z: 26.6, r: 3, rotulo: "Falar com a bilheteria", texto: "O ingresso diz: \"Sessão de estreia — Filme: ???\". O nome do filme foi raspado com caneta. Que mistério!" },
    { id: "bateria", x: 28, z: -11, r: 2.4, rotulo: "Tocar a bateria", acao: "musica", texto: "TU-DUM-TSSS! A plateia do tapete vermelho aplaude a virada na bateria." },
    { id: "microfone", x: 31.5, z: -7.6, r: 1.8, rotulo: "Falar no microfone", texto: "\"Alô, alô, estrelas!\" Sua voz ecoa pela festa e todo mundo acena pra você." },
    { id: "limusine", x: 38, z: 33, r: 4, rotulo: "Olhar as limusines", texto: "Limusines pretas brilhando. Um motorista de luvas brancas pisca o olho: \"Hoje a noite é de vocês\"." },
    { id: "biblia", x: 46, z: 13.2, r: 2.4, rotulo: "Ler a Bíblia", texto: "A Bíblia está aberta em Jeremias 29:11: “Porque eu bem sei os planos que tenho para vocês, diz o Senhor; planos de paz e não de mal, para dar a vocês esperança e um futuro.”" },
  ],
};

export function ponto(nome) {
  const p = MAPA.pontos[nome];
  return p ? { x: px(p.x), y: py(p.z) } : null;
}
