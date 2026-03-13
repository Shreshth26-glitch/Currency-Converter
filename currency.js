const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromcurr = document.querySelector("select[name='from']");
const tocurr = document.querySelector("select[name='to']");

const msg = document.querySelector(".msg");

const swapBtn = document.querySelector(".swap");


for (let select of dropdowns) {

for (currcode in countryList) {

let option = document.createElement("option");

option.innerText = currcode;
option.value = currcode;

if (select.name === "from" && currcode === "USD")
option.selected = true;

if (select.name === "to" && currcode === "INR")
option.selected = true;

select.append(option);

}

select.addEventListener("change",(evt)=>{
updateflag(evt.target);
});

}


const updateflag = (element)=>{

let currcode = element.value;
let countrycode = countryList[currcode];

let img = element.parentElement.querySelector("img");

img.src = `https://flagsapi.com/${countrycode}/flat/64.png`;

};


swapBtn.addEventListener("click",()=>{

let temp = fromcurr.value;

fromcurr.value = tocurr.value;
tocurr.value = temp;

updateflag(fromcurr);
updateflag(tocurr);

updateExchangeRate();

});


btn.addEventListener("click",(evt)=>{
evt.preventDefault();
updateExchangeRate();
});


const updateExchangeRate = async()=>{

let amount = document.querySelector(".amount input");

let amtval = amount.value;

if(amtval=="" || amtval<1){

amtval=1;
amount.value="1";

}

msg.innerText="Fetching latest rates...";

const URL = `${BASE_URL}/${fromcurr.value}`;

let response = await fetch(URL);
let data = await response.json();

let rate = data.rates[tocurr.value];

let finalAmount = amtval * rate;

msg.innerText =
`${amtval} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;

};


window.addEventListener("load",()=>{
updateExchangeRate();
});
