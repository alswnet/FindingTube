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
    console.log("Es un .csv")
    Data = loadTable(file.name, 'csv', 'header', InfoDatos)
  } else {
    console.log("No .csv")
  }

}

function InfoDatos() {
  print(Data.getRowCount() + ' total rows in table');
  print(Data.getColumnCount() + ' total columns in table');

  for (let r = 0; r < Data.getRowCount(); r++)
    for (let c = 0; c < Data.getColumnCount(); c++) {
      print(Data.getString(r, c));
    }

}
