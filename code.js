let dataInput = document.getElementById('data-input');
let dataOutput = document.getElementById('data-output');
let decrypt = document.getElementById('decrypt');
let encrypt = document.getElementById('encrypt');
let secret = document.getElementById('secret');
let initializationVector = document.getElementById('iv');
let linkify = document.getElementById('linkify');
let message = document.getElementById('message');

const getStringFromArrayBuffer = (buffer) => btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));

const getArrayBufferFromString = (string) => new Uint8Array(atob(string).split('').map((c) => c.charCodeAt(0)));

const encryptText = async (plainText, password) => {
	const ptUtf8 = new TextEncoder().encode(plainText);
	const pwUtf8 = new TextEncoder().encode(password);
	const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);

	const iv = crypto.getRandomValues(new Uint8Array(12));
	const alg = { name: 'AES-GCM', iv: iv };
	const key = await crypto.subtle.importKey('raw', pwHash, alg, false, ['encrypt']);

	return { iv, encBuffer: await crypto.subtle.encrypt(alg, key, ptUtf8) };
};

const decryptText = async (ctBuffer, iv, password) => {
	const pwUtf8 = new TextEncoder().encode(password);
	const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);

	const alg = { name: 'AES-GCM', iv: iv };
	const key = await crypto.subtle.importKey('raw', pwHash, alg, false, ['decrypt']);

	const ptBuffer = await crypto.subtle.decrypt(alg, key, ctBuffer);
	const plaintext = new TextDecoder().decode(ptBuffer);

	return plaintext;
};

const linkifyText = (text) => {
	let urlRegex = /(https?:\/\/[^\s]+)/g;
	return text.replace(urlRegex, (url) =>
		`<a
			target="_blank"
			rel="noopener noreferrer"
			href="${url}">
			${url}
		</a>`
	);
};

document.addEventListener('click', async (event) => {
	if (event.target === decrypt) {
		if (!secret.value) {
			dataOutput.innerHTML = '';
			message.innerText = 'No secret, unable to encrypt.';
			return;
		}

		let text = await decryptText(
			getArrayBufferFromString(dataInput.value),
			getArrayBufferFromString(initializationVector.value),
			secret.value
		);
		dataOutput.innerHTML = linkify.checked ? linkifyText(text) : text;
	} else if (event.target === encrypt) {
		if (!secret.value) {
			dataOutput.innerHTML = '';
			message.innerText = 'No secret, unable to encrypt.';
			return;
		}

		let { iv, encBuffer } = await encryptText(dataInput.value, secret.value);
		dataOutput.innerHTML = `
			<h4>CipherText:</h4>
			<div>${getStringFromArrayBuffer(encBuffer)}</div>
			<h4>iv:</h4>
			<pre>${getStringFromArrayBuffer(iv)}</pre>`;
	}
});
