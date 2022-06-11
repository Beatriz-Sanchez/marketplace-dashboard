const inputProduto = document.querySelector("#inputProduto");
const inputPreco = document.querySelector("#inputPreco");
const inputQuantidade = document.querySelector("#inputQuantidade");
const inputImagem = document.querySelector("#inputImagem");
const formCadastro = document.querySelector("#form-cadastro");

const addEventoExcluir = (btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.parentElement.remove();
    Toastify({
      text: "O item foi removido com sucesso!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  });
};

const addEventoVisualizar = (btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("#imagemModalLabel").innerHTML = btn.dataset.bsName;
    
    if (btn.dataset.bsImage === "" || !btn.dataset.bsImage) {
        document.querySelector("#imagemModal").setAttribute("src", "./assets/images/placeholderProduto.png");
    }else{
        document.querySelector("#imagemModal").setAttribute("src", btn.dataset.bsImage);
    }

});
}

const btnsExcluir = document.querySelectorAll(".btn-excluir");

btnsExcluir.forEach((btn) => {
  addEventoExcluir(btn);
});

const btnsVisualizar = document.querySelectorAll(".btn-visualizar");

btnsVisualizar.forEach((btn) => {
  addEventoVisualizar(btn);
});


const addTd = (row, innerHTML = "") => {
  const newTd = document.createElement("td");
  newTd.innerHTML = innerHTML;
  row.append(newTd);

  return newTd;
};

const setAttributes = (el, attrs) => {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

formCadastro.addEventListener("submit", (e) => {
  //parou de funcionar quando mudei pra submit. arrumar
  const tBody = document.querySelector("tbody");
  const newRow = document.createElement("tr");
  tBody.appendChild(newRow);

  //adicionando nome do produto
  addTd(newRow, inputProduto.value);

  //adicionando preço
  const BLR = parseFloat(inputPreco.value).toFixed(2).replace(".", ",");
  addTd(newRow, `R$ ${BLR}`);

  //adicionando quantidade
  addTd(newRow, inputQuantidade.value);

  //adicionando botão de visualizar
  const tdVisualizar = addTd(newRow);
  const btnVisualizar = document.createElement("button");
  tdVisualizar.appendChild(btnVisualizar);
  btnVisualizar.classList.add("btn", "btn-primary", "btn-visualizar");
  btnVisualizar.innerHTML = "Visualizar";
  setAttributes(btnVisualizar, {
    "data-bs-toggle": "modal",
    "data-bs-target": "#modal-imagem",
    "data-bs-name": inputProduto.value,
    "data-bs-image": inputImagem.value,
  });

  //adicionando botão de excluir
  const tdExcluir = addTd(newRow);
  const btnExcluir = document.createElement("button");
  tdExcluir.appendChild(btnExcluir);
  btnExcluir.classList.add("btn", "btn-danger", "btn-excluir");
  btnExcluir.innerHTML = "Excluir";

  addEventoExcluir(btnExcluir);
  addEventoVisualizar(btnVisualizar);

  //limpar form
  inputProduto.value = "";
  inputPreco.value = "";
  inputQuantidade.value = "";
  inputImagem.value = "";

  Toastify({
    text: "O item foi cadastrado com sucesso!",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();

});
