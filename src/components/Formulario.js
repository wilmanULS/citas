import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
const Formulario = ({ crearCitas }) => {
   //Crear state de citas
   const [cita, actualizarCita] = useState({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
   });

   const [error, actualizarError] = useState(false);

   //funcion que se ejecuta cada que el usuario escribe
   const actualizarState = (e) => {
      actualizarCita({
         ...cita,
         [e.target.name]: e.target.value,
      });
   };

   //extraer valores

   const { mascota, propietario, fecha, hora, sintomas } = cita;

   const submitCita = (e) => {
      e.preventDefault();

      //validar
      if (
         mascota.trim() === "" ||
         propietario.trim() === "" ||
         fecha.trim() === "" ||
         hora.trim() === "" ||
         sintomas.trim() === ""
      ) {
         actualizarError(true);
         return;
      }
      actualizarError(false);
      //Asignar un ID
      cita.id = uuidv4();

      //crear la cita

      crearCitas(cita);

      //reiniciar el form
      actualizarCita({
         mascota: "",
         propietario: "",
         fecha: "",
         hora: "",
         sintomas: "",
      });
   };

   return (
      <Fragment>
         <h2>Crear Cita</h2>

         {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
         <form onSubmit={submitCita}>
            <label>Nombre Mascota</label>
            <input
               type="text"
               name="mascota"
               className="u-full-width"
               placeholder="Nombre de la mascota"
               onChange={actualizarState}
               value={mascota}
            />
            <label>Nombre del dueño</label>
            <input
               type="text"
               name="propietario"
               className="u-full-width"
               placeholder="Nombre Dueño de la mascota"
               onChange={actualizarState}
               value={propietario}
            />
            <label>Fecha</label>
            <input type="date" name="fecha" className="u-full-width" onChange={actualizarState} value={fecha} />
            <label>Hora</label>
            <input type="time" name="hora" className="u-full-width" onChange={actualizarState} value={hora} />
            <label>Sintomas</label>
            <textarea className="u-full-width" name="sintomas" onChange={actualizarState} value={sintomas}></textarea>
            <button type="submit" className="u-full-width button-primary">
               Agregar Cita
            </button>
         </form>
      </Fragment>
   );
};

Formulario.propTypes = {
   crearCitas: PropTypes.func.isRequired,
};
export default Formulario;
