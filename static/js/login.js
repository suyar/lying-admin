layui.define(['layer', 'form', 'tips'], function(exports) {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.$,
        tips = layui.tips;

    //刷新验证码
    var captchaImg = $('.lau-sign-captcha'), captchaSrc = captchaImg.attr('src');
    captchaImg.click(function () {
        $(this).attr('src', captchaSrc + '?_t=' + Math.random());
    });

    //ajax请求出错提示
    $(document).ajaxError(function (event, request, setting) {
        if (request.status === 200) {
            tips.error('Invalid response');
        } else {
            tips.error(request.status + ': ' + request.statusText);
        }
    });

    //登陆
    form.on('submit(login)', function (data) {
        if (!/^[a-zA-Z0-9_]{4,16}$/.test(data.field.username)) {
            tips.warning('用户名必须为5-16位数字/字母/下划线组成');
            return false;
        } else if (!/^\S{6,16}$/.test(data.field.password)) {
            tips.warning('密码必须6-12位且不能出现空格');
            return false;
        } else if (!/^\S{4,}$/.test(data.field.captcha)) {
            tips.warning('验证码格式不正确');
            return false;
        }

        //登陆中
        tips.loading('登陆中...', 0, -1);

        //发送登陆表单
        $.post('/json/login.json', data.field, function (json) {
            if (json.errcode == 0) {
                tips.success(json.errmsg, function () {
                    location.href = '/';
                });
            } else {
                tips.error(json.errmsg, function () {
                    captchaImg.attr('src', captchaSrc + '?_t=' + Math.random());
                });
            }
        }, 'json');

        return false;
    });

    exports('login', {});
});
