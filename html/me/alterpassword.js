define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/alterpassword_view'),
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

                }
                
            }
        }
    });

    
    module.exports = {};
})