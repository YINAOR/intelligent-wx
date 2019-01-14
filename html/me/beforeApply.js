define(function(require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('/html/me/beforeApply_view.html'),
        data: {
            showInfo: 0,
            showIndex: 0,
            lectureList: []
        },
        ready: function() {
            var _this = this;
            var paging = { currentPage: 1, showCount: 5 };

            Http.ajax({
                url: "/student/queryStudentLectureSignList.do",
                async: false,
                data: {
                    paging: paging
                },
                success: function(res) {
                    if (res.code == 200) {
                        if (res.data.paging) {
                            if (res.data.paging.list) {
                                console.log(res)
                                _this.lectureList = res.data.paging.list;
                                
                            } else {
                                _this.showInfo = 3;
                            }
                        } else {
                            _this.showInfo = 3;
                        }

                    } else {
                        _this.showInfo = 3;
                        Dialog.init(res.msg,1000)
                    }
                },
                error: function(res) {
                    _this.showInfo = 3;
                    Dialog.init(res.msg,1000)
                }
            })
        },
        methods: {
            openLectureDetail(id) {
                api.openWin({
                    url: "/html/lecture/detail_frame.html",
                    pageParam: {
                        id: id
                    }
                })
            }
        }
    });

    module.exports = {};
})