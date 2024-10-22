export const transliterateTo = (lang,inputVal) => {
    if(lang.toLowerCase()==="mk")
        return convertToMkd(inputVal)
    else
        throw new Error(`Language ${lang} not supported`)
}

function convertToMkd(inputField) {
    const alphabet = {
        'a': 'а',
        'b': 'б',
        'v': 'в',
        'g': 'г',
        'd': 'д',
        ']': 'ѓ',
        'e': 'е',
        '\\': 'ж',
        'z': 'з',
        'y': 's',
        'i': 'и',
        'j': 'ј',
        'k': 'к',
        'l': 'л',
        'q': 'љ',
        'm': 'м',
        'n': 'н',
        'w': 'њ',
        'o': 'о',
        'p': 'п',
        'r': 'р',
        's': 'с',
        't': 'т',
        '\'': 'ќ',
        'u': 'у',
        'f': 'ф',
        'h': 'х',
        'c': 'ц',
        ';': 'ч',
        'x': 'џ',
        '[': 'ш',

        'A': 'А',
        'B': 'Б',
        'V': 'В',
        'G': 'Г',
        'D': 'Д',
        '}': 'Ѓ',
        'E': 'Е',
        '\|': 'Ж',
        'Z': 'З',
        'Y': 'Ѕ',
        'I': 'И',
        'J': 'Ј',
        'K': 'К',
        'L': 'Л',
        'Q': 'Љ',
        'M': 'М',
        'N': 'Н',
        'W': 'Њ',
        'O': 'О',
        'P': 'П',
        'R': 'Р',
        'S': 'С',
        'T': 'Т',
        '\"': 'Ќ',
        'U': 'У',
        'F': 'Ф',
        'H': 'Х',
        'C': 'Ц',
        ':': 'Ч',
        'X': 'Џ',
        '{': 'Ш',
    };

    return inputField.split('').map((character) => {
        // character = character.toLocaleUpperCase();
        if (alphabet[character] === undefined)
            return character;
        return alphabet[character]
        // return character;
    }).join('')
}
