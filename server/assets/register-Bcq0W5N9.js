import { t as supabase } from "./client-Cc5YU_PK.js";
import { n as useNotify } from "./notifications-8GONn2N7.js";
import { t as Route } from "./register-BNVrdmqR.js";
import { t as AuroraBackdrop } from "./AuroraBackdrop-CCymJVgw.js";
import { t as BrandMark } from "./BrandMark-CJYzd0JD.js";
import { a as redeemPremiumCodeIfProvided, n as getMyProfile } from "./db-DlZLDDv3.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/register.tsx?tsr-split=component
function RegisterPage() {
	const navigate = useNavigate();
	const notify = useNotify();
	const { claim } = Route.useSearch();
	const [username, setUsername] = useState(claim ?? "");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showCodeField, setShowCodeField] = useState(false);
	const [premiumCode, setPremiumCode] = useState("");
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (claim) setUsername(claim);
	}, [claim]);
	const createAccount = async () => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { username } }
		});
		if (error) throw error;
		if (!data.session) {
			const { error: signInErr } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (signInErr) throw new Error("Account created, but email confirmation is on. Disable 'Confirm email' in your Supabase Auth settings.");
		}
		if (premiumCode.trim()) {
			await getMyProfile();
			if (await redeemPremiumCodeIfProvided(premiumCode)) notify.success("Premium unlocked.");
			else notify.error("Premium code didn't work", { description: "You can still redeem one later from the dashboard." });
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!/^[a-z0-9](?:[a-z0-9_-]{3,22}[a-z0-9])?$/.test(username)) {
			notify.error("Invalid username", { description: "Must be 5–24 chars: letters, numbers, _ or - (shorter handles are admin-assigned only)" });
			return;
		}
		setLoading(true);
		try {
			await notify.promise(createAccount(), {
				loading: "Claiming your slug…",
				success: "Slug locked. Welcome.",
				error: (err) => err instanceof Error ? err.message : "Something went wrong."
			});
			navigate({ to: "/dashboard" });
		} catch {} finally {
			setLoading(false);
		}
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
					children: "Sign in"
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
								children: "Step 01 / Claim"
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "mt-3 font-display text-3xl font-bold tracking-tight text-foreground",
								children: "Lock in your slug."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Pick a handle and set a password. Takes ten seconds."
							})
						]
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("label", {
								className: "block",
								children: [/* @__PURE__ */ jsx("span", {
									className: "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
									children: "Username"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center rounded-xl border border-white/10 bg-background/50 pl-3 focus-within:border-primary/60",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-mono text-sm text-muted-foreground",
										children: "slugs.lol/"
									}), /* @__PURE__ */ jsx("input", {
										type: "text",
										required: true,
										value: username,
										onChange: (e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")),
										placeholder: "yourname",
										maxLength: 24,
										className: "w-full bg-transparent px-1 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("label", {
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
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "block",
								children: [/* @__PURE__ */ jsx("span", {
									className: "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
									children: "Password"
								}), /* @__PURE__ */ jsx("input", {
									type: "password",
									required: true,
									minLength: 8,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "At least 8 characters",
									className: "w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none"
								})]
							}),
							showCodeField ? /* @__PURE__ */ jsxs("label", {
								className: "block",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "mb-1.5 flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
										children: "Premium code"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[11px] text-muted-foreground/60",
										children: "optional"
									})]
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									value: premiumCode,
									onChange: (e) => setPremiumCode(e.target.value),
									placeholder: "Have a code? Enter it here",
									className: "w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 font-mono text-sm text-foreground focus:border-primary/60 focus:outline-none"
								})]
							}) : /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setShowCodeField(true),
								className: "text-[11px] font-semibold text-primary hover:underline",
								children: "+ Have a premium code?"
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: loading,
								className: "ring-focus mt-2 w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-accent-glow hover:brightness-110 disabled:opacity-60",
								children: loading ? "Creating…" : "Create account"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "pt-2 text-center text-xs text-muted-foreground",
								children: [
									"Already claimed?",
									" ",
									/* @__PURE__ */ jsx(Link, {
										to: "/login",
										className: "font-semibold text-foreground underline-offset-4 hover:underline",
										children: "Sign in"
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
//#endregion
export { RegisterPage as component };
