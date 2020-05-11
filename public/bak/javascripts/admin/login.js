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
          var form = document.createElement('form');
	        var objs = document.createElement('input');
	        objs.setAttribute('type', 'hidden');
	        objs.setAttribute('name', 'adminId');      // 받을 네이밍
	        objs.setAttribute('value', adminId);       // 넘길 파라메터
	        form.appendChild(objs);
	        form.setAttribute('method', 'POST');
	        form.setAttribute('action', "/admin/main");      // URL
	        document.body.appendChild(form);
	        form.submit();
        },
        error:function ( xhr, status, error) {
          console.log(error);
        }
      });
    });
});
