const shet = document.querySelector("#schetchik");
const dohod_in_second = document.querySelector("#dohov-v-sekundu");
const main_button = document.querySelector("#glavnaya-knopka");
const upgrade = document.querySelector("#kupit-uluchshenie");
const avtoklik = document.querySelector("#kupit-avtoklik");
const ulushenie = document.querySelector("#tsena-uluchsheniya");
const btn_upgrade = document.getElementById("kupit-avtoklik");
const cost_of_upgrade = document.querySelector("#tsena-avtoklika");

let dengi = 0;
let sila_klika = 1;
let avto_dohod = 0;
let stoimost_sily = 10;
let stoimost_avto = 50;

function obnovit_ekran() {
  shet.innerText = dengi;
  ulushenie.innerText = stoimost_sily;
  cost_of_upgrade.innerText = stoimost_avto;
}

function sdelat_klik() {
  let summa = (dengi += sila_klika);
  console.log(summa);
  obnovit_ekran();
}
main_button.addEventListener("click", sdelat_klik);

function uluchit_klik() {
  if (dengi >= stoimost_sily) {
    dengi -= stoimost_sily;
    sila_klika += 1;
    stoimost_sily = Math.round(stoimost_sily * 1.5);
  } else {
    alert("Недостаточно средств");
  }
  obnovit_ekran();
}

upgrade.addEventListener("click", uluchit_klik);

stoimost_avto = 50;

function auto() {
  if (dengi >= stoimost_avto) {
    dengi -= stoimost_avto;
    avto_dohod += 1;
    stoimost_avto = Math.round(stoimost_avto * 1.3);
  } else {
    alert("Недостаточно средств");
  }
  obnovit_ekran();
}

btn_upgrade.addEventListener("click", auto);
setInterval(function () {
  dengi += avto_dohod;
  sohranenie();
  obnovit_ekran();
}, 1000);

function sohranenie() {
  const dannye_igry = {
    tekushie_dengi: dengi,
    sila: sila_klika,
    dohod: avto_dohod,
    tsena_sily: stoimost_sily,
    tsena_avto: stoimost_avto,
  };
  localStorage.setItem("moe_sohranenie_kliker", JSON.stringify(dannye_igry));
}

function zagruzit_iz_pamyati() {
  const pamyat = localStorage.getItem("moe_sohranenie_kliker");
  if (pamyat) {
    const zagruzhennoe = JSON.parse(pamyat);
    dengi = zagruzhennoe.tekushie_dengi;
    sila_klika = zagruzhennoe.sila;
    avto_dohod = zagruzhennoe.dohod;
    stoimost_sily = zagruzhennoe.tsena_sily;
    stoimost_avto = zagruzhennoe.tsena_avto;
    obnovit_ekran();
  }
}

zagruzit_iz_pamyati();
