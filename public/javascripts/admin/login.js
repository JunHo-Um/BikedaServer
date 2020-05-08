$(document).ready( function () {
    var btnLogin = $('#btn_login');
    btnLogin.click(function () {
      var adminId = $('#adminId').val();
      var adminPassword = $('#adminPassword').val();

      var data = {
        brcofcBsnsRgnmb : $('#adminId').val(),
        brcofcPassword : $('#adminPassword').val()
      };
      jQuery.ajax({
        type: "POST",
        url: "http://127.0.0.1:8080/api/auth/branch",
        dataType: "JSON",
        data: data,
        success:function ( data ) {
          alert(data);
        },
        complete:function ( data ) {
          alert(data);
        },
        error:function ( xhr, status, error) {
          alert(status);
        }
      });
    });
});
