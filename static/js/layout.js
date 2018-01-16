layui.define(['layer', 'element'], function(exports) {
    var element = layui.element,
        layer = layui.layer,
        $ = layui.$;

    //监听侧栏缩进
    $('.lying-nav-fold').click(function () {
        $('.layui-side').toggleClass('lying-side-mini');
    });

    //监听菜单展开
    $('.lying-nav-header').click(function () {
        $(this).parent().toggleClass('lying-nav-open').siblings('.lying-nav-item').removeClass('lying-nav-open');
    });

    //MINI菜单下显示tips
    $(document).on('mouseenter', '.layui-side.lying-side-mini .lying-nav-item a', function () {
        layer.tips($(this).find('.lying-nav-title').text(), this, {time: 1000, tips: [2, '#53616F']});
    });

    exports('layout', {});
});