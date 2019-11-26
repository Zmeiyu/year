<template>
  <div class="main">
    <img src="../../static/image/head.png" alt="" class="img"/>
    <div class="title">北京银行</div>
    <div class="numDisplay">
      <div class="items" v-for="(item,index) in dataList">
        <div class="headSpan">{{represent[index]}}</div>
        <img src="../../static/image/num_top.png" alt=""/>
        <div class="num">
          <div class="number">{{item}}</div>
          <div class="unit">亿条</div>
        </div>
        <img src="../../static/image/num_btm.png" alt=""/>
      </div>
    </div>
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
        categories:[],
        dataList:['33,225,860,964','880,225,860,964'],
        represent:['北京银行全量客户数','标签总数量']
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
                color: 'rgb(66,64,86)',
                curveness: 0,
                width:2,
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
.title{
  width: 100%;
  text-align: center;
  font-size: 35px;
  font-family: PingFang SC,serif;
  font-weight: bold;
  color: rgba(255,255,255,1);
  background: linear-gradient(180deg,rgba(80,184,252,0.37) 0%, rgba(255,255,255,0.92) 56.2255859375%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  top: 1%;
}
.numDisplay{
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.items{
  display: flex;
  flex-direction: column;
}
.num{
  display: flex;
  align-items: center;
  justify-content: center;
}
.number{
  color: #fff;
  font-size: 35px;
  font-weight:bold;
}
.unit{
  color: #fff;
  font-family:PingFang SC,serif;
  font-size: 20px;
  margin-left: 3%;
}
.headSpan{
  color: rgb(0,190,216);
  font-size: 20px;
  margin-bottom: 1%;
  margin-left: 2%;
}
@media screen and (min-width:1900px){
  .main{
    height: 1080px;
  }
  .charts{
    width: 90%;
    height: 690px;
    margin-top: 8%;
  }
  .img{
  }
}
</style>
