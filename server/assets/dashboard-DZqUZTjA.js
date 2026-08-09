import { t as supabase } from "./client-Cc5YU_PK.js";
import { n as useNotify, r as cn } from "./notifications-8GONn2N7.js";
import { _ as listRoles, a as adminCreateRole, c as adminGeneratePremiumKeys, d as adminRemoveWhitelistByUsername, f as adminSetRoleVisibility, g as listProfileRoles, h as isWhitelisted, i as adminCreateAccount, l as adminListProfiles, m as adminUnbanProfile, n as adminAssignRole, o as adminDeleteProfile, p as adminSetUsername, r as adminBanProfile, s as adminDeleteRole, t as adminAddWhitelistByUsername, u as adminRemoveRole } from "./admin-BQe0CAfv.js";
import { _ as AnimatedText, a as EFFECTS, c as FONTS, d as LAYOUTS, f as TEXT_ANIMATIONS, g as isPremiumLockedOption, h as getSplashLeaveStyle, i as CURSOR_EFFECTS, m as getCurtainPanelStyle, n as BUTTON_STYLES, o as ENTRY_TRANSITIONS, p as VISUALIZERS, r as COLOR_PRESETS, t as AUDIO_WIDGET_STYLES, u as GRADIENT_PRESETS } from "./profile-options-C1AhgXEW.js";
import { t as AuroraBackdrop } from "./AuroraBackdrop-CCymJVgw.js";
import { t as BrandMark } from "./BrandMark-CJYzd0JD.js";
import { c as updateProfileTheme, i as redeemPremiumCode, l as uploadProfileMedia, n as getMyProfile, o as reorderLinks, r as listMyLinks, s as updateProfile, t as deleteLink, u as upsertLink } from "./db-DlZLDDv3.js";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Award, BadgeCheck, Ban, Camera, Check, ChevronDown, Clapperboard, Copy, DoorOpen, ExternalLink, Eye, Facebook, Github, Globe, GripVertical, House, ImageOff, Instagram, Layout, Link2, Linkedin, Loader2, Lock, LogOut, MessageCircle, MousePointer2, MousePointerClick, Music, Palette, Plus, Save, Search, Send, Share2, Shield, ShieldCheck, Sparkles, Trash2, Twitch, Twitter, Type, Undo2, UserPlus, UserRound, Wand2, X, Youtube } from "lucide-react";
import { createPortal } from "react-dom";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
//#region src/components/studio/kit.tsx
function Panel({ title, sub, right, children, id }) {
	return /* @__PURE__ */ jsxs("section", {
		id,
		className: "panel scroll-mt-24",
		children: [
			/* @__PURE__ */ jsx("div", { className: "panel-rule" }),
			/* @__PURE__ */ jsxs("div", {
				className: "panel-header",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-base font-bold uppercase tracking-[0.14em] text-foreground",
					children: title
				}), sub && /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: sub
				})] }), right]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "panel-body",
				children
			})
		]
	});
}
function Group({ title, hint, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-2xl border border-white/8 bg-black/25 p-5 transition-colors duration-300 hover:border-white/12",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-[10px] font-bold uppercase tracking-[0.24em] text-primary/80",
				children: title
			}), hint && /* @__PURE__ */ jsx("span", {
				className: "text-[11px] text-muted-foreground",
				children: hint
			})]
		}), children]
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "mb-1.5 flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
			children: label
		}), hint && /* @__PURE__ */ jsx("span", {
			className: "text-[11px] text-muted-foreground/60",
			children: hint
		})]
	}), children] });
}
function Text({ value, onChange, placeholder, maxLength, mono }) {
	return /* @__PURE__ */ jsx("input", {
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		maxLength,
		className: `field-input ${mono ? "font-mono text-xs" : "text-sm"}`
	});
}
function Toggle({ label, hint, checked, onChange }) {
	return /* @__PURE__ */ jsxs("label", {
		className: `click-shine flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${checked ? "border-primary/50 bg-primary/[0.08] shadow-accent-glow" : "border-white/8 bg-black/25 hover:border-white/20 hover:bg-white/[0.03]"}`,
		children: [/* @__PURE__ */ jsxs("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("span", {
				className: "block text-sm text-foreground",
				children: label
			}), hint && /* @__PURE__ */ jsx("span", {
				className: "mt-0.5 block text-[11px] text-muted-foreground",
				children: hint
			})]
		}), /* @__PURE__ */ jsxs("span", {
			className: "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-[background] duration-300",
			style: { background: checked ? "linear-gradient(135deg, var(--brand-2), var(--primary))" : "oklch(1 0 0 / 0.14)" },
			children: [/* @__PURE__ */ jsx("input", {
				type: "checkbox",
				checked,
				onChange: (e) => onChange(e.target.checked),
				className: "sr-only"
			}), /* @__PURE__ */ jsx("span", {
				className: "absolute rounded-full bg-background shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out",
				style: {
					height: 18,
					width: 18,
					transform: checked ? "translateX(22px)" : "translateX(3px)"
				}
			})]
		})]
	});
}
function Segmented({ value, options, onChange }) {
	return /* @__PURE__ */ jsx("div", {
		className: "inline-flex flex-wrap gap-1 rounded-xl border border-white/8 bg-black/35 p-1",
		children: options.map((o) => /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => onChange(o.id),
			className: `click-shine rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${value === o.id ? "bg-accent-sheen text-primary-foreground shadow-accent-glow" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`,
			children: o.label
		}, o.id))
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick,
		className: `click-shine rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${active ? "border-primary/70 bg-accent-sheen text-primary-foreground shadow-accent-glow" : "border-white/8 bg-black/25 text-muted-foreground hover:border-white/25 hover:bg-white/[0.04] hover:text-foreground"}`,
		children
	});
}
function Slider({ value, min, max, step = 1, onChange }) {
	const pct = (value - min) / (max - min) * 100;
	return /* @__PURE__ */ jsx("input", {
		type: "range",
		min,
		max,
		step,
		value,
		onChange: (e) => onChange(Number(e.target.value)),
		className: "studio-range w-full",
		style: { background: `linear-gradient(90deg, var(--primary) ${pct}%, oklch(1 0 0 / 0.12) ${pct}%)` }
	});
}
function ColorField({ label, value, onChange, hint }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-2xl border border-white/8 bg-black/25 p-3 transition-colors duration-300 hover:border-white/12",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ jsx("label", {
					className: "click-shine relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/15 transition-transform duration-200 hover:scale-105",
					style: { background: value },
					children: /* @__PURE__ */ jsx("input", {
						type: "color",
						value,
						onChange: (e) => onChange(e.target.value),
						className: "absolute inset-0 h-full w-full cursor-pointer opacity-0"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ jsx("div", {
						className: "text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
						children: label
					}), /* @__PURE__ */ jsx("input", {
						value,
						onChange: (e) => onChange(e.target.value),
						className: "w-full bg-transparent font-mono text-sm text-foreground focus:outline-none"
					})]
				}),
				hint && /* @__PURE__ */ jsx("span", {
					className: "text-[10px] text-muted-foreground/60",
					children: hint
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-3 flex flex-wrap gap-1.5",
			children: COLOR_PRESETS.map((c) => /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => onChange(c),
				"aria-label": c,
				className: `click-shine h-5 w-5 rounded-md border transition-transform duration-150 hover:scale-125 ${value.toLowerCase() === c ? "border-primary ring-2 ring-primary/40" : "border-white/15"}`,
				style: { background: c }
			}, c))
		})]
	});
}
//#endregion
//#region src/routes/_authenticated/dashboard.tsx?tsr-split=component
var NAV = [
	{
		id: "identity",
		label: "Identity",
		Icon: UserRound
	},
	{
		id: "links",
		label: "Links",
		Icon: Link2
	},
	{
		id: "preview",
		label: "Preview",
		Icon: Eye
	},
	{
		id: "layout",
		label: "Layout",
		Icon: Layout
	},
	{
		id: "typography",
		label: "Typography",
		Icon: Type
	},
	{
		id: "palette",
		label: "Palette",
		Icon: Palette
	},
	{
		id: "effects",
		label: "Effects",
		Icon: Sparkles
	},
	{
		id: "textfx",
		label: "Text FX",
		Icon: Wand2
	},
	{
		id: "cursor",
		label: "Cursor",
		Icon: MousePointer2
	},
	{
		id: "media",
		label: "Media",
		Icon: Music
	},
	{
		id: "entry",
		label: "Entry screen",
		Icon: DoorOpen
	},
	{
		id: "socials",
		label: "Socials",
		Icon: Share2
	},
	{
		id: "seo",
		label: "SEO",
		Icon: Search
	},
	{
		id: "badges",
		label: "Badges",
		Icon: Award
	},
	{
		id: "premium",
		label: "Premium",
		Icon: BadgeCheck
	}
];
var ADMIN_NAV_ITEM = {
	id: "admin",
	label: "Admin",
	Icon: Shield
};
var DISCORD_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeDiscordCode() {
	let code = "";
	for (let i = 0; i < 8; i += 1) code += DISCORD_CODE_ALPHABET[Math.floor(Math.random() * 32)];
	return code;
}
/** Generic name to fall back on when we have a media URL but no stored filename (e.g. older uploads). Never shows the raw signed URL in the UI. */
function mediaDisplayName(url, filename, fallback = "Uploaded file") {
	if (filename) return filename;
	try {
		const base = decodeURIComponent(new URL(url).pathname).split("/").filter(Boolean).pop();
		if (base) return base;
	} catch {}
	return fallback;
}
function Dashboard() {
	const navigate = useNavigate();
	const notify = useNotify();
	const qc = useQueryClient();
	const profileQ = useQuery({
		queryKey: ["profile"],
		queryFn: getMyProfile
	});
	const linksQ = useQuery({
		queryKey: ["links"],
		queryFn: listMyLinks
	});
	const isAdmin = !!useQuery({
		queryKey: ["is-admin"],
		queryFn: async () => {
			const { data } = await supabase.auth.getUser();
			if (!data.user) return false;
			return isWhitelisted(data.user.id);
		}
	}).data;
	const navItems = isAdmin ? [...NAV, ADMIN_NAV_ITEM] : NAV;
	const undoStackRef = useRef([]);
	const [undoCount, setUndoCount] = useState(0);
	const [undoing, setUndoing] = useState(false);
	const saveLookRef = useRef(null);
	const [saving, setSaving] = useState(false);
	const [justSaved, setJustSaved] = useState(false);
	const [previewKey, setPreviewKey] = useState(0);
	const bumpPreview = () => setPreviewKey((k) => k + 1);
	const handleSave = async () => {
		if (!saveLookRef.current || saving) return;
		setSaving(true);
		try {
			await saveLookRef.current();
			setJustSaved(true);
			bumpPreview();
			notify.success("Look saved");
			setTimeout(() => setJustSaved(false), 1800);
		} catch (e) {
			notify.error(e?.message ?? "Couldn't save");
		} finally {
			setSaving(false);
		}
	};
	const signOut = async () => {
		await supabase.auth.signOut();
		qc.clear();
		navigate({ to: "/" });
	};
	const links = linksQ.data ?? [];
	const totalClicks = links.reduce((n, l) => n + (l.clicks ?? 0), 0);
	const liveLinks = links.filter((l) => l.is_active).length;
	const username = profileQ.data?.username;
	const [copied, setCopied] = useState(false);
	const [active, setActive] = useState("identity");
	const pushUndo = (entry) => {
		undoStackRef.current.push(entry);
		setUndoCount(undoStackRef.current.length);
	};
	const handleUndo = async () => {
		if (undoStackRef.current.length === 0) return;
		const entry = undoStackRef.current.pop();
		setUndoCount(undoStackRef.current.length);
		setUndoing(true);
		try {
			if (entry?.type === "theme") {
				await updateProfile(entry.payload);
				qc.invalidateQueries({ queryKey: ["public-profile", profileQ.data?.username] });
				notify.success("Reverted theme to previous saved state");
			} else if (entry?.type === "link-toggle") {
				const prev = entry.payload;
				await upsertLink({
					id: prev.id,
					title: prev.title,
					url: prev.url,
					is_active: prev.is_active
				});
				qc.invalidateQueries({ queryKey: ["links"] });
				notify.success("Reverted link visibility");
			} else notify.error("Undo not supported for this change");
		} catch (e) {
			notify.error(e?.message ?? "Undo failed");
		} finally {
			setUndoing(false);
		}
	};
	const goToSection = (id) => {
		setActive(id);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const copyUrl = async () => {
		if (!username) return;
		try {
			await navigator.clipboard.writeText(`https://slugs.lol/${username}`);
			setCopied(true);
			notify.success("Link copied");
			setTimeout(() => setCopied(false), 1600);
		} catch {
			notify.error("Couldn't copy");
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative min-h-screen",
		children: [
			/* @__PURE__ */ jsx(AuroraBackdrop, {}),
			/* @__PURE__ */ jsx("div", {
				"aria-hidden": true,
				className: "pointer-events-none fixed inset-0 z-0 opacity-[0.3]",
				style: {
					backgroundImage: "linear-gradient(to right, oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
					backgroundSize: "64px 64px",
					maskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, black, transparent 78%)"
				}
			}),
			/* @__PURE__ */ jsxs("header", {
				className: "sticky top-0 z-40 border-b border-white/5 bg-background/75 backdrop-blur-xl",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex w-full max-w-7xl items-center gap-3 px-5 py-3.5 sm:px-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ jsx(Link, {
								to: "/",
								title: "Back to slugs.lol",
								className: "ring-focus grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/8 bg-black/30 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary",
								children: /* @__PURE__ */ jsx(House, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ jsx("span", {
								className: "h-5 w-px bg-white/10",
								"aria-hidden": true
							}),
							/* @__PURE__ */ jsx(BrandMark, {})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "ml-auto flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "hidden items-center gap-1 rounded-full border border-white/8 bg-black/20 p-1 sm:flex",
								children: [/* @__PURE__ */ jsxs("button", {
									onClick: handleUndo,
									disabled: undoCount === 0 || undoing,
									title: "Undo last change",
									className: "ring-focus inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent",
									children: [
										undoing ? /* @__PURE__ */ jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsx(Undo2, { className: "h-3.5 w-3.5" }),
										"Undo",
										undoCount > 0 ? ` · ${undoCount}` : ""
									]
								}), /* @__PURE__ */ jsx("button", {
									onClick: handleSave,
									disabled: saving,
									className: `ring-focus inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all disabled:opacity-70 ${justSaved ? "bg-primary/15 text-primary" : "bg-accent-sheen text-primary-foreground shadow-accent-glow hover:-translate-y-0.5"}`,
									children: saving ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin" }), " Saving…"] }) : justSaved ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }), " Saved"] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Save, { className: "h-3.5 w-3.5" }), " Save look"] })
								})]
							}),
							username && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("button", {
								onClick: copyUrl,
								className: "ring-focus hidden items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3.5 py-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground md:inline-flex",
								children: [
									"slugs.lol/",
									username,
									copied ? /* @__PURE__ */ jsx(Check, { className: "h-3 w-3 text-primary" }) : /* @__PURE__ */ jsx(Copy, { className: "h-3 w-3" })
								]
							}), /* @__PURE__ */ jsxs(Link, {
								to: "/$username",
								params: { username },
								target: "_blank",
								rel: "noopener noreferrer",
								className: "ring-focus inline-flex items-center gap-1.5 rounded-full bg-accent-sheen px-3.5 py-1.5 text-xs font-bold text-primary-foreground shadow-accent-glow transition-transform hover:-translate-y-0.5",
								children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" }), " View page"]
							})] }),
							/* @__PURE__ */ jsxs("button", {
								onClick: signOut,
								title: "Sign out",
								className: "ring-focus inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive sm:px-3.5",
								children: [
									/* @__PURE__ */ jsx(LogOut, { className: "h-3.5 w-3.5" }),
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "hidden sm:inline",
										children: "Sign out"
									})
								]
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 border-t border-white/5 px-5 py-2 sm:hidden",
					children: [/* @__PURE__ */ jsxs("button", {
						onClick: handleUndo,
						disabled: undoCount === 0 || undoing,
						className: "ring-focus inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-black/25 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground disabled:opacity-40",
						children: [
							/* @__PURE__ */ jsx(Undo2, { className: "h-3 w-3" }),
							" Undo",
							undoCount > 0 ? ` · ${undoCount}` : ""
						]
					}), /* @__PURE__ */ jsxs("button", {
						onClick: handleSave,
						disabled: saving,
						className: `ring-focus inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-[11px] font-bold ${justSaved ? "bg-primary/15 text-primary" : "bg-accent-sheen text-primary-foreground"}`,
						children: [saving ? /* @__PURE__ */ jsx(Loader2, { className: "h-3 w-3 animate-spin" }) : justSaved ? /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(Save, { className: "h-3 w-3" }), saving ? "Saving…" : justSaved ? "Saved" : "Save look"]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("main", {
				className: "relative z-10 mx-auto max-w-7xl px-5 pb-32 pt-10 sm:px-8",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-8",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-primary",
								children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }), " Studio"]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-[2.5rem] sm:leading-[1.05]",
								children: [
									"Your ",
									/* @__PURE__ */ jsx("span", {
										className: "text-gradient-accent",
										children: "slug"
									}),
									" studio."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 max-w-md text-sm text-muted-foreground",
								children: "Every section below controls one part of your public page."
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ jsx(StatCard, {
								icon: Eye,
								label: "Profile views",
								value: profileQ.data?.view_count ?? 0
							}),
							/* @__PURE__ */ jsx(StatCard, {
								icon: MousePointerClick,
								label: "Total clicks",
								value: totalClicks
							}),
							/* @__PURE__ */ jsx(StatCard, {
								icon: Link2,
								label: "Live links",
								value: liveLinks,
								sub: `${links.length} total`
							}),
							/* @__PURE__ */ jsx(StatCard, {
								icon: Eye,
								label: "Page status",
								value: profileQ.data?.is_public ? "Public" : "Hidden",
								accent: !!profileQ.data?.is_public
							})
						]
					}),
					profileQ.isLoading ? /* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-center py-24",
						children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" })
					}) : profileQ.data ? /* @__PURE__ */ jsxs("div", {
						className: "grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]",
						children: [
							/* @__PURE__ */ jsx("nav", {
								className: "hidden lg:block",
								children: /* @__PURE__ */ jsx("div", {
									className: "sticky top-24 space-y-1 rounded-2xl border border-white/10 bg-surface p-2 shadow-card",
									children: navItems.map(({ id, label, Icon }) => /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => goToSection(id),
										className: `flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold transition-colors ${active === id ? "bg-primary/12 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`,
										children: [
											/* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5" }),
											" ",
											label,
											active === id && /* @__PURE__ */ jsx("span", { className: "ml-auto h-1.5 w-1.5 rounded-full bg-primary" })
										]
									}, id))
								})
							}),
							/* @__PURE__ */ jsx("nav", {
								className: "-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:hidden",
								children: navItems.map(({ id, label, Icon }) => /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => goToSection(id),
									className: `inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${active === id ? "border-primary/45 bg-primary/12 text-primary" : "border-white/8 bg-black/25 text-muted-foreground hover:border-white/20 hover:text-foreground"}`,
									children: [
										/* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5" }),
										" ",
										label
									]
								}, id))
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ jsx("style", { children: `.panel { display: none; } #${active}.panel { display: block; }` }),
									/* @__PURE__ */ jsx(IdentityPanel, { profile: profileQ.data }),
									/* @__PURE__ */ jsx(LinksPanel, {
										links,
										loading: linksQ.isLoading,
										pushUndo,
										bumpPreview
									}),
									/* @__PURE__ */ jsx(PreviewPanel, {
										username,
										previewKey,
										onRefresh: bumpPreview
									}),
									/* @__PURE__ */ jsx(CustomizerPanels, {
										profile: profileQ.data,
										pushUndo,
										registerSave: (fn) => {
											saveLookRef.current = fn;
										}
									}),
									/* @__PURE__ */ jsx(BadgesPanel, { profile: profileQ.data }),
									/* @__PURE__ */ jsx(PremiumPanel, { profile: profileQ.data }),
									isAdmin && /* @__PURE__ */ jsx(AdminPanel, {})
								]
							})
						]
					}) : /* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "Couldn't load your profile."
					})
				]
			})
		]
	});
}
function StatCard({ icon: Icon, label, value, sub, accent }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "group relative overflow-hidden rounded-2xl border border-white/8 bg-black/25 p-5 backdrop-blur transition-colors hover:border-primary/30",
		children: [
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl" }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5 text-primary" }),
					" ",
					label
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: `mt-3 font-display text-3xl font-bold tabular-nums ${accent === false ? "text-muted-foreground" : "text-foreground"}`,
				children: value
			}),
			sub && /* @__PURE__ */ jsx("div", {
				className: "mt-1 font-mono text-[11px] text-muted-foreground",
				children: sub
			})
		]
	});
}
function IdentityPanel({ profile }) {
	const notify = useNotify();
	const [displayName, setDisplayName] = useState(profile.display_name ?? "");
	const [bio, setBio] = useState(profile.bio ?? "");
	const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "");
	const [isPublic, setIsPublic] = useState(profile.is_public);
	const isPremium = !!profile.is_premium;
	const [isExclusive, setIsExclusive] = useState(isPremium && (profile.is_exclusive ?? false));
	const goPremium = () => notify.info("This one's premium", { description: "Head to the Premium tab to redeem a code and unlock it." });
	const [discordCode, setDiscordCode] = useState(profile.discord_code?.toUpperCase() ?? "");
	const [codeCopied, setCodeCopied] = useState(false);
	useEffect(() => {
		if (profile.discord_code) {
			setDiscordCode(profile.discord_code.toUpperCase());
			return;
		}
		const generated = makeDiscordCode();
		setDiscordCode(generated);
		updateProfile({ discord_code: generated }).catch((e) => notify.error(e.message));
	}, [profile.discord_code]);
	const saveProfile = useMutation({
		mutationFn: async () => {
			const nextCode = discordCode.trim().toUpperCase();
			if (!/^[A-Z0-9]{8}$/.test(nextCode)) throw new Error("Discord code must be 8 characters");
			return updateProfile({
				display_name: displayName || null,
				bio: bio || null,
				avatar_url: avatarUrl || null,
				is_public: isPublic,
				is_exclusive: isPremium && isExclusive,
				discord_code: nextCode
			});
		},
		onSuccess: () => {
			notify.success("Profile saved — refreshing");
			setTimeout(() => window.location.reload(), 500);
		},
		onError: (e) => notify.error(e.message)
	});
	const copyDiscordCode = async () => {
		if (!discordCode) return;
		try {
			await navigator.clipboard.writeText(discordCode);
			setCodeCopied(true);
			notify.success("Discord code copied");
			setTimeout(() => setCodeCopied(false), 1600);
		} catch {
			notify.error("Couldn't copy Discord code");
		}
	};
	const refreshDiscordCode = async () => {
		const generated = makeDiscordCode();
		setDiscordCode(generated);
		try {
			await updateProfile({ discord_code: generated });
			notify.success("Discord code refreshed");
		} catch (e) {
			notify.error(e instanceof Error ? e.message : "Couldn't refresh code");
		}
	};
	return /* @__PURE__ */ jsx(Panel, {
		id: "identity",
		title: "Identity",
		sub: "Who you are and where you live.",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs(Group, {
					title: "Handle",
					hint: "Locked",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-black/35 px-4 py-3",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "font-mono text-sm text-foreground",
							children: ["slugs.lol/", profile.username]
						}), /* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground",
							children: [/* @__PURE__ */ jsx(Lock, { className: "h-3.5 w-3.5" }), " Admin only"]
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Handles can't be self-changed anymore. Ask a whitelisted admin to update it for you from the Admin section."
					})]
				}),
				/* @__PURE__ */ jsx(Group, {
					title: "Discord link code",
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-white/8 bg-black/25 p-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground",
								children: "Use this in Discord"
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-2 flex items-center gap-2 rounded-xl border border-white/8 bg-black/35 px-3 py-2.5",
								children: /* @__PURE__ */ jsx("span", {
									className: "font-mono text-base font-semibold tracking-[0.24em] text-foreground",
									children: discordCode || "--------"
								})
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ jsx("button", {
									onClick: () => void copyDiscordCode(),
									className: "rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary",
									children: codeCopied ? /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }), " Copied"]
									}) : /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Copy, { className: "h-3.5 w-3.5" }), " Copy"]
									})
								}), /* @__PURE__ */ jsx("button", {
									onClick: () => void refreshDiscordCode(),
									className: "rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary",
									children: "Refresh"
								})]
							})]
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								"Share this code with the Discord bot and run ",
								/* @__PURE__ */ jsxs("span", {
									className: "font-mono text-foreground",
									children: ["/link ", discordCode || "XXXXXXXX"]
								}),
								"."
							]
						})]
					})
				}),
				/* @__PURE__ */ jsx(Group, {
					title: "Presentation",
					children: /* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsx(Field, {
								label: "Display name",
								children: /* @__PURE__ */ jsx(Text, {
									value: displayName,
									onChange: setDisplayName,
									maxLength: 60,
									placeholder: "Your name"
								})
							}), /* @__PURE__ */ jsx(Field, {
								label: "Avatar",
								children: /* @__PURE__ */ jsx(AvatarPicker, {
									value: avatarUrl,
									onChange: setAvatarUrl
								})
							})]
						}), /* @__PURE__ */ jsx(Field, {
							label: "Bio",
							hint: `${bio.length}/240`,
							children: /* @__PURE__ */ jsx("textarea", {
								value: bio,
								onChange: (e) => setBio(e.target.value.slice(0, 240)),
								rows: 3,
								placeholder: "One line about you.",
								className: "field-input resize-none text-sm"
							})
						})]
					})
				}),
				/* @__PURE__ */ jsx(Group, {
					title: "Visibility",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Toggle, {
							label: "Page is public",
							hint: "Turn off to hide your slug",
							checked: isPublic,
							onChange: setIsPublic
						}), /* @__PURE__ */ jsx(LockableOption, {
							locked: !isPremium,
							onLockedClick: goPremium,
							className: "rounded-2xl",
							children: /* @__PURE__ */ jsx(Toggle, {
								label: /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4 text-primary" }), " Exclusive badge"]
								}),
								hint: "Premium verified checkmark",
								checked: isPremium && isExclusive,
								onChange: isPremium ? setIsExclusive : () => {}
							})
						})]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ jsx(SaveButton, {
						pending: saveProfile.isPending,
						onClick: () => saveProfile.mutate(),
						label: "Save identity"
					})
				})
			]
		})
	});
}
function SaveButton({ pending, onClick, label }) {
	return /* @__PURE__ */ jsxs("button", {
		onClick,
		disabled: pending,
		className: "ring-focus inline-flex items-center gap-2 rounded-xl bg-accent-sheen px-7 py-3 text-sm font-bold text-primary-foreground shadow-accent-glow transition-transform hover:-translate-y-0.5 disabled:opacity-60",
		children: [pending && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), pending ? "Saving…" : label]
	});
}
function LinksPanel({ links, loading, pushUndo, bumpPreview }) {
	const notify = useNotify();
	const qc = useQueryClient();
	const [items, setItems] = useState(links);
	useEffect(() => setItems(links), [links]);
	const [newTitle, setNewTitle] = useState("");
	const [newUrl, setNewUrl] = useState("");
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	const addLink = useMutation({
		mutationFn: () => upsertLink({
			title: newTitle,
			url: newUrl
		}),
		onSuccess: () => {
			setNewTitle("");
			setNewUrl("");
			qc.invalidateQueries({ queryKey: ["links"] });
			bumpPreview?.();
		},
		onError: (e) => notify.error(e.message)
	});
	const remove = useMutation({
		mutationFn: (id) => deleteLink(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["links"] });
			bumpPreview?.();
		},
		onError: (e) => notify.error(e.message)
	});
	const toggle = useMutation({
		mutationFn: (link) => upsertLink({
			id: link.id,
			title: link.title,
			url: link.url,
			is_active: !link.is_active
		}),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["links"] });
			bumpPreview?.();
		},
		onError: (e) => notify.error(e.message)
	});
	const editRow = useMutation({
		mutationFn: (link) => upsertLink({
			id: link.id,
			title: link.title,
			url: link.url,
			is_active: link.is_active
		}),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["links"] });
			bumpPreview?.();
		},
		onError: (e) => notify.error(e.message)
	});
	const onDragEnd = (event) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const oldIndex = items.findIndex((i) => i.id === active.id);
		const newIndex = items.findIndex((i) => i.id === over.id);
		const next = arrayMove(items, oldIndex, newIndex);
		setItems(next);
		reorderLinks(next.map((i) => i.id)).catch((e) => notify.error(e.message));
	};
	return /* @__PURE__ */ jsxs(Panel, {
		id: "links",
		title: "Links",
		sub: "Drag to reorder. Toggle to hide.",
		right: /* @__PURE__ */ jsxs("span", {
			className: "font-mono text-xs text-muted-foreground",
			children: [items.length, " total"]
		}),
		children: [/* @__PURE__ */ jsxs("form", {
			onSubmit: (e) => {
				e.preventDefault();
				if (newTitle.trim() && newUrl.trim()) addLink.mutate();
			},
			className: "flex flex-col gap-2 rounded-2xl border border-white/8 bg-black/25 p-3 sm:flex-row",
			children: [
				/* @__PURE__ */ jsx("input", {
					value: newTitle,
					onChange: (e) => setNewTitle(e.target.value),
					placeholder: "Title",
					maxLength: 80,
					className: "field-input text-sm sm:w-1/3"
				}),
				/* @__PURE__ */ jsx("input", {
					value: newUrl,
					onChange: (e) => setNewUrl(e.target.value),
					placeholder: "https://…",
					className: "field-input flex-1 text-sm"
				}),
				/* @__PURE__ */ jsxs("button", {
					type: "submit",
					disabled: addLink.isPending,
					className: "ring-focus inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent-sheen px-5 py-2 text-sm font-bold text-primary-foreground shadow-accent-glow disabled:opacity-60",
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Add"]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-6",
			children: loading ? /* @__PURE__ */ jsx("div", {
				className: "flex items-center justify-center py-8",
				children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin text-muted-foreground" })
			}) : items.length === 0 ? /* @__PURE__ */ jsx("div", {
				className: "rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-12 text-center text-sm text-muted-foreground",
				children: "No links yet. Add your first one above."
			}) : /* @__PURE__ */ jsx(DndContext, {
				sensors,
				collisionDetection: closestCenter,
				onDragEnd,
				children: /* @__PURE__ */ jsx(SortableContext, {
					items: items.map((i) => i.id),
					strategy: verticalListSortingStrategy,
					children: /* @__PURE__ */ jsx("div", {
						className: "space-y-2",
						children: items.map((link) => /* @__PURE__ */ jsx(SortableLink, {
							link,
							onToggle: () => {
								pushUndo?.({
									type: "link-toggle",
									payload: link
								});
								toggle.mutate(link);
							},
							onDelete: () => {
								pushUndo?.({
									type: "link-delete",
									payload: link
								});
								remove.mutate(link.id);
							},
							onEdit: (next) => {
								pushUndo?.({
									type: "link-edit",
									payload: link
								});
								editRow.mutate(next);
							}
						}, link.id))
					})
				})
			})
		})]
	});
}
function SortableLink({ link, onToggle, onDelete, onEdit }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
	const [title, setTitle] = useState(link.title);
	const [url, setUrl] = useState(link.url);
	useEffect(() => {
		setTitle(link.title);
		setUrl(link.url);
	}, [link.title, link.url]);
	const commit = () => {
		if (title !== link.title || url !== link.url) onEdit({
			...link,
			title,
			url
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? .6 : 1
		},
		className: `group flex items-center gap-2 rounded-xl border bg-black/25 p-2 pl-1 transition-colors ${isDragging ? "border-primary/50 shadow-accent-glow" : "border-white/8 hover:border-white/20"}`,
		children: [
			/* @__PURE__ */ jsx("button", {
				...attributes,
				...listeners,
				className: "cursor-grab p-2 text-muted-foreground/60 transition-colors hover:text-foreground active:cursor-grabbing",
				"aria-label": "Drag",
				children: /* @__PURE__ */ jsx(GripVertical, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-1 flex-col gap-1 sm:flex-row sm:gap-2",
				children: [/* @__PURE__ */ jsx("input", {
					value: title,
					onChange: (e) => setTitle(e.target.value),
					onBlur: commit,
					maxLength: 80,
					className: "rounded-lg bg-transparent px-2 py-1.5 text-sm font-semibold text-foreground focus:bg-black/40 focus:outline-none sm:w-1/3"
				}), /* @__PURE__ */ jsx("input", {
					value: url,
					onChange: (e) => setUrl(e.target.value),
					onBlur: commit,
					className: "flex-1 rounded-lg bg-transparent px-2 py-1.5 text-xs text-muted-foreground focus:bg-black/40 focus:text-foreground focus:outline-none"
				})]
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "hidden font-mono text-[10px] text-muted-foreground sm:inline",
				children: [link.clicks, " clicks"]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: onToggle,
				className: `rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${link.is_active ? "bg-primary/15 text-primary" : "bg-white/5 text-muted-foreground"}`,
				children: link.is_active ? "Live" : "Hidden"
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: onDelete,
				className: "rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
				"aria-label": "Delete",
				children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
			})
		]
	});
}
function PreviewPanel({ username, previewKey, onRefresh }) {
	const [device, setDevice] = useState("desktop");
	const [loaded, setLoaded] = useState(false);
	const iframeRef = useRef(null);
	const handleManualRefresh = () => {
		setLoaded(false);
		onRefresh();
	};
	return /* @__PURE__ */ jsx(Panel, {
		id: "preview",
		title: "Live preview",
		sub: "This is the actual public page, rendered live — refresh after saving to see your latest changes.",
		children: !username ? /* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground",
			children: "Set a username first to preview your page."
		}) : /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "inline-flex items-center gap-1 rounded-full border border-white/8 bg-black/20 p-1",
					children: [/* @__PURE__ */ jsxs("button", {
						onClick: () => setDevice("desktop"),
						className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${device === "desktop" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ jsx(Layout, { className: "h-3.5 w-3.5" }), " Desktop"]
					}), /* @__PURE__ */ jsxs("button", {
						onClick: () => setDevice("mobile"),
						className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${device === "mobile" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ jsx(MousePointer2, { className: "h-3.5 w-3.5" }), " Mobile"]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsxs("button", {
						onClick: handleManualRefresh,
						className: "ring-focus inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-black/25 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground",
						children: [/* @__PURE__ */ jsx(Loader2, { className: `h-3.5 w-3.5 ${!loaded ? "animate-spin" : ""}` }), " Refresh"]
					}), /* @__PURE__ */ jsxs("a", {
						href: `/${username}`,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "ring-focus inline-flex items-center gap-1.5 rounded-full bg-accent-sheen px-3.5 py-1.5 text-xs font-bold text-primary-foreground shadow-accent-glow transition-transform hover:-translate-y-0.5",
						children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" }), " Open in new tab"]
					})]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex justify-center rounded-2xl border border-white/8 bg-black/40 p-4",
				children: /* @__PURE__ */ jsxs("div", {
					className: `relative overflow-hidden rounded-2xl border border-white/10 bg-background shadow-card transition-[width] duration-300 ${device === "mobile" ? "h-[720px] w-[375px]" : "h-[640px] w-full max-w-4xl"}`,
					children: [!loaded && /* @__PURE__ */ jsx("div", {
						className: "absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm",
						children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin text-primary" })
					}), /* @__PURE__ */ jsx("iframe", {
						ref: iframeRef,
						src: `/${username}`,
						title: "Live profile preview",
						allow: "autoplay",
						className: "h-full w-full border-0",
						onLoad: () => setLoaded(true)
					}, previewKey)]
				})
			})]
		})
	});
}
var SOCIAL_META = [
	{
		id: "instagram",
		label: "Instagram",
		Icon: Instagram
	},
	{
		id: "twitter",
		label: "Twitter",
		Icon: Twitter
	},
	{
		id: "x",
		label: "X",
		Icon: Twitter
	},
	{
		id: "tiktok",
		label: "TikTok",
		Icon: Music
	},
	{
		id: "youtube",
		label: "YouTube",
		Icon: Youtube
	},
	{
		id: "twitch",
		label: "Twitch",
		Icon: Twitch
	},
	{
		id: "github",
		label: "GitHub",
		Icon: Github
	},
	{
		id: "spotify",
		label: "Spotify",
		Icon: Music
	},
	{
		id: "facebook",
		label: "Facebook",
		Icon: Facebook
	},
	{
		id: "linkedin",
		label: "LinkedIn",
		Icon: Linkedin
	},
	{
		id: "telegram",
		label: "Telegram",
		Icon: Send
	},
	{
		id: "discord",
		label: "Discord",
		Icon: MessageCircle
	},
	{
		id: "snapchat",
		label: "Snapchat",
		Icon: Camera
	},
	{
		id: "website",
		label: "Website",
		Icon: Globe
	}
];
var SOCIAL_META_BY_ID = Object.fromEntries(SOCIAL_META.map((m) => [m.id, m]));
function PlatformSelectScrollbarStyle() {
	return /* @__PURE__ */ jsx("style", { children: `
      .platform-select-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.18) transparent; }
      .platform-select-scroll::-webkit-scrollbar { width: 8px; }
      .platform-select-scroll::-webkit-scrollbar-track { background: transparent; }
      .platform-select-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius: 999px; border: 2px solid #111318; background-clip: padding-box; }
      .platform-select-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.32); background-clip: padding-box; }
    ` });
}
function PlatformSelect({ value, onChange }) {
	const [open, setOpen] = useState(false);
	const [coords, setCoords] = useState(null);
	const buttonRef = useRef(null);
	const menuRef = useRef(null);
	const current = SOCIAL_META_BY_ID[value] ?? SOCIAL_META[0];
	const reposition = () => {
		const rect = buttonRef.current?.getBoundingClientRect();
		if (!rect) return;
		const MENU_WIDTH = 176;
		const MENU_MAX_HEIGHT = 256;
		const GAP = 4;
		const spaceBelow = window.innerHeight - rect.bottom;
		const top = spaceBelow < 260 && rect.top > spaceBelow ? Math.max(GAP, rect.top - GAP - Math.min(MENU_MAX_HEIGHT, rect.top - GAP)) : rect.bottom + GAP;
		const left = Math.min(rect.left, window.innerWidth - MENU_WIDTH - GAP);
		setCoords({
			top,
			left: Math.max(GAP, left),
			width: MENU_WIDTH
		});
	};
	useEffect(() => {
		if (!open) return;
		reposition();
		const onDocClick = (e) => {
			if (buttonRef.current?.contains(e.target)) return;
			if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
		};
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		const onReposition = () => reposition();
		document.addEventListener("mousedown", onDocClick);
		document.addEventListener("keydown", onKey);
		window.addEventListener("scroll", onReposition, true);
		window.addEventListener("resize", onReposition);
		return () => {
			document.removeEventListener("mousedown", onDocClick);
			document.removeEventListener("keydown", onKey);
			window.removeEventListener("scroll", onReposition, true);
			window.removeEventListener("resize", onReposition);
		};
	}, [open]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("button", {
		ref: buttonRef,
		type: "button",
		onClick: () => setOpen((o) => !o),
		"aria-haspopup": "listbox",
		"aria-expanded": open,
		className: "ring-focus flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-black/50 px-2 py-1.5 text-xs text-foreground hover:border-primary/40",
		children: [
			/* @__PURE__ */ jsx(current.Icon, { className: "h-3.5 w-3.5 shrink-0" }),
			/* @__PURE__ */ jsx("span", {
				className: "hidden sm:inline",
				children: current.label
			}),
			/* @__PURE__ */ jsx(ChevronDown, { className: cn("h-3 w-3 text-muted-foreground transition-transform", open && "rotate-180") })
		]
	}), open && coords && createPortal(/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PlatformSelectScrollbarStyle, {}), /* @__PURE__ */ jsx("div", {
		ref: menuRef,
		role: "listbox",
		style: {
			top: coords.top,
			left: coords.left,
			width: coords.width
		},
		className: "platform-select-scroll fixed z-[100] max-h-64 overflow-y-auto rounded-xl border border-white/10 bg-[#111318] p-1 shadow-2xl shadow-black/50",
		children: SOCIAL_META.map((m) => /* @__PURE__ */ jsxs("button", {
			type: "button",
			role: "option",
			"aria-selected": m.id === value,
			onClick: () => {
				onChange(m.id);
				setOpen(false);
			},
			className: cn("flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors", m.id === value ? "bg-primary/15 text-primary" : "text-foreground hover:bg-white/5"),
			children: [
				/* @__PURE__ */ jsx(m.Icon, { className: "h-3.5 w-3.5 shrink-0" }),
				/* @__PURE__ */ jsx("span", {
					className: "flex-1",
					children: m.label
				}),
				m.id === value && /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 shrink-0" })
			]
		}, m.id))
	})] }), document.body)] });
}
/** Overlay dropped on top of a locked option button/chip. Parent needs `relative`. */
function LockOverlay({ compact = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 rounded-[inherit]", "bg-black/75 backdrop-blur-[2px] text-center opacity-0 transition-opacity", "group-hover:opacity-100 group-focus-visible:opacity-100", compact && "gap-0.5"),
		children: [/* @__PURE__ */ jsx(Lock, { className: compact ? "h-3 w-3 text-primary" : "h-4 w-4 text-primary" }), /* @__PURE__ */ jsx("span", {
			className: cn("px-1 font-bold uppercase leading-tight text-foreground", compact ? "text-[8px] tracking-wide" : "text-[9px] tracking-wide"),
			children: "Locked! Get Premium to Obtain Access"
		})]
	});
}
/** Wraps an option control so locked options show a hover lock overlay and can't be selected. */
function LockableOption({ locked, onLockedClick, compact, className, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("group relative overflow-hidden rounded-[inherit]", className),
		onClickCapture: (e) => {
			if (locked) {
				e.preventDefault();
				e.stopPropagation();
				onLockedClick();
			}
		},
		children: [children, locked && /* @__PURE__ */ jsx(LockOverlay, { compact })]
	});
}
function CustomizerPanels({ profile, registerSave, pushUndo }) {
	const notify = useNotify();
	const isPremium = !!profile.is_premium;
	const goPremium = () => notify.info("This one's premium", { description: "Head to the Premium tab to redeem a code and unlock it." });
	const initial = profile.theme ?? {};
	const [theme, setTheme] = useState({
		bg_color: initial.bg_color ?? "#0a0a0b",
		bg_gradient: initial.bg_gradient ?? false,
		bg_gradient_to: initial.bg_gradient_to ?? "#101318",
		bg_gradient_angle: initial.bg_gradient_angle ?? 155,
		text_color: initial.text_color ?? "#f5f5f5",
		accent_color: initial.accent_color ?? "#22c55e",
		accent_gradient: initial.accent_gradient ?? false,
		accent_color_2: initial.accent_color_2 ?? "#38bdf8",
		glass: initial.glass ?? true,
		glass_blur: initial.glass_blur ?? 18,
		bg_video_url: initial.bg_video_url ?? "",
		bg_video_filename: initial.bg_video_filename ?? "",
		bg_audio_url: initial.bg_audio_url ?? "",
		bg_audio_filename: initial.bg_audio_filename ?? "",
		audio_volume: initial.audio_volume ?? .5,
		audio_autoplay: initial.audio_autoplay ?? true,
		audio_widget_enabled: initial.audio_widget_enabled ?? true,
		audio_widget_position: initial.audio_widget_position ?? "top-left",
		audio_widget_color: initial.audio_widget_color ?? "",
		audio_widget_style: initial.audio_widget_style ?? "default",
		audio_widget_size: initial.audio_widget_size ?? 40,
		audio_widget_shape: initial.audio_widget_shape ?? "circle",
		views_counter_enabled: initial.views_counter_enabled ?? true,
		views_counter_style: initial.views_counter_style ?? "minimal",
		views_counter_size: initial.views_counter_size ?? 12,
		views_counter_color: initial.views_counter_color ?? "",
		visualizer: initial.visualizer ?? "bars",
		visualizer_color: initial.visualizer_color ?? "",
		cursor_url: initial.cursor_url ?? "",
		cursor_effect: initial.cursor_effect ?? "none",
		splash_enabled: initial.splash_enabled ?? false,
		splash_text: initial.splash_text ?? "click to enter",
		splash_subtext: initial.splash_subtext ?? "",
		splash_font: initial.splash_font ?? "space-grotesk",
		splash_text_color: initial.splash_text_color ?? "#ffffff",
		splash_bg_color: initial.splash_bg_color ?? "#000000",
		splash_bg_url: initial.splash_bg_url ?? "",
		splash_animation: initial.splash_animation ?? "none",
		splash_blur: initial.splash_blur ?? 0,
		entry_transition: initial.entry_transition ?? "fade",
		layout: initial.layout ?? "classic",
		font_family: initial.font_family ?? "space-grotesk",
		name_font_size: initial.name_font_size ?? 0,
		bio_font_size: initial.bio_font_size ?? 0,
		link_font_size: initial.link_font_size ?? 0,
		effect: initial.effect ?? "none",
		text_animation: initial.text_animation ?? "none",
		typewriter_enabled: initial.typewriter_enabled ?? false,
		typewriter_phrases: initial.typewriter_phrases ?? ["Hello World!"],
		typewriter_speed: initial.typewriter_speed ?? 60,
		typewriter_pause: initial.typewriter_pause ?? 1400,
		typewriter_color: initial.typewriter_color ?? "",
		button_style: initial.button_style ?? "rounded",
		meta_title: initial.meta_title ?? "",
		meta_description: initial.meta_description ?? "",
		meta_image: initial.meta_image ?? ""
	});
	const [socials, setSocials] = useState(profile.socials ?? []);
	const update = (k, v) => setTheme((t) => ({
		...t,
		[k]: v
	}));
	const [typewriterPhrasesText, setTypewriterPhrasesText] = useState((initial.typewriter_phrases ?? ["Hello World!"]).join(", "));
	const qc = useQueryClient();
	const save = useMutation({
		mutationFn: async () => {
			const merged = await updateProfileTheme(theme);
			await updateProfile({ socials });
			setTheme(merged);
			return merged;
		},
		onSuccess: async () => {
			notify.success("Look saved — updating live page");
			try {
				qc.invalidateQueries({ queryKey: ["profile"] });
			} catch {}
			try {
				qc.invalidateQueries({ queryKey: ["public-profile", profile.username] });
			} catch {}
			try {
				if (typeof BroadcastChannel !== "undefined") {
					const ch = new BroadcastChannel("slugs");
					ch.postMessage({
						type: "profile-updated",
						username: profile.username
					});
					ch.close();
				} else if (typeof localStorage !== "undefined") localStorage.setItem("slugs_profile_update", JSON.stringify({
					username: profile.username,
					ts: Date.now()
				}));
			} catch (e) {}
		},
		onError: (e) => notify.error(e.message)
	});
	const accent = theme.accent_color;
	useEffect(() => {
		if (registerSave) registerSave(() => {
			try {
				pushUndo?.({
					type: "theme",
					payload: {
						theme: profile.theme ?? {},
						socials: profile.socials ?? []
					}
				});
			} catch (e) {}
			save.mutate();
		});
	}, [registerSave, profile]);
	const handleBackgroundUpload = async (file, isVideo) => {
		if (file.size > 50 * 1024 * 1024) {
			notify.error("File must be under 50MB");
			return;
		}
		try {
			const { url, filename } = await uploadProfileMedia("profile-video", file);
			const merged = await updateProfileTheme({
				bg_video_url: url,
				bg_video_filename: filename
			});
			setTheme(merged);
			const kind = isVideo ? "Video" : /\.gif(\?.*)?$/i.test(url) ? "GIF" : "Image";
			notify.success(`${kind} uploaded and saved`);
		} catch (err) {
			notify.error(err instanceof Error ? err.message : "Upload failed");
		}
	};
	const removeBackgroundVideo = async () => {
		try {
			const merged = await updateProfileTheme({
				bg_video_url: "",
				bg_video_filename: ""
			});
			setTheme(merged);
			notify.success("Background media removed");
		} catch (err) {
			notify.error(err instanceof Error ? err.message : "Couldn't remove it");
		}
	};
	const handleAudioUpload = async (file) => {
		if (file.size > 20 * 1024 * 1024) {
			notify.error("File must be under 20MB");
			return;
		}
		try {
			const { url, filename } = await uploadProfileMedia("profile-audio", file);
			const merged = await updateProfileTheme({
				bg_audio_url: url,
				bg_audio_filename: filename
			});
			setTheme(merged);
			notify.success("Audio uploaded and saved");
		} catch (err) {
			notify.error(err instanceof Error ? err.message : "Upload failed");
		}
	};
	const removeBackgroundAudio = async () => {
		try {
			const merged = await updateProfileTheme({
				bg_audio_url: "",
				bg_audio_filename: ""
			});
			setTheme(merged);
			notify.success("Audio removed");
		} catch (err) {
			notify.error(err instanceof Error ? err.message : "Couldn't remove it");
		}
	};
	const handleSplashBgUpload = async (file) => {
		if (file.size > 50 * 1024 * 1024) {
			notify.error("File must be under 50MB");
			return;
		}
		try {
			const { url } = await uploadProfileMedia("profile-splash", file);
			const merged = await updateProfileTheme({ splash_bg_url: url });
			setTheme(merged);
			const kind = /^video\//.test(file.type) ? "Video" : /\.gif(\?.*)?$/i.test(url) ? "GIF" : "Image";
			notify.success(`${kind} uploaded and saved`);
		} catch (err) {
			notify.error(err instanceof Error ? err.message : "Upload failed");
		}
	};
	const removeSplashBg = async () => {
		try {
			const merged = await updateProfileTheme({ splash_bg_url: "" });
			setTheme(merged);
			notify.success("Splash background removed");
		} catch (err) {
			notify.error(err instanceof Error ? err.message : "Couldn't remove it");
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Panel, {
			id: "layout",
			title: "Layout",
			sub: "The skeleton of your public page.",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: LAYOUTS.map((l) => {
					return /* @__PURE__ */ jsx(LockableOption, {
						locked: !isPremium && isPremiumLockedOption("layout", l.id),
						onLockedClick: goPremium,
						children: /* @__PURE__ */ jsxs("button", {
							onClick: () => update("layout", l.id),
							className: `w-full rounded-2xl border p-4 text-left transition-all ${theme.layout === l.id ? "border-primary/70 bg-primary/[0.08] shadow-accent-glow" : "border-white/8 bg-black/25 hover:border-white/25"}`,
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-display text-sm font-bold text-foreground",
										children: l.label
									}), theme.layout === l.id && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-primary" })]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-1 text-xs text-muted-foreground",
									children: l.hint
								}),
								/* @__PURE__ */ jsx(LayoutPreview, {
									id: l.id,
									accent
								})
							]
						})
					}, l.id);
				})
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			id: "typography",
			title: "Typography",
			sub: "Separate fonts for the entry screen and the page itself.",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsx(Group, {
						title: "Profile font",
						hint: `${FONTS.length} premium faces`,
						children: /* @__PURE__ */ jsx(FontGrid, {
							value: theme.font_family,
							onChange: (v) => update("font_family", v)
						})
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Entry screen font",
						hint: "Used only on click-to-enter",
						children: /* @__PURE__ */ jsx(FontGrid, {
							value: theme.splash_font,
							onChange: (v) => update("splash_font", v)
						})
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Font sizes",
						hint: "Override the size of each text element. Set to 0 for the layout's default.",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsx(Field, {
									label: (theme.name_font_size ?? 0) > 0 ? `Display name (${theme.name_font_size}px)` : "Display name (auto)",
									children: /* @__PURE__ */ jsx(Slider, {
										value: theme.name_font_size ?? 0,
										min: 0,
										max: 96,
										onChange: (v) => update("name_font_size", v)
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: (theme.bio_font_size ?? 0) > 0 ? `Bio (${theme.bio_font_size}px)` : "Bio (auto)",
									children: /* @__PURE__ */ jsx(Slider, {
										value: theme.bio_font_size ?? 0,
										min: 0,
										max: 32,
										onChange: (v) => update("bio_font_size", v)
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: (theme.link_font_size ?? 0) > 0 ? `Links (${theme.link_font_size}px)` : "Links (auto)",
									children: /* @__PURE__ */ jsx(Slider, {
										value: theme.link_font_size ?? 0,
										min: 0,
										max: 28,
										onChange: (v) => update("link_font_size", v)
									})
								})
							]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			id: "palette",
			title: "Palette",
			sub: "Colors, gradients and button shapes.",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsx(Group, {
						title: "Background",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsx(ColorField, {
										label: "Base color",
										value: theme.bg_color,
										onChange: (v) => update("bg_color", v)
									}), theme.bg_gradient && /* @__PURE__ */ jsx(ColorField, {
										label: "Gradient end",
										value: theme.bg_gradient_to,
										onChange: (v) => update("bg_gradient_to", v)
									})]
								}),
								/* @__PURE__ */ jsx(Toggle, {
									label: "Use gradient background",
									checked: !!theme.bg_gradient,
									onChange: (v) => update("bg_gradient", v)
								}),
								theme.bg_gradient && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Field, {
									label: `Angle (${theme.bg_gradient_angle}°)`,
									children: /* @__PURE__ */ jsx(Slider, {
										value: theme.bg_gradient_angle,
										min: 0,
										max: 360,
										onChange: (v) => update("bg_gradient_angle", v)
									})
								}), /* @__PURE__ */ jsx(Field, {
									label: "Presets",
									children: /* @__PURE__ */ jsx("div", {
										className: "grid grid-cols-3 gap-2 sm:grid-cols-6",
										children: GRADIENT_PRESETS.map((g) => /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => {
												update("bg_color", g.from);
												update("bg_gradient_to", g.to);
												update("bg_gradient_angle", g.angle);
											},
											className: "overflow-hidden rounded-xl border border-white/10 transition-transform hover:-translate-y-0.5",
											children: [/* @__PURE__ */ jsx("span", {
												className: "block h-10 w-full",
												style: { background: `linear-gradient(${g.angle}deg, ${g.from}, ${g.to})` }
											}), /* @__PURE__ */ jsx("span", {
												className: "block bg-black/40 py-1 text-[10px] font-semibold text-muted-foreground",
												children: g.label
											})]
										}, g.label))
									})
								})] }),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-xl border border-white/8 p-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground",
										children: "Preview"
									}), /* @__PURE__ */ jsx("div", {
										className: "h-16 rounded-lg",
										style: { background: theme.bg_gradient ? `linear-gradient(${theme.bg_gradient_angle}deg, ${theme.bg_color}, ${theme.bg_gradient_to})` : theme.bg_color }
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Text & accent",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsx(ColorField, {
										label: "Text color",
										value: theme.text_color,
										onChange: (v) => update("text_color", v)
									}), /* @__PURE__ */ jsx(ColorField, {
										label: "Accent color",
										value: theme.accent_color,
										onChange: (v) => update("accent_color", v)
									})]
								}),
								/* @__PURE__ */ jsx(Toggle, {
									label: "Gradient accent",
									hint: "Blends two accent colors on avatar ring and highlights",
									checked: !!theme.accent_gradient,
									onChange: (v) => update("accent_gradient", v)
								}),
								theme.accent_gradient && /* @__PURE__ */ jsx(ColorField, {
									label: "Accent end",
									value: theme.accent_color_2,
									onChange: (v) => update("accent_color_2", v)
								})
							]
						})
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Surface & buttons",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsx(Field, {
									label: "Button shape",
									children: /* @__PURE__ */ jsx(Segmented, {
										value: theme.button_style,
										onChange: (v) => update("button_style", v),
										options: BUTTON_STYLES.map((b) => ({
											id: b.id,
											label: b.label
										}))
									})
								}),
								/* @__PURE__ */ jsx(Toggle, {
									label: "Glass card",
									checked: !!theme.glass,
									onChange: (v) => update("glass", v)
								}),
								/* @__PURE__ */ jsx(Field, {
									label: `Glass blur (${theme.glass_blur}px)`,
									children: /* @__PURE__ */ jsx(Slider, {
										value: theme.glass_blur,
										min: 0,
										max: 40,
										onChange: (v) => update("glass_blur", v)
									})
								})
							]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			id: "effects",
			title: "Background effects",
			sub: "Ambient motion behind your card.",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-2",
					children: EFFECTS.map((e) => {
						return /* @__PURE__ */ jsx(LockableOption, {
							locked: !isPremium && isPremiumLockedOption("effect", e.id),
							onLockedClick: goPremium,
							compact: true,
							className: "rounded-full",
							children: /* @__PURE__ */ jsx(Chip, {
								active: theme.effect === e.id,
								onClick: () => update("effect", e.id),
								children: e.label
							})
						}, e.id);
					})
				}), /* @__PURE__ */ jsx(Group, {
					title: "Typewriter line",
					children: /* @__PURE__ */ jsxs("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ jsx(Toggle, {
								label: "Enable typewriter",
								checked: !!theme.typewriter_enabled,
								onChange: (v) => update("typewriter_enabled", v)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Phrases",
								hint: "comma-separated",
								children: /* @__PURE__ */ jsx(Text, {
									value: typewriterPhrasesText,
									onChange: (v) => {
										setTypewriterPhrasesText(v);
										update("typewriter_phrases", v.split(",").map((s) => s.trim()).filter(Boolean));
									},
									placeholder: "Hello World!"
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: `Typing speed (${theme.typewriter_speed}ms per character)`,
								hint: "lower = faster",
								children: /* @__PURE__ */ jsx(Slider, {
									value: theme.typewriter_speed ?? 60,
									min: 20,
									max: 150,
									onChange: (v) => update("typewriter_speed", v)
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: `Pause between phrases (${((theme.typewriter_pause ?? 1400) / 1e3).toFixed(1)}s)`,
								children: /* @__PURE__ */ jsx(Slider, {
									value: theme.typewriter_pause ?? 1400,
									min: 200,
									max: 4e3,
									onChange: (v) => update("typewriter_pause", v)
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Text color",
								hint: "Leave blank to match your accent color",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx(ColorField, {
										label: "",
										value: theme.typewriter_color || theme.accent_color,
										onChange: (v) => update("typewriter_color", v)
									}), theme.typewriter_color && /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => update("typewriter_color", ""),
										className: "text-xs font-semibold text-muted-foreground hover:text-foreground",
										children: "Reset"
									})]
								})
							})
						]
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			id: "textfx",
			title: "Text animation",
			sub: `Applied to your display name. ${TEXT_ANIMATIONS.length - 1} available.`,
			children: /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6",
				children: TEXT_ANIMATIONS.map((a) => {
					return /* @__PURE__ */ jsx(LockableOption, {
						locked: !isPremium && isPremiumLockedOption("text_animation", a.id),
						onLockedClick: goPremium,
						compact: true,
						children: /* @__PURE__ */ jsxs("button", {
							onClick: () => update("text_animation", a.id),
							className: `w-full rounded-xl border px-3 py-3 text-center transition-all ${theme.text_animation === a.id ? "border-primary/70 bg-primary/[0.08] shadow-accent-glow" : "border-white/8 bg-black/25 hover:border-white/25"}`,
							children: [/* @__PURE__ */ jsx("span", {
								className: `block text-base font-bold text-foreground ${a.id === "none" ? "" : `txt-${a.id}`}`,
								"data-text": "Aa",
								children: "Aa"
							}), /* @__PURE__ */ jsx("span", {
								className: "mt-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground",
								children: a.label
							})]
						})
					}, a.id);
				})
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			id: "cursor",
			title: "Cursor",
			sub: "Trail effects and a custom pointer image.",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ jsx(Field, {
					label: "Cursor effect",
					hint: `${CURSOR_EFFECTS.length - 1} effects`,
					children: /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6",
						children: CURSOR_EFFECTS.map((c) => {
							return /* @__PURE__ */ jsx(LockableOption, {
								locked: !isPremium && isPremiumLockedOption("cursor", c.id),
								onLockedClick: goPremium,
								compact: true,
								children: /* @__PURE__ */ jsx(Chip, {
									active: theme.cursor_effect === c.id,
									onClick: () => update("cursor_effect", c.id),
									children: c.label
								})
							}, c.id);
						})
					})
				}), /* @__PURE__ */ jsx(Field, {
					label: "Custom cursor image",
					hint: "png/svg 32×32",
					children: /* @__PURE__ */ jsx(Text, {
						value: theme.cursor_url ?? "",
						onChange: (v) => update("cursor_url", v),
						placeholder: "https://…/cursor.png"
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			id: "media",
			title: "Media",
			sub: "Background media and looping audio with a visualizer.",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsx(Group, {
						title: "Background",
						hint: "Video, GIF, or still image",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsx(Field, {
									label: "Background media",
									hint: "mp4 / webm / gif / png / jpg",
									children: theme.bg_video_url ? /* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-black/25 px-4 py-3",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "flex min-w-0 items-center gap-2 text-sm text-foreground",
											children: [/* @__PURE__ */ jsx(Clapperboard, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ jsx("span", {
												className: "truncate",
												children: mediaDisplayName(theme.bg_video_url, theme.bg_video_filename, "Background media")
											})]
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: removeBackgroundVideo,
											className: "shrink-0 text-[11px] font-semibold text-muted-foreground hover:text-destructive",
											children: "Remove"
										})]
									}) : /* @__PURE__ */ jsx("p", {
										className: "text-[11px] text-muted-foreground",
										children: "No background media set — upload a file below."
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Or upload a file",
									hint: "mp4, webm, gif, png, jpg, webp — up to 50MB",
									children: /* @__PURE__ */ jsx(MediaUploadButton, {
										icon: Clapperboard,
										label: "Choose file",
										accept: "video/mp4,video/webm,image/gif,image/png,image/jpeg,image/webp",
										onFile: async (file) => {
											const isVideo = /^video\//.test(file.type);
											await handleBackgroundUpload(file, isVideo);
										}
									})
								}),
								theme.bg_video_url && /* @__PURE__ */ jsx("div", {
									className: "overflow-hidden rounded-xl border border-white/8",
									children: /* @__PURE__ */ jsx(BackgroundMediaPreview, { url: theme.bg_video_url })
								})
							]
						})
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Audio",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsx(Field, {
									label: "Background audio",
									hint: "mp3 / ogg — loops",
									children: theme.bg_audio_url ? /* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-black/25 px-4 py-3",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "flex min-w-0 items-center gap-2 text-sm text-foreground",
											children: [/* @__PURE__ */ jsx(Music, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ jsx("span", {
												className: "truncate",
												children: mediaDisplayName(theme.bg_audio_url, theme.bg_audio_filename, "Background audio")
											})]
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: removeBackgroundAudio,
											className: "shrink-0 text-[11px] font-semibold text-muted-foreground hover:text-destructive",
											children: "Remove"
										})]
									}) : /* @__PURE__ */ jsx("p", {
										className: "text-[11px] text-muted-foreground",
										children: "No background audio set — upload a file below."
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Or upload a file",
									hint: "mp3 / wav / ogg — up to 20MB",
									children: /* @__PURE__ */ jsx(MediaUploadButton, {
										icon: Music,
										label: "Choose audio file",
										accept: "audio/*",
										onFile: async (file) => {
											await handleAudioUpload(file);
										}
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Visualizer",
									children: /* @__PURE__ */ jsx(Segmented, {
										value: theme.visualizer,
										onChange: (v) => update("visualizer", v),
										options: VISUALIZERS.map((v) => ({
											id: v.id,
											label: v.label
										}))
									})
								}),
								theme.visualizer !== "none" && /* @__PURE__ */ jsx(Field, {
									label: "Visualizer color",
									hint: "Leave blank to match the widget color",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx(ColorField, {
											label: "",
											value: theme.visualizer_color || theme.audio_widget_color || theme.accent_color,
											onChange: (v) => update("visualizer_color", v)
										}), theme.visualizer_color && /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => update("visualizer_color", ""),
											className: "text-xs font-semibold text-muted-foreground hover:text-foreground",
											children: "Reset"
										})]
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: `Volume (${Math.round((theme.audio_volume ?? .5) * 100)}%)`,
									children: /* @__PURE__ */ jsx(Slider, {
										value: Math.round((theme.audio_volume ?? .5) * 100),
										min: 0,
										max: 100,
										onChange: (v) => update("audio_volume", v / 100)
									})
								}),
								/* @__PURE__ */ jsx(Toggle, {
									label: "Autoplay on load",
									checked: !!theme.audio_autoplay,
									onChange: (v) => update("audio_autoplay", v)
								})
							]
						})
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Floating volume control",
						hint: "Small mute button + hover volume bar shown on your page",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ jsx(Toggle, {
								label: "Show floating control",
								checked: !!theme.audio_widget_enabled,
								onChange: (v) => update("audio_widget_enabled", v)
							}), theme.audio_widget_enabled && /* @__PURE__ */ jsxs(Fragment, { children: [
								/* @__PURE__ */ jsxs(Field, {
									label: "Widget style",
									children: [/* @__PURE__ */ jsx(Segmented, {
										value: theme.audio_widget_style ?? "default",
										onChange: (v) => update("audio_widget_style", v),
										options: AUDIO_WIDGET_STYLES.map((s) => ({
											id: s.id,
											label: s.label
										}))
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-2 text-[11px] text-muted-foreground",
										children: AUDIO_WIDGET_STYLES.find((s) => s.id === (theme.audio_widget_style ?? "default"))?.hint
									})]
								}),
								/* @__PURE__ */ jsx(Field, {
									label: `Widget size (${theme.audio_widget_size ?? 40}px)`,
									children: /* @__PURE__ */ jsx(Slider, {
										value: theme.audio_widget_size ?? 40,
										min: 24,
										max: 72,
										onChange: (v) => update("audio_widget_size", v)
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Widget shape",
									children: /* @__PURE__ */ jsx(Segmented, {
										value: theme.audio_widget_shape ?? "circle",
										onChange: (v) => update("audio_widget_shape", v),
										options: [
											{
												id: "circle",
												label: "Circle"
											},
											{
												id: "rounded",
												label: "Rounded"
											},
											{
												id: "square",
												label: "Square"
											},
											{
												id: "rectangle",
												label: "Rectangle"
											}
										]
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Position",
									children: /* @__PURE__ */ jsx(Segmented, {
										value: theme.audio_widget_position,
										onChange: (v) => update("audio_widget_position", v),
										options: [
											{
												id: "top-left",
												label: "Top left"
											},
											{
												id: "top-right",
												label: "Top right"
											},
											{
												id: "bottom-left",
												label: "Bottom left"
											},
											{
												id: "bottom-right",
												label: "Bottom right"
											}
										]
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Widget color",
									hint: "Leave blank to match accent color",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx(ColorField, {
											label: "",
											value: theme.audio_widget_color || theme.accent_color,
											onChange: (v) => update("audio_widget_color", v)
										}), theme.audio_widget_color && /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => update("audio_widget_color", ""),
											className: "text-xs font-semibold text-muted-foreground hover:text-foreground",
											children: "Reset to accent"
										})]
									})
								})
							] })]
						})
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Profile views",
						hint: "A view counter shown near your username. Each visitor only ever counts once.",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ jsx(Toggle, {
								label: "Show view counter",
								checked: theme.views_counter_enabled ?? true,
								onChange: (v) => update("views_counter_enabled", v)
							}), (theme.views_counter_enabled ?? true) && /* @__PURE__ */ jsxs(Fragment, { children: [
								/* @__PURE__ */ jsx(Field, {
									label: "Style",
									children: /* @__PURE__ */ jsx(Segmented, {
										value: theme.views_counter_style ?? "minimal",
										onChange: (v) => update("views_counter_style", v),
										options: [
											{
												id: "minimal",
												label: "Minimal"
											},
											{
												id: "badge",
												label: "Badge"
											},
											{
												id: "pill",
												label: "Pill"
											}
										]
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: `Size (${theme.views_counter_size ?? 12}px)`,
									children: /* @__PURE__ */ jsx(Slider, {
										value: theme.views_counter_size ?? 12,
										min: 9,
										max: 24,
										onChange: (v) => update("views_counter_size", v)
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Color",
									hint: "Leave blank to match your text color",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx(ColorField, {
											label: "",
											value: theme.views_counter_color || theme.text_color,
											onChange: (v) => update("views_counter_color", v)
										}), theme.views_counter_color && /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => update("views_counter_color", ""),
											className: "text-xs font-semibold text-muted-foreground hover:text-foreground",
											children: "Reset"
										})]
									})
								})
							] })]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			id: "entry",
			title: "Entry screen",
			sub: "The click-to-enter splash, styled independently.",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsx(Toggle, {
						label: "Enable click-to-enter",
						checked: !!theme.splash_enabled,
						onChange: (v) => update("splash_enabled", v)
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Copy",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsx(Field, {
								label: "Main text",
								children: /* @__PURE__ */ jsx(Text, {
									value: theme.splash_text ?? "",
									onChange: (v) => update("splash_text", v),
									placeholder: "click to enter",
									maxLength: 80
								})
							}), /* @__PURE__ */ jsx(Field, {
								label: "Subtext",
								children: /* @__PURE__ */ jsx(Text, {
									value: theme.splash_subtext ?? "",
									onChange: (v) => update("splash_subtext", v),
									placeholder: "optional",
									maxLength: 120
								})
							})]
						})
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Splash background",
						hint: "Optional image, GIF, or video shown behind the click-to-enter text",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ jsx(Field, {
								label: "Upload a file",
								hint: "mp4, webm, gif, png, jpg, webp — up to 50MB",
								children: /* @__PURE__ */ jsx(MediaUploadButton, {
									icon: Clapperboard,
									label: "Choose file",
									accept: "video/mp4,video/webm,image/gif,image/png,image/jpeg,image/webp",
									onFile: handleSplashBgUpload
								})
							}), theme.splash_bg_url ? /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx("div", {
									className: "overflow-hidden rounded-xl border border-white/8",
									children: /* @__PURE__ */ jsx(BackgroundMediaPreview, { url: theme.splash_bg_url })
								}), /* @__PURE__ */ jsxs("button", {
									onClick: removeSplashBg,
									className: "inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground hover:border-destructive/40 hover:text-destructive",
									children: [/* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }), " Remove"]
								})]
							}) : /* @__PURE__ */ jsx("p", {
								className: "text-[11px] text-muted-foreground",
								children: "No splash background set — it'll just show your backdrop color."
							})]
						})
					}),
					/* @__PURE__ */ jsxs(Group, {
						title: "Transition",
						hint: "What happens the moment someone clicks to enter.",
						children: [/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
							children: ENTRY_TRANSITIONS.map((t) => {
								return /* @__PURE__ */ jsx(LockableOption, {
									locked: !isPremium && isPremiumLockedOption("entry_transition", t.id),
									onLockedClick: goPremium,
									children: /* @__PURE__ */ jsxs("button", {
										onClick: () => update("entry_transition", t.id),
										className: `w-full rounded-xl border p-3 text-left transition-all ${(theme.entry_transition ?? "fade") === t.id ? "border-primary/70 bg-primary/[0.08] shadow-accent-glow" : "border-white/8 bg-black/25 hover:border-white/25"}`,
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-xs font-bold text-foreground",
												children: t.label
											}), (theme.entry_transition ?? "fade") === t.id && /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 text-primary" })]
										}), /* @__PURE__ */ jsx("div", {
											className: "mt-1 text-[11px] leading-snug text-muted-foreground",
											children: t.hint
										})]
									})
								}, t.id);
							})
						}), /* @__PURE__ */ jsx(EntryTransitionPreview, {
							transition: theme.entry_transition ?? "fade",
							accent
						})]
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Style",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsx(ColorField, {
										label: "Text color",
										value: theme.splash_text_color,
										onChange: (v) => update("splash_text_color", v)
									}), /* @__PURE__ */ jsx(ColorField, {
										label: "Backdrop",
										value: theme.splash_bg_color,
										onChange: (v) => update("splash_bg_color", v)
									})]
								}),
								/* @__PURE__ */ jsx(Field, {
									label: `Backdrop blur (${theme.splash_blur}px)`,
									children: /* @__PURE__ */ jsx(Slider, {
										value: theme.splash_blur,
										min: 0,
										max: 30,
										onChange: (v) => update("splash_blur", v)
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Entry text animation",
									children: /* @__PURE__ */ jsx("div", {
										className: "grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6",
										children: TEXT_ANIMATIONS.map((a) => /* @__PURE__ */ jsx(Chip, {
											active: theme.splash_animation === a.id,
											onClick: () => update("splash_animation", a.id),
											children: a.label
										}, a.id))
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "overflow-hidden rounded-xl border border-white/8",
									children: /* @__PURE__ */ jsxs("div", {
										className: `flex h-28 flex-col items-center justify-center ${theme.splash_font ? `font-family-${theme.splash_font}` : ""}`,
										style: {
											background: theme.splash_bg_color,
											color: theme.splash_text_color
										},
										children: [/* @__PURE__ */ jsx(AnimatedText, {
											text: theme.splash_text || "click to enter",
											animation: theme.splash_animation ?? "none",
											className: "text-2xl font-black"
										}, `${theme.splash_animation}-${theme.splash_text}`), theme.splash_subtext && /* @__PURE__ */ jsx("span", {
											className: "mt-2 text-[10px] uppercase tracking-[0.3em] opacity-60",
											children: theme.splash_subtext
										})]
									})
								})
							]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			id: "socials",
			title: "Socials",
			sub: "Icon row shown on your page.",
			right: /* @__PURE__ */ jsxs("button", {
				onClick: () => setSocials((s) => [...s, {
					platform: "instagram",
					url: ""
				}]),
				className: "inline-flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold hover:border-primary/40 hover:text-primary",
				children: [/* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" }), " Add"]
			}),
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [socials.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "No social icons yet."
				}), socials.map((s, i) => /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2 rounded-xl border border-white/8 bg-black/25 p-2",
					children: [
						/* @__PURE__ */ jsx(PlatformSelect, {
							value: s.platform,
							onChange: (platform) => setSocials((all) => all.map((x, idx) => idx === i ? {
								...x,
								platform
							} : x))
						}),
						/* @__PURE__ */ jsx("input", {
							value: s.url,
							onChange: (e) => setSocials((all) => all.map((x, idx) => idx === i ? {
								...x,
								url: e.target.value
							} : x)),
							placeholder: "https://…",
							className: "flex-1 rounded-lg bg-transparent px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setSocials((all) => all.filter((_, idx) => idx !== i)),
							className: "rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
							"aria-label": "Remove",
							children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
						})
					]
				}, i))]
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			id: "seo",
			title: "SEO & sharing",
			sub: `Meta tags for /${profile.username} link previews.`,
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsx(Field, {
						label: "Meta title",
						hint: "< 60 chars",
						children: /* @__PURE__ */ jsx(Text, {
							value: theme.meta_title ?? "",
							onChange: (v) => update("meta_title", v.slice(0, 60)),
							placeholder: `${profile.display_name || profile.username} — slugs.lol`
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Meta description",
						hint: "< 160 chars",
						children: /* @__PURE__ */ jsx("textarea", {
							value: theme.meta_description ?? "",
							onChange: (e) => update("meta_description", e.target.value.slice(0, 160)),
							rows: 2,
							placeholder: "One line about you.",
							className: "field-input resize-none text-sm"
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Preview image URL",
						children: /* @__PURE__ */ jsx(Text, {
							value: theme.meta_image ?? "",
							onChange: (v) => update("meta_image", v),
							placeholder: "https://…/cover.jpg"
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-primary/25 bg-primary/[0.06] p-5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 text-sm font-bold text-primary",
							children: [/* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4" }), " Premium badge & priority support"]
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-1.5 text-xs text-muted-foreground",
							children: [
								"Toggle the exclusive badge in Identity. Premium pages jump the queue — email ",
								/* @__PURE__ */ jsx("span", {
									className: "font-mono text-foreground",
									children: "support@slugs.lol"
								}),
								"."
							]
						})]
					})
				]
			})
		})
	] });
}
function EntryTransitionPreview({ transition, accent }) {
	const [leaving, setLeaving] = useState(false);
	const [tick, setTick] = useState(0);
	const replay = () => {
		setLeaving(false);
		requestAnimationFrame(() => {
			setTick((t) => t + 1);
			requestAnimationFrame(() => setLeaving(true));
		});
	};
	const style = getSplashLeaveStyle(transition, leaving, {
		x: 50,
		y: 50
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-1 space-y-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative h-24 overflow-hidden rounded-xl border border-white/8 bg-black/40",
			children: [/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 grid place-items-center text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground",
				children: "your page"
			}), transition === "curtain" ? /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 z-10 grid place-items-center text-[10px] font-black uppercase tracking-[0.2em] text-white",
					style: {
						opacity: leaving ? 0 : 1,
						transition: "opacity 200ms ease"
					},
					children: "click to enter"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "pointer-events-none absolute inset-y-0 left-0 z-0 w-1/2 bg-black",
					style: getCurtainPanelStyle("left", leaving)
				}),
				/* @__PURE__ */ jsx("div", {
					className: "pointer-events-none absolute inset-y-0 right-0 z-0 w-1/2 bg-black",
					style: getCurtainPanelStyle("right", leaving)
				})
			] }) : /* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 grid place-items-center bg-black text-xs font-black uppercase tracking-[0.2em] text-white",
				style,
				children: "click to enter"
			})]
		}, tick), /* @__PURE__ */ jsxs("button", {
			onClick: replay,
			className: "inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary",
			children: [/* @__PURE__ */ jsx(Sparkles, {
				className: "h-3 w-3",
				style: { color: accent }
			}), " Replay"]
		})]
	});
}
function BackgroundMediaPreview({ url }) {
	return /\.(mp4|webm)(\?.*)?$/i.test(url) ? /* @__PURE__ */ jsx("video", {
		src: url,
		autoPlay: true,
		loop: true,
		muted: true,
		playsInline: true,
		className: "h-32 w-full object-cover"
	}) : /* @__PURE__ */ jsx("img", {
		src: url,
		alt: "Background preview",
		className: "h-32 w-full object-cover"
	});
}
function MediaUploadButton({ onFile, icon: Icon, label, accept }) {
	const [status, setStatus] = useState("idle");
	const [fileName, setFileName] = useState(null);
	const inputId = useRef(`media-upload-${Math.random().toString(36).slice(2)}`).current;
	const handleChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setFileName(file.name);
		setStatus("uploading");
		try {
			await onFile(file);
			setStatus("done");
			setTimeout(() => setStatus("idle"), 2e3);
		} catch {
			setStatus("idle");
		} finally {
			e.target.value = "";
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3",
		children: [
			/* @__PURE__ */ jsx("input", {
				type: "file",
				accept,
				onChange: handleChange,
				className: "sr-only",
				id: inputId
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: inputId,
				className: `group inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all
          ${status === "uploading" ? "border-primary/40 bg-primary/[0.08] text-primary" : status === "done" ? "border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-400" : "border-white/10 bg-black/30 text-foreground hover:border-primary/40 hover:bg-primary/[0.06] hover:text-primary hover:shadow-accent-glow"}`,
				children: [status === "uploading" ? /* @__PURE__ */ jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin" }) : status === "done" ? /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5 transition-transform group-hover:scale-110" }), status === "uploading" ? "Uploading…" : status === "done" ? "Uploaded" : label]
			}),
			fileName && status !== "idle" && /* @__PURE__ */ jsx("span", {
				className: "truncate text-xs text-muted-foreground",
				children: fileName
			})
		]
	});
}
function AvatarPicker({ value, onChange }) {
	const notify = useNotify();
	const [status, setStatus] = useState("idle");
	const inputId = useRef(`avatar-upload-${Math.random().toString(36).slice(2)}`).current;
	const isVideo = /\.(mp4|webm)(\?.*)?$/i.test(value);
	const handleChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 15 * 1024 * 1024) {
			notify.error("File must be under 15MB");
			e.target.value = "";
			return;
		}
		setStatus("uploading");
		try {
			const { url } = await uploadProfileMedia("profile-avatar", file);
			await updateProfile({ avatar_url: url });
			onChange(url);
			notify.success("Avatar updated");
		} catch (err) {
			notify.error(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setStatus("idle");
			e.target.value = "";
		}
	};
	const removeAvatar = async () => {
		setStatus("removing");
		try {
			await updateProfile({ avatar_url: null });
			onChange("");
			notify.success("Avatar removed");
		} catch (err) {
			notify.error(err instanceof Error ? err.message : "Couldn't remove avatar");
		} finally {
			setStatus("idle");
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-white/10 bg-black/40",
				children: [value ? isVideo ? /* @__PURE__ */ jsx("video", {
					src: value,
					autoPlay: true,
					loop: true,
					muted: true,
					playsInline: true,
					className: "h-full w-full object-cover"
				}) : /* @__PURE__ */ jsx("img", {
					src: value,
					alt: "Avatar preview",
					className: "h-full w-full object-cover",
					onError: (e) => {
						const target = e.target;
						if (!target.src.includes("?t=")) target.src = target.src + "?t=" + Date.now();
					}
				}) : /* @__PURE__ */ jsx(ImageOff, { className: "h-5 w-5 text-muted-foreground/50" }), (status === "uploading" || status === "removing") && /* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 grid place-items-center bg-black/60",
					children: /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-primary" })
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-1 flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ jsx("input", {
						type: "file",
						accept: "image/*,video/mp4,video/webm",
						onChange: handleChange,
						className: "sr-only",
						id: inputId
					}),
					/* @__PURE__ */ jsxs("label", {
						htmlFor: inputId,
						className: "group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/[0.06] hover:text-primary hover:shadow-accent-glow",
						children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 transition-transform group-hover:scale-110" }), value ? "Replace" : "Upload"]
					}),
					value && /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => void removeAvatar(),
						disabled: status === "removing",
						className: "inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/30 px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive disabled:opacity-40",
						children: [/* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" }), " No avatar"]
					})
				]
			})]
		}), /* @__PURE__ */ jsx(Text, {
			value,
			onChange,
			placeholder: "https://…/avatar.png, .gif or .mp4"
		})]
	});
}
function FontGrid({ value, onChange }) {
	return /* @__PURE__ */ jsx("div", {
		className: "grid gap-2 sm:grid-cols-2 xl:grid-cols-3",
		children: FONTS.map((f) => /* @__PURE__ */ jsxs("button", {
			onClick: () => onChange(f.id),
			className: `rounded-xl border p-4 text-left transition-all ${value === f.id ? "border-primary/70 bg-primary/[0.08] shadow-accent-glow" : "border-white/8 bg-black/25 hover:border-white/25"}`,
			children: [/* @__PURE__ */ jsx("div", {
				className: `${f.className} truncate text-xl text-foreground`,
				children: "Aa Bb — 123"
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
				children: f.label
			})]
		}, f.id))
	});
}
function LayoutPreview({ id, accent }) {
	const bar = "block h-1.5 rounded-full";
	const dim = {
		background: "white",
		opacity: .15
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-4 rounded-lg border border-white/8 bg-black/50 p-3",
		children: [id !== "split" && id !== "terminal" && id !== "compact" && /* @__PURE__ */ jsx("div", {
			className: `h-6 w-6 rounded-full ${id === "banner" ? "" : "mx-auto"}`,
			style: { background: accent }
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-2 space-y-1.5",
			children: [
				id === "classic" && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("span", {
						className: bar,
						style: {
							background: accent,
							width: "60%",
							margin: "0 auto"
						}
					}),
					/* @__PURE__ */ jsx("span", {
						className: bar,
						style: {
							...dim,
							width: "100%"
						}
					}),
					/* @__PURE__ */ jsx("span", {
						className: bar,
						style: {
							...dim,
							width: "100%"
						}
					})
				] }),
				id === "minimal" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
					className: bar,
					style: {
						...dim,
						width: "40%",
						margin: "0 auto"
					}
				}), /* @__PURE__ */ jsx("span", {
					className: bar,
					style: {
						...dim,
						width: "55%",
						margin: "0 auto"
					}
				})] }),
				id === "hero" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
					className: "block h-3 w-full rounded",
					style: {
						background: accent,
						opacity: .55
					}
				}), /* @__PURE__ */ jsx("span", {
					className: bar,
					style: {
						...dim,
						width: "100%"
					}
				})] }),
				id === "compact" && /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 gap-1",
					children: [
						0,
						1,
						2,
						3
					].map((k) => /* @__PURE__ */ jsx("span", {
						className: bar,
						style: dim
					}, k))
				}),
				id === "grid" && /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-3 gap-1",
					children: [
						.35,
						.25,
						.35
					].map((o, k) => /* @__PURE__ */ jsx("span", {
						className: "block h-4 rounded",
						style: {
							background: accent,
							opacity: o
						}
					}, k))
				}),
				id === "split" && /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "block h-8 rounded",
						style: {
							background: accent,
							opacity: .3
						}
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: bar,
								style: dim
							}),
							/* @__PURE__ */ jsx("span", {
								className: bar,
								style: dim
							}),
							/* @__PURE__ */ jsx("span", {
								className: bar,
								style: dim
							})
						]
					})]
				}),
				id === "banner" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
					className: "block h-4 w-full rounded",
					style: { background: `linear-gradient(90deg, ${accent}, transparent)` }
				}), /* @__PURE__ */ jsx("span", {
					className: bar,
					style: {
						...dim,
						width: "100%"
					}
				})] }),
				id === "terminal" && /* @__PURE__ */ jsxs("div", {
					className: "rounded border border-white/15 bg-black/70 p-1.5",
					children: [/* @__PURE__ */ jsx("span", {
						className: "block font-mono text-[8px]",
						style: { color: accent },
						children: "> ls ./links"
					}), /* @__PURE__ */ jsx("span", {
						className: bar,
						style: {
							...dim,
							width: "80%",
							marginTop: 4
						}
					})]
				}),
				id === "neon" && /* @__PURE__ */ jsx("div", {
					className: "rounded border p-1.5",
					style: {
						borderColor: accent,
						boxShadow: `0 0 10px ${accent}80`
					},
					children: /* @__PURE__ */ jsx("span", {
						className: bar,
						style: {
							background: accent,
							width: "70%",
							margin: "0 auto"
						}
					})
				}),
				id === "stack" && /* @__PURE__ */ jsx(Fragment, { children: [
					.18,
					.13,
					.08
				].map((o, k) => /* @__PURE__ */ jsx("span", {
					className: "block h-3 rounded",
					style: {
						background: "white",
						opacity: o
					}
				}, k)) }),
				id === "tilt3d" && /* @__PURE__ */ jsx("div", {
					className: "grid place-items-center py-1",
					style: { perspective: 240 },
					children: /* @__PURE__ */ jsx("div", {
						className: "h-9 w-14 rounded-md border",
						style: {
							borderColor: `${accent}80`,
							background: `linear-gradient(135deg, ${accent}33, transparent)`,
							boxShadow: `0 10px 18px -8px ${accent}80`,
							transform: "rotateX(18deg) rotateY(-22deg)",
							transformStyle: "preserve-3d"
						}
					})
				})
			]
		})]
	});
}
function RoleBadge({ role, size = 16 }) {
	return /* @__PURE__ */ jsx("span", {
		className: "inline-flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full [&>img]:h-full [&>img]:w-full [&>img]:rounded-[3px] [&>img]:object-contain",
		style: {
			color: role.color,
			width: size,
			height: size
		},
		dangerouslySetInnerHTML: { __html: role.icon_svg }
	});
}
function BadgesPanel({ profile }) {
	const notify = useNotify();
	const qc = useQueryClient();
	const rolesQ = useQuery({
		queryKey: ["my-roles", profile.id],
		queryFn: () => listProfileRoles(profile.id)
	});
	const roles = rolesQ.data ?? [];
	const initialTheme = profile.theme ?? {};
	const [badgeSize, setBadgeSize] = useState(initialTheme.badge_size ?? 20);
	const [badgeGap, setBadgeGap] = useState(initialTheme.badge_gap ?? 8);
	const saveLayout = useMutation({
		mutationFn: (patch) => updateProfileTheme(patch),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["public-profile"] }),
		onError: (e) => notify.error(e.message)
	});
	const layoutSaveTimer = useRef();
	const scheduleLayoutSave = (patch) => {
		if (layoutSaveTimer.current) clearTimeout(layoutSaveTimer.current);
		layoutSaveTimer.current = setTimeout(() => saveLayout.mutate(patch), 400);
	};
	const toggleVisibility = useMutation({
		mutationFn: ({ roleId, visible }) => adminSetRoleVisibility(profile.id, roleId, visible),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["my-roles", profile.id] });
			qc.invalidateQueries({ queryKey: ["public-profile"] });
			notify.success("Badge visibility updated");
		},
		onError: (e) => notify.error(e.message)
	});
	return /* @__PURE__ */ jsx(Panel, {
		id: "badges",
		title: "Badges",
		sub: "Toggle which badges appear on your public profile.",
		children: rolesQ.isLoading ? /* @__PURE__ */ jsx("div", {
			className: "flex items-center justify-center py-10",
			children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin text-primary" })
		}) : roles.length === 0 ? /* @__PURE__ */ jsxs("div", {
			className: "rounded-2xl border border-dashed border-white/10 bg-black/20 p-8 text-center",
			children: [/* @__PURE__ */ jsx(Award, { className: "mx-auto h-6 w-6 text-muted-foreground/50" }), /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "No badges yet — earn one or ask an admin to grant it."
			})]
		}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Group, {
			title: "Layout",
			hint: "How the badge row looks on your public profile.",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
						children: [/* @__PURE__ */ jsx("span", { children: "Badge size" }), /* @__PURE__ */ jsxs("span", {
							className: "font-mono normal-case tracking-normal text-foreground",
							children: [badgeSize, "px"]
						})]
					}), /* @__PURE__ */ jsx(Slider, {
						value: badgeSize,
						min: 12,
						max: 40,
						onChange: (v) => {
							setBadgeSize(v);
							scheduleLayoutSave({ badge_size: v });
						}
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
						children: [/* @__PURE__ */ jsx("span", { children: "Spacing" }), /* @__PURE__ */ jsxs("span", {
							className: "font-mono normal-case tracking-normal text-foreground",
							children: [badgeGap, "px"]
						})]
					}), /* @__PURE__ */ jsx(Slider, {
						value: badgeGap,
						min: 0,
						max: 24,
						onChange: (v) => {
							setBadgeGap(v);
							scheduleLayoutSave({ badge_gap: v });
						}
					})] }),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-white/8 bg-black/20 p-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
							children: "Preview"
						}), /* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap items-center",
							style: { gap: badgeGap },
							children: roles.map((r) => /* @__PURE__ */ jsx(RoleBadge, {
								role: r,
								size: badgeSize
							}, r.id))
						})]
					})
				]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: roles.map((r) => {
				const visible = r.visible !== false;
				return /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 rounded-2xl border border-white/8 bg-black/25 p-4",
					style: { boxShadow: `0 0 0 1px ${r.color}22 inset` },
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
							style: { background: `${r.color}1a` },
							children: /* @__PURE__ */ jsx(RoleBadge, {
								role: r,
								size: 18
							})
						}),
						/* @__PURE__ */ jsx("span", {
							className: "flex-1 text-sm font-semibold text-foreground",
							children: r.label
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => toggleVisibility.mutate({
								roleId: r.id,
								visible: !visible
							}),
							className: `relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${visible ? "bg-primary" : "bg-white/20"}`,
							disabled: toggleVisibility.isPending,
							children: /* @__PURE__ */ jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${visible ? "translate-x-6" : "translate-x-1"}` })
						})
					]
				}, r.id);
			})
		})] })
	});
}
function PremiumPanel({ profile }) {
	const notify = useNotify();
	const qc = useQueryClient();
	const [code, setCode] = useState("");
	const [redeeming, setRedeeming] = useState(false);
	const isPremium = !!profile.is_premium;
	const { data: isAdmin } = useQuery({
		queryKey: ["is-admin"],
		queryFn: async () => {
			const { data } = await supabase.auth.getUser();
			if (!data.user) return false;
			return isWhitelisted(data.user.id);
		}
	});
	const codesQuery = useQuery({
		queryKey: ["admin-premium-codes"],
		queryFn: async () => {
			const { data, error } = await supabase.from("premium_codes").select(`
          code,
          created_at,
          redeemed_by,
          redeemed_at,
          profiles!premium_codes_redeemed_by_fkey ( username )
        `).order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		},
		enabled: !!isAdmin
	});
	const generateMutation = useMutation({
		mutationFn: (count) => adminGeneratePremiumKeys(count),
		onSuccess: (data) => {
			notify.success(`Generated ${data.codes.length} new premium keys!`);
			qc.invalidateQueries({ queryKey: ["admin-premium-codes"] });
		},
		onError: (error) => {
			notify.error(`Generation failed: ${error.message}`);
		},
		onSettled: () => {
			setIsGenerating(false);
		}
	});
	const [isGenerating, setIsGenerating] = useState(false);
	const handleGenerate = () => {
		setIsGenerating(true);
		generateMutation.mutate(5);
	};
	const copyCode = (code) => {
		navigator.clipboard.writeText(code);
		notify.success("Code copied to clipboard");
	};
	const handleRedeem = async (e) => {
		e.preventDefault();
		if (!code.trim()) return;
		setRedeeming(true);
		try {
			if (await redeemPremiumCode(code)) {
				notify.success("Premium unlocked. Welcome to the good tier.");
				setCode("");
				qc.invalidateQueries({ queryKey: ["profile"] });
			} else notify.error("That code didn't work", { description: "It may be invalid or already used." });
		} catch (err) {
			notify.error(err instanceof Error ? err.message : "Couldn't redeem that code");
		} finally {
			setRedeeming(false);
		}
	};
	const RedeemSection = isPremium ? /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/[0.08] p-5 shadow-accent-glow",
		children: [/* @__PURE__ */ jsx(BadgeCheck, { className: "h-6 w-6 shrink-0 text-primary" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
			className: "text-sm font-bold text-foreground",
			children: "You're premium."
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-0.5 text-xs text-muted-foreground",
			children: "Everything on this page is unlocked. Thanks for supporting slugs.lol."
		})] })]
	}) : /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "rounded-2xl border border-white/8 bg-black/25 p-5",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-sm text-foreground",
				children: "Some effects, layouts, and customization options are premium-only."
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Got a code? Redeem it below to unlock everything, permanently."
			})]
		}), /* @__PURE__ */ jsxs("form", {
			onSubmit: handleRedeem,
			className: "flex flex-col gap-3 sm:flex-row",
			children: [/* @__PURE__ */ jsx("input", {
				value: code,
				onChange: (e) => setCode(e.target.value),
				placeholder: "Enter your premium code",
				className: "field-input flex-1 font-mono text-sm"
			}), /* @__PURE__ */ jsxs("button", {
				type: "submit",
				disabled: redeeming || !code.trim(),
				className: "click-shine ring-focus inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-accent-glow transition-all hover:brightness-110 disabled:opacity-60",
				children: [redeeming ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4" }), redeeming ? "Checking…" : "Redeem"]
			})]
		})]
	});
	if (isAdmin) return /* @__PURE__ */ jsx(Panel, {
		id: "premium",
		title: "Premium Management",
		sub: "Generate and manage premium access keys.",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between rounded-2xl border border-white/8 bg-black/25 p-4",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Generate new keys"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "Each batch creates 5 unique codes (format: XXXX-XXXX-XXXX)."
					})] }), /* @__PURE__ */ jsxs("button", {
						onClick: handleGenerate,
						disabled: isGenerating,
						className: "ring-focus inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-accent-glow transition-all hover:brightness-110 disabled:opacity-60",
						children: [isGenerating ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }), isGenerating ? "Generating…" : "Generate 5 keys"]
					})]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
					className: "mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
					children: "All generated codes"
				}), codesQuery.isLoading ? /* @__PURE__ */ jsx("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin text-primary" })
				}) : codesQuery.data?.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "py-4 text-center text-sm text-muted-foreground",
					children: "No codes generated yet."
				}) : /* @__PURE__ */ jsx("div", {
					className: "space-y-2",
					children: codesQuery.data?.map((item) => {
						const isUsed = !!item.redeemed_by;
						const redeemedBy = item.profiles?.username || "unknown user";
						return /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/8 bg-black/25 p-3",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-mono text-sm font-semibold text-foreground",
									children: item.code
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-[11px] text-muted-foreground",
									children: isUsed ? /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 text-emerald-400",
										children: [
											/* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }),
											" Used by @",
											redeemedBy
										]
									}) : /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 text-yellow-400",
										children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-yellow-400" }), " Unused"]
									})
								}),
								/* @__PURE__ */ jsxs("button", {
									onClick: () => copyCode(item.code),
									className: "rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary",
									children: [/* @__PURE__ */ jsx(Copy, { className: "mr-1 inline h-3 w-3" }), " Copy"]
								})
							]
						}, item.code);
					})
				})] }),
				/* @__PURE__ */ jsxs("div", {
					className: "border-t border-white/8 pt-6",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
						children: "Your premium status"
					}), RedeemSection]
				})
			]
		})
	});
	return /* @__PURE__ */ jsx(Panel, {
		id: "premium",
		title: "Premium",
		sub: "Unlock every effect, layout, and customization option.",
		children: RedeemSection
	});
}
var ADMIN_TABS = [
	{
		id: "users",
		label: "Users"
	},
	{
		id: "create",
		label: "Create account"
	},
	{
		id: "roles",
		label: "Roles"
	},
	{
		id: "whitelist",
		label: "Whitelist"
	}
];
function AdminPanel() {
	const [tab, setTab] = useState("users");
	return /* @__PURE__ */ jsx(Panel, {
		id: "admin",
		title: "Admin",
		sub: "Whitelisted controls — invisible to everyone else.",
		right: /* @__PURE__ */ jsxs("span", {
			className: "inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary",
			children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5" }), " Whitelisted"]
		}),
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsx(Segmented, {
					value: tab,
					onChange: setTab,
					options: ADMIN_TABS.map((t) => ({
						id: t.id,
						label: t.label
					}))
				}),
				tab === "users" && /* @__PURE__ */ jsx(AdminUsersTab, {}),
				tab === "create" && /* @__PURE__ */ jsx(AdminCreateAccountTab, {}),
				tab === "roles" && /* @__PURE__ */ jsx(AdminRolesTab, {}),
				tab === "whitelist" && /* @__PURE__ */ jsx(AdminWhitelistTab, {})
			]
		})
	});
}
function AdminUsersTab() {
	const notify = useNotify();
	const qc = useQueryClient();
	const [query, setQuery] = useState("");
	const profilesQ = useQuery({
		queryKey: ["admin-profiles", query],
		queryFn: () => adminListProfiles(query)
	});
	const rolesQ = useQuery({
		queryKey: ["all-roles"],
		queryFn: listRoles
	});
	const [expanded, setExpanded] = useState(null);
	const [handleDraft, setHandleDraft] = useState({});
	const refresh = () => qc.invalidateQueries({ queryKey: ["admin-profiles"] });
	const setHandle = useMutation({
		mutationFn: ({ id, username }) => adminSetUsername(id, username),
		onSuccess: () => {
			notify.success("Handle updated");
			refresh();
		},
		onError: (e) => notify.error(e.message)
	});
	const ban = useMutation({
		mutationFn: (id) => adminBanProfile(id),
		onSuccess: () => {
			notify.success("Page banned");
			refresh();
		},
		onError: (e) => notify.error(e.message)
	});
	const unban = useMutation({
		mutationFn: (id) => adminUnbanProfile(id),
		onSuccess: () => {
			notify.success("Page unbanned");
			refresh();
		},
		onError: (e) => notify.error(e.message)
	});
	const del = useMutation({
		mutationFn: (id) => adminDeleteProfile(id),
		onSuccess: () => {
			notify.success("Page deleted");
			refresh();
		},
		onError: (e) => notify.error(e.message)
	});
	const profiles = profilesQ.data?.profiles ?? [];
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 rounded-xl border border-white/8 bg-black/35 px-3 py-2.5",
			children: [/* @__PURE__ */ jsx(Search, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: "Search by handle…",
				className: "w-full bg-transparent text-sm text-foreground focus:outline-none"
			})]
		}), profilesQ.isLoading ? /* @__PURE__ */ jsx("div", {
			className: "flex justify-center py-8",
			children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin text-primary" })
		}) : /* @__PURE__ */ jsxs("div", {
			className: "space-y-2",
			children: [profiles.map((p) => /* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border border-white/8 bg-black/25 p-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "truncate font-mono text-sm text-foreground",
								children: ["@", p.username]
							}), p.is_banned && /* @__PURE__ */ jsx("span", {
								className: "rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-destructive",
								children: "Banned"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-0.5 text-[11px] text-muted-foreground",
							children: [
								p.view_count ?? 0,
								" views · ",
								p.is_public ? "public" : "hidden"
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-1.5",
						children: [
							/* @__PURE__ */ jsx("button", {
								onClick: () => setExpanded(expanded === p.id ? null : p.id),
								className: "rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5 text-[11px] font-semibold text-foreground hover:border-primary/40",
								children: expanded === p.id ? "Close" : "Manage"
							}),
							p.is_banned ? /* @__PURE__ */ jsx("button", {
								onClick: () => unban.mutate(p.id),
								className: "rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-400",
								children: "Unban"
							}) : /* @__PURE__ */ jsxs("button", {
								onClick: () => ban.mutate(p.id),
								className: "inline-flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5 text-[11px] font-semibold text-foreground hover:border-destructive/40 hover:text-destructive",
								children: [/* @__PURE__ */ jsx(Ban, { className: "h-3 w-3" }), " Ban"]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: () => {
									if (confirm(`Permanently delete @${p.username}?`)) del.mutate(p.id);
								},
								className: "inline-flex items-center gap-1 rounded-lg border border-destructive/30 bg-destructive/10 px-2.5 py-1.5 text-[11px] font-semibold text-destructive",
								children: [/* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }), " Delete"]
							})
						]
					})]
				}), expanded === p.id && /* @__PURE__ */ jsxs("div", {
					className: "mt-4 space-y-4 border-t border-white/8 pt-4",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("div", {
							className: "mb-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
							children: "Set handle"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx("input", {
								value: handleDraft[p.id] ?? p.username,
								onChange: (e) => setHandleDraft((d) => ({
									...d,
									[p.id]: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")
								})),
								className: "field-input flex-1 text-sm"
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => setHandle.mutate({
									id: p.id,
									username: handleDraft[p.id] ?? p.username
								}),
								disabled: setHandle.isPending,
								className: "rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-xs font-bold text-foreground hover:border-primary/50 hover:text-primary disabled:opacity-40",
								children: "Save"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: "Whitelisted admins can set handles as short as one letter."
						})
					] }), /* @__PURE__ */ jsx(RoleAssigner, {
						profileId: p.id,
						roles: rolesQ.data ?? []
					})]
				})]
			}, p.id)), profiles.length === 0 && /* @__PURE__ */ jsx("p", {
				className: "py-6 text-center text-sm text-muted-foreground",
				children: "No pages found."
			})]
		})]
	});
}
function RoleAssigner({ profileId, roles }) {
	const notify = useNotify();
	const qc = useQueryClient();
	const theirRolesQ = useQuery({
		queryKey: ["profile-roles", profileId],
		queryFn: () => listProfileRoles(profileId)
	});
	const theirIds = new Set((theirRolesQ.data ?? []).map((r) => r.id));
	const assign = useMutation({
		mutationFn: (roleId) => adminAssignRole(profileId, roleId),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["profile-roles", profileId] }),
		onError: (e) => notify.error(e.message)
	});
	const remove = useMutation({
		mutationFn: (roleId) => adminRemoveRole(profileId, roleId),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["profile-roles", profileId] }),
		onError: (e) => notify.error(e.message)
	});
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
		className: "mb-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
		children: "Roles"
	}), /* @__PURE__ */ jsx("div", {
		className: "flex flex-wrap gap-1.5",
		children: roles.map((r) => {
			const has = theirIds.has(r.id);
			return /* @__PURE__ */ jsxs("button", {
				onClick: () => has ? remove.mutate(r.id) : assign.mutate(r.id),
				className: `inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-all ${has ? "border-primary/50 bg-primary/12 text-primary" : "border-white/8 bg-black/25 text-muted-foreground hover:border-white/25"}`,
				children: [
					/* @__PURE__ */ jsx(RoleBadge, {
						role: r,
						size: 12
					}),
					" ",
					r.label
				]
			}, r.id);
		})
	})] });
}
function AdminCreateAccountTab() {
	const notify = useNotify();
	const rolesQ = useQuery({
		queryKey: ["all-roles"],
		queryFn: listRoles
	});
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [roleIds, setRoleIds] = useState([]);
	const create = useMutation({
		mutationFn: () => adminCreateAccount({
			email,
			password,
			username,
			roleIds
		}),
		onSuccess: () => {
			notify.success(`Account created for @${username}`);
			setEmail("");
			setPassword("");
			setUsername("");
			setRoleIds([]);
		},
		onError: (e) => notify.error(e.message)
	});
	const toggleRole = (id) => setRoleIds((ids) => ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "As a whitelisted admin you can hand out one-letter handles here — regular sign-up requires 5+ characters."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ jsx(Field, {
					label: "Email",
					children: /* @__PURE__ */ jsx(Text, {
						value: email,
						onChange: setEmail,
						placeholder: "person@domain.com"
					})
				}), /* @__PURE__ */ jsx(Field, {
					label: "Password",
					children: /* @__PURE__ */ jsx(Text, {
						value: password,
						onChange: setPassword,
						placeholder: "Temporary password"
					})
				})]
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Handle",
				hint: "No length minimum for admin-created accounts",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center rounded-xl border border-white/8 bg-black/35 pl-3 focus-within:border-primary/60",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: "slugs.lol/"
					}), /* @__PURE__ */ jsx("input", {
						value: username,
						onChange: (e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")),
						maxLength: 24,
						className: "w-full bg-transparent px-1 py-2.5 text-sm text-foreground focus:outline-none"
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
				className: "mb-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
				children: "Starting roles (optional)"
			}), /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-1.5",
				children: (rolesQ.data ?? []).map((r) => /* @__PURE__ */ jsx(Chip, {
					active: roleIds.includes(r.id),
					onClick: () => toggleRole(r.id),
					children: /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ jsx(RoleBadge, {
								role: r,
								size: 12
							}),
							" ",
							r.label
						]
					})
				}, r.id))
			})] }),
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ jsxs("button", {
					onClick: () => create.mutate(),
					disabled: create.isPending || !email || !password || username.length < 1,
					className: "ring-focus inline-flex items-center gap-2 rounded-xl bg-accent-sheen px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-accent-glow disabled:opacity-50",
					children: [
						/* @__PURE__ */ jsx(UserPlus, { className: "h-4 w-4" }),
						" ",
						create.isPending ? "Creating…" : "Create account"
					]
				})
			})
		]
	});
}
/** Pulls a src="..." URL out of a pasted <img>/<a> snippet, or accepts a bare URL as-is. */
function extractImageUrl(input) {
	const trimmed = input.trim();
	const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
	return (srcMatch ? srcMatch[1] : trimmed).trim();
}
function AdminRolesTab() {
	const notify = useNotify();
	const qc = useQueryClient();
	const rolesQ = useQuery({
		queryKey: ["all-roles"],
		queryFn: listRoles
	});
	const [label, setLabel] = useState("");
	const [color, setColor] = useState("#a855f7");
	const [iconMode, setIconMode] = useState("image");
	const [customSvg, setCustomSvg] = useState("");
	const [imageInput, setImageInput] = useState("");
	const imageUrl = extractImageUrl(imageInput);
	const isValidImageUrl = /^https?:\/\/\S+$/i.test(imageUrl);
	const resolvedIconSvg = iconMode === "image" ? isValidImageUrl ? `<img src="${imageUrl.replace(/"/g, "&quot;")}" alt="${(label || "badge").replace(/"/g, "&quot;")}" />` : "" : customSvg;
	const canCreate = !!label && !!resolvedIconSvg;
	const create = useMutation({
		mutationFn: () => adminCreateRole({
			key: label,
			label,
			color,
			iconSvg: resolvedIconSvg
		}),
		onSuccess: () => {
			notify.success("Role created");
			setLabel("");
			setCustomSvg("");
			setImageInput("");
			qc.invalidateQueries({ queryKey: ["all-roles"] });
		},
		onError: (e) => notify.error(e.message)
	});
	const remove = useMutation({
		mutationFn: (id) => adminDeleteRole(id),
		onSuccess: () => {
			notify.success("Role deleted");
			qc.invalidateQueries({ queryKey: ["all-roles"] });
		},
		onError: (e) => notify.error(e.message)
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsx("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: (rolesQ.data ?? []).map((r) => /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between gap-2 rounded-2xl border border-white/8 bg-black/25 p-3.5",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "inline-flex items-center gap-2 text-sm font-semibold text-foreground",
					children: [
						/* @__PURE__ */ jsx(RoleBadge, {
							role: r,
							size: 16
						}),
						" ",
						r.label
					]
				}), /* @__PURE__ */ jsx("button", {
					onClick: () => {
						if (confirm(`Delete role "${r.label}"? This removes it from everyone who has it.`)) remove.mutate(r.id);
					},
					className: "rounded-lg border border-white/10 bg-black/30 p-1.5 text-muted-foreground hover:border-destructive/40 hover:text-destructive",
					children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
				})]
			}, r.id))
		}), /* @__PURE__ */ jsx(Group, {
			title: "New role",
			hint: "Paste an emoji image, or provide raw SVG for a themed icon.",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-[1fr_auto]",
						children: [/* @__PURE__ */ jsx(Field, {
							label: "Label",
							children: /* @__PURE__ */ jsx(Text, {
								value: label,
								onChange: setLabel,
								placeholder: "e.g. Early Supporter"
							})
						}), /* @__PURE__ */ jsx(Field, {
							label: "Color",
							hint: iconMode === "image" ? "Unused for image icons" : void 0,
							children: /* @__PURE__ */ jsx("input", {
								type: "color",
								value: color,
								onChange: (e) => setColor(e.target.value),
								className: "h-[42px] w-16 cursor-pointer rounded-xl border border-white/10 bg-transparent disabled:opacity-40",
								disabled: iconMode === "image"
							})
						})]
					}),
					/* @__PURE__ */ jsx(Segmented, {
						value: iconMode,
						onChange: (v) => setIconMode(v),
						options: [{
							id: "image",
							label: "Image / emoji"
						}, {
							id: "svg",
							label: "SVG code"
						}]
					}),
					iconMode === "image" ? /* @__PURE__ */ jsxs(Field, {
						label: "Emoji or badge image",
						hint: "Paste a direct image link, or the whole snippet from a site like emoji.gg — the <img src=\"...\"> is pulled out automatically.",
						children: [/* @__PURE__ */ jsx("textarea", {
							value: imageInput,
							onChange: (e) => setImageInput(e.target.value),
							rows: 2,
							placeholder: "https://cdn3.emoji.gg/emojis/9257-discord-hunter.png  — or paste the full <a><img> snippet",
							className: "field-input resize-none font-mono text-xs"
						}), imageInput && !isValidImageUrl && /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-[11px] text-destructive",
							children: "Couldn't find a valid image URL in that — check it starts with http(s)://"
						})]
					}) : /* @__PURE__ */ jsx(Field, {
						label: "Icon (SVG)",
						hint: "Paste a valid SVG element, e.g. <svg viewBox=...>...</svg>",
						children: /* @__PURE__ */ jsx("textarea", {
							value: customSvg,
							onChange: (e) => setCustomSvg(e.target.value),
							rows: 3,
							placeholder: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">...</svg>",
							className: "field-input resize-none font-mono text-xs"
						})
					}),
					resolvedIconSvg && /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: ["Preview:", /* @__PURE__ */ jsx(RoleBadge, {
							role: {
								id: "preview",
								label: label || "badge",
								color,
								icon_svg: resolvedIconSvg
							},
							size: 22
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ jsx("button", {
							onClick: () => create.mutate(),
							disabled: create.isPending || !canCreate,
							className: "rounded-xl border border-white/10 bg-black/30 px-5 py-2.5 text-xs font-bold text-foreground hover:border-primary/50 hover:text-primary disabled:opacity-40",
							children: create.isPending ? "Creating…" : "Create role"
						})
					})
				]
			})
		})]
	});
}
function AdminWhitelistTab() {
	const notify = useNotify();
	const [addHandle, setAddHandle] = useState("");
	const [removeHandle, setRemoveHandle] = useState("");
	const add = useMutation({
		mutationFn: () => adminAddWhitelistByUsername(addHandle),
		onSuccess: () => {
			notify.success(`@${addHandle} can now access the admin panel`);
			setAddHandle("");
		},
		onError: (e) => notify.error(e.message)
	});
	const remove = useMutation({
		mutationFn: () => adminRemoveWhitelistByUsername(removeHandle),
		onSuccess: () => {
			notify.success(`@${removeHandle} removed from the whitelist`);
			setRemoveHandle("");
		},
		onError: (e) => notify.error(e.message)
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ jsx(Group, {
			title: "Add admin",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ jsx(Text, {
					value: addHandle,
					onChange: setAddHandle,
					placeholder: "their handle"
				}), /* @__PURE__ */ jsx("button", {
					onClick: () => add.mutate(),
					disabled: add.isPending || !addHandle,
					className: "rounded-xl border border-white/10 bg-black/30 px-5 py-2.5 text-xs font-bold text-foreground hover:border-primary/50 hover:text-primary disabled:opacity-40",
					children: "Add"
				})]
			})
		}), /* @__PURE__ */ jsxs(Group, {
			title: "Remove admin",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ jsx(Text, {
					value: removeHandle,
					onChange: setRemoveHandle,
					placeholder: "their handle"
				}), /* @__PURE__ */ jsx("button", {
					onClick: () => remove.mutate(),
					disabled: remove.isPending || !removeHandle,
					className: "rounded-xl border border-destructive/30 bg-destructive/10 px-5 py-2.5 text-xs font-bold text-destructive disabled:opacity-40",
					children: "Remove"
				})]
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-[11px] text-muted-foreground",
				children: "You can't remove the last remaining admin."
			})]
		})]
	});
}
//#endregion
export { Dashboard as component };
