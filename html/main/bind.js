define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('/html/main/bind_view.html'),
        data: {
            num:"",
            password:""
        },
        ready: function() {
            
        },
        methods: {
            bind: function(){
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
                            wetchatCode: sessionStorage.code
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
                                content: res.msg,
                                skin: 'msg',
                                time: 1
                            })

                           
                            setTimeout(function(){api.openWin({
                                url: "index_frame.html"
                            })},1000) 

                        }else if(res.msg == "解绑成功！"){
                            layer.open({
                                content: res.msg,
                                skin: 'msg',
                                time: 1
                            })
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

    var _page = {
        getQueryString: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	        var r = window.location.search.substr(1).match(reg);
            if (r != null) 
                return unescape(r[2]); 
            return null;
        },

        
    };

    var code =  _page.getQueryString("code");

    sessionStorage.setItem("code",code)

    
    module.exports = {};
})