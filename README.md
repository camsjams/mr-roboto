# Mr Roboto

Mr Roboto is a barebones, no-frills, basic secret message utility. Please read the [license](LICENSE) for full information about usage policies.

Mr Roboto is not responsible for any data exfiltration woes. Keep it secret, keep it safe.

## Usage

### Encrypting
1. Supply text to be encrypted
2. Supply a `secret` for use in the encryption process
3. Press "encrypt"
4. Copy your `ciphertext` and `initialization vector` to safe places
5. Remember your `secret`!

### Decrypting
1. Supply `ciphertext` to be decrypted
2. Supply `secret` for use in the decryption process, should be the one used for encryption
3. Supply your `initialization vector`, given to you after encryption
4. Press "decrypt"
5. View encrypted contents

### Bonus Features
* If text contains links, they will be linkified with `rel="noopener noreferrer"`, you can disable this via the checkbox
* Check out some [examples here](examples.md)

## Demo
[A demonstration](https://github.com/camsjams/mr-roboto)

## Status
For fun or personal use, not for production - Version 1.0.0

## Platforms / Technologies
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
* [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)
* [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
* [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder)
* [AES-GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode)


#### Domo arigato, Mr. Roboto

> You're wondering who I am (Secret, secret, I've got a secret)
>
> Machine or mannequin (Secret, secret, I've got a secret)
>
> With parts made in Japan (Secret, secret, I've got a secret)
>
> I am the modern man

![Image of a Mr Robot and Mr Roboto mash-up](mr-robot0.jpg)