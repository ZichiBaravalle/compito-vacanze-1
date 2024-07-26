const utenti = ["z.baravalle.2969@vallauri.edu"];
const libri = {
  "La Bella e la Bestia": {
    genere: "Fantasy",
    anno: "2012/05/15",
  },
  "Il Signore dei Anelli": {
    genere: "Horror",
    anno: "2015/10/20",
  },
  "Orgoglio e Pregiudizio": {
    genere: "Romantico",
    anno: "2008/07/01",
  },
  "Il Nome della Rosa": {
    genere: "Avventura",
    anno: "2019/03/15",
  },
  Dune: {
    genere: "Sci-Fi",
    anno: "2010/12/31",
  },
};
let prestiti = [];
let utenteAttuale = "";

window.onload = () => {
  if (document.getElementById("accedi") && document.getElementById("email")) {
    localStorage.clear();
    document.getElementById("accedi").addEventListener("click", login);
    document
      .getElementById("email")
      .addEventListener("keypress", (e) => (e.key === "Enter" ? login() : ""));
  } else {
    utenteAttuale = localStorage.getItem("utenteAttuale");
    ordinaLibri();
  }
};

const login = () => {
  const username = document.getElementById("email").value;
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (username && regex.test(username) && utenti.includes(username)) {
    localStorage.setItem("utenteAttuale", username);
    window.location.href = "pages/libri.html";
  } else {
    if (!document.querySelector("small")) {
      const small = document.createElement("small");
      small.innerText = "Email non trovata o non valida";
      small.style.color = "red";
      document.querySelector("main").appendChild(small);
    }
  }
};

const ordinaLibri = (campo = "") => {
  const table = document.getElementById("tableLibri");
  let sortLibri;
  table.innerHTML = "";
  switch (campo) {
    case "titolo":
      sortLibri = Object.entries(libri).sort((a, b) => {
        const aLower = a[0].toLowerCase();
        const bLower = b[0].toLowerCase();
        if (aLower < bLower) return -1;
        else if (aLower > bLower) return 1;
        else return 0;
      });
      for (const items of sortLibri) {
        const tr = document.createElement("tr");
        const nomeTr = document.createElement("td");
        nomeTr.innerText = items[0];
        const genere = document.createElement("td");
        genere.innerText = items[1].genere;
        const anno = document.createElement("td");
        anno.innerText = trasformData(items[1].anno);
        tr.appendChild(nomeTr);
        tr.appendChild(genere);
        tr.appendChild(anno);
        table.appendChild(tr);
      }
      break;

    case "genere":
      sortLibri = Object.entries(libri).sort((a, b) => {
        const aLower = a[1].genere.toLowerCase();
        const bLower = b[1].genere.toLowerCase();
        if (aLower < bLower) return -1;
        else if (aLower > bLower) return 1;
        else return 0;
      });
      for (const items of sortLibri) {
        const tr = document.createElement("tr");
        const nomeTr = document.createElement("td");
        nomeTr.innerText = items[0];
        const genere = document.createElement("td");
        genere.innerText = items[1].genere;
        const anno = document.createElement("td");
        anno.innerText = trasformData(items[1].anno);
        tr.appendChild(nomeTr);
        tr.appendChild(genere);
        tr.appendChild(anno);
        table.appendChild(tr);
      }
      break;

    case "anno":
      sortLibri = Object.entries(libri).sort((a, b) => {
        const aLower = a[1].anno;
        const bLower = b[1].anno;
        if (aLower < bLower) return -1;
        else if (aLower > bLower) return 1;
        else return 0;
      });
      for (const items of sortLibri) {
        const tr = document.createElement("tr");
        const nomeTr = document.createElement("td");
        nomeTr.innerText = items[0];
        const genere = document.createElement("td");
        genere.innerText = items[1].genere;
        const anno = document.createElement("td");
        anno.innerText = trasformData(items[1].anno);
        tr.appendChild(nomeTr);
        tr.appendChild(genere);
        tr.appendChild(anno);
        table.appendChild(tr);
      }
      break;

    default:
      for (const [nome, item] of Object.entries(libri)) {
        const tr = document.createElement("tr");
        const nomeTr = document.createElement("td");
        nomeTr.innerText = nome;
        const genere = document.createElement("td");
        genere.innerText = item.genere;
        const anno = document.createElement("td");
        anno.innerText = trasformData(item.anno);
        tr.appendChild(nomeTr);
        tr.appendChild(genere);
        tr.appendChild(anno);
        table.appendChild(tr);
      }
      break;
  }
};

const trasformData = (data) =>
  new Date(data).toLocaleString("it-IT", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

const cambioAzione = (azione = "") => {
  switch (azione) {
    case "inserisci":
      document.querySelector("fieldset").innerHTML = `
        <label for="titolo"
          >Titolo* <input type="text" id="titolo" />
        </label>
        <label for="genere"
          >Genere* <input type="text" id="genere"
        /></label>
        <label for="anno">Anno* <input type="date" id="anno" /></label>
        <button onclick="inserisciLibro()">Inserisci</button>
        `;
      break;

    case "prestito":
      document.querySelector("fieldset").innerHTML = `
        <label for="titolo"
          >Titolo* <select id="selectTitolo"></select>
        </label>
        <label for="anno">Data di consegna* <input type="date" id="anno" /></label>
        <button onclick="nuovoPrestito()">Inserisci Prestito</button>
        `;

      for (const items of Object.entries(libri)) {
        const option = document.createElement("option");
        option.value = items[0].toLowerCase();
        option.innerText = items[0];
        document.getElementById("selectTitolo").appendChild(option);
      }

      document.getElementById("selectTitolo").selectedIndex = 0;
      break;

    default:
      break;
  }
};

const nuovoPrestito = () => {
  const titolo = document.getElementById("selectTitolo").value;
  const anno = document.getElementById("anno").value;
  if (
    anno &&
    String(new Date(anno)) !== "Invalid Date" &&
    new Date(anno) > new Date()
  ) {
    prestiti.push({
      titolo: titolo,
      dataPrestito: new Date(),
      dataPrestitoScadenza: new Date(anno),
    });
    console.log(prestiti);
  } 
  else if (
    document.querySelector("fieldset").children[1].lastChild.tagName !== "SMALL"
  ) {
    const small = document.createElement("small");
    small.innerText = " La data non è valida";
    small.style.color = "red";
    document.querySelector("fieldset").children[1].appendChild(small);
  } 
   if (
    anno &&
    String(new Date(anno)) !== "Invalid Date" &&
    new Date(anno) > new Date() &&
    document.querySelector("fieldset").children[1].lastChild.tagName === "SMALL"
  )
    document.querySelector("fieldset").children[1].lastChild.remove();
};

const inserisciLibro = () => {
  let titolo = document.getElementById("titolo").value;
  let anno = document.getElementById("anno").value;
  let genere = document.getElementById("genere").value;
  if (titolo && anno && genere && String(new Date(anno)) !== "Invalid Date") {
    libri[titolo] = {
      genere: genere,
      anno: new Date(anno),
    };
    document.getElementById("titolo").value = "";
    document.getElementById("anno").value = "";
    document.getElementById("genere").value = "";
    ordinaLibri();
  }
  if (
    !titolo &&
    document.querySelector("fieldset").children[0].lastChild.tagName !== "SMALL"
  ) {
    const small = document.createElement("small");
    small.innerText = " Il titolo è richiesto";
    small.style.color = "red";
    document.querySelector("fieldset").children[0].appendChild(small);
  } else if (
    titolo &&
    document.querySelector("fieldset").children[0].lastChild.tagName === "SMALL"
  )
    document.querySelector("fieldset").children[0].lastChild.remove();
  if (
    !genere &&
    document.querySelector("fieldset").children[1].lastChild.tagName !== "SMALL"
  ) {
    const small = document.createElement("small");
    small.innerText = " Il genere è richiesto";
    small.style.color = "red";
    document.querySelector("fieldset").children[1].appendChild(small);
  } else if (
    genere &&
    document.querySelector("fieldset").children[1].lastChild.tagName === "SMALL"
  )
    document.querySelector("fieldset").children[1].lastChild.remove();
  if (
    (!anno || String(new Date(anno)) !== "Invalid Date") &&
    document.querySelector("fieldset").children[2].lastChild.tagName !== "SMALL"
  ) {
    const small = document.createElement("small");
    small.innerText = " L'anno è richiesto";
    small.style.color = "red";
    document.querySelector("fieldset").children[2].appendChild(small);
  } else if (
    anno &&
    String(new Date(anno)) !== "Invalid Date" &&
    document.querySelector("fieldset").children[2].lastChild.tagName === "SMALL"
  )
    document.querySelector("fieldset").children[2].lastChild.remove();
};
