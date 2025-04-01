function generarInputs() {
  const filasA = parseInt(document.getElementById("filasA").value);
  const columnasA = parseInt(document.getElementById("columnasA").value);
  const filasB = parseInt(document.getElementById("filasB").value);
  const columnasB = parseInt(document.getElementById("columnasB").value);
  const contenedor = document.getElementById("matrices");
  const botonMultiplicar = document.getElementById("multiplicarBtn");
  contenedor.innerHTML = "";
  botonMultiplicar.classList.add("hidden");

  if (columnasA !== filasB) {
    alert(
      "El número de columnas de la primera matriz debe coincidir con el número de filas de la segunda matriz."
    );
    return;
  }

  crearMatriz("Matriz1", filasA, columnasA, contenedor);
  crearMatriz("Matriz2", filasB, columnasB, contenedor);

  botonMultiplicar.classList.remove("hidden");
}

function crearMatriz(nombre, filas, columnas, contenedor) {
  const div = document.createElement("div");
  div.classList.add("p-4", "bg-gray-50", "rounded-lg", "shadow-md");
  div.innerHTML = `<h3 class='font-bold mb-2 text-lg text-center'>${nombre}</h3>`;

  for (let i = 0; i < filas; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("flex", "justify-center");

    for (let j = 0; j < columnas; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.className =
        "border w-12 p-2 m-1 text-center rounded shadow-sm focus:ring focus:ring-blue-300";
      input.id = `${nombre}_${i}_${j}`;
      rowDiv.appendChild(input);
    }
    div.appendChild(rowDiv);
  }
  contenedor.appendChild(div);
}

function multiplicar() {
  const filasA = parseInt(document.getElementById("filasA").value);
  const columnasA = parseInt(document.getElementById("columnasA").value);
  const filasB = parseInt(document.getElementById("filasB").value);
  const columnasB = parseInt(document.getElementById("columnasB").value);

  const m_a = capturarValores("Matriz1", filasA, columnasA);
  const m_b = capturarValores("Matriz2", filasB, columnasB);

  if (!m_a || !m_b) {
    alert("Todos los campos deben contener valores numéricos.");
    return;
  }

  fetch("http://127.0.0.1:3000/mul", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ m_a, m_b }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        mostrarResultado(data.resultado);
      }
    })
    .catch((error) => {
      alert("Hubo un error al enviar los datos.");
      console.error("Error:", error);
    });
}

function capturarValores(idBase, filas, columnas) {
  let matriz = [];
  for (let i = 0; i < filas; i++) {
    let row = [];
    for (let j = 0; j < columnas; j++) {
      let val = document.getElementById(`${idBase}_${i}_${j}`).value;
      if (val === "" || isNaN(val)) return null;
      row.push(Number(val));
    }
    matriz.push(row);
  }
  return matriz;
}

function mostrarResultado(matriz) {
  const resultadoDiv = document.getElementById("resultado");
  const resultadoContenido = document.getElementById("resultadoContenido");
  resultadoContenido.innerHTML = ""; // Limpiar contenido previo

  matriz.forEach((fila) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("flex", "justify-center");

    fila.forEach((num) => {
      const span = document.createElement("span");
      span.textContent = num;
      span.classList.add(
        "border",
        "w-12",
        "p-2",
        "m-1",
        "text-center",
        "rounded",
        "shadow-sm",
        "bg-white"
      );
      rowDiv.appendChild(span);
    });

    resultadoContenido.appendChild(rowDiv);
  });

  resultadoDiv.classList.remove("hidden");
}
