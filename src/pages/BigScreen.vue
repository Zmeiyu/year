<template>
  <div class="main">
    <img src="../../static/image/head.png" alt="" class="img"/>
    <div id="myCharts" ref="myCharts" class="charts"></div>
  </div>
</template>

<script>
  export default {
    name: "BigScreen",
    data(){
      return{
        data:[],
        links:[],
        categories:[]
      }
    },
    methods:{
      getDataList(){
        this.axios
          .get("./../../static/json/bigscreen.json")
          .then(res => {
            console.log(res);
            this.data = res.data.dataList.data;
            this.links = res.data.dataList.links;
            this.categories = res.data.dataList.categories;
            this.creatEchatrs()
          })
          .catch(err => {
            console.log(err);
          });
      },
      creatEchatrs(){
        const  myCharts = this.$echarts.init(this.$refs.myCharts);
        let options = {
          tooltip: {
            show:false
          },
          toolbox: {
            show: false,
            feature: {
              // 数据视图
              dataView: {
                show: true,
                readOnly: true
              },
              // 重新刷新
              restore: {
                show: true
              },
              // 保存为图片
              saveAsImage: {
                show: true
              }
            }
          },// 工具盒
          animationDuration: 3000,
          animationEasingUpdate: 'quinticInOut',
          series: [{
            name: '北京银行',
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 200
            },
            data: this.data,
            links: this.links,
            categories: this.categories,
            focusNodeAdjacency: true,
            roam: false, // 是否可拖拽和滑轮滚动
            label: {
              color:'#fff',
              normal: {
                show: true,
                position: 'top',
              }
            },
            lineStyle: {
              normal: {
                color: 'source',
                curveness: 0,
                type: "solid"
              }
            }
          }]
        };
        myCharts.setOption(options);
      }
    },
    mounted() {
     this.getDataList();
    },
  }
</script>

<style>
*{
  margin:0;
  padding:0;
}
.main{
  background-image: url("../../static/image/bg@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 721px;
  width: 100%;
}
.charts{
  width: 80%;
  height: 600px;
  margin: 0 auto;
}
.img{
  width: inherit;
}
@media screen and (min-width:1900px){
  .main{
    height: 1080px;
  }
  .charts{
    width: 90%;
    height: 680px;
    margin-top: 8%;
  }
  .img{
  }
}
</style>
