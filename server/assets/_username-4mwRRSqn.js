import { t as supabase } from "./client-Cc5YU_PK.js";
import { t as Route } from "./_username-BVJReybi.js";
import { _ as AnimatedText, h as getSplashLeaveStyle, l as FONT_CLASSES, m as getCurtainPanelStyle, s as ENTRY_TRANSITION_DURATION } from "./profile-options-C1AhgXEW.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowUpRight, BadgeCheck, Camera, Eye, Facebook, Github, Globe, Instagram, Linkedin, MessageCircle, Music, Pause, Play, Send, Twitch, Twitter, Volume2, VolumeX, Youtube } from "lucide-react";
//#region src/components/ProfileEffects.tsx
var COUNTS = {
	starfield: 70,
	sparkles: 50,
	rain: 90,
	snow: 60,
	bubbles: 28,
	confetti: 60,
	fireflies: 35,
	embers: 40,
	petals: 45
};
var CONFETTI_COLORS = [
	"#ff5470",
	"#ffd166",
	"#06d6a0",
	"#118ab2",
	"#c77dff"
];
var PETAL_COLORS = [
	"#ffb3c6",
	"#ff8fab",
	"#fbb1bd",
	"#f7cad0",
	"#ffd6e0"
];
function useParticles(effect) {
	return useMemo(() => {
		const count = COUNTS[effect];
		if (!count) return [];
		switch (effect) {
			case "starfield":
			case "sparkles": return Array.from({ length: count }, (_, id) => ({
				id,
				top: Math.random() * 100,
				left: Math.random() * 100,
				size: Math.random() * 2 + 1,
				delay: Math.random() * 3,
				duration: 2 + Math.random() * 2
			}));
			case "rain": return Array.from({ length: count }, (_, id) => ({
				id,
				top: -Math.random() * 20,
				left: Math.random() * 100,
				size: 1,
				delay: Math.random() * 2,
				duration: .6 + Math.random() * .8
			}));
			case "snow": return Array.from({ length: count }, (_, id) => ({
				id,
				top: -Math.random() * 20,
				left: Math.random() * 100,
				size: Math.random() * 3 + 2,
				delay: Math.random() * 6,
				duration: 6 + Math.random() * 8,
				drift: (Math.random() - .5) * 60
			}));
			case "bubbles": return Array.from({ length: count }, (_, id) => ({
				id,
				top: 100 + Math.random() * 20,
				left: Math.random() * 100,
				size: Math.random() * 14 + 6,
				delay: Math.random() * 6,
				duration: 5 + Math.random() * 6,
				drift: (Math.random() - .5) * 40
			}));
			case "confetti": return Array.from({ length: count }, (_, id) => ({
				id,
				top: -Math.random() * 20,
				left: Math.random() * 100,
				size: Math.random() * 5 + 4,
				delay: Math.random() * 3,
				duration: 3 + Math.random() * 2.5,
				drift: (Math.random() - .5) * 80,
				rotate: Math.random() * 360
			}));
			case "fireflies": return Array.from({ length: count }, (_, id) => ({
				id,
				top: Math.random() * 100,
				left: Math.random() * 100,
				size: Math.random() * 2 + 1.5,
				delay: Math.random() * 5,
				duration: 4 + Math.random() * 4
			}));
			case "embers": return Array.from({ length: count }, (_, id) => ({
				id,
				top: 100 + Math.random() * 20,
				left: Math.random() * 100,
				size: Math.random() * 2.5 + 1,
				delay: Math.random() * 6,
				duration: 4 + Math.random() * 5,
				drift: (Math.random() - .5) * 50
			}));
			case "petals": return Array.from({ length: count }, (_, id) => ({
				id,
				top: -Math.random() * 20,
				left: Math.random() * 100,
				size: Math.random() * 6 + 5,
				delay: Math.random() * 4,
				duration: 6 + Math.random() * 5,
				drift: (Math.random() - .5) * 70,
				rotate: Math.random() * 360
			}));
			default: return [];
		}
	}, [effect]);
}
var MATRIX_COLS = 32;
function ProfileEffects({ effect, accent }) {
	const particles = useParticles(effect);
	const matrixColumns = useMemo(() => {
		if (effect !== "matrix") return [];
		return Array.from({ length: MATRIX_COLS }, (_, id) => ({
			id,
			left: id / MATRIX_COLS * 100,
			delay: Math.random() * 5,
			duration: 3 + Math.random() * 4,
			chars: Array.from({ length: 18 }, () => String.fromCharCode(12448 + Math.floor(Math.random() * 96))).join("")
		}));
	}, [effect]);
	if (effect === "none") return null;
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("style", { children: `
        @keyframes fx-fall { from { transform: translateY(0); } to { transform: translateY(110vh); } }
        @keyframes fx-fall-drift { from { transform: translate(0, 0); } to { transform: translate(var(--fx-drift, 0px), 110vh); } }
        @keyframes fx-fall-drift-rotate { from { transform: translate(0, 0) rotate(0deg); } to { transform: translate(var(--fx-drift, 0px), 110vh) rotate(var(--fx-rotate, 360deg)); } }
        @keyframes fx-rise-drift { from { transform: translate(0, 0); opacity: 0; } 10% { opacity: 1; } to { transform: translate(var(--fx-drift, 0px), -120vh); opacity: 0; } }
        @keyframes fx-twinkle { 0%, 100% { opacity: 0.15; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.15); } }
        @keyframes fx-flicker { 0%, 100% { opacity: 0.2; } 45% { opacity: 1; } 55% { opacity: 0.3; } 80% { opacity: 0.9; } }
        @keyframes fx-drift-slow { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(14px, -18px); } }
        @keyframes fx-aurora-move { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(30px, 20px) scale(1.08); } }
        @keyframes fx-matrix-fall { from { transform: translateY(-100%); } to { transform: translateY(100%); } }
        @keyframes fx-fog-drift { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4%); } }
        @keyframes fx-lightning-flash {
          0%, 96%, 100% { opacity: 0; }
          96.5% { opacity: 0.55; }
          97% { opacity: 0.1; }
          97.5% { opacity: 0.4; }
          98% { opacity: 0; }
        }
      ` }),
		effect === "grid" && /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2] opacity-20",
			style: {
				backgroundImage: `linear-gradient(${accent}30 1px, transparent 1px), linear-gradient(90deg, ${accent}30 1px, transparent 1px)`,
				backgroundSize: "40px 40px"
			}
		}),
		effect === "aurora" && /* @__PURE__ */ jsxs("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2] overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl",
				style: {
					background: `radial-gradient(circle, ${accent}, transparent 65%)`,
					animation: "fx-aurora-move 14s ease-in-out infinite"
				}
			}), /* @__PURE__ */ jsx("div", {
				className: "absolute -right-40 top-40 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl",
				style: {
					background: `radial-gradient(circle, ${accent}, transparent 65%)`,
					animation: "fx-aurora-move 14s ease-in-out infinite -6s"
				}
			})]
		}),
		(effect === "starfield" || effect === "sparkles") && /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2]",
			children: particles.map((p) => /* @__PURE__ */ jsx("span", {
				className: "absolute block rounded-full",
				style: {
					top: `${p.top}%`,
					left: `${p.left}%`,
					width: p.size,
					height: p.size,
					background: effect === "sparkles" ? accent : "#ffffff",
					boxShadow: `0 0 6px ${effect === "sparkles" ? accent : "#ffffff"}`,
					animation: `fx-twinkle ${p.duration}s ease-in-out infinite`,
					animationDelay: `${p.delay}s`
				}
			}, p.id))
		}),
		effect === "rain" && /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2] overflow-hidden",
			children: particles.map((p) => /* @__PURE__ */ jsx("span", {
				className: "absolute block",
				style: {
					top: 0,
					left: `${p.left}%`,
					width: 1,
					height: 14,
					background: `linear-gradient(${accent}, transparent)`,
					animation: `fx-fall ${p.duration}s linear infinite`,
					animationDelay: `${p.delay}s`
				}
			}, p.id))
		}),
		effect === "snow" && /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2] overflow-hidden",
			children: particles.map((p) => /* @__PURE__ */ jsx("span", {
				className: "absolute block rounded-full bg-white",
				style: {
					top: 0,
					left: `${p.left}%`,
					width: p.size,
					height: p.size,
					opacity: .85,
					filter: "blur(0.3px)",
					["--fx-drift"]: `${p.drift}px`,
					animation: `fx-fall-drift ${p.duration}s linear infinite`,
					animationDelay: `${p.delay}s`
				}
			}, p.id))
		}),
		effect === "bubbles" && /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2] overflow-hidden",
			children: particles.map((p) => /* @__PURE__ */ jsx("span", {
				className: "absolute block rounded-full",
				style: {
					top: `${p.top}%`,
					left: `${p.left}%`,
					width: p.size,
					height: p.size,
					border: `1px solid ${accent}80`,
					background: `${accent}14`,
					["--fx-drift"]: `${p.drift}px`,
					animation: `fx-rise-drift ${p.duration}s ease-in infinite`,
					animationDelay: `${p.delay}s`
				}
			}, p.id))
		}),
		effect === "confetti" && /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2] overflow-hidden",
			children: particles.map((p, i) => /* @__PURE__ */ jsx("span", {
				className: "absolute block",
				style: {
					top: 0,
					left: `${p.left}%`,
					width: p.size,
					height: p.size * .4,
					background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
					["--fx-drift"]: `${p.drift}px`,
					["--fx-rotate"]: `${p.rotate}deg`,
					animation: `fx-fall-drift-rotate ${p.duration}s linear infinite`,
					animationDelay: `${p.delay}s`
				}
			}, p.id))
		}),
		effect === "fireflies" && /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2]",
			children: particles.map((p) => /* @__PURE__ */ jsx("span", {
				className: "absolute block rounded-full",
				style: {
					top: `${p.top}%`,
					left: `${p.left}%`,
					width: p.size,
					height: p.size,
					background: accent,
					boxShadow: `0 0 8px 2px ${accent}`,
					animation: `fx-flicker ${p.duration}s ease-in-out infinite, fx-drift-slow ${p.duration * 1.4}s ease-in-out infinite`,
					animationDelay: `${p.delay}s`
				}
			}, p.id))
		}),
		effect === "embers" && /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2] overflow-hidden",
			children: particles.map((p) => /* @__PURE__ */ jsx("span", {
				className: "absolute block rounded-full",
				style: {
					top: `${p.top}%`,
					left: `${p.left}%`,
					width: p.size,
					height: p.size,
					background: accent,
					boxShadow: `0 0 6px 2px ${accent}`,
					["--fx-drift"]: `${p.drift}px`,
					animation: `fx-rise-drift ${p.duration}s ease-in infinite`,
					animationDelay: `${p.delay}s`
				}
			}, p.id))
		}),
		effect === "petals" && /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2] overflow-hidden",
			children: particles.map((p, i) => /* @__PURE__ */ jsx("span", {
				className: "absolute block",
				style: {
					top: 0,
					left: `${p.left}%`,
					width: p.size,
					height: p.size * .8,
					background: PETAL_COLORS[i % PETAL_COLORS.length],
					borderRadius: "0 100% 0 100%",
					["--fx-drift"]: `${p.drift}px`,
					["--fx-rotate"]: `${p.rotate}deg`,
					animation: `fx-fall-drift-rotate ${p.duration}s ease-in-out infinite`,
					animationDelay: `${p.delay}s`
				}
			}, p.id))
		}),
		effect === "fog" && /* @__PURE__ */ jsxs("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2] overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "absolute inset-x-0 bottom-0 h-2/3 opacity-30 blur-3xl",
				style: {
					background: `linear-gradient(to top, ${accent}55, transparent)`,
					animation: "fx-fog-drift 16s ease-in-out infinite"
				}
			}), /* @__PURE__ */ jsx("div", {
				className: "absolute inset-x-0 bottom-0 h-1/2 opacity-20 blur-2xl",
				style: {
					background: "linear-gradient(to top, #ffffff33, transparent)",
					animation: "fx-fog-drift 22s ease-in-out infinite -8s"
				}
			})]
		}),
		effect === "lightning" && /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2]",
			style: {
				background: "#ffffff",
				animation: "fx-lightning-flash 7s infinite"
			}
		}),
		effect === "matrix" && /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-[2] overflow-hidden opacity-40",
			children: matrixColumns.map((c) => /* @__PURE__ */ jsx("div", {
				className: "absolute top-0 whitespace-pre font-mono text-[11px] leading-[14px]",
				style: {
					left: `${c.left}%`,
					color: accent,
					textShadow: `0 0 6px ${accent}`,
					animation: `fx-matrix-fall ${c.duration}s linear infinite`,
					animationDelay: `${c.delay}s`
				},
				children: c.chars.split("").map((ch, idx) => /* @__PURE__ */ jsx("div", {
					style: { opacity: idx === 0 ? 1 : Math.max(.15, 1 - idx / c.chars.length) },
					children: ch
				}, idx))
			}, c.id))
		})
	] });
}
//#endregion
//#region src/components/CursorEffects.tsx
var GLYPHS = {
	hearts: "♥",
	stars: "✦",
	sparkle: "✧"
};
function CursorEffects({ effect, accent }) {
	const hostRef = useRef(null);
	const followRef = useRef(null);
	useEffect(() => {
		if (effect === "none" || typeof window === "undefined") return;
		const host = hostRef.current;
		if (!host) return;
		const nodes = [];
		let last = 0;
		let raf = 0;
		let tx = -100, ty = -100, cx = -100, cy = -100;
		const spawn = (x, y) => {
			const el = document.createElement("span");
			el.className = `cursor-fx cursor-fx-${effect}`;
			el.style.left = `${x}px`;
			el.style.top = `${y}px`;
			const glyph = GLYPHS[effect];
			if (glyph) {
				el.textContent = glyph;
				el.style.color = effect === "hearts" ? "#ff5c7a" : accent;
			} else if (effect === "rainbow") el.style.background = `hsl(${Date.now() / 8 % 360} 90% 60%)`;
			else {
				el.style.background = accent;
				el.style.boxShadow = `0 0 10px ${accent}`;
			}
			if (effect === "particles") el.style.setProperty("--fx-dx", `${(Math.random() - .5) * 60}px`);
			host.appendChild(el);
			nodes.push({
				el,
				born: performance.now()
			});
			if (nodes.length > 90) nodes.shift()?.el.remove();
		};
		const onMove = (e) => {
			tx = e.clientX;
			ty = e.clientY;
			if (effect === "glow" || effect === "ring" || effect === "dot") return;
			const now = performance.now();
			const gap = effect === "trail" ? 16 : 45;
			if (now - last < gap) return;
			last = now;
			spawn(e.clientX, e.clientY);
		};
		const onClick = (e) => {
			if (effect !== "ripple") return;
			spawn(e.clientX, e.clientY);
		};
		const tick = () => {
			cx += (tx - cx) * .18;
			cy += (ty - cy) * .18;
			if (followRef.current) followRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
			const now = performance.now();
			for (let i = nodes.length - 1; i >= 0; i--) if (now - nodes[i].born > 1200) {
				nodes[i].el.remove();
				nodes.splice(i, 1);
			}
			raf = requestAnimationFrame(tick);
		};
		window.addEventListener("mousemove", onMove, { passive: true });
		window.addEventListener("click", onClick);
		raf = requestAnimationFrame(tick);
		return () => {
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("click", onClick);
			cancelAnimationFrame(raf);
			nodes.forEach((n) => n.el.remove());
		};
	}, [effect, accent]);
	if (effect === "none") return null;
	return /* @__PURE__ */ jsxs(Fragment, { children: [effect === "glow" ? /* @__PURE__ */ jsx("div", {
		ref: followRef,
		className: "cursor-follow",
		style: {
			width: 220,
			height: 220,
			background: `radial-gradient(circle, ${accent}45, transparent 65%)`,
			borderRadius: "50%"
		}
	}) : effect === "ring" ? /* @__PURE__ */ jsx("div", {
		ref: followRef,
		className: "cursor-follow",
		style: {
			width: 34,
			height: 34,
			border: `2px solid ${accent}`,
			borderRadius: "50%",
			boxShadow: `0 0 14px ${accent}80`
		}
	}) : effect === "dot" ? /* @__PURE__ */ jsx("div", {
		ref: followRef,
		className: "cursor-follow",
		style: {
			width: 10,
			height: 10,
			background: accent,
			borderRadius: "50%",
			boxShadow: `0 0 14px ${accent}`
		}
	}) : null, /* @__PURE__ */ jsx("div", {
		ref: hostRef,
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 z-[60]"
	})] });
}
//#endregion
//#region src/components/AudioVisualizer.tsx
var POS = {
	"top-left": "top-4 left-4",
	"top-right": "top-4 right-4",
	"bottom-left": "bottom-4 left-4",
	"bottom-right": "bottom-4 right-4"
};
/** Border-radius (px) for a given shape, scaled to the button's size. */
function shapeRadius(shape, size) {
	switch (shape) {
		case "circle": return size / 2;
		case "square": return Math.max(4, size * .14);
		case "rectangle": return Math.max(4, size * .22);
		default: return Math.max(6, size * .32);
	}
}
/** Button width (px) for a given shape — circle/rounded/square stay 1:1, rectangle stretches. */
function shapeWidth(shape, size) {
	return shape === "rectangle" ? Math.round(size * 1.7) : size;
}
function AudioVisualizer({ src, accent, volume = .5, autoplay = true, mode = "bars", floatingWidget = false, widgetPosition = "top-left", widgetColor, widgetStyle = "default", widgetSize = 40, widgetShape = "circle", visualizerColor }) {
	const audioRef = useRef(null);
	const canvasRef = useRef(null);
	const analyserRef = useRef(null);
	const [playing, setPlaying] = useState(false);
	const [muted, setMuted] = useState(false);
	const [vol, setVol] = useState(Math.min(1, Math.max(0, volume)));
	const color = widgetColor || accent;
	const barColor = visualizerColor || widgetColor || accent;
	const size = Math.min(72, Math.max(24, widgetSize));
	const btnWidth = shapeWidth(widgetShape, size);
	const btnRadius = shapeRadius(widgetShape, size);
	const connect = useCallback(() => {
		const audio = audioRef.current;
		if (!audio || analyserRef.current) return;
		try {
			const ctx = new (window.AudioContext ?? window.webkitAudioContext)();
			const analyser = ctx.createAnalyser();
			analyser.fftSize = 128;
			ctx.createMediaElementSource(audio).connect(analyser);
			analyser.connect(ctx.destination);
			analyserRef.current = analyser;
			if (ctx.state === "suspended") ctx.resume();
		} catch {}
	}, []);
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.volume = Math.min(1, Math.max(0, volume));
		setVol(Math.min(1, Math.max(0, volume)));
		if (!autoplay) return;
		const start = () => {
			connect();
			audio.play().then(() => setPlaying(true)).catch(() => {});
		};
		audio.play().then(() => {
			connect();
			setPlaying(true);
		}).catch(() => {
			window.addEventListener("pointerdown", start, { once: true });
			window.addEventListener("keydown", start, { once: true });
		});
		return () => {
			window.removeEventListener("pointerdown", start);
			window.removeEventListener("keydown", start);
		};
	}, [
		src,
		autoplay,
		volume,
		connect
	]);
	useEffect(() => {
		if (mode === "none") return;
		const canvas = canvasRef.current;
		const ctx2d = canvas?.getContext("2d");
		if (!canvas || !ctx2d) return;
		let raf = 0;
		const data = /* @__PURE__ */ new Uint8Array(64);
		const draw = () => {
			const w = canvas.width = canvas.clientWidth * 2;
			const h = canvas.height = canvas.clientHeight * 2;
			ctx2d.clearRect(0, 0, w, h);
			const analyser = analyserRef.current;
			if (analyser) analyser.getByteFrequencyData(data);
			else for (let i = 0; i < data.length; i++) data[i] = playing ? 30 + Math.sin(Date.now() / 260 + i / 2) * 25 + Math.random() * 20 : 6;
			ctx2d.fillStyle = barColor;
			ctx2d.strokeStyle = barColor;
			ctx2d.lineWidth = 4;
			if (mode === "bars") {
				const bars = 40, bw = w / bars;
				for (let i = 0; i < bars; i++) {
					const v = data[i] / 255, bh = Math.max(4, v * h);
					ctx2d.globalAlpha = .35 + v * .65;
					ctx2d.fillRect(i * bw + bw * .2, h - bh, bw * .6, bh);
				}
			} else if (mode === "bars-mirror") {
				const bars = 40, bw = w / bars, mid = h / 2;
				for (let i = 0; i < bars; i++) {
					const v = data[i] / 255, bh = Math.max(3, v * mid);
					ctx2d.globalAlpha = .35 + v * .65;
					ctx2d.fillRect(i * bw + bw * .2, mid - bh, bw * .6, bh * 2);
				}
			} else if (mode === "bars-dots") {
				const bars = 28, bw = w / bars, dot = Math.max(3, bw * .5);
				const gap = dot * 1.6;
				for (let i = 0; i < bars; i++) {
					const v = data[i] / 255;
					const count = Math.max(1, Math.round(v * h / gap));
					const cx = i * bw + bw / 2;
					for (let j = 0; j < count; j++) {
						const cy = h - dot / 2 - j * gap;
						ctx2d.globalAlpha = .4 + v * .6 - j * .015;
						ctx2d.beginPath();
						ctx2d.arc(cx, cy, dot / 2, 0, Math.PI * 2);
						ctx2d.fill();
					}
				}
			} else if (mode === "bars-center") {
				const bars = 20, bw = w / (bars * 2), mid = w / 2;
				for (let i = 0; i < bars; i++) {
					const v = data[i] / 255, bh = Math.max(4, v * h);
					ctx2d.globalAlpha = .35 + v * .65;
					ctx2d.fillRect(mid + i * bw + bw * .1, h - bh, bw * .8, bh);
					ctx2d.fillRect(mid - (i + 1) * bw + bw * .1, h - bh, bw * .8, bh);
				}
			} else {
				const bars = 32, bw = w / bars;
				for (let i = 0; i < bars; i++) {
					const v = data[i] / 255, bh = Math.max(4, v * h), r = Math.min(bw * .35, bh / 2);
					ctx2d.globalAlpha = .4 + v * .6;
					ctx2d.shadowColor = barColor;
					ctx2d.shadowBlur = 8 + v * 10;
					ctx2d.beginPath();
					const x = i * bw + bw * .22, bw2 = bw * .56, y = h - bh;
					ctx2d.moveTo(x, h);
					ctx2d.lineTo(x, y + r);
					ctx2d.arcTo(x, y, x + r, y, r);
					ctx2d.lineTo(x + bw2 - r, y);
					ctx2d.arcTo(x + bw2, y, x + bw2, y + r, r);
					ctx2d.lineTo(x + bw2, h);
					ctx2d.closePath();
					ctx2d.fill();
				}
				ctx2d.shadowBlur = 0;
			}
			raf = requestAnimationFrame(draw);
		};
		raf = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(raf);
	}, [
		mode,
		barColor,
		playing
	]);
	const toggle = () => {
		const audio = audioRef.current;
		if (!audio) return;
		connect();
		if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => {});
		else {
			audio.pause();
			setPlaying(false);
		}
	};
	const toggleMute = () => {
		const audio = audioRef.current;
		if (!audio) return;
		connect();
		const next = !audio.muted;
		audio.muted = next;
		setMuted(next);
	};
	const applyVolume = (v) => {
		const clamped = Math.min(1, Math.max(0, v));
		setVol(clamped);
		if (audioRef.current) {
			audioRef.current.volume = clamped;
			if (audioRef.current.muted && clamped > 0) {
				audioRef.current.muted = false;
				setMuted(false);
			}
		}
	};
	const audioEl = /* @__PURE__ */ jsx("audio", {
		ref: audioRef,
		src,
		loop: true,
		preload: "auto",
		crossOrigin: "anonymous",
		onPlay: () => {
			connect();
			setPlaying(true);
		},
		onPause: () => setPlaying(false)
	});
	if (widgetStyle === "bar-slider" && floatingWidget) return /* @__PURE__ */ jsxs("div", {
		className: `fixed z-40 ${POS[widgetPosition]}`,
		children: [audioEl, /* @__PURE__ */ jsx(BarSliderWidget, {
			muted,
			vol,
			color,
			size,
			btnWidth,
			btnRadius,
			onToggleMute: toggleMute,
			onVolumeChange: applyVolume
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: floatingWidget ? `fixed z-40 w-56 ${POS[widgetPosition]}` : "mt-6",
		children: [audioEl, /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur",
			children: [/* @__PURE__ */ jsx("button", {
				onClick: toggle,
				"aria-label": playing ? "Pause audio" : "Play audio",
				className: "grid shrink-0 place-items-center transition-transform hover:scale-110",
				style: {
					height: size,
					width: btnWidth,
					borderRadius: btnRadius,
					background: `${color}22`,
					color,
					boxShadow: `0 0 14px ${color}40`
				},
				children: playing ? /* @__PURE__ */ jsx(Pause, { style: {
					height: size * .42,
					width: size * .42
				} }) : /* @__PURE__ */ jsx(Play, { style: {
					height: size * .42,
					width: size * .42
				} })
			}), mode !== "none" ? /* @__PURE__ */ jsx("canvas", {
				ref: canvasRef,
				className: "flex-1",
				style: { height: size }
			}) : /* @__PURE__ */ jsxs("span", {
				className: "flex flex-1 items-center gap-2 text-xs opacity-70",
				children: [/* @__PURE__ */ jsx(Volume2, { className: "h-3.5 w-3.5" }), " Now playing"]
			})]
		})]
	});
}
/**
* Compact circular mute button. On hover (or focus, for keyboard/touch users) it
* expands into a horizontal draggable volume bar alongside it. Clicking the button
* mutes/unmutes the audio; while muted, the bar stays open even without hovering
* so it's obvious the widget is "active". Audio playback itself is untouched —
* this only controls whether it's audible.
*/
function BarSliderWidget({ muted, vol, color, size, btnWidth, btnRadius, onToggleMute, onVolumeChange }) {
	const [hovering, setHovering] = useState(false);
	const trackRef = useRef(null);
	const draggingRef = useRef(false);
	const trackWidth = Math.round(size * 3.3);
	const iconSize = Math.round(size * .4);
	const pillRadius = Math.max(6, btnRadius * .9);
	const setFromClientX = useCallback((clientX) => {
		const track = trackRef.current;
		if (!track) return;
		const rect = track.getBoundingClientRect();
		onVolumeChange((clientX - rect.left) / rect.width);
	}, [onVolumeChange]);
	useEffect(() => {
		const onMove = (e) => {
			if (!draggingRef.current) return;
			setFromClientX(e.clientX);
		};
		const onUp = () => {
			draggingRef.current = false;
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
		};
	}, [setFromClientX]);
	const expanded = hovering || muted;
	const VolIcon = muted || vol === 0 ? VolumeX : Volume2;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center",
		onMouseEnter: () => setHovering(true),
		onMouseLeave: () => setHovering(false),
		onFocus: () => setHovering(true),
		onBlur: () => setHovering(false),
		children: [/* @__PURE__ */ jsx("button", {
			onClick: onToggleMute,
			"aria-label": muted ? "Unmute audio" : "Mute audio",
			"aria-pressed": muted,
			className: "grid shrink-0 place-items-center border border-white/10 bg-black/50 backdrop-blur transition-transform hover:scale-110",
			style: {
				height: size,
				width: btnWidth,
				borderRadius: btnRadius,
				color,
				boxShadow: `0 0 14px ${color}40`
			},
			children: /* @__PURE__ */ jsx(VolIcon, { style: {
				height: iconSize,
				width: iconSize
			} })
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-hidden transition-all duration-300 ease-out",
			style: {
				width: expanded ? trackWidth : 0,
				marginLeft: expanded ? 10 : 0,
				opacity: expanded ? 1 : 0
			},
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 border border-white/10 bg-black/50 backdrop-blur",
				style: {
					height: size,
					borderRadius: pillRadius,
					paddingLeft: size * .3,
					paddingRight: size * .3
				},
				children: [/* @__PURE__ */ jsx(VolIcon, {
					className: "shrink-0",
					style: {
						height: iconSize * .85,
						width: iconSize * .85,
						color
					}
				}), /* @__PURE__ */ jsxs("div", {
					ref: trackRef,
					role: "slider",
					tabIndex: 0,
					"aria-label": "Volume",
					"aria-valuemin": 0,
					"aria-valuemax": 100,
					"aria-valuenow": Math.round(vol * 100),
					className: "relative h-1.5 flex-1 cursor-pointer rounded-full bg-white/15",
					onPointerDown: (e) => {
						draggingRef.current = true;
						setFromClientX(e.clientX);
					},
					onKeyDown: (e) => {
						if (e.key === "ArrowRight" || e.key === "ArrowUp") onVolumeChange(vol + .05);
						if (e.key === "ArrowLeft" || e.key === "ArrowDown") onVolumeChange(vol - .05);
					},
					children: [/* @__PURE__ */ jsx("div", {
						className: "absolute inset-y-0 left-0 rounded-full",
						style: {
							width: `${vol * 100}%`,
							background: color
						}
					}), /* @__PURE__ */ jsx("div", {
						className: "absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full shadow",
						style: {
							left: `calc(${vol * 100}% - 6px)`,
							background: color
						}
					})]
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/Typewriter.tsx
function Typewriter({ phrases, className, style, speed = 60, pause = 1400, color }) {
	const [idx, setIdx] = useState(0);
	const [text, setText] = useState("");
	const [deleting, setDeleting] = useState(false);
	useEffect(() => {
		if (phrases.length === 0) return;
		const current = phrases[idx % phrases.length];
		if (!deleting && text === current) {
			const t = setTimeout(() => setDeleting(true), pause);
			return () => clearTimeout(t);
		}
		if (deleting && text === "") {
			setDeleting(false);
			setIdx((i) => (i + 1) % phrases.length);
			return;
		}
		const t = setTimeout(() => {
			setText((prev) => deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1));
		}, deleting ? speed / 2 : speed);
		return () => clearTimeout(t);
	}, [
		text,
		deleting,
		idx,
		phrases,
		speed,
		pause
	]);
	if (phrases.length === 0) return null;
	return /* @__PURE__ */ jsx("span", {
		className: `typewriter-cursor ${className ?? ""}`,
		style: color ? {
			...style,
			color
		} : style,
		children: text
	});
}
//#endregion
//#region src/routes/$username.tsx?tsr-split=component
var SOCIAL_ICONS = {
	instagram: Instagram,
	twitter: Twitter,
	x: Twitter,
	youtube: Youtube,
	twitch: Twitch,
	github: Github,
	tiktok: Music,
	spotify: Music,
	facebook: Facebook,
	linkedin: Linkedin,
	telegram: Send,
	discord: MessageCircle,
	snapchat: Camera,
	website: Globe
};
var SOCIAL_BASE_URLS = {
	instagram: "https://instagram.com/",
	twitter: "https://x.com/",
	x: "https://x.com/",
	youtube: "https://youtube.com/@",
	twitch: "https://twitch.tv/",
	github: "https://github.com/",
	tiktok: "https://tiktok.com/@",
	spotify: "https://open.spotify.com/user/",
	facebook: "https://facebook.com/",
	linkedin: "https://linkedin.com/in/",
	telegram: "https://t.me/",
	discord: "https://discord.com/users/",
	snapchat: "https://snapchat.com/add/"
};
function normalizeSocialUrl(platform, rawUrl) {
	const url = (rawUrl ?? "").trim();
	if (!url) return "#";
	if (/^[a-z][a-z0-9+.-]*:\/\//i.test(url)) return url;
	if (url.includes(".") && !url.includes(" ")) return `https://${url}`;
	const handle = url.replace(/^@/, "").replace(/^\/+|\/+$/g, "");
	const base = SOCIAL_BASE_URLS[platform.toLowerCase()];
	return base ? `${base}${handle}` : `https://${handle}`;
}
function normalizeExternalUrl(rawUrl) {
	const url = (rawUrl ?? "").trim();
	if (!url) return "#";
	if (/^[a-z][a-z0-9+.-]*:\/\//i.test(url) || url.startsWith("mailto:") || url.startsWith("tel:")) return url;
	return `https://${url}`;
}
function formatViews(n) {
	if (n < 1e3) return String(n);
	if (n < 1e6) {
		const v = n / 1e3;
		return `${v >= 100 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}k`;
	}
	return `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}m`;
}
function RoleBadge({ role, size = 16 }) {
	const [hover, setHover] = useState(false);
	return /* @__PURE__ */ jsxs("span", {
		className: "relative inline-flex shrink-0",
		onMouseEnter: () => setHover(true),
		onMouseLeave: () => setHover(false),
		onFocus: () => setHover(true),
		onBlur: () => setHover(false),
		tabIndex: 0,
		children: [/* @__PURE__ */ jsx("span", {
			className: "inline-flex h-4 w-4 shrink-0 cursor-default items-center justify-center [&>svg]:h-full [&>svg]:w-full [&>img]:h-full [&>img]:w-full [&>img]:rounded-[3px] [&>img]:object-contain",
			style: {
				color: role.color,
				width: size,
				height: size
			},
			dangerouslySetInnerHTML: { __html: role.icon_svg }
		}), /* @__PURE__ */ jsxs("span", {
			role: "tooltip",
			className: `pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-black/90 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-all duration-150 ${hover ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`,
			children: [role.label, /* @__PURE__ */ jsx("span", { className: "absolute left-1/2 top-full -mt-px -translate-x-1/2 border-4 border-transparent border-t-black/90" })]
		})]
	});
}
/**
* Some browsers only honor the *live* `muted` property at the moment they
* decide whether to allow autoplay — not just the JSX `muted` attribute.
* When React sets that attribute after mount, the race can be lost and
* autoplay is silently blocked until a user gesture (e.g. clicking the
* splash) — which looks like "the video only plays after you click."
* Setting `.muted` imperatively via a ref and calling `.play()` ourselves
* closes that gap.
*/
function BackgroundVideo({ url, className }) {
	const ref = useRef(null);
	useEffect(() => {
		const v = ref.current;
		if (!v) return;
		v.muted = true;
		const playPromise = v.play();
		if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
	}, [url]);
	return /* @__PURE__ */ jsx("video", {
		ref,
		src: url,
		autoPlay: true,
		muted: true,
		loop: true,
		playsInline: true,
		className
	});
}
/** Fills the click-to-enter splash with an image/GIF/video, with a dark scrim so the text stays readable. */
function SplashBackgroundMedia({ url }) {
	return /* @__PURE__ */ jsxs("div", {
		"aria-hidden": true,
		className: "absolute inset-0 z-0 overflow-hidden",
		children: [/\.(mp4|webm)(\?.*)?$/i.test(url) ? /* @__PURE__ */ jsx(BackgroundVideo, {
			url,
			className: "h-full w-full object-cover"
		}) : /* @__PURE__ */ jsx("img", {
			src: url,
			alt: "",
			className: "h-full w-full object-cover"
		}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/45" })]
	});
}
/**
* Wraps the profile card so it tilts in 3D as the cursor moves across it —
* rotateX/rotateY driven by pointer position relative to the card's own
* bounding box, plus a soft light-following glare and a subtle "lift"
* (translateZ + bigger shadow) so the card genuinely reads as floating.
* Resets smoothly on pointer leave. Disabled automatically for touch/coarse
* pointers, since there's no hover position to drive it there.
*/
function TiltCard({ accent, className, style, children }) {
	const ref = useRef(null);
	const [tilt, setTilt] = useState({
		rx: 0,
		ry: 0,
		mx: 50,
		my: 50,
		active: false
	});
	const supportsHover = useRef(typeof window !== "undefined" && window.matchMedia?.("(hover: hover) and (pointer: fine)").matches);
	const onMove = (e) => {
		if (!supportsHover.current) return;
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width;
		const py = (e.clientY - rect.top) / rect.height;
		const MAX_DEG = 10;
		setTilt({
			rx: (.5 - py) * MAX_DEG * 2,
			ry: (px - .5) * MAX_DEG * 2,
			mx: px * 100,
			my: py * 100,
			active: true
		});
	};
	const onLeave = () => setTilt((t) => ({
		...t,
		rx: 0,
		ry: 0,
		active: false
	}));
	return /* @__PURE__ */ jsx("div", {
		style: { perspective: 1200 },
		children: /* @__PURE__ */ jsxs("div", {
			ref,
			onMouseMove: onMove,
			onMouseLeave: onLeave,
			className,
			style: {
				...style,
				transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${tilt.active ? 12 : 0}px) scale(${tilt.active ? 1.015 : 1})`,
				transformStyle: "preserve-3d",
				transition: tilt.active ? "transform 90ms linear, box-shadow 200ms ease" : "transform 550ms cubic-bezier(0.16,1,0.3,1), box-shadow 400ms ease",
				boxShadow: tilt.active ? `0 30px 70px -20px #000, 0 0 60px -20px ${accent}55` : style?.boxShadow ?? `0 20px 50px -25px #000`,
				willChange: "transform"
			},
			children: [/* @__PURE__ */ jsx("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 z-[1]",
				style: {
					opacity: tilt.active ? 1 : 0,
					transition: "opacity 250ms ease",
					background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, #ffffff2e, transparent 55%)`
				}
			}), /* @__PURE__ */ jsx("div", {
				style: {
					transform: "translateZ(28px)",
					transformStyle: "preserve-3d"
				},
				children
			})]
		})
	});
}
function PublicProfile() {
	const data = Route.useLoaderData();
	const profile = data.profile;
	const roles = data.roles || [];
	const theme = profile.theme ?? {};
	const socials = profile.socials ?? [];
	const links = data.links;
	const bg = theme.bg_color || "#0a0a0b";
	const bg2 = theme.bg_gradient_to || "#101318";
	const bgAngle = theme.bg_gradient_angle ?? 155;
	const text = theme.text_color || "#f5f5f5";
	const accent = theme.accent_color || "#22c55e";
	const accentGrad = `linear-gradient(120deg, ${accent}, ${theme.accent_gradient ? theme.accent_color_2 || "#38bdf8" : accent})`;
	const blur = theme.glass_blur ?? 18;
	const useGlass = theme.glass ?? true;
	const layout = theme.layout ?? "classic";
	const fontClass = FONT_CLASSES[theme.font_family ?? "space-grotesk"] ?? "font-family-space-grotesk";
	const splashFontClass = FONT_CLASSES[theme.splash_font ?? theme.font_family ?? "space-grotesk"] ?? fontClass;
	const effect = theme.effect ?? "none";
	const cursorEffect = theme.cursor_effect ?? "none";
	const textAnim = theme.text_animation ?? "none";
	const buttonStyle = theme.button_style ?? "rounded";
	const cursorStyle = theme.cursor_url ? { cursor: `url(${theme.cursor_url}) 4 4, auto` } : void 0;
	const splashEnabled = theme.splash_enabled ?? false;
	const entryTransition = theme.entry_transition ?? "fade";
	const [phase, setPhase] = useState(splashEnabled ? "splash" : "entered");
	const [clickOrigin, setClickOrigin] = useState({
		x: 50,
		y: 50
	});
	useEffect(() => setPhase(splashEnabled ? "splash" : "entered"), [splashEnabled]);
	const handleEnter = (e) => {
		if (phase !== "splash") return;
		const rect = e.currentTarget.getBoundingClientRect();
		setClickOrigin({
			x: (e.clientX - rect.left) / rect.width * 100,
			y: (e.clientY - rect.top) / rect.height * 100
		});
		setPhase("leaving");
		const duration = ENTRY_TRANSITION_DURATION[entryTransition] ?? 480;
		window.setTimeout(() => setPhase("entered"), duration);
	};
	const trackClick = async (linkId) => {
		try {
			await supabase.rpc("increment_link_click", { p_link_id: linkId });
		} catch {}
	};
	useEffect(() => {
		const sessionKey = `slugs:viewed:${profile.id}`;
		if (sessionStorage.getItem(sessionKey)) return;
		let cancelled = false;
		(async () => {
			try {
				const { data: { user } } = await supabase.auth.getUser();
				if (user?.id === profile.id) return;
				await supabase.rpc("increment_profile_view", { p_profile_id: profile.id });
				if (!cancelled) sessionStorage.setItem(sessionKey, "1");
			} catch (err) {
				console.warn("Profile view increment failed:", err);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [profile.id]);
	const pageBackground = theme.bg_gradient ? `linear-gradient(${bgAngle}deg, ${bg}, ${bg2})` : bg;
	if (phase !== "entered") {
		const sText = theme.splash_text_color || "#ffffff";
		const leaving = phase === "leaving";
		const splashBg = theme.splash_bg_color || "#000000";
		const splashBgUrl = theme.splash_bg_url || theme.bg_video_url;
		if (entryTransition === "curtain") {
			const panelBg = splashBgUrl ? `${splashBg}b3` : splashBg;
			return /* @__PURE__ */ jsxs("div", {
				style: cursorStyle,
				className: `fixed inset-0 z-50 ${splashFontClass}`,
				children: [
					splashBgUrl && /* @__PURE__ */ jsx(SplashBackgroundMedia, { url: splashBgUrl }),
					/* @__PURE__ */ jsx("div", {
						"aria-hidden": true,
						className: "absolute inset-y-0 left-0 z-0 w-1/2",
						style: {
							background: panelBg,
							...getCurtainPanelStyle("left", leaving)
						}
					}),
					/* @__PURE__ */ jsx("div", {
						"aria-hidden": true,
						className: "absolute inset-y-0 right-0 z-0 w-1/2",
						style: {
							background: panelBg,
							...getCurtainPanelStyle("right", leaving)
						}
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: handleEnter,
						disabled: leaving,
						"aria-label": theme.splash_text || "click to enter",
						className: "group relative z-10 flex h-full w-full flex-col items-center justify-center text-center",
						style: {
							backdropFilter: `blur(${theme.splash_blur ?? 0}px)`,
							opacity: leaving ? 0 : 1,
							transition: "opacity 200ms ease"
						},
						children: [/* @__PURE__ */ jsx(AnimatedText, {
							text: theme.splash_text || "click to enter",
							animation: theme.splash_animation ?? "none",
							className: "text-4xl font-black tracking-tight transition-transform duration-500 group-hover:scale-105 sm:text-6xl",
							style: {
								color: sText,
								filter: `drop-shadow(0 0 40px ${accent}80)`
							}
						}), theme.splash_subtext && /* @__PURE__ */ jsx("span", {
							className: "mt-4 text-sm uppercase tracking-[0.3em] opacity-50",
							style: { color: sText },
							children: theme.splash_subtext
						})]
					})
				]
			});
		}
		return /* @__PURE__ */ jsxs("button", {
			onClick: handleEnter,
			disabled: leaving,
			style: {
				...cursorStyle,
				background: splashBg,
				backdropFilter: `blur(${theme.splash_blur ?? 0}px)`,
				...getSplashLeaveStyle(entryTransition, leaving, clickOrigin)
			},
			className: `group fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden text-center ${splashFontClass}`,
			children: [splashBgUrl && /* @__PURE__ */ jsx(SplashBackgroundMedia, { url: splashBgUrl }), /* @__PURE__ */ jsxs("div", {
				className: "relative z-10 flex flex-col items-center",
				children: [/* @__PURE__ */ jsx(AnimatedText, {
					text: theme.splash_text || "click to enter",
					animation: theme.splash_animation ?? "none",
					className: "text-4xl font-black tracking-tight transition-transform duration-500 group-hover:scale-105 sm:text-6xl",
					style: {
						color: sText,
						filter: `drop-shadow(0 0 40px ${accent}80)`
					}
				}), theme.splash_subtext && /* @__PURE__ */ jsx("span", {
					className: "mt-4 text-sm uppercase tracking-[0.3em] opacity-50",
					style: { color: sText },
					children: theme.splash_subtext
				})]
			})]
		});
	}
	const isTerminal = layout === "terminal";
	const btnRadius = buttonStyle === "sharp" ? "rounded-none" : buttonStyle === "pill" ? "rounded-full" : "rounded-2xl";
	const leftAligned = layout === "split" || isTerminal || layout === "banner";
	const align = leftAligned ? "text-left" : "text-center";
	const Avatar = ({ size }) => {
		if (!profile.avatar_url) return null;
		const isVideoAvatar = /\.(mp4|webm)(\?.*)?$/i.test(profile.avatar_url);
		return /* @__PURE__ */ jsx("div", {
			className: `shrink-0 overflow-hidden ${isTerminal ? "rounded-md" : "rounded-full"}`,
			style: {
				height: size,
				width: size,
				padding: 2,
				background: accentGrad
			},
			children: /* @__PURE__ */ jsx("div", {
				className: "h-full w-full overflow-hidden",
				style: {
					borderRadius: "inherit",
					background: bg
				},
				children: isVideoAvatar ? /* @__PURE__ */ jsx("video", {
					src: profile.avatar_url,
					autoPlay: true,
					loop: true,
					muted: true,
					playsInline: true,
					className: "h-full w-full object-cover"
				}) : /* @__PURE__ */ jsx("img", {
					src: profile.avatar_url,
					alt: profile.username,
					className: "h-full w-full object-cover"
				})
			})
		});
	};
	const Name = /* @__PURE__ */ jsxs("h1", {
		className: `flex items-center gap-2 tracking-tight ${layout === "hero" ? "text-5xl font-black sm:text-7xl" : layout === "minimal" ? "text-3xl font-medium" : layout === "compact" ? "text-3xl font-semibold" : isTerminal ? "text-2xl font-bold" : layout === "banner" ? "text-4xl font-bold sm:text-5xl" : "text-4xl font-light sm:text-5xl"} ${leftAligned ? "justify-start" : "justify-center"}`,
		style: theme.name_font_size ? { fontSize: theme.name_font_size } : void 0,
		children: [/* @__PURE__ */ jsx(AnimatedText, {
			text: profile.display_name || profile.username,
			animation: textAnim,
			style: {
				color: text,
				filter: `drop-shadow(0 0 34px ${accent}40)`
			}
		}), profile.is_exclusive && /* @__PURE__ */ jsx(BadgeCheck, {
			className: "h-6 w-6 shrink-0",
			style: { color: accent },
			"aria-label": "Exclusive"
		})]
	});
	const Handle = /* @__PURE__ */ jsxs("p", {
		className: `mt-1 font-mono text-xs uppercase tracking-[0.24em] ${align}`,
		style: { color: `${text}70` },
		children: ["@", profile.username]
	});
	const badgeSize = theme.badge_size ?? 20;
	const badgeGap = theme.badge_gap ?? 8;
	const BadgesRow = roles.length > 0 ? /* @__PURE__ */ jsx("div", {
		className: `mt-2 flex flex-wrap items-center ${leftAligned ? "justify-start" : "justify-center"}`,
		style: { gap: badgeGap },
		children: roles.map((role) => /* @__PURE__ */ jsx(RoleBadge, {
			role,
			size: badgeSize
		}, role.id))
	}) : null;
	const viewsEnabled = theme.views_counter_enabled ?? true;
	const viewsStyle = theme.views_counter_style ?? "minimal";
	const viewsSize = theme.views_counter_size ?? 12;
	const viewsColor = theme.views_counter_color || void 0;
	const Views = viewsEnabled ? /* @__PURE__ */ jsx("div", {
		className: `mt-2 flex ${leftAligned ? "justify-start" : "justify-center"}`,
		children: /* @__PURE__ */ jsxs("span", {
			className: `inline-flex items-center gap-1 leading-none ${viewsStyle === "badge" ? "rounded-md" : viewsStyle === "pill" ? "rounded-full border" : ""}`,
			style: {
				fontSize: viewsSize,
				padding: viewsStyle === "minimal" ? 0 : `${viewsSize * .35}px ${viewsSize * .6}px`,
				color: viewsColor || (viewsStyle === "minimal" ? `${text}70` : text),
				background: viewsStyle === "badge" ? `${accent}1c` : viewsStyle === "pill" ? `${text}0d` : void 0,
				borderColor: viewsStyle === "pill" ? `${text}22` : void 0
			},
			children: [/* @__PURE__ */ jsx(Eye, { style: {
				height: viewsSize * 1.15,
				width: viewsSize * 1.15
			} }), formatViews(profile.view_count ?? 0)]
		})
	}) : null;
	const Bio = profile.bio ? /* @__PURE__ */ jsx("p", {
		className: `mt-3 text-base font-light leading-relaxed ${align} ${leftAligned ? "" : "mx-auto max-w-md"}`,
		style: {
			color: `${text}b0`,
			...theme.bio_font_size ? { fontSize: theme.bio_font_size } : {}
		},
		children: profile.bio
	}) : null;
	const TypewriterLine = theme.typewriter_enabled && (theme.typewriter_phrases?.length ?? 0) > 0 ? /* @__PURE__ */ jsx("div", {
		className: `mt-2 text-sm font-medium ${align}`,
		style: { color: theme.typewriter_color || accent },
		children: /* @__PURE__ */ jsx(Typewriter, {
			phrases: theme.typewriter_phrases,
			speed: theme.typewriter_speed ?? 60,
			pause: theme.typewriter_pause ?? 1400,
			color: theme.typewriter_color || void 0
		})
	}) : null;
	const Socials = socials.length > 0 ? /* @__PURE__ */ jsx("div", {
		className: `mt-6 flex flex-wrap items-center gap-5 ${leftAligned ? "justify-start" : "justify-center"}`,
		children: socials.map((s, i) => {
			const Icon = SOCIAL_ICONS[s.platform.toLowerCase()] || Globe;
			return /* @__PURE__ */ jsx("a", {
				href: normalizeSocialUrl(s.platform, s.url),
				target: "_blank",
				rel: "noopener noreferrer",
				title: s.label || s.platform,
				className: "transition-transform duration-200 hover:-translate-y-1 hover:scale-110",
				style: {
					color: text,
					filter: `drop-shadow(0 0 8px ${accent}66)`
				},
				children: /* @__PURE__ */ jsx(Icon, {
					className: layout === "hero" ? "h-7 w-7" : "h-6 w-6",
					strokeWidth: 1.6
				})
			}, i);
		})
	}) : null;
	const linkWrapClass = layout === "grid" ? "grid grid-cols-2 gap-3 sm:grid-cols-3" : layout === "compact" ? "grid grid-cols-1 gap-2 sm:grid-cols-2" : layout === "stack" ? "space-y-3" : "space-y-2.5";
	const Links = links.length > 0 ? /* @__PURE__ */ jsx("div", {
		className: `mt-7 ${linkWrapClass}`,
		children: links.map((link) => {
			const tile = layout === "grid";
			return /* @__PURE__ */ jsxs("a", {
				href: normalizeExternalUrl(link.url),
				target: "_blank",
				rel: "noopener noreferrer",
				onClick: () => trackClick(link.id),
				className: `group relative flex overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${tile ? "flex-col items-start justify-between gap-6 px-4 py-5" : "items-center justify-between px-5"} ${layout === "stack" ? "py-5 text-base" : tile ? "" : "py-3.5 text-sm"} ${isTerminal ? "rounded-none border font-mono" : btnRadius}`,
				style: {
					color: text,
					background: isTerminal ? "rgba(0,0,0,0.4)" : buttonStyle === "outline" ? "transparent" : `linear-gradient(180deg, ${text}14, ${text}08)`,
					border: `1px solid ${buttonStyle === "outline" ? accent : `${text}22`}`,
					boxShadow: layout === "neon" ? `0 0 18px ${accent}35, inset 0 0 12px ${accent}15` : void 0,
					...theme.link_font_size ? { fontSize: theme.link_font_size } : {}
				},
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity group-hover:opacity-100",
						style: { background: accentGrad }
					}),
					/* @__PURE__ */ jsx("span", {
						className: "truncate font-medium",
						children: isTerminal ? `> ${link.title}` : link.title
					}),
					/* @__PURE__ */ jsx(ArrowUpRight, {
						className: "h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
						style: { color: accent }
					})
				]
			}, link.id);
		})
	}) : null;
	const floatingAudioEnabled = (theme.audio_widget_enabled ?? true) && !!theme.bg_audio_url;
	const Audio = theme.bg_audio_url && !floatingAudioEnabled ? /* @__PURE__ */ jsx("div", {
		className: "mt-6",
		children: /* @__PURE__ */ jsx(AudioVisualizer, {
			src: theme.bg_audio_url,
			accent,
			volume: theme.audio_volume ?? .5,
			autoplay: theme.audio_autoplay ?? true,
			mode: theme.visualizer ?? "bars",
			floatingWidget: false,
			widgetStyle: theme.audio_widget_style ?? "default",
			widgetSize: theme.audio_widget_size ?? 40,
			widgetShape: theme.audio_widget_shape ?? "circle",
			widgetColor: theme.audio_widget_color || void 0,
			visualizerColor: theme.visualizer_color || void 0
		})
	}) : null;
	const FloatingAudio = floatingAudioEnabled ? /* @__PURE__ */ jsx(AudioVisualizer, {
		src: theme.bg_audio_url,
		accent,
		volume: theme.audio_volume ?? .5,
		autoplay: theme.audio_autoplay ?? true,
		mode: theme.visualizer ?? "bars",
		floatingWidget: true,
		widgetPosition: theme.audio_widget_position ?? "top-left",
		widgetStyle: theme.audio_widget_style ?? "default",
		widgetSize: theme.audio_widget_size ?? 40,
		widgetShape: theme.audio_widget_shape ?? "circle",
		widgetColor: theme.audio_widget_color || void 0,
		visualizerColor: theme.visualizer_color || void 0
	}) : null;
	const Footer = /* @__PURE__ */ jsxs("div", {
		className: "mt-8 flex items-center justify-between border-t pt-4 text-[11px]",
		style: {
			color: `${text}55`,
			borderColor: `${text}14`
		},
		children: [/* @__PURE__ */ jsxs("span", {
			className: "inline-flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ jsx(Eye, { className: "h-3.5 w-3.5" }),
				" @",
				profile.username
			]
		}), /* @__PURE__ */ jsx("span", {
			className: "uppercase tracking-[0.2em]",
			children: "slugs.lol"
		})]
	});
	let body;
	if (layout === "hero") body = /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center",
		children: [/* @__PURE__ */ jsx(Avatar, { size: 132 }), /* @__PURE__ */ jsxs("div", {
			className: "mt-6 w-full",
			children: [
				Name,
				Handle,
				BadgesRow,
				Views,
				Bio,
				TypewriterLine,
				Socials,
				Links,
				Audio,
				Footer
			]
		})]
	});
	else if (layout === "minimal") body = /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center",
		children: [/* @__PURE__ */ jsx(Avatar, { size: 64 }), /* @__PURE__ */ jsxs("div", {
			className: "mt-4 w-full",
			children: [
				Name,
				Handle,
				BadgesRow,
				Views,
				Bio,
				TypewriterLine,
				Socials,
				Links,
				Audio
			]
		})]
	});
	else if (layout === "compact") body = /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ jsx(Avatar, { size: 64 }), /* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1 text-left",
				children: [/* @__PURE__ */ jsx("div", {
					className: "truncate text-2xl font-semibold",
					style: { color: text },
					children: profile.display_name || profile.username
				}), /* @__PURE__ */ jsxs("div", {
					className: "truncate font-mono text-[11px] uppercase tracking-[0.2em]",
					style: { color: `${text}70` },
					children: ["@", profile.username]
				})]
			})]
		}),
		BadgesRow,
		Views,
		Bio,
		TypewriterLine,
		Socials,
		Links,
		Audio,
		Footer
	] });
	else if (layout === "split") body = /* @__PURE__ */ jsxs("div", {
		className: "grid gap-10 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Avatar, { size: 88 }), /* @__PURE__ */ jsxs("div", {
			className: "mt-5",
			children: [
				Name,
				Handle,
				BadgesRow,
				Views,
				Bio,
				TypewriterLine,
				Socials,
				Audio
			]
		})] }), /* @__PURE__ */ jsxs("div", {
			className: "sm:border-l sm:pl-8",
			style: { borderColor: `${text}14` },
			children: [Links, Footer]
		})]
	});
	else if (layout === "banner") body = /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("div", {
			className: "-mx-6 -mt-10 h-36 sm:-mx-12 sm:-mt-12",
			style: { background: `linear-gradient(120deg, ${accent}66, transparent 70%), ${bg2}` }
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "-mt-12 flex items-end gap-4",
			children: [/* @__PURE__ */ jsx(Avatar, { size: 96 }), /* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1 pb-1",
				children: [
					Name,
					Handle,
					BadgesRow,
					Views
				]
			})]
		}),
		Bio,
		TypewriterLine,
		Socials,
		Links,
		Audio,
		Footer
	] });
	else if (isTerminal) body = /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "mb-5 flex items-center gap-1.5",
			children: [[
				"#ff5f56",
				"#ffbd2e",
				"#27c93f"
			].map((c) => /* @__PURE__ */ jsx("span", {
				className: "h-3 w-3 rounded-full",
				style: { background: c }
			}, c)), /* @__PURE__ */ jsxs("span", {
				className: "ml-3 font-mono text-[11px]",
				style: { color: `${text}55` },
				children: [profile.username, "@slugs ~ %"]
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mb-2 font-mono text-xs",
			style: { color: accent },
			children: "$ whoami"
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ jsx(Avatar, { size: 56 }), /* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [
					Name,
					Handle,
					BadgesRow,
					Views
				]
			})]
		}),
		Bio,
		TypewriterLine,
		/* @__PURE__ */ jsx("div", {
			className: "mt-6 font-mono text-xs",
			style: { color: accent },
			children: "$ ls ./links"
		}),
		Links,
		Socials,
		Audio,
		Footer
	] });
	else if (layout === "grid") body = /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center",
		children: [/* @__PURE__ */ jsx(Avatar, { size: 80 }), /* @__PURE__ */ jsxs("div", {
			className: "mt-5 w-full",
			children: [
				Name,
				Handle,
				BadgesRow,
				Views,
				Bio,
				TypewriterLine,
				Socials,
				Links,
				Audio,
				Footer
			]
		})]
	});
	else if (layout === "tilt3d") body = /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center",
		children: [/* @__PURE__ */ jsx(Avatar, { size: 92 }), /* @__PURE__ */ jsxs("div", {
			className: "mt-5 w-full",
			children: [
				Name,
				Handle,
				BadgesRow,
				Views,
				Bio,
				TypewriterLine,
				Socials,
				Links,
				Audio,
				Footer
			]
		})]
	});
	else body = /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center",
		children: [/* @__PURE__ */ jsx(Avatar, { size: layout === "neon" ? 96 : 84 }), /* @__PURE__ */ jsxs("div", {
			className: "mt-5 w-full",
			children: [
				Name,
				Handle,
				BadgesRow,
				Views,
				Bio,
				TypewriterLine,
				Socials,
				Links,
				Audio,
				Footer
			]
		})]
	});
	const glassCard = useGlass && layout !== "minimal";
	const isTilt3d = layout === "tilt3d";
	const cardClass = [
		"relative overflow-hidden px-6 py-10 sm:px-12 sm:py-12",
		glassCard ? "rounded-3xl" : "",
		layout === "neon" ? "rounded-3xl" : "",
		isTilt3d ? "rounded-3xl" : "",
		isTerminal ? "rounded-xl font-mono" : ""
	].join(" ");
	const cardStyle = {
		...glassCard ? {
			backdropFilter: `blur(${blur}px) saturate(150%)`,
			background: `linear-gradient(180deg, ${text}12, ${text}05)`,
			border: `1px solid ${text}1f`,
			boxShadow: `0 30px 80px -30px #000`
		} : {},
		...layout === "neon" ? {
			border: `2px solid ${accent}`,
			boxShadow: `0 0 44px ${accent}45, inset 0 0 44px ${accent}18`
		} : {},
		...isTerminal ? {
			background: "rgba(0,0,0,0.78)",
			border: `1px solid ${text}25`,
			backdropFilter: "blur(6px)"
		} : {},
		...isTilt3d ? {
			backdropFilter: `blur(${blur}px) saturate(150%)`,
			background: `linear-gradient(180deg, ${text}14, ${text}06)`,
			border: `1px solid ${text}22`,
			boxShadow: `0 20px 50px -25px #000`
		} : {}
	};
	const maxW = layout === "split" ? "max-w-4xl" : layout === "hero" || layout === "banner" || layout === "grid" ? "max-w-3xl" : layout === "minimal" ? "max-w-lg" : "max-w-xl";
	const justEntered = splashEnabled && entryTransition !== "none";
	return /* @__PURE__ */ jsxs("div", {
		className: `relative flex min-h-screen items-center justify-center overflow-hidden p-4 ${fontClass}`,
		style: {
			background: pageBackground,
			color: text,
			...cursorStyle,
			...justEntered ? { animation: `slugs-entry-in ${Math.min(500, ENTRY_TRANSITION_DURATION[entryTransition] ?? 480)}ms cubic-bezier(0.16,1,0.3,1) both` } : {}
		},
		children: [
			justEntered && /* @__PURE__ */ jsx("style", { children: `@keyframes slugs-entry-in { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }` }),
			theme.bg_video_url && (/\.(mp4|webm)(\?.*)?$/i.test(theme.bg_video_url) ? /* @__PURE__ */ jsx(BackgroundVideo, {
				url: theme.bg_video_url,
				className: "pointer-events-none fixed inset-0 h-full w-full object-cover"
			}) : /* @__PURE__ */ jsx("img", {
				src: theme.bg_video_url,
				alt: "",
				className: "pointer-events-none fixed inset-0 h-full w-full object-cover"
			})),
			/* @__PURE__ */ jsx(ProfileEffects, {
				effect,
				accent
			}),
			/* @__PURE__ */ jsx(CursorEffects, {
				effect: cursorEffect,
				accent
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pointer-events-none fixed inset-0 z-[1]",
				style: { background: `radial-gradient(ellipse at 50% 0%, ${accent}12, transparent 60%), rgba(0,0,0,0.3)` }
			}),
			/* @__PURE__ */ jsx("main", {
				className: `relative z-10 w-full ${maxW}`,
				children: isTilt3d ? /* @__PURE__ */ jsx(TiltCard, {
					accent,
					className: cardClass,
					style: cardStyle,
					children: body
				}) : /* @__PURE__ */ jsx("div", {
					className: cardClass,
					style: cardStyle,
					children: body
				})
			}),
			FloatingAudio
		]
	});
}
//#endregion
export { PublicProfile as component };
