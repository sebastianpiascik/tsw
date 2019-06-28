/* jshint esversion: 6, browser: true, devel: true */
const mapka = [
  { woj: "pomorskie", left: 173, top: 1, width: 152, height: 125 },
  { woj: "warmińsko-mazurskie", left: 327, top: 44, width: 168, height: 102 },
  { woj: "zachodnio-pomorskie", left: 16, top: 54, width: 143, height: 124 },
  { woj: "podlaskie", left: 501, top: 79, width: 115, height: 171 },
  { woj: "lubuskie", left: 26, top: 193, width: 89, height: 141 },
  { woj: "wielkopolskie", left: 123, top: 215, width: 130, height: 123 },
  { woj: "mazowieckie", left: 387, top: 167, width: 106, height: 205 },
  { woj: "kujawsko-pomorskie", left: 206, top: 147, width: 138, height: 64 },
  { woj: "łódzkie", left: 277, top: 285, width: 104, height: 101 },
  { woj: "dolnośląskie", left: 56, top: 345, width: 140, height: 70 },
  { woj: "lubelskie", left: 499, top: 289, width: 121, height: 151 },
  { woj: "opolskie", left: 203, top: 395, width: 59, height: 81 },
  { woj: "śląskie", left: 268, top: 399, width: 62, height: 156 },
  { woj: "świętokrzyskie", left: 354, top: 389, width: 133, height: 69 },
  { woj: "małopolskie", left: 332, top: 462, width: 121, height: 111 },
  { woj: "podkarpackie", left: 458, top: 459, width: 109, height: 113 }
];

const chartLabels = [
  "KOALICJA EUROPEJSKA",
  "LEWICA RAZEM",
  "POLEXIT",
  "JEDNOŚĆ NARODU",
  "PRAWO I SPRAWIEDLIWOŚĆ",
  "EUROPA CHRISTI",
  "WIOSNA",
  "KONFEDERACJA",
  "KUKIZ`15",
  "POLSKA FAIR PLAY"
];

document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.querySelector(".map");
  const mapPointer = document.querySelector(".map__pointer");
  const communitiesList = document.querySelector(".communities ul");

  const makeDiagramVoivodeship = async communities => {
    const ctx = document.getElementById("myChart").getContext("2d");
    let chartData = Array(chartLabels.length).fill(0);
    let amountOfCommunitites = 0;

    await communities.forEach(community => {
      let index = 0;
      chartLabels.forEach(label => {
        chartData[index] += community[label];
        index++;
      });
      amountOfCommunitites++;
    });
    chartData = chartData.map(data => {
      return data / amountOfCommunitites;
    });

    console.log(chartData);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "# of Votes",
            data: chartData
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        responsive: true
      }
    });
  };

  const makeDiagramCommunity = async community => {
    const ctx = document.getElementById("myChart2").getContext("2d");
    console.log(community.id);
    let chartData = Array(chartLabels.length).fill(0);

    let index = 0;
    chartLabels.forEach(label => {
      chartData[index] += community[label];
      index++;
    });
    chartData = chartData.map(data => {
      return data / chartLabels.length;
    });

    console.log(chartData);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "# of Votes",
            data: chartData
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        responsive: true
      }
    });
  };

  const getMapVoivodeship = (x, y) => {
    let voivodeship;
    mapka.forEach(woj => {
      if (x >= woj.left && x <= woj.left + woj.width) {
        if (y >= woj.top && y <= woj.top + woj.height) {
          voivodeship = woj;
        }
      }
    });
    return voivodeship;
  };

  const getVoivodeship = async mapVoivodeship => {
    let voivodeship = {};
    await fetch("http://10.10.44.6:3000/wojewodztwa")
      .then(res => res.json())
      .then(
        res =>
          (voivodeship = res.filter(
            woj => woj.województwo === mapVoivodeship.woj
          )[0])
      );
    return voivodeship;
  };

  const compare = (a, b) => {
    let gminaNameA = a.gmina.replace("gm.", "").replace("m.", "");
    let gminaNameB = b.gmina.replace("gm.", "").replace("m.", "");
    if (gminaNameA < gminaNameB) {
      return -1;
    }
    if (gminaNameA > gminaNameB) {
      return 1;
    }
    return 0;
  };

  const getCommunities = async voivodeship => {
    console.log(voivodeship);
    let communities;
    await fetch(
      `http://10.10.44.6:3000/wyniki?id_gte=${
        voivodeship.id
      }&id_lte=${voivodeship.id + 19999}`
    )
      .then(res => res.json())
      .then(async res => {
        communities = res;
        await res.sort(compare);
        communitiesList.innerHTML = "";
        res.map(community => {
          let listItem = document.createElement("li");
          listItem.addEventListener(
            "click",
            () => {
              makeDiagramCommunity(community);
            },
            false
          );
          listItem.innerHTML = community.gmina
            .replace("gm.", "")
            .replace("m.", "");
          communitiesList.appendChild(listItem);
        });
      });
    return communities;
  };

  const styleMapPointer = mapVoivodeship => {
    console.log(mapVoivodeship);
    mapPointer.style.width = mapVoivodeship.width + "px";
    mapPointer.style.height = mapVoivodeship.height + "px";
    mapPointer.style.top = mapVoivodeship.top + "px";
    mapPointer.style.left = mapVoivodeship.left + "px";
  };

  const mapClicked = async e => {
    let x = e.pageX - mapContainer.offsetLeft;
    let y = e.pageY - mapContainer.offsetTop;
    console.log(x, y);
    let mapVoivodeship = await getMapVoivodeship(x, y);
    styleMapPointer(mapVoivodeship);
    // console.log(mapVoivodeship);
    let voivodeship = await getVoivodeship(mapVoivodeship);
    // console.log(voivodeship);
    let communities = await getCommunities(voivodeship);
    console.log(communities);
    makeDiagramVoivodeship(communities);
  };

  mapContainer.addEventListener("click", mapClicked);
});
