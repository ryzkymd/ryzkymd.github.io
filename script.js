const getDataUpdate = fetch('https://api.kawalcorona.com')
    .then(results => results.json())
    .then(results => {
        let getLastUpdate = results[36].attributes.Last_Update;
        let date = new Date(getLastUpdate);
        const weekDay = Intl.DateTimeFormat('id', { weekday: 'short' }).format(date);
        const ymd = Intl.DateTimeFormat('id', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
        const hour = Intl.DateTimeFormat('id', { hour: 'numeric' }).format(date);
        const minute = Intl.DateTimeFormat('id', { minute: 'numeric' }).format(date);
        const second = Intl.DateTimeFormat('id', { second: 'numeric', timeZoneName: 'short' }).format(date);
        let newDate = `${weekDay}, ${ymd} ${hour}:${minute}:${second}`;
        const lastUpdate = document.querySelector('.last-update');
        lastUpdate.innerHTML = `Sumber data : Kementerian Kesehatan & JHU. Update terakhir : ${newDate}`;
    });

const getDataPositive = fetch('https://api.kawalcorona.com/positif')
    .then(results => results.json())
    .then(results => {
        const positive = document.querySelector('.positive')
        positive.innerHTML = results.value;
    });

const getDataRecovered = fetch('https://api.kawalcorona.com/sembuh')
    .then(results => results.json())
    .then(results => {
        const recovered = document.querySelector('.recovered')
        recovered.innerHTML = results.value;
    });
const getDataDied = fetch('https://api.kawalcorona.com/meninggal')
    .then(results => results.json())
    .then(results => {
        const died = document.querySelector('.died');
        died.innerHTML = results.value;
    });

const getDataIndo = fetch('https://api.kawalcorona.com')
    .then(results => results.json())
    .then(results => {
        const result = results[36].attributes;
        const indoPos = document.querySelector('.indo-pos');
        const indoRec = document.querySelector('.indo-rec');
        const indoDea = document.querySelector('.indo-dea');
        const indoAct = document.querySelector('.indo-act');

        indoPos.innerHTML = result.Confirmed;
        indoRec.innerHTML = result.Recovered;
        indoDea.innerHTML = result.Deaths;
        indoAct.innerHTML = result.Active;
    });

const getDataProvIndo = fetch(`https://api.kawalcorona.com/indonesia/provinsi`)
    .then(results => results.json())
    .then(results => {
        let tableRow = '';
        for (let i = 0; i < results.length; i++) {
            let no = i + 1;
            tableRow += showDataProv(results[i], no);
            const tbProv = document.querySelector('.tb-prov');
            tbProv.innerHTML = tableRow;
        }
    });

const getDataCountry = fetch(`https://api.kawalcorona.com`)
    .then(results => results.json())
    .then(results => {
        let tableRow = ''
        for (let i = 0; i < results.length; i++) {
            let no = i + 1;
            tableRow += showDataCountry(results[i], no)
            const tbCountry = document.querySelector('.tb-country');
            tbCountry.innerHTML = tableRow;
        }
    });

function showDataProv(result, i) {
    return `
        <tr>
            <td>${i}</td>
            <td>${result.attributes.Provinsi}</td>
            <td>${result.attributes.Kasus_Posi}</td>
            <td>${result.attributes.Kasus_Semb}</td>
            <td>${result.attributes.Kasus_Meni}</td>
        </tr>
    `
}

function showDataCountry(result, i) {
    return `
        <tr>
            <td>${i}</td>
            <td>${result.attributes.Country_Region}</td>
            <td>${result.attributes.Confirmed}</td>
            <td>${result.attributes.Recovered}</td>
            <td>${result.attributes.Deaths}</td>
        </tr>
    `
}

const ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: '',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});