<template>
  <div class="box">
    <div id="myCharts" ref="myCharts"></div>

  </div>

</template>

<script>
  export default {
    name: "Display",
    data(){
      return{
        data:[],
        link:[]
      }
    },
    mounted() {
      this.getDataList();
    },
    methods:{
      getDataList(){
        this.axios
          .get("./../../static/json/display.json")
          .then(res => {
            console.log(res);
            this.data = res.data.dataList.data;
            this.link = res.data.dataList.links;
            this.caretEcharts()
          })
          .catch(err => {
            console.log(err);
          });
      },
      caretEcharts(){
        const  myCharts = this.$echarts.init(this.$refs.myCharts);
        let option = {
          //tooltip: {},
          //animationDurationUpdate: 1500,
          //animationEasingUpdate: 'quinticInOut',
          series: {
            type: 'graph',
            layout: 'none',
            symbolSize: 17, //图形的大小（示例中的圆的大小）
            roam: true, //鼠标缩放及平移
            focusNodeAdjacency: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            label: {
              normal: {
                show: true, //控制非高亮时节点名称是否显示
                position: 'top',
                fontSize: 20
              }
            },
            data:this.data,
            links:this.link,

            tooltip: {
              position: 'bottom', //悬浮时显示的位置
              backgroundColor: 'green',
              textStyle: {
                fontSize: 18,
              },
            }, //悬浮时的提示框，不设置时是随鼠标移动
          }
        };
        myCharts.setOption(option);
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .box{
    width: 100%;
    height: 100%;
  }
  #myCharts{
    width: 100%;
    height: 1080px;
    background: url("./../../static/image/bg@2x.png") no-repeat;
    background-size: cover;

  }

</style>
