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