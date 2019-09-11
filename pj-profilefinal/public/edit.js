$(document).ready(function(){
    $('.edit').on('click',function(){
      //$(".form-control").show();
  $(this).parent().parent().parent().find('input').removeClass('d-none');
  $(this).parent().parent().find('.save').removeClass('d-none');
  $(this).parent().parent().parent().find('p').addClass('d-none');
  $(this).addClass('d-none');
  $(this).parent().find('.cancel').removeClass('d-none');
      
  });
         });
  