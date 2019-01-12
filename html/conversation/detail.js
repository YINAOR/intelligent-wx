define(function(require, exports, module) {
    var Http = require('U/http');
    var id = api.pageParam.id;
    console.log(id)

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('conversation/detail_view'),
        data: {
            theme: '',
            poster: '',
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

                    Dialog.init('<input type="text" placeholder="请输入报名说明，以便管理员筛选" id="values" style="display:block;width:230px;height:36px;line-height:36px;margin:0 auto; border: 1px solid #e6e6e6; color: #333;">',{
                        maskClick : true, //点击背景层是否关闭弹层
                        mask : true, //是否显示遮罩
                        title : '茶座预报名', //添加标题
                        index : 1,  //设置索引，用于close方法
                        button : { //按钮
                            确定 : function(){
                                var reason = $('#values').val();
                                if(reason == ""){
                                    Dialog.init("请输入报名说明！",1000);
                                    Dialog.close(this);
                                }else{
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
                                            if(res.code == 200){
                                                main.isSignUp = !main.isSignUp;
                                                main.SignUpNum++;
                                                Dialog.init(res.msg,1000);
                                            }else{
                                                Dialog.init(res.msg,1000);
                                            }
                                        },
                                        error: function(res){
                                            Dialog.init(res.msg,1000);
                                        }
                                    })
                                    Dialog.close(this);
                                }
                            },
                            取消 : function(){
                                
                                Dialog.close(this);
                            }
                        }
                    })

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
                        main.poster = data1.imageUrl; //茶座海报

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