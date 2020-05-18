let ZonaArrastrable;
let Data;

function setup() {
  createCanvas(200, 200);
  background(100);

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
    let Lineas = Data.split('\n').slice(1)
    Lineas.forEach(Elemento => {
      const Linea = Elemento.split(',')
      const Dia = Linea[0]
      const Dato = Linea[1]
      console.log(Dia, Dato)
    })
  }
  else{
   console.log("No es un archivo .csv")
  }
}
