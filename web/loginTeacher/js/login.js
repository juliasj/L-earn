Login =  { fn: {}

        };

window.onload=function(){



Login.fn.LogUser = function (email, pass) {
    var url = "http://localhost:8888/loginTeacher/loginReceived.php";
    var data = {
        email: $('#email').val(),
        pass: $('#password').val()
    };

    $.ajax({
        url: url,
        data: data,
        method: "POST",

        beforeSend: function () {
        },

        success: function (result) {
            console.log(result);
            
            resultArray = JSON.parse(result);
            if(resultArray['status'] == 'OK'){
              window.location.href = resultArray['url'];
            } else {
                $('.msgError').html(resultArray['msg']);
            }
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status);
            alert(textStatus);
            alert(errorThrown);
        }

    });
}


$("#btn_login").click(function(){
  email = $("#email").val();
  password = $("#password").val();
  console.log(email, password );
  Login.fn.LogUser(email, password);
});

};