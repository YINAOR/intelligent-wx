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
                        if(res.code == 200){

                            localStorage.setItem("token",res.data.token);
                                                   
                            var student = JSON.stringify(res.data.student);
                            localStorage.setItem("student",student);

                            Dialog.init(res.msg,1000)

                           
                            setTimeout(function(){api.openWin({
                                url: "index_frame.html"
                            })},1000) 

                        }else if(res.msg == "解绑成功！"){
                            Dialog.init(res.msg,1000)
                        }else{
                            Dialog.init(res.msg,1000)
                        }

                    },
                    error: function(res){
                        
                        console.log(res)
                        Dialog.init(res.msg,1000)
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