const switchBtnParent = document.getElementById('switch-btn-parent')
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const allBtn = document.getElementById('all-btn')

const activeBtn = ['text-white', 'bg-[#4A00FF]', 'border-none']
const inActiveBtn = ['bg-white', 'text-[#64748B]', 'border', 'border-[#E4E4E7]']

switchBtnParent.addEventListener('click', (event) => {

    if (event.target.tagName !== 'BUTTON')
        return;

    if (event.target.id === 'all-btn') {
        allBtn.classList.remove(...inActiveBtn)
        allBtn.classList.add(...activeBtn)
        
        openBtn.classList.remove(...activeBtn)
        closeBtn.classList.remove(...activeBtn)

        openBtn.classList.add(...inActiveBtn)
        closeBtn.classList.add(...inActiveBtn)

    }
    else if (event.target.id === 'open-btn') {
        openBtn.classList.remove(...inActiveBtn)
        openBtn.classList.add(...activeBtn)

        allBtn.classList.remove(...activeBtn)
        allBtn.classList.remove(...activeBtn)

        closeBtn.classList.add(...inActiveBtn)
        closeBtn.classList.add(...inActiveBtn)

        
    }

    else if (event.target.id === 'close-btn' ) {
        closeBtn.classList.remove(...inActiveBtn)
        closeBtn.classList.add(...activeBtn)

        allBtn.classList.remove(...activeBtn)
        openBtn.classList.remove(...activeBtn)

        allBtn.classList.add(...inActiveBtn)
        openBtn.classList.add(...inActiveBtn)

        
    }
})
