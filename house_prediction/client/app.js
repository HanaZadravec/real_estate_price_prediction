function getCheckedValue(name) {
  let elements = document.getElementsByName(name);
  for (let element of elements) {
    if (element.checked) {
      return parseInt(element.value);
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  let sqft = document.getElementById("uiSqft").value;
  let bhk = getCheckedValue("uiBHK");
  let bathrooms = getCheckedValue("uiBathrooms");
  let location = document.getElementById("uiLocations").value;
  let estPrice = document.getElementById("uiEstimatedPrice");

  let url = "http://127.0.0.1:5000/predict_house_price"; // Use this if using flask";

  $.post(
    url,
    {
      total_sqft: parseFloat(sqft),
      bhk: bhk,
      bath: bathrooms,
      location: location,
    },
    function (data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = `<h2>${data.estimated_price} Lakh</h2>`;
      console.log(status);
    }
  );
}

function onPageLoad() {
  console.log("document loaded");
  let url = "http://127.0.0.1:5000/get_location_names"; // Use this if using flask

  $.get(url, function (data, status) {
    console.log("Received response for get_location_names request");
    if (data && data.locations) {
      let uiLocations = document.getElementById("uiLocations");
      uiLocations.innerHTML = "";
      data.locations.forEach((location) => {
        let opt = new Option(location);
        uiLocations.appendChild(opt);
      });
    }
  });
}

window.onload = onPageLoad;
