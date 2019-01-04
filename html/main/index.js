define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('main/index_view'),
        data: {
            userAvter: '',
            userName: '',
            registration: 0,
            lectureRecord: 0,
            conversationRecord: 0,
            indexList: [{
                icon: '../../image/main/lecture1.png',
                title: '讲座',
                url: '../../html/lecture/list_frame.html'
            },{
                icon: '../../image/main/conversation1.png',
                title: '茶座',
                url: '../../html/conversation/list_frame.html'
            }],
        },
        ready: function() {
            var student = JSON.parse(sessionStorage.student);
            
            this.userAvter = student.avatar;
            
            this.userName = student.name;
        },
        methods: {
            openWinTap: function(index) {
                console.log(index)
            }          
        }
    });
    
    module.exports = {};
})