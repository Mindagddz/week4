Papa.parse("weather.csv", {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function(results) {
    const table = document.getElementById("weather-table");
    const status = document.getElementById("status");
    const data = results.data;

    table.innerHTML = "";

    if (results.errors.length > 0 || data.length === 0) {
      status.textContent = "Sorry, the data could not be loaded.";
      return;
    }

    data.forEach(function(row) {
      const tr = document.createElement("tr");

      const values = [
        row.month,
        row.max_temp_c,
        row.min_temp_c,
        row.sunshine_hours,
        row.rainfall_mm
      ];

      values.forEach(function(value) {
        const td = document.createElement("td");
        td.textContent = value;
        tr.appendChild(td);
      });

      table.appendChild(tr);
    });

    status.textContent = "Data loaded successfully.";
  },

  error: function(error) {
    document.getElementById("status").textContent =
      "Error loading data. Please check weather.csv.";

    console.error(error);
  }
});
