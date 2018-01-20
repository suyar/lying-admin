layui.define(function(exports) {
    var layuiTheme = {
        color: ["#009688", "#1E9FFF", "#5FB878", "#FFB980", "#D87A80", "#8d98b3", "#e5cf0d", "#97b552", "#95706d", "#dc69aa", "#07a2a4", "#9a7fd1", "#588dd5", "#f5994e", "#c05050", "#59678c", "#c9ab00", "#7eb00a", "#6f5553", "#c14089"],
        title: {
            textStyle: {
                fontWeight: "normal",
                color: "#666"
            }
        },
        dataRange: {
            itemWidth: 15,
            color: ["#009688", "#e0ffff"]
        },
        toolbox: {
            color: ["#1e90ff", "#1e90ff", "#1e90ff", "#1e90ff"],
            effectiveColor: "#ff4500"
        },
        tooltip: {
            backgroundColor: "rgba(50,50,50,0.5)",
            axisPointer: {
                type: "line",
                lineStyle: {
                    color: "#009688"
                },
                crossStyle: {
                    color: "#008acd"
                },
                shadowStyle: {
                    color: "rgba(200,200,200,0.2)"
                }
            }
        },
        dataZoom: {
            dataBackgroundColor: "#efefff",
            fillerColor: "rgba(182,162,222,0.2)",
            handleColor: "#008acd"
        },
        grid: {
            borderColor: "#eee"
        },
        categoryAxis: {
            axisLine: {
                lineStyle: {
                    color: "#009688"
                }
            },
            axisTick: {
                show: !1
            },
            splitLine: {
                lineStyle: {
                    color: ["#eee"]
                }
            }
        },
        valueAxis: {
            axisLine: {
                lineStyle: {
                    color: "#009688"
                }
            },
            splitArea: {
                show: !0,
                areaStyle: {
                    color: ["rgba(250,250,250,0.1)", "rgba(200,200,200,0.1)"]
                }
            },
            splitLine: {
                lineStyle: {
                    color: ["#eee"]
                }
            }
        },
        polar: {
            axisLine: {
                lineStyle: {
                    color: "#ddd"
                }
            },
            splitArea: {
                show: !0,
                areaStyle: {
                    color: ["rgba(250,250,250,0.2)", "rgba(200,200,200,0.2)"]
                }
            },
            splitLine: {
                lineStyle: {
                    color: "#ddd"
                }
            }
        },
        timeline: {
            lineStyle: {
                color: "#009688"
            },
            controlStyle: {
                normal: {
                    color: "#009688"
                },
                emphasis: {
                    color: "#009688"
                }
            },
            symbol: "emptyCircle",
            symbolSize: 3
        },
        bar: {
            itemStyle: {
                normal: {
                    barBorderRadius: 2
                },
                emphasis: {
                    barBorderRadius: 2
                }
            }
        },
        line: {
            smooth: !0,
            symbol: "emptyCircle",
            symbolSize: 3
        },
        k: {
            itemStyle: {
                normal: {
                    color: "#d87a80",
                    color0: "#2ec7c9",
                    lineStyle: {
                        color: "#d87a80",
                        color0: "#2ec7c9"
                    }
                }
            }
        },
        scatter: {
            symbol: "circle",
            symbolSize: 4
        },
        radar: {
            symbol: "emptyCircle",
            symbolSize: 3
        },
        map: {
            itemStyle: {
                normal: {
                    areaStyle: {
                        color: "#ddd"
                    },
                    label: {
                        textStyle: {
                            color: "#d87a80"
                        }
                    }
                },
                emphasis: {
                    areaStyle: {
                        color: "#fe994e"
                    }
                }
            }
        },
        force: {
            itemStyle: {
                normal: {
                    linkStyle: {
                        color: "#1e90ff"
                    }
                }
            }
        },
        chord: {
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: "rgba(128, 128, 128, 0.5)",
                    chordStyle: {
                        lineStyle: {
                            color: "rgba(128, 128, 128, 0.5)"
                        }
                    }
                },
                emphasis: {
                    borderWidth: 1,
                    borderColor: "rgba(128, 128, 128, 0.5)",
                    chordStyle: {
                        lineStyle: {
                            color: "rgba(128, 128, 128, 0.5)"
                        }
                    }
                }
            }
        },
        gauge: {
            axisLine: {
                lineStyle: {
                    color: [[.2, "#2ec7c9"], [.8, "#5ab1ef"], [1, "#d87a80"]],
                    width: 10
                }
            },
            axisTick: {
                splitNumber: 10,
                length: 15,
                lineStyle: {
                    color: "auto"
                }
            },
            splitLine: {
                length: 22,
                lineStyle: {
                    color: "auto"
                }
            },
            pointer: {
                width: 5
            }
        },
        textStyle: {
            fontFamily: "微软雅黑, Arial, Verdana, sans-serif"
        }
    };

    var vintage = {
        color: ['#d87c7c','#919e8b', '#d7ab82',  '#6e7074','#61a0a8','#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'],
        backgroundColor: '#fef8ef',
        graph: {
            color: colorPalette
        }
    };

    var colorPalette = [
        '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
    ];
    var macarons = {
        color: colorPalette,
        title: {
            textStyle: {
                fontWeight: 'normal',
                color: '#008acd'
            }
        },
        visualMap: {
            itemWidth: 15,
            color: ['#5ab1ef','#e0ffff']
        },
        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: colorPalette[0]
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(50,50,50,0.5)',
            axisPointer : {
                type : 'line',
                lineStyle : {
                    color: '#008acd'
                },
                crossStyle: {
                    color: '#008acd'
                },
                shadowStyle : {
                    color: 'rgba(200,200,200,0.2)'
                }
            }
        },
        dataZoom: {
            dataBackgroundColor: '#efefff',
            fillerColor: 'rgba(182,162,222,0.2)',
            handleColor: '#008acd'
        },
        grid: {
            borderColor: '#eee'
        },
        categoryAxis: {
            axisLine: {
                lineStyle: {
                    color: '#008acd'
                }
            },
            splitLine: {
                lineStyle: {
                    color: ['#eee']
                }
            }
        },
        valueAxis: {
            axisLine: {
                lineStyle: {
                    color: '#008acd'
                }
            },
            splitArea : {
                show : true,
                areaStyle : {
                    color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)']
                }
            },
            splitLine: {
                lineStyle: {
                    color: ['#eee']
                }
            }
        },
        timeline : {
            lineStyle : {
                color : '#008acd'
            },
            controlStyle : {
                normal : { color : '#008acd'},
                emphasis : { color : '#008acd'}
            },
            symbol : 'emptyCircle',
            symbolSize : 3
        },
        line: {
            smooth : true,
            symbol: 'emptyCircle',
            symbolSize: 3
        },
        candlestick: {
            itemStyle: {
                normal: {
                    color: '#d87a80',
                    color0: '#2ec7c9',
                    lineStyle: {
                        color: '#d87a80',
                        color0: '#2ec7c9'
                    }
                }
            }
        },
        scatter: {
            symbol: 'circle',
            symbolSize: 4
        },
        map: {
            label: {
                normal: {
                    textStyle: {
                        color: '#d87a80'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#eee',
                    areaColor: '#ddd'
                },
                emphasis: {
                    areaColor: '#fe994e'
                }
            }
        },
        graph: {
            color: colorPalette
        },
        gauge : {
            axisLine: {
                lineStyle: {
                    color: [[0.2, '#2ec7c9'],[0.8, '#5ab1ef'],[1, '#d87a80']],
                    width: 10
                }
            },
            axisTick: {
                splitNumber: 10,
                length :15,
                lineStyle: {
                    color: 'auto'
                }
            },
            splitLine: {
                length :22,
                lineStyle: {
                    color: 'auto'
                }
            },
            pointer : {
                width : 5
            }
        }
    };

    var contrastColor = '#eee';
    var axisCommon = function () {
        return {
            axisLine: {
                lineStyle: {
                    color: contrastColor
                }
            },
            axisTick: {
                lineStyle: {
                    color: contrastColor
                }
            },
            axisLabel: {
                textStyle: {
                    color: contrastColor
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#aaa'
                }
            },
            splitArea: {
                areaStyle: {
                    color: contrastColor
                }
            }
        };
    };
    var colorPalette = ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'];
    var dark = {
        color: colorPalette,
        backgroundColor: '#333',
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: contrastColor
                },
                crossStyle: {
                    color: contrastColor
                }
            }
        },
        legend: {
            textStyle: {
                color: contrastColor
            }
        },
        textStyle: {
            color: contrastColor
        },
        title: {
            textStyle: {
                color: contrastColor
            }
        },
        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: contrastColor
                }
            }
        },
        dataZoom: {
            textStyle: {
                color: contrastColor
            }
        },
        timeline: {
            lineStyle: {
                color: contrastColor
            },
            itemStyle: {
                normal: {
                    color: colorPalette[1]
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: contrastColor
                    }
                }
            },
            controlStyle: {
                normal: {
                    color: contrastColor,
                    borderColor: contrastColor
                }
            }
        },
        timeAxis: axisCommon(),
        logAxis: axisCommon(),
        valueAxis: axisCommon(),
        categoryAxis: axisCommon(),

        line: {
            symbol: 'circle'
        },
        graph: {
            color: colorPalette
        },
        gauge: {
            title: {
                textStyle: {
                    color: contrastColor
                }
            }
        },
        candlestick: {
            itemStyle: {
                normal: {
                    color: '#FD1050',
                    color0: '#0CF49B',
                    borderColor: '#FD1050',
                    borderColor0: '#0CF49B'
                }
            }
        }
    };
    dark.categoryAxis.splitLine.show = false;
    exports('echartsTheme', {
        layui: layuiTheme,
        vintage: vintage,
        macarons: macarons,
        dark: dark
    });
});