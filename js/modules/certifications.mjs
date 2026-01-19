// Módulo: Certificaciones
export function initCertifications() {
    console.log('🎓 Módulo Certificaciones inicializado');
    
    const certificationsSection = document.querySelector('#certificaciones');
    if (!certificationsSection) return;
    
    // Aquí puedes agregar lógica específica para certificaciones
    // Ejemplo: animaciones al scroll, modales con detalles, etc.
    
    // Si tienes datos de certificaciones en JSON, puedes cargarlos aquí
    // loadCertifications();
}

// Función para cargar certificaciones desde un archivo JSON (opcional)
async function loadCertifications() {
    try {
        const response = await fetch('data/certifications.json');
        const certifications = await response.json();
        renderCertifications(certifications);
    } catch (error) {
        console.error('Error al cargar certificaciones:', error);
    }
}

function renderCertifications(certifications) {
    const grid = document.querySelector('.certifications-grid');
    if (!grid) return;
    
    grid.innerHTML = certifications.map(cert => `
        <div class="certification-card">
            <div class="cert-icon">${cert.icon || '🎓'}</div>
            <h3>${cert.name}</h3>
            <p class="cert-issuer">${cert.issuer}</p>
            <p class="cert-date">${cert.year}</p>
        </div>
    `).join('');
}
