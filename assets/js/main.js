document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("buscar").addEventListener("click", function () {
        const comuna = document.getElementById("Ingresar").value.toLowerCase();
        fetch("https://sinca.mma.gob.cl/index.php/json/listadomapa2k19/")
            .then(response => response.json())
            .then(data => {
                let post = '';
                let results = 0;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].comuna.toLowerCase().includes(comuna)) {
                        const calidadaire = data[i].status || 'No disponible';
                        post += `
                            <ul>
                                <li><strong>Comuna:</strong> ${data[i].comuna}</li>
                                <li><strong>Región:</strong> ${data[i].region}</li>
                                <li><strong>Concentración de la contaminación:</strong> ${calidadaire}</li>
                                <li><strong>Calidad del Aire:</strong> ${calidadaire}</li>
                            </ul><hr>
                        `;
                        results++;
                    }
                }
                if (results === 0) {
                    post = '<p>No se encontraron resultados para la comuna ingresada.</p>';
                }
                document.getElementById("consulta").innerHTML = post;
            })
            .catch(error => {
                document.getElementById("consulta").innerHTML = '<p>Hubo algún error al realizar la consulta. Por favor, intenta nuevamente.</p>';
                console.error("Error al obtener datos:", error);
            })
    })
})
