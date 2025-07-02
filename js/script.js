document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const closeSidebarIcon = document.querySelector('.close-sidebar-icon');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const fullscreenToggle = document.getElementById('fullscreenToggle');

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuIcon) {
        menuIcon.addEventListener('click', openSidebar);
    }
    if (closeSidebarIcon) {
        closeSidebarIcon.addEventListener('click', closeSidebar);
    }
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Fullscreen Toggle Logic (Tarea 1)
    if (fullscreenToggle) {
        fullscreenToggle.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                fullscreenToggle.textContent = 'fullscreen';
            } else {
                document.documentElement.requestFullscreen().then(() => {
                    fullscreenToggle.textContent = 'fullscreen_exit';
                }).catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
                    alert('Tu navegador no permite la pantalla completa en este momento o ha ocurrido un error.');
                });
            }
        });

        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                fullscreenToggle.textContent = 'fullscreen';
            } else {
                fullscreenToggle.textContent = 'fullscreen_exit';
            }
        });
    }

    // --- Los siguientes bloques se mantienen por si tuvieras otros scripts que los usan,
    // --- aunque las páginas relacionadas con ellos hayan sido "eliminadas" de la lista de tareas.
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

    // Lógica para el pin en el selector de plantas
    const floorPins = document.querySelectorAll('.unit-hotspot');
    floorPins.forEach(pin => {
        pin.addEventListener('click', () => {
            floorPins.forEach(p => p.classList.remove('active-pin'));
            pin.classList.add('active-pin');

            const unitId = pin.dataset.unitId;
            if (unitId) {
                // console.log(`Pin clicado para la unidad: ${unitId}`);
            }
        });
    });
});