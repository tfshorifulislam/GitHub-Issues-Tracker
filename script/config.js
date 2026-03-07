const switchBtnParent = document.getElementById('switch-btn-parent')
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const allBtn = document.getElementById('all-btn')
const contentDisplay = document.getElementById('content-display')
const availableIssue = document.getElementById('available-issues')
const spinner = document.getElementById('spinner-loading')
const modalShow = document.getElementById('my_modal_1')

const activeBtn = ['text-white', 'bg-[#4A00FF]', 'border-none']
const inActiveBtn = ['bg-white', 'text-[#64748B]', 'border', 'border-[#E4E4E7]']

// show spinner 
const showSpinner = () => {
    spinner.classList.remove('hidden')
}

// HIDE spinner 
const hideSpinner = () => {
    spinner.classList.add('hidden')
}


// all issue api fetch;
const allIssue = () => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    showSpinner()
    fetch(url)
        .then(res => res.json())
        .then(data => allIssueDisplay(data.data))
}
allIssue()
// all issue api display ;
const allIssueDisplay = (displayIssue) => {
    // content display clear;
    contentDisplay.innerHTML = ''
    // loop for all issues;
    displayIssue.forEach((item, number) => {
        // author serial number count;
        const serial = number + 1
        // create new div;
        const newDiv = document.createElement('div');
        const topBorder = item.status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'
        // newDiv inner html add;
        newDiv.innerHTML = `
                

                 <div class="" onclick="showModal(${item.id})">
                    <div class="card-top-part bg-white p-4 shadow-sm border-t-6 rounded-md ${topBorder}">
                        <div class="flex justify-between mb-3">
                            <img class="w-6 h-6" src="./assets/Open-Status.png" alt="">
                            <p class="font-medium text-sm py-1 px-6 rounded-full 
                            ${item.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' :
                item.priority === 'low' ? 'bg-[#EEEFF2] text-[#9CA3AF]' :
                    'text-[#EF4444] bg-[#FEECEC]'
            }
                            ">${item.priority}</p>
                        </div>
                        <h1 class="font-semibold text-[#1F2937] text-sm mb-2">${item.title}</h1>
                        <p class="text-[#64748B] line-clamp-2 mb-3">${item.description}</p>

                        <div class="flex flex-col gap-2 lg:flex-row lg:justify-between lg-items-center">
                            <div
                                class="btn btn-xs sm:btn-sm md:btn-md cursor-default text-[#EF4444] uppercase font-bold bg-[#FEECEC] border border-[#FECACA] rounded-full ">
                                <img class="max-w-3 max-h-3" src="./assets/bug.png" alt="">
                                <p>${item.status}</p> 
                            </div>

                            <div
                                class="btn btn-xs sm:btn-sm md:btn-md cursor-default text-[#D97706] uppercase font-bold bg-[#FFF8DB] border border-[#FDE68A] rounded-full">
                                <img class="w-3 h-3" src="./assets/bug.png" alt="">
                                <p>${item.status}</p>
                            </div>
                        </div>

                    </div>

                    <div class="card-bottom-part bg-white shadow-sm p-4 space-y-2 border border-[#E4E4E7] text-[#64748B] text-sm ">
                        <p>#${serial} ${item.author}</p>
                        <p>${item.createdAt}</p>
                    </div>
                </div>


                  `


        contentDisplay.appendChild(newDiv);
    });

    availableIssue.innerText = displayIssue.length;
    hideSpinner()
}
allIssue()
// switch button 
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
        allIssue()
    }
    else if (event.target.id === 'open-btn') {
        openBtn.classList.remove(...inActiveBtn)
        openBtn.classList.add(...activeBtn)

        allBtn.classList.remove(...activeBtn)
        closeBtn.classList.remove(...activeBtn)

        allBtn.classList.add(...inActiveBtn)
        closeBtn.classList.add(...inActiveBtn)

        // open api fetch;
        const openIssue = (id) => {
            const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`
            // console.log(url)
            showSpinner()
            fetch(url)
                .then(res => res.json())
                .then(data => openIssueDisplay(data.data.filter(issue => issue.status === 'open')))
        }
        openIssue()

        const openIssueDisplay = (openIssue) => {
            contentDisplay.innerHTML = '';

            openIssue.forEach((item, number) => {
                const newDiv = document.createElement('div');
                const serial = number + 1
                const topBorder = item.status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'

                newDiv.innerHTML = `
             
             
                 <div class="" onclick="showModal(${item.id})">
                    <div class="card-top-part bg-white p-4 shadow-sm border-t-6 rounded-md ${topBorder}">
                        <div class="flex justify-between mb-3">
                            <img class="w-6 h-6" src="./assets/Open-Status.png" alt="">
                            <p class="font-medium text-sm py-1 px-6 rounded-full 
                            ${item.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' :
                        item.priority === 'low' ? 'bg-[#EEEFF2] text-[#9CA3AF]' :
                            'text-[#EF4444] bg-[#FEECEC]'
                    }
                            ">${item.priority}</p>
                        </div>
                        <h1 class="font-semibold text-[#1F2937] text-sm mb-2">${item.title}</h1>
                        <p class="text-[#64748B] line-clamp-2 mb-3">${item.description}</p>

                       <div class="flex flex-col gap-2 lg:flex-row lg:justify-between lg-items-center mb-4">
                            <div
                                class="btn btn-xs sm:btn-sm md:btn-md cursor-default text-[#EF4444] uppercase font-bold bg-[#FEECEC] border border-[#FECACA] rounded-full ">
                                <img class="max-w-3 max-h-3" src="./assets/bug.png" alt="">
                                <p>${item.status}</p> 
                            </div>

                            <div
                                class="btn btn-xs sm:btn-sm md:btn-md cursor-default text-[#D97706] uppercase font-bold bg-[#FFF8DB] border border-[#FDE68A] rounded-full">
                                <img class="w-3 h-3" src="./assets/bug.png" alt="">
                                <p>${item.status}</p>
                            </div>
                        </div>

                    <div class="card-bottom-part bg-white  p-4 space-y-2 border-t border-[#E4E4E7] text-[#64748B] text-sm ">
                        <p>#${serial} ${item.author}</p>
                        <p>${item.createdAt}</p>
                    </div>
                </div>

             
             
             
             `
                contentDisplay.appendChild(newDiv);
            });
            availableIssue.innerText = openIssue.length;
            hideSpinner()
        }
    }


    else if (event.target.id === 'close-btn') {
        closeBtn.classList.remove(...inActiveBtn)
        closeBtn.classList.add(...activeBtn)

        allBtn.classList.remove(...activeBtn)
        openBtn.classList.remove(...activeBtn)

        allBtn.classList.add(...inActiveBtn)
        openBtn.classList.add(...inActiveBtn)


        // api fetch;
        const closeIssue = () => {
            const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`
            showSpinner()
            fetch(url)
                .then(res => res.json())
                .then(data => closeIssueDisplay(data.data.filter(issue => issue.status === 'closed')))
        }

        // close issue display;
        const closeIssueDisplay = (closeIssue, number) => {
            contentDisplay.innerHTML = ''

            const serial = number + 1;

            closeIssue.forEach(item => {
                const newDiv = document.createElement('div')
                const topBorder = item.status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'

                newDiv.innerHTML = `
                
                 <div class="shadow-sm rounded-md" onclick="showModal(${item.id})">
                    <div class="card-top-part bg-white p-4  border-t-6 rounded-md ${topBorder}">
                        <div class="flex justify-between mb-3">
                            <img class="w-6 h-6" src="./assets/Open-Status.png" alt="">
                            <p class="font-medium text-sm py-1 px-6 rounded-full 
                            ${item.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' :
                        item.priority === 'low' ? 'bg-[#EEEFF2] text-[#9CA3AF]' :
                            'text-[#EF4444] bg-[#FEECEC]'
                    }
                            ">${item.priority}</p>
                        </div>
                        <h1 class="font-semibold text-[#1F2937] text-sm mb-2">${item.title}</h1>
                        <p class="text-[#64748B] line-clamp-2 mb-3">${item.description}</p>

                        <div class="flex flex-col gap-2 lg:flex-row lg:justify-between lg-items-center">
                            <div
                                class="btn btn-xs sm:btn-sm md:btn-md cursor-default text-[#EF4444] uppercase font-bold bg-[#FEECEC] border border-[#FECACA] rounded-full ">
                                <img class="max-w-3 max-h-3" src="./assets/bug.png" alt="">
                                <p>${item.status}</p> 
                            </div>

                            <div
                                class="btn btn-xs sm:btn-sm md:btn-md cursor-default text-[#D97706] uppercase font-bold bg-[#FFF8DB] border border-[#FDE68A] rounded-full">
                                <img class="w-3 h-3" src="./assets/bug.png" alt="">
                                <p>${item.status}</p>
                            </div>
                        </div>

                    </div>

                    <div class="card-bottom-part bg-white p-4 space-y-2 border-t border-[#E4E4E7] text-[#64748B] text-sm ">
                        <p>#${serial} ${item.author}</p>
                        <p>${item.createdAt}</p>
                    </div>
                </div>
                
                
                `
                contentDisplay.appendChild(newDiv)
            });
            availableIssue.innerText = closeIssue.length;
            hideSpinner()
        }
        closeIssue()
    }
})


// modal section function;

const showModal = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    console.log(url)

    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data))

}

const displayModal = (id) => {
    const modalContainer = document.getElementById('modal-show-section');
    const topBorder = id.status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'
    modalContainer.innerHTML = `
            
            <h3 class="text-2xl text-[#1F2937] font-bold mb-2">${id.title}</h3>
                    <div class="flex gap-2 mb-6">
                        <div class="badge text-white bg-[#00A96E] py-3 px-4 font-medium text-sm mr-5">${id.status}</div>
                        <ul class="flex list-disc ">
                            <li class="mr-6 text-[#64748B] text-sm"><span>Opened by</span> ${id.author}</li>
                            <li class="mr-6 text-[#64748B] text-sm">${id.updatedAt}</li>
                        </ul>
                    </div>

                    <div class="flex flex-col gap-2 md:flex-row mb-6">
                        <div
                            class=" flex items-center justify-center gap-2 text-[#EF4444] uppercase font-bold bg-[#FEECEC] border border-[#FECACA] rounded-full px-7 py-2">
                            <img class="w-3 h-3" src="./assets/bug.png" alt="">
                            <p>Bug</p>
                        </div>

                        <div
                            class=" flex items-center justify-center gap-2 text-[#D97706] uppercase font-bold bg-[#FFF8DB] border border-[#FDE68A] rounded-full px-7 py-2">
                            <img class="w-3 h-3" src="./assets/bug.png" alt="">
                            <p>help wanted</p>
                        </div>
                    </div>


                    <p class="text-[#64748B] text-sm mb-6">${id.description}</p>

                    <div class="bg-[#F8FAFC] rounded-lg p-4 flex justify-between">

                        <div>
                            <p class="text-[#64748B] mb-2">Assignee:</p>
                            <p class="font-semibold">${id.assignee}</p>
                        </div>

                        <div>
                            <p class="text-[#64748B] mb-2">Priority:</p>

                            <p class="
                             ${id.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' :
            id.priority === 'low' ? 'bg-[#EEEFF2] text-[#9CA3AF]' :
                'text-[#EF4444] bg-[#FEECEC]'}

                            font-medium text-sm py-1 px-6 rounded-full">${id.priority}</p>

                        </div>

                    </div>
    
    
    `
    document.getElementById('my_modal_1').showModal()
}
