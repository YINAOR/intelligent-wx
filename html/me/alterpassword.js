define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('/html/me/alterpassword_view.html'),
        data: {
            oldPassword:"",
            newPassword:""
        },
        ready: function() {
            
        },
        methods: {
            alter: function(){
                var oldPassword = $("#oldPassword").val();
                var newPassword = $("#newPassword").val();
<<<<<<< HEAD
                var againPassword = $("#againNewPassword").val();
                if(oldPassword != null && newPassword != null && againPassword != null){
                    if(againPassword != newPassword){
                        Dialog.init("两次输入新密码不一致!",1000)
                        $("#againNewPassword").val("");
                        $("#newPassword").val("");
                    }else{
                        Http.ajax({
                            url: "student/updatePassword.do",
                            async: false,
                            data: {
                                oldPassword: oldPassword,
                                newPassword: newPassword
                            },
                            success: function(res){
                                console.log(res)
                                if(res.code == 200){
                                    Dialog.init(res.msg,1000)
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("student");
          
                                    setTimeout(function(){api.openWin({
                                        url: "../main/login_frame.html"
                                    })},1000) 
        
                                }else{
                                    Dialog.init(res.msg,1000)
                                }
        
                            },
                            error: function(res){ 
                                Dialog.init(res.msg,1000)
                            } 
                        })
                    }
=======
                console.log(oldPassword)
                console.log(newPassword)
                Http.ajax({
                    url: "student/updatePassword.do",
                    async: false,
                    data: {
                        oldPassword: oldPassword,
                        newPassword: newPassword
                    },
                    success: function(res){
                        console.log(res)
                        if(res.code == 200){
                            console.log(res)
                            Dialog.init(res.msg,1000)
                            localStorage.removeItem("token");
                            localStorage.removeItem("student");
  
                            setTimeout(function(){api.openWin({
                                url: "/html/main/login_frame.html"
                            })},1000) 
>>>>>>> 657365843f6b69172e83979fa6d8fad3b6c139a3

                }
                
            }
        }
    });

    
    module.exports = {};
})