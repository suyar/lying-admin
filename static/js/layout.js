layui.define(['layer', 'element'], function(exports) {
    var element = layui.element,
        layer = layui.layer,
        $ = layui.$;

    $('.lying-nav-fold').click(function () {
        $('.layui-side').toggleClass('lying-side-mini');
    });

    exports('layout', {});
});