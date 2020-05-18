let ZonaArrastrable
let Data
let Grafica
let Fechas = []
let DatosDiario = []
let DatosSum7 = []
let DatosSum30 = []

function setup() {
  noCanvas()
  noLoop()
  ZonaArrastrable = select("#ZonaArrastrable")
  ZonaArrastrable.dragOver(Resaltar)
  ZonaArrastrable.dragLeave(Desresaltar)
  ZonaArrastrable.drop(CargarArchivo, Desresaltar)

}

function draw() {


}

function Resaltar() {
  ZonaArrastrable.style('background-color', '#CCC')
}

function Desresaltar() {
  ZonaArrastrable.style('background-color', '#FFF')
}

function CargarArchivo(file) {
  console.log("El Nombre es " + file.name + " de tipo de " + file.type + " subtipo " + file.subtype)
  if (file.name.endsWith('.csv')) {
    Data = file.data.trim()
    Fechas = []
    DatosDiario = []
    DatosSum7 = []
    DatosSum30 = []
    let Lineas = Data.split('\n').slice(1)
    Lineas.forEach(Elemento => {
      const Linea = Elemento.split(',')
      const Dia = Linea[0]
      Fechas.push(Dia);
      const Dato = Linea[1]
      DatosDiario.push(parseFloat(Dato))
      console.log(Dia, Dato)
    })
    CrearGrafica()
  } else {
    console.log("No es un archivo .csv")
  }
}

function CrearGrafica() {
  let Grafica = document.getElementById("MiGrafica").getContext('2d');
  // TODO: Limpiar codigo viejo

  for (i = 0; i < DatosDiario.length; i++) {
    if (i < 7) {
      DatosSum7.push(0);
    } else {
      let Temporal = 0;
      for (j = 0; j < 7; j++) {
        Temporal = Temporal + DatosDiario[i - j]
      }
      DatosSum7.push(Temporal)
    }
  }

  for (i = 0; i < DatosDiario.length; i++) {
    if (i < 30) {
      DatosSum30.push(0);
    } else {
      let Temporal = 0;
      for (j = 0; j < 30; j++) {
        Temporal = Temporal + DatosDiario[i - j]
      }
      DatosSum30.push(Temporal)
    }
  }

  let MiGrafica = new Chart(Grafica, {
    type: 'line',
    data: {
      labels: Fechas,
      datasets: [{
          label: 'Diario',
          data: DatosDiario,
          backgroundColor: 'rgba(0, 255, 0, 1)',
          borderColor: 'rgba(0, 100, 255, 1)',
          borderWidth: 1
        },
        {
          label: 'Suma7',
          data: DatosSum7,
          backgroundColor: 'rgba(255, 9, 132, 0.2)',
          borderColor: 'rgba(255, 9, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Suma30',
          data: DatosSum30,
          backgroundColor: 'rgba(0, 200, 122, 0.2)',
          borderColor: 'rgba(55, 9, 232, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      stacked: false,
      hoverMode: 'index',
      title: {
        display: true,
        text: 'Grafica analisis de Youtube'
      },
      scales: {
        yAxes: [{
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-1',
        }, {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'right',
          id: 'y-axis-2',

          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        }]
      }
    }
  });
}
