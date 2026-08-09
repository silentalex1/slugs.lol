import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/AuroraBackdrop.tsx
function AuroraBackdrop() {
	return /* @__PURE__ */ jsxs("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ jsx("style", { children: `
        @keyframes aurora-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4%, -3%) scale(1.08); }
        }
      ` }),
			/* @__PURE__ */ jsx("div", {
				className: "absolute -top-1/3 -left-1/4 h-[70vh] w-[70vh] rounded-full opacity-60 blur-3xl",
				style: {
					background: "radial-gradient(circle at 30% 30%, oklch(0.78 0.19 150 / 0.55), transparent 60%)",
					animation: "aurora-drift 18s ease-in-out infinite"
				}
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute -bottom-1/3 -right-1/4 h-[80vh] w-[80vh] rounded-full opacity-50 blur-3xl",
				style: {
					background: "radial-gradient(circle at 70% 70%, oklch(0.82 0.17 150 / 0.4), transparent 65%)",
					animation: "aurora-drift 18s ease-in-out -9s infinite"
				}
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,oklch(0.14_0_0/0.7))]" })
		]
	});
}
//#endregion
export { AuroraBackdrop as t };
