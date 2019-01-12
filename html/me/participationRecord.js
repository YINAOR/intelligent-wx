define(function(require, exports, module) {
    var Http = require('U/http');
    var paging = { currentPage: 1, showCount: 5 }

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/participationRecord_view'),
        data: {
            lectureshowInfo: 0,
            conversationshowInfo: 0,
            showIndex: 0,
            lectureList: [],
            conversationList: [],
        },
        ready: function() {

            Http.ajax({
                url: "/student/queryStudentLectureParticipateList.do",
                async: false,
                data: {
                    paging: paging
                },
                success: function(res) {
                    if (res.code == 200) {
                        if (res.data.paging) {
                            console.log(res)
                            main.lectureList = res.data.paging.list;
                        } else {
                            main.lectureshowInfo = 3;
                        }
                    } else {
                        Dialog.init(res.msg,1000)
                    }


                },
                error: function(res) {
                    Dialog.init(res.msg,1000)
                }
            })


        },
        methods: {
            // searchTap: function() {
            //     _g.openWin({
            //         name: 'lecture-search',
            //         url: '../lecture/search_frame.html ',
            //         bounces: false,
            //         slidBackEnabled: false,
            //         animation: { type: 'none' }
            //     });
            // },
            changeTap: function(num) {
                console.log(num);
                if (num === 0) {
                    main.showIndex = 0;
                } else {
                    Http.ajax({
                        url: "/student/queryStudentTeahouseAppointList.do",
                        async: false,
                        data: {
                            paging: paging
                        },
                        success: function(res) {
                            if (res.code == 200) {
                                if (res.data.paging) {
                                    console.log(res)
                                    main.conversationList = res.data.paging.list;
                                } else {
                                    main.conversationshowInfo = 3;
                                }
                            } else {
                                Dialog.init(res.msg,1000)
                            }


                        },
                        error: function(res) {
                            console.log(res)
                        }
                    })
                    main.showIndex = 1;
                }
            },
            openTeaHouseDetail(id) {
                api.openWin({
                    url: "../conversation/detail_frame.html",
                    pageParam: {
                        id: id
                    }
                })
            },
            openLectureDetail(id) {
                api.openWin({
                    url: "../lecture/detail_frame.html",
                    pageParam: {
                        id: id
                    }
                })
            }
        }
    });

    module.exports = {};
})