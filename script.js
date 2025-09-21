document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatWindow = document.getElementById('chat-window');
    const welcomeMessage = document.getElementById('welcome-message'); // Adiciona a referência ao welcome-message

    let isFirstMessageSent = false; // Flag para controlar a primeira mensagem

    // Função para ajustar a altura do textarea
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
    });

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const message = messageInput.value.trim();
        if (!message) return;

        // Esconde a mensagem de boas-vindas centralizada ao enviar a primeira mensagem
        if (!isFirstMessageSent) {
            welcomeMessage.classList.add('hidden');
            isFirstMessageSent = true;
        }

        appendMessage('user', message);
        messageInput.value = '';
        messageInput.style.height = 'auto'; // Resetar altura após enviar

        // Exibir mensagem de carregamento da Genesis
        const loadingMessageElement = appendMessage('genesis', 'Digitando...');
        loadingMessageElement.classList.add('loading'); // Adiciona classe para o efeito de "digitando"

        // Simula a resposta da IA
        await new Promise(resolve => setTimeout(resolve, 1500)); // Espera 1.5 segundos

        // Remover a mensagem de carregamento e adicionar a resposta real
        chatWindow.removeChild(loadingMessageElement);
        appendMessage('genesis', 'Compreendi! Estou processando sua solicitação.'); // Resposta de exemplo
    });

    function appendMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        
        const p = document.createElement('p');
        p.textContent = text;
        messageElement.appendChild(p);
        
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Rolagem automática
        return messageElement; // Retorna o elemento para manipulação posterior (ex: loading)
    }
});
