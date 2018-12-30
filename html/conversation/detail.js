define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('conversation/detail_view'),
        data: {
            theme: '',
            imageUrl: '../../image/lecture/desert.jpg',
            content: '',
            dateStr: '',
            startTimeStr: '',
            endTimeStr:'',
            address: '',
            speakerLinkList:[],
            groupOfPep: '',
            limitNumOfPep: 0,
            category: {},
            isSignUp: 0,
            signUpNum: 0,
        },
        ready: function() {
            sessionStorage.setItem("deviceCode", 1);
            sessionStorage.setItem("token","3115004205-6a7cc55dbfc14743b7b0cc20e33fe6d3");
        },
        methods: {
            signTap: function() {
                var apply = confirm("您确定要预报名吗");

                if(!main.isSignUp) {
                    main.isSignUp = !main.isSignUp;
                    main.SignUpNum ++;
                    Http.ajax({
                        url: "/student/teahouseAppointment.do",
                        isAsync: false,
                        data: {
                            
                        },
                        success: function(res){
                            console.log(res) //添加提示
                        }
                    })
                }
            }
        }
    });

    var _page = {
        getDetail:  function() {

            Http.ajax({
                url: "user/queryTeahouseDetail.do",
                async: false,
                data: {

                    id: 1 //模拟而已
                },
                success: function(res){
                    if(res.code == 200){ 
                        console.log(res)
                        var data1 = res.data.teahouse;
                        console.log(data1)
                        main.theme = data1.theme; //讲座名字

                        main.speakerLinkList = data1.speakerLinkList;

                        main.content = data1.content; //讲座简介
                        main.dateStr = data1.dateStr; //日期
                        main.startTimeStr = data1.startTimeStr; //开始时间
                        main.endTimeStr = data1.endTimeStr; //结束时间
                        main.address = data1.address; //地点
                        main.groupOfPep = data1.groupOfPep; //面向对象
                        main.limitNumOfPep = data1.limitNumOfPep; //限制人数
                        main.signUpNum = data1.signUpNum; //签到人数                        
                        main.category = data1.category; //讲座类别

                        main.isSignUp = data1.isSignUp; //是否预报名
                    }
                }
            })
        }
    }
        
    _page.getDetail();
    
    module.exports = {};
})