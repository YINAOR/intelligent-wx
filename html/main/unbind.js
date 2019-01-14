define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('/html/main/unbind_view.html'),
        data: {
            num:"",
            password:""
        },
        ready: function() {
            
        },
        methods: {
            unbind: function(){
                var num = $("#num").val();
                var password = $("#password").val();
                console.log(num)
                console.log(password)
                Http.ajax({
                    url: "student/activate.do",
                    async: false,
                    data: {
                        student:{
                            num:num,
                            password:password,
                        }

                    },
                    success: function(res){
                        console.log(res)
                        if(res.msg == "解绑成功！"){
                            Dialog.init(res.msg,1000)
                            localStorage.removeItem("token");
                            localStorage.removeItem("student");
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
    });

    
    module.exports = {};
})