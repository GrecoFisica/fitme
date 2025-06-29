document.addEventListener("DOMContentLoaded", () => {
  const secciones = Array.from(document.querySelectorAll(".seccion"));
  const progressBar = document.getElementById("progressBar");
  const inputObjetivo = document.getElementById("inputObjetivo");

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalInput = document.getElementById("modalInput");
  const modalCancel = document.getElementById("modalCancel");
  const modalSave = document.getElementById("modalSave");

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

  // Manejo de botones de opción
  document.querySelectorAll(".opcion").forEach(boton => {
    boton.addEventListener("click", () => {
      const esSeleccionDirecta = boton.dataset.valor !== undefined;

      // Quitar selección de otros botones en el mismo paso
      const seccion = boton.closest(".seccion");
      const botonesGrupo = seccion.querySelectorAll(".opcion");
      botonesGrupo.forEach(b => b.classList.remove("selected"));
      boton.classList.add("selected");

      if (esSeleccionDirecta) {
        const valor = boton.dataset.valor;

        // Guardar el objetivo en paso 1
        if (pasoActual === 0 && inputObjetivo) {
          inputObjetivo.value = valor;
        }

        // Solo avanzar automáticamente en pasos específicos
        if ([0, 2, 3].includes(pasoActual)) {
          avanzarPaso();
        }

      } else {
        // Modal para entrada personalizada
        botonActual = boton;
        modalTitle.textContent = boton.textContent.split(" ")[0];
        modalInput.value = "";
        modal.classList.remove("hidden");
      }
    });
  });

  // Modal - cancelar
  modalCancel.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Modal - guardar
  modalSave.addEventListener("click", () => {
    const valor = modalInput.value.trim();
    if (valor !== "" && botonActual) {
      botonActual.querySelector("span").textContent = `${valor} ✅`;
      botonActual.classList.add("selected");
      modal.classList.add("hidden");

      // Solo avanzar automáticamente si no estamos en paso 2 o 5
      if (![1, 4].includes(pasoActual)) {
        avanzarPaso();
      }
    }
  });

  // Guardar con Enter
  modalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      modalSave.click();
    }
  });

  // Botones "Continuar"
  document.querySelectorAll(".boton-continuar").forEach(boton => {
    boton.addEventListener("click", () => {
      avanzarPaso();
    });
  });
});

// Animación de circunferencia en paso final
document.addEventListener("DOMContentLoaded", () => {
  const progreso = document.querySelector(".progreso");
  const porcentaje = document.querySelector(".porcentaje");

  let valorFinal = 100; // Cambia este valor si deseas otro porcentaje final
  let valorActual = 0;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let intervalo = setInterval(() => {
          if (valorActual <= valorFinal) {
            let offset = 314 - (314 * valorActual) / 100;
            progreso.style.strokeDashoffset = offset;
            porcentaje.textContent = `${valorActual}%`;
            valorActual++;
          } else {
            clearInterval(intervalo);
          }
        }, 20);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector(".contenedor-circular"));
});
