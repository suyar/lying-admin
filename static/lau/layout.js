layui.define(['layer', 'laytpl'], function(exports) {
    var layer = layui.layer,
        laytpl = layui.laytpl,
        $ = layui.$;

    /**
     * 模板
     * @type {{sideMenu: string, bodyTab: string, bodySingle: string}}
     */
    var Tpl = {
        sideMenu: [
            '{{# layui.each(d, function(index, item) { }}',
            '<li class="lau-nav-item">',
                '<a class="lau-nav-header" href="javascript:;" {{ item.href ? \'lau-href="\' + item.href + \'"\' : \'\' }} {{ item.id ? \'lau-id="\' + item.id + \'"\' : \'\' }}>',
                    '<i class="{{ item.icon || \'layui-icon layui-icon-right\' }}"></i>',
                    '<cite>{{ item.title }}</cite>',
                '</a>',
                '{{# if (item.list) { }}',
                '<dl class="lau-nav-child">',
                    '{{# layui.each(item.list, function(index2, item2) { }}',
                    '<dd>',
                        '<a href="javascript:;" {{ item2.href ? \'lau-href="\' + item2.href + \'"\' : \'\' }} {{ item2.id ? \'lau-id="\' + item2.id + \'"\' : \'\' }}>',
                            '<i class="{{ item2.icon || \'layui-icon layui-icon-danxuankuanghouxuan\' }}"></i>',
                            '<cite>{{ item2.title }}</cite>',
                        '</a>',
                    '</dd>',
                    '{{# }); }}',
                '</dl>',
                '{{# } }}',
            '</li>',
            '{{# }); }}'
        ].join(''),
        bodyTab: [
            '<div class="layui-icon lau-tabs-ctrl layui-icon-prev"></div>',
            '<div class="layui-icon lau-tabs-ctrl layui-icon-next"></div>',
            '<div class="layui-icon lau-tabs-ctrl layui-icon-refresh-3"></div>',
            '<div class="layui-icon lau-tabs-ctrl layui-icon-down">',
                '<ul class="layui-nav lau-tabs-more" lay-filter="lau-tabs-more">',
                    '<li class="layui-nav-item" lay-unselect>',
                        '<a></a>',
                        '<dl class="layui-nav-child layui-anim-fadein">',
                            '<dd><a class="lau-tabs-close-this">关闭当前标签页</a></dd>',
                            '<dd><a class="lau-tabs-close-siblings">关闭其它标签页</a></dd>',
                            '<dd><a class="lau-tabs-close-all">关闭全部标签页</a></dd>',
                        '</dl>',
                    '</li>',
                '</ul>',
            '</div>',
            '<div class="layui-tab layui-tab-brief" lay-allowClose="true" lay-filter="lau-tabs">',
                '<ul class="layui-tab-title">',
                    '<li class="layui-this"><i class="{{ d.icon ? (d.icon.split(\'/\s+/\').length > 1 ? d.icon : \'layui-icon \' + d.icon) : \'layui-icon layui-icon-home\' }}"></i> {{ d.title || \'控制台\' }}</li>',
                    '<li> 关闭全部标签页关闭全部标签页关闭全部标签页</li>',
                    '<li> 关闭全部标签页关闭全部标签页关闭全部标签页</li>',
                    '<li> 关闭全部标签页关闭全部标签页关闭全部标签页</li>',
                    '<li> 关闭全部标签页关闭全部标签页关闭全部标签页</li>',
                '</ul>',
                '<div class="layui-tab-content">',
                    '<div class="layui-tab-item layui-show">',
                        '<iframe src="{{ d.href }}"></iframe>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''),
        bodySingle: '<iframe src="{{ d.href }}"></iframe>'
    };

    /**
     * 布局对象
     * @constructor
     */
    var Layout = function () {
        var THIS = this,
            BODY = $('.layui-body'),
            SIDE = $('.layui-side'),
            SINGLE = BODY.data('type') === 'single';

        //渲染内容模板
        laytpl(SINGLE ? Tpl.bodySingle : Tpl.bodyTab).render({
            title: $.trim(BODY.data('title')),
            icon: $.trim(BODY.data('icon')),
            href: $.trim(BODY.data('href'))
        }, function (html) {
            BODY.empty().html(html);
        });

        //当前展示页面的iframe元素
        this.iframe = BODY.find('iframe').get(0);


        if (SINGLE) {

        } else {
            layui.use('element', function () {
                var element = layui.element;

                var tabTitle = BODY.find('.layui-tab-title'),
                    tabTitleWidth = 0,
                    tabTitleOffset = 0,
                    tabWidth = 0,
                    tabDiff = 0,
                    tabThis = tabTitle.find('.layui-this'),
                    tabThisWidth = tabThis.outerWidth(),
                    tabThisLeft = tabThis.position().left,
                    tabResizeHandle;

                /**
                 * 重新计算选项卡容器宽度
                 */
                function calcTabTitleWidth() {
                    tabTitleWidth = tabTitle.width();
                    calcTabDiff();
                }

                /**
                 * 重新计算所有的选项卡的宽度和
                 */
                function calcTabWidth() {
                    tabWidth = 0;
                    tabTitle.find('li').each(function () {
                        tabWidth += $(this).outerWidth();
                    });
                    calcTabDiff();
                }

                /**
                 * 重新计算选项卡容器和选项卡标签宽度差
                 */
                function calcTabDiff() {
                    tabDiff = tabTitleWidth - tabWidth;
                }

                /**
                 * 设置选项卡容器偏移量
                 * @param offset 偏移量
                 */
                function setOffset(offset) {
                    var old = tabTitleOffset;
                    if (offset >= 0 || tabDiff >= 0) {
                        tabTitleOffset = 0;
                    } else if (offset < tabDiff) {
                        tabTitleOffset = tabDiff;
                    } else {
                        tabTitleOffset = offset;
                    }
                    old === tabTitleOffset || tabTitle.css('left', tabTitleOffset + 'px');
                }

                /**
                 * 选项卡往左
                 * @returns {Layout}
                 */
                THIS.tabPrev = function () {
                    setOffset(tabTitleOffset + tabTitleWidth);
                    return this;
                };

                /**
                 * 选项卡往右
                 * @returns {Layout}
                 */
                THIS.tabNext = function () {
                    setOffset(tabTitleOffset - tabTitleWidth);
                    return this;
                };

                /**
                 * 窗口改变重新计算
                 * @param time 延迟执行,毫秒,默认0
                 * @returns {Layout}
                 */
                THIS.resize = function (time) {
                    tabResizeHandle && clearTimeout(tabResizeHandle);
                    tabResizeHandle = setTimeout(function () {
                        calcTabTitleWidth();
                        if (tabDiff >= 0) {
                            setOffset(0);
                        } else if (tabTitleWidth <= tabThisWidth || tabTitleOffset <= -tabThisLeft) {
                            setOffset(-tabThisLeft);
                        } else {
                            setOffset(tabTitleWidth - tabThisLeft - tabThisWidth);
                        }
                    }, time || 0);
                    return this;
                };

                THIS.tabAdd = function (href, title, icon, id) {
                    var layid = id || src;

                };

                //初始化选项卡数据
                calcTabTitleWidth();
                calcTabWidth();

                //监听选项卡切换
                element.on('tab(lau-tabs)', function(data) {
                    tabThis = $(this);
                    tabThisWidth = tabThis.outerWidth();
                    tabThisLeft = tabThis.position().left;
                });

                //监听选项卡关闭
                element.on('tabDelete(lau-tabs)', function(data) {
                    tabThisLeft = tabThis.position().left;
                    calcTabWidth();
                    THIS.resize();
                });

                //窗口改变事件
                $(window).resize(function () {
                    THIS.resize();
                });

            });







        }

    };



    var obj = new Layout();
    exports('layout', obj);
    return;




    /**
     * 选项卡操作类(在选项卡模式下才有用)
     * @constructor
     */
    var Tab = function () {
        this.tabTitle = BODY_EL.find('.layui-tab-title');
        this.tabTitleWidth = 0;
        this.tabWidth = 0;
        this.diff = 0;



        /**
         * 获取选项卡容器宽度
         * @returns {Tab}
         */
        this.getTabTitleWidth = function () {
            this.tabTitleWidth = this.tabTitle.width();
            return this;
        };

        /**
         * 获取所有选项卡的宽度
         * @returns {Tab}
         */
        this.getTabWidth = function () {
            var _this = this;
            _this.tabWidth = 0;
            _this.tabTitle.find('li').each(function () {
                _this.tabWidth += $(this).outerWidth();
            });
            return _this;
        };

        /**
         * 获取选项卡宽度和容器宽度的差
         * @returns {Tab}
         */
        this.getDiff = function () {
            this.diff = this.tabTitleWidth - this.tabWidth;
            return this;
        };

        /**
         * 设置选项卡容器偏移量
         * @param offset 偏移量
         * @returns {Tab}
         */
        this.setOffset = function (offset) {
            console.log(this.offset, this.diff);
            if (this.offset === offset) {
                return this;
            } else if (offset > 0 || this.diff > 0) {
                this.offset = 0;
            } else if (offset < 0 && offset < this.diff) {
                this.offset = this.diff;
            } else {
                this.offset = offset;
            }

            this.tabTitle.css('left', this.offset + 'px');
            return this;
        };

        /**
         * 窗口改变重新计算参数
         * @returns {Tab}
         */
        this.resize = function () {
            this.getTabTitleWidth().getDiff();
            if (this.diff > 0) {
                this.setOffset(0);
            } else {
                var _tab = this.tabTitle.find('.layui-this'),
                    _tabWidth = _tab.outerWidth(),
                    _tabPos = _tab.position().left,
                    _d = this.tabTitleWidth - _tabPos - _tabWidth;
                if (this.offset < -_tabPos) {
                    this.setOffset(-_tabPos);
                } else if (_d < 0) {
                    this.setOffset(_d);
                } else if (this.offset < this.diff) {
                    this.setOffset(this.diff);
                }
            }
            return this;
        };

    };


    obj = new Tab();
    obj.getTabTitleWidth().getTabWidth();

    //监听窗口大小改变
    $(window).resize(function () {
        obj.resize();
    });

    //监听选项卡切换
    element.on('tab(lau-tabs)', function(data) {
        console.log(data);
        var layid = $(this).attr('lay-id'),
            menu = $('.layui-side .lau-nav-item a[lau-href="' + layid + '"], .layui-side .lau-nav-item a[lau-id="' + layid + '"]');
        if (menu.length && !menu.next('.lau-nav-child').length) {
            if (menu.hasClass('lau-nav-header')) {
                menu.parent().siblings().removeClass('lau-open');
            } else {
                var pmenu = menu.parents('.lau-nav-item');
                pmenu.length && !pmenu.hasClass('lau-open') && pmenu.addClass('lau-open').siblings().removeClass('lau-open');
            }
        }
    });

    exports('layout', obj);
    return;




    /**
     * Layout对象
     */
    var Layout = function () {
        this.offset = 0;
        this.titleLen = 0;
        this.tabLen = 0;
        this.diff = 0;
        this.title = $('.layui-body .layui-tab-title');
        this.filter = $('.layui-body .layui-tab').attr('lay-filter');
        this.sideMenu = $('.layui-side .layui-nav');
        this.sideMenuData = [];
    };

    /**
     * 获取标题栏宽度
     * @returns {Layout}
     */
    Layout.prototype.getTitleLen = function () {
        this.titleLen = this.title.width();
        return this;
    };

    /**
     * 计算所有tab宽度
     * @returns {Layout}
     */
    Layout.prototype.getTabLen = function () {
        var _this = this;
        _this.tabLen = 0;
        _this.title.find('li').each(function () {
            _this.tabLen += $(this).outerWidth();
        });
        return _this;
    };

    /**
     * 计算标题栏宽度和所有tab的宽度差
     * @returns {Layout}
     */
    Layout.prototype.getDiff = function () {
        this.diff = this.titleLen - this.tabLen;
        return this;
    };

    /**
     * 设置tab偏移
     * @param offset 偏移量
     * @returns {Layout}
     */
    Layout.prototype.setOffset = function (offset) {
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
     * @returns {Layout}
     */
    Layout.prototype.resize = function () {
        this.getTitleLen().getDiff();
        if (this.diff > 0) {
            this.setOffset(this.offset = 0);
        } else {
            var _tab = $('.layui-body .layui-tab-brief>.layui-tab-title .layui-this'),
                _tabWidth = _tab.outerWidth(),
                _tabPos = _tab.position().left,
                _d = this.titleLen - _tabPos - _tabWidth;
            if (this.offset < -_tabPos) {
                this.setOffset(this.offset = -_tabPos);
            } else if (_d < 0) {
                this.setOffset(this.offset = _d);
            } else if (this.offset < this.diff) {
                this.setOffset(this.offset = this.diff);
            }
        }
        return this;
    };

    /**
     * 延迟执行resize
     * @param time 延迟的时间(ms),默认200ms
     * @returns {Layout}
     */
    Layout.prototype.delayResize = function (time) {
        var _this = this;
        setTimeout(function () {
            _this.resize();
        }, time || 200);
        return _this;
    };

    /**
     * 左移
     * @returns {Layout}
     */
    Layout.prototype.tabLeft = function () {
        this.setOffset(this.offset += this.titleLen);
        return this;
    };

    /**
     * 右移
     * @returns {Layout}
     */
    Layout.prototype.tabRight = function () {
        this.setOffset(this.offset -= this.titleLen);
        return this;
    };

    /**
     * 新建/切换选项卡
     * @param src 链接
     * @param title 标题
     * @param icon 字体图标
     * @param id 选项卡的ID,如果不传,就以src作为ID
     * @returns {Layout}
     */
    Layout.prototype.tabAdd = function (src, title, icon, id) {
        var layid = id || src;
        if ($('li[lay-id="' + layid + '"]').length === 0) {
            if (icon) {
                if (icon.split(/\s+/).length < 2) {
                    title = '<i class="layui-icon ' + icon + '"></i> ' + title;
                } else {
                    title = '<i class="' + icon + '"></i> ' + title;
                }
            }
            element.tabAdd(this.filter, {
                title: title || src,
                content: '<iframe src="' + src + '"></iframe>',
                id: layid
            });
        }
        element.tabChange(this.filter, layid);
        this.getTabLen().resize();
        return this;
    };

    /**
     * 关闭除选中和第一个外的其他选项卡
     * @returns {Layout}
     */
    Layout.prototype.tabCloseSiblings = function () {
        $('.layui-body .layui-tab-title li:not(:first):not(.layui-this)').find('.layui-tab-close').trigger('click');
        return this;
    };

    /**
     * 关闭第一个外的所有选项卡
     * @returns {Layout}
     */
    Layout.prototype.tabCloseAll = function () {
        $('.layui-body .layui-tab-title li:not(:first)').find('.layui-tab-close').trigger('click');
        return this;
    };

    /**
     * 关闭第N个选项卡
     * @param index 选项卡的索引,从0开始,但是0不可删除
     * @returns {Layout}
     */
    Layout.prototype.tabCloseEq = function (index) {
        index && $('.layui-body .layui-tab-title li:eq(' + index + ')').find('.layui-tab-close').trigger('click');
        return this;
    };

    /**
     * 根据layid关闭选项卡
     * @param id 选项卡的layid
     * @returns {Layout}
     */
    Layout.prototype.tabCloseId = function (id) {
        element.tabDelete(this.filter, id);
        return this;
    };

    /**
     * 关闭当前选项卡
     * @returns {Layout}
     */
    Layout.prototype.tabCloseThis = function () {
        $('.layui-body .layui-tab-title li:not(:first).layui-this').find('.layui-tab-close').trigger('click');
        return this;
    };

    /**
     * 切换到第N个选项卡
     * @param index 选项卡的索引,从0开始
     * @returns {Layout}
     */
    Layout.prototype.tabChangeEq = function (index) {
        $('.layui-body .layui-tab-title li:eq(' + index + ')').trigger('click');
        return this;
    };

    /**
     * 根据layid切换选项卡
     * @param id 选项卡的layid
     * @returns {Layout}
     */
    Layout.prototype.tabChangeId = function (id) {
        element.tabChange(this.filter, id);
        return this;
    };

    /**
     * 刷新当前选项卡
     * @returns {Layout}
     */
    Layout.prototype.reload = function () {
        var iframe = $('.layui-body .layui-tab-item.layui-show').find('iframe');
        iframe.length && iframe.attr('src', iframe.attr('src'));
        return this;
    };

    /**
     * 载入所有侧栏菜单数组
     * @param menus 所有菜单,一个二维数组
     * @returns {Layout}
     */
    Layout.prototype.sideMenuLoad = function (menus) {
        this.sideMenuData = menus;
        return this.sideMenuChange(0);
    };

    /**
     * 切换到某个侧栏菜单
     * @param index 侧栏菜单索引
     * @returns {Layout}
     */
    Layout.prototype.sideMenuChange = function (index) {
        this.sideMenuData[index] && this.sideMenuRender(this.sideMenuData[index]);
        return this;
    };

    /**
     * 根据menu重新渲染侧栏菜单
     * @param menu 要渲染的菜单结构,提供一个数组
     * @returns {Layout}
     */
    Layout.prototype.sideMenuRender = function (menu) {
        var _this = this;
        if (typeof menu === 'object') {
            laytpl(sideMenuTpl).render(menu, function (str) {
                _this.sideMenu.fadeOut(function () {
                    _this.sideMenu.html(str).fadeIn();
                });
            });
        }
        return _this;
    };

    /**
     * 弹出右侧抽屉
     * @param options
     * @returns {*|Promise<Cache>|void|IDBOpenDBRequest|Window|Document}
     */
    Layout.prototype.drawer = function (options) {
        return layer.open($.extend({
            type: 1,
            id: "drawer",
            anim: -1,
            title: false,
            closeBtn: false,
            offset: "r",
            shade: 0.1,
            shadeClose: true,
            skin: "layui-anim layui-anim-rl lau-drawer",
            area: "300px"
        }, options));
    };

    //实例化对象
    var obj = new Layout();
    obj.getTitleLen().getTabLen().getDiff();

    //单击左移
    $(document).on('click', '.lau-tabs-ctrl.layui-icon-prev', function () {
        obj.tabLeft();
    });

    //单击右移
    $(document).on('click', '.lau-tabs-ctrl.layui-icon-next', function () {
        obj.tabRight();
    });

    //单击刷新
    $(document).on('click', '.lau-tabs-ctrl.layui-icon-refresh-3', function () {
        obj.reload();
    });

    //监听选项卡的更多操作
    element.on('nav(lau-tabs-more)', function(elem) {
        var dd = elem.parent();
        dd.removeClass('layui-this');
        dd.parent().removeClass('layui-show');
        switch (elem.prop('class')) {
            case 'lau-tabs-close-this':obj.tabCloseThis();break;
            case 'lau-tabs-close-siblings':obj.tabCloseSiblings();break;
            case 'lau-tabs-close-all':obj.tabCloseAll();break;
        }
    });

    //监听窗口大小改变
    $(window).resize(function () {
        obj.delayResize();
    });

    //监听关闭选项卡
    element.on('tabDelete(' + obj.filter + ')', function(data) {
        obj.getTabLen().resize();
    });

    //判断左侧菜单是否要展开
    var sideStatus = layui.data('sideStatus'), sideObj = $('.layui-layout-admin .layui-side');
    sideStatus && setTimeout(function () {
        var isMini = sideObj.hasClass('lau-mini');
        if (sideStatus.open && isMini) {
            sideObj.removeClass('lau-mini') && obj.delayResize();
        } else if (!sideStatus.open && !isMini) {
            sideObj.addClass('lau-mini') && obj.delayResize();
        }
    }, 1000);

    //监听侧栏缩进
    $(document).on('click', '.lau-side-fold', function () {
        sideObj.toggleClass('lau-mini');
        layui.data('sideStatus', {key: 'open', value: !sideObj.hasClass('lau-mini')});
        obj.delayResize();
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

    //监听锚点打开选项卡
    $(document).on('click', '*[lau-href]', function () {
        var _this = $(this),
            href = _this.attr('lau-href'),
            layid = _this.attr('lau-id');
        if (_this.parents('.lau-nav-item').length) {
            if (_this.next('.lau-nav-child').length === 0) {
                obj.tabAdd(href, _this.find('cite').text(), _this.find('i').prop('class'), layid);
            }
        } else {
            obj.tabAdd(href, _this.attr('lau-title'), _this.attr('lau-icon'), _this.attr('lau-id'));
        }
    });

    //监听选项卡切换
    element.on('tab(' + obj.filter + ')', function(data) {
        var layid = $(this).attr('lay-id'),
            menu = $('.layui-side .lau-nav-item a[lau-href="' + layid + '"], .layui-side .lau-nav-item a[lau-id="' + layid + '"]');
        if (menu.length && !menu.next('.lau-nav-child').length) {
            if (menu.hasClass('lau-nav-header')) {
                menu.parent().siblings().removeClass('lau-open');
            } else {
                var pmenu = menu.parents('.lau-nav-item');
                pmenu.length && !pmenu.hasClass('lau-open') && pmenu.addClass('lau-open').siblings().removeClass('lau-open');
            }
        }
    });

    exports('layout', obj);
});
