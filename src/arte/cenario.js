// Cenário "Noite de Estreia": praça à noite com tapete vermelho, cinema, letreiro coberto,
// cordões de veludo, Calçada da Fama, chafariz, parede de fotos, palco, pipoca e limusines.
// Mesma interface do cenário da chácara (chão, colisões e objetos ordenados por profundidade).
import { Pixmap, rgb, misturar, escurecer, clarear, hash, fbm, bayer, criarCanvas } from "./pixel.js";
import * as O from "./objetos.js";
import { MAPA, LARGURA_PX, ALTURA_PX, px, py, m } from "../dados/mapa.js";
import { TEMA } from "../config.js";

export const CEL = 4;
const pronto = (pm, ox, oy, col = null, cont = true) => { if (cont) pm.contorno(0.55); return { img: pm.paraCanvas(), ox, oy, col, w: pm.w, h: pm.h }; };
const R = (pm, x0, y0, w, h, c) => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) pm.set(x, y, typeof c === "function" ? c(x, y) : c); };

// ---------- objetos próprios da estreia ----------
function fachadaCinema(W) {
  const H = 96;
  const pm = new Pixmap(W, H);
  R(pm, 0, 30, W, H - 30, (x, y) => (y > H - 6 ? "#2a1a2a" : x % 24 < 2 ? "#5a2a3a" : (y % 8 === 0 ? "#6a2a3a" : "#7a2a3e")));
  R(pm, 0, 22, W, 8, (x) => (x % 6 < 3 ? "#e2b13c" : "#fff3a0")); // lâmpadas
  R(pm, 0, 18, W, 4, "#3a1a2a");
  const mx = (W >> 1) - 70;
  R(pm, mx, 34, 140, 22, "#16101e"); R(pm, mx + 2, 36, 136, 18, "#2a1e38"); // marquise
  for (let k = 0; k < 15; k++) R(pm, mx + 6 + k * 9, 42, 5, 6, k % 2 ? "#ffd84a" : "#f4f2ea"); // "?????"
  R(pm, (W >> 1) - 24, H - 34, 48, 30, "#1a0e14"); // portas
  R(pm, (W >> 1) - 22, H - 32, 20, 28, "#e2b13c"); R(pm, (W >> 1) + 2, H - 32, 20, 28, "#e2b13c");
  R(pm, (W >> 1) - 20, H - 30, 16, 24, "#7a1a2a"); R(pm, (W >> 1) + 4, H - 30, 16, 24, "#7a1a2a");
  for (const x of [30, W - 60]) { R(pm, x, 62, 30, 26, "#f4f2ea"); R(pm, x + 2, 64, 26, 22, "#2a1e38"); R(pm, x + 8, 70, 14, 10, "#ffd84a"); } // cartazes
  return pronto(pm, W >> 1, H - 1, { x: -(W >> 1), y: -20, w: W, h: 20 });
}

function pedestalCorda(comp) {
  const pm = new Pixmap(6, comp + 14);
  for (let y = 0; y <= comp; y += 24) { R(pm, 1, y, 4, 4, "#ffe08a"); R(pm, 2, y + 4, 2, 9, "#c9a14a"); R(pm, 0, y + 12, 6, 2, "#8a6a2a"); }
  for (let y = 4; y < comp; y++) pm.set(3, y, (y % 24) < 3 ? null : "#b0121f");
  return pronto(pm, 3, comp + 13, { x: -2, y: -comp, w: 4, h: comp });
}

function paredeFotos() {
  const W = 96, H = 46;
  const pm = new Pixmap(W, H);
  R(pm, 0, 0, W, H - 8, (x, y) => ((Math.floor(x / 12) + Math.floor(y / 10)) % 2 ? "#f4f2ea" : "#1e1836"));
  for (let y = 4; y < H - 10; y += 10) for (let x = 6; x < W; x += 24) { pm.set(x, y + 2, "#ffd84a"); pm.set(x - 1, y + 3, "#ffd84a"); pm.set(x + 1, y + 3, "#ffd84a"); pm.set(x, y + 4, "#ffd84a"); }
  for (const x of [2, W - 4]) R(pm, x, H - 8, 2, 8, "#3a3a44");
  return pronto(pm, W >> 1, H - 1, { x: -46, y: -4, w: 92, h: 4 });
}

function cameraTripe() {
  const pm = new Pixmap(14, 30);
  R(pm, 2, 2, 10, 7, "#16161a"); R(pm, 10, 4, 4, 3, "#3a3a44"); pm.set(4, 3, "#d0202e");
  R(pm, 5, 0, 4, 2, "#f4f4f0"); // flash
  for (let y = 9; y < 29; y++) { pm.set(7, y, "#5a5a64"); if (y > 18) { pm.set(7 - (y - 18) * 0.5, y, "#5a5a64"); pm.set(7 + (y - 18) * 0.5, y, "#5a5a64"); } }
  return pronto(pm, 7, 29, { x: -4, y: -3, w: 8, h: 3 });
}

function limusine() {
  const W = 92, H = 22;
  const pm = new Pixmap(W, H);
  R(pm, 2, 9, W - 4, 8, (x, y) => (y === 9 ? "#3a3a44" : "#121216"));
  R(pm, 10, 4, W - 26, 6, "#16161a");
  for (let k = 0; k < 6; k++) R(pm, 14 + k * 11, 5, 8, 4, "#3a4a6a");
  R(pm, 2, 12, W - 4, 1, "#c8c8d0"); pm.set(W - 3, 11, "#fff3a0");
  for (const cx of [14, W - 16]) for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) { const d = Math.hypot(x, y); if (d <= 4.2) pm.set(cx + x, 17 + y, d > 2.4 ? "#0a0a0e" : "#c8c8d0"); }
  return pronto(pm, W >> 1, H - 1, { x: -44, y: -6, w: 88, h: 6 });
}

function holofote() {
  const pm = new Pixmap(18, 22);
  R(pm, 3, 12, 12, 8, "#3a3a44"); R(pm, 4, 2, 10, 10, "#5a5a64"); R(pm, 6, 3, 6, 6, "#fff3c4");
  R(pm, 1, 20, 16, 2, "#1a1a20");
  return pronto(pm, 9, 21, { x: -7, y: -4, w: 14, h: 4 });
}

function bilheteria() {
  const W = 40, H = 46;
  const pm = new Pixmap(W, H);
  R(pm, 0, 0, W, 10, (x) => (x % 8 < 4 ? "#b0121f" : "#f4f2ea"));
  R(pm, 2, 10, W - 4, H - 12, "#7a2a3e");
  R(pm, 8, 16, W - 16, 14, "#9ad4f0"); R(pm, 18, 30, 4, 3, "#1a0e14");
  R(pm, 6, 36, W - 12, 4, "#e2b13c");
  return pronto(pm, W >> 1, H - 1, { x: -18, y: -10, w: 36, h: 10 });
}

export class Cenario {
  constructor() {
    this.W = LARGURA_PX;
    this.H = ALTURA_PX;
    this.cw = Math.ceil(this.W / CEL);
    this.ch = Math.ceil(this.H / CEL);
    this.solido = new Uint8Array(this.cw * this.ch);
    this.piso = new Uint8Array(this.cw * this.ch);
    this.objetos = [];
    this.brilhos = [];
    this.animados = [];
    this.cestas = [];
    this.piscina = null;
    this.toboagua = null;
    this.pintar();
    this.montar();
  }

  marcarSolido(x, y, w, h, v = 1) {
    const x0 = Math.max(0, Math.floor(x / CEL)), y0 = Math.max(0, Math.floor(y / CEL));
    const x1 = Math.min(this.cw - 1, Math.floor((x + w - 1) / CEL)), y1 = Math.min(this.ch - 1, Math.floor((y + h - 1) / CEL));
    for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) this.solido[j * this.cw + i] = v;
  }
  solidoEm(x, y) {
    const i = Math.floor(x / CEL), j = Math.floor(y / CEL);
    if (i < 0 || j < 0 || i >= this.cw || j >= this.ch) return true;
    return this.solido[j * this.cw + i] === 1;
  }
  pisoEm(x, y) {
    return ["grama", "terra", "pedra", "madeira", "molhado"][this.piso[Math.floor(y / CEL) * this.cw + Math.floor(x / CEL)] || 0];
  }
  add(spr, x, y, extra = {}) {
    const o = { ...spr, x: Math.round(x), y: Math.round(y), ...extra };
    this.objetos.push(o);
    if (spr.col && !extra.semColisao) this.marcarSolido(o.x + spr.col.x, o.y + spr.col.y, spr.col.w, spr.col.h);
    return o;
  }
  sombra(x, y, rx, ry, f = 0.35) {
    const c = this.ctxChao;
    c.fillStyle = `rgba(5,2,12,${f})`;
    c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); c.fill();
  }

  pintar() {
    const W = this.W, H = this.H;
    const canvas = criarCanvas(W, H);
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(W, H);
    const d = img.data;
    const set = (x, y, c) => { const i = (y * W + x) * 4; d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255; };
    const t = MAPA.tapete;
    const cx0 = px(-t.larg / 2), cx1 = px(t.larg / 2), cy0 = py(t.z0), cy1 = py(t.z1);
    const ch = MAPA.chafariz;
    const fx = px(ch.x), fy = py(ch.z), fr = m(ch.r);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let c;
      const borda = x < px(-46) || x > px(46);
      if (borda) {
        const n = fbm(x, y, 14, 3, 2) + (bayer(x, y) - 0.5) * 0.1;
        c = rgb(n > 0.55 ? "#2f5a32" : n > 0.45 ? "#284e2c" : "#1f4024");
      } else {
        // piso de praça: lajotas escuras com brilho de noite
        const tx = Math.floor(x / 16), ty = Math.floor(y / 16);
        c = rgb((tx + ty) % 2 ? "#2c2440" : "#352c4c");
        if (x % 16 === 0 || y % 16 === 0) c = rgb("#1e1830");
        if (hash(x, y, 3) > 0.985) c = clarear(c, 0.25);
      }
      // tapete vermelho com borda dourada
      if (x >= cx0 && x < cx1 && y >= cy0 && y < cy1) {
        c = rgb(y % 6 === 0 ? "#9a0e1a" : "#b8121f");
        if (x < cx0 + 2 || x >= cx1 - 2) c = rgb("#e2b13c");
      }
      // chafariz
      const dd = Math.hypot(x - fx, y - fy);
      if (dd < fr) c = dd > fr - 5 ? rgb(dd > fr - 2 ? "#c8c4bc" : "#e8e4dc") : misturar(rgb("#2a6ab0"), rgb("#7fd1e8"), hash(x >> 1, y >> 1, 4) * 0.4);
      // avenida (por onde a van chega)
      if (y > py(42.5) && y < py(46.5)) c = rgb((y - py(42.5)) === 15 && x % 16 < 8 ? "#e8e4dc" : "#2a2a30");
      set(x, y, c);
    }
    ctx.putImageData(img, 0, 0);
    this.ctxChao = ctx;
    this.chao = canvas;
    // estrelas da Calçada da Fama nos dois lados do tapete
    for (const lado of [-1, 1]) for (let z = -18; z < 40; z += 6) {
      const sx = px(lado * 6.5), sy = py(z);
      ctx.fillStyle = "#d86a7a"; ctx.fillRect(sx - 6, sy - 6, 13, 13);
      ctx.fillStyle = "#e2b13c";
      for (const [a, b] of [[0, -4], [-1, -3], [0, -3], [1, -3], [-4, -1], [-3, -1], [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1], [4, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-2, 1], [-1, 1], [1, 1], [2, 1], [-3, 2], [-2, 2], [2, 2], [3, 2], [0, 1]]) ctx.fillRect(sx + a, sy + b, 1, 1);
    }
    // água do chafariz: sólida e com brilhos
    for (let y = fy - fr; y < fy + fr; y++) for (let x = fx - fr; x < fx + fr; x++) {
      if (Math.hypot(x - fx, y - fy) < fr) { this.marcarSolido(x, y, 1, 1); if (hash(x, y, 8) > 0.985) this.brilhos.push([x, y, 2]); }
    }
    // palco de madeira
    const p = MAPA.palco;
    ctx.fillStyle = "#4a2e1a"; ctx.fillRect(px(p.x - p.w / 2), py(p.z - p.d / 2), m(p.w), m(p.d));
    ctx.fillStyle = "#5a3a22"; for (let y = py(p.z - p.d / 2); y < py(p.z + p.d / 2); y += 4) ctx.fillRect(px(p.x - p.w / 2), y, m(p.w), 2);
    for (let j = 0; j < this.ch; j++) for (let i = 0; i < this.cw; i++) {
      const x = i * CEL, y = j * CEL;
      if (x >= cx0 && x < cx1 && y >= cy0 && y < cy1) this.piso[j * this.cw + i] = 3;
      else if (x < px(-46) || x > px(46)) this.piso[j * this.cw + i] = 0;
      else this.piso[j * this.cw + i] = 2;
    }
  }

  montar() {
    // cinema e o letreiro coberto em cima dele
    const cin = MAPA.cinema;
    this.add(fachadaCinema(m(cin.w)), px(cin.x), py(cin.z), { tipo: "cinema" });
    const L = MAPA.letreiro;
    this.letras = [];
    [...TEMA].forEach((chr, i) => {
      const o = this.add(O.lona(i), px(L.x + (i - (TEMA.length - 1) / 2) * L.espaco), py(L.z), { tipo: "lona", ch: chr, i, semColisao: true });
      o.letra = O.letra(chr);
      o.letraBrilho = O.letra(chr, 1);
      this.letras.push(o);
    });
    // cordões de veludo dos dois lados do tapete (com passagens)
    for (const lado of [-1, 1]) for (const [z0, z1] of [[-20, -3], [3, 17], [23, 37]]) this.add(pedestalCorda(m(z1 - z0)), px(lado * 4), py(z1), { tipo: "corda" });
    // árvores e palmeiras em vasos
    let s = 1;
    for (const a of MAPA.arvores) {
      s++;
      const spr = a.tipo === "palmeira" ? O.palmeira(a.s, s) : a.tipo === "copa" ? O.copa(a.s, s) : O.arbusto(a.s, s);
      if (a.tipo === "palmeira") { this.ctxChao.fillStyle = "#6a3a22"; this.ctxChao.fillRect(px(a.x) - 7, py(a.z) - 4, 14, 6); }
      this.add(spr, px(a.x), py(a.z), { tipo: a.tipo });
    }
    // parede de fotos com fotógrafos
    this.add(paredeFotos(), px(MAPA.fotos.x), py(MAPA.fotos.z), { tipo: "fotos" });
    for (const dx of [-5, 0, 5]) this.add(cameraTripe(), px(MAPA.fotos.x + dx), py(MAPA.fotos.z + 7), { tipo: "camera", flash: true });
    // camarim (arara + espelho)
    this.add(O.arara(), px(MAPA.camarim.x), py(MAPA.camarim.z + 1), { tipo: "arara" });
    // palco com instrumentos
    const p = MAPA.palco;
    this.add(O.caixaSom(), px(p.x - 5.5), py(p.z - 1.6), { tipo: "som" });
    this.add(O.caixaSom(), px(p.x + 5.5), py(p.z - 1.6), { tipo: "som" });
    this.add(O.bateria(), px(p.x - 2), py(p.z - 1.6), { tipo: "bateria" });
    this.add(O.violaoSuporte(), px(p.x + 3.6), py(p.z - 1.8), { tipo: "violao" });
    this.add(O.pedestalMic(), px(p.x + 1.5), py(p.z + 2.4), { tipo: "mic" });
    // pipoca e comidas
    this.add(O.quiosque(), px(MAPA.pipoca.x), py(MAPA.pipoca.z), { tipo: "pipoca" });
    for (const dx of [-7, 7]) { this.add(O.mesaComida(dx > 0 ? 1 : 2), px(MAPA.pipoca.x + dx), py(MAPA.pipoca.z + 8)); for (let k = 0; k < 4; k++) this.add(O.cadeira(), px(MAPA.pipoca.x + dx) - 16 + k * 11, py(MAPA.pipoca.z + 8) + 6); }
    this.add(bilheteria(), px(MAPA.bilheteria.x), py(MAPA.bilheteria.z), { tipo: "bilheteria" });
    // limusines e holofotes
    for (let k = 0; k < 2; k++) this.add(limusine(), px(MAPA.estacionamento.x), py(MAPA.estacionamento.z - 4 + k * 6), { tipo: "limusine" });
    for (const [x, z] of [[-44, -22], [44, -22], [-44, 40], [44, 40]]) this.add(holofote(), px(x), py(z), { tipo: "holofote" });
    this.add(O.portao(), px(MAPA.portao.x), py(MAPA.portao.z), { tipo: "portao" });
    this.marcarSolido(px(MAPA.portao.x) - 44, py(MAPA.portao.z) - 4, 10, 6);
    this.marcarSolido(px(MAPA.portao.x) + 34, py(MAPA.portao.z) - 4, 10, 6);
    // bancos do chafariz e Bíblia
    this.add(O.banco(), px(MAPA.chafariz.x), py(MAPA.chafariz.z + 6.6), { tipo: "banco" });
    this.add(O.pulpitoBiblia(), px(MAPA.biblia.x), py(MAPA.biblia.z), { tipo: "biblia" });
    for (const [x, z] of [[-20, -20], [20, -20], [-20, 30], [20, 30], [-40, 0], [40, 18]]) this.add(O.poste(), px(x), py(z), { tipo: "poste" });
    // atrás do cinema não se anda
    this.marcarSolido(px(-32), py(-40), m(64), m(16));
    // bordas
    this.marcarSolido(0, 0, this.W, py(-40));
    this.marcarSolido(0, 0, 8, this.H);
    this.marcarSolido(this.W - 8, 0, 8, this.H);
    this.marcarSolido(0, this.H - 8, this.W, 8);
  }
}
