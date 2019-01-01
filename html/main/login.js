define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('main/login_view'),
        data: {
            num:"",
            password:""
        },
        ready: function() {
            sessionStorage.setItem("deviceCode", 1);
        },
        methods: {
            login: function(){
                var num = $("#num").val();
                var password = $("#password").val();
                console.log(num)
                console.log(password)
                Http.ajax({
                    url: "student/login.do",
                    async: false,
                    data: {
                            num:num,
                            password:password
                    },
                    success: function(res){
                        console.log('success')
                        console.log(res)
                        sessionStorage.setItem("token",res.data.token);
                                               
                        var student = JSON.stringify(res.data.student);
                        sessionStorage.setItem("student",student);

                        _g.openWin({
                            url: "index_frame.html"
                        })
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