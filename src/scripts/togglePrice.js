




const priceToggle = (element, target) => {
    const priceToggleBtns = document.querySelectorAll('.btn-price-toggle')
    for (let priceToggleBtn of priceToggleBtns) {
        if(priceToggleBtn == element){
            priceToggleBtn.classList.add('bg-teal-500', 'text-white', 'active');
            priceToggleBtn.classList.remove('text-gray-500');
        } else{
            priceToggleBtn.classList.remove('bg-teal-500', 'text-white', 'active');
            priceToggleBtn.classList.add('text-gray-500');
        }
    }
    let toggleEls = document.getElementsByClassName('price-toggle');
    for (let toggleEl of toggleEls) {
        if(toggleEl.classList.contains(target)){
            toggleEl.classList.remove('hidden');
        } else{
            toggleEl.classList.add('hidden');
        }
    }
}

