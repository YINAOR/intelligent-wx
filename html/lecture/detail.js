define(function (require, exports, module) {
    var Http = require('U/http');

    

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('lecture/detail_view'),
        data: {
            name: '',
            poster: '../../image/lecture/desert.jpg',
            content: '',
            dateStr: '',
            startTimeStr: '',
            endTimeStr:'',
            address: '',
            hour:0,
            speakerLinkList:[],
            groupOfPep: '',
            isProved: 0,
            limitNumOfPep: 0, //限制人数
            sponsor: '', //所属学院
            organization: '', //发布组织
            category: {}, //讲座所属类别
            hasApply: 0,
            signUpNum: 0, //预报名人数
            hasLike: 0,
            thumbsUpNum: 0 ,//点赞人数
            comment: 0,
            commentList: [{
                avatar: '../../image/lecture/avater.jpg',
                name: '花生壳的回款的恐惧阿卡卡',
                time: '2018-06-10 15:19:02',
                comment: '讲得超棒，很喜欢这个老师！的哈慷慨激昂卡卡打卡机安检'
            },{
                avatar: '../../image/lecture/avater.jpg',
                name: '花生壳',
                time: '2018-06-10 15:19:02',
                comment: '讲得超棒，很喜欢这个老师！'
            },{
                avatar: '../../image/lecture/avater.jpg',
                name: '花生壳',
                time: '2018-06-10 15:19:02',
                comment: '讲得超棒，很喜欢这个老师！'
            }]
        },
        ready: function() {
            let that = this;

            sessionStorage.setItem("token", "100000-0d69b9960fbe43608f96d23d9c9b9c52");

            Http.ajax({
                url: "/user/queryLectureDetail.do",
                isAsync: false,
                data: {
                    id:1 //模拟而已
                },
                success: function(res){
                    if(res.code == 200){ 
                        console.log(res)
                        var data1 = res.data.lecture;
                        console.log(data1)
                        that.name = data1.name; //讲座名字
                        that.sponsor = data1.sponsor; //主办方
                        that.organization = data1.organization; //发起组织

                        that.speakerLinkList = data1.speakerLinkList;

                        that.content = data1.content; //讲座简介
                        that.dateStr = data1.dateStr; //日期
                        that.startTimeStr = data1.startTimeStr; //开始时间
                        that.endTimeStr = data1.endTimeStr; //结束时间
                        that.address = data1.address; //地点
                        that.groupOfPep = data1.groupOfPep; //面向对象
                        that.limitNumOfPep = data1.limitNumOfPep; //限制人数
                        that.isProved = data1.isProved; //讲座证明
                        that.hour = data1.hour; //持续时间
                        that.thumbsUpNum = data1.thumbsUpNum; //点赞人数
                        that.signUpNum = data1.signUpNum; //签到人数
                        
                        that.category = data1.category; //讲座类别 有待完善
                        
                        Http.ajax({
                            url: "/user/findCommentByLectureId.do",
                            isAsync: false,
                            data: {
                                paging:{
                                    currentPage:1,
                                    showCount:5
                                } //模拟而已
                            },
                            success: function(res){
                                console.log(res)
                                console.log(123)
                            },
                            error: function(res){
                                console.log(fail)
                                console.log(456)
                            }
                        })
                         
                        console.log(123)
                    }
                }
            })
            


        },
        methods: {
            likeTap: function() {
                main.hasLike = !main.hasLike;
                if(main.hasLike) {
                    main.likeNum --;
                } else {
                    main.likeNum ++;
                    Http.ajax({
                        url: "/student/lectureThumbsup.do",
                        isAsync: false,
                        data: {
                            deviceCode:1,
                            lecture:{
                                id: 1,
                            } //模拟而已
                        },
                        success: function(res){
                            console.log(res)
                        }
                    })
                }
                
            },
            applyTap: function() {2
                main.hasApply = !main.hasApply;
                if(main.hasApply) {
                    main.applyNum ++;
                } else {
                    main.applyNum --;
                } 
            },
            changeCommentTap: function() {
                main.comment = 1;
            },
            reportTap: function() {
                main.comment = 0;
            }
        }
    });
    
    module.exports = {};
})