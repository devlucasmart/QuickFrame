document.getElementById('projectForm').addEventListener('submit', function(event) {
    const input = document.getElementById("projectName");
    event.preventDefault();

    const projectName = document.getElementById('projectName').value.trim();

    if (!projectName) {
        alert("Por favor, insira um nome para o projeto.");
        return;
    }

    document.getElementById('output').classList.remove('d-none');

    generateAndDownloadProject(projectName);
    input.value = '';
});

function generateAndDownloadProject(projectName) {
    const zip = new JSZip();

    const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./css/style.css">
</head>
<body class="bg-light">

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">${projectName}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Início</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Sobre</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contato</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow-lg text-center">
            <h1 class="text-primary">Bem-vindo ao ${projectName}!</h1>
            <p class="text-muted">Este é um template inicial usando Bootstrap.</p>
            <button class="btn btn-success mt-3">Clique Aqui</button>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./js/script.js"></script>
</body>
</html>`;

    const cssContent = `body {
    font-family: Arial, sans-serif;
}

.card {
    max-width: 400px;
}`;

    const jsContent = `document.querySelector('.btn-success').addEventListener('click', () => {
    alert('Você clicou no botão!');
});

console.log('Projeto ${projectName} carregado!');`;

    zip.file(`${projectName}/index.html`, htmlContent);
    zip.file(`${projectName}/css/style.css`, cssContent);
    zip.file(`${projectName}/js/script.js`, jsContent);
    zip.folder(`${projectName}/img`);

    zip.generateAsync({ type: "blob" })
        .then(function(content) {
            saveAs(content, `${projectName}.zip`);
        });
}
