import { convert } from "./convert";

function handleInputInteraction(e) {
	const max = 340;
	e.target.style.height = 'inherit';

	const h = Math.min(e.target.scrollHeight, max);
	e.target.style.height = `${h}px`;

	if (h >= max) {
		e.target.style.overflow = 'auto';
	} else {
		e.target.style.overflow = 'hidden';
	}
};

function handleConvert(e, inputValue, displayElement) {
	const result = convert(inputValue);
	displayElement.textContent = result;
};

async function handleCopy(e, displayElement) {
	try {
		await navigator.clipboard.writeText(displayElement.textContent);
	} catch (error) {
		console.error('COPY ERROR')
	}
};

function displayChange(displayElement, wrapperElement) {
	if (displayElement.textContent) {
		wrapperElement.style.display = 'flex';
	} else {
		wrapperElement.style.display = 'none';
	}
}

export const DOM = (function () {
	const input = document.querySelector('.input-group textarea');
	const displayWrapper = document.querySelector('.display-wrapper');
	const display = document.querySelector('.display-wrapper p');
	const convertBtn = document.getElementById('convert-btn');
	const copyBtn = document.getElementById('copy-btn');

	input.addEventListener('keydown', handleInputInteraction)
	input.addEventListener('input', handleInputInteraction)

	const displayObserver = new MutationObserver(
		() => { displayChange(display, displayWrapper) }
	);

	displayObserver.observe(displayWrapper, {
		childList: true,
		subtree: true,
	});

	convertBtn.addEventListener('click', (e) => {
		handleConvert(e, input.value, display);
	});

	copyBtn.addEventListener('click', (e) => {
		handleCopy(e, display);
	});
})();
