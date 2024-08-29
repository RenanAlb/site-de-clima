const buttonSubmit = document.querySelector('#submit');
const input = document.querySelector('#input');
const backgroundImage = document.querySelector('.background-image');
const buscasDiv = document.querySelector('.buscas');

const passwordAPI = 'a90cac6c8561a205458e87e0bd237123';

const renderizarDados = (dados) => {
  buscasDiv.style.opacity = '1';
  buscasDiv.innerHTML = `
    <h1>${dados.temperatura}°C</h1>
    <div>
      <section>
        <p>${dados.nome}</p>
        <strong>${dados.pais}</strong>
      </section>
      <h3>Temp. máxima: ${dados.temperatura_max}°C</h3>
      <h3>Temp. mínima: ${dados.temperatura_min}°C</h3>
      <h3>Sensação térmica: ${dados.sensacao_termica}°C</h3>
    </div>
  `;

  backgroundImage.style = `background-image: url(img/${dados.condicao_tempo.toLowerCase()}.jpg)`;
  backgroundImage.innerHTML = `
    <section id="top">
      <h1>${dados.nome}</h1>
      <h1>${dados.temperatura}°C</h1>
    </section>
    <section id="bottom">
      <h3>Temp. máxima: ${dados.temperatura_max}°C</h3>
      <h3>Temp. mínima: ${dados.temperatura_min}°C</h3>
    </section>
  `;
};

const connectToApi = async (e) => {
  e.preventDefault();

  if (!input.value) {
    alert('Digite algo primeiro!');
    console.error('Sem dados!');
    return null;
  }

  const cityName = input.value;

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${passwordAPI}&units=metric`, );

    if (!response.ok) {
      throw new Error('Erro ao buscar os dados');
    }

    const responseJSON = await response.json();
    console.log(responseJSON);

    const dados = {
      sensacao_termica: responseJSON.main.feels_like,
      humidade: responseJSON.main.humidity,
      temperatura: responseJSON.main.temp,
      temperatura_max: responseJSON.main.temp_max,
      temperatura_min: responseJSON.main.temp_min,
      nome: responseJSON.name,
      pais: responseJSON.sys.country,
      condicao_tempo: responseJSON.weather[0].main
    }

    if (dados) renderizarDados(dados);
  } catch(error) {
    console.error(error);
  }
};

buttonSubmit.addEventListener('click', connectToApi);