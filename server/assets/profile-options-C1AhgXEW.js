import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/AnimatedText.tsx
var PER_CHAR = /* @__PURE__ */ new Set([
	"wave",
	"bounce",
	"jitter",
	"flip",
	"pop"
]);
function AnimatedText({ text, animation, className, style, children }) {
	const fallbackText = text ?? (typeof children === "string" ? children : void 0);
	const chars = useMemo(() => text && PER_CHAR.has(animation) ? text.split("") : null, [text, animation]);
	if (!animation || animation === "none") return /* @__PURE__ */ jsx("span", {
		className,
		style,
		children: children ?? text
	});
	if (chars) return /* @__PURE__ */ jsx("span", {
		className,
		style,
		children: chars.map((ch, i) => /* @__PURE__ */ jsx("span", {
			className: `inline-block txt-${animation}`,
			style: { animationDelay: `${i * .06}s` },
			children: ch === " " ? "\xA0" : ch
		}, i))
	});
	return /* @__PURE__ */ jsx("span", {
		className: `txt-${animation} ${className ?? ""}`,
		style,
		"data-text": fallbackText,
		children: children ?? text
	});
}
//#endregion
//#region src/lib/profile-options.ts
var COLOR_PRESETS = [
	"#000000",
	"#0a0a0b",
	"#101318",
	"#1b1120",
	"#0b1a14",
	"#ffffff",
	"#f5f5f5",
	"#c9d1d9",
	"#8b949e",
	"#22c55e",
	"#00ffa3",
	"#38bdf8",
	"#6366f1",
	"#a855f7",
	"#ec4899",
	"#ef4444",
	"#f97316",
	"#facc15"
];
var GRADIENT_PRESETS = [
	{
		label: "Toxic",
		from: "#0a0a0b",
		to: "#0b2a1c",
		angle: 160
	},
	{
		label: "Midnight",
		from: "#05060a",
		to: "#131a2e",
		angle: 150
	},
	{
		label: "Ultraviolet",
		from: "#0b0713",
		to: "#2a1044",
		angle: 140
	},
	{
		label: "Ember",
		from: "#0d0705",
		to: "#3a1206",
		angle: 155
	},
	{
		label: "Ice",
		from: "#050a0f",
		to: "#0d2a3a",
		angle: 165
	},
	{
		label: "Rose noir",
		from: "#0a0509",
		to: "#330d24",
		angle: 145
	}
];
var LAYOUTS = [
	{
		id: "classic",
		label: "Classic",
		hint: "Glass card, stacked links"
	},
	{
		id: "minimal",
		label: "Minimal",
		hint: "No card, tight typography"
	},
	{
		id: "hero",
		label: "Hero",
		hint: "Big avatar above the fold"
	},
	{
		id: "compact",
		label: "Compact",
		hint: "Dense two-column links"
	},
	{
		id: "grid",
		label: "Grid",
		hint: "Tile grid of links"
	},
	{
		id: "split",
		label: "Split",
		hint: "Identity left, links right"
	},
	{
		id: "banner",
		label: "Banner",
		hint: "Wide cover strip on top"
	},
	{
		id: "terminal",
		label: "Terminal",
		hint: "Monospace console window"
	},
	{
		id: "neon",
		label: "Neon",
		hint: "Glowing accent frame"
	},
	{
		id: "stack",
		label: "Card stack",
		hint: "Each link its own card"
	},
	{
		id: "tilt3d",
		label: "3D tilt",
		hint: "Floating card that tilts toward your cursor"
	}
];
var ENTRY_TRANSITIONS = [
	{
		id: "none",
		label: "None",
		hint: "Instant swap, no animation"
	},
	{
		id: "fade",
		label: "Fade",
		hint: "Splash fades out, page fades in"
	},
	{
		id: "zoom",
		label: "Zoom",
		hint: "Splash zooms out as the page zooms in"
	},
	{
		id: "slide-up",
		label: "Slide up",
		hint: "Splash slides up off screen"
	},
	{
		id: "slide-down",
		label: "Slide down",
		hint: "Splash slides down off screen"
	},
	{
		id: "curtain",
		label: "Curtain",
		hint: "Splash splits open like curtains"
	},
	{
		id: "iris",
		label: "Iris",
		hint: "Circular reveal from where you clicked"
	},
	{
		id: "blur-out",
		label: "Blur out",
		hint: "Splash blurs away into the page"
	},
	{
		id: "glitch-cut",
		label: "Glitch cut",
		hint: "Quick glitchy flicker cut to the page"
	}
];
/** How long (ms) the leave animation runs before the splash unmounts. "curtain" uses two panels — see getCurtainPanelStyle. */
var ENTRY_TRANSITION_DURATION = {
	none: 0,
	fade: 480,
	zoom: 550,
	"slide-up": 550,
	"slide-down": 550,
	curtain: 650,
	iris: 650,
	"blur-out": 550,
	"glitch-cut": 260
};
/**
* Style for the splash overlay while it's leaving. `origin` is the click
* point as a percentage of the viewport, used by the iris transition.
* "curtain" is handled separately via getCurtainPanelStyle since it needs
* two independent panels rather than one element.
*/
function getSplashLeaveStyle(transition, leaving, origin = {
	x: 50,
	y: 50
}) {
	const dur = ENTRY_TRANSITION_DURATION[transition] ?? 480;
	const base = { transition: `opacity ${dur}ms ease, transform ${dur}ms cubic-bezier(0.16,1,0.3,1), filter ${dur}ms ease, clip-path ${dur}ms cubic-bezier(0.16,1,0.3,1)` };
	if (!leaving) return {
		...base,
		opacity: 1,
		transform: "none",
		filter: "none",
		clipPath: "none"
	};
	switch (transition) {
		case "none": return {
			opacity: 0,
			transition: "none"
		};
		case "zoom": return {
			...base,
			opacity: 0,
			transform: "scale(1.18)"
		};
		case "slide-up": return {
			...base,
			opacity: 0,
			transform: "translateY(-100%)"
		};
		case "slide-down": return {
			...base,
			opacity: 0,
			transform: "translateY(100%)"
		};
		case "blur-out": return {
			...base,
			opacity: 0,
			filter: "blur(28px)",
			transform: "scale(1.06)"
		};
		case "glitch-cut": return {
			...base,
			transition: `opacity ${dur}ms steps(5, end)`,
			opacity: 0
		};
		case "iris": return {
			...base,
			clipPath: `circle(0% at ${origin.x}% ${origin.y}%)`
		};
		case "curtain": return {
			...base,
			opacity: 1
		};
		default: return {
			...base,
			opacity: 0
		};
	}
}
/** Left/right panel styles for the "curtain" transition — call once per side. */
function getCurtainPanelStyle(side, leaving) {
	return {
		transition: `transform ${ENTRY_TRANSITION_DURATION.curtain}ms cubic-bezier(0.76,0,0.24,1)`,
		transform: leaving ? `translateX(${side === "left" ? "-101%" : "101%"})` : "translateX(0)"
	};
}
var EFFECTS = [
	{
		id: "none",
		label: "None"
	},
	{
		id: "starfield",
		label: "Starfield"
	},
	{
		id: "sparkles",
		label: "Sparkles"
	},
	{
		id: "rain",
		label: "Rain"
	},
	{
		id: "grid",
		label: "Grid"
	},
	{
		id: "aurora",
		label: "Aurora"
	},
	{
		id: "snow",
		label: "Snow"
	},
	{
		id: "bubbles",
		label: "Bubbles"
	},
	{
		id: "matrix",
		label: "Matrix"
	},
	{
		id: "confetti",
		label: "Confetti"
	},
	{
		id: "fireflies",
		label: "Fireflies"
	},
	{
		id: "embers",
		label: "Embers"
	},
	{
		id: "petals",
		label: "Petals"
	},
	{
		id: "fog",
		label: "Fog"
	},
	{
		id: "lightning",
		label: "Lightning"
	}
];
var CURSOR_EFFECTS = [
	{
		id: "none",
		label: "None"
	},
	{
		id: "trail",
		label: "Trail"
	},
	{
		id: "sparkle",
		label: "Sparkle"
	},
	{
		id: "glow",
		label: "Glow"
	},
	{
		id: "ring",
		label: "Ring"
	},
	{
		id: "dot",
		label: "Dot"
	},
	{
		id: "particles",
		label: "Particles"
	},
	{
		id: "hearts",
		label: "Hearts"
	},
	{
		id: "stars",
		label: "Stars"
	},
	{
		id: "ripple",
		label: "Ripple"
	},
	{
		id: "rainbow",
		label: "Rainbow"
	}
];
var TEXT_ANIMATIONS = [
	{
		id: "none",
		label: "None"
	},
	{
		id: "fade",
		label: "Fade in"
	},
	{
		id: "slide-up",
		label: "Slide up"
	},
	{
		id: "slide-down",
		label: "Slide down"
	},
	{
		id: "slide-left",
		label: "Slide left"
	},
	{
		id: "slide-right",
		label: "Slide right"
	},
	{
		id: "zoom",
		label: "Zoom in"
	},
	{
		id: "bounce",
		label: "Bounce"
	},
	{
		id: "shake",
		label: "Shake"
	},
	{
		id: "glitch",
		label: "Glitch"
	},
	{
		id: "wave",
		label: "Wave"
	},
	{
		id: "neon",
		label: "Neon"
	},
	{
		id: "rainbow",
		label: "Rainbow"
	},
	{
		id: "gradient-flow",
		label: "Gradient flow"
	},
	{
		id: "blur-in",
		label: "Blur in"
	},
	{
		id: "flip",
		label: "Flip"
	},
	{
		id: "rotate",
		label: "Rotate in"
	},
	{
		id: "pulse",
		label: "Pulse"
	},
	{
		id: "float",
		label: "Float"
	},
	{
		id: "jitter",
		label: "Jitter"
	},
	{
		id: "pop",
		label: "Pop"
	},
	{
		id: "tracking-in",
		label: "Tracking in"
	},
	{
		id: "skew",
		label: "Skew"
	},
	{
		id: "glow-pulse",
		label: "Glow pulse"
	},
	{
		id: "swing",
		label: "Swing"
	},
	{
		id: "flicker",
		label: "Flicker"
	}
];
var FONTS = [
	{
		id: "inter",
		label: "Inter",
		className: "font-family-inter"
	},
	{
		id: "space-grotesk",
		label: "Space Grotesk",
		className: "font-family-space-grotesk"
	},
	{
		id: "jetbrains",
		label: "JetBrains Mono",
		className: "font-family-jetbrains"
	},
	{
		id: "instrument",
		label: "Instrument Serif",
		className: "font-family-instrument"
	},
	{
		id: "cormorant",
		label: "Cormorant",
		className: "font-family-cormorant"
	},
	{
		id: "bebas",
		label: "Bebas Neue",
		className: "font-family-bebas"
	},
	{
		id: "syne",
		label: "Syne",
		className: "font-family-syne"
	},
	{
		id: "dm-serif",
		label: "DM Serif",
		className: "font-family-dm-serif"
	},
	{
		id: "poppins",
		label: "Poppins",
		className: "font-family-poppins"
	},
	{
		id: "montserrat",
		label: "Montserrat",
		className: "font-family-montserrat"
	},
	{
		id: "playfair",
		label: "Playfair Display",
		className: "font-family-playfair"
	},
	{
		id: "oswald",
		label: "Oswald",
		className: "font-family-oswald"
	},
	{
		id: "raleway",
		label: "Raleway",
		className: "font-family-raleway"
	},
	{
		id: "rubik",
		label: "Rubik",
		className: "font-family-rubik"
	},
	{
		id: "lato",
		label: "Lato",
		className: "font-family-lato"
	},
	{
		id: "nunito",
		label: "Nunito",
		className: "font-family-nunito"
	},
	{
		id: "quicksand",
		label: "Quicksand",
		className: "font-family-quicksand"
	},
	{
		id: "josefin",
		label: "Josefin Sans",
		className: "font-family-josefin"
	},
	{
		id: "anton",
		label: "Anton",
		className: "font-family-anton"
	},
	{
		id: "righteous",
		label: "Righteous",
		className: "font-family-righteous"
	},
	{
		id: "orbitron",
		label: "Orbitron",
		className: "font-family-orbitron"
	},
	{
		id: "press-start",
		label: "Press Start 2P",
		className: "font-family-press-start"
	},
	{
		id: "vt323",
		label: "VT323",
		className: "font-family-vt323"
	},
	{
		id: "great-vibes",
		label: "Great Vibes",
		className: "font-family-great-vibes"
	},
	{
		id: "pacifico",
		label: "Pacifico",
		className: "font-family-pacifico"
	},
	{
		id: "lobster",
		label: "Lobster",
		className: "font-family-lobster"
	},
	{
		id: "caveat",
		label: "Caveat",
		className: "font-family-caveat"
	},
	{
		id: "sora",
		label: "Sora",
		className: "font-family-sora"
	},
	{
		id: "outfit",
		label: "Outfit",
		className: "font-family-outfit"
	}
];
var FONT_CLASSES = Object.fromEntries(FONTS.map((f) => [f.id, f.className]));
var BUTTON_STYLES = [
	{
		id: "rounded",
		label: "Rounded"
	},
	{
		id: "sharp",
		label: "Sharp"
	},
	{
		id: "pill",
		label: "Pill"
	},
	{
		id: "outline",
		label: "Outline"
	}
];
var VISUALIZERS = [
	{
		id: "none",
		label: "Off"
	},
	{
		id: "bars",
		label: "Bars"
	},
	{
		id: "bars-mirror",
		label: "Mirror bars"
	},
	{
		id: "bars-dots",
		label: "Dot bars"
	},
	{
		id: "bars-center",
		label: "Center bars"
	},
	{
		id: "bars-glow",
		label: "Glow bars"
	}
];
var AUDIO_WIDGET_STYLES = [{
	id: "default",
	label: "Default",
	hint: "Play/pause pill with visualizer"
}, {
	id: "bar-slider",
	label: "Bar slider",
	hint: "Hover to reveal a volume bar"
}];
/**
* Premium gating: which option ids in each picker require is_premium.
* Anything NOT listed here stays free. Edit these sets to change what's
* locked — nothing else in the app needs to change.
*/
var PREMIUM_EFFECTS = [
	"rain",
	"aurora",
	"snow",
	"bubbles",
	"matrix",
	"confetti",
	"fireflies",
	"embers",
	"petals",
	"fog",
	"lightning"
];
var PREMIUM_CURSOR_EFFECTS = [
	"trail",
	"sparkle",
	"ring",
	"particles",
	"hearts",
	"stars",
	"ripple",
	"rainbow"
];
var PREMIUM_TEXT_ANIMATIONS = [
	"bounce",
	"shake",
	"glitch",
	"wave",
	"neon",
	"rainbow",
	"gradient-flow",
	"blur-in",
	"flip",
	"rotate",
	"pulse",
	"float",
	"jitter",
	"pop",
	"tracking-in",
	"skew",
	"glow-pulse",
	"swing",
	"flicker"
];
var PREMIUM_LAYOUTS = [
	"hero",
	"grid",
	"split",
	"banner",
	"terminal",
	"neon",
	"stack",
	"tilt3d"
];
var PREMIUM_ENTRY_TRANSITIONS = [
	"zoom",
	"slide-up",
	"slide-down",
	"curtain",
	"iris",
	"blur-out",
	"glitch-cut"
];
function isPremiumLockedOption(category, id) {
	switch (category) {
		case "effect": return PREMIUM_EFFECTS.includes(id);
		case "cursor": return PREMIUM_CURSOR_EFFECTS.includes(id);
		case "text_animation": return PREMIUM_TEXT_ANIMATIONS.includes(id);
		case "layout": return PREMIUM_LAYOUTS.includes(id);
		case "entry_transition": return PREMIUM_ENTRY_TRANSITIONS.includes(id);
		default: return false;
	}
}
//#endregion
export { AnimatedText as _, EFFECTS as a, FONTS as c, LAYOUTS as d, TEXT_ANIMATIONS as f, isPremiumLockedOption as g, getSplashLeaveStyle as h, CURSOR_EFFECTS as i, FONT_CLASSES as l, getCurtainPanelStyle as m, BUTTON_STYLES as n, ENTRY_TRANSITIONS as o, VISUALIZERS as p, COLOR_PRESETS as r, ENTRY_TRANSITION_DURATION as s, AUDIO_WIDGET_STYLES as t, GRADIENT_PRESETS as u };
