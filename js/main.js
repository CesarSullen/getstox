const hamburger = document.querySelector(".burger-menu");
const mobileMenu = document.getElementById("nav-mobile");

hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("is-open");
	mobileMenu.classList.toggle("is-open");
});

document
	.querySelectorAll(".nav-mobile-link, .nav-mobile-cta")
	.forEach((link) => {
		link.addEventListener("click", () => {
			mobileMenu.classList.remove("is-open");
		});
	});

// IntersectionObserver
const revealTargets = [
	".hero-title",
	".hero-subtitle",
	".hero-actions",
	".hero-mockup",
	".problem-card",
	".feature-card",
	".screenshot-item",
	".steps-side-image",
	".step",
	".how-it-works-diagram",
	".comparison-table-wrap",
	".pricing-card",
	".downloads-title",
	".downloads-desc",
	".downloads-actions",
];

revealTargets.forEach((selector) => {
	document.querySelectorAll(selector).forEach((el, index) => {
		el.classList.add("js-reveal");

		// Delay inside the same parent
		const delay = Math.min(index, 5);
		if (delay > 0) {
			el.classList.add(`js-reveal-delay-${delay}`);
		}
	});
});

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);

				// Once showed, remove
				entry.target.addEventListener(
					"transitionend",
					() => {
						entry.target.classList.remove("js-reveal");
						entry.target.className = entry.target.className
							.replace(/js-reveal-delay-\d+/, "")
							.trim();
					},
					{ once: true },
				);
			}
		});
	},
	{
		threshold: 0.12,
		rootMargin: "0px 0px -40px 0px",
	},
);

document.querySelectorAll(".js-reveal").forEach((el) => observer.observe(el));
