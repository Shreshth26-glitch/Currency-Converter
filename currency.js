const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector("select[name='from']");
const tocurr = document.querySelector("select[name='to']");



for (let select of dropdowns) {
    for (currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name == "from" && currcode == "USD") {
            newoption.selected = "SELECTED"
        } else if (select.name == "to" && currcode == "INR") {
            newoption.selected = "SELECTED"
        }
        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    } )
}
const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
     let amount = document.querySelector(".amount input");
    let amtval = amount.value;

    if (amtval == "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromcurr.value.toUpperCase()}`;

    try {
        let response = await fetch(URL);

        if (!response.ok) {
            console.log("API Error:", response.status);
            return;
        }

        let data = await response.json();

        let rate = data.rates[tocurr.value.toUpperCase()];

        let finalAmount = amtval * rate;

        document.querySelector(".msg").innerText =
            `${amtval} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
    } catch (error) {
        console.log("Fetch Error:", error);
    }
}

window.addEventListener("load", () => {
    updateExchangeRate();
})
