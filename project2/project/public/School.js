$("#Sch").on('click',function(){    $.ajax({
    url:'https://raw.githubusercontent.com/rishabh-verma-au3/MyJavaStuffs/master/meme.json',
    type:'GET',
     success:function(data){
  // console.log(data);
       window.location.hash = 'School';
       data=JSON.parse(data);
         $("#crd").empty();
        // $('#crd').append("<div class='card-deck' id='deck' style='width:100%;'></div>")
        for(var i=0;i<data.length;i++)
      {  // data=JSON.stringify(data);
          if(data[i].category=="school")
          {  // data=JSON.stringify(data);
                    
            //  { $("#deck").append("<div style='display:block;'></div>")}
          //  $('#dec').append('<div class="col-4" style="width:100%;"></div>')
          $("#crd").append("<div class='col-4' style='width:100%;margin-bottom:1%;'><div class='card' style='width: 100%;'><div style='text-align:center;background-color:yellow;'> "+data[i].category+"</div> <img src="+data[i].url+" class='card-img-top' alt='...' width='"+data[i].width+"px' height='"+data[i].height+"px'><div class='card-body' style='height:100%;width:100%;'><h5 class='card-title'>"+data[i].name+"</h5><p class='card-text' style='width:100%;'><button  class='btn btn-primary'>Upvote</button>...<a href='#' class='btn btn-primary'>Comment</a></p></div><div class='card-footer'><small class='text-muted'>SignUp/Login to comment and Upvote</small></div></div></div>")
          

      }
          

      }

                      }
})});



