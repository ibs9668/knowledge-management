/**
 * Created by Administrator on 2016/11/25.
 */
Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};
var group_list=[];
var groupname,groupname1,ii,jj,node_ids=[];
function qunti(value) {
    groupname=value;
    jj=1;
}
function qunti1(value) {
    groupname1=value;
    ii=1;
};

$("#container .choose1 .menu .msure").on('click',function () {
    if (!jj==1){
        $("#join99").modal("show");
    }else {
        window.open('/group/detail/?group_name='+groupname);
    }
});
$('.condet4').on('click',function () {
    if (group_list.length==2) {
        window.open("/group/comparison/?group_name1="+group_list[0]+'&group_name2='+group_list[1]);
    }else{
        $('#liangge').modal("show");
    };
    // $('#aaa').modal("show");
});

function zongqunti() {
    function place() {
        //this.ajax_method='GET'; // body...
    }
    place.prototype= {
        call_request:function(url,callback) {
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                async: true,
                success:callback
            });
        },
    };
    function territory(data) {
        var data=eval(data);
        var anlname=[],anlnum=[];
        $.each(data,function (index,item) {
            $("#container .choose1 .menu form #list").append('<option value="'+item[0]+'">'+item[0]+'</option>');
            $(".xinzeng #list1").append('<option value="'+item[0]+'">'+item[0]+'</option>');
            $("#container .choose1 .menu #condet .condet111").before('<span class="condet2"><i>'+item[0]+'</i></span>')
            anlname.push(item[0]);
            anlnum.push(item[1]);
        });
        var condet2_g=$('#container .choose1 .menu #condet .condet2');
        $.each(condet2_g,function (index,item) {
            var gg=1;
            $(item).on('click',function () {
                if (gg==1){
                    $(this).css({backgroundColor:'rgb(76, 174, 76)'});
                    gg=2;
                    group_list.push($(this).find('i').html());
                }else {
                    $(this).css({backgroundColor:'#0099FF'});
                    var $a = $(this).find('i').html();
                    group_list.removeByValue($a);
                    gg=1;
                }
            });
        });

        // 路径配置
        require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
        });
        //第一个图表
        require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('spread'));
                var option = {
                    // title: {
                    //     x: 'center',
                    //     text: '专题名称',
                    // subtext: 'Rainbow bar example',
                    // link: 'http://echarts.baidu.com/doc/example.html'
                    // },
                    tooltip: {
                        trigger: 'item'
                    },
                    grid: {
                        borderWidth: 0,
                        y: 80,
                        y2: 60
                    },
                    xAxis: [
                        {
                            type: 'category',
                            show: false,
                            // data: ['Line', 'Bar', 'Scatter', 'K', 'Pie', 'Radar', 'Chord', 'Force', 'Map', 'Gauge', 'Funnel']
                            data:anlname,
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            show: false
                        }
                    ],
                    clickable : true,
                    series: [
                        {
                            // name: 'ECharts例子个数统计',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        // build a color map as your need.
                                        var colorList = [
                                            '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                            '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                        ];
                                        return colorList[params.dataIndex]
                                    },
                                    label: {
                                        show: true,
                                        position: 'top',
                                        formatter: '{b}\n{c}'
                                    }
                                }
                            },
                            // data: [12,21,10,4,12,5,6,5,25,23,7],
                            data:anlnum,
                        }
                    ]
                };
                // 为echarts对象加载数据
                myChart.setOption(option);
                var ecConfig = require('echarts/config');
                function eConsole(param) {
                    if (typeof param.seriesIndex != 'undefined') {
                        window.open('/group/detail/?group_name='+param.name);
                    }
                }
                myChart.on(ecConfig.EVENT.CLICK, eConsole);
            }
        );

    };
    var place=new place();
    function nums() {
        var url = '/group/overview/';
        place.call_request(url,territory);
    }
    nums();
};
zongqunti();

function quntibiaoge() {
    function place() {
        //this.ajax_method='GET'; // body...
    }
    place.prototype= {
        call_request:function(url,callback) {
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                async: true,
                success:callback
            });
        },
    };
    function territory(data) {
        var data=eval(data);
        $('#sheet2').bootstrapTable('load',data);
        $('#sheet2').bootstrapTable({
            //url: influ_url,
            data:data,
            search: true,//是否搜索
            pagination: true,//是否分页
            pageSize: 3,//单页记录数
            pageList: [6, 12, 20],//分页步进值
            sidePagination: "client",//服务端分页
            searchAlign: "left",
            searchOnEnterKey: false,//回车搜索
            showRefresh: true,//刷新按钮
            showColumns: true,//列选择按钮
            buttonsAlign: "right",//按钮对齐方式
            locale: "zh-CN",//中文支持
            detailView: false,
            showToggle:true,
            sortName:'bci',
            sortOrder:"desc",
            columns: [
                {
                    title: "序号",//标题
                    field: "",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },
                {
                    title: "用户名",//标题
                    field: "",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        if(row[1]==''||row[1]=='unknown'){
                            return row[0];
                        }else {
                            return row[1];
                        }
                    },
                },
                {
                    title: "删除",//标题
                    field: "",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        return "<a class='delt' data-toggle='modal'>删除</a>";
                    },
                },

            ],
            onClickRow: function (row, tr) {
                if ($(tr.context).index()==2) {
                    del_uid=row[0];
                    $('#del_ject').modal("show");
                }
            }

        });
    };
    var place=new place();
    function nums() {
        var url = '/group/uid_in_group/?group_name='+groupname1;
        // var url = '/theme/event_in_theme/';
        place.call_request(url,territory);
    }
    $(".xinzeng .add99").on('click',function () {
        $('#container .xinzeng .instr #tbrg #case2 #run3').empty();
        if (!ii==1){
            $("#join99").modal("show");
        }else {
            nums();
            biaogequnti();
            $('.instr').show(20);
        }
    });


};
quntibiaoge();

function biaogequnti() {
    function touch() {
        //this.ajax_method='GET'; // body...
    }
    touch.prototype= {
        call_request:function(url,callback) {
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                async: true,
                success:callback
            });
        },
    };
    function things(data) {
        var data=eval(data);
        cwidth=data.length;
        var str='';
        function getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,18);
        };
        var weizhi,biaoqian,shuoming,photo,cwidth;
        $.each(data,function (index,item) {
            var influe,name,mingan,tag,photo,fensinum;
            var fensi=Math.round((item.fansnum /10000) * 100) / 100;
            if (fensi.toString().length>6){
                fensinum=fensi.toFixed(2).substr(0,6)+'万';
            }else {
                fensinum=fensi.toFixed(2)+'万';
            };
            if (item.influence==''||item.influence=='unknown'){
                influe=0;
            }else {
                var yingxiang=Math.round((item.influence /10000) * 100) / 100;
                if (yingxiang.toString().length>6){
                    influe=yingxiang.toFixed(2).substr(0,6)+'万';
                }else {
                    influe=yingxiang.toFixed(2)+'万';
                };
            };
            if (item.uname==''||item.uname=='unknown'){
                name=item.uid;
            }else {
                name=item.uname;
            };
            var huoyue=item.activeness.toFixed(0);
            if (item.sensitive==''||item.sensitive=='unknown'){
                mingan=0;
            }else {
                mingan=item.sensitive.toFixed(0);
            };
            if (item.user_tag==''||item.user_tag=='unknown'||item.user_tag=='null'){
                tag='无';
            }else {
                tag=item.user_tag;
            };
            if (item.photo_url==''||item.photo_url=='unknown'){
                photo='/static/image/pangzi.png';
            }else {
                photo=item.photo_url;
            };
            str+='<div class="play">'+
                '<div class="p_top" style="width: 100%"><img class="play2" src="'+photo+'" alt="">'+
                '<img class=\'xin\' style="margin: -24px 0 0 100px" src="/static/image/heart.png">' +
                '<span class="xingming" title="'+name+'" style="color: #000;display: block;text-align:center;' +
                'width:100px;white-space:nowrap;margin: -13px auto 0;overflow: hidden;text-overflow: ellipsis">'+name+'</span>'+
                '</div>'+
                '<div class="play23" style="width: 110px;text-align: left;float: left">'+
                '<a class="renzh1">身&nbsp;&nbsp;&nbsp;份:<span class="renzh11">'+item.domain+'</span></a>'+
                '<a class="renzh2">领&nbsp;&nbsp;&nbsp;域:<span title="'+item.topic_string.replace(/&/g,'  ')+'" class="renzh22">'+item.topic_string.replace(/&/g,'  ')+'</span></a>'+
                '</div>'+
                '<div style="float: left;width: 110px;margin-left: 10px">' +
                '<div class="play3" style="text-align: left">'+
                '<a class="bus1">业务标签：</a>'+
                '<a class="bus2" title="'+tag+'">'+tag+'</a>'+
                '</div>'+
                '<div class="play1">'+
                '<div class="p11">'+
                '<span id="uid" style="display: none">'+item.uid+'</span>'+
                '</div>'+
                '<div class="p22" style="float:left;margin-top: -5px">'+
                '<div><img src="/static/image/fensishu.png"'+
                'title=\'粉丝数\'><!--'+
                '--><span class="difang" style="display: inline-block;width:50.06px;">'+fensinum+'</span>'+
                '<img src="/static/image/mingan.png" title="敏感度">'+
                '<span class="mingan">'+mingan+'</span></div>'+
                '<div><img src="/static/image/influence.png" title="影响力">'+
                '<span class="influence" style="display: inline-block;width:50.06px;">'+influe+'</span>'+
                '<img src="/static/image/huoyuedu.png" title="活跃度">'+
                '<span class="huoyuedu">'+huoyue+'</span></div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<!--<div class="play4">-->'+
                '<!--<p class="shuoming">-->'+
                '<!--徐玉玉接到骗子电话后被骗9900元学费，报案回来的路上心脏骤停，离世。-->'+
                '<!--</p>-->'+
                '<!--</div>-->'+
                '<div class="play5" type="button" data-toggle="modal">'+
                '<a>加入群体探索</a>'+
                '</div>'+
                '</div>';
        });
        $(".xinzeng .instr #tbrg .sjmr1 #case2 #run3").append(str);
        var step=0;
        var shang=Math.floor(cwidth/6);
        var yu=cwidth%6;
        $('#container .xinzeng .instr #tbrg .sjmr1 #case2 #run3').width((3*shang+yu)*245);
        $('#container .xinzeng .instr #tbrg .sjmr1 .right').on('click',function () {
            if (cwidth<=6){
                alert('没有其他卡片内容了~~');
            }else {
                step++;
                var plays=$("#container .xinzeng .instr #tbrg .sjmr1 #case2 #run3");
                walk=(-735)*step;
                $(plays).css({
                    "-webkit-transform":"translateX("+walk+"px)",
                    "-moz-transform":"translateX("+walk+"px)",
                    "-ms-transform":"translateX("+walk+"px)",
                    "-o-transform":"translateX("+walk+"px)",
                    "transform":"translateX("+walk+"px)",
                });
                if (step >= data.length/6){
                    alert('已经是最后一页了~~');
                    $(plays).css({
                        "-webkit-transform":"translateX(0px)",
                        "-moz-transform":"translateX(0px)",
                        "-ms-transform":"translateX(0px)",
                        "-o-transform":"translateX(0px)",
                        "transform":"translateX(0px)",
                    });
                    step=0;
                }
            }
        });
        $('#container .xinzeng .instr #tbrg .sjmr1 .left').on('click',function () {
            if (cwidth<=6){
                alert('没有其他卡片内容了~~');
            }else {
                step--;
                if (step < 0){
                    alert('已经是第一页了~~');
                    step=0;
                }else {
                    var plays=$("#container .xinzeng .instr #tbrg .sjmr1 #case2 #run3");
                    walk=(-735)*step;
                    $(plays).css({
                        "-webkit-transform":"translateX("+walk+"px)",
                        "-moz-transform":"translateX("+walk+"px)",
                        "-ms-transform":"translateX("+walk+"px)",
                        "-o-transform":"translateX("+walk+"px)",
                        "transform":"translateX("+walk+"px)",
                    });
                }
            };

        });
        //卡片效果
        var heart=$(".play .xin");
        $.each(heart,function(index,item){
            var chan=1;
            $(item).on('click',function(){
                if (chan==1) {
                    $(this).attr('src','/static/image/focus.png');
                    chan=2;
                }else {
                    $(this).attr('src','/static/image/heart.png');
                    chan=1;
                }
            })
        });
        $.each( $(".xingming"),function(index,item){
            $(item).on('click',function(){
                window.open('/index/person/?p_uid='+$(this).parents('.play').find('#uid').html());
            })
        })
    };
    var touch=new touch();
    function nums() {
        var url = '/group/user_in_group/?group_name='+groupname1;
        touch.call_request(url,things);
    }
    nums();
};

function yonghushijian() {
    function place() {
        //this.ajax_method='GET'; // body...
    }
    place.prototype= {
        call_request:function(url,callback) {
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                async: true,
                success:callback
            });
        },
    };
    function territory(data) {
        if (data=="node does not exist"){
            alert('无新数据更新');
        }else {
            $(".xinzeng .add #shijian2 .bag").show(20);
            var json=eval(data);
            var myChart = echarts.init(document.getElementById('site'));
            myChart.showLoading();
            var node_value=[],link_value=[];
            for (var key in json.user_nodes){
                var num1=Math.random()*(-1000-700)+1000;
                var num2=Math.random()*(-1000-700)+1000;
                var name;
                if (json.user_nodes[key]==''||json.user_nodes[key]=="unknown") {
                    name=key;
                }else {
                    name=json.user_nodes[key];
                };
                node_value.push(
                    {
                        x: num1,
                        y: num2,
                        id: key,
                        name:name,
                        symbolSize: 14,
                        itemStyle: {
                            normal: {
                                color: '#00cc66'
                            }
                        }
                    }
                );
            };
            for (var key2 in json.event_nodes){
                var num3=Math.random()*(-1000-700)+1000;
                var num4=Math.random()*(-1000-700)+1000;
                var name2;
                if (json.event_nodes[key2]==''||json.event_nodes[key2]=="unknown") {
                    name2=key2;
                }else {
                    name2=json.event_nodes[key2];
                }
                node_value.push(
                    {
                        x: num3,
                        y: num4,
                        id: key2,
                        name:name2,
                        symbolSize: 14,
                        itemStyle: {
                            normal: {
                                color: '#a73cff'
                            }
                        }
                    }
                );
            };
            $.each(json.relation,function (index,item) {
                link_value.push(
                    {
                        source: item[0],
                        target: ""+item[2]+""
                    }
                );
            });
            myChart.hideLoading();
            myChart.setOption(option = {
                title: {
                    // text: 'NPM Dependencies'
                },
                legend: {
                    // data: ["人物","事件"]
                    // data:categories.map(function (a) {
                    //     return a;
                    // })
                },
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series : [
                    {
                        // name:'人物',
                        type: 'graph',
                        layout: 'none',
                        // progressiveThreshold: 700,
                        data: node_value,
                        edges: link_value,
                        itemStyle:{
                            normal:{
                                color:'#00cc66'
                            }
                        },
                        label: {
                            emphasis: {
                                position: 'right',
                                show: true
                            }
                        },
                        focusNodeAdjacency: true,
                        lineStyle: {
                            normal: {
                                width: 1.5,
                                curveness: 0.3,
                                opacity: 0.8
                            }
                        }
                    },
                ]
            }, true);
            var ecConfig = require('echarts/config');
            function eConsole(param) {
                if (typeof param.seriesIndex != 'undefined') {
                    if (param.color=='#a73cff'){
                        window.open('/index/search_result/?t_uid='+param.name);
                    }else {
                        window.open('/index/person/?p_uid='+param.data.id);
                    }

                }
            }
            myChart.on(ecConfig.EVENT.CLICK, eConsole);
        }

    }
    function place2() {
        //this.ajax_method='GET'; // body...
    }
    place2.prototype= {
        call_request:function(url2,callback) {
            $.ajax({
                url: url2,
                type: 'GET',
                dataType: 'json',
                async: true,
                success:callback
            });
        },
    };
    function territory2(data) {
        if (data=="node does not exist"){
            null;
        }else {
            var data=eval(data);
            var str='';
            function getLocalTime(nS) {
                return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,18);
            };
            var weizhi,biaoqian,shuoming,cwidth;
            $.each(data,function (index,item) {
                var influe,name,mingan,tag,photo,fensinum;
                var fensi=Math.round((item.fansnum /10000) * 100) / 100;
                if (fensi.toString().length>6){
                    fensinum=fensi.toFixed(2).substr(0,6)+'万';
                }else {
                    fensinum=fensi.toFixed(2)+'万';
                };
                if (item.influence==''||item.influence=='unknown'){
                    influe=0;
                }else {
                    var yingxiang=Math.round((item.influence /10000) * 100) / 100;
                    if (yingxiang.toString().length>6){
                        influe=yingxiang.toFixed(2).substr(0,6)+'万';
                    }else {
                        influe=yingxiang.toFixed(2)+'万';
                    };
                };
                if (item.uname==''||item.uname=='unknown'){
                    name=item.uid;
                }else {
                    name=item.uname;
                };
                var huoyue=item.activeness.toFixed(0);
                if (item.sensitive==''||item.sensitive=='unknown'){
                    mingan=0;
                }else {
                    mingan=item.sensitive.toFixed(0);
                };
                if (item.user_tag==''||item.user_tag=='unknown'||item.user_tag=='null'){
                    tag='无';
                }else {
                    tag=item.user_tag;
                };
                if (item.photo_url==''||item.photo_url=='unknown'){
                    photo='/static/image/pangzi.png';
                }else {
                    photo=item.photo_url;
                };
                str+='<div class="play">'+
                    '<div class="p_top" style="width: 100%"><img class="play2" src="'+photo+'" alt="">'+
                    '<img class=\'xin\' style="margin: -24px 0 0 100px" src="/static/image/heart.png">' +
                    '<span class="xingming" title="'+name+'" style="color: #000;display: block;text-align:center;' +
                    'width:100px;white-space:nowrap;margin: -13px auto 0;overflow: hidden;text-overflow: ellipsis">'+name+'</span>'+
                    '</div>'+
                    '<div class="play23" style="width: 110px;text-align: left;float: left">'+
                    '<a class="renzh1">身&nbsp;&nbsp;&nbsp;份:<span title="'+item.domain+'" class="renzh11">'+item.domain+'</span></a>'+
                    '<a class="renzh2">话&nbsp;&nbsp;&nbsp;题:<span title="'+item.topic_string.replace(/&/g,'  ')+'" class="renzh22">'+item.topic_string.replace(/&/g,'  ')+'</span></a>'+
                    '</div>'+
                    '<div style="float: left;width: 110px;margin-left: 10px">' +
                    '<div class="play3" style="text-align: left">'+
                    '<a class="bus1">业务标签：</a>'+
                    '<a class="bus2" title="'+tag+'">'+tag+'</a>'+
                    '</div>'+
                    '<div class="play1">'+
                    '<div class="p11">'+
                    '<span id="uid" style="display: none">'+item.uid+'</span>'+
                    '</div>'+
                    '<div class="p22" style="float:left;margin-top: -5px">'+
                    '<div><img src="/static/image/fensishu.png"'+
                    'title=\'粉丝数\'><!--'+
                    '--><span class="difang" style="display: inline-block;width:50.06px;">'+fensinum+'</span>'+
                    '<img src="/static/image/mingan.png" title="敏感度">'+
                    '<span class="mingan">'+mingan+'</span></div>'+
                    '<div><img src="/static/image/influence.png" title="影响力">'+
                    '<span class="influence" style="display: inline-block;width:50.06px;">'+influe+'</span>'+
                    '<img src="/static/image/huoyuedu.png" title="活跃度">'+
                    '<span class="huoyuedu">'+huoyue+'</span></div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<!--<div class="play4">-->'+
                    '<!--<p class="shuoming">-->'+
                    '<!--徐玉玉接到骗子电话后被骗9900元学费，报案回来的路上心脏骤停，离世。-->'+
                    '<!--</p>-->'+
                    '<!--</div>-->'+
                    '<div class="play5" type="button" data-toggle="modal">'+
                    '<a>加入群体探索</a>'+
                    '</div>'+
                    '</div>';
            });
            $(".xinzeng #shijian2 .sjmr .sjmr1 #case #crmid #run").append(str);

            var step=0;
            var shang=Math.floor(data.length/6);
            var yu=data.length%6;
            $('#container .xinzeng #shijian2 .sjmr .sjmr1 #case #crmid #run').width((3*shang+yu)*245);
            $('#container .xinzeng #shijian2 .bag .sjmr .sjmr1 .right').on('click',function () {
                if (data.length<=6){
                    alert('没有其他卡片内容了~~');
                }else {
                    step++;
                    var plays=$("#container .xinzeng #shijian2 .sjmr1 #case12 #crmid12 #run12");
                    walk=(-735)*step;
                    $(plays).css({
                        "-webkit-transform":"translateX("+walk+"px)",
                        "-moz-transform":"translateX("+walk+"px)",
                        "-ms-transform":"translateX("+walk+"px)",
                        "-o-transform":"translateX("+walk+"px)",
                        "transform":"translateX("+walk+"px)",
                    });
                    if (step >= data.length/6){
                        alert('已经是最后一页了~~');
                        $(plays).css({
                            "-webkit-transform":"translateX(0px)",
                            "-moz-transform":"translateX(0px)",
                            "-ms-transform":"translateX(0px)",
                            "-o-transform":"translateX(0px)",
                            "transform":"translateX(0px)",
                        });
                        step=0;
                    }
                }
            });
            $('#container .xinzeng #shijian2 .bag .sjmr .sjmr1 .left').on('click',function () {
                if (data.length<=6){
                    alert('没有其他卡片内容了~~');
                }else {
                    step--;
                    if (step < 0){
                        alert('已经是第一页了~~');
                        step=0;
                    }else {
                        var plays=$("#container .xinzeng #shijian2 .sjmr1 #case12 #crmid12 #run12");
                        walk=(-735)*step;
                        $(plays).css({
                            "-webkit-transform":"translateX("+walk+"px)",
                            "-moz-transform":"translateX("+walk+"px)",
                            "-ms-transform":"translateX("+walk+"px)",
                            "-o-transform":"translateX("+walk+"px)",
                            "transform":"translateX("+walk+"px)",
                        });
                    }
                };

            });
            //卡片效果
            var heart=$(".play .xin");
            $.each(heart,function(index,item){
                var chan=1;
                $(item).on('click',function(){
                    if (chan==1) {
                        $(this).attr('src','/static/image/focus.png');
                        chan=2;
                    }else {
                        $(this).attr('src','/static/image/heart.png');
                        chan=1;
                    }
                })
            });
            $.each($(".play"),function (index,item) {
                $(item).hover(function () {
                    $(item).find(".play5").css({
                        "-webkit-transform":"translateY(-40px)",
                        "-moz-transform":"translateY(-40px)",
                        "-ms-transform":"translateY(-40px)",
                        "-o-transform":"translateY(-40px)",
                        "transform":"translateY(-40px)",
                    })
                },function () {
                    $(item).find(".play5").css({
                        "-webkit-transform":"translateY(40px)",
                        "-moz-transform":"translateY(40px)",
                        "-ms-transform":"translateY(40px)",
                        "-o-transform":"translateY(40px)",
                        "transform":"translateY(40px)",
                    })
                });
            });
            $.each($(".play"),function (index,item) {
                var changecolor=1;
                $(item).find(".play5").on('click',function(){
                    if (changecolor==1) {
                        $(this).parent('.play').find('.xingming').css({color:'red'});
                        changecolor=2;
                        node_ids.push($(this).parents('.play').find('#uid').html());
                        $(this).find('a').text('取消群体探索');
                        $('#join3').modal("show");
                    } else {
                        $(this).parent('.play').find('.xingming').css({color:'#000'});
                        changecolor=1;
                        var $a = $(this).parents('.play').find('#uid').html();
                        node_ids.removeByValue($a);
                        $(this).find('a').text('加入群体探索');
                    }
                });
            });
            $.each( $(".xingming"),function(index,item){
                $(item).on('click',function () {
                    window.open('/index/person/?p_uid'+$(this).parents('.play').find('#uid').html());
                });
            });
        }
    };
    var place=new place();
    var place2=new place2();
    function nums(name) {
        var url = '/group/search_related_people/?item='+name;
        place.call_request(url,territory);
    };
    function nums2(name,maths) {
        var url2 = '/group/search_related_people_card/?item='+name+'&layer='+maths;
        place2.call_request(url2,territory2);
    };
    var maths='all',s;
    $("#shijian2 .sjt .sjt2").on('click',function () {
        $('#shijian2 .bag #site').empty();
        $('#shijian2 .bag .sjmr1 #crmid #run').empty();
        s=$("#shijian2 .sjt .sjt1").val();
        if (!s==''){
            nums(s);
            nums2(s,maths);
        }else {
            $('#join111').modal("show");
        };

    });

    $.each($("#shijian2 .bag .sjmr1 .direct1 input"),function (index,item) {
        $(item).on('click',function () {
            if (index==0){
                maths=1;
                nums2(s,maths);
            }else if (index==1){
                maths=2;
                nums2(s,maths);
            }else {
                maths='all';
                nums2(s,maths);
            }
        });

    });

};
yonghushijian();


function sureadd() {
    var node_ids2=node_ids.join(',');
    var addurl='/group/g_create_relation/?node1_id='+node_ids2+'&node2_id='+groupname1;
    $.ajax({
        url: addurl,
        type: 'GET',
        dataType: 'json',
        async: true,
        success:g_join
    });
    function g_join(data) {
        var data=eval(data);
        if (data==2){
            $('#chengong').modal("show");
        }else {
            $('#shibai').modal("show");
        }
    }
}

Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}


//群体编辑表格中删除
var del_uid;
function delete_yes() {
    var del_url='/group/del_user_in_group/?group_name='+groupname1+'&uid='+del_uid;
    console.log(del_url);
    $.ajax({
        url: del_url,
        type: 'GET',
        dataType: 'json',
        async: true,
        success:del_sure
    });
    function del_sure(data) {
        var data=eval(data);
        if (data=='true'){
            $("#del_sb").modal("show");
        }else {
            $("#del_cg").modal("show");
            window.location.reload();
        }
    }
}