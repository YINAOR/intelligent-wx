define(function (require, exports, module) {
    var Http = require('U/http');
    var id= api.pageParam.id;

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
            isSignUp: 0, //本学生是否预报名
            signUpNum: 0, //预报名人数
            isThumbsUp: 0, //本学生是否点赞
            thumbsUpNum: 0 ,//点赞人数
            comment: 0, //是否展示留言框
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
            }],
            totalResult:0, //评论总记录数
        },
        ready: function() {
            
        },
        methods: {
            thumbsTap: function() {
                
                if(!main.isThumbsUp) {
                    main.isThumbsUp = !main.isThumbsUp;
                    main.thumbsUpNum ++;
                    Http.ajax({
                        url: "/student/lectureThumbsup.do",
                        isAsync: false,
                        data: {
                            deviceCode:1,
                            lectureId: 1, //模拟而已
                        },
                        success: function(res){
                            console.log(res) //添加提示
                        }
                    })
                }
                
            },
            signTap: function() {
                
                if(!main.isSignUp) {
                    main.isSignUp = !main.isSignUp;
                    main.SignUpNum ++;
                    Http.ajax({
                        url: "/student/lectureSignUp.do",
                        isAsync: false,
                        data: {
                            deviceCode:1,
                            lectureId: 1, //模拟而已
                        },
                        success: function(res){
                            console.log(res) //添加提示
                        }
                    })
                }
            },
            changeCommentTap: function() {
                main.comment = 1;
            },
            reportTap: function() {
                if($(".weui-textarea").val() == null){
                    console.log(fail) //要添加提示
                }else{
                    main.comment = 0;
                    var commentContent = $(".weui-textarea").val()

                    
                    Http.ajax({
                        url: "student/saveLectureComment.do",
                        async: false,
                        data: {
                            lectureComment:{
                                id:id, 
                                commentContent: commentContent,
                            }
                        },
                        success: function(res){
                            console.log(res)
                            _page.getReport();
                        }
                    })
                }
            }
        }
    });

    var _page = {
        getDetail:  function() {


            Http.ajax({
                url: "user/queryLectureDetail.do",
                async: false,
                data: {

                    id: id 
                },
                success: function(res){
                    if(res.code == 200){ 
                        console.log(res)
                        var data1 = res.data.lecture;
                        console.log(data1)
                        main.name = data1.name; //讲座名字
                        main.sponsor = data1.sponsor; //主办方
                        main.organization = data1.organization; //发起组织

                        main.speakerLinkList = data1.speakerLinkList;

                        main.content = data1.content; //讲座简介
                        main.dateStr = data1.dateStr; //日期
                        main.startTimeStr = data1.startTimeStr; //开始时间
                        main.endTimeStr = data1.endTimeStr; //结束时间
                        main.address = data1.address; //地点
                        main.groupOfPep = data1.groupOfPep; //面向对象
                        main.limitNumOfPep = data1.limitNumOfPep; //限制人数
                        main.isProved = data1.isProved; //讲座证明
                        main.hour = data1.hour; //持续时间
                        main.thumbsUpNum = data1.thumbsUpNum; //点赞人数
                        main.signUpNum = data1.signUpNum; //签到人数                        
                        main.category = data1.category; //讲座类别

                        main.isSignUp = data1.isSignUp; //是否预报名
                        main.isThumbsUp = data1.isThumbsUp; //是否点赞

                        
                    }
                }
            })
        },

        getReport: function(){
            Http.ajax({
                url: "user/findCommentByLectureId.do",
                async: false,
                data: {
                    paging:{
                        currentPage:1,
                        showCount:5
                    } //模拟而已
                },
                success: function(res){ //有错
                    console.log("report")
                    console.log(res)
                    if(res.data){
                        main.commentList = res.data.paging.list; 
                        main.totalResult = res.data.paging.totalResult;

                    }else{
                        
                        main.commentList = null;
                    }
                },
                error: function(res){
                    console.log(res)
                }
            })
        }
    }
        


    _page.getDetail();

    _page.getReport();
    
    
    module.exports = {};
})