define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('main/faq_view'),
        data: {
            paging: {
                currentPage: 1,
                showCount: 5
            },
            list:[],//返回列表

        },
        ready: function() {       
        },
        methods: {     
        }
    });

    var _page = {
        getList: function() {
            Http.ajax({
                url: '/user/findFAQListPage.do',
                isAsync: false,
                data: {
                    paging: main.paging,                 
                },
                success: function(res){
                    if(res.code == 200){
                        if(res.data.paging.list){
                            console.log(res.data.paging.list)
                            main.List = main.List.concat(res.data.paging.list);
                            console.log(main.List)
                        } else {
                            window.isNoMore = true;
                        }

                    }else {
                        layer.open({
                        content: res.msg,
                        skin: 'msg',
                        time: 1
                        })
                    }
                },
                error: function(res){
                    layer.open({
                        content: res.msg,
                        skin: 'msg',
                        time: 1
                    })    
                }
            }) 
        }
    }

    _page.getList();

    _g.setLoadmore({
        threshold: 0
    }, function () {
        if (!window.isNoMore) {
            main.paging.currentPage++;
            _page.getList();
        }
    });
    
    module.exports = {};
})