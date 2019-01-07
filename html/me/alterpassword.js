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
                            layer.open({
                                content: res.msg,
                                skin: 'msg',
                                time: 1
                            })
                            localStorage.removeItem("token");
                            localStorage.removeItem("student");


                           
                            setTimeout(function(){api.openWin({
                                url: "login_frame.html"
                            })},1000) 

                        }else{
                            layer.open({
                                content: res.msg,
                                skin: 'msg',
                                time: 1
                            })
                        }

                    },
                    error: function(res){ 
                        console.log(res)
                        layer.open({
                            content: res.msg,
                            skin: 'msg',
                            time: 1
                        })
                    } 
                })
            }
        }
    });

    
    module.exports = {};
})