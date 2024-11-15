import {concatenateUrlPaths} from "asseco-utils";

const getUrlRoot = () => {
    return concatenateUrlPaths(`${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`,
        `${process.env.REACT_APP_ROUTER_BASE && process.env.REACT_APP_ROUTER_BASE !== "/" ? process.env.REACT_APP_ROUTER_BASE : ``}`);
}

export const properties = {
    urlRoot: getUrlRoot(),
    oidcSilentRenew: concatenateUrlPaths(getUrlRoot(),`silent_renew`),
    oidcLogoutRedirect: getUrlRoot(),
    oidcRedirectUrl: concatenateUrlPaths(getUrlRoot(),`callback`),
    oidcAuthority: process.env.REACT_APP_AUTHORITY, // configure keycloak
    oidcClientId: 'cv-nexus-app',
    oidcQueryParams: {"ui_locales":"mk"},
    // umAuthUrl: "/um/auth",
    oidcScope: 'openid profile',
    api: {
        mock: false,
        root: process.env.REACT_APP_API_ROOT,
    },
    app: {
        publicUrl: process.env.REACT_APP_PUBLIC_URL,
        keycloakAuthConsole: process.env.REACT_APP_KEYCLOACK_AUTH,
    },
    auth: {
        mock: false
    },
    maxInactivityTime: 900000,
    checkGroupMatch: true,
    disabledFieldOpacity: 0.65,
    groupName: "cv-nexus-app"
}
