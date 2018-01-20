layui.define(['layer', 'element', 'carousel'], function(exports) {
    var element = layui.element,
        carousel = layui.carousel,
        layer = layui.layer,
        $ = layui.$;

    //打开tab
    $(document).on('click', '[lying-src]', function () {
        var _this = $(this),
            src = _this.attr('lying-src'),
            title = _this.attr('lying-title') || src,
            icon = _this.attr('lying-icon');
        parent.layui.layout.tabAdd(src, title, icon);
    });

    //激活轮播
    $('.lying-carousel').each(function () {
        carousel.render({
            elem: this,
            width: '100%',
            autoplay: false,
            arrow: 'none',
            trigger: 'hover'
        });
    });

    exports('admin', {});
});
