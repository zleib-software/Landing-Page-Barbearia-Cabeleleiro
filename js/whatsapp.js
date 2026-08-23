/**
 * INTEGRAÇÃO INTELIGENTE COM A API DO WHATSAPP
 * Gerador de URLs codificadas com mensagens dinâmicas personalizadas para agendamentos e contatos
 */

const WhatsAppIntegration = {
  /**
   * Constrói a URL oficial do WhatsApp (wa.me) com a mensagem formatada
   * @param {string} text - Texto da mensagem pré-formatada
   * @param {string} phone - Número de telefone (opcional, usa o padrão do config)
   * @returns {string} URL completa do WhatsApp
   */
  buildUrl(text, phone = SITE_CONFIG.whatsapp.phoneNumber) {
    const cleanPhone = phone.replace(/\D/g, "");
    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  },

  /**
   * Abre o WhatsApp em uma nova aba
   * @param {string} text 
   * @param {string} phone 
   */
  openChat(text, phone) {
    const url = this.buildUrl(text, phone);
    window.open(url, "_blank", "noopener,noreferrer");
  },

  /**
   * Formata uma mensagem de agendamento completa
   */
  formatBookingMessage({ service, professional, date, period, clientName, notes }) {
    let msg = `*SOLICITAÇÃO DE AGENDAMENTO - ${SITE_CONFIG.businessName}*\n\n`;
    
    if (clientName && clientName.trim()) {
      msg += `*Cliente:* ${clientName.trim()}\n`;
    }
    
    if (service && service.trim()) {
      msg += `*Serviço desejado:* ${service.trim()}\n`;
    }
    
    if (professional && professional.trim()) {
      msg += `*Profissional de preferência:* ${professional.trim()}\n`;
    }
    
    if (date && date.trim()) {
      // Formata a data se for YYYY-MM-DD
      let dateDisplay = date;
      if (date.includes("-")) {
        const parts = date.split("-");
        if (parts.length === 3) {
          dateDisplay = `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
      }
      msg += `*Data sugerida:* ${dateDisplay}\n`;
    }
    
    if (period && period.trim()) {
      msg += `*Período/Horário:* ${period.trim()}\n`;
    }

    if (notes && notes.trim()) {
      msg += `*Observações:* ${notes.trim()}\n`;
    }

    msg += `\n_Olá! Poderia confirmar se há disponibilidade para esse horário? Obrigado(a)!_`;
    return msg;
  },

  /**
   * Formata mensagem para um serviço específico
   */
  formatServiceMessage(serviceTitle, price) {
    let msg = `Olá! Gostaria de agendar o serviço: *${serviceTitle}*`;
    if (price) {
      msg += ` (${price})`;
    }
    msg += ` na *${SITE_CONFIG.businessName}*.\nQuais são os horários disponíveis para esta semana?`;
    return msg;
  },

  /**
   * Formata mensagem para um profissional específico
   */
  formatTeamMessage(professionalName, role) {
    return `Olá! Gostaria de verificar a agenda e marcar um horário com *${professionalName}* (${role}) na *${SITE_CONFIG.businessName}*. Poderiam me informar os dias e horários livres?`;
  },

  /**
   * Inicializa manipuladores de eventos e formulários da página
   */
  init() {
    // 1. Widget de Agendamento Rápido no Hero
    const heroBookingForm = document.getElementById("hero-booking-form");
    if (heroBookingForm) {
      heroBookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const serviceSelect = document.getElementById("quick-service");
        const profSelect = document.getElementById("quick-professional");
        const dateInput = document.getElementById("quick-date");
        const periodSelect = document.getElementById("quick-period");
        const nameInput = document.getElementById("quick-name");

        const service = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex]?.text : "";
        const professional = profSelect ? profSelect.options[profSelect.selectedIndex]?.text : "";
        const date = dateInput ? dateInput.value : "";
        const period = periodSelect ? periodSelect.options[periodSelect.selectedIndex]?.text : "";
        const clientName = nameInput ? nameInput.value : "";

        const message = this.formatBookingMessage({
          service: service !== "Selecione o serviço..." ? service : "A definir no atendimento",
          professional: professional !== "Qualquer profissional disponível" ? professional : "Qualquer profissional disponível",
          date: date || "Hoje / Próximo dia disponível",
          period: period !== "Selecione o período..." ? period : "Qualquer período",
          clientName: clientName
        });

        this.showToast("Redirecionando para o WhatsApp com seu agendamento montado...");
        setTimeout(() => {
          this.openChat(message);
        }, 400);
      });
    }

    // 2. Botões de Agendamento de Serviços Individuais
    document.querySelectorAll("[data-whatsapp-service]").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const serviceTitle = button.getAttribute("data-service-title") || "Serviço Especial";
        const servicePrice = button.getAttribute("data-service-price") || "";
        const message = this.formatServiceMessage(serviceTitle, servicePrice);
        
        this.showToast(`Iniciando agendamento para: ${serviceTitle}`);
        setTimeout(() => {
          this.openChat(message);
        }, 300);
      });
    });

    // 3. Botões de Agendamento com Profissionais
    document.querySelectorAll("[data-whatsapp-team]").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const profName = button.getAttribute("data-team-name") || "Profissional";
        const profRole = button.getAttribute("data-team-role") || "Especialista";
        const message = this.formatTeamMessage(profName, profRole);
        
        this.showToast(`Agendando com ${profName}...`);
        setTimeout(() => {
          this.openChat(message);
        }, 300);
      });
    });

    // 4. Formulário de Contato Direto
    const contactForm = document.getElementById("contact-whatsapp-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("contact-name")?.value || "";
        const phone = document.getElementById("contact-phone")?.value || "";
        const service = document.getElementById("contact-service")?.value || "";
        const messageText = document.getElementById("contact-message")?.value || "";

        let msg = `*MENSAGEM DE CONTATO - ${SITE_CONFIG.businessName}*\n\n`;
        if (name) msg += `*Nome:* ${name}\n`;
        if (phone) msg += `*Telefone/WhatsApp:* ${phone}\n`;
        if (service) msg += `*Interesse:* ${service}\n`;
        if (messageText) msg += `*Mensagem:* ${messageText}\n\n`;
        msg += `_Aguardo o retorno do salão/barbearia._`;

        this.showToast("Enviando sua mensagem para o WhatsApp do salão...");
        setTimeout(() => {
          this.openChat(msg);
        }, 400);
      });
    }

    // 5. Botão Flutuante e Widget de Chat do WhatsApp
    const floatBtn = document.getElementById("whatsapp-floating-btn");
    const chatModal = document.getElementById("whatsapp-chat-modal");
    const closeChatBtn = document.getElementById("close-chat-modal");

    if (floatBtn && chatModal) {
      floatBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        chatModal.classList.toggle("active");
        if (chatModal.classList.contains("active")) {
          // Remove a badge de notificação quando aberto
          const badge = document.querySelector(".wa-badge-pulse");
          if (badge) badge.style.display = "none";
        }
      });

      if (closeChatBtn) {
        closeChatBtn.addEventListener("click", () => {
          chatModal.classList.remove("active");
        });
      }

      // Fecha clicando fora
      document.addEventListener("click", (e) => {
        if (!chatModal.contains(e.target) && !floatBtn.contains(e.target)) {
          chatModal.classList.remove("active");
        }
      });
    }

    // 6. Botões Rápidos dentro do Widget de Chat Flutuante
    document.querySelectorAll("[data-wa-quick-prompt]").forEach((promptBtn) => {
      promptBtn.addEventListener("click", () => {
        const text = promptBtn.getAttribute("data-wa-quick-prompt");
        let msg = `Olá! ${text} (${SITE_CONFIG.businessName})`;
        this.openChat(msg);
      });
    });

    // 7. Botão de Envio de Texto Livre dentro do Chat Flutuante
    const chatInputForm = document.getElementById("wa-modal-input-form");
    if (chatInputForm) {
      chatInputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("wa-modal-text");
        if (input && input.value.trim()) {
          const msg = `Olá! ${input.value.trim()}`;
          this.openChat(msg);
          input.value = "";
          if (chatModal) chatModal.classList.remove("active");
        }
      });
    }

    // Atualiza links genéricos do WhatsApp na página
    document.querySelectorAll("[data-whatsapp-direct]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const customText = link.getAttribute("data-custom-message") || SITE_CONFIG.whatsapp.defaultMessage;
        this.openChat(customText);
      });
    });
  },

  /**
   * Notificação Toast flutuante para feedback imediato ao usuário
   */
  showToast(message) {
    let toast = document.getElementById("site-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "site-toast";
      toast.className = "site-toast";
      document.body.appendChild(toast);
    }
    
    toast.innerHTML = `
      <div class="toast-content">
        <svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${message}</span>
      </div>
    `;
    
    toast.classList.add("show");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }
};

// Inicializa no carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  WhatsAppIntegration.init();
});
