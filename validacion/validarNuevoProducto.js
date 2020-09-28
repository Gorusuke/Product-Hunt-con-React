export default function validarNuevoProducto(valores) {

    let error = {};
    // Validar los campos de crear-cuenta
    if(valores.nombre === '' || valores.empresa === '' || /*valores.imagen === '' ||*/ valores.url === '' || valores.descripcion === ''){
        error.general = 'Todos los campos son obligatorios';
    }
    return error;
}