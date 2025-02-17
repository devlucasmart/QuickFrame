document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const projectName = document.getElementById('projectName').value;
    document.getElementById('output').classList.remove('hidden');
    
    document.getElementById('downloadButton').addEventListener('click', function() {
        generateAndDownloadProject(projectName);
    });
});

function generateAndDownloadProject(projectName) {
    const zip = new JSZip();

    // Estrutura básica do HTML
    const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Bem-vindo ao projeto ${projectName}!</h1>
    <script src="script.js"></script>
</body>
</html>`;

    // Estrutura básica do CSS
    const cssContent = `body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

h1 {
    color: #333;
}`;

    // Estrutura básica do JS
    const jsContent = `console.log('Projeto ${projectName} carregado!');`;

    // Adiciona os arquivos ao ZIP
    zip.file(`${projectName}/index.html`, htmlContent);
    zip.file(`${projectName}/style.css`, cssContent);
    zip.file(`${projectName}/script.js`, jsContent);

    // Gera o arquivo ZIP e faz o download
    zip.generateAsync({ type: "blob" })
        .then(function(content) {
            saveAs(content, `${projectName}.zip`);
        });
}