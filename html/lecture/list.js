define(function(require, exports, module) {
    var Http = require('U/http');


    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('lecture/list_view'),
        data: {
            showIndex: 0,
            allList: [],
            paging: {
                currentPage: 1,
                showCount: 5
            }
        },
        created() {      
        },
        ready: function() {
        },
        methods: {
            searchTap: function() {
                _g.openWin({
                    name: 'lecture-search',
                    url: 'search_frame.html',
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
            openLectureDetail(id){
                api.openWin({
                    url: 'detail_frame.html',
                    pageParam: {
                        id: id
                    }
                });
            }
        }
    });

    var _page = {
        getData: function() {
            Http.ajax({
                url: '/user/findLectureListPage.do',
                isAsync: false,
                data: {
                    paging:main.paging
                },
                success: function(res){
                    if(res.code == 200){
                        if(res.data.paging.list) {
                            console.log(res.data.paging.list)
                            main.allList = main.allList.concat(res.data.paging.list);
                            console.log(main.allList)
                        } else {
                            window.isNoMore = true;
                        }
                        
                        
                    }else {
                        
                    }
                }
            }) 
        }
    }

    _page.getData();

    _g.setLoadmore({
        threshold: 100
    }, function () {
        if (!window.isNoMore) {
            main.paging.currentPage++;
            _page.getData();
        }
    });

    module.exports = {};
})