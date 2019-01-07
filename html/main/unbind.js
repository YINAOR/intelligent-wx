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
                        if(res.msg == "绑定成功！" || res.msg == "首次绑定成功！"){

                            console.log('success')
                            console.log(res)
                            localStorage.setItem("token",res.data.token);
                                                   
                            var student = JSON.stringify(res.data.student);
                            localStorage.setItem("student",student);

                            layer.open({
                                content: '绑定成功！',
                                skin: 'msg',
                                time: 1
                            })

                           
                            setTimeout(function(){api.openWin({
                                url: "index_frame.html"
                            })},1000) 

                        }else if(res.msg == "解绑成功！"){
                            layer.open({
                                content: '解绑成功！',
                                skin: 'msg',
                                time: 2
                            })
                        }else{
                            layer.open({
                                content: res.msg,
                                skin: 'msg',
                                time: 2
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