layui.define(['layer', 'element'], function(exports) {
    var element = layui.element,
        layer = layui.layer,
        $ = layui.$;

    //判断左侧菜单是否要展开
    var sideStatus = layui.data('sideStatus'), sideObj = $('.layui-layout-admin .layui-side');
    sideStatus && setTimeout(function () {
        var isMini = sideObj.hasClass('lau-mini');
        if (sideStatus.open && isMini) {
            sideObj.removeClass('lau-mini');// && obj.delayResize();
        } else if (!sideStatus.open && !isMini) {
            sideObj.addClass('lau-mini');// && obj.delayResize();
        }
    }, 1000);

    //监听侧栏缩进
    $(document).on('click', '.lau-side-fold', function () {
        sideObj.toggleClass('lau-mini');
        layui.data('sideStatus', {key: 'open', value: !sideObj.hasClass('lau-mini')});
        //obj.delayResize();
    });

    //监听菜单展开
    $(document).on('click', '.lau-nav-header', function () {
        var _this = $(this);
        _this.next().length ? _this.parent().toggleClass('lau-open').siblings().removeClass('lau-open') : _this.parent().siblings().removeClass('lau-open');
    });

    //MINI菜单下显示tips
    $(document).on('mouseenter', '.layui-side.lau-mini .lau-nav-item a', function () {
        layer.tips($(this).find('cite').text(), this, {time: 1000, tips: [2, '#53616F']});
    });



    exports('layout2', {});
});
