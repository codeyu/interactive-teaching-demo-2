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
        result.forEach((element, index) => {
            var id = ""
            if (index < 3){
                id = "#img1" + (index + 1);
            }
            else if(index >=3 && index < 6){
                id = "#img2" + (index - 2);
            }
            else if(index >=6 && index < 9){
                id = "#img3" + (index-5);
            }
            else{
                id = "#img4" + (index-8);
            }
            if (index < 12){
                $(id).attr("src", "uploads/" + element.name);
            }
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
                    "imageName": element.name
                }
                imageScores.push(imageScore)
            }
        });
        console.log(imageScores);
        $.ajax({
            type:"POST",
            url:"/File/SaveScore",
            data:JSON.stringify(imageScores),
            contentType: 'application/json; charset=utf-8',
            datatype: "json",
            success:function(data){
                console.log(data);                
            },
            error: function(xhr , err){
                console.log(err);
            }         
         });
    });
});