export default function validarIniciarSesion(valores) {

    let error = {};
    // Validar los campos de crear-cuenta
    if(valores.email === '' || valores.password === ''){
        error.general = 'Todos los campos son obligatorios';
    } else if(valores.password.length <= 5){
        error.password = 'El password debe tener al menos 6 caracteres';
    }
    return error;
}