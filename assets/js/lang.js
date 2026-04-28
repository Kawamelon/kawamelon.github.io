function updateLanguage(langData)
{
    let langElements = document.querySelectorAll('[lang-dependant]');
    langElements.forEach(
        element => {
            const key = element.getAttribute('lang-dependant');
            element.innerHTML = langData[key];
        }
    )
}

function saveLangPreferences(lang)
{
    localStorage.setItem('language', lang);
    location.reload();
}

async function fetchLanguageData(lang) {
    const response = await fetch(`assets/languages/${lang}.json`);
    return response.json();
}

async function changeLanguage(lang) {
    await saveLangPreference(lang);
    
    const langData = await fetchLanguageData(lang);
    updateLanguage(langData);
}

async function init_content()
{
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateLanguage(langData);
}