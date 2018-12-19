define(function(require, exports, module) {
    var Http = require('U/http');


    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('lecture/list_future_view'),
        data: {
            showIndex: 0,
            allList: [{
                avater: '../../image/lecture/avater1.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }, {
                avater: '../../image/lecture/avater1.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }, {
                avater: '../../image/lecture/avater1.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }, {
                avater: '../../image/lecture/avater1.jpg',
                name: '汤耀平',
                title: '漫步人生路',
                time: '2018-06-05  19:00-21:00',
                position: '龙洞校区行政楼二楼学术报告厅',
                type: '人生类'
            }],
        },
        ready: function() {
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
                        /*this.allList.push(res.data.paging.list);
                        console.log(res.data.paging.list)
                        _g.render('lecture/list_future_view',data,'#table');*/
                        
                    }else {
                        var result = { list: [] };
                        _g.render('lecture/list-V', result, '#table');
                    }
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
            changeTap: function(num) {
                console.log(num);
                if (num === 0) {
                    main.showIndex = 0;
                } else {
                    main.showIndex = 1;
                }
            },
            queryldetail: function(id){
                //获取id，
                
                
                //跳转页面,携带id
            },
            
        }
    });

    module.exports = {};
})