import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/BrandMark.tsx
function BrandMark() {
	return /* @__PURE__ */ jsxs(Link, {
		to: "/",
		className: "group inline-flex items-center gap-2",
		children: [/* @__PURE__ */ jsx("span", {
			className: "flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg shadow-accent-glow transition-transform group-hover:scale-105",
			children: /* @__PURE__ */ jsx("img", {
				src: "/mark.png",
				alt: "slugs.lol",
				className: "h-full w-full object-cover"
			})
		}), /* @__PURE__ */ jsxs("span", {
			className: "font-display text-base font-bold tracking-tight text-foreground",
			children: ["slugs", /* @__PURE__ */ jsx("span", {
				className: "text-primary",
				children: ".lol"
			})]
		})]
	});
}
//#endregion
export { BrandMark as t };
