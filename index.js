document.addEventListener('DOMContentLoaded', () => {

    console.log("DOM Loaded, starting script..."); // Cek apakah script jalan

    // --- Burger Menu ---
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (burgerMenu && mobileMenu) {
        console.log("Burger elements found.");
        const burgerIcon = burgerMenu.querySelector('i');

        burgerMenu.addEventListener('click', () => {
            console.log("Burger clicked!"); // Cek klik
            mobileMenu.classList.toggle('active');

            if (mobileMenu.classList.contains('active')) {
                burgerIcon.classList.remove('fa-bars');
                burgerIcon.classList.add('fa-times');
            } else {
                burgerIcon.classList.remove('fa-times');
                burgerIcon.classList.add('fa-bars');
            }
        });
    } else {
        console.error("Burger Menu or Mobile Menu element not found!");
    }

    // --- Event Banner Slider ---
    const sliderContainer = document.querySelector('.event-slider-container');
    const slider = document.querySelector('.event-slider');
    const slides = document.querySelectorAll('.event-slide');
    const prevBtn = document.querySelector('.event-slider-container .prev');
    const nextBtn = document.querySelector('.event-slider-container .next');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentSlideIndex = 0;
    let slideWidth = 0;
    let dots = []; // Simpan dots di sini

    function setupSlider() {
        if (!slider || slides.length === 0 || !sliderContainer) return;
        console.log("Setting up slider...");

        slideWidth = sliderContainer.clientWidth; // Gunakan lebar container
        slider.style.width = `${slideWidth * slides.length}px`; // Set lebar total slider
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`; // Set lebar tiap slide
        });

        // Hapus dots lama & buat baru
        dotsContainer.innerHTML = '';
        dots = []; // Kosongkan array dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
            dots.push(dot); // Tambahkan ke array
        });

        goToSlide(currentSlideIndex, false); // Set posisi awal tanpa transisi
    }

    function goToSlide(index, transition = true) {
        if (!slider || !dots || dots.length === 0) return;

        currentSlideIndex = (index + slides.length) % slides.length; // Handle wrap around
        console.log(`Going to slide ${currentSlideIndex}`);

        slider.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
        slider.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;

        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.add('active');
        } else {
             console.error("Dot not found for index:", currentSlideIndex);
        }
    }

    if (slides.length > 0 && prevBtn && nextBtn && dotsContainer && slider) {
        console.log("Slider elements found.");
        nextBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));
        prevBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));

        window.addEventListener('resize', setupSlider); // Recalculate on resize
        setupSlider(); // Initial setup

    } else {
        console.error("Event Slider elements not found or incomplete!", {
            slides: slides.length,
            prevBtn, nextBtn, dotsContainer, slider
        });
    }
    // --- Mobile Menu Dropdown Toggle (REVISI 2) ---
    const mobileMenuContainer = document.getElementById('mobileMenu');

    if (mobileMenuContainer) {
        console.log("Mobile menu container found. Setting up toggles (Revisi 2)...");

        // Gunakan event delegation pada container
        mobileMenuContainer.addEventListener('click', function(event) {

            // Cari apakah yang diklik (event.target) atau induk terdekatnya
            // adalah sebuah .toggle-icon
            const toggleIcon = event.target.closest('.toggle-icon');

            // HANYA jalankan jika yang diklik adalah .toggle-icon
            if (toggleIcon) {
                event.preventDefault();  // Mencegah aksi default jika ikonnya adalah link (meski sekarang span)
                event.stopPropagation(); // Mencegah klik menyebar ke elemen lain

                const wrapper = toggleIcon.parentElement; // Ambil .mobile-link-wrapper
                const submenu = wrapper.nextElementSibling; // Ambil UL berikutnya

                // Pastikan elemen berikutnya ada dan merupakan UL
                if (submenu && submenu.tagName === 'UL') {
                    // Toggle kelas 'active' pada UL (untuk CSS show/hide)
                    submenu.classList.toggle('active');
                    // Toggle kelas 'open' pada ikon (untuk CSS rotate)
                    toggleIcon.classList.toggle('open');
                    console.log("Toggled submenu for:", wrapper.querySelector('a').textContent);
                } else {
                    console.warn("Toggle icon clicked, but no sibling UL found for:", wrapper.querySelector('a').textContent);
                }
            }
        });
    } else {
        console.error("Mobile Menu container (#mobileMenu) not found!");
    }
    // --- Akhir Mobile Menu Dropdown Toggle ---

}); // Pastikan ini adalah penutup dari DOMContentLoaded

