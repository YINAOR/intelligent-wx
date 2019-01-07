define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/info_view'),
        data: {
            userAvter: '',
            name: '',
            studentId: '',
            college: '',
            major: '',
            lectureNum: 10,
            messageNum: 3,
            student:{}
        },
        ready: function() {
        	console.log(typeof localStorage.student)
            var student = JSON.parse(localStorage.student);
            console.log(student)
            if(student.wetchatImage) {
                this.userAvter = student.wetchatImage;
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