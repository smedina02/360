document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const closeSidebarIcon = document.querySelector('.close-sidebar-icon');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const fullscreenToggle = document.getElementById('fullscreenToggle'); // Refiere al icono superior derecho

    // Function to open sidebar
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    // Function to close sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners for sidebar toggle
    if (menuIcon) {
        menuIcon.addEventListener('click', openSidebar);
    }
    if (closeSidebarIcon) {
        closeSidebarIcon.addEventListener('click', closeSidebar);
    }
    if (overlay) {
        overlay.addEventListener('click', closeSidebar); // Close sidebar when clicking outside
    }

    // Hotspot hover effect for project-overview.html
    const centerHotspot = document.getElementById('centerHotspot');
    if (centerHotspot) {
        // The CSS handles the display:none/block and opacity/visibility for hover,
        // so no JS is strictly needed here unless more complex logic is added.
    }

    // Unit Hotspot hover effect for floor-selector.html and floor-X.html
    const unitHotspots = document.querySelectorAll('.unit-hotspot');
    unitHotspots.forEach(hotspot => {
        // The CSS handles the hover effect for .hotspot-info
        // No additional JS needed for simple hover show/hide
    });

    // Fullscreen Toggle Logic (for the top-right icon)
    if (fullscreenToggle) {
        fullscreenToggle.addEventListener('click', () => {
            if (document.fullscreenElement) {
                // If already in fullscreen, exit fullscreen
                document.exitFullscreen();
                fullscreenToggle.textContent = 'fullscreen'; // Change icon back to "enter fullscreen"
            } else {
                // If not in fullscreen, request fullscreen for the entire document
                document.documentElement.requestFullscreen().then(() => {
                    fullscreenToggle.textContent = 'fullscreen_exit'; // Change icon to "exit fullscreen"
                }).catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
                    // Optionally, inform the user if fullscreen failed
                    alert('Tu navegador no permite la pantalla completa en este momento o ha ocurrido un error.');
                });
            }
        });

        // Listen for fullscreen change events to update the icon if user exits via ESC key or other means
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                fullscreenToggle.textContent = 'fullscreen'; // Not in fullscreen, show enter icon
            } else {
                fullscreenToggle.textContent = 'fullscreen_exit'; // In fullscreen, show exit icon
            }
        });
    }

    // Lógica para el pin en el selector de plantas (Nueva adición para la tarea 6)
    // Asumiendo que cada "hotspot" de unidad en el plano es ahora un "pin" interactivo.
    // Esta parte puede requerir ajustes finos dependiendo de la implementación exacta de tus hotspots.
    const floorPins = document.querySelectorAll('.unit-hotspot'); // Reutilizamos la clase existente para los pines
    floorPins.forEach(pin => {
        pin.addEventListener('click', () => {
            // Eliminar la clase 'active-pin' de todos los pines
            floorPins.forEach(p => p.classList.remove('active-pin'));
            // Añadir la clase 'active-pin' al pin clicado
            pin.classList.add('active-pin');

            // Aquí podrías agregar lógica adicional si el clic en un pin debe mostrar información
            // o navegar a una página de detalle de unidad específica.
            // Por ejemplo, si el hotspot tiene un 'data-unit-id':
            const unitId = pin.dataset.unitId;
            if (unitId) {
                // console.log(`Pin clicado para la unidad: ${unitId}`);
                // Si cada pin es un enlace, el HTML ya lo manejaría.
                // Si quieres que el JS haga la redirección basada en el data-unit-id:
                // window.location.href = `unit-detail-${unitId}.html`;
            }
        });
    });
});