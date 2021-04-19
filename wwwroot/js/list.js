myStorage = window.localStorage;
const myuuid = localStorage.getItem('uuid');
if(!myuuid){
    var uuid = uuidv4();
    myStorage.setItem('uuid', uuid);
}
$(function() {
    console.log( "ready!" );
    var imageInfos = [];
    $.ajax({url:"/File",success:function(result){
        imageInfos = result;
        const g1 = result.filter(img => img.group == "第一组").sort(function(a, b) {
            return  a.imageIndex - b.imageIndex;
        });
        const g2 = result.filter(img => img.group == "第二组").sort(function(a, b) {
            return  a.imageIndex - b.imageIndex;
        });
        const g3 = result.filter(img => img.group == "第三组").sort(function(a, b) {
            return  a.imageIndex - b.imageIndex;
        });
        const g4 = result.filter(img => img.group == "第四组").sort(function(a, b) {
            return a.imageIndex - b.imageIndex;
        });
        console.log(g1)
        console.log(g2)
        console.log(g3)
        console.log(g4)
        g1.forEach((element) => {
            var id = "#img1" + element.imageIndex
            $(id).attr("src", "uploads/" + element.name);
        });
        g2.forEach((element) => {
            var id = "#img2" + element.imageIndex
            $(id).attr("src", "uploads/" + element.name);
        });
        g3.forEach((element) => {
            var id = "#img3" + element.imageIndex
            $(id).attr("src", "uploads/" + element.name);
        });
        g4.forEach((element) => {
            var id = "#img4" + element.imageIndex
            $(id).attr("src", "uploads/" + element.name);
        });
    }});
    $("#btnSubmit").click(function(){
        imageScores = [];
        imageInfos.forEach((element, index) => {
            var id = ""
            if (index < 3){
                id = "#txt1" + (index + 1);
            }
            else if(index >=3 && index < 6){
                id = "#txt2" + (index - 2);
            }
            else if(index >=6 && index < 9){
                id = "#txt3" + (index-5);
            }
            else{
                id = "#txt4" + (index-8);
            }
            if (index < 12){
                var score = $(id).val();
                var imageScore = {
                    "uuid": myuuid,
                    "score": score,
                    "imageName": element.name,
                    "groupName": element.group
                }
                imageScores.push(imageScore)
            }
        });
        
        const isScore= myStorage.getItem("score");
        if (!isScore) {
            bootbox.confirm({
                message: "请确定是否给所有图片打分，你确定要提交吗？",
                buttons: {
                    confirm: {
                        label: '确定提交'
                    },
                    cancel: {
                        label: '取消'
                    }
                },
                callback: function (result) {
                    if(result){
                        console.log(imageScores);
                        $.ajax({
                            type:"POST",
                            url:"/File/SaveScore",
                            data:JSON.stringify(imageScores),
                            contentType: 'application/json; charset=utf-8',
                            datatype: "json",
                            success:function(data){
                                myStorage.setItem("score", "true");
                                console.log(data);                
                            },
                            error: function(xhr , err){
                                console.log(err);
                            }         
                        });
                    }
                }
            });
            
        }else{
            bootbox.alert("你已提交过分数！");
        }
    });
});