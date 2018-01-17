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


    var chart = echarts.init($('#c').get(0));

    var option = {
        title: {
            text: '今日销量趋势',
            textStyle: {
                align: 'right',
                fontWeight: 'normal',
                fontSize: 14
            }
        },
        tooltip: {},
        backgroundColor: '#fff',
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    chart.setOption(option);
    


    exports('admin', {});
});
