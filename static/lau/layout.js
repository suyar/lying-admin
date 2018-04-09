layui.define(['layer', 'laytpl', 'element'], function(exports) {
    var layer = layui.layer,
        laytpl = layui.laytpl,
        element = layui.element,
        $ = layui.$;

    /**
     * 预设模板
     * @type {{ Tpl }}
     */
    var Tpl = {
        sideMenu: [
            '{{# layui.each(d, function(index, item) { ',
                'var href = layui.$.trim(item.href), ',
                    'href = href ? \' lau-href="\' + href + \'"\' : \'\', ',
                    'id = layui.$.trim(item.id),',
                    'id = id ? \' lau-id="\' + id + \'"\' : \'\', ',
                    'title = layui.$.trim(item.title), ',
                    'icon = layui.$.trim(item.icon), ',
                    'hasItem = typeof item.list === \'object\' && item.list.length > 0, ',
                    'open = Boolean(item.open) && hasItem ? \' lau-open\' : \'\'; ',
                'if (icon) { ',
                    'if (icon.split(/\\s+/).length < 2) { ',
                        'icon = \'layui-icon \' + icon; ',
                    '} ',
                '} else { ',
                    'icon = \'layui-icon layui-icon-right\'; ',
                '} ',
            '}}',
            '<li class="lau-nav-item{{ open }}">',
                '<a class="lau-nav-header"{{ href }}{{ id }}>',
                    '<i class="{{ icon }}"></i>',
                    '<cite>{{ title }}</cite>',
                '</a>',
                '{{# if (hasItem) { }}',
                '<dl class="lau-nav-child">',
                    '{{# layui.each(item.list, function(index2, item2) { ',
                        'var href = layui.$.trim(item2.href), ',
                            'href = href ? \' lau-href="\' + href + \'"\' : \'\', ',
                            'id = layui.$.trim(item2.id),',
                            'id = id ? \' lau-id="\' + id + \'"\' : \'\', ',
                            'title = layui.$.trim(item2.title), ',
                            'icon = layui.$.trim(item2.icon); ',
                        'if (icon) { ',
                            'if (icon.split(/\\s+/).length < 2) { ',
                                'icon = \'layui-icon \' + icon; ',
                            '} ',
                        '} else { ',
                            'icon = \'layui-icon layui-icon-danxuankuanghouxuan\'; ',
                        '} ',
                    '}}',
                    '<dd>',
                        '<a{{ href }}{{ id }}>',
                            '<i class="{{ icon }}"></i>',
                            '<cite>{{ title }}</cite>',
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
            SIDE_MENU = [],
            SINGLE = BODY.data('type') === 'single',
            IFRAME,
            LAYID;

        //版本号
        this.version = this.v = '1.0.0';

        //渲染内容模板
        laytpl(SINGLE ? Tpl.bodySingle : Tpl.bodyTab).render({
            title: $.trim(BODY.data('title')),
            icon: $.trim(BODY.data('icon')),
            href: $.trim(BODY.data('href'))
        }, function (html) {
            IFRAME = BODY.html(html).find('iframe').first();
            element.render('nav');
        });

        //如果设置了侧栏菜单的获取路径,直接渲染
        var sideHref = $.trim(SIDE.data('href'));
        if (sideHref) {
            $.ajax({
                url: sideHref,
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    THIS.sideMenuLoad(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        }

        /**
         * 刷新当前iframe
         * @returns {Layout}
         */
        this.reload = function () {
            IFRAME.prop('src', IFRAME.prop('src'));
            return this;
        };

        /**
         * 载入侧栏菜单数据
         * @param menus 所有菜单
         * @returns {Layout}
         */
        this.sideMenuLoad = function (menus) {
            SIDE_MENU = menus;
            this.sideMenuChange(0);
            return this;
        };

        /**
         * 切换侧栏菜单
         * @param index 侧栏菜单索引
         * @returns {Layout}
         */
        this.sideMenuChange = function (index) {
            SIDE_MENU[index] && this.sideMenuRender(SIDE_MENU[index]);
            return this;
        };

        /**
         * 重新渲染侧栏菜单
         * @param menu 要渲染的菜单结构,提供一个规范格式的数组
         * @returns {Layout}
         */
        this.sideMenuRender = function (menu) {
            typeof menu === "object" && laytpl(Tpl.sideMenu).render(menu, function (html) {
                var sideNav = SIDE.find('.layui-nav.layui-nav-tree');
                sideNav[0] && sideNav.fadeOut(200, function () {
                    sideNav.html(html).fadeIn(200,function () {
                        traceMenu();
                    });
                });
            });
            return this;
        };

        /**
         * 根据layid查找menu对象
         * @param layid menu的layid
         * @returns {*}
         */
        function findMenu(layid) {
            return SIDE.find('li.lau-nav-item a[lau-href="' + layid + '"], li.lau-nav-item a[lau-id="' + layid + '"]').first();
        }

        /**
         * 根据当前选项卡追踪侧栏菜单展开
         */
        function traceMenu() {
            var menu = findMenu(LAYID);
            if (menu[0] && !menu.next('.lau-nav-child')[0]) {
                if (menu.hasClass('lau-nav-header')) {
                    menu.parent().siblings().removeClass('lau-open');
                } else {
                    var pmenu = menu.parents('.lau-nav-item');
                    pmenu[0] && !pmenu.hasClass('lau-open') && pmenu.addClass('lau-open').siblings().removeClass('lau-open');
                }
            }
        }

        /**
         * 弹出右侧抽屉
         * @param options layer选项
         * @returns {Layout}
         */
        this.drawer = function (options) {
            this.drawerIndex = layer.open($.extend({
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
            return this;
        };

        if (SINGLE) {
            /**
             * 跳转当前iframe
             * @param href 要跳转的地址
             * @returns {Layout}
             */
            this.location = function (href) {
                LAYID = $.trim(href);
                IFRAME.prop('src', LAYID);
                return this;
            };
        } else {
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
             * 窗口改变重新计算
             */
            function resize() {
                calcTabTitleWidth();
                if (tabDiff >= 0) {
                    setOffset(0);
                } else if (tabTitleWidth <= tabThisWidth || tabTitleOffset < -tabThisLeft) {
                    setOffset(-tabThisLeft);
                } else {
                    setOffset(tabTitleWidth - tabThisLeft - tabThisWidth);
                }
            }

            /**
             * 选项卡往左
             * @returns {Layout}
             */
            this.tabPrev = function () {
                setOffset(tabTitleOffset + tabTitleWidth);
                return this;
            };

            /**
             * 选项卡往右
             * @returns {Layout}
             */
            this.tabNext = function () {
                setOffset(tabTitleOffset - tabTitleWidth);
                return this;
            };

            /**
             * 窗口改变重新计算
             * @param time 延迟执行,毫秒,默认0
             * @returns {Layout}
             */
            this.resize = function (time) {
                if (time) {
                    tabResizeHandle && clearTimeout(tabResizeHandle);
                    tabResizeHandle = setTimeout(resize, time);
                } else {
                    resize();
                }
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
            this.tabAdd = function (href, title, icon, id) {
                layer.close(this.drawerIndex);
                href = $.trim(href);
                title = $.trim(title);
                icon = $.trim(icon);
                id = $.trim(id);

                LAYID = id || href;
                if (!tabTitle.find('li[lay-id="' + LAYID + '"]')[0]) {
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
                        id: LAYID
                    });
                }
                element.tabChange(tabFilter, LAYID);
                calcTabWidth();
                this.resize();
                return this;
            };

            /**
             * 关闭当前选项卡,第一个选项卡除外
             * @returns {Layout}
             */
            this.tabCloseThis = function () {
                tabThis.is(':first-child') || tabThis.find('i.layui-tab-close').trigger('click');
                return this;
            };

            /**
             * 关闭当前选项卡外的所有选项卡,第一个选项卡除外
             * @returns {Layout}
             */
            this.tabCloseSiblings = function () {
                tabThis.siblings('li:not(:first-child)').find('i.layui-tab-close').trigger('click');
                return this;
            };

            /**
             * 关闭所有选项卡,第一个选项卡除外
             * @returns {Layout}
             */
            this.tabCloseAll = function () {
                tabTitle.find('li:not(:first-child)').find('i.layui-tab-close').trigger('click');
                return this;
            };

            /**
             * 关闭第N个选项卡
             * @param index 选项卡的索引,从0开始,但是0不可删除
             * @returns {Layout}
             */
            this.tabCloseEq = function (index) {
                index && tabTitle.find('li:eq(' + index + ')').find('i.layui-tab-close').trigger('click');
                return this;
            };

            /**
             * 关闭layid对应的选项卡
             * @param layid 选项卡的ID
             * @returns {Layout}
             */
            this.tabCloseId = function (layid) {
                element.tabDelete(tabFilter, layid);
                return this;
            };

            /**
             * 切换到第N个选项卡
             * @param index 选项卡的索引,从0开始
             * @returns {Layout}
             */
            this.tabChangeEq = function (index) {
                tabTitle.find('li:eq(' + index + ')').trigger('click');
                return this;
            };

            /**
             * 切换到layid对应的选项卡
             * @param layid 选项卡的ID
             * @returns {Layout}
             */
            this.tabChangeId = function (layid) {
                element.tabChange(tabFilter, layid);
                return this;
            };

            //初始化选项卡数据
            calcTabTitleWidth();
            calcTabWidth();

            //监听选项卡切换
            element.on('tab(' + tabFilter + ')', function(data) {
                IFRAME = data.elem.find('.layui-tab-item.layui-show iframe').first();
                tabThis = $(this);
                tabThisWidth = tabThis.outerWidth();
                tabThisLeft = tabThis.position().left;
                THIS.resize();
                LAYID = tabThis.attr('lay-id');
                traceMenu();
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
                elem.parent().removeClass('layui-this').parent().removeClass('layui-show');
                switch (elem.prop('class')) {
                    case 'lau-tabs-close-this':THIS.tabCloseThis();break;
                    case 'lau-tabs-close-siblings':THIS.tabCloseSiblings();break;
                    case 'lau-tabs-close-all':THIS.tabCloseAll();break;
                }
            });
        }

        //监听锚点打开选项卡
        $(document).on('click', '*[lau-href], *[lau-id]', function () {
            var _this = $(this),
                href = _this.attr('lau-href'),
                layid = _this.attr('lau-id');
            if (_this.parents('.lau-nav-item')[0]) {
                if (!_this.next('.lau-nav-child')[0]) {
                    SINGLE ? THIS.location(href) : THIS.tabAdd(href, _this.find('cite').text(), _this.find('i').prop('class'), layid);
                }
            } else {
                var menu = findMenu($.trim(layid) || $.trim(href));
                if (menu[0]) {
                    menu.trigger('click');
                } else {
                    SINGLE ? THIS.location(href) : THIS.tabAdd(href, _this.attr('lau-title'), _this.attr('lau-icon'), layid);
                }
            }
        });

        //监听侧栏缩进
        $(document).on('click', '.lau-side-fold', function () {
            SIDE.toggleClass('lau-mini');
            layui.data('lau-side', {key: 'mini', value: SIDE.hasClass('lau-mini')});
            SINGLE || THIS.resize(200);
        });

        //监听菜单展开
        $(document).on('click', '.lau-nav-header', function () {
            var _this = $(this);
            _this.next()[0] ? _this.parent().toggleClass('lau-open').siblings().removeClass('lau-open') : _this.parent().siblings().removeClass('lau-open');
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
                SIDE.addClass('lau-mini') && SINGLE || THIS.resize(200);
            } else if (!sideStatus.mini && isMini) {
                SIDE.removeClass('lau-mini') && SINGLE || THIS.resize(200);
            }
        }, 1000);
    };

    exports('layout', new Layout());
});
