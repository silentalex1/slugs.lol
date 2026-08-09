import { t as supabase } from "./client-Cc5YU_PK.js";
import { i as sanitizeMediaUrl } from "./notifications-8GONn2N7.js";
//#region src/lib/db.ts
/**
* Cleans up any media URLs in a profile's theme that may have picked up a
* duplicate `?t=` cache-busting param (which makes Supabase Storage 400 on
* every request for that file). Applied on every read so already-corrupted
* rows self-heal without a manual data migration.
*/
function sanitizeThemeUrls(row) {
	if (!row?.theme) return row;
	const cleaned = { ...row.theme };
	if (typeof cleaned.bg_video_url === "string") cleaned.bg_video_url = sanitizeMediaUrl(cleaned.bg_video_url);
	if (typeof cleaned.bg_audio_url === "string") cleaned.bg_audio_url = sanitizeMediaUrl(cleaned.bg_audio_url);
	if (typeof cleaned.splash_bg_url === "string") cleaned.splash_bg_url = sanitizeMediaUrl(cleaned.splash_bg_url);
	if (typeof cleaned.cursor_url === "string") cleaned.cursor_url = sanitizeMediaUrl(cleaned.cursor_url);
	return {
		...row,
		theme: cleaned
	};
}
async function requireUser() {
	const { data, error } = await supabase.auth.getUser();
	if (error || !data.user) throw new Error("Not signed in");
	return data.user;
}
var PROFILE_COLUMNS = "id, username, display_name, bio, avatar_url, is_public, is_exclusive, discord_code, theme, socials, view_count, badges, is_password_protected, is_premium";
async function getMyProfile() {
	const user = await requireUser();
	const { data, error } = await supabase.from("profiles").select(PROFILE_COLUMNS).eq("id", user.id).maybeSingle();
	if (error) throw error;
	if (data) return {
		...sanitizeThemeUrls(data),
		avatar_url: sanitizeMediaUrl(data.avatar_url) || null
	};
	const base = ((user.user_metadata ?? {}).username || user.email?.split("@")[0] || "user").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 24) || "user";
	const { data: created, error: insertError } = await supabase.from("profiles").insert({
		id: user.id,
		username: base
	}).select(PROFILE_COLUMNS).single();
	if (insertError) throw insertError;
	return {
		...sanitizeThemeUrls(created),
		avatar_url: sanitizeMediaUrl(created.avatar_url) || null
	};
}
async function updateProfile(patch) {
	const user = await requireUser();
	const { error } = await supabase.from("profiles").update(patch).eq("id", user.id);
	if (error) throw error;
}
/**
* Theme writes MUST merge against the row as it exists right now.
*
* The dashboard holds a theme object loaded when the page mounted. If the
* Discord bot (or another tab) writes `bg_audio_url` in the meantime, saving
* the stale local blob would silently wipe it. Re-read, shallow-merge the
* patch on top, then write.
*/
async function updateProfileTheme(patch) {
	const user = await requireUser();
	const { data: row, error: readError } = await supabase.from("profiles").select("theme").eq("id", user.id).maybeSingle();
	if (readError) throw readError;
	const merged = sanitizeThemeUrls({ theme: {
		...row?.theme ?? {},
		...patch
	} }).theme;
	const { error } = await supabase.from("profiles").update({ theme: merged }).eq("id", user.id);
	if (error) throw error;
	return merged;
}
async function uploadProfileMedia(bucket, file) {
	const user = await requireUser();
	const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
	const ext = file.name.split(".").pop();
	const path = `${user.id}/${unique}.${ext}`;
	const { error } = await supabase.storage.from(bucket).upload(path, file, {
		contentType: file.type || (bucket === "profile-audio" ? "audio/mpeg" : bucket === "profile-avatar" ? "image/png" : "video/mp4"),
		upsert: false
	});
	if (error) throw error;
	const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(path);
	return {
		url: sanitizeMediaUrl(`${publicUrlData.publicUrl}?t=${Date.now()}`),
		filename: file.name
	};
}
async function listMyLinks() {
	const user = await requireUser();
	const { data, error } = await supabase.from("links").select("id, title, url, is_active, position, clicks, icon").eq("user_id", user.id).order("position", { ascending: true });
	if (error) throw error;
	return data ?? [];
}
async function upsertLink(input) {
	const user = await requireUser();
	if (input.id) {
		const { error } = await supabase.from("links").update({
			title: input.title,
			url: input.url,
			is_active: input.is_active ?? true,
			icon: input.icon ?? null
		}).eq("id", input.id).eq("user_id", user.id);
		if (error) throw error;
		return;
	}
	const { data: existing } = await supabase.from("links").select("position").eq("user_id", user.id).order("position", { ascending: false }).limit(1);
	const nextPos = (existing?.[0]?.position ?? -1) + 1;
	const { error } = await supabase.from("links").insert({
		user_id: user.id,
		title: input.title,
		url: input.url,
		is_active: input.is_active ?? true,
		icon: input.icon ?? null,
		position: nextPos
	});
	if (error) throw error;
}
async function deleteLink(id) {
	const user = await requireUser();
	const { error } = await supabase.from("links").delete().eq("id", id).eq("user_id", user.id);
	if (error) throw error;
}
async function reorderLinks(ids) {
	const user = await requireUser();
	await Promise.all(ids.map((id, position) => supabase.from("links").update({ position }).eq("id", id).eq("user_id", user.id)));
}
/** Redeems a code for the signed-in user. Returns false if invalid/already used. */
async function redeemPremiumCode(code) {
	await requireUser();
	const trimmed = code.trim();
	if (!trimmed) throw new Error("Enter a code");
	const { data, error } = await supabase.rpc("redeem_premium_code", { p_code: trimmed });
	if (error) throw error;
	return !!data;
}
/**
* Optional code entry at signup. Safe to call with an empty/undefined code —
* it's a no-op in that case so the field can stay optional on the
* register form. Call this *after* the user's profile row exists (i.e.
* after their first getMyProfile(), which creates it on demand).
*/
async function redeemPremiumCodeIfProvided(code) {
	if (!code || !code.trim()) return false;
	try {
		return await redeemPremiumCode(code);
	} catch {
		return false;
	}
}
//#endregion
export { redeemPremiumCodeIfProvided as a, updateProfileTheme as c, redeemPremiumCode as i, uploadProfileMedia as l, getMyProfile as n, reorderLinks as o, listMyLinks as r, updateProfile as s, deleteLink as t, upsertLink as u };
