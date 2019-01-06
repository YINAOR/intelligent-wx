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

            
            if(sessionStorage.getItem("token") == null){
                api.openWin({
                    url:'login_frame.html'
                })
            }else{
                var _this = this;
                /*var student = JSON.parse(sessionStorage.student);
            
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
                            _this.userAvter = resData.student.avatar;
                            _this.userName = resData.student.name;
    
                            _this.lpAmount = resData.lpAmount;
                            _this.taAmount = resData.taAmount;
                            _this.lsAmount = resData.lsAmount;

                            sessionStorage.setItem("student",resData.student)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            }
            
        },
        methods: {
            openWinTap: function(index) {
                console.log(index)
            }          
        }
    });
    
    module.exports = {};
})