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
            presenter: '汤耀平',
            presenterInfo: '任广东工业大学党委副书记、纪委书记，教授，硕士生导师',
            groupOfPep: '',
            isProved: 0,
            limitNumOfPep: 0, //限制人数
            sponsor: '', //所属学院
            organization: '', //发布组织
            category: '', //讲座所属类别
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
                        var data1 = res.data.lecture;
                        console.log(data1)
                        that.name = data1.name;
                        that.sponsor = data1.sponsor;
                        that.organization = data1.organization;

                        that.content = data1.content;
                        that.dateStr = data1.dateStr;
                        that.startTimeStr = data1.startTimeStr;
                        that.endTimeStr = data1.endTimeStr;
                        that.address = data1.address;
                        that.groupOfPep = data1.groupOfPep;
                        that.limitNumOfPep = data1.limitNumOfPep;
                        that.isProved = data1.isProved;
                        that.hour = data1.hour;
                        that.thumbsUpNum = data1.thumbsUpNum;
                        that.signUpNum = data1.signUpNum;
                        that.category = data1.category.name;

                        //有待完成
                        
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
                }
            },
            applyTap: function() {
                main.hasApply = !main.hasApply;
                if(main.hasApply) {
                    main.applyNum ++;
                } else {
                    main.applyNum --;
                } 
            },
            queryldetail: function(id){
                var url = 'http://127.0.0.1/user/queryLectureDetail.do';

                _g.ajax({
                    lock: true,
                    url: url,
                    isAsync: false,
                    data: {
                        id: id
                    },
                    success: function(res){
                        if(res.code === 200){
                            this.name = res.data.lecture.name;
                            this.poster = res.data.lecture.imageUrl;
                            this.description = res.data.lecture.content;

                            var time = res.data.lecture.dateStr + res.data.lecture.startTimeStr + '-' + res.data.lecture.endTimeStr;
                            this.time = time;

                            this.position = res.data.lecture.address;

                            //主讲人需要判断是否多个暂时略

                            this.object = res.data.lecture.groupOfPep;
                            this.isProved = res.data.lecture.isProved == 0 ? true:false;
                            this.limitNumOfPep = res.data.lecture.limitNumOfPep;
                            this.sponsor = res.data.lecture.sponsor;
                            this.organization = res.data.lecture.organization;
                            this.category = res.data.lecture.category.name;
                            this.applyNum = res.data.lecture.signUpNum;
                            this.likeNum = res.data.lecture.thumbsUpNum;

                            this.hasApply = res.data.lecture.isSignUp;
                            this.hasLike = res.data.lecture.isThumbsUp;
                        }
                    }
                })
                var apply = confirm("您确定要预报名吗");
                if(apply == true) {
                    main.hasApply = 1;
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