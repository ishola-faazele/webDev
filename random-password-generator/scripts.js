document.addEventListener("DOMContentLoaded", function() {
    let passwordBox = document.querySelector(".pwd-box");

    function genPwd(length = 16) {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let password = "";
        for (let i = 0; i < length; i++) {
            let randomNumber = Math.floor(Math.random() * (chars.length));
            password += chars.substring(randomNumber, randomNumber + 1); // substring will return a string from char[start] to char[end], non inclusive.
        }
        passwordBox.textContent = password;
    }

    function copyPwd() {
        let range = document.createRange();
        range.selectNode(passwordBox);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
    };
    
    let generate = document.getElementById("generate");
    generate.onclick = () => {
        genPwd();
    };
    //document.getElementById("generate").addEventListener("click", genPwd);
    document.getElementById("copy").addEventListener("click", copyPwd);
});
