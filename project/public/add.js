$('#btnSubmit').on('click', function(){
    var data = {
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        phone: $('#phone').val()
    }


    
    $.ajax({
        type: 'POST',
        url: '/users/user',
        data:data,
       
        dataType: 'json',
        success: function (data) {
            console.log(data);
        }
})


})