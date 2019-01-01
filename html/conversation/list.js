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

            Http.ajax({
                url: 'user/findTeahouseListPage.do',
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
                api.openWin({
                    url: 'detail_frame.html',
                    pageParam: {
                        id: id
                    }
                })
            },
            searchTap: function() {
                _g.openWin({
                    name: 'lecture-search',
                    url: 'search_frame.html',
                    bounces: false,
                    slidBackEnabled: false,
                    animation: { type: 'none' }
                });
            }
        }
    });

    module.exports = {};
})