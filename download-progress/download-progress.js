// Paso 1: iniciar la búsqueda y obtener un lector
const getData = async () => {
  let response = await fetch(
    'https://api.github.com/repos/javascript-tutorial/es.javascript.info/commits?per_page=100'
  );

  const reader = response.body.getReader();

  // Paso 2: obtener la longitud total
  const contentLength = +response.headers.get('Content-Length');

  // Paso 3: leer los datos
  let receivedLength = 0; // cantidad de bytes recibidos hasta el momento
  let chunks = []; // matriz de fragmentos binarios recibidos (comprende el cuerpo)
  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
    receivedLength += value.length;

    console.log(`Recibí ${receivedLength} de ${contentLength}`);
  }

  // Paso 4: concatenar fragmentos en un solo Uint8Array
  let chunksAll = new Uint8Array(receivedLength); // (4.1)
  let position = 0;
  for (let chunk of chunks) {
    chunksAll.set(chunk, position); // (4.2)
    position += chunk.length;
  }

  // Paso 5: decodificar en un string
  let result = new TextDecoder('utf-8').decode(chunksAll);

  // ¡Hemos terminado!
  let commits = JSON.parse(result);
  alert(commits[0].author.login);
};

getData();
