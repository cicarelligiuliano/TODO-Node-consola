require("colors");
const inquirer = require("inquirer");
const {
  inquirerMenu,
  pausa,
  leerInput,
  mostrarTareas,
  confirmar,
  completarTareas,
} = require("./helpers/inquirer");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo.js");
const Tareas = require("./models/tareas");

// const { pause } = require("./helpers/mensajes");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) tareas.cargarTareas(leerDB());

  // console.log(tareas._listado);
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Tarea:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.infoTareas();
        // const t = tareas.mostrarTareas();
        // await mostrarTareas(t);
        break;
      case "3":
        // const c = tareas.mostrarTareas("c");
        // await mostrarTareas(c);
        tareas.infoTareas("c");
        break;
      case "4":
        // const i = tareas.mostrarTareas("i");
        // await mostrarTareas(i);
        tareas.infoTareas("i");
        break;
      case "5":
        const ids = await completarTareas(tareas.guardarTareas());
        const comp = await confirmar(
          `¿Esta seguro que quiere completar estas tareas?`
        );
        if (comp) {
          tareas.toggleCompletadas(ids);
        }
        break;
      case "6":
        const t = tareas.mostrarTareas();
        const id = await mostrarTareas(t);
        if (id == 0) {
          break;
        }
        const conf = await confirmar(`¿Esta seguro que quiere borrarlo?`);
        if (conf) {
          tareas.borrarTarea(id);
          console.log(`Tarea borrada exitosamente`);
          // console.log(`Tarea ${tareas._listado} borrada exitosamente`);
        }
        break;
    }

    guardarDB(tareas.guardarTareas());

    if (opt !== "0") await pausa();
  } while (opt !== "0");

  //   pause();
};

main();
