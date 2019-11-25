<template>
  <div class="main">
    <img src="../../static/image/head.png" alt="" />
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
            name: '三国演义',
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 300
            },
            data: this.data,
            links: this.links,
            categories: this.categories,
            focusNodeAdjacency: true,
            roam: true, // 是否可拖拽和滑轮滚动
            label: {
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

<style scoped>
.main{
  background-image: url("../../static/image/bg@2x.png");
  background-repeat: no-repeat;
  background-size: contain;
  height: 1064px;
}
.charts{
  width: 80%;
  height: 80%;
  margin: 0 auto;
}
img{
  width: 100%;
}
</style>
