define(function(require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/basicInfo_view'),
        data: {
            avatar: '../../image/me/img-avatar.jpeg',
            name: '',
            studentId: '',
            college: '',
            major: '',
            classNum: '',
            mobile: '',
            email: '',
        },
        ready: function() {
            var student = JSON.parse(sessionStorage.student);
            console.log(student)
            this.name = student.name;
            this.studentId = student.num;
            this.college = student.college.name;
            this.major = student.major.name;
            this.classNum = student.classNum;
            this.mobile = student.mobile;
            this.email = student.email;

            var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
                $gallery = $("#gallery"),
                $galleryImg = $("#galleryImg"),
                $uploaderInput = $("#uploaderInput"),
                $uploaderFiles = $("#uploaderFiles");

            $uploaderInput.on("change", function(e) {
                var src, url = window.URL || window.webkitURL || window.mozURL,
                    files = e.target.files;
                for (var i = 0, len = files.length; i < len; ++i) {
                    var file = files[i];

                    if (url) {
                        src = url.createObjectURL(file);
                    } else {
                        src = e.target.result;
                    }

                    $uploaderFiles.append($(tmpl.replace('#url#', src)));
                }
            });
            $uploaderFiles.on("click", "li", function() {
                $galleryImg.attr("style", this.getAttribute("style"));
                $gallery.fadeIn(100);
            });
            $gallery.on("click", function() {
                $gallery.fadeOut(100);
            });
        },
        methods: {
            save: function() {
                var studentUpdata = { num: main.studentId }; //更新信息对象
                var mobile = $("#mobile").val();
                var email = $("#email").val();
                if (mobile) {
                    studentUpdata["mobile"] = mobile; //如果不为空则添加
                }
                if (email) {
                    studentUpdata["email"] = email;
                }

                Http.ajax({
                    url: "student/updateProfile.do",
                    async: false,
                    data: {
                        student: studentUpdata
                    },
                    success: function(res) {
                        if (res.code == 200) {
                            layer.open({
                                content: '更新成功！',
                                skin: 'msg',
                                time: 1
                            })

                            setTimeout(function() {
                                _g.openWin({
                                    name: "info",
                                    url: "info_frame.html"
                                })
                            }, 2000)
                        } else {
                            layer.open({
                                content: res.msg,
                                skin: 'msg',
                                time: 1
                            })
                        }


                    },
                    error: function(res) {
                        console.log(res)
                    }
                })
            }
        },
    });

    module.exports = {};
});