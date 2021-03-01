function loginCheck(){
    var id=document.loginForm.id_input.value;
    var pass=document.loginForm.password_input.value;
    if(id==null||id.length==0||id=='아이디'){
            alert("아이디를 입력바랍니다.");
            document.loginForm.id_input.focus();
            return;
    }
    if(pass==null||pass.length==0||pass=='비밀번호'){
            alert("비밀번호를 입력바랍니다.");
            document.loginForm.password_input.focus();
            return;
    }
    else{
            document.loginForm.action="login/login.mo";
            document.loginForm.method="post";
            document.loginForm.submit();
    }
}

function inputCheck(){
    if(document.register.mem_name.value==""){
        alert("이름을 입력해주세요.");
        document.register.mem_name.focus();
        return false;
    }
    if(document.register.resident_1.value==""||document.register.resident_2.value==""){
        alert("주민등록번호를 입력해주세요.");
        document.register.resident_1.focus();
        return false;
    }
    if((document.register.phone_1.value==""||document.register.phone_2.value=="")||(document.register.phone_2.value==""||document.register.phone_3.value=="")){
        alert("휴대전화번호를 입력해주세요.");
        document.register.phone_1.focus();
        return false;
    }
    if(document.register.mem_id.value==""){
        alert("아이디를 입력해주세요.");
        document.register.mem_id.focus();
        return false;
    }
    if(document.register.mem_email1.value==""||document.register.mem_email2.value==""){
        alert("이메일을 입력해주세요.");
        document.register.mem_email1.focus();
        return false;
    }
    if(document.register.mem_passwd.value==""){
        alert("비밀번호를 입력해주세요.");
        document.register.mem_passwd.focus();
        return false;
    }
    if(document.register.mem_repasswd.value==""){
        alert("비밀번호 재입력을 입력하세요.");
        document.register.mem_repasswd.focus();
        return false;
    }

    if(document.register.mem_passwd.value != document.register.mem_repasswd.value){
        alert("비밀번호가 일치하지 않습니다.");
        document.register.mem_repasswd.focus();
        return false;
    }

    return true;
}