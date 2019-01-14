define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('/html/main/index_view.html'),
        data: {
            userAvter: '',
            userName: '',
            lsAmount: 0, //讲座报名
            lpAmount: 0, //讲座参与
            taAmount: 0, //茶座参与
        },
        ready: function() {

            if(localStorage.getItem("token") == null){
<<<<<<< HEAD
                Dialog.init("请先绑定或登录！")

                setTimeout(function(){
                    api.openWin({
                        url:'bind_frame.html'
                    })
                },1000)
            }
=======
                // api.openWin({
                //     url:'/html/main/bind_frame.html'
                // })
            }else{
                
                /*var student = JSON.parse(localStorage.student);
            
                this.userAvter = student.avatar;
                
                this.userName = student.name;*/
                Http.ajax({
                    url: "/user/queryProfile.do",
                    async: false,
                    data: {},
                    success: function(res){
                        if(res.code == 200){
                            console.log("success")
                            console.log(res)    
                            var resData = res.data;
                            _this.userAvter = resData.student.wetchatImage;
                            _this.userName = resData.student.name;
    
                            _this.lpAmount = resData.lpAmount;
                            _this.taAmount = resData.taAmount;
                            _this.lsAmount = resData.lsAmount;

                            localStorage.setItem("student",JSON.stringify(resData.student));
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
           }
>>>>>>> 657365843f6b69172e83979fa6d8fad3b6c139a3
            
        },
        methods: {
      
        }
    });

    var _page = {
        getNum: function() {
             Http.ajax({
                 url: '/user/queryProfile.do',
                 isAsync: false,
                 data: {

                 },
                 success: function(res){
                     if(res.code == 200){

                        main.userAvter = res.data.student.wetchatImage;
                        main.userName = res.data.student.name;

                        main.lsAmount = res.data.lsAmount; //讲座报名数
                        main.lpAmount = res.data.lpAmount; //讲座签到数
                        main.taAmount = res.data.taAmount;//茶座报名数

                        localStorage.setItem("student",JSON.stringify(res.data.student));
                        
                     }else {
                        Dialog.init(res.msg,1000)
                     }
                 }
             }) 

        }
    }

    _page.getNum();
    
    module.exports = {};
})