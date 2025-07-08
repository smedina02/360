// js/script.js (código completo y actualizado)
document.addEventListener('DOMContentLoaded', () => {
    // ... (Tu código existente para sidebar, fullscreenToggle, centerHotspot, unitHotspots) ...
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
    // Esta parte ahora también se usará en floor-plans.html
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


    // Lógica para la página unit.html (Tarea 3: Dinamizar Unidades)
    if (document.body.classList.contains('unit-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const unitId = urlParams.get('id');

        if (unitId && unitData[unitId]) {
            const unit = unitData[unitId];
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
            const unitMainContent = document.getElementById('unitMainContent');
            const verMasBtn = document.getElementById('verMasBtn');
            const verMasDropdown = document.getElementById('verMasDropdown');
            const planta3DLink = document.getElementById('planta3DLink');
            const galeriaLink = document.getElementById('galeriaLink');
            const masDetallesBtn = document.getElementById('masDetallesBtn');
            const closeInfoPanelBtn = document.getElementById('closeInfoPanel');

            unitThumbnail.src = unit.details.thumbnail;
            unitNameElement.textContent = unit.details.name;
            unitTypologyStatusElement.innerHTML = `${unit.details.typology} - <span class="status ${unit.details.status}">${unit.details.status === 'available' ? 'Disponible' : unit.details.status === 'reserved' ? 'Reservado' : 'Vendido'}</span>`;
            unitAreaTotal.textContent = unit.details.areaTotal;
            unitAreaCubierta.textContent = unit.details.areaCubierta;
            unitAreaDescubierta.textContent = unit.details.areaDescubierta;
            unitDormitorios.textContent = unit.details.dormitorios;
            unitBanos.textContent = unit.details.banos;
            unitBalcon.textContent = unit.details.balcon;
            unitCochera.textContent = unit.details.cochera;
            unitLavadero.textContent = unit.details.lavadero;

            let currentView = 'plan3d';
            let currentGalleryImageIndex = 0;

            function showView(viewType) {
                if (viewType === 'plan3d') {
                    unitMainContent.innerHTML = `<img src="${unit.details.plan3D}" alt="Planta 3D de ${unit.details.name}" class="unit-3d-plan" id="unit3DPlanImage">`;
                } else if (viewType === 'gallery') {
                    if (unit.galleryImages && unit.galleryImages.length > 0) {
                        currentGalleryImageIndex = 0;
                        unitMainContent.innerHTML = `
                            <img src="${unit.galleryImages[currentGalleryImageIndex]}" alt="Galería de ${unit.details.name}" class="current-gallery-image" id="unitGalleryImage">
                            <span class="material-icons gallery-arrow left-arrow" id="prevGalleryImage">chevron_left</span>
                            <span class="material-icons gallery-arrow right-arrow" id="nextGalleryImage">chevron_right</span>
                        `;
                        const newPrev = document.getElementById('prevGalleryImage');
                        const newNext = document.getElementById('nextGalleryImage');
                        const newUnitGalleryImage = document.getElementById('unitGalleryImage');

                        if (newPrev && newNext) {
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
                currentView = viewType;
            }

            if(verMasBtn && verMasDropdown) {
                verMasBtn.addEventListener('click', function() {
                    verMasDropdown.classList.toggle('show');
                });
            }

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

            if(planta3DLink) {
                planta3DLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    showView('plan3d');
                    verMasDropdown.classList.remove('show');
                });
            }

            if(galeriaLink) {
                galeriaLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    showView('gallery');
                    verMasDropdown.classList.remove('show');
                });
            }

            if(unitInfoPanel && masDetallesBtn && closeInfoPanelBtn) {
                unitInfoPanel.classList.add('active');

                masDetallesBtn.addEventListener('click', () => {
                    unitInfoPanel.classList.toggle('active');
                    masDetallesBtn.textContent = unitInfoPanel.classList.contains('active') ? 'Ocultar detalles' : 'Más detalles';
                });

                closeInfoPanelBtn.addEventListener('click', () => {
                    unitInfoPanel.classList.remove('active');
                    masDetallesBtn.textContent = 'Más detalles';
                });
            }

            showView('plan3d');

        } else {
            console.error("Unidad no encontrada o ID no proporcionado.");
            const unitMainContent = document.getElementById('unitMainContent');
            if (unitMainContent) {
                unitMainContent.innerHTML = '<p style="color:white; text-align:center; padding-top: 80px;">Unidad no encontrada. Por favor, verifica el ID.</p>';
            }
            const unitInfoPanel = document.getElementById('unitInfoPanel');
            if(unitInfoPanel) unitInfoPanel.style.display = 'none';
            const masDetallesBtn = document.getElementById('masDetallesBtn');
            if(masDetallesBtn) masDetallesBtn.style.display = 'none';
             const verMasBtn = document.getElementById('verMasBtn');
            if(verMasBtn) verMasBtn.style.display = 'none';
        }
    }

    // ** Lógica para la página floor-plans.html (TAREA 2: Consolidar Selector de Plantas) **
    if (document.body.classList.contains('floor-plans-page')) { // Clase en body para identificar la página
        const floorPlanImageContainer = document.getElementById('floorPlanImageContainer'); // Contenedor para la imagen y hotspots
        const floorSelectorButtons = document.querySelectorAll('.floor-selector-btn'); // Botones de selección de pisos

        // Función para renderizar el plano de planta y sus hotspots
        function renderFloorPlan(floorId) {
            const floor = floorData[floorId];

            if (floor) {
                // Limpiar el contenedor actual
                floorPlanImageContainer.innerHTML = '';

                // Crear y añadir la imagen del plano
                const img = document.createElement('img');
                img.src = floor.planImage;
                img.alt = `Plano del piso ${floorId}`;
                img.classList.add('floor-plan-image'); // Clase para estilos CSS
                floorPlanImageContainer.appendChild(img);

                // Añadir los hotspots
                floor.hotspots.forEach(hotspot => {
                    const hotspotDiv = document.createElement('div');
                    hotspotDiv.classList.add('unit-hotspot'); // Reutilizamos la clase
                    hotspotDiv.dataset.unitId = hotspot.unitId; // Asignamos el unitId
                    hotspotDiv.textContent = hotspot.id; // Mostrar el ID de la unidad en el pin
                    hotspotDiv.style.left = hotspot.x;
                    hotspotDiv.style.top = hotspot.y;

                    // Evento de clic para el hotspot (redirige a unit.html)
                    hotspotDiv.addEventListener('click', () => {
                        // Opcional: remover 'active-pin' de todos los pines actuales
                        document.querySelectorAll('.unit-hotspot').forEach(p => p.classList.remove('active-pin'));
                        hotspotDiv.classList.add('active-pin'); // Marcar el pin clicado
                        window.location.href = `unit.html?id=${hotspot.unitId}`;
                    });

                    // Hotspot info box for hover
                    const hotspotInfo = document.createElement('div');
                    hotspotInfo.classList.add('hotspot-info');
                    if (unitData[hotspot.unitId]) {
                        const unit = unitData[hotspot.unitId].details;
                        hotspotInfo.innerHTML = `
                            <h4>${unit.name} (${unit.typology})</h4>
                            <p>Área: ${unit.areaTotal}</p>
                            <p>Estado: <span class="status ${unit.status}">${unit.status === 'available' ? 'Disponible' : unit.status === 'reserved' ? 'Reservado' : 'Vendido'}</span></p>
                            <button class="btn light-btn btn-sm">Ver detalles</button>
                        `;
                        // Clic en el botón de info box para ir a la unidad (delegar al hotspotDiv)
                        hotspotInfo.querySelector('button').addEventListener('click', (e) => {
                            e.stopPropagation(); // Evitar que el clic en el botón cierre el hotspot-info
                            window.location.href = `unit.html?id=${hotspot.unitId}`;
                        });
                    } else {
                        hotspotInfo.innerHTML = `<p>Unidad no definida</p>`;
                    }
                    hotspotDiv.appendChild(hotspotInfo);


                    floorPlanImageContainer.appendChild(hotspotDiv);
                });

                // Remover la clase 'active' de todos los botones de piso
                floorSelectorButtons.forEach(btn => btn.classList.remove('active'));
                // Añadir la clase 'active' al botón del piso actual
                const activeFloorBtn = document.querySelector(`.floor-selector-btn[data-floor-id="${floorId}"]`);
                if (activeFloorBtn) {
                    activeFloorBtn.classList.add('active');
                }

            } else {
                floorPlanImageContainer.innerHTML = '<p style="color:white; text-align:center; padding-top: 80px;">Plano de planta no encontrado.</p>';
            }
        }

        // Manejo de eventos para los botones de selección de pisos
        floorSelectorButtons.forEach(button => {
            button.addEventListener('click', () => {
                const floorId = button.dataset.floorId;
                if (floorId) {
                    // Cambiar la URL sin recargar la página (usando history.pushState)
                    // Esto permite que el usuario pueda usar el botón "atrás" del navegador
                    history.pushState({ floor: floorId }, '', `floor-plans.html?floor=${floorId}`);
                    renderFloorPlan(floorId);
                }
            });
        });

        // Manejar el cambio de URL (ej. al usar el botón "atrás" del navegador)
        window.addEventListener('popstate', (event) => {
            const urlParams = new URLSearchParams(window.location.search);
            const floorId = urlParams.get('floor') || Object.keys(floorData)[0]; // Default a la primera planta si no hay ID
            renderFloorPlan(floorId);
        });

        // Cargar el plano de planta inicial al cargar la página
        const urlParams = new URLSearchParams(window.location.search);
        const initialFloorId = urlParams.get('floor') || Object.keys(floorData)[0]; // Default a la primera planta si no se especifica
        renderFloorPlan(initialFloorId);
    }
});


// ** DATOS DE LAS UNIDADES (TAREA 3: Dinamizar Unidades) **
const unitData = {
    "123": {
        details: {
            thumbnail: "assets/images/unit-123-gallery-1.jpg",
            plan3D: "assets/images/unit-123-plan.png",
            name: "Unidad 123",
            typology: "B 1 Ambiente",
            status: "available",
            areaTotal: "29.80 m²",
            areaCubierta: "0.00 m²",
            areaDescubierta: "0.00 m²",
            dormitorios: "1",
            banos: "1",
            balcon: "No",
            cochera: "No",
            lavadero: "Sí"
        },
        galleryImages: [
            "assets/images/unit-123-gallery-1.jpg",
            "assets/images/unit-123-gallery-2.jpg",
            "assets/images/unit-123-gallery-3.jpg"
        ]
    },
    "101": {
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
    // Añade más unidades aquí
};

// ** DATOS DE LAS PLANTAS (TAREA 2: Consolidar Selector de Plantas) **
// Este objeto debe ir DESPUÉS de unitData, ya que los hotspots hacen referencia a unitData
const floorData = {
    "TOP": {
        planImage: "assets/images/floor-top-plan.png",
        hotspots: [
            { id: "PH-A", x: "20%", y: "30%", unitId: "123" },
            { id: "PH-B", x: "60%", y: "50%", unitId: "101" }
        ]
    },
    "9": {
        planImage: "assets/images/floor-9-plan.png",
        hotspots: [
            { id: "901", x: "15%", y: "25%", unitId: "101" },
            { id: "902", x: "50%", y: "70%", unitId: "123" }
        ]
    },
    "1": {
        planImage: "assets/images/floor-1-plan.png",
        hotspots: [
            { id: "101", x: "15%", y: "25%", unitId: "101" },
            { id: "102", x: "50%", y: "70%", unitId: "123" }
        ]
    },
    "PE": {
        planImage: "assets/images/floor-pe-plan.png",
        hotspots: [
            { id: "PE1", x: "30%", y: "30%", unitId: "123" }
        ]
    },
    "PB": {
        planImage: "assets/images/floor-pb-plan.png",
        hotspots: [
            { id: "PB1", x: "40%", y: "60%", unitId: "101" }
        ]
    }
};