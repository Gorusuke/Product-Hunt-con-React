import React,{useState, useEffect} from 'react';

const useValidacion = (stateInicial, validar, fn) => {

    const [valores, setValores] = useState(stateInicial);
    const [error, setError] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrores = Object.keys(error).length === 0;
            if(noErrores){
                fn(); // fn = funcion que se ejecutara en el componente
            }
            setSubmitForm(false);
        }
    }, [error]);

    // Funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    } 

    // Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setError(erroresValidacion);
        setSubmitForm(true);
    }

    

    return {
        valores, 
        error,
        handleSubmit,
        handleChange
    }
}
 
export default useValidacion;