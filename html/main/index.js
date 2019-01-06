define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('main/index_view'),
        data: {
            userAvter: '',
            userName: '',
            registration: 0,
            lectureRecord: 0,
            conversationRecord: 0,
            indexList: [{
                icon: '../../image/main/lecture1.png',
                title: '讲座',
                url: '../../html/lecture/list_frame.html'
            },{
                icon: '../../image/main/conversation1.png',
                title: '茶座',
                url: '../../html/conversation/list_frame.html'
            }],
        },
        ready: function() {
            var student = JSON.parse(sessionStorage.student);
            
            this.userAvter = student.avatar;
            
            this.userName = student.name;
        },
        methods: {
            openWinTap: function(index) {
                console.log(index)
            }          
        }
    });

    var _page = {
        getNum: function() {
            // Http.ajax({
            //     url: '/user/queryProfile.do',
            //     isAsync: false,
            //     data: {

            //     },
            //     success: function(res){
            //         if(res.code == 200){
            //             main.registration = res.data.lsAmount; //讲座报名数
            //             main.lectureRecord = res.data.lpAmount; //讲座签到数
            //             main.conversationRecord = res.data.taAmount;//茶座报名数
                       
            //         }else {
            //             layer.open({
            //             content: res.msg,
            //             skin: 'msg',
            //             time: 1
            //             })
            //         }
            //     }
            // }) 
             $.ajax({
                url: 'http://120.77.204.252:80/user/queryProfile.do',
                async: true,
                dataType:"json",
                type: 'post',
                contentType: 'application/json', //'application/x-www-form-urlencoded'
                processData: false, //!== false,
                data: JSON.stringify({token: sessionStorage.getItem('token')}),
                success: function (res) {
                    main.registration = res.data.lsAmount; //讲座报名数
                        main.lectureRecord = res.data.lpAmount; //讲座签到数
                        main.conversationRecord = res.data.taAmount;//茶座报名数
                },
                error:function(err) {
                    
                }
            })
        }
    }

    _page.getNum();
    
    module.exports = {};
})