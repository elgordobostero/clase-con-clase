class Edificio {
  piso: Piso[];
  constructor(piso: Piso[]) {
    this.piso = piso;
  }
  addDepartamentoToPiso(nombreDePiso: string, departamento: Departamento) {
    const pisoEncontrado = this.piso.find((p) => p.nombre === nombreDePiso);
    return pisoEncontrado.pushDepartamento(departamento);
  }
  getDepartamentosByPiso(
    nombreDelPiso: string
  ): Departamento[] /*Aca le decimos a typescript que el return debe devolver solo el tipo que le mencionamos, de lo contrario saldra error; en este caso el return debe ser de tipo Departamento[]*/ {
    const pisoEncontrado = this.piso.find((p) => p.nombre === nombreDelPiso);
    return pisoEncontrado.getDepartamentos();
  }
}
class Piso {
  nombre: string;
  dptos: Departamento[] = []; //el = [], le indica a la clase dptos que va arrancar como un [vacio]
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  pushDepartamento(dpto: Departamento) {
    return this.dptos.push(dpto);
    //.push porque es un array
  }
  getDepartamentos(): Departamento[] {
    return this.dptos;
  }
}

class Departamento {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  getName() {
    return this.nombre;
  }
}

function main() {
  testClaseEdificio();
}

main();

function testClaseEdificio() {
  const unPiso = new Piso("planta baja");
  const otroPiso = new Piso("primer piso");
  const unEdificio = new Edificio([unPiso, otroPiso]);
  const deptoUno = new Departamento("depto uno");
  const deptoDos = new Departamento("depto dos");
  const deptoTres = new Departamento("depto tres");
  unEdificio.addDepartamentoToPiso("planta baja", deptoUno);
  unEdificio.addDepartamentoToPiso("planta baja", deptoDos);
  unEdificio.addDepartamentoToPiso("planta baja", deptoTres);

  const deptos = unEdificio.getDepartamentosByPiso("planta baja");
  const deptosEmpty = unEdificio.getDepartamentosByPiso("primer piso");

  if (
    Array.isArray(deptosEmpty) &&
    deptosEmpty.length == 0 &&
    deptos.length == 3 &&
    deptos[2].getName() == "depto tres"
  ) {
    console.log("testClaseBandaApartment passed");
  } else {
    throw "testClaseBandaApartment not passed";
  }
}
