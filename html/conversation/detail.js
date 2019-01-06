define(function(require, exports, module) {
    var Http = require('U/http');
    var id = api.pageParam.id;
    console.log(id)

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('conversation/detail_view'),
        data: {
            theme: '',
            imageUrl: '../../image/lecture/desert.jpg',
            content: '',
            dateStr: '',
            startTimeStr: '',
            endTimeStr: '',
            address: '',
            speakerLinkList: [],
            groupOfPep: '',
            limitNumOfPep: 0,
            category: {},
            isSignUp: 0,
            signUpNum: 0,
        },
        ready: function() {
        },
        methods: {
            signTap: function() {
                if (!main.isSignUp) {
                    layer.open({
                        title: [
                            '请输入预约说明',
                            'background-color:#1E9FFF; color:#fff; font-size: 18px;'
                        ],
                        anim: 'up',
                        content: '<input type="text" id="values" style="display:block;width:230px;height:36px;line-height:36px;margin:0 auto;padding-left: 30px; border: 1px solid #e6e6e6; color: #333;">',
                        btn: ['确认', '取消'],
                        yes: function(index) {
                            var reason = $('#values').val();
                            main.isSignUp = !main.isSignUp;
                            main.SignUpNum++;
                            Http.ajax({
                                url: "/student/teahouseAppointment.do",
                                isAsync: false,
                                data: {
                                    Appointment: {
                                        Teahouse: {
                                            id: id
                                        },
                                        reason: reason
                                    }
                                },
                                success: function(res) {
                                    console.log(res) //添加提示
                                }
                            })
                            layer.close(index)
                        }
                    });

                }

            }
        }
    });

    var _page = {
        getDetail: function() {

            Http.ajax({
                url: "user/queryTeahouseDetail.do",
                async: false,
                data: {
                    id: id //模拟而已
                },
                success: function(res) {
                    if (res.code == 200) {
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

                        main.isSignUp = res.data.isSignUp; //是否预报名
                    }
                }
            })
        }

    }

    _page.getDetail();


    module.exports = {};
})