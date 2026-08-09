import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, Check, Info, Loader2, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function sanitizeMediaUrl(url) {
	if (!url) return "";
	try {
		const parsed = new URL(url);
		const tValues = parsed.searchParams.getAll("t");
		if (tValues.length > 1) {
			parsed.searchParams.delete("t");
			parsed.searchParams.set("t", tValues[tValues.length - 1]);
		}
		return parsed.toString();
	} catch {
		return url;
	}
}
//#endregion
//#region src/components/notifications.tsx
var NotificationContext = createContext(null);
var DEFAULT_DURATION = 4200;
var idCounter = 0;
var genId = () => `ntf_${Date.now()}_${idCounter++}`;
function useNotify() {
	const ctx = useContext(NotificationContext);
	if (!ctx) throw new Error("useNotify must be used within a <NotificationProvider>");
	return ctx;
}
function NotificationProvider({ children }) {
	const [items, setItems] = useState([]);
	const dismiss = useCallback((id) => {
		setItems((prev) => prev.filter((n) => n.id !== id));
	}, []);
	const push = useCallback((title, opts = {}) => {
		const id = opts.id ?? genId();
		const variant = opts.variant ?? "default";
		const duration = opts.duration ?? (variant === "loading" ? 0 : DEFAULT_DURATION);
		setItems((prev) => {
			const withoutDup = prev.filter((n) => n.id !== id);
			const next = {
				id,
				title,
				variant,
				description: opts.description,
				action: opts.action,
				duration,
				createdAt: Date.now()
			};
			return [...withoutDup, next].slice(-5);
		});
		return id;
	}, []);
	const update = useCallback((id, title, opts = {}) => {
		push(title, {
			...opts,
			id
		});
	}, [push]);
	const api = useMemo(() => ({
		show: (title, opts) => push(title, opts),
		success: (title, opts) => push(title, {
			...opts,
			variant: "success"
		}),
		error: (title, opts) => push(title, {
			...opts,
			variant: "error"
		}),
		info: (title, opts) => push(title, {
			...opts,
			variant: "info"
		}),
		loading: (title, opts) => push(title, {
			...opts,
			variant: "loading",
			duration: 0
		}),
		dismiss,
		update,
		promise: async (promise, msgs) => {
			const id = push(msgs.loading, {
				variant: "loading",
				duration: 0
			});
			try {
				const val = await promise;
				const successMsg = typeof msgs.success === "function" ? msgs.success(val) : msgs.success;
				update(id, successMsg, { variant: "success" });
				return val;
			} catch (err) {
				const errMsg = typeof msgs.error === "function" ? msgs.error(err) : msgs.error;
				update(id, errMsg, { variant: "error" });
				throw err;
			}
		}
	}), [
		push,
		dismiss,
		update
	]);
	return /* @__PURE__ */ jsxs(NotificationContext.Provider, {
		value: api,
		children: [children, /* @__PURE__ */ jsx(NotificationViewport, {
			items,
			onDismiss: dismiss
		})]
	});
}
function NotificationViewport({ items, onDismiss }) {
	if (items.length === 0) return null;
	return /* @__PURE__ */ jsx("div", {
		"aria-live": "polite",
		className: "pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center px-4 pb-5 sm:inset-x-auto sm:right-6 sm:justify-end",
		children: /* @__PURE__ */ jsx("div", {
			className: "flex w-full max-w-sm flex-col-reverse gap-2.5",
			children: items.map((item, i) => /* @__PURE__ */ jsx(NotificationToast, {
				item,
				onDismiss,
				depth: items.length - 1 - i
			}, item.id))
		})
	});
}
var VARIANT_META = {
	default: {
		Icon: Info,
		label: "note",
		tone: "text-foreground/70",
		spine: "bg-foreground/25",
		rail: "bg-foreground/35"
	},
	success: {
		Icon: Check,
		label: "ok",
		tone: "text-primary",
		spine: "bg-accent-sheen",
		rail: "bg-accent-sheen"
	},
	error: {
		Icon: AlertTriangle,
		label: "fail",
		tone: "text-destructive",
		spine: "bg-destructive",
		rail: "bg-destructive"
	},
	info: {
		Icon: Info,
		label: "info",
		tone: "text-brand-2",
		spine: "bg-brand-2/70",
		rail: "bg-brand-2"
	},
	loading: {
		Icon: Loader2,
		label: "busy",
		tone: "text-primary",
		spine: "bg-primary/50",
		rail: "bg-primary/50"
	}
};
function NotificationToast({ item, onDismiss, depth }) {
	const [leaving, setLeaving] = useState(false);
	const [entered, setEntered] = useState(false);
	const [remainingMs, setRemainingMs] = useState(item.duration ?? 0);
	const timerRef = useRef(null);
	const tickRef = useRef(null);
	const deadlineRef = useRef(Date.now() + (item.duration ?? 0));
	const close = useCallback(() => {
		setLeaving(true);
		setTimeout(() => onDismiss(item.id), 200);
	}, [item.id, onDismiss]);
	useEffect(() => {
		const t = requestAnimationFrame(() => setEntered(true));
		return () => cancelAnimationFrame(t);
	}, []);
	const clearTimers = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		if (tickRef.current) clearInterval(tickRef.current);
	};
	const arm = useCallback(() => {
		if (!item.duration) return;
		const ms = Math.max(0, deadlineRef.current - Date.now());
		timerRef.current = setTimeout(close, ms);
		tickRef.current = setInterval(() => {
			setRemainingMs(Math.max(0, deadlineRef.current - Date.now()));
		}, 60);
	}, [close, item.duration]);
	const pause = useCallback(() => {
		if (!item.duration) return;
		clearTimers();
		setRemainingMs(Math.max(0, deadlineRef.current - Date.now()));
	}, [item.duration]);
	const resume = useCallback(() => {
		if (!item.duration) return;
		deadlineRef.current = Date.now() + remainingMs;
		arm();
	}, [
		arm,
		item.duration,
		remainingMs
	]);
	useEffect(() => {
		setRemainingMs(item.duration ?? 0);
		deadlineRef.current = Date.now() + (item.duration ?? 0);
		arm();
		return clearTimers;
	}, [
		item.duration,
		item.id,
		item.variant
	]);
	const meta = VARIANT_META[item.variant];
	const Icon = meta.Icon;
	const progress = item.duration ? remainingMs / item.duration : 0;
	const seconds = item.duration ? Math.ceil(remainingMs / 1e3) : 0;
	return /* @__PURE__ */ jsxs("div", {
		role: "status",
		onMouseEnter: pause,
		onMouseLeave: resume,
		style: {
			transform: leaving ? "translate3d(14px, 0, 0) scale(0.98)" : entered ? `translate3d(0, ${Math.min(depth, 3) * -2}px, 0)` : "translate3d(0, 14px, 0) scale(0.99)",
			opacity: leaving ? 0 : entered ? 1 : 0,
			filter: entered && !leaving ? "blur(0)" : "blur(5px)",
			transition: "transform 520ms cubic-bezier(0.16,1,0.3,1), opacity 240ms ease, filter 380ms ease"
		},
		className: cn("toast-shell sheen pointer-events-auto group relative overflow-hidden", "rounded-lg rounded-l-[3px] border border-white/[0.07] border-l-0 pl-4 pr-3 py-3", "bg-[color-mix(in_oklab,var(--surface)_58%,transparent)] backdrop-blur-2xl shadow-card", item.variant === "success" && "shadow-accent-glow"),
		children: [
			/* @__PURE__ */ jsx("span", {
				"aria-hidden": true,
				className: cn("absolute inset-y-0 left-0 w-[3px]", meta.spine, item.variant === "loading" && "animate-pulse-soft")
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ jsx(Icon, {
						className: cn("mt-[3px] size-3.5 shrink-0", meta.tone, item.variant === "loading" && "animate-spin"),
						strokeWidth: 3
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-baseline gap-2",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: cn("font-mono text-[9px] font-bold uppercase tracking-[0.22em]", meta.tone),
										children: meta.label
									}),
									/* @__PURE__ */ jsx("span", {
										"aria-hidden": true,
										className: "h-px flex-1 bg-white/[0.07]"
									}),
									item.duration ? /* @__PURE__ */ jsxs("span", {
										className: "font-mono text-[9px] tabular-nums text-muted-foreground/60",
										children: [seconds, "s"]
									}) : null
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-[13px] font-semibold leading-snug tracking-[-0.01em] text-foreground",
								children: item.title
							}),
							item.description ? /* @__PURE__ */ jsx("p", {
								className: "mt-0.5 text-[12px] leading-relaxed text-muted-foreground",
								children: item.description
							}) : null,
							item.action ? /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => {
									item.action?.onClick();
									close();
								},
								className: "ring-focus mt-2 inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary transition-transform hover:translate-x-0.5",
								children: [item.action.label, /* @__PURE__ */ jsx("span", {
									"aria-hidden": true,
									children: "→"
								})]
							}) : null
						]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Dismiss notification",
						onClick: close,
						className: "ring-focus -mr-1 mt-[1px] grid size-5 shrink-0 place-items-center rounded-md text-muted-foreground/50 opacity-0 transition group-hover:opacity-100 hover:bg-white/5 hover:text-foreground",
						children: /* @__PURE__ */ jsx(X, {
							className: "size-3",
							strokeWidth: 2.5
						})
					})
				]
			}),
			item.duration ? /* @__PURE__ */ jsx("div", {
				className: "absolute inset-x-0 bottom-0 h-px bg-white/[0.06]",
				children: /* @__PURE__ */ jsx("div", {
					className: cn("h-full", meta.rail),
					style: {
						width: `${progress * 100}%`,
						transition: "width 80ms linear",
						opacity: .85
					}
				})
			}) : null
		]
	});
}
//#endregion
export { sanitizeMediaUrl as i, useNotify as n, cn as r, NotificationProvider as t };
