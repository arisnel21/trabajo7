/* 1. Tienes un array de productos de una tienda, cada uno con información sobre su nombre, categoría, precio, cantidad en inventario y descuento. Tu tarea es trabajar con este inventario utilizando programación funcional y estructuras de control.
Filtrar Productos con Descuento: Usa filter para obtener un nuevo array con los productos que tienen un descuento aplicado (es decir, discount > 0).
2. Calcular el Precio Final con Descuento: Usa map para calcular el precio final de los productos que tienen descuento y crea un nuevo array que incluya el priceAfterDiscount.
3. Identificar Productos con Stock Bajo: Usa un bucle para identificar los productos con menos de 5 unidades en inventario y guárdalos en un array nuevo.*/


const products = [
    {name: "Laptop", category: "electronica", price: 1200, stock: 5, discount: 0 },
    {name: "Televisor", category: "electronica", price: 800, stock: 3, discount: 10},
    {name: "Sofá", category: "hogar", price: 500, stock: 8, discount: 15},
    {name: "Mesa de comedor", category: "hogar", price: 700, stock: 2, discount: 0},
    {name: "Pan", category: "alimentos", price: 1.5, stock: 50, discount: 0},
    {name: "Leche", category: "alimentos", price: 1.2, stock: 20, discount: 5}
];

// 1. filtramos los productos que se encuentran con descuentos 
// --------------------------------------------------------------------------------------------------------------

    const discount = products.filter((disc) => disc.discount > 0 );
    
    // llamamos a la id que se encuentra en el div del documento
    const depositarInfo = document.getElementById("showInfo");
    
    // recorremos los productos con descuento y creamos por cada uno de ellos un parrafo 
    discount.forEach(dis => {
        const addInfo = document.createElement("p");
        addInfo.textContent = `Producto: ${dis.name} , Precio: ${dis.price} , Descuento: ${dis.discount}`;// agregamos la informacion a los parrafos
        depositarInfo.appendChild(addInfo); // finalmente agregamos la informacion a depositarInfo para que se muestre en el documento
    });
    // --------------------------------------------------------------------------------------------------------------


// 2. calculamos el precio Final con descuento. 
const muestraPrecioF = document.getElementById("pFinal");

const priceFinal = discount.map(pf => {
    // const porcentajeDescuento = (pf.discount / 100);
    const porcentajeDescuento = pf.price * (pf.discount /100);
    const precioFinal = pf.price - porcentajeDescuento;
   
    const visualizaPrecioF = document.createElement("p");
    visualizaPrecioF.textContent = `Producto: ${pf.name}-- Precio actual: ${pf.price}`

    // se agrega el precio despues de descuentos a un array
    muestraPrecioF.appendChild(visualizaPrecioF)

    const arrayFinalPrice = [];

    arrayFinalPrice.push(precioFinal);
    arrayFinalPrice.map(i =>{
        const finalPrice = document.createElement("p");
        finalPrice.textContent = `El precio del producto despues de agregado el descuento es: ${i} `
        
        muestraPrecioF.appendChild(finalPrice);
    });
})
// --------------------------------------------------------------------------------------------------
// 3. identificar productos con bajo stock: deben ser menor a 5 en inventario y guardarlos en un array
const muestraInventario = document.getElementById("bajoInventario");
// filtro productos con bajo stock usando filter
const filtroInventario = products.filter((cant) => cant.stock < 5 );
// console.log(filtroInventario);

filtroInventario.forEach((producto) =>{    
    const bajoInventario = document.createElement("p");
    bajoInventario.innerHTML =  `producto: ${producto.name}. stock: ${producto.stock}`
    muestraInventario.appendChild(bajoInventario)
});
// ------------------------------------------------------------------------------------------------------
// 4. 4. Actualizar el Stock de un Producto: Crea una función que reciba el nombre de un producto y una cantidad a agregar.
// Usa un try...catch para verificar si el producto existe en el array. Si existe, incrementa su stock; si no, lanza un error.
const muestraUpdate = document.getElementById("muestraUpdate")
const guardaInfo = document.createElement("p");
const recibeStock = document.getElementById("productInStock");


products.map((produ) =>{
    const muestraprodu = document.createElement("p");
    muestraprodu.innerHTML = `Nombre: ${produ.name}, Categoria: ${produ.category}, Precio: ${produ.price}, Stock: ${produ.stock}`;
    recibeStock.appendChild(muestraprodu)
})

function actualizarStock(nombreProducto, cantidad) {
    try {
        // Buscar el producto en el array
        const producto = products.find(p => p.name.toLowerCase === nombreProducto.toLowerCase);

        if (!producto) {
            throw new Error(`El producto "${nombreProducto}" no existe.`);
        }

        // Actualiza el stock
        producto.stock += cantidad;

        // Muestra Mensaje de exito
        guardaInfo.textContent = `El stock del producto "${nombreProducto}" se ha actualizado. Nuevo stock: ${producto.stock}`
        muestraUpdate.appendChild(guardaInfo)
    } catch (error) {
        alert(error.message);
    }
}

 // toma los elementos del dom
const inputNombre = document.getElementById('nombreProducto');
const inputCantidad = document.getElementById('cantidad');
const btnActualizar = document.getElementById('btnActualizar');


btnActualizar.addEventListener('click', () => {
    const nombre = inputNombre.value;
    const cantidad = parseInt(inputCantidad.value);

    actualizarStock(nombre, cantidad);

    inputNombre.value = "";
    inputCantidad.value = "";
});

   
// 5. Resumen por Categorías: Usa un bucle para contar cuántos productos hay en cada categoría (electrónica, hogar, alimentos)
//  y devuelve un objeto con este resumen.
const sumary = document.getElementById("resumen");
const addSumary = document.createElement("p");

const countProductsByCategory = (product) =>{
    const categorySummary = {};

    products.forEach(product => {
        if (!categorySummary[product.category]) {
            categorySummary[product.category] = 0;
            
        }
        categorySummary[product.category]++
    });
    return categorySummary
};

const resumen = countProductsByCategory(products);

let resumenText = '';
for (const category in resumen){
    resumenText += `Categoria: ${category}, Productos: ${resumen[category]}<br>`
}

addSumary.innerHTML = resumenText;
sumary.appendChild(addSumary);





