const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit',function(e){
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username,3,15);
    checkLength(password,6,12);
    checkLength(password2,6,12);
    checkEmail(email);
    checkPassWordMatch(password,password2);
})

const checkRequired = (inputArr) => {
    inputArr.forEach(input =>{
        if (input.value.trim() === "") {
            showError(input, `${getFieldName(input)} is required.`);
        }else{
            showSuccess(input);
        }
    })
}

const showSuccess = (input) =>{
    const control = input.parentElement;
    control.className = "control success";
}

const showError = (input, errorMsg) =>{
    const control = input.parentElement;
    control.className = "control failure";
    const small = control.querySelector('small');
    small.innerText = errorMsg;
}

const checkLength = (input, min, max) =>{
    const control = input.parentElement;
    if (input.value.length < min ){
        showError(input, `${getFieldName(input)} must be at least ${min} characters.`);
    }else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters.`);
    }else{
        showSuccess(input);
    }
}

const getFieldName = (input) =>{
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

const checkEmail = (email) =>{
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(email.value.toLowerCase())){
        showSuccess(email);
    }else{
        showError(email,'Email is not valid.');
    }
}

const checkPassWordMatch = (password,password2) =>{
    if (password.value !== password2.value){
        showError(password2,'The passwords do not match.');
    }
}