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
          series: {
            type: 'sankey',
            layout: 'none',
            focusNodeAdjacency: 'allEdges',
            data:this.data,
            links: this.link,
            lineStyle: {
              normal: {
                curveness: 0,
                opacity:0.5,
                color: '#5CA1DF'
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0,
                borderColor: '#fff',
                opacity:1
              }
            },
            label:{
              normal: {
                align: 'center',
                padding: [0, 0, 0, -90],
                fontSize:'14',
                color: '#5CA1DF'
              }
            },
          }
        };
        myCharts.setOption(option);
      }
    }
  }
</script>

<style scoped>
  .box{
    width: 100%;
    height: 100%;
    /*background: #07062C;*/
  }
  #myCharts{
    width: 80%;
    height: 1000px;
  }

</style>
