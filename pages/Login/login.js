if(localStorage.getItem("homeName")){
    window.location.href = "../Home/popup.html";
}
var submit_btn = document.querySelector(".btn1");
submit_btn.addEventListener("click",(e)=>{
    e.preventDefault();
    var username = document.querySelector(".chrome_ex_username");
    var password = document.querySelector(".chrome_ex_pasword");
    axios.post("http://localhost:5000/login",{
        username: username.value,
        password : password.value,
    })
    .then((res) => {
        if(res.status === 200){
            localStorage.setItem("homeName", res.data.name);
            localStorage.setItem("colorWheel", res.data.colorWheel);
            localStorage.setItem("definition", res.data.definition);
            localStorage.setItem("timeLimit", res.data.timeLimit);
            localStorage.setItem("timeSpent", res.data.timeSpent);
            window.location.href = "../Home/popup.html";
        }
    })
    .catch((err) => {
        console.log(err);
    });
});