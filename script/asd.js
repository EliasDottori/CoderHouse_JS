//FUNCTIONS proyecto -- prompts y alerts:
function agregarLibro() {
  let autorIngresado = prompt("Ingrese el nombre del autor");
  let tituloIngresado = prompt("Ingrese el titulo del libro");
  let precioIngresado = parseInt(prompt("Ingrese el precio del libro"));
  //creamos nuevo objeto
  //para id dinámica usamos propiedad length
  const libroNuevo = new Libro(
    estanteria.length + 1,
    autorIngresado,
    tituloIngresado,
    precioIngresado
  );
  console.log(libroNuevo);
  //sumarlo a estanteria
  estanteria.push(libroNuevo);
  console.log(estanteria);
}

function eliminarLibro(array) {
  console.log("A partir del catalogo ingrese el id que desea eliminar");
  for (let elem of array) {
    console.log(`${elem.id} - ${elem.titulo} del autor ${elem.autor}`);
  }
  let idEliminar = parseInt(prompt("Ingrese el id a eliminar"));

  //vamos a hacer una copia del array que tenga sólo las id
  let arrayID = array.map((libro) => libro.id);
  console.log(arrayID);

  let indice = arrayID.indexOf(idEliminar);

  array.splice(indice, 1);
  verCatalogo(array);
}

function verCatalogo(array) {
  console.log("Bienvenido! Nuestro catalogo es:");
  array.forEach((libro) => {
    console.log(libro.id, libro.titulo, libro.precio, libro.autor);
  });
}

//aplicación de find
function buscarPorTitulo(array) {
  let tituloBuscado = prompt(
    "Ingrese el nombre del titulo del libro que desea buscar"
  );
  let tituloEncontrado = array.find(
    (book) => book.titulo.toLowerCase() == tituloBuscado.toLowerCase()
  );
  //si hay coincidencia nos devuelve el objeto, sino undefined (Atención find busca y cuando hay coincidencia retorna y deja de buscar)
  if (tituloEncontrado == undefined) {
    console.log(`El libro ${tituloBuscado} no está en stock`);
  } else {
    console.log(tituloEncontrado);
  }
}

function buscarPorAutor(arr) {
  let autorBuscado = prompt("Ingrese el nombre del autor que está buscando");
  let busqueda = arr.filter(
    (libro) => libro.autor.toLowerCase() == autorBuscado.toLowerCase()
  );
  if (busqueda.length == 0) {
    console.log(`No hay coincidencias para el autor/a ${autorBuscado}`);
  } else {
    //lo muestro común el array
    console.log(busqueda);
    //para probar reutilizamos la function que muestra el array
    verCatalogo(busqueda);
  }
}

//SORT -- ATENCIÓN METODO QUE DESTRUYE (AFECTA) AL ARRAY ORIGINAL -- en el after lo seguimos
// //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// // https://davidyero.medium.com/ordenar-arreglo-de-objetos-por-propiedad-o-atributo-javascript-56f74fc48906

function ordenarMenorMayor(array) {
  //copiamos array original // concat
  const menorMayor = [].concat(array);
  //ordena de menor a mayor
  menorMayor.sort((a, b) => a.precio - b.precio);
  verCatalogo(menorMayor);
}
function ordenarMayorMenor(arr) {
  //ordenar de mayor a menor
  const mayorMenor = [].concat(arr);
  mayorMenor.sort((param1, param2) => {
    return param2.precio - param1.precio;
  });
  verCatalogo(mayorMenor);
}
function ordenarAlfabeticamenteTitulo(array) {
  const ordenadoAlfabeticamente = [].concat(array);
  ordenadoAlfabeticamente.sort((a, b) => {
    if (a.titulo > b.titulo) {
      return 1;
    }
    if (a.titulo < b.titulo) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  verCatalogo(ordenadoAlfabeticamente);
}
function ordenar(array) {
  let opcion = parseInt(
    prompt(`
    1 - Ordenar de menor a mayor
    2 - Ordenar de mayor a menor
    3 - Ordenar alfabeticamente `)
  );
  switch (opcion) {
    case 1:
      ordenarMenorMayor(array);
      break;
    case 2:
      ordenarMayorMenor(array);
      break;
    case 3:
      ordenarAlfabeticamenteTitulo(array);
      break;
    default:
      console.log(`${opcion} no es válida para ordenar`);
      break;
  }
}

function menu() {
  let salirMenu = false;
  do {
    salirMenu = preguntarOpcion(salirMenu);
  } while (!salirMenu);
}

function preguntarOpcion(salir) {
  let opcionIngresada = parseInt(
    prompt(`Ingrese la opción deseada
           1 - Agregar libro
           2 - Borrar libro
           3 - Consultar catálogo
           4 - Encontrar por titulo:
           5 - Buscar libros de un mismo autor:
           6 - Ordenar libros:
           0 - Salir del menu`)
  );

  switch (opcionIngresada) {
    case 1:
      agregarLibro();
      break;
    case 2:
      //borrar libro
      eliminarLibro(estanteria);
      break;
    case 3:
      //ver catalogo
      verCatalogo(estanteria);
      break;
    case 4:
      //buscar por titulo
      buscarPorTitulo(estanteria);
      break;
    case 5:
      //buscar por autor
      buscarPorAutor(estanteria);
      break;
    case 6:
      //ordenar
      ordenar(estanteria);
      break;
    case 0:
      console.log("gracias por utilizar nuestra app");
      salir = true;
      return salir;
      break;
    default:
      console.log("Ingrese una opción correcta");
      break;
  }
}

//CÓDIGO
// menu()

//--------------------------------------------------------------------------------------------
//PROYECTO DOM:

//Captura de DOM
let librosDiv = document.getElementById("libros");
let guardaLibroBtn = document.getElementById("guardarLibroBtn");
let btnVerCatalogo = document.getElementById("verCatalogo");
let ocultarCatalogoBtn = document.getElementById("ocultarCatalogo");

//Functions
function mostrarCatalogo(array) {
  //vaciar Div
  librosDiv.innerHTML = "";
  //tenemos nuestros libros en estanteria:
  for (let libro of array) {
    let nuevoLibroDiv = document.createElement("div");
    //otra forma de sumarle una class a un elemento html
    //classList + add agrego clases al elemento seleccionado
    nuevoLibroDiv.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3");
    nuevoLibroDiv.innerHTML = `
        <div id="${libro.id}" class="card" style="width: 18rem;">
                <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor}">
                <div class="card-body">
                    <h4 class="card-title">${libro.titulo}</h4>
                    <p>Autor: ${libro.autor}</p>
                    <p class="">Precio: ${libro.precio}</p>
                <button id="agregarBtn${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
                </div>
        </div>
        `;
    librosDiv.appendChild(nuevoLibroDiv);
    //captura agregarBtn
    let agregarBtn = document.getElementById(`agregarBtn${libro.id}`);
    // console.log(agregarBtn)
    //adjunto evento
    agregarBtn.addEventListener("click", () => {
      //chequeamos que pasa
      console.log(libro);
      console.log(
        `El libro ${libro.titulo} de ${libro.autor} ha sido agregado al carrito. Vale ${libro.precio}`
      );
    });
  }
}
function cargarLibro(array) {
  let inputAutor = document.getElementById("autorInput");
  let inputTitulo = document.getElementById("tituloInput");
  let inputPrecio = document.getElementById("precioInput");

  const libroNuevo = new Libro(
    array.length + 1,
    inputAutor.value,
    inputTitulo.value,
    parseInt(inputPrecio.value),
    "libroNuevo.jpg"
  );
  console.log(libroNuevo);
  //sumarlo a estanteria:
  array.push(libroNuevo);
  console.log(array);
  //sumarlo también al Storage:
  localStorage.setItem("estanteria", JSON.stringify(array));
  mostrarCatalogo(array);
  //reset input
  inputAutor.value = "";
  inputTitulo.value = "";
  inputPrecio.value = "";
}

//class constructora
class Libro {
  constructor(id, autor, titulo, precio, imagen) {
    //propiedades o atributos de nuestra clase
    (this.id = id),
      (this.autor = autor),
      (this.titulo = titulo),
      (this.precio = precio),
      (this.imagen = imagen);
  }
  //métodos
  mostrarInfoLibro() {
    console.log(
      `El titulo es ${this.titulo}, el autor es ${this.autor} y su precio es ${this.precio}`
    );
  }
}
//Instanciación de objetos -- respetamos orden y cantidad de atributos

const libro1 = new Libro(
  1,
  "Jorge Luis Borges",
  "Aleph",
  900,
  "AlephBorges.jpg"
);

const libro2 = new Libro(
  2,
  "Gabriel García Marquez",
  "Cien años de Soledad",
  4500,
  "CienSoledadMarquez.jpg"
);

const libro3 = new Libro(
  3,
  "Isabel Allende",
  "Paula",
  2800,
  "PaulaAllende.jpg"
);

const libro4 = new Libro(
  4,
  "Jorge Luis Borges",
  "Ficciones",
  1400,
  "FiccionesBorges.jpg"
);

const libro5 = new Libro(
  5,
  "Mario Benedetti",
  "Andamios",
  2200,
  "AndamiosBenedetti.jpg"
);

const libro6 = new Libro(
  6,
  "Mario Vargas Llosa",
  "La ciudad y los perros",
  2000,
  "CiudadPerrosVargasLlosa.jpg"
);

//array de objetos:
//condicional que evalua si existe algo en el storage: si existe lo captura y toma como array. Si entra por primera vez, setea el array con los libros originales
let estanteria = [];
//preguntar si existe algo en el storage con la clave estanteria
if (localStorage.getItem("estanteria")) {
  //cuando no sea la primera vez
  estanteria = JSON.parse(localStorage.getItem("estanteria"));
} else {
  console.log("Entra por primera vez, seteamos array");
  estanteria.push(libro1, libro2, libro3, libro4, libro5, libro6);
  localStorage.setItem("estanteria", JSON.stringify(estanteria));
}

//EVENTOS
guardaLibroBtn.addEventListener("click", () => {
  cargarLibro(estanteria);
});

btnVerCatalogo.onclick = () => {
  mostrarCatalogo(estanteria);
};

ocultarCatalogoBtn.ondblclick = function () {
  librosDiv.innerHTML = "";
};

// //DARK MODE:
// //recordar crear los mismo buttons (están en html clase 10)
// let botonDarkMode = document.getElementById("botonDarkMode")
// let botonLightMode = document.getElementById("botonLightMode")
// let eliminarModeBtn = document.getElementById("eliminarMode")
// //capturamos localStorage:
// let modoOscuro = JSON.parse(localStorage.getItem("modoOscuro"))
// console.log(modoOscuro)
// //condicional que si está en true, me ponga el sitio en oscuro, sino remove darkMode
// if(modoOscuro == true){
//     document.body.classList.add("darkMode")
// }
// // else{
// //     document.body.classList.remove("darkMode")
// // }

// botonDarkMode.addEventListener("click", ()=>{
//     console.log("Btn oscuro funciona")
//     document.body.classList.add("darkMode")
//     //tmb se puede hacer con toggle
//     localStorage.setItem("modoOscuro", true)
// })

// botonLightMode.addEventListener("click", ()=>{
//     console.log("Btn claro funciona")
//     document.body.classList.remove("darkMode")
//     localStorage.setItem("modoOscuro", false)
// })

// //para eliminar una clave del local
// eliminarModeBtn.onclick = function(){
//     //elimina el elemento indicado
//     localStorage.removeItem("modoOscuro")
//     //si queremos eliminar todo lo del storage
//     localStorage.clear()
// }
