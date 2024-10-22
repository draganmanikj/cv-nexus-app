import i18next from 'i18next';
import {domainMessages_en} from './domainMessages_en';
import {domainMessages_mk} from './domainMessages_mk';

i18next
    .init({
        interpolation: {
            // React already does escaping
            escapeValue: false,
        },
        lng: localStorage.getItem("appLanguage")? localStorage.getItem("appLanguage") : "mk",
        // Using simple hardcoded resources for simple example
        resources: {
            en: {
                translation: {
                    ...domainMessages_en
                },
            },
            mk: {
                translation: {
                    ...domainMessages_mk
                },
            },
        },
    });

export default i18next