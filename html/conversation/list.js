define(function(require, exports, module) {
    var Http = require('U/http');


    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('conversation/list_view'),
        data: {
            showIndex: 0,
            allList: [],
        },
        ready: function() {
            var that = this;
            var paging = {"currentPage": 1,"showCount": 5};
            sessionStorage.setItem("token", "100000-0d69b9960fbe43608f96d23d9c9b9c52");

            Http.ajax({
                url: '/user/findLectureListPage.do',
                isAsync: false,
                data: {
                    paging:paging
                },
                success: function(res){
                    if(res.code == 200){
                        console.log(res.data.paging.list)
                        that.allList = res.data.paging.list;
                        console.log(that.allList)
                        
                    }else {
                        console.log(res)
                    }
                }
            })

        },
        methods: {
            changeTap: function(num) {
                console.log(num);
                if (num === 0) {
                    main.showIndex = 0;
                } else {
                    main.showIndex = 1;
                }
            },
            openTeaHouseDetail(id){
                _g.openWin({
                    name: 'TeaHouseId',
                    url: 'detail_frame.html',
                    bounces: false,
                    slidBackEnabled: false,
                    pageParam: {
                        id: id
                    }
                })
            }
        }
    });

    module.exports = {};
})