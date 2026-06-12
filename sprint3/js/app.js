document.addEventListener("DOMContentLoaded", () => {
    const cadastroForm = document.querySelector(".formulario-cadastro");
    const loginForm = document.querySelector(".formulario-login");
    const perfilForm = document.querySelector(".form-perfil");

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const email = cadastroForm.querySelector('input[name="email"]').value.trim();
            const senha = cadastroForm.querySelector('input[name="senha"]').value.trim();

            if (!nome || !email || !senha) {
                alert("Preencha todos os campos antes de seguir.");
                return;
            }

            const usuario = { nome, email, senha };
            localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
            localStorage.setItem("usuarioAtivo", JSON.stringify({ nome, email }));
            window.location.href = "dashboard.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("senha").value.trim();
            const usuarioRegistrado = lerUsuarioRegistrado();

            if (!usuarioRegistrado) {
                alert("Nenhum usuário cadastrado. Crie uma conta primeiro.");
                return;
            }

            if (email !== usuarioRegistrado.email || senha !== usuarioRegistrado.senha) {
                alert("E-mail ou senha incorretos.");
                return;
            }

            localStorage.setItem("usuarioAtivo", JSON.stringify({
                nome: usuarioRegistrado.nome,
                email: usuarioRegistrado.email,
            }));

            window.location.href = "dashboard.html";
        });
    }

    if (perfilForm) {
        preencherPerfil();

        perfilForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();

            if (!nome || !email) {
                alert("Preencha nome e e-mail antes de salvar.");
                return;
            }

            const usuarioAtivo = { nome, email };
            localStorage.setItem("usuarioAtivo", JSON.stringify(usuarioAtivo));

            const usuarioRegistrado = lerUsuarioRegistrado();
            if (usuarioRegistrado) {
                usuarioRegistrado.nome = nome;
                usuarioRegistrado.email = email;
                localStorage.setItem("usuarioRegistrado", JSON.stringify(usuarioRegistrado));
            }

            atualizarPerfilTexto(usuarioAtivo);
            alert("Dados atualizados com sucesso!");
        });
    }
});

function lerUsuarioRegistrado() {
    try {
        return JSON.parse(localStorage.getItem("usuarioRegistrado"));
    } catch {
        return null;
    }
}

function obterUsuarioAtivo() {
    try {
        return JSON.parse(localStorage.getItem("usuarioAtivo"));
    } catch {
        return null;
    }
}

function preencherPerfil() {
    const usuario = obterUsuarioAtivo();
    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    const nomeTitulo = document.getElementById("perfil-nome");
    const emailTexto = document.getElementById("perfil-email");
    const inputNome = document.getElementById("nome");
    const inputEmail = document.getElementById("email");

    if (nomeTitulo) {
        nomeTitulo.textContent = usuario.nome || "Nome do Usuário";
    }
    if (emailTexto) {
        emailTexto.textContent = usuario.email || "usuario@exemplo.com";
    }
    if (inputNome) {
        inputNome.value = usuario.nome || "";
    }
    if (inputEmail) {
        inputEmail.value = usuario.email || "";
    }
}

function atualizarPerfilTexto(usuario) {
    const nomeTitulo = document.getElementById("perfil-nome");
    const emailTexto = document.getElementById("perfil-email");

    if (nomeTitulo) {
        nomeTitulo.textContent = usuario.nome;
    }
    if (emailTexto) {
        emailTexto.textContent = usuario.email;
    }
}
