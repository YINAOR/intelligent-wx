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

                    for(var i=0; i<typeList.length; i++){
                        options = options + "<option value=" + typeList[i].id + ">" + typeList[i].name + "</option>"
                    }
                    $("#questionCategory").append(options)
                },
                error:function(res){
                    Dialog.init(res.msg,1000)
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
                            Dialog.init(res.msg,1000)
                            api.openWin({
                                url: "../main/index_frame.html"
                            })
                        }else{
                            Dialog.init(res.msg,1000)
                        }
                    },
                    error:function(res){
                        Dialog.init(res.msg,1000)
                    }
                })
            }
        }
    });
    
    module.exports = {};
})