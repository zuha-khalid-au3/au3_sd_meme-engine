var flag=0
$("#upvote").on('click',function(){
    $(this).toggleClass('clicked');
  if(flag==0){  
$.ajax({
    url:"/post",
    type:"PUT",
    
    data:{
        id:"5d6fa92d971afb76d838d003",
        upvote: 1,
        downvote: 0
    },
    success:function(data){
        alert("upvote");
          flag=1;
    }

})
}
else if(flag==1) {
    $.ajax({
        url:"/post",
        type:"PUT",
        data:{
            id:"5d6fa92d971afb76d838d003",
            upvote: 0,
            downvote: 1
        },
        success:function(data){
            alert("downvote");
            flag=0;
           
        }
    
    })

}


})

