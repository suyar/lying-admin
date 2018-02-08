layui.define(['layer', 'element'], function(exports) {
    var element = layui.element,
        layer = layui.layer,
        $ = layui.$;

    var layout = function () {
        this.offset = 0;
        this.titleLen = 0;
        this.tabLen = 0;
        this.diff = 0;
        this.title = $('.layui-tab-title');
        this.filter = $('.layui-body .layui-tab').attr('lay-filter');
    };

    /**
     * 获取标题栏宽度
     * @returns {layout}
     */
    layout.prototype.getTitleLen = function () {
        this.titleLen = this.title.width();
        return this;
    };

    /**
     * 计算所有tab宽度
     * @returns {layout}
     */
    layout.prototype.getTabLen = function () {
        var _this = this;
        _this.tabLen = 0;
        $('.layui-tab-title li').each(function () {
            _this.tabLen += $(this).outerWidth();
        });
        return _this;
    };

    /**
     * 计算标题栏宽度和所有tab的宽度差
     * @returns {layout}
     */
    layout.prototype.getDiff = function () {
        this.diff = this.titleLen - this.tabLen;
        return this;
    };

    /**
     * 设置tab偏移
     * @param offset 偏移量
     * @returns {layout}
     */
    layout.prototype.setOffset = function (offset) {
        offset = offset || this.offset;
        if (offset > 0 || this.diff > 0) {
            this.offset = offset = 0;
        } else if (offset < 0 && offset < this.diff) {
            this.offset = offset = this.diff;
        }
        this.title.css('left', offset + 'px');
        return this;
    };

    /**
     * 大小改变重新计算参数
     * @returns {layout}
     */
    layout.prototype.resize = function () {
        this.getTitleLen().getDiff();
        if (this.diff > 0) {
            this.setOffset(this.offset = 0);
        } else {
            var _tab = $('.layui-tab-brief>.layui-tab-title .layui-this'),
                _tabWidth = _tab.outerWidth(),
                _tabPos = _tab.position().left,
                d;

            if (this.offset < -_tabPos) {
                this.setOffset(this.offset = -_tabPos);
            } else if ((d = this.titleLen - _tabPos - _tabWidth) < 0) {
                this.setOffset(this.offset = d);
            } else if (this.offset < this.diff) {
                this.setOffset(this.offset = this.diff);
            }
        }
        return this;
    };

    /**
     * 延迟执行resize
     * @param time 延迟的时间(ms),默认200ms
     * @returns {layout}
     */
    layout.prototype.delayResize = function (time) {
        var _this = this;
        setTimeout(function () {
            _this.resize();
        }, time || 200);
        return _this;
    };

    /**
     * 左移
     * @returns {layout}
     */
    layout.prototype.goleft = function () {
        this.setOffset(this.offset += this.titleLen);
        return this;
    };

    /**
     * 右移
     * @returns {layout}
     */
    layout.prototype.goright = function () {
        this.setOffset(this.offset -= this.titleLen);
        return this;
    };

    /**
     * 新建tab标签
     * @param src 链接
     * @param title 标题
     * @param icon 字体图标
     * @returns {layout}
     */
    layout.prototype.tabAdd = function (src, title, icon) {
        if (src) {
            if ($('li[lay-id="' + src + '"]').length === 0) {
                if (icon) {
                    if (/^<i/.test(icon)) {
                        title = icon + ' ' + title;
                    } else if (/^#\S+/.test(icon)) {
                        title = '<i class="layui-icon">&' + icon + ';</i> ' + title;
                    } else {
                        title = '<i class="layui-icon ' + icon + '"></i> ' + title;
                    }
                }
                element.tabAdd(this.filter, {
                    title: title,
                    content: '<iframe src="' + src + '"></iframe>',
                    id: src
                });
            }
            element.tabChange(this.filter, src);
            this.getTabLen().resize();
        }
        return this;
    };

    /**
     * 删除非选中的选项卡
     * @returns {layout}
     */
    layout.prototype.tabCloseSiblings = function () {
        var _this = this;
        $('.layui-tab-title li:not(.layui-this)').each(function () {
            var id = $(this).attr('lay-id');
            id && element.tabDelete(_this.filter, id);
        });
        return _this;
    };

    /**
     * 删除第一个tab外的所有tab
     * @returns {layout}
     */
    layout.prototype.tabCloseAll = function () {
        var _this = this;
        $('.layui-tab-title li:not(:first)').each(function () {
            var id = $(this).attr('lay-id');
            id && element.tabDelete(_this.filter, id);
        });
        return _this;
    };

    /**
     * 删除第N个tab
     * @param index tab的索引,从0开始,但是0不可删除
     * @returns {layout}
     */
    layout.prototype.tabCloseEq = function (index) {
        var el = $('.layui-tab-title li:eq(' + index + ')');
        if (index && el.length) {
            var id = el.attr('lay-id');
            id && element.tabDelete(this.filter, id);
        }
        return this;
    };

    /**
     * 根据SRC删除选项卡
     * @param src 选项卡的SRC
     * @returns {layout}
     */
    layout.prototype.tabCloseSrc = function (src) {
        element.tabDelete(this.filter, src);
        return this;
    };

    /**
     * 根据SRC切换tab
     * @param src 选项卡的SRC
     * @returns {layout}
     */
    layout.prototype.tabChange = function (src) {
        element.tabChange(this.filter, src);
        return this;
    };

    /**
     * 刷新当前选项卡
     * @returns {layout}
     */
    layout.prototype.reload = function () {
        var iframe = $('.layui-tab-item.layui-show').find('iframe');
        iframe.length && iframe.attr('src', iframe.attr('src'));
        return this;
    };

    /**
     * 弹出右侧抽屉
     * @param opt
     * @returns {*|Promise<Cache>|void|IDBOpenDBRequest|Window|Document}
     */
    layout.prototype.popRight = function (opt) {
        return layer.open($.extend({
            type: 1,
            id: "popRight",
            anim: -1,
            title: false,
            closeBtn: false,
            offset: "r",
            shade: 0.1,
            shadeClose: true,
            skin: "layui-anim lying-anim-rl lying-layer-adminRight",
            area: "300px",
            content: ''
        }, opt));
    };

    //实例化对象
    var obj = new layout();
    obj.getTitleLen().getTabLen().getDiff();

    //判断左侧菜单是否要展开
    var side = layui.data('nav-side'), sideObj = $('.layui-layout-admin .layui-side');
    setTimeout(function () {
        if (side) {
            var mini = sideObj.hasClass('lying-side-mini');
            if (side.open && mini) {
                sideObj.removeClass('lying-side-mini') && obj.delayResize();
            } else if (!side.open && !mini) {
                sideObj.addClass('lying-side-mini') && obj.delayResize();
            }
        }
    }, 1000);


    //监听窗口大小改变
    $(window).resize(function () {
        obj.resize();
    });

    //监听关闭选项卡
    element.on('tabDelete(' + obj.filter + ')', function(data) {
        obj.getTabLen().resize();
    });

    //监听选项卡切换
    element.on('tab(' + obj.filter + ')', function(data) {
        var src = $(this).attr('lay-id'), pmenu = $('.lying-nav-child [lying-src="' + src + '"]').parents('.lying-nav-item');
        pmenu.length && (pmenu.hasClass('lying-nav-open') || pmenu.find('.lying-nav-header').trigger('click'));
    });

    //监听侧栏缩进
    $(document).on('click', '.lying-nav-fold', function () {
        sideObj.toggleClass('lying-side-mini');
        layui.data('nav-side', {key: 'open', value: !sideObj.hasClass('lying-side-mini')});
        obj.delayResize();
    });

    //监听菜单展开
    $(document).on('click', '.lying-nav-header', function () {
        $(this).parent().toggleClass('lying-nav-open').siblings('.lying-nav-item').removeClass('lying-nav-open');
    });

    //MINI菜单下显示tips
    $(document).on('mouseenter', '.layui-side.lying-side-mini .lying-nav-item a', function () {
        layer.tips($(this).find('.lying-nav-title').text(), this, {time: 1000, tips: [2, '#53616F']});
    });

    //刷新iframe
    $(document).on('click', '.lying-tab-goleft', function () {
        obj.goleft();
    });

    //刷新iframe
    $(document).on('click', '.lying-tab-goright', function () {
        obj.goright();
    });

    //刷新iframe
    $(document).on('click', '.lying-tab-refresh', function () {
        obj.reload();
    });

    //锚点打开选项卡
    $(document).on('click', '[lying-src]', function () {
        var _this = $(this),
            src = _this.attr('lying-src'),
            title = _this.find('.lying-nav-title'),
            icon = _this.find('.lying-nav-icon');
        if (title[0] && icon[0]) {
            title = title.text();
            icon = icon.html();
        } else {
            title = _this.attr('lying-title');
            icon = _this.attr('lying-icon');
        }
        obj.tabAdd(src, title, icon);
    });

    exports('layout', obj);
});
