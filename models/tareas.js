const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
    // console.log(this._listado);
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  mostrarTareas(type = "") {
    let tareas = [];
    let cont = 1;
    let state = "";

    if (type == "c") {
      for (let i in this._listado) {
        if (this._listado[i].completadoEn) {
          state = "Completado".green;
        } else {
          state = "Pendiente".red;
        }
        if (state == "Completado".green) {
          tareas.push({
            value: `${i}`,
            name: `${(cont + ".").green} ${this._listado[i].desc}: ${state}`,
          });
          cont++;
        }
      }
      if (tareas.length == 0) {
        tareas.push({
          value: `0`,
          name: `No hay tareas completadas`,
        });
      }
      return tareas;
    } else if (type == "i") {
      for (let i in this._listado) {
        if (this._listado[i].completadoEn) {
          state = "Completado".green;
        } else {
          state = "Pendiente".red;
        }
        if (state == "Pendiente".red) {
          tareas.push({
            value: `${i}`,
            name: `${(cont + ".").green} ${this._listado[i].desc}: ${state}`,
          });
          cont++;
        }
      }
      if (tareas.length == 0) {
        tareas.push({
          value: `${0}`,
          name: `No hay tareas pendientes`,
        });
      }

      return tareas;
    } else {
      for (let i in this._listado) {
        if (this._listado[i].completadoEn) {
          state = "Completado".green;
        } else {
          state = "Pendiente".red;
        }

        tareas.push({
          value: `${i}`,
          name: `${(cont + ".").green} ${this._listado[i].desc}: ${state}`,
        });
        cont++;
      }

      return tareas;
    }
  }

  infoTareas(type = "") {
    let cont = 1;
    let state = "";

    if (type == "c") {
      console.log();
      this.guardarTareas().forEach((el) => {
        const { desc, completadoEn } = el;
        state = completadoEn ? "Completado".green : "Pendiente".red;
        if (state == "Completado".green) {
          console.log(`${(cont + ".").green} ${desc}: ${completadoEn.green}`);
          cont++;
        }
      });
    } else if (type == "i") {
      console.log();
      this.guardarTareas().forEach((el) => {
        const { desc, completadoEn } = el;
        state = completadoEn ? "Completado".green : "Pendiente".red;
        if (state == "Pendiente".red) {
          console.log(`${(cont + ".").green} ${desc}: ${state}`);
          cont++;
        }
      });
    } else {
      console.log();
      this.guardarTareas().forEach((el) => {
        const { desc, completadoEn } = el;
        state = completadoEn ? "Completado".green : "Pendiente".red;
        console.log(`${(cont + ".").green} ${desc}: ${state}`);
        cont++;
      });
    }
  }

  guardarTareas() {
    let tareas = [];
    for (let i in this._listado) {
      tareas.push(this._listado[i]);
    }
    return tareas;
  }

  cargarTareas(array) {
    array.forEach((el) => {
      this._listado[el.id] = el;
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.guardarTareas().forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        const tareax = this._listado[tarea.id];
        tareax.completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
