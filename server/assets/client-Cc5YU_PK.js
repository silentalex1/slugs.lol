import { createClient } from "@supabase/supabase-js";
var supabase = createClient("https://mmemezjmpslshendikzj.supabase.co", "sb_publishable_UwdxuZHlTbSKsPwzroHVnA_8EL2QB4V", { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true,
	storage: typeof window !== "undefined" ? window.localStorage : void 0
} });
//#endregion
export { supabase as t };
