// ==========================================
// MM CONTROL - DATOS DE DEMOSTRACIÓN
// ==========================================

const maquinas = [

  {
    sala: "Lima 1",
    maquina: "102",
    estado: "INOPERATIVA",
    dias: 12,
    fecha: "12/08/2026 18:20",
    observacion: "Falla de monitor"
  },

  {
    sala: "Lima 1",
    maquina: "118",
    estado: "INOPERATIVA",
    dias: 7,
    fecha: "12/08/2026 16:40",
    observacion: "No enciende"
  },

  {
    sala: "Lima 2",
    maquina: "205",
    estado: "EN PROCESO",
    dias: 5,
    fecha: "12/08/2026 17:10",
    observacion: "Esperando repuesto"
  },

  {
    sala: "Lima 2",
    maquina: "210",
    estado: "OPERATIVA",
    dias: 0,
    fecha: "12/08/2026 18:05",
    observacion: "Operativa"
  },

  {
    sala: "Huancayo",
    maquina: "301",
    estado: "INOPERATIVA",
    dias: 9,
    fecha: "12/08/2026 15:30",
    observacion: "Falla de billetero"
  },

  {
    sala: "Huancayo",
    maquina: "315",
    estado: "EN PROCESO",
    dias: 3,
    fecha: "12/08/2026 14:20",
    observacion: "Revisión técnica"
  },

  {
    sala: "Trujillo 1",
    maquina: "401",
    estado: "OPERATIVA",
    dias: 0,
    fecha: "12/08/2026 18:12",
    observacion: "Operativa"
  },

  {
    sala: "Trujillo 1",
    maquina: "409",
    estado: "INOPERATIVA",
    dias: 2,
    fecha: "12/08/2026 11:50",
    observacion: "Falla de impresora"
  },

  {
    sala: "Pucallpa 1",
    maquina: "502",
    estado: "OPERATIVA",
    dias: 0,
    fecha: "12/08/2026 17:55",
    observacion: "Operativa"
  },

  {
    sala: "Pucallpa 2",
    maquina: "604",
    estado: "INOPERATIVA",
    dias: 14,
    fecha: "12/08/2026 09:35",
    observacion: "Falla de pantalla"
  },

  {
    sala: "Chincha 1",
    maquina: "702",
    estado: "EN PROCESO",
    dias: 4,
    fecha: "12/08/2026 13:15",
    observacion: "Mantenimiento"
  },

  {
    sala: "Chincha 3",
    maquina: "801",
    estado: "OPERATIVA",
    dias: 0,
    fecha: "12/08/2026 18:00",
    observacion: "Operativa"
  }

];


// ==========================================
// VARIABLES
// ==========================================

let graficoEstado = null;
let graficoSala = null;


// ==========================================
// ELEMENTOS
// ==========================================

const salaFilter =
  document.getElementById("salaFilter");

const estadoFilter =
  document.getElementById("estadoFilter");

const searchInput =
  document.getElementById("searchInput");

const tableBody =
  document.getElementById("tableBody");

const kpiInop =
  document.getElementById("kpiInop");

const kpiProceso =
  document.getElementById("kpiProceso");

const kpiOperativas =
  document.getElementById("kpiOperativas");

const kpiTotal =
  document.getElementById("kpiTotal");

const resultCount =
  document.getElementById("resultCount");

const updatedAt =
  document.getElementById("updatedAt");


// ==========================================
// CARGAR SALAS EN EL FILTRO
// ==========================================

function cargarSalas() {

  const salas = [
    ...new Set(
      maquinas.map(
        maquina => maquina.sala
      )
    )
  ];

  salas.sort();

  salas.forEach(sala => {

    const option =
      document.createElement("option");

    option.value = sala;

    option.textContent = sala;

    salaFilter.appendChild(option);

  });

}


// ==========================================
// OBTENER DATOS FILTRADOS
// ==========================================

function obtenerDatosFiltrados() {

  const sala =
    salaFilter.value;

  const estado =
    estadoFilter.value;

  const texto =
    searchInput.value
      .toLowerCase()
      .trim();


  return maquinas.filter(maquina => {

    const coincideSala =
      !sala ||
      maquina.sala === sala;


    const coincideEstado =
      !estado ||
      maquina.estado === estado;


    const coincideBusqueda =
      !texto ||
      maquina.sala
        .toLowerCase()
        .includes(texto) ||

      maquina.maquina
        .toLowerCase()
        .includes(texto) ||

      maquina.observacion
        .toLowerCase()
        .includes(texto);


    return (
      coincideSala &&
      coincideEstado &&
      coincideBusqueda
    );

  });

}


// ==========================================
// ACTUALIZAR INDICADORES
// ==========================================

function actualizarIndicadores(datos) {

  const inoperativas =
    datos.filter(
      x => x.estado === "INOPERATIVA"
    ).length;


  const proceso =
    datos.filter(
      x => x.estado === "EN PROCESO"
    ).length;


  const operativas =
    datos.filter(
      x => x.estado === "OPERATIVA"
    ).length;


  kpiInop.textContent =
    inoperativas;

  kpiProceso.textContent =
    proceso;

  kpiOperativas.textContent =
    operativas;

  kpiTotal.textContent =
    datos.length;


  resultCount.textContent =
    `${datos.length} registro${datos.length === 1 ? "" : "s"}`;

}


// ==========================================
// MOSTRAR TABLA
// ==========================================

function mostrarTabla(datos) {

  tableBody.innerHTML = "";


  datos.forEach(maquina => {

    const fila =
      document.createElement("tr");


    let claseEstado = "";


    if (
      maquina.estado ===
      "INOPERATIVA"
    ) {

      claseEstado = "inop";

    }


    else if (
      maquina.estado ===
      "EN PROCESO"
    ) {

      claseEstado = "proceso";

    }


    else {

      claseEstado = "operativa";

    }


    fila.innerHTML = `

      <td>
        <strong>
          ${maquina.sala}
        </strong>
      </td>

      <td>
        ${maquina.maquina}
      </td>

      <td>

        <span class="badge ${claseEstado}">

          ${maquina.estado}

        </span>

      </td>

      <td>
        ${maquina.dias}
      </td>

      <td>
        ${maquina.fecha}
      </td>

      <td>
        ${maquina.observacion}
      </td>

    `;


    tableBody.appendChild(fila);

  });

}


// ==========================================
// GRÁFICO DE ESTADOS
// ==========================================

function crearGraficoEstado(datos) {

  const inoperativas =
    datos.filter(
      x => x.estado === "INOPERATIVA"
    ).length;


  const proceso =
    datos.filter(
      x => x.estado === "EN PROCESO"
    ).length;


  const operativas =
    datos.filter(
      x => x.estado === "OPERATIVA"
    ).length;


  if (graficoEstado) {

    graficoEstado.destroy();

  }


  const ctx =
    document
      .getElementById("estadoChart")
      .getContext("2d");


  graficoEstado =
    new Chart(ctx, {

      type: "doughnut",

      data: {

        labels: [

          "Inoperativas",

          "En proceso",

          "Operativas"

        ],

        datasets: [

          {

            data: [

              inoperativas,

              proceso,

              operativas

            ],

            backgroundColor: [

              "#d83b4a",

              "#e39a22",

              "#299363"

            ],

            borderWidth: 0

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        cutout: "68%",

        plugins: {

          legend: {

            position: "bottom"

          }

        }

      }

    });

}


// ==========================================
// GRÁFICO POR SALA
// ==========================================

function crearGraficoSala(datos) {

  const salas = [

    ...new Set(

      datos.map(
        x => x.sala
      )

    )

  ];


  const valores = salas.map(sala => {

    return datos.filter(

      x =>

        x.sala === sala &&

        x.estado ===
        "INOPERATIVA"

    ).length;

  });


  if (graficoSala) {

    graficoSala.destroy();

  }


  const ctx =
    document
      .getElementById("salaChart")
      .getContext("2d");


  graficoSala =
    new Chart(ctx, {

      type: "bar",

      data: {

        labels: salas,

        datasets: [

          {

            label:
              "Máquinas inoperativas",

            data:
              valores,

            backgroundColor:
              "#7b1e3a",

            borderRadius: 6

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {

            display: false

          }

        },

        scales: {

          y: {

            beginAtZero: true,

            ticks: {

              precision: 0

            }

          }

        }

      }

    });

}


// ==========================================
// ACTUALIZAR TODO EL DASHBOARD
// ==========================================

function actualizarDashboard() {

  const datos =
    obtenerDatosFiltrados();


  actualizarIndicadores(
    datos
  );


  mostrarTabla(
    datos
  );


  crearGraficoEstado(
    datos
  );


  crearGraficoSala(
    datos
  );


  actualizarHora();

}


// ==========================================
// HORA
// ==========================================

function actualizarHora() {

  const ahora =
    new Date();


  updatedAt.textContent =
    ahora.toLocaleTimeString(
      "es-PE"
    );

}


// ==========================================
// EVENTOS
// ==========================================

salaFilter.addEventListener(

  "change",

  actualizarDashboard

);


estadoFilter.addEventListener(

  "change",

  actualizarDashboard

);


searchInput.addEventListener(

  "input",

  actualizarDashboard

);


document
  .getElementById("refreshBtn")
  .addEventListener(

    "click",

    actualizarDashboard

  );


// ==========================================
// INICIO
// ==========================================

cargarSalas();

actualizarDashboard();


// Actualizar hora cada segundo

setInterval(

  actualizarHora,

  1000

);
