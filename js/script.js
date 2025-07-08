// js/script.js (código completo y actualizado)
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

    const centerHotspot = document.getElementById('centerHotspot');
    if (centerHotspot) {
        // CSS handles hover
    }

    const unitHotspots = document.querySelectorAll('.unit-hotspot');
    unitHotspots.forEach(hotspot => {
        // CSS handles hover
    });

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

    // Lógica para el pin en el selector de plantas (Modificado para Tarea 3: Dinamizar Unidades)
    // Se reutiliza en floor-plans.html para los hotspots dinámicos
    const floorPins = document.querySelectorAll('.unit-hotspot'); // Selecciona hotspots existentes (si los hubiera)
    floorPins.forEach(pin => {
        pin.addEventListener('click', () => {
            // No es estrictamente necesario remover 'active-pin' aquí para los pins estáticos
            // porque la lógica dinámica de floor-plans.html los recrea.
            const unitId = pin.dataset.unitId;
            if (unitId) {
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

        if (amenitiesGalleryImage) {
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
    if (document.body.classList.contains('floor-plans-page')) {
        const floorPlanImageContainer = document.getElementById('floorPlanImageContainer');
        const floorSelectorButtons = document.querySelectorAll('.floor-selector-btn'); // Botones del main-content

        // Referencias para el nuevo dropdown de Pisos en el header
        const floorSelectBtn = document.getElementById('floorSelectBtn');
        const floorSelectDropdown = document.getElementById('floorSelectDropdown');
        const floorSidebarLinks = document.querySelectorAll('.floor-sidebar-link'); // Enlaces de la sidebar

        // Función para renderizar el plano de planta y sus hotspots
        function renderFloorPlan(floorId) {
            const floor = floorData[floorId];

            if (floor) {
                floorPlanImageContainer.innerHTML = ''; // Limpiar el contenedor

                const img = document.createElement('img');
                img.src = floor.planImage;
                img.alt = `Plano del piso ${floorId}`;
                img.classList.add('floor-plan-image');
                floorPlanImageContainer.appendChild(img);

                floor.hotspots.forEach(hotspot => {
                    const hotspotDiv = document.createElement('div');
                    hotspotDiv.classList.add('unit-hotspot');
                    hotspotDiv.dataset.unitId = hotspot.unitId;
                    hotspotDiv.textContent = hotspot.id;
                    hotspotDiv.style.left = hotspot.x;
                    hotspotDiv.style.top = hotspot.y;

                    hotspotDiv.addEventListener('click', () => {
                        document.querySelectorAll('.unit-hotspot').forEach(p => p.classList.remove('active-pin'));
                        hotspotDiv.classList.add('active-pin');
                        window.location.href = `unit.html?id=${hotspot.unitId}`;
                    });

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
                        hotspotInfo.querySelector('button').addEventListener('click', (e) => {
                            e.stopPropagation();
                            window.location.href = `unit.html?id=${hotspot.unitId}`;
                        });
                    } else {
                        hotspotInfo.innerHTML = `<p>Unidad no definida</p>`;
                    }
                    hotspotDiv.appendChild(hotspotInfo);
                    floorPlanImageContainer.appendChild(hotspotDiv);
                });

                // Actualizar estado 'active' en todos los controles de piso
                // Para botones en main-content
                floorSelectorButtons.forEach(btn => btn.classList.remove('active'));
                const activeMainBtn = document.querySelector(`.floor-selector-btn[data-floor-id="${floorId}"]`);
                if (activeMainBtn) {
                    activeMainBtn.classList.add('active');
                }

                // Para enlaces en sidebar
                floorSidebarLinks.forEach(link => link.classList.remove('active'));
                const activeSidebarLink = document.querySelector(`.floor-sidebar-link[data-floor-id="${floorId}"]`);
                if (activeSidebarLink) {
                    activeSidebarLink.classList.add('active');
                }

                // Para enlaces en el nuevo dropdown de Pisos (header)
                // Generar los enlaces dinámicamente cada vez para asegurar que estén frescos
                floorSelectDropdown.innerHTML = ''; // Limpiar el contenido actual
                Object.keys(floorData).forEach(key => {
                    const a = document.createElement('a');
                    a.href = `#`; // No usa href real, lo maneja JS
                    a.textContent = `Piso ${key}`; // O el nombre que quieras mostrar
                    a.dataset.floorId = key;
                    if (key === floorId) {
                        a.classList.add('active'); // Opcional: marcar el piso activo en el dropdown
                    }
                    a.addEventListener('click', (e) => {
                        e.preventDefault();
                        history.pushState({ floor: key }, '', `floor-plans.html?floor=${key}`);
                        renderFloorPlan(key);
                        floorSelectDropdown.classList.remove('show'); // Cerrar el dropdown
                    });
                    floorSelectDropdown.appendChild(a);
                });


            } else {
                floorPlanImageContainer.innerHTML = '<p style="color:white; text-align:center; padding-top: 80px;">Plano de planta no encontrado.</p>';
            }
        }

        // Manejo de eventos para los botones de selección de pisos (en main-content)
        floorSelectorButtons.forEach(button => {
            button.addEventListener('click', () => {
                const floorId = button.dataset.floorId;
                if (floorId) {
                    history.pushState({ floor: floorId }, '', `floor-plans.html?floor=${floorId}`);
                    renderFloorPlan(floorId);
                }
            });
        });

        // Manejo de eventos para los enlaces de selección de pisos (en sidebar)
        floorSidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevenir la navegación por defecto
                const floorId = link.dataset.floorId;
                if (floorId) {
                    history.pushState({ floor: floorId }, '', `floor-plans.html?floor=${floorId}`);
                    renderFloorPlan(floorId);
                    closeSidebar(); // Cerrar el sidebar después de seleccionar
                }
            });
        });


        // Manejo del nuevo dropdown de Pisos en el header
        if(floorSelectBtn && floorSelectDropdown) {
            floorSelectBtn.addEventListener('click', function(event) {
                event.stopPropagation(); // Evitar que el clic en el botón cierre el dropdown inmediatamente
                floorSelectDropdown.classList.toggle('show');
            });

            // Cerrar el dropdown si se hace clic fuera de él
            window.addEventListener('click', function(event) {
                if (!event.target.matches('#floorSelectBtn') && !event.target.closest('#floorSelectBtn')) {
                    if (floorSelectDropdown.classList.contains('show')) {
                        floorSelectDropdown.classList.remove('show');
                    }
                }
            });
        }


        // Manejar el cambio de URL (ej. al usar el botón "atrás" del navegador)
        window.addEventListener('popstate', (event) => {
            const urlParams = new URLSearchParams(window.location.search);
            const floorId = urlParams.get('floor') || Object.keys(floorData)[0];
            renderFloorPlan(floorId);
        });

        // Cargar el plano de planta inicial al cargar la página
        const urlParams = new URLSearchParams(window.location.search);
        const initialFloorId = urlParams.get('floor') || Object.keys(floorData)[0];
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
    "8": { // Añade los datos para el piso 8
        planImage: "assets/images/floor-8-plan.png",
        hotspots: [
             { id: "801", x: "18%", y: "28%", unitId: "101" },
            { id: "802", x: "55%", y: "65%", unitId: "123" }
        ]
    },
    "7": { // Añade los datos para el piso 7
        planImage: "assets/images/floor-7-plan.png",
        hotspots: [
             { id: "701", x: "22%", y: "32%", unitId: "123" }
        ]
    },
    "6": { // Añade los datos para el piso 6
        planImage: "assets/images/floor-6-plan.png",
        hotspots: [
            { id: "601", x: "25%", y: "35%", unitId: "101" }
        ]
    },
    "5": { // Añade los datos para el piso 5
        planImage: "assets/images/floor-5-plan.png",
        hotspots: [
            { id: "501", x: "28%", y: "38%", unitId: "123" }
        ]
    },
    "4": { // Añade los datos para el piso 4
        planImage: "assets/images/floor-4-plan.png",
        hotspots: [
            { id: "401", x: "31%", y: "41%", unitId: "101" }
        ]
    },
    "3": { // Añade los datos para el piso 3
        planImage: "assets/images/floor-3-plan.png",
        hotspots: [
            { id: "301", x: "34%", y: "44%", unitId: "123" }
        ]
    },
    "2": { // Añade los datos para el piso 2
        planImage: "assets/images/floor-2-plan.png",
        hotspots: [
            { id: "201", x: "37%", y: "47%", unitId: "101" }
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