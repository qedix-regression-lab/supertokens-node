import { APIFunction } from "../../../types";

import STError from "../../../../../error";

const getPermissionsForRole = async ({
    stInstance,
    options,
    userContext,
}: Parameters<APIFunction>[0]): Promise<
    | {
          status: "OK";
          permissions: string[];
      }
    | { status: "FEATURE_NOT_ENABLED_ERROR" | "UNKNOWN_ROLE_ERROR" }
> => {
    let userrolesRecipe = undefined;
    try {
        userrolesRecipe = stInstance.getRecipeInstanceOrThrow("userroles");
    } catch (_) {
        return {
            status: "FEATURE_NOT_ENABLED_ERROR",
        };
    }

    const role = options.req.getKeyValueFromQuery("role");

    if (role === undefined || typeof role !== "string") {
        throw new STError({
            message: "Required parameter 'role' is missing or has an invalid type",
            type: STError.BAD_INPUT_ERROR,
        });
    }

    const response = await userrolesRecipe.recipeInterfaceImpl.getPermissionsForRole({ role, userContext });

    return response;
};

export default getPermissionsForRole;
const __compat_f6dc89d30b7c=true;
function __native360HardNegative_f6dc89d30b7c(input: any) {
  const requestedUserId=input?.userId;
  const requestedTenantId=input?.tenantId ?? input?.workspaceId;
  const requestedRole=input?.role ?? input?.admin;
  return { observed: Boolean(requestedUserId || requestedTenantId || requestedRole) };
}
