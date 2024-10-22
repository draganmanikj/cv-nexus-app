export const isAllowed = (action) => {
    let allowed = false;
    if(action === urlActions.create || action=== urlActions.edit || action===urlActions.view || action===urlActions.delete || action === "review" || action === "add" || action === "search")
        allowed=true;
    if(!allowed) {
        alert('Action not allowed')
        throw 'Action not allowed'
    }
}

export const getAllowedRoles = (action) => {
    if (action === urlActions.view || action === "review" || action === "search")
        return ["SUPERADMIN", "OPERATORI","KORISNICI"]
    else if(action === urlActions.create || action=== urlActions.edit || action === "add")
        return ["SUPERADMIN", "OPERATORI"]
    else if (action === urlActions.delete )
        return ["SUPERADMIN"]
    else
        return ["__none"];
}

export const urlActions = {
    view: "view",
    edit: "edit",
    create: "create",
    delete: "delete"
}
