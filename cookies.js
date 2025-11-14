// cookies.js
class CookieManager {
    constructor() {
        this.cookieBanner = document.getElementById('cookie-banner');
        this.cookieModal = document.getElementById('cookie-modal');
        this.init();
    }

    init() {
        // Verificar se o usuário já fez uma escolha
        if (!this.getCookiePreference()) {
            this.showBanner();
        }

        this.setupEventListeners();
        this.loadCookies();
    }

    setupEventListeners() {
        // Banner buttons
        document.getElementById('accept-cookies').addEventListener('click', () => {
            this.acceptAllCookies();
            this.hideBanner();
        });

        document.getElementById('reject-cookies').addEventListener('click', () => {
            this.rejectAllCookies();
            this.hideBanner();
        });

        document.getElementById('customize-cookies').addEventListener('click', () => {
            this.showModal();
        });

        // Modal buttons
        document.getElementById('save-preferences').addEventListener('click', () => {
            this.savePreferences();
            this.hideModal();
            this.hideBanner();
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            this.hideModal();
        });

        // Fechar modal clicando fora
        this.cookieModal.addEventListener('click', (e) => {
            if (e.target === this.cookieModal) {
                this.hideModal();
            }
        });
    }

    showBanner() {
        setTimeout(() => {
            this.cookieBanner.classList.add('active');
        }, 1000);
    }

    hideBanner() {
        this.cookieBanner.classList.remove('active');
    }

    showModal() {
        this.cookieModal.classList.add('active');
    }

    hideModal() {
        this.cookieModal.classList.remove('active');
    }

    acceptAllCookies() {
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        this.setCookiePreference(preferences);
        this.loadCookies();
    }

    rejectAllCookies() {
        const preferences = {
            necessary: true, // Cookies necessários sempre ativos
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        this.setCookiePreference(preferences);
        this.loadCookies();
    }

    savePreferences() {
        const preferences = {
            necessary: true, // Sempre true
            analytics: document.getElementById('analytics-cookies').checked,
            marketing: document.getElementById('marketing-cookies').checked,
            timestamp: new Date().toISOString()
        };
        this.setCookiePreference(preferences);
        this.loadCookies();
    }

    setCookiePreference(preferences) {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1); // Expira em 1 ano
        
        document.cookie = `cookiePreferences=${JSON.stringify(preferences)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    }

    getCookiePreference() {
        const name = 'cookiePreferences=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return JSON.parse(c.substring(name.length, c.length));
            }
        }
        return null;
    }

loadCookies() {
    const preferences = this.getCookiePreference();
    
    if (preferences) {
        // Cookies necessários sempre carregam
        this.loadNecessaryCookies();

        // Analytics somente se permitido
        if (preferences.analytics) {
            this.loadGoogleAnalytics();
        }

        // Marketing somente se permitido
        if (preferences.marketing) {
            this.loadMarketingCookies();
        }

        this.updateModalUI(preferences);
    }
}

loadNecessaryCookies() {
    // Cookies essenciais para funcionalidades do site
    // Exemplo: idioma preferido, itens do carrinho, etc.
    console.log('Cookies necessários carregados');
}

loadGoogleAnalytics() {
    // SUBSTITUA 'GA_MEASUREMENT_ID' pelo seu ID real do Google Analytics
    const gaId = 'GA_MEASUREMENT_ID';
    
    // Script do gtag.js
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    
    const script2 = document.createElement('script');
    script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', {
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
        });
    `;
    
    document.head.appendChild(script1);
    document.head.appendChild(script2);
    console.log('Google Analytics carregado');
}


loadMarketingCookies() {
    // Facebook Pixel - SUBSTITUA 'SEU_PIXEL_ID' pelo ID real
    const pixelId = '812270471598721';
    
    const fbScript = document.createElement('script');
    fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
    `;
    
    // Pixel NoScript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>`;
    
    document.head.appendChild(fbScript);
    document.body.appendChild(noscript);
    console.log('Facebook Pixel carregado');
}
    updateModalUI(preferences) {
        document.getElementById('analytics-cookies').checked = preferences.analytics;
        document.getElementById('marketing-cookies').checked = preferences.marketing;
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new CookieManager();
});

// Função utilitária para verificar preferências
function hasCookieConsent(type) {
    const preferences = getCookiePreference();
    return preferences ? preferences[type] : false;
}

function getCookiePreference() {
    const name = 'cookiePreferences=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return null;
}

// No final do cookies.js - para usar em outras páginas
function checkCookieConsent() {
    const preferences = getCookiePreference();
    return {
        analytics: preferences ? preferences.analytics : false,
        marketing: preferences ? preferences.marketing : false,
        necessary: true
    };
}