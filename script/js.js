// const singup = document.getElementById("singupinput");
// const outfocus = document.getElementById("focuslogin");
// singup.addEventListener(
//   "focus",
//   () => {
//     outfocus.className = "onfocus outfocus";
//   },
//   false
// );
// singup.addEventListener(
//   "blur",
//   () => {
//     outfocus.className = "outfocus";
//   },
//   false
// );

// const login = document.getElementById("logininput");
// const outfocus1 = document.getElementById("focussingup");
// login.addEventListener(
//   "focus",
//   () => {
//     outfocus1.className = "onfocus outfocus";
//   },
//   false
// );
// login.addEventListener(
//   "blur",
//   () => {
//     outfocus1.className = "outfocus";
//   },
//   false
// );

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

//Constructor Arreglo y variables

let btnOfertaHTML = document.getElementById("btnOfertaHTML");
let btnCatalogoHTML = document.getElementById("btnCatalogoHTML");
let catalogoHTML = document.getElementById("catalogoHTML");
let ofertaHTML = document.getElementById("ofertaHTML");
let btnCarritoHTML = document.getElementById("btnCarritoHTML");
let verCarritoHTML = document.getElementById("verCarritoHTML");
let cerrarCarritoHTML = document.getElementById("cerrarCarritoHTML");
let totalCarritoHTML = document.getElementById("totalCarritoHTML");
let total = 0;

class Vino {
  constructor(id, nombre, bodega, tipo, variedad, año, precio, img, oferta) {
    (this.id = id),
      (this.nombre = nombre),
      (this.bodega = bodega),
      (this.tipo = tipo),
      (this.variedad = variedad),
      (this.año = año),
      (this.precio = precio);
    this.img = img;
    this.oferta = oferta;
  }
}

class Carrito {
  constructor(id, nombre, bodega, tipo, precio, cantidad) {
    (this.id = id),
      (this.nombre = nombre),
      (this.bodega = bodega),
      (this.tipo = tipo),
      (this.precio = precio);
    this.cantidad = cantidad;
  }
}

const vino1 = new Vino(
  1,
  "Iscay",
  "Trapiche",
  "tinto",
  "Malbec & Cabernet-French",
  "2018",
  27510,
  "iscay.png",
  1
);

const vino2 = new Vino(
  2,
  "Adrianna Vineyard",
  "Catena Zapata",
  "Blanco",
  "Chardonnay",
  "2019",
  24850,
  "catenazapata.png",
  1
);

const vino3 = new Vino(
  3,
  "Nosotros",
  "Susana Balbo",
  "tinto",
  "Malbec",
  "2019",
  18500,
  "nosotros.png",
  1
);

const vino4 = new Vino(
  4,
  "Alma Mora",
  "Finca Las Moras",
  "tinto",
  "Malbec",
  "2020",
  1245,
  "almamora.png",
  0
);

const vino5 = new Vino(
  5,
  "Rutini",
  "La Rural",
  "tinto",
  "Malbec",
  "2020",
  2550,
  "rutini.png",
  0
);

const vino6 = new Vino(
  6,
  "Latitud 33°",
  "33°",
  "tinto",
  "Malbec",
  "2018",
  1650,
  "latitud33.png",
  0
);

const vino7 = new Vino(
  7,
  "San Felipe Caramagnola",
  "La Rural",
  "tinto",
  "Malbec",
  "2018",
  2280,
  "sanfelipe.png",
  0
);

const vino8 = new Vino(
  8,
  "Etchart Privado",
  "Etchart",
  "blanco",
  "Torrontés",
  "2018",
  950,
  "etchart.png",
  0
);

const vino9 = new Vino(
  9,
  "Trumpeter",
  "La Rural",
  "tinto",
  "Malbec",
  "2019",
  2280,
  "trumpeter.png",
  0
);

const vino10 = new Vino(
  10,
  "Don Valentin Lacrado",
  "Bianchi",
  "tinto",
  "Malbec",
  "2020",
  1050,
  "donvalentin.png",
  0
);

const catalogo = [
  vino1,
  vino2,
  vino3,
  vino4,
  vino5,
  vino6,
  vino7,
  vino8,
  vino9,
  vino10,
];

const carrito = [];

//OPTION 1

//MUESTRA LA OFERTA
function verOferta(lista) {
  let cantidadVino = 0;
  for (let vino of lista) {
    if (vino.oferta === 1) {
      let vinoCatalogo = document.createElement("div");
      vinoCatalogo.classList.add("containerVino");
      vinoCatalogo.setAttribute("id", vino.id);
      vinoCatalogo.innerHTML = `
      <div class="textContainer">
        <h1>${vino.nombre}</h1>
        <div class="tipoText">
          <p>${vino.variedad}</p>
          <p>${vino.bodega}</p>
          <p>${vino.tipo}</p>
        </div>
        <div class="tipoText">
          <h2>$${vino.precio}</h2>
          <div class="containerButton">
          <input id="textCant${vino.id}" class="textboxCantidad" type="text" value="1">
          <button id="agregarBtn${vino.id}" class="btnAgregar">Agregar</button>
        
          </div>
        </div>
      </div>
      <div class="imgContainer">
        <div class="imgVino">
        <img src="/public/images/wine/${vino.img}"  width="100" height="350" alt="vino.png">
        </div>
      </div>
    `;
      ofertaHTML.appendChild(vinoCatalogo);
      //BOTON AGREGAR
      let inputHTML = document.getElementById(`textCant${vino.id}`);

      let agregarBtn = document.getElementById(`agregarBtn${vino.id}`);

      agregarBtn.addEventListener("click", () => {
        if (isNaN(inputHTML.value) || inputHTML.value <= 0) {
          Swal.fire({
            background: "#FFDEC1",
            icon: "error",
            title: "La cantidad debe ser un numero y mayor a 0",
          });
          inputHTML.value = 1;
        } else {
          vino.cantidad = parseInt(inputHTML.value);
          agregarCarrito(vino);
          inputHTML.value = 1;
        }
      });
    }
  }
}

//MUESTRA CATALOGO COMPLETO
function verCatalogo(lista) {
  let cantidadVino = 0;
  for (let vino of lista) {
    let vinoCatalogo = document.createElement("div");
    vinoCatalogo.classList.add("containerVinoSmall");
    vinoCatalogo.setAttribute("id", vino.id);
    vinoCatalogo.innerHTML = `
        <div class="imgSmallContainer">
            <div class="imgSmallVino">
            <img src="/public/images/wine/${vino.img}" width="50" height="200" alt="vino.png">
            </div>
        </div>
        <div class="textSmallContainer">
            <h1>${vino.nombre}</h1>
          <div class="tipoSmallText">
              <p>${vino.variedad}</p>
              <p>${vino.bodega}</p>
              <p>${vino.tipo}</p>
          </div>
          <div class="tipoSmallText">
              <h2>$${vino.precio}</h2>
              <div class="containerSmallButton">
                <input id="textCant${vino.id}" class="textboxCantidad" type="text" value="1">
                <button id="agregarBtn${vino.id}" class="btnAgregar">Agregar</button>
              </div>
          </div>
        </div>
      `;
    catalogoHTML.appendChild(vinoCatalogo);
    //BOTON AGREGAR
    let inputHTML = document.getElementById(`textCant${vino.id}`);

    let agregarBtn = document.getElementById(`agregarBtn${vino.id}`);

    if (isNaN(inputHTML.value) && inputHTML.value <= 0) {
      Swal.fire({
        icon: "Error",
        title: "La cantidad debe ser un Numero mayor a 0",
        background: "#FFDEC1",
      });
    } else {
      agregarBtn.addEventListener("click", () => {
        vino.cantidad = parseInt(inputHTML.value);
        agregarCarrito(vino);
        inputHTML.value = 1;
      });
    }
  }
}

verOferta(catalogo);

btnCarritoHTML.addEventListener("click", () => {
  verCarrito(carrito);
});

btnOfertaHTML.addEventListener("click", () => {
  ofertaHTML.classList.remove("displayno");
  ofertaHTML.innerHTML = "";
  catalogoHTML.innerHTML = "";
  verOferta(catalogo);
});

btnCatalogoHTML.addEventListener("click", () => {
  ofertaHTML.classList.add("displayno");
  ofertaHTML.innerHTML = "";
  catalogoHTML.innerHTML = "";
  verCatalogo(catalogo);
});

function agregarCarrito(vino) {
  carrito.push(vino);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", JSON.stringify(total));
  Swal.fire({
    icon: "success",
    title: "Producto agregado al carrito",
    background: "#FFDEC1",
  });
}

cerrarCarritoHTML.addEventListener("click", () => {
  verCarritoHTML.innerHTML = "";
  totalCarritoHTML.innerHTML = "";
});

function verCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  let total = 0;
  for (let vino of carrito) {
    let precioTotal = vino.precio * vino.cantidad;
    let vinoCarrito = document.createElement("div");

    vinoCarrito.classList.add("listItem");
    vinoCarrito.setAttribute("id", vino.id);
    vinoCarrito.innerHTML = `
        <p>${vino.cantidad}</p>
        <p>${vino.nombre}</p>
        <p>${vino.bodega}</p>
        <p>$${vino.precio}</p>
        <p>$${precioTotal}</p>
      `;
    verCarritoHTML.appendChild(vinoCarrito);

    total += precioTotal;
  }
  let totalCarrito = document.createElement("div");
  totalCarrito.classList.add("listItem");
  totalCarrito.innerHTML = `<p class="totalFont">Total $${total}</p>`;
  totalCarritoHTML.appendChild(totalCarrito);
}

function vaciarCarrito(carritoCarga) {
  carritoCarga.length = 0;
  console.log(`Carrito vacio`);
}

function comprarCarrito(carritoCarga) {
  carritoCarga.length = 0;
  console.log(
    `Valor total del carrito $${total}. Muchas gracias por tu compra!`
  );
}

//Opcion Avanzada

function ordenarMenorMayor(lista) {
  const menorMayor = [].concat(lista);
  menorMayor.sort((a, b) => a.precio - b.precio);
  verCatalogo(menorMayor);
}

function ordenarMayorMenor(lista) {
  const mayorMenor = [].concat(lista);
  mayorMenor.sort((a, b) => b.precio - a.precio);
  verCatalogo(mayorMenor);
}

//agregar vino

function agregarVino() {
  let nombreVino = prompt("Ingrese el nombre del Vino");
  let bodegaVino = prompt("Ingrese la finca del Vino");
  let tipoVino = prompt("Ingrese el tipo del Vino");
  let precioVino = parseInt(prompt("Ingrese el precio del Vino"));

  const nuevoVino = new Vino(
    catalogo.length + 1,
    nombreVino,
    bodegaVino,
    tipoVino,
    precioVino
  );
  catalogo.push(nuevoVino);
  console.log(catalogo);
}
