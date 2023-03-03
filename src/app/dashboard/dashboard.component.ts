import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new Chart(document.getElementById("doughnut-chart"), {
      type: 'doughnut',
      legend: {
          position: 'bottom'
      },
      data: {
          labels: ["Fast Food (26%)", "Italian (10%)", "Main Course (26%)", "Starter (9%)", "Beverages (12%)", "Indian (16%)", "Dessert (32%)", "Other (6%)"],
          datasets: [{
              //                    label: "Population (millions)",   
              backgroundColor: ["#EB1E1E", "#009946", "#F09514", "#8E37E7", "#F02899", "#898989", "#03B8FF", "#3337F0"],
              data: [26, 10, 26, 9, 12, 16, 32, 6],
              borderWidth: [0, 0, 0, 0, 0, 0, 0, 0]
          }]
      },
      options: {
          responsive: true,
          legend: {
              display: false,
              position: 'top',
              labels: {
                  fontColor: "#000080",
              }
          },
      }
  });
  }

}
