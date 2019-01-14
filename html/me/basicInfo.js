define(function(require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('/html/me/basicInfo_view.html'),
        data: {
            avatar: '../../image/me/img-avatar.jpeg',
            name: '',
            num: '',
            college: '',
            major: '',
            classNum: '',
            mobile: '',
            email: '',
        },
        ready: function() {
            var student = JSON.parse(localStorage.student);
            console.log(student)
            this.name = student.name;
            this.num = student.num;
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
            save: function(){
                var studentUpdata = {num:this.num};//更新信息对象

                var mobile = $("#mobile").val();
                var email = $("#email").val();
                if(mobile != null){
                    studentUpdata["mobile"] = mobile; //如果不为空则添加
                }
                if(email != null){
                    studentUpdata["email"] = email;
                }
                console.log(studentUpdata)
                Http.ajax({
                    url: "student/updateProfile.do",
                    async: false,
                    data: {
                        student: studentUpdata
                    },
                    success: function(res){
                        if(res.code == 200){
                            Dialog.init(res.msg,1000)
    
                            setTimeout(function(){
                                _g.openWin({
                                    name:"info",
                                    url:"info_frame.html"
                                })
                            },1000)

                            Http.ajax({
                                url: "user/queryProfile.do",
                                async:false,
                                data: {},
                                success:function(res){
                                    if(res.code == 200){
                                        localStorage.removeItem("student");
                                        var student = JSON.stringify(res.data.student);
                                        localStorage.setItem("student",student);
                                    }else{
                                        Dialog.init(res.msg,1000)
                                    }
                                },
                                error:function(res){
                                    Dialog.init(res.msg,1000)
                                }
                            })
                        }else{
                            Dialog.init(res.msg,1000)
                        }
                    },
                    error: function(res) {
                        Dialog.init(res.msg,1000)
                    }
                })
            }
        },
    });

    module.exports = {};
});