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

    // Lógica para el pin en el selector de plantas (Modificado para Tarea 3: Dinamizar Unidades)
    // Cuando se hace clic en un hotspot de unidad, redirige a unit.html con el ID de la unidad.
    const floorPins = document.querySelectorAll('.unit-hotspot'); // Reutilizamos la clase existente para los pines
    floorPins.forEach(pin => {
        pin.addEventListener('click', () => {
            // Eliminar la clase 'active-pin' de todos los pines
            floorPins.forEach(p => p.classList.remove('active-pin'));
            // Añadir la clase 'active-pin' al pin clicado
            pin.classList.add('active-pin');

            const unitId = pin.dataset.unitId; // Obtenemos el ID de la unidad del atributo data-unit-id
            if (unitId) {
                // Redirigir a la página de unidad con el ID como parámetro de URL
                window.location.href = `unit.html?id=${unitId}`;
            }
        });
    });

    // Lógica para la galería de amenities (Amenity-gallery.html)
    // Asegúrate de que las imágenes existan en 'assets/images/'
    if (document.body.classList.contains('amenities-gallery-page')) {
        const amenitiesImages = [
            'assets/images/amenities-pool.jpg',
            'assets/images/amenities-gym.jpg',
            'assets/images/amenities-lounge.jpg'
        ];
        let currentAmenitiesImageIndex = 0;
        const amenitiesGalleryImage = document.getElementById('amenitiesGalleryImage');

        if (amenitiesGalleryImage) { // Check if the element exists before adding listeners
            document.getElementById('prevAmenitiesImage').addEventListener('click', () => {
                currentAmenitiesImageIndex = (currentAmenitiesImageIndex - 1 + amenitiesImages.length) % amenitiesImages.length;
                amenitiesGalleryImage.src = amenitiesImages[currentAmenitiesImageIndex];
            });

            document.getElementById('nextAmenitiesImage').addEventListener('click', () => {
                currentAmenitiesImageIndex = (currentAmenitiesImageIndex + 1) % amenitiesImages.length;
                amenitiesGalleryImage.src = amenitiesImages[currentAmenitiesImageIndex];
            });
        }
    }


    // ** Lógica para la página unit.html (Tarea 3: Dinamizar Unidades) **
    if (document.body.classList.contains('unit-page')) { // Usamos una clase en body para identificar la página
        const urlParams = new URLSearchParams(window.location.search);
        const unitId = urlParams.get('id'); // Obtener el ID de la unidad de la URL

        if (unitId && unitData[unitId]) { // Verificar que el ID exista y que tengamos datos para esa unidad
            const unit = unitData[unitId]; // Obtener los datos de la unidad

            // Elementos para el panel de detalles de la unidad
            const unitInfoPanel = document.getElementById('unitInfoPanel');
            const unitThumbnail = document.querySelector('.unit-info-thumbnail');
            const unitNameElement = document.getElementById('unitName');
            const unitTypologyStatusElement = document.getElementById('unitTypologyStatus');
            const unitAreaTotal = document.getElementById('unitAreaTotal');
            const unitAreaCubierta = document.getElementById('unitAreaCubierta');
            const unitAreaDescubierta = document.getElementById('unitAreaDescubierta');
            const unitDormitorios = document.getElementById('unitDormitorios');
            const unitBanos = document.getElementById('unitBanos');
            const unitBalcon = document.getElementById('unitBalcon');
            const unitCochera = document.getElementById('unitCochera');
            const unitLavadero = document.getElementById('unitLavadero');

            // Elementos para la vista principal (Planta 3D / Galería)
            const unitMainContent = document.getElementById('unitMainContent'); // Contenedor principal de la vista

            // Botones del menú "Ver más"
            const verMasBtn = document.getElementById('verMasBtn');
            const verMasDropdown = document.getElementById('verMasDropdown');
            const planta3DLink = document.getElementById('planta3DLink');
            const galeriaLink = document.getElementById('galeriaLink');

            // Botón "Más detalles" del pie
            const masDetallesBtn = document.getElementById('masDetallesBtn');
            const closeInfoPanelBtn = document.getElementById('closeInfoPanel');


            // 1. Llenar los datos del panel de información de la unidad
            unitThumbnail.src = unit.details.thumbnail;
            unitNameElement.textContent = unit.details.name;
            // Estado y tipología combinados, con clase para estilo
            unitTypologyStatusElement.innerHTML = `${unit.details.typology} - <span class="status ${unit.details.status}">${unit.details.status === 'available' ? 'Disponible' : unit.details.status === 'reserved' ? 'Reservado' : 'Vendido'}</span>`;
            unitAreaTotal.textContent = unit.details.areaTotal;
            unitAreaCubierta.textContent = unit.details.areaCubierta;
            unitAreaDescubierta.textContent = unit.details.areaDescubierta;
            unitDormitorios.textContent = unit.details.dormitorios;
            unitBanos.textContent = unit.details.banos;
            unitBalcon.textContent = unit.details.balcon;
            unitCochera.textContent = unit.details.cochera;
            unitLavadero.textContent = unit.details.lavadero;

            // 2. Manejo de vistas (Planta 3D vs Galería)
            let currentView = 'plan3d'; // La vista por defecto al cargar la página
            let currentGalleryImageIndex = 0;

            function showView(viewType) {
                if (viewType === 'plan3d') {
                    // Cargar la imagen del plano 3D
                    unitMainContent.innerHTML = `<img src="${unit.details.plan3D}" alt="Planta 3D de ${unit.details.name}" class="unit-3d-plan" id="unit3DPlanImage">`;
                } else if (viewType === 'gallery') {
                    if (unit.galleryImages && unit.galleryImages.length > 0) {
                        // Cargar la galería de imágenes
                        currentGalleryImageIndex = 0; // Reiniciar el índice de la galería al cambiar de vista
                        unitMainContent.innerHTML = `
                            <img src="${unit.galleryImages[currentGalleryImageIndex]}" alt="Galería de ${unit.details.name}" class="current-gallery-image" id="unitGalleryImage">
                            <span class="material-icons gallery-arrow left-arrow" id="prevGalleryImage">chevron_left</span>
                            <span class="material-icons gallery-arrow right-arrow" id="nextGalleryImage">chevron_right</span>
                        `;
                        // Volver a obtener las referencias a las flechas después de insertarlas en el DOM
                        const newPrev = document.getElementById('prevGalleryImage');
                        const newNext = document.getElementById('nextGalleryImage');
                        const newUnitGalleryImage = document.getElementById('unitGalleryImage');

                        if (newPrev && newNext) {
                             // Asignar eventos de clic a las flechas de la galería
                            newPrev.onclick = () => {
                                currentGalleryImageIndex = (currentGalleryImageIndex - 1 + unit.galleryImages.length) % unit.galleryImages.length;
                                newUnitGalleryImage.src = unit.galleryImages[currentGalleryImageIndex];
                            };
                            newNext.onclick = () => {
                                currentGalleryImageIndex = (currentGalleryImageIndex + 1) % unit.galleryImages.length;
                                newUnitGalleryImage.src = unit.galleryImages[currentGalleryImageIndex];
                            };
                        }
                    } else {
                        unitMainContent.innerHTML = `<p style="color:white; text-align:center;">No hay imágenes de galería disponibles para esta unidad.</p>`;
                    }
                }
                currentView = viewType; // Actualizar la vista actual
            }

            // 3. Manejo del botón y menú desplegable "Ver más"
            if(verMasBtn && verMasDropdown) {
                verMasBtn.addEventListener('click', function() {
                    verMasDropdown.classList.toggle('show'); // Mostrar/ocultar el dropdown
                });
            }

            // Cerrar el dropdown si se hace clic fuera de él
            window.onclick = function(event) {
                if (!event.target.matches('#verMasBtn')) {
                    const dropdowns = document.getElementsByClassName("dropdown-content");
                    for (let i = 0; i < dropdowns.length; i++) {
                        const openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                        }
                    }
                }
            };

            // Eventos para los enlaces de "Ver más"
            if(planta3DLink) {
                planta3DLink.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
                    showView('plan3d'); // Mostrar la vista de Planta 3D
                    verMasDropdown.classList.remove('show'); // Cerrar el dropdown
                });
            }

            if(galeriaLink) {
                galeriaLink.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
                    showView('gallery'); // Mostrar la vista de Galería
                    verMasDropdown.classList.remove('show'); // Cerrar el dropdown
                });
            }

            // 4. Lógica del panel de información (ocultar/mostrar) del pie
            if(unitInfoPanel && masDetallesBtn && closeInfoPanelBtn) {
                unitInfoPanel.classList.add('active'); // Mostrar el panel por defecto al cargar la página

                masDetallesBtn.addEventListener('click', () => {
                    unitInfoPanel.classList.toggle('active'); // Alternar la visibilidad del panel
                    masDetallesBtn.textContent = unitInfoPanel.classList.contains('active') ? 'Ocultar detalles' : 'Más detalles'; // Cambiar texto del botón
                });

                closeInfoPanelBtn.addEventListener('click', () => {
                    unitInfoPanel.classList.remove('active'); // Ocultar el panel
                    masDetallesBtn.textContent = 'Más detalles'; // Restaurar texto del botón
                });
            }

            // Mostrar la vista inicial (Planta 3D) al cargar la unidad
            showView('plan3d');

        } else {
            // Manejo de error si la unidad no se encuentra o el ID es inválido
            console.error("Unidad no encontrada o ID no proporcionado.");
            const unitMainContent = document.getElementById('unitMainContent');
            if (unitMainContent) {
                unitMainContent.innerHTML = '<p style="color:white; text-align:center; padding-top: 80px;">Unidad no encontrada. Por favor, verifica el ID.</p>';
            }
            // Ocultar elementos específicos de la unidad si no se encuentra
            const unitInfoPanel = document.getElementById('unitInfoPanel');
            if(unitInfoPanel) unitInfoPanel.style.display = 'none';
            const masDetallesBtn = document.getElementById('masDetallesBtn');
            if(masDetallesBtn) masDetallesBtn.style.display = 'none';
             const verMasBtn = document.getElementById('verMasBtn');
            if(verMasBtn) verMasBtn.style.display = 'none';
        }
    }
});


// ** DATOS DE LAS UNIDADES (TAREA 3: Dinamizar Unidades) **
// Este objeto contiene toda la información de tus unidades.
// Asegúrate de que los IDs (ej. "123", "101") coincidan con los que usarás en tus enlaces HTML.
const unitData = {
    "123": {
        details: {
            thumbnail: "assets/images/unit-123-gallery-1.jpg", // Asegúrate de que esta imagen exista
            plan3D: "assets/images/unit-123-plan.png", // Asegúrate de que esta imagen exista
            name: "Unidad 123",
            typology: "B 1 Ambiente",
            status: "available", // Posibles valores: 'available', 'reserved', 'sold'
            areaTotal: "29.80 m²",
            areaCubierta: "0.00 m²",
            areaDescubierta: "0.00 m²",
            dormitorios: "1",
            banos: "1",
            balcon: "No",
            cochera: "No",
            lavadero: "Sí"
        },
        galleryImages: [ // Rutas a las imágenes de la galería de esta unidad
            "assets/images/unit-123-gallery-1.jpg",
            "assets/images/unit-123-gallery-2.jpg",
            "assets/images/unit-123-gallery-3.jpg"
        ]
    },
    "101": { // Ejemplo de otra unidad. ¡Añade todas tus unidades aquí!
        details: {
            thumbnail: "assets/images/unit-101-gallery-1.jpg",
            plan3D: "assets/images/unit-101-plan.png",
            name: "Unidad 101",
            typology: "A 2 Ambientes",
            status: "reserved",
            areaTotal: "55.00 m²",
            areaCubierta: "50.00 m²",
            areaDescubierta: "5.00 m²",
            dormitorios: "2",
            banos: "1",
            balcon: "Sí",
            cochera: "Sí",
            lavadero: "No"
        },
        galleryImages: [
            "assets/images/unit-101-gallery-1.jpg",
            "assets/images/unit-101-gallery-2.jpg",
            "assets/images/unit-101-gallery-3.jpg"
        ]
    }
    // Añade más objetos de unidad aquí, siguiendo el mismo formato.
    // Cada clave debe ser el ID único de la unidad (ej. "102", "201", "PB1").
};