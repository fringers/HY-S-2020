// CommitChart.js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'labels'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'Infected',
          backgroundColor: '#21ABAB',
          data: this.data,
        }
      ]
    },
    {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 30
          }
        }]
      }
    })
  }
}