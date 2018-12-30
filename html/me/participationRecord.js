define(function(require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/participationRecord_view'),
        data: {
            showIndex: 0,
            lectureList: [],
            conversationList: [],
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

            Http.ajax({
                url: "/student/queryStudentTeahouseAppointList.do",
                    async: false,
                    data: {
                        paging: paging
                    },
                    success: function(res){
                        console.log(res)
                        main.conversationList = res.data.paging.list;
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
            },
            openTeaHouseDetail(id){
                api.openWin({
                    url:"../conversation/detail_frame.html",
                    pageParam:{
                        id: id
                    }
                })
            },
            openLectureDetail(id){
                api.openWin({
                    url:"../lecture/detail_frame.html",
                    pageParam:{
                        id: id
                    }
                })
            }
        }
    });

    module.exports = {};
})