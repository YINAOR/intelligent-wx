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
            student:{}
        },
        ready: function() {
        	console.log(typeof sessionStorage.student)
            var student = JSON.parse(sessionStorage.student);
            console.log(student)
            if(student.avatar) {
                this.userAvter = student.avatar;
            }
            this.name = student.name;
            this.studentId = student.num;
            this.college = student.college.name;
            this.major = student.major.name;

        },
        methods: {


        }
    });
    
    module.exports = {};
})