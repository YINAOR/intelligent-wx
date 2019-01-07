define(function(require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/beforeApply_view'),
        data: {
            showInfo: 0,
            showIndex: 0,
            lectureList: []
        },
        ready: function() {
            var _this = this;
            var paging = {currentPage:1,showCount:5};
            
            Http.ajax({
                url: "/student/queryStudentLectureSignList.do",
                    async: false,
                    data: {
                        paging: paging
                    },
                    success: function(res){
                        if(res.code == 200){
                            if(res.data.paging.list) {
                                console.log(res)
                                _this.lectureList = res.data.paging.list;
                                layer.open({
                                    content: "123",
                                    skin: 'msg',
                                    time: 1,
                                    anim:false
                                })
                            }else{
                                layer.open({
                                    content: "456",
                                    skin: 'msg',
                                    time: 1,
                                    anim:false
                                })
                                _this.showInfo = 3;
                            }
                        }
                    },
                    error: function(res){
                        layer.open({
                            content: res.msg,
                            skin: 'msg',
                            time: 1,
                            anim:false
                        })
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