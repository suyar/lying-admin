layui.define(['layer', 'form'], function(exports) {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.$;

    //刷新验证码
    var img = $('.lying-login-captcha'), imgSrc = img.attr('src');
    img.click(function () {
        $(this).attr('src', imgSrc + '?_t=' + Math.random());
    });

    //监听输入去除空白字符
    $('input[name="username"],input[name="password"],input[name="captcha"]').on('input', function () {
        if (this.name === 'username' || this.name === 'password') {
            this.value = this.value.replace(/\s+/g, '');
        } else {
            this.value = this.value.replace(/[^a-zA-Z0-9]+/g, '');
        }
    });

    //ajax请求出错
    $(document).ajaxError(function (event, request, setting) {
        var msg;
        if (request.status === 200) {
            msg = 'Invalid response';
        } else {
            msg = request.status + ': ' + request.statusText;
        }
        layer.msg(msg, {time: 1000, shade: 0.3, icon: 2});
    });

    //登陆
    form.on('submit(login)', function (data) {
        for (var i in data.field) {
            if (i === 'username') {
                if (!/^[\S]{2,}$/.test(data.field[i])) {
                    layer.msg('请输入正确的账号', {icon: 0, shade: 0.3, time: 1000});
                    return false;
                }
            } else if (i === 'password') {
                if (!/^\S{6,}$/.test(data.field[i])) {
                    layer.msg('请输入正确的密码', {icon: 0, shade: 0.3, time: 1000});
                    return false;
                }
                data.field[i] = CryptoJS.HmacSHA256(data.field[i], data.field.username).toString();
                data.field[i] = CryptoJS.HmacSHA256(data.field[i], data.field._csrf).toString();
            } else if (i === 'captcha') {
                if (!/^[a-zA-z0-9]{4,}$/.test(data.field[i])) {
                    layer.msg('请输入正确的验证码', {icon: 0, shade: 0.3, time: 1000});
                    return false;
                }
            }
        }

        //loding
        layer.msg('登陆中...', {icon: 16, shade: 0.3,time: 0});

        //发送登陆表单
        $.post(location.href, data.field, function (json) {
            if (json.errcode == 0) {
                layer.msg(json.errmsg, {shade: 0.5, icon: 1, time: 1000}, function () {
                    location.href = '/';
                });
            } else {
                layer.msg(json.errmsg, {time: 1000, shade: 0.5, icon: 2}, function () {
                    $('input[name="captcha"]').val('');
                    img.attr('src', imgSrc + '?_t=' + Math.random());
                });
            }
        }, 'json');

        return false;
    });

    exports('login', {});
});
