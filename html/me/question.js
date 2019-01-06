define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/question_view'),
        data: {
            typeList: []        
        },
        ready: function() {
            Http.ajax({
                url: "../user/queryCategory.do",
                async:false,
                data: {
                    type: "AQ"
                },
                success:function(res){
                    var typeList = res.data.categoryList;
                    var options = "";

                    for(var i=1; i<=typeList.length; i++){
                        options = options + "<option value="+i+">"+typeList[i-1].name+"</option>"
                    }
                    $("#questionCategory").append(options)
                },
                error:function(res){
                    layer.open({
                        content: '无法获取分类！',
                        skin: 'msg',
                        time: 1
                    })
                }
            })
        },
        methods: {
            handUp: function(){
                var questionContent = $('#questionContent').val();
                var questionCategory = $('#questionCategory').val();

                Http.ajax({
                    url: "/student/saveQuestion.do",
                    async: false,
                    data: {
                        answersAndQuestions:{
                            question: questionContent,
                            category: {
                                id: questionCategory
                            }
                        }
                    },
                    success:function(res){
                        console.log(res)
                        if(res.code == 200){
                            layer.open({
                                content: '问题已反馈！',
                                skin: 'msg',
                                time: 1
                            })
                        }else{
                            layer.open({
                                content: '问题反馈失败！',
                                skin: 'msg',
                                time: 1
                            })
                        }
                    },
                    error:function(res){
                        console.log(res)
                    }
                })
            }
        }
    });
    
    module.exports = {};
})