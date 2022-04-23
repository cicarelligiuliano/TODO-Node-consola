const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tareas`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tareas`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir\n`,
      },
    ],
  },
];
const Enter = [
  {
    type: "input",
    name: "opcion",
    message: `Presione ${"ENTER".green} para continuar `,
    choices: ["Enter"],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=======================".green);
  console.log("Selecciones una opción".green);
  console.log("=======================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  console.log("\n");
  const { opcion } = await inquirer.prompt(Enter);
  return opcion;
};

const leerInput = async (message) => {
  const question = {
    type: "input",
    name: "desc",
    message,
    validate(value) {
      if (value.length === 0) {
        return "Por favor ingrese un valor";
      }
      return true;
    },
  };
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const mostrarTareas = async (tareas) => {
  tareas.unshift({ value: "0", name: "0.".green + " Cancelar" });
  const preguntas = [
    {
      type: "list",
      name: "opcion",
      message: "Tareas",
      choices: tareas,
    },
  ];
  opt = await inquirer.prompt(preguntas);

  return opt.opcion;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);

  return ok;
};

const completarTareas = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  mostrarTareas,
  confirmar,
  completarTareas,
};
