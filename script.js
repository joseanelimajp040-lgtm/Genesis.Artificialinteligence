// Registra o Service Worker para o PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('Service Worker registrado com sucesso:', registration))
            .catch(error => console.log('Falha ao registrar Service Worker:', error));
    });
}

// Elementos do DOM
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Evento de envio do formulário
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = messageInput.value.trim();

    if (userMessage) {
        // Adiciona a mensagem do usuário na tela
        addMessage(userMessage, 'user');
        messageInput.value = '';
        messageInput.style.height = 'auto'; // Reseta a altura

        // Simula o tempo de resposta da IA e mostra um indicador de "digitando"
        setTimeout(() => {
            getGenesisResponse(userMessage);
        }, 1000);
    }
});

// Ajusta a altura do textarea dinamicamente
messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto';
    messageInput.style.height = `${messageInput.scrollHeight}px`;
});

// Função para adicionar mensagem na janela do chat
function addMessage(message, sender, isLoading = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    
    if (isLoading) {
        messageElement.classList.add('loading');
        messageElement.innerHTML = `<p></p>`;
    } else {
        messageElement.innerHTML = `<p>${message}</p>`;
    }
    
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Rola para a última mensagem
    return messageElement; // Retorna o elemento para atualização posterior
}

// Função para obter a resposta da Genesis
async function getGenesisResponse(userMessage) {
    const loadingElement = addMessage('', 'genesis', true);

    // ===================================================================
    //  ÁREA DE INTEGRAÇÃO COM A API DA IA
    // ===================================================================
    //  Substitua esta lógica pela chamada à API de sua escolha (Gemini, OpenAI, etc.)
    //  
    //  Exemplo de como seria com uma API real:
    //  
    //  try {
    //      const response = await fetch('URL_DA_SUA_API', {
    //          method: 'POST',
    //          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer SUA_CHAVE_API' },
    //          body: JSON.stringify({ prompt: userMessage })
    //      });
    //      const data = await response.json();
    //      const aiMessage = data.choices[0].text; // O caminho do texto pode variar
    //      
    //      // Atualiza a mensagem de "carregando" com a resposta real
    //      loadingElement.classList.remove('loading');
    //      loadingElement.querySelector('p').innerText = aiMessage;
    //
    //  } catch (error) {
    //      console.error('Erro ao chamar a API:', error);
    //      loadingElement.classList.remove('loading');
    //      loadingElement.querySelector('p').innerText = 'Desculpe, ocorreu um erro. Tente novamente.';
    //  }
    //
    // ===================================================================

    // LÓGICA SIMULADA (para testes sem API)
    setTimeout(() => {
        const simulatedResponse = `Esta é uma resposta simulada para: "${userMessage}".\n\nPara que eu funcione de verdade, conecte-me a uma API de IA no arquivo \`script.js\`.`;
        loadingElement.classList.remove('loading');
        loadingElement.querySelector('p').innerText = simulatedResponse;
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1500); // Simula um tempo de resposta
}
