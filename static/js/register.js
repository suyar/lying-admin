layui.define(['layer', 'form', 'tips'], function(exports) {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.$,
        tips = layui.tips;

    //刷新验证码
    var captchaImg = $('.lau-reg-captcha img'), captchaSrc = captchaImg.attr('src');
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
        if (!/^\d{10}$/.test(data.field.phone)) {
            tips.warning('请输入正确的手机号码');
            return false;
        } else if (!/^\S{4,}$/.test(data.field.code)) {
            tips.warning('手机验证码格式不正确');
            return false;
        } else if (!/^\S{6,16}$/.test(data.field.password) || !/^\S{6,16}$/.test(data.field.repassword)) {
            tips.warning('密码必须6-12位且不能出现空格');
            return false;
        } else if (data.field.password !== data.field.repassword) {
            tips.warning('两次密码输入不一致');
            return false;
        } else if (!/^\S{4,}$/.test(data.field.captcha)) {
            tips.warning('图形验证码格式不正确');
            return false;
        } else if (!data.field.license) {
            tips.warning('你必须同意用户协议才能注册');
            return false;
        }

        //登陆中
        tips.loading('注册中...', 0, -1);

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

    exports('register', {});
});
