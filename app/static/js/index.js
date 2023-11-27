let dataTable;
let dataTableIsInitialized = false;
let selectedXColumn = 'name'; // Valor predeterminado para el eje X
let selectedYColumn = 'indods'; // Valor predeterminado para el eje Y
let myChart; // Variable para almacenar la instancia de Chart.js

const formatDate = (dateString) => {
    return moment(dateString).format("YYYY-MM-DD");
};

const dataTableOptions = {
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
        { orderable: false, targets: [4, 5, 6] },
        { searchable: false, targets: [0, 5, 6] },
        // Añade más configuraciones según sea necesario
    ],
    pageLength: 4,
    destroy: true
};

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listGraf20s();

    dataTable = $("#datatable-graf20s").DataTable(dataTableOptions);

    dataTableIsInitialized = true;

    // Llama a la función para crear el gráfico después de que la DataTable se haya inicializado
    await createChart();
};

const listGraf20s = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/app/list_graf20s/");
        const data = await response.json();

        console.log(data.lgraf20s);  // Agrega esta línea

        // Recuperar las columnas disponibles del primer elemento en los datos (asumiendo que todas las filas tienen las mismas columnas)
        const columns = Object.keys(data.lgraf20s[0]);

        // Crear opciones para el menú desplegable de selección de ejes X e Y
        const selectOptions = columns.map(column => `<option value="${column}">${column}</option>`).join('');
        document.getElementById('xColumnSelect').innerHTML = selectOptions;
        document.getElementById('yColumnSelect').innerHTML = selectOptions;

        let content = ``;
        data.lgraf20s.forEach((graf20s, index) => {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${graf20s.name}</td>
                    <td>${graf20s.indods}</td>
                    <td>${graf20s.indicadorinterno}</td>
                    <td>${graf20s.program}</td>
                    <td>${graf20s.estudio}</td>
                    <td>${graf20s.tema}</td>  
                    <td>${graf20s.perfil}</td>
                    <td>${graf20s.start_date}</td>
                </tr>`;
        });
        tableBody_graf20s.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
};

const updateSelectedColumns = () => {
    const xSelectElement = document.getElementById('xColumnSelect');
    const ySelectElement = document.getElementById('yColumnSelect');
    
    selectedXColumn = xSelectElement.value;
    selectedYColumn = ySelectElement.value;
};

const createChart = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/app/list_graf20s/");
        const data = await response.json();

        let labels = [];
        let datasetData = [];

        data.lgraf20s.forEach((graf20s, index) => {
            labels.push(graf20s[selectedXColumn]);
            datasetData.push(graf20s[selectedYColumn]);
        });

        console.log("Labels:", labels);
        console.log("Dataset Data:", datasetData);

        const ctx = document.getElementById('myChart').getContext('2d');

        // Verificar si existe la propiedad 'myChart' en 'window' y si tiene un método 'destroy'
        if (myChart && typeof myChart.destroy === 'function') {
            myChart.destroy();
        }

        // Crear un nuevo gráfico de barras
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: selectedYColumn,
                    data: datasetData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (ex) {
        alert(ex);
    }
};

const generateChart = async () => {
    updateSelectedColumns();
    await createChart();
};

const filterByDate = async () => {
    try {
        const startDate = formatDate(document.getElementById('startDate').value);
        const endDate = formatDate(document.getElementById('endDate').value);

        const response = await fetch(`http://127.0.0.1:8000/app/list_graf20s/?start_date=${startDate}&end_date=${endDate}`);
        const data = await response.json();

        console.log(data.lgraf20s);  // Agrega esta línea

        let content = ``;
        data.lgraf20s.forEach((graf20s, index) => {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${graf20s.name}</td>
                    <td>${graf20s.indods}</td>
                    <td>${graf20s.indicadorinterno}</td>
                    <td>${graf20s.program}</td>
                    <td>${graf20s.estudio}</td>
                    <td>${graf20s.tema}</td>  
                    <td>${graf20s.perfil}</td>
                    <td>${graf20s.start_date}</td>
                </tr>`;
        });
        tableBody_graf20s.innerHTML = content;

        // Actualizar el gráfico después de filtrar por fecha
        await createChart();
    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
    await generateChart(); // Llama a esta función para generar el gráfico al cargar la página

    // Agregar evento al botón de búsqueda por fecha
    document.getElementById('searchButton').addEventListener('click', filterByDate);
});





