$(document).ready(function () {
    $("#buscar").on("click", function () {
        const comuna = $("#Ingresar").val().toLowerCase();
        $.ajax({
            url: "https://sinca.mma.gob.cl/index.php/json/listadomapa2k19/",
            method: "GET",
            dataType: "json",
            success: function (data) {
                let post = ''
                let results = 0
                for (let i = 0; i < data.length; i++) {
                    if (data[i].comuna.toLowerCase().includes(comuna)) {
                        const calidadAire = data[i].status || 'No disponible'; {
                            post += `
                    <ul>
                                <li><strong>Comuna:</strong> ${data[i].comuna}</li>
                                <li><strong>Región:</strong> ${data[i].region}</li>
                                <li><strong>Concentración de la contaminación:</strong> ${calidadAire}</li>
                                <li><strong>Calidad del Aire:</strong> ${calidadAire}</li>
                            </ul><hr>
                    `; results++;
                        }
                    }
                }
                if (results === 0) {
                    post = '<p>No se encontraron resultados para la comuna ingresada.</p>';
                }
                $("#consulta").html(post);
            },
            error: function (error) {
                $("#consulta").html('<p>Hubo algún error al realizar la consulta. Por favor, intenta nuevamente.</p>');
            }
        })
    })
})

