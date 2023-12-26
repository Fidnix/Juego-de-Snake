let lienzo = document.querySelector("#lienzo");
let ctx = lienzo.getContext("2d");
lienzo.style.height = "250px";

function getRankingData() {
    let xhttpGetRequest = new XMLHttpRequest();
    
    xhttpGetRequest.open('GET', 'controller/ranking.php', true);
    xhttpGetRequest.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200) {
            let datos =  JSON.parse(xhttpGetRequest.response);
            chart.data = {
                labels: [
                    `2do Puesto (${datos[1]["nombre"]})`,
                    `1er Puesto (${datos[0]["nombre"]})`,
                    `3er Puesto (${datos[2]["nombre"]})`
                ],
                datasets: [{
                    label: "Ranking de ganadores",
                    backgroundColor: ["rgba(102, 102, 102, .5)", "rgba(255, 255, 0, 0.6)", "rgba(153, 51, 0, .5)"],
                    borderColor: ["rgb(102, 102, 102)", "rbg(255,255,0)", "rgb(153, 51, 0)"],
                    borderWidth: 2,
                    data: [
                        datos[1]["puntaje"],
                        datos[0]["puntaje"],
                        datos[2]["puntaje"]
                    ]
                }]
            }
            chart.options.scales.yAxes = [{
                ticks: {
                    min: (Math.floor(datos[2]["puntaje"] - (datos[2]["puntaje"]/10)))
                }
            }]
            chart.update();
        }
    }
    xhttpGetRequest.send()
}


let chart = new Chart(ctx, {
    type: "bar",
    options: {
        animation:false,
    }
})

getRankingData()