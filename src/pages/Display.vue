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
            links: this.link
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
    height: 500px;
  }

</style>
