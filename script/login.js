const singInBtn = document.getElementById('sing-in-btn');

singInBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const pinNumberInput = document.getElementById('pin-number');
    const pinNumber = pinNumberInput.value

    const userNameInput = document.getElementById('user-name');
    const userName = userNameInput.value

    
    if(pinNumber === 'admin123' && userName === 'admin'){
        alert('sign In Successful');
        window.location.assign('./home.html')
    }
    else if(pinNumber === '' || userName === ''){
        alert('please fill this input')
    }
    else{
        alert('wrong password or username')
    }

 
})
