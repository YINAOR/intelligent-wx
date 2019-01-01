define(function(require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/beforeApply_view'),
        data: {
            showIndex: 0,
            lectureList: []
        },
        ready: function() {
            sessionStorage.setItem("deviceCode","1");
            var paging = {currentPage:1,showCount:5}
            
            Http.ajax({
                url: "/student/queryStudentLectureSignList.do",
                    async: false,
                    data: {
                        paging: paging
                    },
                    success: function(res){
                        if(res.data.paging) {
                            console.log(res)
                            main.lectureList = res.data.paging.list;
                        }
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