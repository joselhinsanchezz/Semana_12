// URL del JSON
const DATA_URL = 'https://nataliasotelo.github.io/act-estrellas/estrellas.json';

// Función para obtener los datos del JSON
let getJSONData = function(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            return {
                status: 'ok',
                data: response
            };
        })
        .catch(function(error) {
            return {
                status: 'error',
                data: error
            };
        });
};

// Función para mostrar los usuarios
function displayUsers(data) {
    const userListElement = document.getElementById("userList");
    const userSelectElement = document.getElementById("userSelect");

    // Limpiar las listas
    userListElement.innerHTML = '';
    userSelectElement.innerHTML = '<option value="">Elige un usuario...</option>';

    // Iterar sobre el array de usuarios
    if (Array.isArray(data)) {
        data.forEach(user => {
            // Crear la cantidad de estrellas como emojis
            let stars = '⭐'.repeat(user.numberrange);

            // Agregar los usuarios a la lista con las estrellas en emoji
            userListElement.innerHTML += `
            <li class="list-group-item">
                Nombre: ${user.name}, Compañía: ${user.company}, Número de Estrellas: ${stars}
            </li>`;

            // Agregar los nombres de los usuarios al select
            userSelectElement.innerHTML += `<option value="${user.name}">${user.name}</option>`;
        });
    }
}

// Función para agregar comentarios
function addComment(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de manera predeterminada

    const userSelected = document.getElementById("userSelect").value;
    const commentText = document.getElementById("comment").value;
    const commentListElement = document.getElementById("commentList");

    if (userSelected && commentText) {
        // Crear un elemento de comentario y agregarlo a la lista
        const commentItem = document.createElement("li");
        commentItem.className = "list-group-item";
        commentItem.innerHTML = `<strong>${userSelected}:</strong> ${commentText}`;
        commentListElement.appendChild(commentItem);

        // Limpiar el formulario
        document.getElementById("commentForm").reset();
    }
}

// Cuando el contenido del DOM está cargado
document.addEventListener("DOMContentLoaded", function() {
    getJSONData(DATA_URL).then(function(resultado) {
        if (resultado.status === 'ok') {
            displayUsers(resultado.data);  // Llamar a la función que muestra los usuarios
        } else {
            console.error('Error al cargar los datos:', resultado.data);
        }
    });

    // Manejar el envío del formulario de comentarios
    document.getElementById("commentForm").addEventListener("submit", addComment);
});
