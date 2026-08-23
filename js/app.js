/**
 * APLICAÇÃO PRINCIPAL - LUMEN & CO.
 * Fluidez máxima inspirada em websites modernos de alto padrão:
 * - Cursor Follower Aura
 * - Efeito 3D Tilt nos cards
 * - Contadores animados em tempo real
 * - Horários de funcionamento dinâmicos
 * - Menu Mobile fluido
 * - FAQ Accordion
 * - Filtros de Portfólio sem layout-shift
 */

const App = {
  init() {
    this.setupTheme();
    this.setupLiveBusinessStatus();
    this.setupScheduleTable();
    this.setupNavbarScroll();
    this.setupMobileMenu();
    this.setupFaqAccordion();
    this.setupPortfolioFilter();
    this.setupDatePickerMin();
    this.setupScrollReveal();
    this.setupAmbientCursor();
    this.setupCardTilt();
    this.setupAnimatedCounters();
  },

  /**
   * Gerencia o tema Claro / Escuro baseado na preferência do sistema
   */
  setupTheme() {
    const applyTheme = (theme) => {
      const isDark =
        theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    };

    let saved = "system";
    try {
      saved = localStorage.getItem("theme") || "system";
    } catch (e) {}

    applyTheme(saved);

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      let currentSaved = "system";
      try {
        currentSaved = localStorage.getItem("theme") || "system";
      } catch (e) {}
      if (currentSaved === "system") {
        applyTheme("system");
      }
    });
  },

  /**
   * Calcula em tempo real se o estabelecimento está aberto ou fechado agora
   */
  setupLiveBusinessStatus() {
    const now = new Date();
    const currentDayIndex = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeStr = `${String(currentHour).padStart(2, "0")}:${String(currentMinutes).padStart(2, "0")}`;

    const todaySchedule = SITE_CONFIG.schedule.find(s => s.dayIndex === currentDayIndex);

    let isOpenNow = false;
    let statusText = "Fechado no momento";
    let statusClass = "status-closed";

    if (todaySchedule && todaySchedule.isOpen) {
      if (currentTimeStr >= todaySchedule.open && currentTimeStr < todaySchedule.close) {
        isOpenNow = true;
        statusText = `Aberto agora • Fecha às ${todaySchedule.close}`;
        statusClass = "status-open";
      } else if (currentTimeStr < todaySchedule.open) {
        statusText = `Fechado • Abre hoje às ${todaySchedule.open}`;
        statusClass = "status-closed";
      } else {
        statusText = `Fechado agora • Reabre amanhã`;
        statusClass = "status-closed";
      }
    } else {
      statusText = "Fechado hoje • Reabre segunda às 09:00";
      statusClass = "status-closed";
    }

    // Atualiza os indicadores de status no site
    const statusBadges = document.querySelectorAll(".live-status-badge");
    statusBadges.forEach(badge => {
      badge.className = `live-status-badge ${statusClass}`;
      badge.innerHTML = `
        <span class="status-pulse-dot"></span>
        <span class="status-text">${statusText}</span>
      `;
    });
  },

  /**
   * Renderiza e destaca o dia atual na tabela de horários de funcionamento
   */
  setupScheduleTable() {
    const scheduleContainer = document.getElementById("schedule-list");
    if (!scheduleContainer) return;

    const currentDayIndex = new Date().getDay();

    let html = "";
    SITE_CONFIG.schedule.forEach(item => {
      const isToday = item.dayIndex === currentDayIndex;
      const todayBadge = isToday ? '<span class="today-tag">Hoje</span>' : '';
      const hoursDisplay = item.isOpen ? `${item.open} às ${item.close}` : (item.note || 'Fechado');
      const activeClass = isToday ? 'schedule-row-today' : '';

      html += `
        <div class="schedule-row ${activeClass}">
          <div class="day-name">
            <strong>${item.day}</strong>
            ${todayBadge}
          </div>
          <div class="day-hours ${!item.isOpen ? 'hours-closed' : ''}">
            ${hoursDisplay}
          </div>
        </div>
      `;
    });

    scheduleContainer.innerHTML = html;
  },

  /**
   * Efeito de vidro / blur no cabeçalho ao rolar a página
   */
  setupNavbarScroll() {
    const navbar = document.getElementById("main-header");
    if (!navbar) return;

    const onScroll = () => {
      if (window.scrollY > 30) {
        navbar.classList.add("header-scrolled");
      } else {
        navbar.classList.remove("header-scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  },

  /**
   * Controle do menu mobile deslizante
   */
  setupMobileMenu() {
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const closeBtn = document.getElementById("mobile-drawer-close");
    const backdrop = document.getElementById("mobile-backdrop");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    const openMenu = () => {
      if (!mobileDrawer || !backdrop) return;
      mobileDrawer.classList.add("active");
      backdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      if (!mobileDrawer || !backdrop) return;
      mobileDrawer.classList.remove("active");
      backdrop.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (toggleBtn) toggleBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (backdrop) backdrop.addEventListener("click", closeMenu);

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });
  },

  /**
   * Accordion sanfona interativo para a seção de Perguntas Frequentes (FAQ)
   */
  setupFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
      const header = item.querySelector(".faq-question");
      if (header) {
        header.addEventListener("click", () => {
          const isOpen = item.classList.contains("active");

          faqItems.forEach(other => {
            if (other !== item) {
              other.classList.remove("active");
              const content = other.querySelector(".faq-answer");
              if (content) content.style.maxHeight = null;
            }
          });

          if (isOpen) {
            item.classList.remove("active");
            const content = item.querySelector(".faq-answer");
            if (content) content.style.maxHeight = null;
          } else {
            item.classList.add("active");
            const content = item.querySelector(".faq-answer");
            if (content) content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      }
    });

    if (faqItems.length > 0) {
      faqItems[0].classList.add("active");
      const firstContent = faqItems[0].querySelector(".faq-answer");
      if (firstContent) firstContent.style.maxHeight = firstContent.scrollHeight + "px";
    }
  },

  /**
   * Filtro de categorias para a galeria de fotos e serviços
   */
  setupPortfolioFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item-card");

    if (!filterButtons.length || !galleryItems.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        galleryItems.forEach(item => {
          const category = item.getAttribute("data-category");
          if (filterValue === "all" || category === filterValue) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 50);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.95)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });
  },

  /**
   * Configura o input de data para não permitir datas anteriores a hoje
   */
  setupDatePickerMin() {
    const dateInput = document.getElementById("quick-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
      dateInput.value = today;
    }
  },

  /**
   * Efeitos de entrada suaves nos elementos ao rolar (Intersection Observer)
   */
  setupScrollReveal() {
    if (!("IntersectionObserver" in window)) return;

    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(el => observer.observe(el));
  },

  /**
   * Aura luminosa que segue suavemente o cursor em telas de desktop
   */
  setupAmbientCursor() {
    if (window.matchMedia("(max-width: 991px)").matches) return;

    let cursorGlow = document.querySelector(".ambient-cursor-glow");
    if (!cursorGlow) {
      cursorGlow = document.createElement("div");
      cursorGlow.className = "ambient-cursor-glow";
      document.body.appendChild(cursorGlow);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    const animateGlow = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateGlow);
    };
    animateGlow();
  },

  /**
   * Efeito 3D Tilt suave nos cards ao passar o cursor
   */
  setupCardTilt() {
    if (window.matchMedia("(max-width: 991px)").matches) return;

    const cards = document.querySelectorAll(".diff-card, .service-card, .team-card, .quick-booking-card");
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  },

  /**
   * Animação numérica progressiva para as estatísticas
   */
  setupAnimatedCounters() {
    const stats = document.querySelectorAll(".hero-stat-item h4");
    if (!stats.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.innerText.trim();
          
          if (text.includes("15k")) {
            this.animateValue(el, 1, 15, 1200, "+", "k");
          } else if (text.includes("12")) {
            this.animateValue(el, 1, 12, 1000, "", " Anos");
          } else if (text.includes("100%")) {
            this.animateValue(el, 50, 100, 1000, "", "%");
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
  },

  animateValue(element, start, end, duration, prefix = "", suffix = "") {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * (end - start) + start);
      element.innerHTML = `${prefix}${current}${suffix}`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.innerHTML = `${prefix}${end}${suffix}`;
      }
    };
    window.requestAnimationFrame(step);
  }
};

// Inicializa no carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
