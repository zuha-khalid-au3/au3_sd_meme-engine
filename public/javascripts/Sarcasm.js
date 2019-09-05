
  $("#Sar").on('click',function(){    $.ajax({
    url:'https://raw.githubusercontent.com/rishabh-verma-au3/MyJavaStuffs/master/meme.json',
    type:'GET',
     success:function(data){
  // console.log(data);
       data=JSON.parse(data);
         $("#crd").empty();
        for(var i=0;i<data.length;i++)
      {  // data=JSON.stringify(data);
          if(data[i].category=="Sarcasm")
          {$("#crd").append("<div class='card' style='width: 100%;'><img src="+data[i].url+" class='card-img-top' alt='...'><div class='card-body'><p class='card-text'>"+data[i].name+"</p></div></div>")}
          

      }

                      }
})});



