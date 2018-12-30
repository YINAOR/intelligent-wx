define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/info_view'),
        data: {
            userAvter: '../../image/main/user-unlogin.png',
            name: '',
            studentId: '',
            college: '',
            major: '',
            lectureNum: 10,
            messageNum: 3,
        },
        ready: function() {
            var student = JSON.parse(sessionStorage.student);
            main.name = student.name;
            main.studentId = student.num;
            main.college = student.college.name;
            main.major = student.major.name;
        },
        methods: {


        }
    });
    
    module.exports = {};
})