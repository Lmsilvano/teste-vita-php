const form = document.querySelector('form');
console.log(typeof form)
const req = new FormData()


function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};



form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let validation = Object.keys(form).filter((input, i) => {
        if (!form[input].value || form[input].value === ' ' || typeof Number(form[input].value) !== 'number') {
            return i + 1
        }
    })
    console.log(validation)
    if (validation.length > 0) {
        validation.forEach((element, i) => {
            form[element].style.border = '1px solid red'
            let a = document.createElement('p')
            a.innerHTML = `Preencha os dados da Espécie <strong>${element}</strong> com números!`
            a.style = 'margin: auto; background-color: red; color: white; padding: 10px; border-radius: 5px; width: 50%; text-align: center;';
            form[element].insertAdjacentElement('afterend', a)
            setTimeout(() => { a.remove() }, 1550)
        })

        return
    }


    console.log(validation)
    Object.keys(form).forEach((input, i) => i < 5 && req.append(form[input].name, Number(form[input].value)))
    req.append('amostranum', uuidv4())
    var url = `http://localhost:8080/start.php`;
    await fetch(url, {
        method: "POST",
        body: req
    })
        .then(response => response.json()
        )
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log('ERROR: ' + error.message);
        })
    form.reset();
    Object.keys(form).forEach((input, i) => form[input].style.border = '')
    let a = document.createElement('p')
    a.innerHTML = 'Amostra cadastrada com sucesso!'
    a.style = 'margin: auto; background-color: green; color: white; padding: 10px; border-radius: 5px; width: 50%; text-align: center;';
    form.insertAdjacentElement('afterend', a)
    setTimeout(() => { a.remove() }, 1550)


})

async function getDatainPDF() {
    let relatorio = document.getElementById("relatorio")
    var url = `http://localhost:8080/start.php`;
    let response = await fetch(url, { method: "GET" })
        .then(response => response.json()
        )
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log('ERROR: ' + error.message);
        })
    console.log(response)
    await response.data.forEach((element, i) => {
        if (i % 2 == 0) {
            relatorio.innerHTML += `<div class="reli" style="display:flex; gap: 20px; background-color: #c3a2a2; width: 80%; justify-content: center;
            align-items: center;
            align-content: center; padding: 25px; ">
        <p style="color: red;">ID: ${element.id}</p>
        <p>Código da Amostra: <br><strong>${element.numerodeamostra}</strong></p>
        <p>Espécie 1: <br><strong>${element.especie_1}</strong></p>
        <p>Espécie 2: <br><strong>${element.especie_2}</strong></p>
        <p>Espécie 3: <br><strong>${element.especie_3}</strong></p>
        <p>Espécie 4: <br><strong>${element.especie_4}</strong></p>
        <p>Espécie 5: <br><strong>${element.especie_5}</strong></p>
        </div>`
        } else {
            relatorio.innerHTML += `<div class="reli" style="display:flex; gap: 20px; background-color: #bfbfbf; width: 80%; justify-content: center;
            align-items: center;
            align-content: center; padding: 25px;">
        <p style="color: red;">ID: ${element.id}</p>
        <p>Código da Amostra: <br><strong>${element.numerodeamostra}</strong></p>
        <p>Espécie 1: <br><strong>${element.especie_1}</strong></p>
        <p>Espécie 2: <br><strong>${element.especie_2}</strong></p>
        <p>Espécie 3: <br><strong>${element.especie_3}</strong></p>
        <p>Espécie 4: <br><strong>${element.especie_4}</strong></p>
        <p>Espécie 5: <br><strong>${element.especie_5}</strong></p>
        </div>`
        }
    })
    form.style.display = 'none';
    setTimeout(() => {
        form.style.display = 'flex';
    }, 1000);
    window.print()
    let reli = document.querySelectorAll('.reli')
    reli.forEach((element, i) => {
        element.remove()
    })

}


