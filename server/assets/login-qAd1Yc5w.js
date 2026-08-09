import { t as supabase } from "./client-Cc5YU_PK.js";
import { n as useNotify } from "./notifications-8GONn2N7.js";
import { t as AuroraBackdrop } from "./AuroraBackdrop-CCymJVgw.js";
import { t as BrandMark } from "./BrandMark-CJYzd0JD.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/login.tsx?tsr-split=component
function LoginPage() {
	const navigate = useNavigate();
	const notify = useNotify();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setLoading(false);
		if (error) return notify.error("Couldn't sign in", { description: error.message });
		notify.success("Welcome back.");
		navigate({ to: "/dashboard" });
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex min-h-screen items-center justify-center px-4 py-16",
		children: [
			/* @__PURE__ */ jsx(AuroraBackdrop, {}),
			/* @__PURE__ */ jsxs("header", {
				className: "absolute top-0 left-0 z-10 flex w-full items-center justify-between px-5 py-6 sm:px-8",
				children: [/* @__PURE__ */ jsx(BrandMark, {}), /* @__PURE__ */ jsx(Link, {
					to: "/register",
					className: "rounded-full border border-white/10 bg-surface/60 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur hover:text-foreground",
					children: "Create account"
				})]
			}),
			/* @__PURE__ */ jsx("main", {
				className: "relative z-10 w-full max-w-md",
				children: /* @__PURE__ */ jsxs("div", {
					className: "rounded-3xl border border-white/10 bg-surface/70 p-7 shadow-card backdrop-blur-xl sm:p-9",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-8",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-[11px] font-bold uppercase tracking-[0.2em] text-primary",
								children: "Welcome back"
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "mt-3 font-display text-3xl font-bold tracking-tight text-foreground",
								children: "Sign in."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Reload your slug and get back to shipping."
							})
						]
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Email",
								children: /* @__PURE__ */ jsx("input", {
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "you@domain.com",
									className: inputCls
								})
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "block",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "mb-1.5 flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
										children: "Password"
									}), /* @__PURE__ */ jsx(Link, {
										to: "/reset-password",
										className: "text-[11px] font-semibold text-primary hover:underline",
										children: "Forgot?"
									})]
								}), /* @__PURE__ */ jsx("input", {
									type: "password",
									required: true,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "••••••••",
									className: inputCls
								})]
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: loading,
								className: "ring-focus mt-2 w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-accent-glow hover:brightness-110 disabled:opacity-60",
								children: loading ? "Signing in…" : "Sign in"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "pt-2 text-center text-xs text-muted-foreground",
								children: [
									"New here?",
									" ",
									/* @__PURE__ */ jsx(Link, {
										to: "/register",
										className: "font-semibold text-foreground underline-offset-4 hover:underline",
										children: "Claim your slug"
									})
								]
							})
						]
					})]
				})
			})
		]
	});
}
var inputCls = "w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:outline-none";
function Field({ label, children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { LoginPage as component };
