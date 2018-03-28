layui.define(['layer', 'element', 'carousel'], function(exports) {
    var element = layui.element,
        carousel = layui.carousel,
        layer = layui.layer,
        $ = layui.$;

    //激活轮播
    $('.lau-carousel').each(function () {
        var that = $(this);
        carousel.render({
            elem: this,
            width: '100%',
            arrow: 'none',
            interval: that.data('interval'),
            autoplay: that.data('autoplay') === true,
            trigger: 'hover',
            anim: that.data('anim')
        });
    });


    exports('lau', {});
});
