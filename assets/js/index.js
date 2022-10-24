/**
 * VARIABLES
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

/** Evento que escucha al documento completo. **/
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')) {
        objetoTareas = JSON.parse(localStorage.getItem('tareas'));
    }

    mostrarTareas();

    cargarFecha();
});

/** Evento que escuchara las interacciones del usuario con la lista de tareas. **/
listaTarea.addEventListener('click', (e) => {
    btnAccion(e);
})

/** Evento que escuchara al formulario. **/
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    agregarTarea(e);
})


/**
 * FUNCIONES
 */

/** Función para agregar la fecha en el formulario. **/
const cargarFecha = () => {
    const rescatarFecha = new Date();
    fecha.innerHTML = rescatarFecha.toLocaleDateString('es-CL',{month: 'long', day:'numeric', year: 'numeric'});
    dia.innerHTML = rescatarFecha.toLocaleDateString('es-CL',{weekday: 'long'})
}

/** Función para agregar una tarea a la lista. **/
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

/** Función para cargar las tareas y cambiar los estilos CSS de los contenedores. **/
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

/** Función que detecta sobre que botón estoy haciendo clic y cual es la acción que debe realizar. **/
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
