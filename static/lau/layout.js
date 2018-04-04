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
                    '<li>关闭全部标签页关闭全部标签页关闭全部标签页关闭全部标签页关闭全部标签页</li>',
            '<li>关闭全部标签页关闭全部标签页关闭全部标签页关闭全部标签页关闭全部标签页</li>',
            '<li>关闭全部标签页关闭全部标签页关闭全部标签页关闭全部标签页关闭全部标签页</li>',
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

        /**
         * 刷新当前iframe
         */
        this.reload = function () {
            $(this.iframe).prop('src', this.iframe.src);
            return this;
        };

        /**
         * 跳转当前iframe
         * @param href 要跳转的地址
         * @returns {Layout}
         */
        this.location = function (href) {
            this.iframe.src = $.trim(href);
            return this;
        };

        /**
         * 弹出右侧抽屉
         * @param options
         * @returns {*}
         */
        this.drawer = function (options) {
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


        if (SINGLE) {

        } else {
            layui.use('element', function () {
                var element = layui.element;

                var tabFilter = 'lau-tabs',
                    tabTitle = BODY.find('.layui-tab-title'),
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

                /**
                 * 新建选项卡
                 * @param href iframe的地址
                 * @param title 选项卡标题
                 * @param icon 选项卡图标
                 * @param id 选项卡ID,如果不传,就以href作为ID
                 * @returns {Layout}
                 */
                THIS.tabAdd = function (href, title, icon, id) {
                    href = $.trim(href);
                    title = $.trim(title);
                    icon = $.trim(icon);
                    id = $.trim(id);

                    var layid = id || href;
                    if (tabTitle.find('li[lay-id="' + layid + '"]').length === 0) {
                        if (icon) {
                            if (icon.split(/\s+/).length < 2) {
                                title = '<i class="layui-icon ' + icon + '"></i> ' + title;
                            } else {
                                title = '<i class="' + icon + '"></i> ' + title;
                            }
                        }
                        element.tabAdd(tabFilter, {
                            title: title || href,
                            content: '<iframe src="' + href + '"></iframe>',
                            id: layid
                        });
                    }
                    element.tabChange(tabFilter, layid);
                    calcTabWidth();
                    this.resize();
                    return this;
                };

                /**
                 * 关闭当前选项卡,第一个选项卡除外
                 * @returns {Layout}
                 */
                THIS.tabCloseThis = function () {
                    tabThis.is(':first-child') || tabThis.find('i.layui-tab-close').trigger('click');
                    return this;
                };

                /**
                 * 关闭当前选项卡外的所有选项卡,第一个选项卡除外
                 * @returns {Layout}
                 */
                THIS.tabCloseSiblings = function () {
                    tabThis.siblings('li:not(:first-child)').find('i.layui-tab-close').trigger('click');
                    return this;
                };

                /**
                 * 关闭所有选项卡,第一个选项卡除外
                 * @returns {Layout}
                 */
                THIS.tabCloseAll = function () {
                    tabTitle.find('li:not(:first-child)').find('i.layui-tab-close').trigger('click');
                    return this;
                };

                /**
                 * 关闭第N个选项卡
                 * @param index 选项卡的索引,从0开始,但是0不可删除
                 * @returns {Layout}
                 */
                THIS.tabCloseEq = function (index) {
                    index && tabTitle.find('li:eq(' + index + ')').find('i.layui-tab-close').trigger('click');
                    return this;
                };

                /**
                 * 关闭layid对应的选项卡
                 * @param layid 选项卡的ID
                 * @returns {Layout}
                 */
                THIS.tabCloseId = function (layid) {
                    element.tabDelete(tabFilter, layid);
                    return this;
                };

                /**
                 * 切换到第N个选项卡
                 * @param index 选项卡的索引,从0开始
                 * @returns {Layout}
                 */
                THIS.tabChangeEq = function (index) {
                    tabTitle.find('li:eq(' + index + ')').trigger('click');
                    return this;
                };

                /**
                 * 切换到layid对应的选项卡
                 * @param layid 选项卡的ID
                 * @returns {Layout}
                 */
                THIS.tabChangeId = function (layid) {
                    element.tabChange(tabFilter, layid);
                    return this;
                };

                //初始化选项卡数据
                calcTabTitleWidth();
                calcTabWidth();

                //监听选项卡切换
                element.on('tab(' + tabFilter + ')', function(data) {
                    THIS.iframe = data.elem.find('.layui-tab-item.layui-show iframe').get(0);
                    tabThis = $(this);
                    tabThisWidth = tabThis.outerWidth();
                    tabThisLeft = tabThis.position().left;

                    var layid = tabThis.attr('lay-id'),
                        menu = SIDE.find('li.lau-nav-item a[lau-href="' + layid + '"], li.lau-nav-item a[lau-id="' + layid + '"]');
                    if (menu.length && !menu.next('.lau-nav-child').length) {
                        if (menu.hasClass('lau-nav-header')) {
                            menu.parent().siblings().removeClass('lau-open');
                        } else {
                            var pmenu = menu.parents('.lau-nav-item');
                            pmenu.length && !pmenu.hasClass('lau-open') && pmenu.addClass('lau-open').siblings().removeClass('lau-open');
                        }
                    }
                });

                //监听选项卡关闭
                element.on('tabDelete(' + tabFilter + ')', function(data) {
                    tabThisLeft = tabThis.position().left;
                    calcTabWidth();
                    THIS.resize();
                });

                //窗口改变事件
                $(window).resize(function () {
                    THIS.resize();
                });

                //单击左移
                $(document).on('click', '.lau-tabs-ctrl.layui-icon-prev', function () {
                    THIS.tabPrev();
                });

                //单击右移
                $(document).on('click', '.lau-tabs-ctrl.layui-icon-next', function () {
                    THIS.tabNext();
                });

                //单击刷新
                $(document).on('click', '.lau-tabs-ctrl.layui-icon-refresh-3', function () {
                    THIS.reload();
                });

                //监听选项卡的更多操作
                element.on('nav(lau-tabs-more)', function(elem) {
                    var dd = elem.parent();
                    dd.removeClass('layui-this');
                    dd.parent().removeClass('layui-show');
                    switch (elem.prop('class')) {
                        case 'lau-tabs-close-this':THIS.tabCloseThis();break;
                        case 'lau-tabs-close-siblings':THIS.tabCloseSiblings();break;
                        case 'lau-tabs-close-all':THIS.tabCloseAll();break;
                    }
                });
            });
        }

        //监听锚点打开选项卡
        $(document).on('click', '*[lau-href]', function () {
            var _this = $(this),
                href = _this.attr('lau-href'),
                layid = _this.attr('lau-id');
            if (_this.parents('.lau-nav-item').length) {
                if (_this.next('.lau-nav-child').length === 0) {
                    SINGLE ? THIS.location(href) : THIS.tabAdd(href, _this.find('cite').text(), _this.find('i').prop('class'), layid);
                }
            } else {
                SINGLE ? THIS.location(href) : THIS.tabAdd(href, _this.attr('lau-title'), _this.attr('lau-icon'), layid);
            }
        });

        //监听侧栏缩进
        $(document).on('click', '.lau-side-fold', function () {
            SIDE.toggleClass('lau-mini');
            layui.data('lau-side', {key: 'mini', value: SIDE.hasClass('lau-mini')});
            THIS.resize(200);
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

        //判断左侧菜单是否要展开
        var sideStatus = layui.data('lau-side');
        sideStatus && setTimeout(function () {
            var isMini = SIDE.hasClass('lau-mini');
            if (sideStatus.mini && !isMini) {
                SIDE.addClass('lau-mini') && THIS.resize(200);
            } else if (!sideStatus.mini && isMini) {
                SIDE.removeClass('lau-mini') && THIS.resize(200);
            }
        }, 1000);

    };



    var layout = new Layout();
    exports('layout', layout);
    return;




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





    exports('layout', obj);
});
