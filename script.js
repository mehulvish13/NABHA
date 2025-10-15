/**
 * Mindly - Educational Platform
 * Single Page Application (SPA) JavaScript
 * Handles navigation, interactions, and dynamic content
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
	/**
	 * The main application object.
	 * This contains all the state and methods for the Mindly SPA.
	 */
	const app = {
		// --- STATE ---
		elements: {
			nav: document.getElementById('mainNav'),
			navMenu: document.getElementById('navMenu'),
			menuToggle: document.getElementById('menuToggle'),
			searchInput: document.getElementById('searchInput'),
			contactForm: document.getElementById('contactForm'),
			pages: document.querySelectorAll('.page'),
			navLinks: document.querySelectorAll('.nav-link'),
			videoCards: document.querySelectorAll('.video-card'),
			filterButtons: document.querySelectorAll('.filter-btn'),
		},
		lastScroll: 0,
		scrollTimeout: null,

		// --- METHODS ---

		/**
		 * Initializes the application, sets up event listeners.
		 */
		init() {
			try {
				// Handle initial page load based on URL hash
				const initialPage = window.location.hash.substring(1) || 'home';
				this.navigate(initialPage, true);

				// Setup event listeners
				window.addEventListener('popstate', this.handlePopState.bind(this));
				window.addEventListener('scroll', this.throttledScroll.bind(this), { passive: true });
				document.body.addEventListener('click', this.handleDelegatedClicks.bind(this));
				this.elements.searchInput?.addEventListener('input', (e) => this.search(e.target.value));
				this.elements.contactForm?.addEventListener('submit', this.submitForm.bind(this));

				// Log successful initialization
				console.log('✅ Mindly SPA initialized successfully');
			} catch (error) {
				console.error('❌ Error initializing Mindly SPA:', error);
			}
		},

		/**
		 * Throttled scroll handler for better performance
		 */
		throttledScroll() {
			if (!this.scrollTimeout) {
				this.scrollTimeout = setTimeout(() => {
					this.handleScroll();
					this.scrollTimeout = null;
				}, 100);
			}
		},

		/**
		 * Main navigation function. Shows the target page and hides others.
		 * @param {string} pageId - The ID of the page to navigate to.
		 * @param {boolean} isInitialLoad - Flag to prevent pushing state on first load.
		 */
		navigate(pageId, isInitialLoad = false) {
			try {
				// Hide all pages
				this.elements.pages.forEach(p => {
					p.classList.remove('active');
					p.setAttribute('aria-hidden', 'true');
				});

				// Show the target page
				const targetPage = document.getElementById(pageId);
				if (targetPage) {
					targetPage.classList.add('active');
					targetPage.setAttribute('aria-hidden', 'false');
				} else {
					// Fallback to home if page not found
					const homePage = document.getElementById('home');
					if (homePage) {
						homePage.classList.add('active');
						homePage.setAttribute('aria-hidden', 'false');
					}
					pageId = 'home';
				}

				// Update active state on navigation links
				this.elements.navLinks.forEach(link => {
					link.classList.toggle('active', link.dataset.page === pageId);
					if (link.dataset.page === pageId) {
						link.setAttribute('aria-current', 'page');
					} else {
						link.removeAttribute('aria-current');
					}
				});

				// Close mobile menu if open
				if (this.elements.navMenu?.classList.contains('active')) {
					this.elements.navMenu.classList.remove('active');
					this.elements.menuToggle?.setAttribute('aria-expanded', 'false');
				}

				// Scroll to top
				window.scrollTo({ top: 0, behavior: 'smooth' });

				// Update URL hash
				if (!isInitialLoad) {
					history.pushState({ page: pageId }, null, `#${pageId}`);
				}

				// Update document title
				const pageTitle = pageId.charAt(0).toUpperCase() + pageId.slice(1).replace(/-/g, ' ');
				document.title = pageId === 'home' ? 'Mindly - Learn, Grow, Shine' : `${pageTitle} | Mindly`;
			} catch (error) {
				console.error('❌ Navigation error:', error);
			}
		},

		/**
		 * Handles all click events on the body for performance (event delegation).
		 * @param {Event} e - The click event object.
		 */
		handleDelegatedClicks(e) {
			const target = e.target;

			// Navigation links, logo, buttons with data-page
			const navTarget = target.closest('[data-page]');
			if (navTarget) {
				e.preventDefault();
				this.navigate(navTarget.dataset.page);
				return;
			}

			// Mobile menu toggle
			if (target.closest('.menu-toggle')) {
				e.preventDefault();
				const isActive = this.elements.navMenu.classList.toggle('active');
				this.elements.menuToggle.setAttribute('aria-expanded', isActive);
				return;
			}

			// Video filters
			const filterBtn = target.closest('.filter-btn');
			if (filterBtn) {
				this.filterVideos(filterBtn.dataset.filter, filterBtn);
				return;
			}

			// Video thumbnail click to load iframe
			const thumbnail = target.closest('.video-thumbnail[data-video]');
			if (thumbnail) {
				this.loadVideo(thumbnail);
				return;
			}

			// Download buttons
			const downloadBtn = target.closest('[data-download]');
			if (downloadBtn) {
				this.downloadFile(downloadBtn.dataset.download, downloadBtn);
				return;
			}

			// Mentor/Group interaction buttons
			if (target.closest('.mentor-contact')) {
				const mentorName = target.closest('.card')?.querySelector('.book-title')?.textContent;
				if (mentorName) {
					this.showToast(`Request sent to ${mentorName}. You'll be connected via email.`);
				}
			} else if (target.closest('.group-join')) {
				const groupName = target.closest('.card')?.querySelector('.book-title')?.textContent;
				if (groupName) {
					this.showToast(`Request to join "${groupName}" sent!`);
				}
			} else if (target.closest('.group-create')) {
				this.showToast('Feature coming soon! Contact us to create a group.', 'success');
			}
		},

		/**
		 * Filters videos based on category.
		 * @param {string} category - The category to filter by.
		 * @param {HTMLElement} clickedButton - The button that was clicked.
		 */
		filterVideos(category, clickedButton) {
			this.elements.filterButtons.forEach(btn => btn.classList.remove('active'));
			clickedButton.classList.add('active');

			this.elements.videoCards.forEach(card => {
				const isVisible = category === 'all' || card.dataset.category === category;
				card.style.display = isVisible ? 'block' : 'none';
			});
		},

		/**
		 * Replaces video thumbnail with YouTube iframe on click.
		 * @param {HTMLElement} thumbnail - The thumbnail element.
		 */
		loadVideo(thumbnail) {
			if (thumbnail.querySelector('iframe')) {
				return; // Already loaded
			}
			const iframe = document.createElement('iframe');
			iframe.src = thumbnail.dataset.video;
			iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
			iframe.allowFullscreen = true;
			iframe.loading = 'lazy';

			// Clear the placeholder and append the iframe
			thumbnail.innerHTML = '';
			thumbnail.appendChild(iframe);
		},

		/**
		 * Simulates a file download and shows a toast message.
		 * @param {string} filename - The name of the file to "download".
		 * @param {HTMLElement} btn - The download button.
		 */
		downloadFile(filename, btn) {
			if (btn.classList.contains('loading')) {
				return;
			}
			btn.classList.add('loading');

			setTimeout(() => {
				btn.classList.remove('loading');
				this.showToast(`Download started: ${filename}`, 'success');
			}, 1500);
		},

		/**
		 * Simulates contact form submission.
		 * @param {Event} e - The form submission event.
		 */
		submitForm(e) {
			e.preventDefault();
			if (!e.target.checkValidity()) {
				this.showToast('Please fill out all required fields.', 'error');
				return;
			}
			const btn = e.target.querySelector('button[type="submit"]');
			btn?.classList.add('loading');

			setTimeout(() => {
				btn?.classList.remove('loading');
				this.showToast('Message sent successfully!', 'success');
				e.target.reset();
			}, 2000);
		},

		/**
		 * Live search functionality for the hero search bar.
		 * @param {string} query - The search query.
		 */
		search(query) {
			// This is a placeholder for a more robust search.
			// For now, it just redirects to the videos page on input.
			if (query.trim().length > 2) {
				this.navigate('videos');
			}
		},

		/**
		 * Shows a toast notification.
		 * @param {string} message - The message to display.
		 * @param {string} type - 'success' or 'error'.
		 */
		showToast(message, type = 'success') {
			const toast = document.createElement('div');
			toast.className = `toast toast-${type}`;
			const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
			toast.innerHTML = `<i class="fas fa-${icon}"></i> <span>${message}</span>`;
			document.body.appendChild(toast);
			setTimeout(() => toast.remove(), 4000);
		},

		/**
		 * Handles browser back/forward navigation.
		 */
		handlePopState() {
			const pageId = window.location.hash.substring(1) || 'home';
			this.navigate(pageId, true);
		},

		/**
		 * Adds a "scrolled" class to the nav on scroll.
		 */
		handleScroll() {
			const currentScroll = window.pageYOffset;
			if (currentScroll > 50) {
				this.elements.nav?.classList.add('scrolled');
			} else {
				this.elements.nav?.classList.remove('scrolled');
			}
			this.lastScroll = currentScroll;
		},
	};

	// Start the application
	app.init();
});
