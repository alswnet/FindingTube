/*jshint esversion: 6 */
//
// let Archivo;
// let ZonaArrastrable;
// let Data;
// let Grafica;
// let MiGrafica;
// let Fechas = [];
// let DatosDiario = [];
// let DatosSum7 = [];
// let DatosSum30 = [];
// let EtiquetaValor;
// let EtiquetaTiempo;
// let DataEjemplo;

$(document).ready(function() {
  console.log("Cargando inicio");
  $('#submit-file').on("click", function(e) {
    console.log("Cargando archivo");
    e.preventDefault();
    $('#files').parse({
      config: {
        delimiter: "auto",
        complete: displayHTMLTable,
      },
      before: function(file, inputElem) {
        //console.log("Parsing file...", file);
      },
      error: function(err, file) {
        //console.log("ERROR:", err, file);
      },
      complete: function() {
        //console.log("Done with all files");
      }
    });

    function displayHTMLTable(results) {
      // var table = "<table class='table'>";
      var data = results.data;
      console.log(data);
      // for (i = 0; i < data.length; i++) {
      //   table += "<tr>";
      //   var row = data[i];
      //   var cells = row.join(",").split(",");
      //
      //   for (j = 0; j < cells.length; j++) {
      //     table += "<td>";
      //     table += cells[j];
      //     table += "</th>";
      //   }
      //   table += "</tr>";
      // }
      // table += "</table>";
      // $("#parsed_csv_list").html(table);
    }

  });



});

/*
// function preload() {
//   // TODO; Agregar que los datos son del canal de ALSW
//   DataEjemplo = loadTable('data/Totales6Junio2020ALSW.csv', 'csv');
// }

function setup() {
  noCanvas();
  noLoop();
  ZonaArrastrable = select("#ZonaArrastrable");
  ZonaArrastrable.dragOver(Resaltar);
  ZonaArrastrable.dragLeave(Desresaltar);
  ZonaArrastrable.drop(CargarArchivo, Desresaltar);
  Grafica = document.getElementById("MiGrafica").getContext('2d');
  InicialDatos();
  // CargarDataEjemplo();
  PrepararDatos();
  CrearGrafica();
}

function Resaltar() {
  ZonaArrastrable.style('background-color', '#CCC');
}

function Desresaltar() {
  ZonaArrastrable.style('background-color', '#FFF');
}

function CargarDataEjemplo() {
  for (let y = 0; y < DataEjemplo.getRowCount(); y++) {
    if (y == 0) {
      EtiquetaValor = DataEjemplo.getString(y, 1);
      EtiquetaTiempo = DataEjemplo.getString(y, 0);
    } else {
      Fechas.push(DataEjemplo.getString(y, 0));
      DatosDiario.push(parseFloat(DataEjemplo.getString(y, 1)));
    }
  }
}

function InicialDatos() {
  Fechas = [];
  DatosDiario = [];
  DatosSum7 = [];
  DatosSum30 = [];
}

function CargarArchivo(file) {
  console.log("El Nombre es " + file.name + " de tipo de " + file.type + " subtipo " + file.subtype);
  Archivo = file;
  print(file);
  if (file.name.endsWith('.csv')) {
    console.log("Archivo CSV");
    if (file.type == "text" && file.subtype == "csv") {
      Data = file.data.trim();
      InicialDatos();
      let PrimeraLinea = Data.split('\n')[0].split(',');
      EtiquetaTiempo = PrimeraLinea[0];
      EtiquetaValor = PrimeraLinea[1];
      let Lineas = Data.split('\n').slice(1);
      Lineas.forEach(Elemento => {
        const Linea = Elemento.split(',');
        const Dia = Linea[0];
        Fechas.push(Dia);
        const Dato = Linea[1];
        DatosDiario.push(parseFloat(Dato));
        // console.log(Dia, Dato)
      });
    } else if (file.type == "") {
      DataEjemplo = loadTable(file.data, 'csv');
      CargarDataEjemplo();
    }
    CrearGrafica();
  } else {
    console.log("No es un archivo .csv");
  }
}

function PrepararDatos() {

  for (i = 0; i < DatosDiario.length; i++) {
    if (i < 7) {
      DatosSum7.push(0);
    } else {
      let Temporal = 0;
      for (j = 0; j < 7; j++) {
        Temporal = Temporal + DatosDiario[i - j];
      }
      DatosSum7.push(Temporal);
    }
  }

  for (i = 0; i < DatosDiario.length; i++) {
    if (i < 30) {
      DatosSum30.push(0);
    } else {
      let Temporal = 0;
      for (j = 0; j < 30; j++) {
        Temporal = Temporal + DatosDiario[i - j];
      }
      DatosSum30.push(Temporal);
    }
  }

}

function CrearGrafica() {

  PrepararDatos();
  if (MiGrafica != null) {
    MiGrafica.destroy();
  }

  MiGrafica = new Chart(Grafica, {
    type: 'line',
    data: {
      labels: Fechas,
      datasets: [{
          label: 'Diario',
          data: DatosDiario,
          backgroundColor: '#4db6ac',
          borderColor: '#29335C',
          borderWidth: 1
        },
        {
          label: 'Suma 7 Dia',
          data: DatosSum7,
          borderWidth: 3,
          backgroundColor: '#F3A712',
          borderColor: '#562C2C',
        },
        {
          label: 'Suma 30 Dia',
          data: DatosSum30,
          backgroundColor: '#D62246',
          borderColor: '#2B193D',
          borderWidth: 5
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      responsiveAnimationDuration: 500,
      stacked: false,
      tooltips: {
        mode: 'point'
      },
      title: {
        display: true,
        fontSize: 22,
        position: 'bottom',
        text: 'Analisis de ' + EtiquetaValor
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        fontSize: 18
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      legend: {
        display: true,
        labels: {
          fontSize: 30,
          fontFamily: 'Helvetica'
        }
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: EtiquetaTiempo
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: EtiquetaValor
          }
        }]
      }
    }
  });
}

*/
