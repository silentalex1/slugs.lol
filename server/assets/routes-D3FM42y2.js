import { t as supabase } from "./client-Cc5YU_PK.js";
import { t as BrandMark } from "./BrandMark-CJYzd0JD.js";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, BarChart3, LayoutGrid, LayoutTemplate, Link2, MousePointer2, Music4, Sparkles } from "lucide-react";
//#region src/components/VerifiedMarquee.tsx
var VERIFIED_USERS = [
	{
		name: "brennen",
		slug: "brennen",
		avatar: "/avatars/brennen.png"
	},
	{
		name: "jah",
		slug: "jah",
		avatar: "/avatars/jah.png"
	},
	{
		name: "dior",
		slug: "d",
		avatar: "/avatars/dior.png"
	},
	{
		name: "naz",
		slug: "naz",
		avatar: "/avatars/naz.png"
	},
	{
		name: "acid",
		slug: "a",
		avatar: "/avatars/acid.png"
	},
	{
		name: "cas",
		slug: "cas",
		avatar: "/avatars/cas.png"
	}
];
function Avatar({ user }) {
	const [broken, setBroken] = useState(false);
	return /* @__PURE__ */ jsxs("span", {
		className: "relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-white/10 bg-surface/70 text-xs font-black uppercase text-primary",
		children: [user.name.charAt(0), !broken && /* @__PURE__ */ jsx("img", {
			src: user.avatar,
			alt: "",
			loading: "lazy",
			className: "absolute inset-0 h-full w-full object-cover",
			onError: (e) => {
				setBroken(true);
			}
		})]
	});
}
function VerifiedBadge() {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		className: "h-3.5 w-3.5 shrink-0 text-primary",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", {
			fill: "currentColor",
			d: "M12 1.6l2.2 2.1 3-.3.9 2.9 2.7 1.4-1.1 2.8 1.1 2.8-2.7 1.4-.9 2.9-3-.3L12 20.4l-2.2-2.1-3 .3-.9-2.9L3.2 14.3l1.1-2.8-1.1-2.8 2.7-1.4.9-2.9 3 .3L12 1.6z"
		}), /* @__PURE__ */ jsx("path", {
			fill: "var(--background)",
			d: "M10.9 14.6l-2.7-2.7 1.2-1.2 1.5 1.5 3.7-3.7 1.2 1.2-4.9 4.9z"
		})]
	});
}
function Chip({ user }) {
	return /* @__PURE__ */ jsxs(Link, {
		to: "/$username",
		params: { username: user.slug },
		className: "ring-focus group mx-2 flex shrink-0 items-center gap-3 rounded-full border border-white/[0.07] bg-surface/40 px-3.5 py-2 backdrop-blur-xl transition-colors hover:border-primary/35 hover:bg-surface/70",
		children: [/* @__PURE__ */ jsx(Avatar, { user }), /* @__PURE__ */ jsxs("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ jsx("span", {
					className: "truncate text-[13px] font-black tracking-tight text-foreground",
					children: user.name
				}), /* @__PURE__ */ jsx(VerifiedBadge, {})]
			}), /* @__PURE__ */ jsxs("span", {
				className: "block truncate font-mono text-[11px] text-muted-foreground",
				children: ["/", user.slug]
			})]
		})]
	});
}
function VerifiedMarquee() {
	const lane = [
		...VERIFIED_USERS,
		...VERIFIED_USERS,
		...VERIFIED_USERS,
		...VERIFIED_USERS
	];
	return /* @__PURE__ */ jsxs("div", {
		className: "relative overflow-hidden py-2",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "marquee-track",
				children: [0, 1].map((copy) => /* @__PURE__ */ jsx("div", {
					className: "flex",
					"aria-hidden": copy === 1,
					children: lane.map((u, i) => /* @__PURE__ */ jsx(Chip, { user: u }, `${copy}-${u.slug}-${i}`))
				}, copy))
			}),
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" }),
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" })
		]
	});
}
//#endregion
//#region src/components/Reveal.tsx
var OFFSET = {
	up: "translate3d(0, 28px, 0)",
	down: "translate3d(0, -28px, 0)",
	left: "translate3d(28px, 0, 0)",
	right: "translate3d(-28px, 0, 0)",
	zoom: "scale(0.94)"
};
function Reveal({ children, className, delay = 0, from = "up", as = "div" }) {
	const ref = useRef(null);
	const [shown, setShown] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (typeof IntersectionObserver === "undefined") {
			setShown(true);
			return;
		}
		const io = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				setShown(true);
				io.disconnect();
			}
		}, {
			rootMargin: "0px 0px -12% 0px",
			threshold: .15
		});
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ jsx(as, {
		ref,
		className,
		style: {
			opacity: shown ? 1 : 0,
			transform: shown ? "none" : OFFSET[from],
			filter: shown ? "blur(0)" : "blur(6px)",
			transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 700ms ease ${delay}ms`,
			willChange: "opacity, transform"
		},
		children
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var STATS = [
	{
		label: "slugs claimed",
		value: "1.2K"
	},
	{
		label: "links created",
		value: "4.8K"
	},
	{
		label: "profile views",
		value: "96K"
	}
];
var SMALL_FEATURES = [
	{
		icon: Link2,
		title: "Links",
		body: "Every link you own, reordered by drag in one place."
	},
	{
		icon: LayoutTemplate,
		title: "Presets",
		body: "Start from a card preset — glass, neon or bare."
	},
	{
		icon: BarChart3,
		title: "Analytics",
		body: "Per-link clicks and unique views, counted once."
	},
	{
		icon: LayoutGrid,
		title: "Layouts",
		body: "Stack, grid, split or spotlight — swap in a click."
	},
	{
		icon: MousePointer2,
		title: "Cursor FX",
		body: "Trails, sparks and ripples that follow the pointer."
	},
	{
		icon: Music4,
		title: "Audio",
		body: "Autoplay a track with a live audio visualizer."
	}
];
var COMMANDS = [
	["/uploadmusic", "attach a track to your page"],
	["/uploadvideo", "set a video background"],
	["/link", "add or edit a link"],
	["/presence", "sync your Discord status"]
];
/** Music player mark used for the track card */
function MusicPlayerIcon({ className = "" }) {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 48 48",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("circle", {
				cx: "24",
				cy: "24",
				r: "22",
				fill: "currentColor",
				opacity: "0.14"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "24",
				cy: "24",
				r: "22",
				stroke: "currentColor",
				strokeOpacity: "0.35",
				strokeWidth: "1.5",
				fill: "none"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M31 12.5v16.2a5.3 5.3 0 1 1-2.6-4.55V17.6l-9.8 2.2v12.6a5.3 5.3 0 1 1-2.6-4.55V15.9L31 12.5z",
				fill: "currentColor"
			})
		]
	});
}
/** Discord glyph used in the presence widget mark */
function DiscordIcon({ className = "" }) {
	return /* @__PURE__ */ jsx("svg", {
		viewBox: "0 0 24 24",
		className,
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", { d: "M20.32 4.37a19.8 19.8 0 0 0-4.93-1.53.07.07 0 0 0-.08.04c-.21.38-.45.86-.62 1.25a18.27 18.27 0 0 0-5.48 0 12.6 12.6 0 0 0-.63-1.25.08.08 0 0 0-.08-.04 19.74 19.74 0 0 0-4.93 1.53.07.07 0 0 0-.03.03C.83 8.68.12 12.87.46 17.01a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.23-2a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1 0-.13c.13-.09.25-.19.37-.28a.08.08 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.08.08 0 0 1 .08.01c.12.1.24.19.37.28a.08.08 0 0 1 0 .13c-.6.35-1.22.65-1.87.9a.08.08 0 0 0-.04.11c.36.7.78 1.37 1.23 2a.08.08 0 0 0 .09.03 19.83 19.83 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.4-4.79-.67-8.94-2.83-12.61a.06.06 0 0 0-.03-.03ZM8.68 14.6c-1.18 0-2.15-1.08-2.15-2.42s.95-2.42 2.15-2.42c1.21 0 2.17 1.1 2.15 2.42 0 1.34-.95 2.42-2.15 2.42Zm6.66 0c-1.18 0-2.15-1.08-2.15-2.42s.95-2.42 2.15-2.42c1.21 0 2.17 1.1 2.15 2.42 0 1.34-.94 2.42-2.15 2.42Z" })
	});
}
function Landing() {
	const [username, setUsername] = useState("");
	const [signedIn, setSignedIn] = useState(null);
	useEffect(() => {
		supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
		const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
			setSignedIn(!!session);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	const submit = (e) => {
		e.preventDefault();
		const u = username.trim();
		if (u) window.location.href = `/register?claim=${encodeURIComponent(u)}`;
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative min-h-screen overflow-x-hidden bg-background",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "pointer-events-none fixed inset-0 -z-10",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,oklch(0.28_0.09_150/0.35),transparent_60%)]" }),
					/* @__PURE__ */ jsx("div", { className: "glow-breathe absolute -left-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[140px]" }),
					/* @__PURE__ */ jsx("div", { className: "glow-breathe absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-primary/[0.07] blur-[130px]" }),
					/* @__PURE__ */ jsx("div", {
						className: "absolute inset-0 opacity-[0.06]",
						style: {
							backgroundImage: "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
							backgroundSize: "64px 64px",
							maskImage: "radial-gradient(70% 60% at 50% 20%, black, transparent)"
						}
					})
				]
			}),
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-40 border-b border-white/5 bg-background/60 backdrop-blur-2xl",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex w-full max-w-6xl items-center gap-4 px-5 py-4 sm:px-8",
					children: [
						/* @__PURE__ */ jsx(BrandMark, {}),
						/* @__PURE__ */ jsxs("nav", {
							className: "ml-auto hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex",
							children: [
								/* @__PURE__ */ jsx("a", {
									href: "#features",
									className: "story-link transition-colors hover:text-foreground",
									children: "Features"
								}),
								/* @__PURE__ */ jsx("a", {
									href: "#discord",
									className: "story-link transition-colors hover:text-foreground",
									children: "Discord"
								}),
								signedIn && /* @__PURE__ */ jsx(Link, {
									to: "/dashboard",
									className: "transition-colors hover:text-foreground",
									children: "Dashboard"
								}),
								signedIn === false && /* @__PURE__ */ jsx("a", {
									href: "/login",
									className: "transition-colors hover:text-foreground",
									children: "Sign in"
								})
							]
						}),
						signedIn ? /* @__PURE__ */ jsx(Link, {
							to: "/dashboard",
							className: "btn-ghost-glow ring-focus ml-3 shrink-0 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-primary backdrop-blur-xl hover:bg-primary/20 md:ml-0",
							children: "Go to dashboard"
						}) : /* @__PURE__ */ jsx("a", {
							href: "/register",
							className: "btn-ghost-glow ring-focus ml-3 shrink-0 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-primary backdrop-blur-xl hover:bg-primary/20 md:ml-0",
							children: "Claim slug"
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("main", {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "mx-auto max-w-3xl px-5 pt-12 pb-14 text-center sm:px-8 sm:pt-20",
						children: [
							/* @__PURE__ */ jsx(Reveal, {
								from: "down",
								children: /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary backdrop-blur-xl",
									children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary" }), "open beta"]
								})
							}),
							/* @__PURE__ */ jsx(Reveal, {
								delay: 80,
								children: /* @__PURE__ */ jsxs("h1", {
									className: "mt-6 font-display text-[3.25rem] leading-[0.92] font-black tracking-[-0.03em] text-foreground sm:text-7xl",
									children: [
										"ONE LINK.",
										/* @__PURE__ */ jsx("br", {}),
										/* @__PURE__ */ jsx("span", {
											className: "text-primary drop-shadow-[0_0_28px_oklch(0.78_0.19_150/0.45)]",
											children: "EVERY SLUG."
										})
									]
								})
							}),
							/* @__PURE__ */ jsx(Reveal, {
								delay: 150,
								children: /* @__PURE__ */ jsx("p", {
									className: "mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base",
									children: "A website that took much planning but the owners are ready to put the slug where it's at."
								})
							}),
							/* @__PURE__ */ jsx(Reveal, {
								delay: 220,
								children: /* @__PURE__ */ jsxs("form", {
									onSubmit: submit,
									className: "group mx-auto mt-9 flex w-full max-w-lg items-center gap-2 rounded-2xl border border-white/[0.09] bg-surface/40 p-2 shadow-card backdrop-blur-2xl transition-colors duration-300 focus-within:border-primary/40 hover:border-white/20",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex min-w-0 flex-1 items-center gap-1.5 pl-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "shrink-0 font-mono text-sm text-muted-foreground",
											children: "slugs.lol/"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: username,
											onChange: (e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")),
											placeholder: "yourname",
											"aria-label": "Choose your slug",
											className: "min-w-0 flex-1 bg-transparent py-3 text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none",
											maxLength: 24
										})]
									}), /* @__PURE__ */ jsxs("button", {
										type: "submit",
										className: "btn-glow ring-focus group/btn flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-primary-foreground shadow-accent-glow",
										children: ["Claim", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" })]
									})]
								})
							}),
							/* @__PURE__ */ jsx(Reveal, {
								delay: 280,
								children: /* @__PURE__ */ jsxs("p", {
									className: "mt-4 text-xs text-muted-foreground",
									children: [
										"Already have a slug?",
										" ",
										/* @__PURE__ */ jsx("a", {
											href: "/login",
											className: "font-bold text-foreground underline-offset-4 hover:underline",
											children: "Sign in"
										})
									]
								})
							})
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "relative border-y border-white/5 bg-background/40 py-8 backdrop-blur-xl",
						children: [
							/* @__PURE__ */ jsx("div", { className: "glow-breathe pointer-events-none absolute left-1/2 top-0 h-40 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" }),
							/* @__PURE__ */ jsxs("div", {
								className: "relative mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center",
								children: [/* @__PURE__ */ jsxs("h2", {
									className: "font-display text-2xl font-black leading-tight tracking-[-0.02em] text-foreground sm:text-3xl",
									children: [
										"Verified creators trust",
										/* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
										" slugs",
										/* @__PURE__ */ jsx("span", {
											className: "text-primary",
											children: ".lol"
										})
									]
								}), /* @__PURE__ */ jsx("dl", {
									className: "flex flex-wrap gap-x-8 gap-y-3",
									children: STATS.map((s, i) => /* @__PURE__ */ jsx(Reveal, {
										from: "zoom",
										delay: i * 90,
										children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
											className: "font-mono text-[10px] font-black uppercase tracking-[0.16em] text-primary",
											children: s.label
										}), /* @__PURE__ */ jsx("dd", {
											className: "mt-1 font-mono text-2xl font-black text-foreground",
											children: s.value
										})] })
									}, s.label))
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "relative mt-7",
								children: /* @__PURE__ */ jsx(VerifiedMarquee, {})
							})
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						id: "features",
						className: "relative mx-auto max-w-6xl px-5 py-24 sm:px-8",
						children: [
							/* @__PURE__ */ jsx("div", { className: "glow-breathe pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-primary/10 blur-[110px]" }),
							/* @__PURE__ */ jsx(Reveal, {
								from: "right",
								children: /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground",
									children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-4 rounded-full bg-primary" }), "Features"]
								})
							}),
							/* @__PURE__ */ jsx(Reveal, {
								delay: 60,
								children: /* @__PURE__ */ jsxs("h2", {
									className: "mt-5 font-display text-4xl font-black tracking-[-0.03em] text-foreground sm:text-5xl",
									children: ["Customize ", /* @__PURE__ */ jsx("span", {
										className: "text-primary",
										children: "Without Limits"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Reveal, {
								delay: 130,
								children: /* @__PURE__ */ jsx("p", {
									className: "mt-4 max-w-md text-sm leading-relaxed text-muted-foreground",
									children: "Every layout, card, font, glow and effect is editable from the dashboard — with a live preview beside it. Nothing is a template you can't break out of."
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative mt-14 h-[330px] select-none sm:h-[380px]",
								style: { perspective: "1200px" },
								children: [
									/* @__PURE__ */ jsx("div", { className: "glow-breathe pointer-events-none absolute left-1/2 top-1/2 h-64 w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-[100px]" }),
									/* @__PURE__ */ jsx("span", { className: "ring-spin pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.06]" }),
									/* @__PURE__ */ jsx(Reveal, {
										from: "right",
										delay: 80,
										className: "absolute left-2 top-16 z-20 w-64",
										children: /* @__PURE__ */ jsxs("div", {
											className: "tilt-card sheen relative overflow-hidden rounded-2xl border border-white/10 bg-surface/60 px-4 py-3 backdrop-blur-xl",
											style: { transform: "rotate(-6deg)" },
											children: [/* @__PURE__ */ jsx("span", {
												className: "block text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground",
												children: "Display name"
											}), /* @__PURE__ */ jsxs("span", {
												className: "mt-1 block font-display text-sm font-black text-primary",
												children: ["your name", /* @__PURE__ */ jsx("span", { className: "caret-blink ml-0.5 inline-block h-4 w-0.5 bg-primary align-middle" })]
											})]
										})
									}),
									/* @__PURE__ */ jsx(Reveal, {
										from: "up",
										delay: 200,
										className: "absolute left-10 top-40 z-30 w-72",
										children: /* @__PURE__ */ jsxs("div", {
											className: "drift tilt-card sheen relative flex items-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-surface/60 px-4 py-3 backdrop-blur-xl",
											style: {
												["--drift-base"]: "rotate(3deg)",
												["--drift-dur"]: "6s"
											},
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground",
												children: "Audio visualizer"
											}), /* @__PURE__ */ jsx("span", {
												className: "ml-auto flex h-5 items-end gap-0.5",
												children: [
													10,
													18,
													8,
													20,
													12,
													16
												].map((h, i) => /* @__PURE__ */ jsx("span", {
													className: "eq-bar w-1 rounded-full bg-primary",
													style: {
														height: h,
														["--eq-dur"]: `${.7 + i * .13}s`,
														animationDelay: `${i * 90}ms`
													}
												}, i))
											})]
										})
									}),
									/* @__PURE__ */ jsx(Reveal, {
										from: "down",
										delay: 40,
										className: "absolute right-1/2 top-2 z-10 w-64 translate-x-1/2 sm:right-72 sm:translate-x-0",
										children: /* @__PURE__ */ jsxs("div", {
											className: "drift tilt-card rounded-2xl border border-white/10 bg-surface/50 p-4 backdrop-blur-xl",
											style: { ["--drift-dur"]: "8.5s" },
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ jsx("span", { className: "h-8 w-8 rounded-full bg-primary/25" }), /* @__PURE__ */ jsxs("span", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ jsx("span", { className: "block h-2 w-28 rounded-full bg-white/15" }), /* @__PURE__ */ jsx("span", { className: "block h-2 w-16 rounded-full bg-white/10" })]
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "mt-3 flex items-center gap-2",
												children: [[
													"#5BE37D",
													"#7CC8FF",
													"#FF7AD9",
													"#FFD36E"
												].map((c) => /* @__PURE__ */ jsx("span", {
													className: "h-4 w-4 cursor-pointer rounded-full ring-1 ring-white/20 transition-transform duration-300 hover:scale-125",
													style: { background: c }
												}, c)), /* @__PURE__ */ jsx("span", {
													className: "ml-auto text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
													children: "accent"
												})]
											})]
										})
									}),
									/* @__PURE__ */ jsx(Reveal, {
										from: "left",
										delay: 160,
										className: "absolute right-8 top-24 z-20 hidden w-72 sm:block",
										children: /* @__PURE__ */ jsxs("div", {
											className: "tilt-card sheen relative overflow-hidden rounded-2xl border border-white/10 bg-surface/50 p-4 backdrop-blur-xl",
											style: { transform: "rotate(-2deg)" },
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ jsx("span", { className: "h-10 w-10 rounded-full bg-primary/20" }), /* @__PURE__ */ jsxs("span", {
													className: "flex-1 space-y-2",
													children: [/* @__PURE__ */ jsx("span", { className: "block h-2 w-full rounded-full bg-white/15" }), /* @__PURE__ */ jsx("span", { className: "block h-2 w-2/3 rounded-full bg-white/10" })]
												})]
											}), /* @__PURE__ */ jsx("div", {
												className: "mt-4 flex gap-2",
												children: [
													"Stack",
													"Grid",
													"Split"
												].map((l, i) => /* @__PURE__ */ jsx("span", {
													className: `cursor-pointer rounded-lg border px-2 py-1 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 ${i === 0 ? "border-primary/40 bg-primary/10 text-primary" : "border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground"}`,
													children: l
												}, l))
											})]
										})
									}),
									/* @__PURE__ */ jsx(Reveal, {
										from: "up",
										delay: 260,
										className: "absolute bottom-2 right-2 z-20",
										children: /* @__PURE__ */ jsx("div", {
											className: "flex flex-col items-end gap-1 text-right",
											children: [
												"FASTER ONE",
												"Futuretechno",
												"FACON",
												"Minecraft",
												"Finger Paint"
											].map((f, i) => /* @__PURE__ */ jsx("span", {
												className: "cursor-default font-display font-black uppercase tracking-tight text-foreground transition-all duration-300 hover:!opacity-100 hover:text-primary",
												style: {
													opacity: .55 - i * .08,
													fontSize: `${1.15 - i * .08}rem`
												},
												children: f
											}, f))
										})
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-16 grid gap-10 border-t border-white/[0.07] pt-12 sm:grid-cols-2 sm:gap-0",
								children: [/* @__PURE__ */ jsxs(Reveal, {
									from: "right",
									className: "sm:pr-10",
									children: [
										/* @__PURE__ */ jsx("h3", {
											className: "font-display text-xl font-black tracking-tight text-foreground",
											children: "Discord presence"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-2 text-sm leading-relaxed text-muted-foreground",
											children: "Authorize the bot once and your live status, activity and Spotify track render on your page."
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "tilt-card sheen relative mt-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/40 backdrop-blur-xl",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3 p-4",
												children: [
													/* @__PURE__ */ jsxs("span", {
														className: "relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-primary/10",
														children: [/* @__PURE__ */ jsx(DiscordIcon, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ jsx("span", { className: "presence-online absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-surface" })]
													}),
													/* @__PURE__ */ jsxs("span", {
														className: "min-w-0",
														children: [/* @__PURE__ */ jsx("span", {
															className: "block truncate text-sm font-bold text-foreground",
															children: "slugs.lol"
														}), /* @__PURE__ */ jsxs("span", {
															className: "mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground",
															children: [/* @__PURE__ */ jsx("span", { className: "presence-online h-1.5 w-1.5 animate-pulse rounded-full" }), " online — playing Minecraft"]
														})]
													}),
													/* @__PURE__ */ jsx("span", {
														className: "ml-auto flex h-4 items-end gap-0.5",
														children: [
															8,
															14,
															6,
															12
														].map((h, i) => /* @__PURE__ */ jsx("span", {
															className: "eq-bar w-0.5 rounded-full bg-primary/70",
															style: {
																height: h,
																["--eq-dur"]: `${.8 + i * .15}s`
															}
														}, i))
													})
												]
											}), /* @__PURE__ */ jsx("div", {
												className: "border-t border-white/[0.06] px-4 py-2.5 text-[11px] text-muted-foreground",
												children: "Live from the official slugs.lol bot"
											})]
										})
									]
								}), /* @__PURE__ */ jsxs(Reveal, {
									from: "left",
									delay: 100,
									className: "border-t border-white/[0.07] pt-10 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0",
									children: [
										/* @__PURE__ */ jsx("h3", {
											className: "font-display text-xl font-black tracking-tight text-foreground",
											children: "Music player"
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "mt-2 text-sm leading-relaxed text-muted-foreground",
											children: [
												"Send a track with ",
												/* @__PURE__ */ jsx("span", {
													className: "font-mono text-primary",
													children: "/uploadmusic"
												}),
												" and visitors hear it right on your page."
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "tilt-card sheen relative mt-6 flex items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/40 p-3 backdrop-blur-xl",
											children: [/* @__PURE__ */ jsx("span", {
												className: "drift grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/35 to-primary/5",
												children: /* @__PURE__ */ jsx(MusicPlayerIcon, { className: "h-9 w-9 text-primary" })
											}), /* @__PURE__ */ jsxs("span", {
												className: "min-w-0 flex-1",
												children: [
													/* @__PURE__ */ jsx("span", {
														className: "block truncate text-sm font-bold text-foreground",
														children: "Your track, your page"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "block truncate text-[11px] text-muted-foreground",
														children: "uploaded via Discord"
													}),
													/* @__PURE__ */ jsxs("span", {
														className: "mt-2 flex items-center gap-2",
														children: [
															/* @__PURE__ */ jsx("span", {
																className: "font-mono text-[10px] text-muted-foreground",
																children: "0:29"
															}),
															/* @__PURE__ */ jsx("span", {
																className: "relative h-1 flex-1 overflow-hidden rounded-full bg-white/10",
																children: /* @__PURE__ */ jsx("span", { className: "seek-fill absolute inset-y-0 left-0 rounded-full bg-primary" })
															}),
															/* @__PURE__ */ jsx("span", {
																className: "font-mono text-[10px] text-muted-foreground",
																children: "3:14"
															})
														]
													})
												]
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-14 grid gap-3 border-t border-white/[0.07] pt-12 sm:grid-cols-2 lg:grid-cols-3",
								children: SMALL_FEATURES.map(({ icon: Icon, title, body }, i) => /* @__PURE__ */ jsx(Reveal, {
									from: "zoom",
									delay: i * 70,
									children: /* @__PURE__ */ jsxs("div", {
										className: "feat-tile sheen relative h-full min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/25 p-5 backdrop-blur-xl hover:bg-surface/45",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ jsx("span", {
												className: "grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/12",
												children: /* @__PURE__ */ jsx(Icon, {
													className: "feat-icon h-4 w-4 text-primary",
													"aria-hidden": "true"
												})
											}), /* @__PURE__ */ jsx("h4", {
												className: "truncate text-sm font-black tracking-tight text-foreground",
												children: title
											})]
										}), /* @__PURE__ */ jsx("p", {
											className: "mt-3 text-[13px] leading-relaxed text-muted-foreground",
											children: body
										})]
									})
								}, title))
							})
						]
					}),
					/* @__PURE__ */ jsx("section", {
						id: "discord",
						className: "mx-auto max-w-6xl px-5 pb-32 sm:px-8",
						children: /* @__PURE__ */ jsx(Reveal, {
							from: "zoom",
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative overflow-hidden rounded-3xl border border-white/[0.08] bg-surface/30 p-7 backdrop-blur-2xl sm:p-12",
								children: [/* @__PURE__ */ jsx("div", { className: "glow-breathe absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" }), /* @__PURE__ */ jsxs("div", {
									className: "relative grid gap-8 lg:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-[10px] font-black uppercase tracking-[0.24em] text-primary",
											children: "Discord native"
										}),
										/* @__PURE__ */ jsx("h2", {
											className: "mt-3 font-display text-3xl font-black tracking-[-0.02em] text-foreground",
											children: "Run your page from Discord."
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-4 text-sm leading-relaxed text-muted-foreground",
											children: "Link your account once, then drop media straight into DMs. Authorize the app and your live status, activity and Spotify track render on your biolink."
										}),
										/* @__PURE__ */ jsxs("a", {
											href: "/register",
											className: "btn-glow ring-focus group/cta mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-primary-foreground shadow-accent-glow",
											children: [
												/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
												"Get started",
												/* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" })
											]
										})
									] }), /* @__PURE__ */ jsx("div", {
										className: "grid gap-2.5 self-center text-sm",
										children: COMMANDS.map(([cmd, desc], i) => /* @__PURE__ */ jsx(Reveal, {
											from: "left",
											delay: i * 70,
											children: /* @__PURE__ */ jsxs("div", {
												className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-white/[0.07] bg-background/50 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-background/70",
												children: [/* @__PURE__ */ jsx("span", {
													className: "truncate font-mono font-black text-primary",
													children: cmd
												}), /* @__PURE__ */ jsx("span", {
													className: "shrink-0 text-[11px] text-muted-foreground",
													children: desc
												})]
											})
										}, cmd))
									})]
								})]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "relative z-10 border-t border-white/5 bg-background/50 backdrop-blur-2xl",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8",
					children: [/* @__PURE__ */ jsx(BrandMark, {}), /* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" slugs.lol — one slug, no chaos."
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { Landing as component };
