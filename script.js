document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatWindow = document.getElementById('chat-window');
    const welcomeMessage = document.getElementById('welcome-message');

    let isFirstMessageSent = false;
    let vozesDisponiveis = []; // Vamos guardar as vozes aqui

    // Função para carregar as vozes do sistema
    function carregarVozes() {
        vozesDisponiveis = window.speechSynthesis.getVoices();
    }

    // A lista de vozes é carregada de forma assíncrona, então precisamos esperar
    window.speechSynthesis.onvoiceschanged = carregarVozes;
    carregarVozes(); // Chama uma vez para o caso de já estarem carregadas

    // ==========================================================
    // NOVA FUNÇÃO PARA SÍNTESE DE VOZ
    // ==========================================================
    function falar(texto) {
        // Para a fala anterior se houver alguma em andamento
        window.speechSynthesis.cancel();

        // Cria o objeto de fala
        const utterance = new SpeechSynthesisUtterance(texto);

        // Tenta encontrar uma voz feminina em português do Brasil
        // O nome da voz pode variar MUITO dependendo do sistema (Windows, Android, etc)
        // Exemplos: "Google português do Brasil", "Microsoft Maria Desktop - Portuguese (Brazil)", "Luciana"
        const vozFeminina = vozesDisponiveis.find(voz =>
            voz.lang === 'pt-BR' && (voz.name.includes('Google') || voz.name.includes('Maria') || voz.name.includes('Luciana') || voz.name.includes('Feminino'))
        );

        if (vozFeminina) {
            utterance.voice = vozFeminina;
        } else {
            console.log("Nenhuma voz feminina em pt-BR encontrada. Usando a voz padrão.");
        }

        utterance.lang = 'pt-BR';
        utterance.rate = 1; // Velocidade da fala (1 é o normal)
        utterance.pitch = 1; // Tom da fala (1 é o normal)

        // Executa a fala
        window.speechSynthesis.speak(utterance);
    }
    // ==========================================================

    // Função para ajustar a altura do textarea
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = `${messageInput.scrollHeight}px`;
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = messageInput.value.trim();

        if (userMessage) {
            if (!isFirstMessageSent) {
                welcomeMessage.classList.add('hidden');
                isFirstMessageSent = true;
            }

            appendMessage('user', userMessage);
            messageInput.value = '';
            messageInput.style.height = 'auto';

            setTimeout(() => {
                getGenesisResponse(userMessage);
            }, 500);
        }
    });

    function appendMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        
        const p = document.createElement('p');
        p.textContent = text;
        messageElement.appendChild(p);
        
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageElement;
    }

    async function getGenesisResponse(userMessage) {
        const loadingElement = appendMessage('genesis', '');
        loadingElement.classList.add('loading');
        loadingElement.querySelector('p').textContent = ' ';

        // LÓGICA SIMULADA (para testes sem API)
        setTimeout(() => {
            const simulatedResponse = `Esta é uma resposta simulada para: "${userMessage}".\n\nPara que eu funcione de verdade, conecte-me a uma API de IA no arquivo \`script.js\`.`;
            
            loadingElement.classList.remove('loading');
            loadingElement.querySelector('p').innerText = simulatedResponse;
            chatWindow.scrollTop = chatWindow.scrollHeight;

            // ==============================================
            // A MÁGICA ACONTECE AQUI: CHAMA A FUNÇÃO DE VOZ
            // ==============================================
            falar(simulatedResponse);

        }, 1500);
    }
});
