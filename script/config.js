const switchBtnParent = document.getElementById('switch-btn-parent')
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const allBtn = document.getElementById('all-btn')
const contentDisplay = document.getElementById('content-display')

const activeBtn = ['text-white', 'bg-[#4A00FF]', 'border-none']
const inActiveBtn = ['bg-white', 'text-[#64748B]', 'border', 'border-[#E4E4E7]']

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

        // all issue api fetch;
        const allIssue = () => {
            const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;

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
                // newDiv inner html add;
                newDiv.innerHTML = `
                

                 <div class="">
                    <div class="card-top-part bg-white p-4 shadow-sm">
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

                        <div class="flex flex-col gap-2 md:flex-row md:justify-between">
                            <div
                                class=" flex items-center justify-center gap-2 text-[#EF4444] uppercase font-bold bg-[#FEECEC] border border-[#FECACA] rounded-full px-7 py-2">
                                <img class="w-3 h-3" src="./assets/bug.png" alt="">
                                <p>${item.status}</p>
                            </div>

                            <div
                                class=" flex items-center justify-center gap-2 text-[#D97706] uppercase font-bold bg-[#FFF8DB] border border-[#FDE68A] rounded-full px-7 py-2">
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

        }
    }
    else if (event.target.id === 'open-btn') {
        openBtn.classList.remove(...inActiveBtn)
        openBtn.classList.add(...activeBtn)

        allBtn.classList.remove(...activeBtn)
        allBtn.classList.remove(...activeBtn)

        closeBtn.classList.add(...inActiveBtn)
        closeBtn.classList.add(...inActiveBtn)


    }

    else if (event.target.id === 'close-btn') {
        closeBtn.classList.remove(...inActiveBtn)
        closeBtn.classList.add(...activeBtn)

        allBtn.classList.remove(...activeBtn)
        openBtn.classList.remove(...activeBtn)

        allBtn.classList.add(...inActiveBtn)
        openBtn.classList.add(...inActiveBtn)


    }
})


