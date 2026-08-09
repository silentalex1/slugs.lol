import { t as supabase } from "./client-Cc5YU_PK.js";
import { g as listProfileRoles } from "./admin-BQe0CAfv.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
//#region src/routes/$username.tsx
var $$splitNotFoundComponentImporter = () => import("./_username-CgmZ0aq8.js");
var $$splitComponentImporter = () => import("./_username-4mwRRSqn.js");
var RESERVED = /* @__PURE__ */ new Set([
	"login",
	"register",
	"signup",
	"signin",
	"logout",
	"api",
	"admin",
	"dashboard",
	"settings",
	"reset-password",
	"about",
	"terms",
	"privacy",
	"help",
	"support",
	"home",
	"index",
	"www",
	"mail",
	"blog",
	"auth",
	"oauth",
	"static",
	"assets",
	"public",
	"404",
	"not-found"
]);
async function fetchPublicProfile(username) {
	const { data: profile } = await supabase.from("profiles").select("id, username, display_name, bio, avatar_url, theme, socials, is_public, is_exclusive, view_count").ilike("username", username).maybeSingle();
	if (!profile || !profile.is_public) return null;
	const { data: links } = await supabase.from("links").select("id, title, url, position").eq("user_id", profile.id).eq("is_active", true).order("position", { ascending: true });
	const roles = await listProfileRoles(profile.id);
	return {
		profile,
		links: links ?? [],
		roles
	};
}
var Route = createFileRoute("/$username")({
	ssr: false,
	loader: async ({ params, context }) => {
		if (RESERVED.has(params.username.toLowerCase())) throw notFound();
		const data = await context.queryClient.ensureQueryData({
			queryKey: ["public-profile", params.username.toLowerCase()],
			queryFn: () => fetchPublicProfile(params.username.toLowerCase())
		});
		if (!data) throw notFound();
		return data;
	},
	head: ({ loaderData, params }) => {
		if (!loaderData) return {};
		const p = loaderData.profile;
		const t = p.theme ?? {};
		const title = t.meta_title || `${p.display_name || p.username} — slugs.lol/${p.username}`;
		const desc = t.meta_description || p.bio || `Every link from @${p.username}.`;
		const image = t.meta_image || p.avatar_url;
		return { meta: [
			{ title },
			{
				name: "description",
				content: desc
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: desc
			},
			{
				property: "og:type",
				content: "profile"
			},
			{
				property: "og:url",
				content: `/${params.username}`
			},
			...image ? [{
				property: "og:image",
				content: image
			}, {
				name: "twitter:image",
				content: image
			}] : [],
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
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
//#endregion
export { Route as t };
