/**
 * Una recomendación del instructor del curso para tener un código ordenado y limpio es colocar las variables en primer lugar, 
 * luego los eventos y finalmente las funciones.
 */


/**
 * VARIABLES
 */

/**
 * Se declaran las variables que se obtendrán desde elementos y clases del HTML.
 * REGLA IMPORTANTE: siempre que se utilice un template y se quiera asignar a una constante, se debe agregar luego del nombre del template, la palabra "content" 
 *      para que reconozca el contenido.
 * El método createDocumentFragment() crea un nuevo fragmento de documento vacío, dentro del cual un nodo del DOM puede ser adicionado para construir un nuevo 
 *      árbol de DOM. Esto significa que dentro de la constante "fragment" se guardara todo el template que fue diseñado en el HTML y que luego se utilizara para 
 *      dibujarlo en el DOM. Como recomendación; mantener el nombre de "fragment", ya que es un estándar y ayuda a entender que es lo que se esta haciendo.
 * Para guardar las tareas en memoria, se puede hacer utilizando un arreglo declarando una variable let con paréntesis cuadrados [], pero para este ejercicio se 
 *      utilizara una colección de datos, declarando la variable con llaves {}. La ventaja de utilizar colecciones de objetos es que es mucho mas rápido para 
 *      adquirir un solo elemento que se quiere modificar.
 */
const formulario = document.getElementById('formulario');
const input = document.getElementById('input');
const listaTarea = document.getElementById('lista-tareas');
const templateTarea = document.getElementById('template-tareas').content;
const fragment = document.createDocumentFragment();
let objetoTareas = {};


/**
 * EVENTOS
 */

/**
 * Se crea un evento que escucha al documento completo.
 * El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado. No espera los estilos CSS, imágenes y subframes 
 *      para finalizar la carga. Por lo que se le pueden pasar funciones o validaciones que correrá antes de que la pagina cargue todas sus vistas.
 * Con este método, la página HTML se estará ejecutando al mismo tiempo que el codigo JS, por lo que se puede agregar una validación para que busque en el 
 *      localStorage si existen "tareas" guardadas con anticipación.
 * Si existen tareas, utilizando JSON.parse() se traen las tareas ya parseadas y son asignadas a la variable objetoTareas para que sean mostradas en el formulario.
 * Se inicializan las funciones mostrarTareas() y cargarFecha().
 */
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')) {
        objetoTareas = JSON.parse(localStorage.getItem('tareas'));
    }

    mostrarTareas();

    cargarFecha();
});

/**
 * Se crea un nuevo evento que escuchara las interacciones del usuario con la lista de tareas.
 * Se inicializa la función btnAccion y se le pasa la letra e que significa "event".
 * Dependiendo de donde haga clic el usuario, diferentes opciones se ejecutaran, las cuales se definen en la función.
 */
listaTarea.addEventListener('click', (e) => {
    btnAccion(e);
})

/**
 * Se crea un nuevo evento que escuchara al formulario.
 * Lo primero es evitar que la página se recargue cada vez que se presione el botón "Agregar" ya que es de tipo submit, por lo que se debe agregar el método 
 *      preventDefault().
 * Luego se inicializa la función agregarTarea y se le pasa el event (e) como parámetro.
 */
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    agregarTarea(e);
})


/**
 * FUNCIONES
 */

/**
 * Función para agregar la fecha en el formulario.
 * La propiedad new Date() se utiliza para llamar a la función "date" que viene integrada al navegador.
 * La propiedad innerHTML() es el espacio de código dentro de un elemento.
 * El método toLocaleDateString() recibe dos parámetros iniciales: el primero es el lenguaje, para este caso español chile. El segundo es el formato de la fecha.
 */
const cargarFecha = () => {
    const rescatarFecha = new Date();
    fecha.innerHTML = rescatarFecha.toLocaleDateString('es-CL',{month: 'long', day:'numeric', year: 'numeric'});
    dia.innerHTML = rescatarFecha.toLocaleDateString('es-CL',{weekday: 'long'})
}

/**
 * Función para agregar una tarea a la lista.
 * Lo primero es capturar el elemento input que esta dentro del formulario. Para hacer esta captura se puede hacer de diferentes maneras, por ejemplo se podría
 *      apuntar directamente al evento utilizando (e) mas el target, en la posición cero, que es donde esta el input dentro de la etiqueta <form> y agregando la
 *      propiedad ".value" para obtener el texto escrito (también funciona si el input se envía en blanco). Otro método seria utilizando querySelector que sea de 
 *      tipo input y también agregando la propiedad ".value". Pero que pasa si el formulario tiene mas de un input, se puede hacer complicado diferenciar a cual
 *      se esta apuntando, por lo que para esos casos, es recomendable crear una variable y definir su nombre para luego pedir su valor.
 * Para este ejercicio, se decidió crear una nueva constante llamada "texto" que solo exista dentro de esta función y que obtenga el valor del input.
 * Se crea una validación para ver si el usuario esta mandando el input vacío. Si solo se escribiera input.value == '' se validaría solo si el input viene vacío,
 *      pero que pasaría en los casos donde se agrego solo espacios vacíos, se agregarían como una nueva tarea, para evitar esos problemas se utilizara el método
 *      trim() que remueve todos los espacios en blanco que pueda tener un input y comprobar si existe o no información. Finalmente, se agrega un return para detener
 *      la ejecución del programa.
 * En caso que la tarea si traiga un valor escrito, se crea un objeto llamado "tarea", el cual tendrá un id generado utilizando el método Date.now() para obtener la
 *      fecha y hora a la milésima de segundo en que se llame a la función. Con esta opción es muy poco probable que el id se repita. Texto será el valor escrito por
 *      el usuario dentro del input y finalmente, estado por defecto siempre será false.
 * Se llama a la colección de objetos y utilizando el id como llave principal, se asigna que para esa llave, se "empuja" la tarea dentro del objeto. Esto es lo mismo
 *      que hacer un push dentro de un arreglo. 
 * Una forma de limpiar el formulario puede ser utilizando el input e igualarlo a vacío. Pero existe otra forma de hacerlo y esta reseteando el contenido del 
 *      formulario utilizando el método reset().
 */
const agregarTarea = (e) => {
    //console.log(e.target[0].value);
    //console.log(e.target.querySelector('input').value);
    //console.log(input.value);

    const texto = e.target.querySelector('input').value;

    if (texto.trim() ===  '') {
        alert('Debes escribir una tarea antes de continuar.')
        return
    }

    const tarea = {
        id: Date.now(),
        texto: texto,
        estado: false
    }

    objetoTareas[tarea.id] = tarea;

    formulario.reset();

    mostrarTareas();
}

/**
 * Función para para cargar las tareas y cambiar los estilos CSS de los contenedores.
 * Lo primero será guardar la información de la tarea dentro de la memoria, para esto se utilizara la propiedad localStorage.
 * localStorage permite almacenar información desde el lado del servidor, por lo que estos seguirán existiendo aunque se cierre el navegador, pero es importante
 *      recordar que la tarea que se agregue, solo será visible dentro del navegador donde se creó, si utilizo otro navegador u otro dispositivo, no podre ver la
 *      tarea agregada. Para guardar la información en localStorage, se necesita usar el método setItem() el cual recibirá dos parámetros; el primero será una key o
 *      llave, la que podrá tener cualquier nombre. El segundo será los valores que deben estar en formato string, por lo que primero deben ser parseados utilizando
 *      el método stringify() y luego se agrega la colección de objetos o un arreglo en caso de usar estos.
 * Se crea una validación para comparar el largo de los elementos que tiene dentro la colección de objetos, En el caso en que no existan tareas guardadas, es decir,
 *      que el largo del objetoTareas sea igual a acero, utilizando la propiedad innerHTML se agrega un mensaje para que el usuario lo vea.
 * Se producirá un problema al imprimir las tareas, ya que cada vez que se lea una tarea, se imprimirá todas las tareas una y otra vez, por lo que se agregara la 
 *      opción para que se limpie la listaTareas por cada vez que se ejecute y solo quede visible la ultima lectura.
 * Para mostrar las tareas que ya existen en memoria, lo primero es obtener los valores del objeto utilizando Object y el método values() que devuelve un arreglo con
 *      los valores correspondientes a cada propiedad del objeto. Estas propiedades son devueltas en el mismo orden en que están almacenadas en el objeto.
 * Para recorrer la colección de objetos, se utilizara el método forEach().
 * Cuando se piensa utilizar un template para visualizar la respuesta, lo primero que se de hacer es realizar una "clonación" de la etiqueta <template> completa, para
 *      esto es recomendable crear una variable al comienzo del documento y ahora hacer el llamado. Se crea una nueva constante con el nombre "clone" (este nombre es
 *      un estándar y es recomendable dejarlo así ya que ayudara a otros programadores a entender nuestro código y que es lo que se esta haciendo). Luego se agrega la
 *      variable con el nombre del template junto a cloneNode() que siempre llevar el valor "true" dentro, esto se entiende como clone debe tomar todo lo que esta
 *      dentro de la etiqueta <template>. Una REGLA IMPORTANTE es que clone siempre debe ir al inicio del ciclo, ya que si se declara mas abajo, comenzara a editar las
 *      vistas dentro de otras vistas, lo que produciría errores en la visualización de los elementos en el HTML.
 * Se agrega el "texto" desde el objeto hacia la etiqueta <p> utilizando clone y la propiedad textContent que es una de las propiedades de cloneNode().
 * Se crea una validación para determinar el estado de la tarea que se esta reciendo desde la función btnAccion(). Lo primero es declarar los elementos a clonar en el
 *      mismo orden del HTML. Primero se apunta a la etiqueta con la clase "alert" y utilizando classList, luego el método replace() el cual recibe dos parámetros
 *      el primero es la clase original y el segundo es la clase nueva a cambiar. Además, utilizando el método replace() también se pueden cambiar los iconos, 
 *      utilizando queryselectorAll() para que busque todas las etiquetas <i> y las que estén en la posición cero [0] dentro del <template> se cambiara la clase
 *      del circulo con check por una flecha hacia atrás. Un último cambio que se hará es tachar el texto de la tarea, llamando con querySelector() a la etiqueta <p>
 *      y después utilizando la propiedad style de CSS, se utiliza "text-decoration", que no puede ir con guion (-), por lo que se debe escribir utilizando
 *      lowerCase y la propiedad CSS "line-through".
 * Otro paso que es necesario hacer, es pasar el id de la tarea a la etiqueta <i>, para eso se puede utilizar la propiedad "dataset" la que será muy útil a la hora
 *      de definir las acciones de la función btnAccion(). Primero se debe buscar todos los selectores que tengan la clase "fas" y la posición del icono (en la 
 *      posición [0] estará el icono check, en la posición [1] estará el botón menos), luego utilizando dataset.id le digo que tome el valor que se esta recibiendo
 *      desde id de la tarea. Si se imprime por consola las etiquetas <i> aparecerá el id dentro de una propiedad dataset.
 * Al final del ciclo, se debe llamar la variable fragment, la cual estará almacenando toda la cadena de elementos HTML que recibio clone.
 * Finalmente, para hacer visible el código clonado, fuera del ciclo forEach(), se debe llamar a la variable donde se agregaran los elementos creados,
 *      utilizando appendChild() se agregara un nuevo nodo al final de lista de un elemento hijo <di> con la clase alert, dentro del elemento padre <div> con el
 *      id template-tareas.
 */
const mostrarTareas = () => {

    localStorage.setItem('tareas', JSON.stringify(objetoTareas));

    if (Object.values(objetoTareas).length === 0) {
        listaTarea.innerHTML = `
            <div id="box-items">
                <p class="text-center alert alert-dark">No existen Tareas pendientes</p>
            </div>
        `;
        return
    }

    listaTarea.innerHTML = '';

    Object.values(objetoTareas).forEach(tarea => {
        const clone = templateTarea.cloneNode(true);

        clone.querySelector('p').textContent = tarea.texto;

        if (tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-secondary', 'alert-success');
            clone.querySelectorAll('i')[0].classList.replace('fa-check-circle', 'fa-undo-alt');
            clone.querySelector('p').style.textDecoration = "line-through";
        } 

        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id;
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id;

        fragment.appendChild(clone);
    });

    listaTarea.appendChild(fragment);
}

/**
 * Función que detecta sobre que botón estoy haciendo clic y cual es la acción que debe realizar.
 * Se pueden crear diferentes if dependiendo de cuantos iconos se les quieran asignar acciones. Para esto lo primero es comprobar si el usuario esta haciendo
 *      clic en el icono correcto, mediante un console.log apuntando a la clase del HTML que contenga la palabra 'fa-check-circle', si el clic es correcto, 
 *      en la consola aparecerá un mensaje indicando "true", y si pincha en otro lugar aparecerá "false".
 * Si ya se encuentran las clases de los iconos identificadas correctamente, se pasa a generar las acciones.
 * La primera acción será completar la tarea: cuando se presione el botón del circulo con el check, lo primero será acceder al id que estará almacenado en dataset
 *      y ahora que se tiene control del id único, se llamara a la colección de objetos, específicamente al estado, y este actualizara su valor a "true" para que 
 *      la función mostrarTareas cambie el estilo del <div> donde esta la tarea.
 *      Una ventaja de utilizar colección de objetos en vez de arreglos, es que en este mismo caso, si se hubiese utilizado un array, se debería haber acompañado del
 *      método find() para recorrer todo el arreglo hasta encontrar el valor estado, en cambio con un objeto, se puede apuntar directamente.
 * La segunda acción será eliminar la tarea: cuando se presione el botón con el signo menos, se ejecutara el operador "delete" el cual es una función propia de los
 *      objetos en JavaScript. Como indica el nombre, este operador remueve una propiedad, en este caso será la tarea que sea igual al id que se esta obteniendo desde
 *      el dataset.
 * La tercera acción será volver atrás la tarea: cuando se presione el botón con la flecha hacia atrás, realiza la operación contraria a la acción de completar la 
 *      tarea, busca el estado de la tarea que sea igual al id obtenido de dataset y cambia su valor a "false" para que la función pintarTarea cambie el estilo.
 * Finalmente, se utiliza el método stopPropagation() el cual es una característica de los eventos (e) para detener la consecuencia de eventos del contenedor padre, 
 *      el cual seria el <div id="lista-tareas"> y que no afecte a otros EventListener.
 */
const btnAccion = (e) => {

    // boton completar tarea.
    if (e.target.classList.contains('fa-check-circle')) {
        objetoTareas[e.target.dataset.id].estado = true;
        mostrarTareas();
    }

    // boton eliminar tarea.
    if (e.target.classList.contains('fa-minus-circle')) {
        delete objetoTareas[e.target.dataset.id]
        mostrarTareas();
    }

    // boton volver atras.
    if (e.target.classList.contains('fa-undo-alt')) {
        objetoTareas[e.target.dataset.id].estado = false;
        mostrarTareas();
    }

    e.stopPropagation();

}