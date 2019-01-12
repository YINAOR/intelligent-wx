define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('main/unbind_view'),
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
                        if(res.code == 200){

                            console.log('success')
                            console.log(res)
                            localStorage.setItem("token",res.data.token);
                                                   
                            var student = JSON.stringify(res.data.student);
                            localStorage.setItem("student",student);

                            Dialog.init(res.msg,1000)

                        }else if(res.msg == "解绑成功！"){
                            Dialog.init(res.msg,1000)
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