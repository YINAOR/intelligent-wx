define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('me/question_view'),
        data: {
            typeList: [{
                name: '学校生活',
                select: 1
            },{
                name: '学习',
                select: 0
            },{
                name: '其他',
                select: 0
            }]        
        },
        ready: function() {
        },
        methods: {
            handUp: function(){
                var questionContent = $('#questionContent').val();
                var questionCategory = $('#questionCategory').val();

                Http.ajax({
                    url: "/student/saveQuestion.do",
                    async: false,
                    data: {
                        AnswersAndQuestions:{
                            question: questionContent,
                            category: {
                                id: questionCategory
                            }
                        }
                    },
                    success:function(res){
                        console.log(res)
                        //提示提交成功
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