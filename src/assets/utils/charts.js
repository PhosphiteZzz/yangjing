
const barOption = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisLabel: {
      show: true,
      textStyle: {
        color: "#333"
      }
    }
  },
  yAxis: {
    type: "value",
    axisLine: { show: true },
    axisTick: { show: true },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#eeeeee"],
        width: 1,
        type: "dashed"
      }
    }
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      barWidth: "45",
      type: "bar",
      itemStyle: {
        normal: {
          color: function(params) {
            if (params.dataIndex === 0) {
              return "#5AB0FC";
            }
            if (params.dataIndex === 1) {
              return "#68D08A";
            }
            if (params.dataIndex === 2) {
              return "#F9D657";
            }
            if (params.dataIndex === 3) {
              return "#AC8458";
            }
          }
        }
      }
    }
  ]
};

export { barOption };
