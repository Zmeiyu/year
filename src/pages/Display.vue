<template>
  <div class="box">
    <div class="txt">
      <img src="../../static/image/head.png" alt />
    </div>
    <div class="title">存量客户信息</div>
    <div id="myCharts" ref="myCharts"></div>
    <div class="right">
      <div id="myChart" ref="myChart"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: "Display",
  data() {
    return {
      data: [],
      link: []
    };
  },
  mounted() {
    this.getDataList();
    this.pointerEcharts();

    (function() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      document.querySelector(".box").style.backgroundSize = `${w}px ${h}px`;
    })();
  },
  methods: {
    getDataList() {
      this.axios
        .get("./../../static/json/display.json")
        .then(res => {
          console.log(res);
          this.data = res.data.dataList.data;
          this.link = res.data.dataList.links;
          this.caretEcharts();
        })
        .catch(err => {
          console.log(err);
        });
    },
    caretEcharts() {
      const myCharts = this.$echarts.init(this.$refs.myCharts);
      let option = {
        series: {
          type: "graph",
          layout: "none",
          symbolSize: 30, //图形的大小（示例中的圆的大小）
          // roam: true, //鼠标缩放及平移
          focusNodeAdjacency: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
          label: {
            normal: {
              show: true, //控制非高亮时节点名称是否显示
              position: "top",
              fontSize: 20,
              color: "#56F3FF"
            }
          },
          data: this.data,
          links: this.link,

          tooltip: {
            position: "bottom", //悬浮时显示的位置
            backgroundColor: "green",
            textStyle: {
              fontSize: 18
            }
          }, //悬浮时的提示框，不设置时是随鼠标移动
          lineStyle: {
            normal: {
              show: true,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#56F3FF" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#56F3FF" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            emphasis: {
              color: "#56F3FF",
              width: 3,
              type: "solid" //实线
            }
          }
        }
      };
      myCharts.setOption(option);
    },
    pointerEcharts() {
      var dataURL = "data/asset/data/fake-nebula.bin";
      var xhr = new XMLHttpRequest();
      xhr.open("GET", dataURL, true);
      xhr.responseType = "arraybuffer";
      const myChart = this.$echarts.init(this.$refs.myChart);

      xhr.onload = function(e) {
        var rawData = new ArrayBuffer(this.response);

        let option = {
          backgroundColor: "#191919",
          title: {
            left: "center",
            text:
              echarts.format.addCommas(Math.round(rawData.length / 2)) +
              " Points",
            subtext: "Fake data",
            textStyle: {
              color: "#eee"
            },
            subtextStyle: {
              color: "#999"
            }
          },
          tooltip: {},
          toolbox: {
            right: 20,
            iconStyle: {
              borderColor: "#eee"
            },
            feature: {
              dataZoom: {}
            }
          },
          grid: {
            right: 70,
            bottom: 70
          },
          xAxis: [
            {
              scalse: false,
              axisLabel: {
                color: "#ccc",
                fontSize: 16
              },
              splitLine: {
                lineStyle: {
                  color: "#555"
                }
              }
            }
          ],
          yAxis: [
            {
              scalse: false,
              axisLabel: {
                color: "#ccc",
                fontSize: 16
              },
              splitLine: {
                lineStyle: {
                  color: "#555"
                }
              }
            }
          ],
          dataZoom: [
            {
              type: "inside"
            },
            {
              type: "slider",
              showDataShadow: false,
              handleIcon:
                "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
              handleSize: "80%",
              handleStyle: {
                color: "#999",
                shadowBlur: 3,
                shadowColor: "rgba(0, 0, 0, 0.6)",
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            },
            {
              type: "inside",
              orient: "vertical"
            },
            {
              type: "slider",
              orient: "vertical",
              showDataShadow: false,
              handleIcon:
                "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
              handleSize: "80%",
              handleStyle: {
                color: "#999",
                shadowBlur: 3,
                shadowColor: "rgba(0, 0, 0, 0.6)",
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }
          ],
          animation: false,
          series: [
            {
              type: "scatter",
              data: rawData,
              dimensions: ["x", "y"],
              symbolSize: 3,
              itemStyle: {
                color: "#128de3",
                opacity: 0.4
              },
              blendMode: "lighter",
              large: true,
              largeThreshold: 500
            }
          ]
        };

        myChart.setOption(option);
      };

      xhr.send();
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.box {
  width: 100%;
  height: 100%;
  background: url("./../../static/image/bg@2x.png") no-repeat;
}
#myCharts {
  width: 1314px;
  height: 853px;
  position: relative;
  top: -55px;
  left: 10px;
}
.txt img {
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
}
.title {
  font-size: 25px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  text-shadow: 0px 2px 3px rgba(6, 56, 156, 1);
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translate(-60%, -50%);
}
.right {
  width: 689px;
  height: 527px;
  position: absolute;
  top: 217px;
  left: 1155px;
  background: url("./../../static/image/redult_show.png") no-repeat;
}
.right #pointCharts {
  width: 560px;
  height: 418px;
  margin: 0 auto;
}
</style>
