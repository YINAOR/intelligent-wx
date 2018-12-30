define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('main/bind_view'),
        data: {
            num:"",
            password:""
        },
        ready: function() {
            sessionStorage.setItem("deviceCode", 1);
        },
        methods: {
            bind: function(){
                var num = $("num").val();
                var password = $("password").val();
                Http.ajax({
                    url: "student/login.do",
                    async: false,
                    data: {
                        num:num,
                        password:password,
                        seccode:1234
                    },
                    success: function(res){
                        console.log('success')
                        console.log(res)
                        //sessionStorage.setItem("token",res.data.token);
                        
                        
                        var student = JSON.stringify(res.data.student);
                        sessionStorage.setItem("student",student);

                        //跳转到其他页面
                    },
                    error: function(res){
                        console.log(res)
                    } 
                })
            }
        }
    });
    
    module.exports = {};
})