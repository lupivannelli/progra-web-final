document.addEventListener("DOMContentLoaded", () => {
  let turnos = [];
  let idTurno = 0;
  let idEditar = null;

  const formTurno = document.getElementById("form-turno");
  const nombreJS = document.getElementById("nombre");
  const emailJS = document.getElementById("email");
  const fechaJS = document.getElementById("fecha");
  const comentariosJS = document.getElementById("comentarios");
  const horaHH = document.getElementById("hora-hh");
  const horaMM = document.getElementById("hora-mm");
  const tablaTurnos = document.getElementById("tbody-turnos");
  const mensajeExito = document.getElementById("mensaje-exito");

  function mostrarTurnos(lista) {
    tablaTurnos.innerHTML = "";

    if (lista.length === 0) {
      tablaTurnos.innerHTML = "<tr><td colspan='6'>No hay turnos cargados</td></tr>";
      return;
    }

    lista.forEach(turno => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${turno.nombre}</td>
        <td>${turno.email}</td>
        <td>${turno.fecha}</td>
        <td>${turno.hora}</td>
        <td>${turno.comentarios}</td>
        <td>
          <button class="btn-editar" data-id="${turno.id}">Editar</button>
          <button class="btn-eliminar" data-id="${turno.id}">Eliminar</button>
        </td>
      `;
      tablaTurnos.appendChild(fila);
    });
  }

  function guardarTurno(e) {
    e.preventDefault();

    const nombre = nombreJS.value.trim();
    const email = emailJS.value.trim();
    const fecha = fechaJS.value;
    const hora = `${horaHH.value}:${horaMM.value}`;
    const comentarios = comentariosJS.value.trim();

    if (!nombre || !email || !fecha || !horaHH.value || !horaMM.value) {
      alert("Completá todos los campos obligatorios");
      return;
    }

    const turnoNuevo = {
      id: idEditar !== null ? idEditar : idTurno,
      nombre,
      email,
      fecha,
      hora,
      comentarios
    };

    if (idEditar !== null) {
      turnos = turnos.map(t => t.id === idEditar ? turnoNuevo : t);
      idEditar = null;
    } else {
      turnos.push(turnoNuevo);
      idTurno++;
    }

    formTurno.reset();
    horaHH.value = "";
    horaMM.value = "";

    mostrarMensajeExito();
    mostrarTurnos(turnos);
  }

  function eliminarTurno(id) {
    turnos = turnos.filter(t => t.id !== id);
    mostrarTurnos(turnos);
  }

  function editarTurno(id) {
    const turno = turnos.find(t => t.id === id);
    if (!turno) return;

    nombreJS.value = turno.nombre;
    emailJS.value = turno.email;
    fechaJS.value = turno.fecha;
    comentariosJS.value = turno.comentarios;
    horaHH.value = turno.hora.split(":")[0];
    horaMM.value = turno.hora.split(":")[1];
    idEditar = id;
  }

  function mostrarMensajeExito() {
    if (!mensajeExito) return;

    mensajeExito.classList.remove("oculto");
    mensajeExito.classList.add("mostrar");

    setTimeout(() => {
      mensajeExito.classList.remove("mostrar");
      mensajeExito.classList.add("oculto");
    }, 4000);
  }

  formTurno.addEventListener("submit", guardarTurno);

  tablaTurnos.addEventListener("click", e => {
    const boton = e.target;
    const id = parseInt(boton.getAttribute("data-id"));

    if (boton.classList.contains("btn-eliminar")) eliminarTurno(id);
    if (boton.classList.contains("btn-editar")) editarTurno(id);
  });

  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, "0");
  const dd = String(hoy.getDate()).padStart(2, "0");
  fechaJS.min = `${yyyy}-${mm}-${dd}`;

  mostrarTurnos(turnos);
});
