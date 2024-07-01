(function () {

function getLanguage(){

    if( localStorage.getItem('lang') != null){
        return localStorage.getItem('lang');
    }

    let browserLanguage = navigator.language || navigator.userLanguage; 
    
    if( browserLanguage.startsWith("es")){
        return "es";
    }else{
        return "en"
    }
}

function addLanguageSwitcherEvent() {
    document.querySelectorAll('.language-switch').forEach(function(anchor) {
        anchor.addEventListener('click', function () {
            localStorage.setItem('lang', anchor.dataset.lang);
        });
    });
}

window.addLanguageSwitcherEvent = addLanguageSwitcherEvent;
window.getLanguage = getLanguage;

})();
