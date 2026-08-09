import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
//#region src/routes/register.tsx
var $$splitComponentImporter = () => import("./register-Bcq0W5N9.js");
var searchSchema = z.object({ claim: z.string().optional() });
var Route = createFileRoute("/register")({
	validateSearch: (s) => searchSchema.parse(s),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
