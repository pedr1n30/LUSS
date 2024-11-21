const muniInput = document.getElementById("muni-pesquisar");
const ano = document.getElementById("ano");
const sugerir = document.getElementById("sugerir");
const resultados = document.querySelector(".results");
const municipio1 = document.getElementById("muni-comparar");
const ano1 = document.getElementById("ano-comparar");
const municipio2 = document.getElementById("muni-comparar-2");
const ano2 = document.getElementById("ano-comparar-2");
const resulComp = document.getElementById("resulcomp");
const resulComp2 = document.getElementById("resulcomp2");
const sugerir1 = document.getElementById("sugerir1");
const sugerir2 = document.getElementById("sugerir2");
let estado = 1;
let totalEstados = 3;

const apiUrl = "https://projeto-luss1-default-rtdb.firebaseio.com/";

async function selecAno(year) {
  try {
    const response = await fetch(`${apiUrl}${year}.json`);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados da API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function updateSuggestions() {
  const year = ano.value;
  const procuText = muniInput.value.toLowerCase();
  sugerir.innerHTML = "";

  const yearData = await selecAno(year);

  const filteredMunicipios = yearData.filter((municipio) =>
    municipio["Município"].toLowerCase().includes(procuText)
  );

  const limitedMunicipios = filteredMunicipios.slice(0, 3);

  limitedMunicipios.forEach((municipio) => {
    const suggestion = document.createElement("div");
    suggestion.classList.add("suggestion-item");
    suggestion.textContent = municipio["Município"];
    suggestion.addEventListener("click", () => {
      muniInput.value = municipio["Município"];
      showResultPrincipal(municipio);
      sugerir.innerHTML = "";
    });
    sugerir.appendChild(suggestion);
  });

  if (limitedMunicipios.length === 0) {
    sugerir.innerHTML = "<p>Município não encontrado.</p>";
  }
}

function showResultPrincipal(municipio) {
  resultados.innerHTML = `
    <h2>Dados do município: ${municipio["Município"]}</h2>
    <p>Fossa rudimentar: ${municipio["Fossa rudimentar"]}</p>
    <p>Fossa séptica: ${municipio["Fossa séptica"]}</p>
    <p>Não sabe: ${municipio["Não sabe"]}</p>
    <p>Não tem instalação: ${municipio["Não tem instalação"]}</p>
    <p>Outro: ${municipio["Outro"]}</p>
    <p>Rede geral de esgoto ou pluvial: ${municipio["Rede geral de esgoto ou pluvial"]}</p>
    <p>Total: ${municipio["Total"]}</p>
    <p>Vala: ${municipio["Vala"]}</p>
  `;
}

async function updateSuggestions1() {
  const year = ano1.value;
  const procuText = municipio1.value.toLowerCase();
  sugerir1.innerHTML = "";

  const yearData = await selecAno(year);

  const filteredMunicipios = yearData.filter((municipio) =>
    municipio["Município"].toLowerCase().includes(procuText)
  );

  const limitedMunicipios = filteredMunicipios.slice(0, 3);

  limitedMunicipios.forEach((municipio) => {
    const suggestion = document.createElement("div");
    suggestion.classList.add("suggestion-item");
    suggestion.textContent = municipio["Município"];
    suggestion.addEventListener("click", () => {
      municipio1.value = municipio["Município"];
      showResultComparar1(municipio);
      sugerir1.innerHTML = "";
    });
    sugerir1.appendChild(suggestion);
  });

  if (limitedMunicipios.length === 0) {
    sugerir1.innerHTML = "<p>Município não encontrado.</p>";
  }
}

function showResultComparar1(municipio) {
  resulComp.innerHTML = `
    <h2>Dados do município: ${municipio["Município"]}</h2>
    <p>Fossa rudimentar: ${municipio["Fossa rudimentar"]}</p>
    <p>Fossa séptica: ${municipio["Fossa séptica"]}</p>
    <p>Não sabe: ${municipio["Não sabe"]}</p>
    <p>Não tem instalação: ${municipio["Não tem instalação"]}</p>
    <p>Outro: ${municipio["Outro"]}</p>
    <p>Rede geral de esgoto ou pluvial: ${municipio["Rede geral de esgoto ou pluvial"]}</p>
    <p>Total: ${municipio["Total"]}</p>
    <p>Vala: ${municipio["Vala"]}</p>
  `;
}

async function updateSuggestions2() {
  const year = ano2.value;
  const procuText = municipio2.value.toLowerCase();
  sugerir2.innerHTML = "";

  const yearData = await selecAno(year);

  const filteredMunicipios = yearData.filter((municipio) =>
    municipio["Município"].toLowerCase().includes(procuText)
  );

  const limitedMunicipios = filteredMunicipios.slice(0, 3);

  limitedMunicipios.forEach((municipio) => {
    const suggestion = document.createElement("div");
    suggestion.classList.add("suggestion-item");
    suggestion.textContent = municipio["Município"];
    suggestion.addEventListener("click", () => {
      municipio2.value = municipio["Município"];
      showResultComparar2(municipio);
      sugerir2.innerHTML = "";
    });
    sugerir2.appendChild(suggestion);
  });

  if (limitedMunicipios.length === 0) {
    sugerir2.innerHTML = "<p>Município não encontrado.</p>";
  }
}

function showResultComparar2(municipio) {
  resulComp2.innerHTML = `
    <h2>Dados do município: ${municipio["Município"]}</h2>
    <p>Fossa rudimentar: ${municipio["Fossa rudimentar"]}</p>
    <p>Fossa séptica: ${municipio["Fossa séptica"]}</p>
    <p>Não sabe: ${municipio["Não sabe"]}</p>
    <p>Não tem instalação: ${municipio["Não tem instalação"]}</p>
    <p>Outro: ${municipio["Outro"]}</p>
    <p>Rede geral de esgoto ou pluvial: ${municipio["Rede geral de esgoto ou pluvial"]}</p>
    <p>Total: ${municipio["Total"]}</p>
    <p>Vala: ${municipio["Vala"]}</p>
  `;
}

muniInput.addEventListener("input", updateSuggestions);
ano.addEventListener("change", () => {
  muniInput.value = "";
  sugerir.innerHTML = "";
  resultados.innerHTML = "";
});

municipio1.addEventListener("input", updateSuggestions1);
ano1.addEventListener("change", () => {
  municipio1.value = "";
  sugerir1.innerHTML = "";
  resulComp.innerHTML = "";
});

municipio2.addEventListener("input", updateSuggestions2);
ano2.addEventListener("change", () => {
  municipio2.value = "";
  sugerir2.innerHTML = "";
  resulComp2.innerHTML = "";
});

function trocarImagem(diretion) {
  estado += diretion;
  if (estado < 1) {
    estado = totalEstados;
  } else if (estado > totalEstados) {
    estado = 1;
  }
  var image = document.getElementById("carrossel");
  switch (estado) {
    case 1:
      image.src = "./Assets/img/1990.jpg";
      break;
    case 2:
      image.src = "./Assets/img/2000.jpg";
      break;
    case 3:
      image.src = "./Assets/img/2010.jpg";
  }
}

!(function (e, n, i, s) {
  var d = "InfogramEmbeds";
  var o = e.getElementsByTagName(n)[0];
  if (window[d] && window[d].initialized)
    window[d].process && window[d].process();
  else if (!e.getElementById(i)) {
    var r = e.createElement(n);
    (r.async = 1), (r.id = i), (r.src = s), o.parentNode.insertBefore(r, o);
  }
})(
  document,
  "script",
  "infogram-async",
  "https://e.infogram.com/js/dist/embed-loader-min.js"
);
