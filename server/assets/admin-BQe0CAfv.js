import { t as supabase } from "./client-Cc5YU_PK.js";
//#region src/lib/admin.ts
async function call(action, payload = {}) {
	const { data, error } = await supabase.functions.invoke("admin-actions", { body: {
		action,
		...payload
	} });
	if (error) {
		const ctx = error.context;
		let message;
		if (ctx && typeof ctx.json === "function") try {
			message = (await ctx.clone().json())?.error;
		} catch {}
		throw new Error(message ?? error.message);
	}
	if (data?.error) throw new Error(data.error);
	return data;
}
async function isWhitelisted(userId) {
	const { data } = await supabase.from("admin_whitelist").select("user_id").eq("user_id", userId).maybeSingle();
	return !!data;
}
async function listRoles() {
	const { data, error } = await supabase.from("roles").select("*").order("created_at", { ascending: true });
	if (error) throw error;
	return data ?? [];
}
async function listProfileRoles(profileId) {
	const { data, error } = await supabase.from("profile_roles").select("visible, role:roles(*)").eq("profile_id", profileId);
	if (error) throw error;
	return (data ?? []).map((r) => ({
		...r.role,
		visible: r.visible !== false
	})).filter(Boolean);
}
var adminListProfiles = (query = "") => call("list_profiles", { query });
var adminCreateAccount = (input) => call("create_account", input);
var adminSetUsername = (profileId, username) => call("set_username", {
	profileId,
	username
});
var adminBanProfile = (profileId, reason) => call("ban_profile", {
	profileId,
	reason
});
var adminUnbanProfile = (profileId) => call("unban_profile", { profileId });
var adminDeleteProfile = (profileId) => call("delete_profile", { profileId });
var adminCreateRole = (input) => call("create_role", input);
var adminDeleteRole = (roleId) => call("delete_role", { roleId });
var adminAssignRole = (profileId, roleId) => call("assign_role", {
	profileId,
	roleId
});
var adminRemoveRole = (profileId, roleId) => call("remove_role", {
	profileId,
	roleId
});
var adminSetRoleVisibility = (profileId, roleId, visible) => call("set_role_visibility", {
	profileId,
	roleId,
	visible
});
var adminAddWhitelistByUsername = async (username) => {
	const { data, error } = await supabase.from("profiles").select("id").ilike("username", username).maybeSingle();
	if (error) throw error;
	if (!data) throw new Error("No profile with that handle");
	return call("add_whitelist", { userId: data.id });
};
var adminRemoveWhitelistByUsername = async (username) => {
	const { data, error } = await supabase.from("profiles").select("id").ilike("username", username).maybeSingle();
	if (error) throw error;
	if (!data) throw new Error("No profile with that handle");
	return call("remove_whitelist", { userId: data.id });
};
var adminGeneratePremiumKeys = (count = 5) => call("generate_premium_keys", { count });
//#endregion
export { listRoles as _, adminCreateRole as a, adminGeneratePremiumKeys as c, adminRemoveWhitelistByUsername as d, adminSetRoleVisibility as f, listProfileRoles as g, isWhitelisted as h, adminCreateAccount as i, adminListProfiles as l, adminUnbanProfile as m, adminAssignRole as n, adminDeleteProfile as o, adminSetUsername as p, adminBanProfile as r, adminDeleteRole as s, adminAddWhitelistByUsername as t, adminRemoveRole as u };
