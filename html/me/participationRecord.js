define(function(require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/participationRecord_view'),
        data: {
            showIndex: 0,
            lectureList: [{
                avater: '../../image/lecture/avater.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二手机看卡安洁科技爱空间楼学术报告厅',
                type: '人生类'
            }, {
                avater: '../../image/lecture/avater.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }],
            conversationList: [{
                avater: '../../image/lecture/avater1.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }, {
                avater: '../../image/lecture/avater1.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }],
        },
        ready: function() {
            sessionStorage.setItem("deviceCode","1");
            var paging = {currentPage:1,showCount:5}
            
            Http.ajax({
                url: "/student/queryStudentLectureParticipateList.do",
                    async: false,
                    data: {
                        paging: paging
                    },
                    success: function(res){
                        console.log(res)
                        main.lectureList = res.data.paging.list;
                    },
                    error: function(res){
                        console.log(res)
                    }
            })
        },
        methods: {
            searchTap: function() {
                _g.openWin({
                    name: 'lecture-search',
                    url: '../lecture/search_frame.html ',
                    bounces: false,
                    slidBackEnabled: false,
                    animation: { type: 'none' }
                });
            },
            changeTap: function(num) {
                console.log(num);
                if (num === 0) {
                    main.showIndex = 0;
                } else {
                    main.showIndex = 1;
                }
            }
        }
    });

    module.exports = {};
})