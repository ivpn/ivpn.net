
(function () {

    function updateAppsMenu() {
        var downloadLinks = document.querySelectorAll('.navigation__item__apps a');

        if (downloadLinks) {
            var userAgent = window.navigator.userAgent,
                platform = window.navigator.platform,
                macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
                windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
                iosPlatforms = ['iPhone', 'iPad', 'iPod'],
                os = null;

            if (macosPlatforms.indexOf(platform) !== -1) {
                updateLinks(downloadLinks, '/apps-macos/');
            } else if (windowsPlatforms.indexOf(platform) !== -1) {
                updateLinks(downloadLinks, '/apps-windows/');
            } else if (iosPlatforms.indexOf(platform) !== -1) {
                updateLinks(downloadLinks, '/apps-ios/');
            } else if (/Android/.test(userAgent)) {
                updateLinks(downloadLinks, '/apps-android/');
            } else if (!os && /Linux/.test(platform)) {
                updateLinks(downloadLinks, '/apps-linux/');
            }
        }
    }

    function updateLinks(links, href) {
        links.forEach(function (a) {
            a.href = href;
        });
    }

    function updateLoginMenu(isAuth, isLegacyAuth) {

        let elems = document.querySelectorAll('[data-show],[data-hide]');
        elems.forEach(elem => {
            if (isAuth)
                elem.setAttribute("data-auth", "auth")
            else if (isLegacyAuth)
                elem.setAttribute("data-auth", "auth-legacy")
            else {
                elem.removeAttribute("data-auth")
            }
        })
    };

    function updateCheckboxes(checkboxes, isChecked, excludeCheckbox) {

        checkboxes.forEach((checkbox) => {
            if (checkbox != excludeCheckbox) {
                checkbox.checked = isChecked
            }
        });
    }

    function getCurrentScheme() {
        var savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return { name: savedTheme, forced: true };
        }

        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return { name: 'dark', forced: false };
        }

        return { name: 'light', forced: false };;
    }

    function setScheme(schemeName) {
        localStorage.setItem('theme', schemeName);
        document.body.className = schemeName + '-theme';
    }

    function addSwitcherEvent(checkbox) {
        checkbox.addEventListener('change', function () {

            // Do not change theme when on the page which is known to have problem
            // changing forced theme
            if (window.location.pathname.endsWith("/cc")) {
                return;
            }

            if (checkbox.checked) {
                setScheme('dark')
            } else {
                setScheme('light')
            }

            updateCheckboxes(checkboxes, checkbox.checked, checkbox)
        });
    }

    function setupHandler(checkboxes) {
        checkboxes.forEach((checkbox) => {
            addSwitcherEvent(checkbox)
        });
    }

    function htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    }

    function updateConnectionInfo() {
        fetch('/web/status').then(function (response) {
            return response.text();
        }).then(function (html) {
            var container = document.querySelectorAll('.connection-status');
            if (container.length) {
                var responseElement = htmlToElement(html);
                container[0].innerHTML = responseElement.innerHTML;
                container[0].className = responseElement.className;

                // Reattach the click event for theme switcher in the main navigation
                var themeSwitcher = document.getElementById('top-theme-switch');
                if (themeSwitcher && window.addSwitcherEvent) {
                    window.addSwitcherEvent(themeSwitcher);
                }
            }
        });
    }

    window.getCurrentScheme = getCurrentScheme
    window.addSwitcherEvent = addSwitcherEvent

    let checkboxes = document.querySelectorAll('input[type=checkbox][data-theme-switch]');
    setupHandler(checkboxes)

    let scheme = getCurrentScheme()
    updateCheckboxes(checkboxes, scheme.name == 'dark', null)

    updateAppsMenu();
    updateConnectionInfo();

    window.updateLoginMenu = updateLoginMenu

    let isAuth = document.cookie.indexOf("logged_in=1") != -1
    let isLegacyAuth = document.cookie.indexOf("logged_in=l") != -1

    updateLoginMenu(isAuth, isLegacyAuth);
})();
