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
      // console.log(Dia, Dato)
    })
    CrearGrafica()
  } else {
    console.log("No es un archivo .csv")
  }
}

function CrearGrafica() {
  let Grafica = document.getElementById("MiGrafica").getContext('2d');
  Grafica.height = 500;
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
          backgroundColor: '#4db6ac',
          borderColor: '#29335C',
          borderWidth: 2
        },
        {
          label: 'Suma-7',
          data: DatosSum7,
          backgroundColor: '#D62246',
          borderColor: '#2B193D',
          borderWidth: 2
        },
        {
          label: 'Suma-30',
          data: DatosSum30,
          backgroundColor: '#F3A712',
          borderColor: '#562C2C',
          borderWidth: 5
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      responsiveAnimationDuration: 500,
      stacked: false,
      hoverMode: 'index',
      title: {
        display: true,
        text: 'Analisis de XXX'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
