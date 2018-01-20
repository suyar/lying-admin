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
        var _this = $(this);
        carousel.render({
            elem: this,
            width: '100%',
            autoplay: _this.data('autoplay') || false,
            arrow: 'none',
            trigger: 'hover',
            anim: _this.data('anim') || 'default',
            interval: _this.data('interval') || 3000
        });
    });

    exports('admin', {});
});
