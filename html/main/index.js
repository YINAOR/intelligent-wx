define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('main/index_view'),
        data: {
            userAvter: '',
            userName: '',
            lsAmount: 0, //讲座报名
            lpAmount: 0, //讲座参与
            taAmount: 0, //茶座参与
        },
        ready: function() {
            var _this = this;
            
            if(localStorage.getItem("token") == null){
                api.openWin({
                    url:'bind_frame.html'
                })
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
                         main.registration = res.data.lsAmount; //讲座报名数
                         main.lectureRecord = res.data.lpAmount; //讲座签到数
                         main.conversationRecord = res.data.taAmount;//茶座报名数
                       
                     }else {
                         layer.open({
                         content: res.msg,
                         skin: 'msg',
                         time: 1
                         })
                     }
                 }
             }) 

        }
    }

    _page.getNum();
    
    module.exports = {};
})