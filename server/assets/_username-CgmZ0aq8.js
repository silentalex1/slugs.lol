import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/$username.tsx?tsr-split=notFoundComponent
/**
* Some browsers only honor the *live* `muted` property at the moment they
* decide whether to allow autoplay — not just the JSX `muted` attribute.
* When React sets that attribute after mount, the race can be lost and
* autoplay is silently blocked until a user gesture (e.g. clicking the
* splash) — which looks like "the video only plays after you click."
* Setting `.muted` imperatively via a ref and calling `.play()` ourselves
* closes that gap.
*/
/** Fills the click-to-enter splash with an image/GIF/video, with a dark scrim so the text stays readable. */
/**
* Wraps the profile card so it tilts in 3D as the cursor moves across it —
* rotateX/rotateY driven by pointer position relative to the card's own
* bounding box, plus a soft light-following glare and a subtle "lift"
* (translateZ + bigger shadow) so the card genuinely reads as floating.
* Resets smoothly on pointer leave. Disabled automatically for touch/coarse
* pointers, since there's no hover position to drive it there.
*/
var SplitNotFoundComponent = () => /* @__PURE__ */ jsx("div", {
	className: "flex min-h-screen items-center justify-center bg-background",
	children: /* @__PURE__ */ jsxs("div", {
		className: "max-w-md text-center",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-[11px] font-bold uppercase tracking-[0.2em] text-primary",
				children: "404"
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "mt-3 font-display text-4xl font-bold text-foreground",
				children: "Slug not found."
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "Nobody has claimed this handle yet."
			})
		]
	})
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
