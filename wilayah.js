function testAlert(msg) {
  alert(msg);
}

function selectWilayah ( provinceID, regencyID, districtID, villageID ) {

  const BASE_API_URL = "https://api.kodewilayah.web.id";

  /** Daftar Provinsi */
  fetch(BASE_API_URL + "/provinces")
        .then(response => {
              if (!response.ok) {
                  throw new Error("Error fetching API data!");
              }
              return response.json();
          })
          .then(result => {

              const select = document.getElementById(provinceID);

              result.data.forEach(province => {
                  const option = document.createElement("option");

                  option.value = province.code;
                  option.textContent = province.name;

                  select.appendChild(option);
              });

          })
          .catch(error => {
              console.error(error);
              alert("Terjadi kesalahan saat mengambil data provinsi.");
          });

}
