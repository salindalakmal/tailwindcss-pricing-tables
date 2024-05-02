

const toggleThemeMode = () => {

    let themeModeEls = document.querySelectorAll('[data-theme-mode]');

    themeModeEls.forEach((themeModeEl) => {  
        let activeMode = themeModeEl.getAttribute('data-theme-mode');

        if(activeMode === 'dark'){
            themeModeEl.setAttribute('data-theme-mode', 'light');
        } else{
            themeModeEl.setAttribute('data-theme-mode', 'dark');
        }
    })
    
}
