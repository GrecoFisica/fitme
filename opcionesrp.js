document.addEventListener("DOMContentLoaded", () => {
  const secciones = Array.from(document.querySelectorAll(".seccion"));
  const progressBar = document.getElementById("progressBar");
  const inputObjetivo = document.getElementById("inputObjetivo");

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalInput = document.getElementById("modalInput");
  const modalCancel = document.getElementById("modalCancel");
  const modalSave = document.getElementById("modalSave");

  const btnContinuarPaso2 = document.getElementById("continuarPaso2");

  let pasoActual = 0;
  let botonActual = null;

  function mostrarPaso(index) {
    secciones.forEach((sec, i) => {
      sec.classList.toggle("hidden", i !== index);
    });

    const progreso = ((index + 1) / secciones.length) * 100;
    progressBar.style.width = `${progreso}%`;
  }

  function avanzarPaso() {
    if (pasoActual < secciones.length - 1) {
      pasoActual++;
      mostrarPaso(pasoActual);
    }
  }

  mostrarPaso(pasoActual);

  // Escucha clics en botones de opciones
  document.querySelectorAll(".opcion").forEach(boton => {
    boton.addEventListener("click", () => {
      const esSeleccionDirecta = boton.dataset.valor !== undefined;

      // Resalta el botón seleccionado
      const botonesGrupo = boton.parentElement.querySelectorAll(".opcion");
      botonesGrupo.forEach(b => b.classList.remove("selected"));
      boton.classList.add("selected");

      if (esSeleccionDirecta) {
        const valor = boton.dataset.valor;

        // Guardar el objetivo si estamos en paso 0
        if (pasoActual === 0 && inputObjetivo) {
          inputObjetivo.value = valor;
        }

        // Avanzar solo si no estamos en paso 2
        if (pasoActual !== 1) {
          avanzarPaso();
        }

      } else {
        // Es una opción con entrada personalizada, abrimos el modal
        botonActual = boton;
        modalTitle.textContent = boton.textContent.split(" ")[0];
        modalInput.value = "";
        modal.classList.remove("hidden");
      }
    });
  });

  // Botón Cancelar del modal
  modalCancel.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Botón Guardar del modal
  modalSave.addEventListener("click", () => {
    const valor = modalInput.value.trim();
    if (valor !== "" && botonActual) {
      botonActual.querySelector("span").textContent = `${valor} ✅`;
      botonActual.classList.add("selected");
      modal.classList.add("hidden");

      // NO avanzar si estamos en paso 2
      if (pasoActual !== 1) {
        avanzarPaso();
      }
    }
  });

  // Enter para guardar en el modal
  modalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      modalSave.click();
    }
  });

  // Botón "Continuar" en paso 2
  if (btnContinuarPaso2) {
    btnContinuarPaso2.addEventListener("click", () => {
      if (pasoActual === 1) {
        avanzarPaso();
      }
    });
  }
});
