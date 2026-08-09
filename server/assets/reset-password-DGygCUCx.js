import { t as supabase } from "./client-Cc5YU_PK.js";
import { t as AuroraBackdrop } from "./AuroraBackdrop-CCymJVgw.js";
import { t as BrandMark } from "./BrandMark-CJYzd0JD.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
//#region src/routes/reset-password.tsx?tsr-split=component
function ResetPage() {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/login` });
		setLoading(false);
		if (error) return toast.error(error.message);
		setSent(true);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex min-h-screen items-center justify-center px-4 py-16",
		children: [
			/* @__PURE__ */ jsx(AuroraBackdrop, {}),
			/* @__PURE__ */ jsxs("header", {
				className: "absolute top-0 left-0 z-10 flex w-full items-center justify-between px-5 py-6 sm:px-8",
				children: [/* @__PURE__ */ jsx(BrandMark, {}), /* @__PURE__ */ jsx(Link, {
					to: "/login",
					className: "rounded-full border border-white/10 bg-surface/60 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur hover:text-foreground",
					children: "← Back to sign in"
				})]
			}),
			/* @__PURE__ */ jsx("main", {
				className: "relative z-10 w-full max-w-md",
				children: /* @__PURE__ */ jsx("div", {
					className: "rounded-3xl border border-white/10 bg-surface/70 p-7 shadow-card backdrop-blur-xl sm:p-9",
					children: sent ? /* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary",
								children: "✓"
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "font-display text-2xl font-bold text-foreground",
								children: "Check your inbox"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: [
									"If ",
									/* @__PURE__ */ jsx("span", {
										className: "text-foreground",
										children: email
									}),
									" is a slug we know, a reset link is on its way."
								]
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/login",
								className: "ring-focus mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-accent-glow hover:brightness-110",
								children: "Back to sign in"
							})
						]
					}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-8",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-[11px] font-bold uppercase tracking-[0.2em] text-primary",
								children: "Recovery"
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "mt-3 font-display text-3xl font-bold tracking-tight text-foreground",
								children: "Reset password."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Enter your email and we'll send you a reset link."
							})
						]
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "block",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
								children: "Email"
							}), /* @__PURE__ */ jsx("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "you@domain.com",
								className: "w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none"
							})]
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: loading,
							className: "ring-focus mt-2 w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-accent-glow hover:brightness-110 disabled:opacity-60",
							children: loading ? "Sending…" : "Send reset link"
						})]
					})] })
				})
			})
		]
	});
}
//#endregion
export { ResetPage as component };
