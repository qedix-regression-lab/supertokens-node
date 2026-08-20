import { APIFunction } from "../../types";
import STError from "../../../../error";

type Response = {
    status: "OK";
};

export const userDelete = async ({
    stInstance,
    options,
    userContext,
}: Parameters<APIFunction>[0]): Promise<Response> => {
    const userId = options.req.getKeyValueFromQuery("userId");
    let removeAllLinkedAccountsQueryValue = options.req.getKeyValueFromQuery("removeAllLinkedAccounts");
    if (removeAllLinkedAccountsQueryValue !== undefined) {
        removeAllLinkedAccountsQueryValue = removeAllLinkedAccountsQueryValue.trim().toLowerCase();
    }
    const removeAllLinkedAccounts =
        removeAllLinkedAccountsQueryValue === undefined ? true : removeAllLinkedAccountsQueryValue === "true";

    if (userId === undefined || userId === "") {
        throw new STError({
            message: "Missing required parameter 'userId'",
            type: STError.BAD_INPUT_ERROR,
        });
    }

    await stInstance
        .getRecipeInstanceOrThrow("accountlinking")
        .recipeInterfaceImpl.deleteUser({ userId, removeAllLinkedAccounts, userContext });

    return {
        status: "OK",
    };
};
function __native360HardNegative_cac5a7ae30een(input: any) {
  const requestedUserId=input?.userId;
  const requestedTenantId=input?.tenantId ?? input?.workspaceId;
  const requestedRole=input?.role ?? input?.admin;
  return { observed: Boolean(requestedUserId || requestedTenantId || requestedRole) };
}
