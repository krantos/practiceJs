
window.addEventListener("load", function () {
  //getDataFromTheServer();
});

let fecha_actual = '';

function eventoDataHandler() {
  
 function getEventosPerDay(day) {

  }

  function printData() {
    console.log(this.data);
  }

}

function fullfillEvents(fecha) {
  fecha_actual = fecha;
  getDataFromTheServer();
}

function getDataFromTheServer() {
    var responsedData;
    var requestURL = 'http://localhost/eventcalendar/datos.php';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
      responsedData = request.response;
      populateData(responsedData);
    }
  }

    function populateData(jsonObj) {
      const allEvents = jsonObj;
      paintDayWithEvent(allEvents);
      filtrarEventosPorFecha(allEvents);
      agregarEventosEnTabla();
  }

  function filtrarEventosPorFecha (datosObj) {
      const tabla_eventos = document.getElementById('tabla_de_eventos');
      tabla_eventos.innerHTML='';
      const details_eventos = document.getElementById('details');
      details_eventos.innerHTML = '';
      const filtrado_fecha = datosObj.filter(ev => ev.fecha.includes(fecha_actual));
      filtrado_fecha.map((ev, i) => {
        const new_row = `
          <tr class="short_description" style="cursor: pointer;">
            <td id="${ev.id}" class="evento_hora">${ev.hora}</td>
            <td id="${ev.id}" class="evento_titulo">${ev.nombre}</td>
          </tr>
        `;
        const details_data = `
          <div class="hide detail" id="details_${ev.id}">
            <h2>${ev.nombre}</h2>
            <p>Hora: ${ev.hora} | Precio: ${ev.precio} | Direccion: ${ev.direccion} | Link: ${ev.link}</p>
          </id>
        `;
        tabla_eventos.innerHTML += new_row;
        details.innerHTML += details_data;
      });
  }

  function agregarEventosEnTabla() {
    const allEv = Array.from(document.querySelectorAll('.short_description'));
    allEv.forEach((ev) => {
      ev.addEventListener('click', expandInformation);
    });
  }

  function expandInformation(e) {
    const listOfDetails = Array.from(document.querySelectorAll('.detail'));
    listOfDetails.map(item => item.classList.remove('show'));
    const id = e.target.getAttribute('id');
    const idChild = `details_${id}`;
    (document.getElementById(idChild)).classList.toggle('show');
  }

  function paintDayWithEvent(allEvents) {
    allEvents.forEach(element => {
      const selector = `[data-date="${element.fecha}"]`;
      const recuadro_con_evento = document.querySelector(selector);
      if(recuadro_con_evento) {
        recuadro_con_evento.classList.add('tiene_evento');
      }
    });
  }
