$(function() {
    console.log( "ready!" );
    var imageInfos = [];
    $.ajax({url:"/File/GetLevel",success:function(result){
        result.forEach((element) => {
            $('#myTable > tbody:last-child').append('<tr><th scope="row">' + element.group + '</th><td>' + element.score + '</td></tr>');
        });
    }});
    
});