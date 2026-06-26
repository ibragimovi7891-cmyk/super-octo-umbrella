function processText(action) {
    const text = document.getElementById('textInput').value;
    const shift = parseInt(document.getElementById('shiftInput').value) || 0;
    const method = document.getElementById('methodSelect').value;
    let result = '';

    if (!text) {
        document.getElementById('result').innerText = "Iltimos, matn kiriting!";
        return;
    }

    if (method === 'caesar') {
        let currentShift = action === 'encrypt' ? shift : -shift;
        // Sezar shifrlash algoritmi
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            if (char.match(/[a-z]/i)) {
                let code = text.charCodeAt(i);
                if (code >= 65 && code <= 90) {
                    char = String.fromCharCode(((code - 65 + currentShift) % 26 + 26) % 26 + 65);
                } else if (code >= 97 && code <= 122) {
                    char = String.fromCharCode(((code - 97 + currentShift) % 26 + 26) % 26 + 97);
                }
            }
            result += char;
        }
    } else if (method === 'base64') {
        try {
            if (action === 'encrypt') {
                result = btoa(unescape(encodeURIComponent(text)));
            } else {
                result = decodeURIComponent(escape(atob(text)));
            }
        } catch (e) {
            result = "Xatolik! Base64 formatidagi shifrlangan matn noto'g'ri.";
        }
    }

    document.getElementById('result').innerText = result;
}
