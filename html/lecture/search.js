define(function(require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('lecture/search_view'),
        data: {
            showInfo: 0,
            currentPage: 1,
            showCount: 5,
            searchList: [],
        },
        ready: function() {},
        methods: {
            searchTap: function() {
                var searchKey = $('#searchKey').val();
                Http.ajax({
                    url: '/user/findLectureListPage.do',
                    isAsync: false,
                    data: {
                        paging: {
                            currentPage: main.currentPage,
                            showCount: main.showCount,
                            t: {
                                content: searchKey
                            }
                        }
                    },
                    success: function(res) {
                        if (res.code == 200) {
                            console.log(res)
                            if(res.data.paging.currentPage > 1) {
                                if (res.data.paging.list.length > 0) {
                                    main.searchList = main.searchList.concat(res.data.paging.list);
                                } else {
                                    window.isNoMore = true;
                                }
                            } else {
                                if (res.data.paging.list.length > 0) {
                                    main.showInfo = 1;
                                    main.searchList = res.data.paging.list;
                                } else {
                                    main.showInfo = 0;
                                }
                            }
                        } else {

                        }
                    }
                })
                
            },
            openLectureDetail: function(id){
                api.openWin({
                    url: 'detail_frame.html',
                    pageParam: {
                        id: id
                    }
                });
            }
        }
    });

    _g.setLoadmore({
        threshold: 100
    }, function () {
        if (!window.isNoMore) {
            main.currentPage++;
            main.searchTap();
        }
    });

    module.exports = {};
})