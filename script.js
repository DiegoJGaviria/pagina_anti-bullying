// Chat functionality
let chatOpen = false

function toggleChat() {
  const chatContainer = document.getElementById("chatContainer")
  chatOpen = !chatOpen
  chatContainer.style.display = chatOpen ? "flex" : "none"
}

function openChat() {
  const chatContainer = document.getElementById("chatContainer")
  chatOpen = true
  chatContainer.style.display = "flex"
}

function closeChat() {
  const chatContainer = document.getElementById("chatContainer")
  chatOpen = false
  chatContainer.style.display = "none"
}

function sendMessage() {
  const input = document.getElementById("messageInput")
  const message = input.value.trim()

  if (message) {
    addMessage(message, "user")
    input.value = ""

    // Simulate assistant response
    setTimeout(() => {
      const response = getAssistantResponse(message)
      addMessage(response, "assistant")
    }, 1000)
  }
}

function showDenunciaModal() {
  document.getElementById("denunciaModal").style.display = "flex"
  document.getElementById("denunciaForm").style.display = "block"
  document.getElementById("denunciaExito").style.display = "none"
}

function enviarDenuncia(event) {
  event.preventDefault()
  // Aquí podrías enviar los datos a un backend real
  document.getElementById("denunciaForm").style.display = "none"
  document.getElementById("denunciaExito").style.display = "block"
  setTimeout(() => {
    closeModal('denunciaModal')
  }, 2500)
}
function showParesModal() {
  document.getElementById("paresModal").style.display = "flex"
  document.getElementById("paresForm").style.display = "block"
  document.getElementById("paresExito").style.display = "none"
}

function enviarPares(event) {
  event.preventDefault()
  // Aquí podrías enviar los datos a un backend real
  document.getElementById("paresForm").style.display = "none"
  document.getElementById("paresExito").style.display = "block"
  setTimeout(() => {
    closeModal('paresModal')
  }, 2500)
}
function addMessage(text, sender) {
  const messagesContainer = document.getElementById("chatMessages")
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender}`

  const contentDiv = document.createElement("div")
  contentDiv.className = "message-content"
  contentDiv.textContent = text

  messageDiv.appendChild(contentDiv)
  messagesContainer.appendChild(messageDiv)
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function getAssistantResponse(message) {
  const responses = {
    hola: "Hola, me alegra que hayas decidido hablar conmigo. ¿Cómo te sientes hoy?",
    mal: "Lamento escuchar que te sientes mal. Recuerda que no estás solo/a. ¿Quieres contarme qué está pasando?",
    bullying:
      "El bullying es algo muy serio y no es tu culpa. ¿Está ocurriendo en la escuela, en línea, o en otro lugar?",
    miedo:
      "Es normal sentir miedo en estas situaciones. Tu seguridad es lo más importante. ¿Hay algún adulto de confianza con quien puedas hablar?",
    ayuda:
      "Estoy aquí para ayudarte. Puedes hablar con un consejero escolar, tus padres, o llamar a una línea de apoyo. ¿Te gustaría que te dé algunos números?",
    solo: "No estás solo/a. Hay muchas personas que quieren ayudarte. ¿Has hablado con alguien sobre lo que está pasando?",
    escuela:
      "El bullying escolar debe ser reportado. Habla con un maestro, consejero o director. También puedes pedirle a tus padres que se comuniquen con la escuela.",
    internet:
      "El ciberbullying es igual de serio. Guarda evidencias, bloquea a la persona, y reporta el comportamiento en la plataforma. También habla con un adulto.",
    gracias: "De nada. Recuerda que siempre puedes volver a hablar conmigo. Tu bienestar es importante.",
  }

  const lowerMessage = message.toLowerCase()

  for (const key in responses) {
    if (lowerMessage.includes(key)) {
      return responses[key]
    }
  }

  return "Entiendo que esto puede ser difícil. Recuerda que no estás solo/a y que hay ayuda disponible. ¿Hay algo específico en lo que pueda ayudarte?"
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage()
  }
}

// Action cards functionality
function showActionInfo(action) {
  const modal = document.getElementById("actionModal")
  const title = document.getElementById("actionModalTitle")
  const content = document.getElementById("actionModalContent")

  const actionInfo = {
    documentar: {
      title: "Cómo Documentar el Bullying",
      content: `
                <h4>Pasos para documentar:</h4>
                <ul>
                    <li><strong>Fecha y hora:</strong> Anota cuándo ocurrió cada incidente</li>
                    <li><strong>Lugar:</strong> Dónde sucedió (aula, patio, en línea, etc.)</li>
                    <li><strong>Personas involucradas:</strong> Nombres de agresores y testigos</li>
                    <li><strong>Descripción:</strong> Qué pasó exactamente</li>
                    <li><strong>Evidencias:</strong> Capturas de pantalla, fotos, mensajes</li>
                    <li><strong>Impacto:</strong> Cómo te afectó física y emocionalmente</li>
                </ul>
                <p><strong>Importante:</strong> Guarda toda la información en un lugar seguro.</p>
            `,
    },
    hablar: {
      title: "Con Quién Hablar",
      content: `
                <h4>Personas de confianza:</h4>
                <ul>
                    <li><strong>Familia:</strong> Padres, hermanos mayores, tíos, abuelos</li>
                    <li><strong>Escuela:</strong> Maestros, consejeros, directores</li>
                    <li><strong>Amigos:</strong> Amigos cercanos y sus familias</li>
                    <li><strong>Profesionales:</strong> Psicólogos, trabajadores sociales</li>
                    <li><strong>Líneas de apoyo:</strong> Consejeros especializados</li>
                </ul>
                <p><strong>Recuerda:</strong> No tienes que enfrentar esto solo/a.</p>
            `,
    },
    reportar: {
      title: "Cómo Reportar el Bullying",
      content: `
                <h4>Pasos para reportar:</h4>
                <ol>
                    <li><strong>Escuela:</strong> Habla con un maestro o consejero</li>
                    <li><strong>Administración:</strong> Si no hay respuesta, contacta al director</li>
                    <li><strong>Distrito escolar:</strong> Escala al nivel superior si es necesario</li>
                    <li><strong>Autoridades:</strong> En casos graves, contacta a la policía</li>
                    <li><strong>Líneas especializadas:</strong> Llama a números de apoyo</li>
                </ol>
                <p><strong>Importante:</strong> Mantén copias de todos los reportes.</p>
            `,
    },
    proteger: {
      title: "Cómo Protegerte",
      content: `
                <h4>Estrategias de protección:</h4>
                <ul>
                    <li><strong>Evita estar solo/a:</strong> Mantente cerca de amigos o adultos</li>
                    <li><strong>Rutas seguras:</strong> Usa caminos donde haya supervisión</li>
                    <li><strong>Confianza:</strong> Mantén la cabeza alta y camina con seguridad</li>
                    <li><strong>No respondas:</strong> No devuelvas la agresión</li>
                    <li><strong>Busca ayuda:</strong> Grita o pide ayuda si es necesario</li>
                    <li><strong>Tecnología:</strong> Bloquea y reporta en redes sociales</li>
                </ul>
                <p><strong>Recuerda:</strong> Tu seguridad es lo más importante.</p>
            `,
    },
  }

  const info = actionInfo[action]
  title.textContent = info.title
  content.innerHTML = info.content
  modal.style.display = "flex"
}

// Resources functionality
function showResource(resource) {
  const modal = document.getElementById("resourceModal")
  const title = document.getElementById("resourceModalTitle")
  const content = document.getElementById("resourceModalContent")

  const resourceInfo = {
    guias: {
      title: "Guías Educativas",
      content: `
                <h4>Recursos educativos disponibles:</h4>
                <div style="margin: 1rem 0;">
                    <h5>¿Qué es el bullying?</h5>
                    <p>El bullying es un comportamiento agresivo repetitivo con desequilibrio de poder.</p>
                </div>
                <div style="margin: 1rem 0;">
                    <h5>Tipos de bullying:</h5>
                    <ul>
                        <li>Físico: golpes, empujones</li>
                        <li>Verbal: insultos, amenazas</li>
                        <li>Social: exclusión, rumores</li>
                        <li>Ciberbullying: acoso en línea</li>
                    </ul>
                </div>
                <div style="margin: 1rem 0;">
                    <h5>Señales de alerta:</h5>
                    <ul>
                        <li>Cambios en el comportamiento</li>
                        <li>Pérdida de amigos</li>
                        <li>Problemas para dormir</li>
                        <li>Bajo rendimiento escolar</li>
                    </ul>
                </div>
            `,
    },
    apoyo: {
      title: "Apoyo Emocional",
      content: `
                <h4>Cuidando tu bienestar mental:</h4>
                <div style="margin: 1rem 0;">
                    <h5>Técnicas de relajación:</h5>
                    <ul>
                        <li>Respiración profunda</li>
                        <li>Meditación mindfulness</li>
                        <li>Ejercicio regular</li>
                        <li>Actividades que disfrutes</li>
                    </ul>
                </div>
                <div style="margin: 1rem 0;">
                    <h5>Construye tu autoestima:</h5>
                    <ul>
                        <li>Reconoce tus fortalezas</li>
                        <li>Rodéate de personas positivas</li>
                        <li>Practica el autocuidado</li>
                        <li>Celebra pequeños logros</li>
                    </ul>
                </div>
                <div style="margin: 1rem 0;">
                    <h5>Cuándo buscar ayuda profesional:</h5>
                    <ul>
                        <li>Sentimientos persistentes de tristeza</li>
                        <li>Ansiedad extrema</li>
                        <li>Pensamientos de autolesión</li>
                        <li>Aislamiento social prolongado</li>
                    </ul>
                </div>
            `,
    },
    legal: {
      title: "Derechos Legales",
      content: `
                <h4>Tus derechos legales:</h4>
                <div style="margin: 1rem 0;">
                    <h5>Derecho a un ambiente seguro:</h5>
                    <p>Tienes derecho a estar seguro/a en la escuela y en línea.</p>
                </div>
                <div style="margin: 1rem 0;">
                    <h5>Responsabilidades de la escuela:</h5>
                    <ul>
                        <li>Investigar reportes de bullying</li>
                        <li>Tomar medidas correctivas</li>
                        <li>Proteger a las víctimas</li>
                        <li>Prevenir represalias</li>
                    </ul>
                </div>
                <div style="margin: 1rem 0;">
                    <h5>Opciones legales:</h5>
                    <ul>
                        <li>Reportar a autoridades escolares</li>
                        <li>Contactar al distrito escolar</li>
                        <li>Presentar queja formal</li>
                        <li>Buscar asesoría legal si es necesario</li>
                    </ul>
                </div>
                <div style="margin: 1rem 0;">
                    <h5>Documentación importante:</h5>
                    <ul>
                        <li>Políticas anti-bullying de la escuela</li>
                        <li>Reportes oficiales</li>
                        <li>Comunicaciones con la escuela</li>
                        <li>Evidencias del bullying</li>
                    </ul>
                </div>
            `,
    },
  }

  const info = resourceInfo[resource]
  title.textContent = info.title
  content.innerHTML = info.content
  modal.style.display = "flex"
}

// Modal functionality
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none"
}

function showEmergencyModal() {
  document.getElementById("emergencyModal").style.display = "flex"
}

// Phone call functionality
function callNumber(number) {
  window.location.href = `tel:${number}`
}

// Smooth scrolling
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
  })
}

// Close modals when clicking outside
window.onclick = (event) => {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  })
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  console.log("Apoyo Seguro - Interfaz cargada correctamente")
})
