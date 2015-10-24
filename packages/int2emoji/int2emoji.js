Int2emoji = function (Emoji) {
    var CHAR_SET = [
        '😁',
        '😂',
        '😃',
        '😉',
        '😊',
        '😍',
        '😏',
        '😱',
        '🚀',
        '🚃',
        '🚄',
        '🚌',
        '🚗',
        '🚤',
        '🚲',
        '🚽',
        '🛀',
        '⚡',
        '⚓',
        '⚽',
        '⚾',
        '⛄',
        '⛅',
        '⛳',
        '⛵',
        '🀄',
        '🌂',
        '🌏',
        '🌙',
        '🌟',
        '🌴',
        '🌵',
        '🌽',
        '🍄',
        '🍅',
        '🍆',
        '🍇',
        '🍈',
        '🍉',
        '🍊',
        '🍌',
        '🍍',
        '🍒',
        '🍓',
        '🍔',
        '🍕',
        '🍖',
        '🍗',
        '🍘',
        '🍙',
        '🍚',
        '🍛',
        '🍜',
        '🍝',
        '🍞',
        '🍟',
        '🍢',
        '🍡',
        '🍣',
        '🍤',
        '🍥',
        '🍦',
        '🍧',
        '🍨',
        '🍩',
        '🍪',
        '🍫',
        '🍬',
        '🍭',
        '🍮',
        '🍯',
        '🍰',
        '🍱',
        '🍲',
        '🍳',
        '🍴',
        '🍵',
        '🍶',
        '🍷',
        '🍸',
        '🍹',
        '🍺',
        '🍻',
        '🎂',
        '🐌',
        '🐍',
        '🐑',
        '🐒',
        '🐔',
        '🐗',
        '🐘',
        '🐙',
        '🐝',
        '🐞',
        '🐠',
        '🐢',
        '🐣',
        '🐤',
        '🐧',
        '🐨',
        '🐫',
        '🐬',
        '🐭',
        '🐮',
        '🐯',
        '🐰',
        '🐱',
        '🐲',
        '🐳',
        '🐴',
        '🐵',
        '🐶',
        '🐷',
        '🐸',
        '🐹',
        '🐺',
        '🐻',
        '🐼',
        '👀',
        '👑',
        '👓',
        '👘',
        '👻',
        '👽',
        '💍',
        '💎',
        '💡',
        '💣',
        '💩',
        '💯',
        '💰',
        '🙏',
    ];

    Emoji.encode = function(integer){
        if (integer === 0) {return '0';}
        var s = '';
        while (integer > 0) {
            s = Emoji.characterSet[integer % 132] + s;
            integer = Math.floor(integer/132);
        }
        return s;
    };

    Emoji.decode = function(emojiString){
        var val = 0, emojiChars = emojiString.split("").reverse();
        emojiChars.forEach(function(character, index){
            val += Emoji.characterSet.indexOf(character) * Math.pow(132, index);
        });
        return val;
    };

    Emoji.setCharacterSet = function(chars) {
        var uniqueCharacters = [];

        if(chars.length != 132) throw Error("You must supply 132 characters");

        chars.forEach(function(char){
            if(!~uniqueCharacters.indexOf(char)) uniqueCharacters.push(char);
        });

        if(uniqueCharacters.length != 132) throw Error("You must use unique characters.");

        Emoji.characterSet = chars;
    };

    Emoji.setCharacterSet(CHAR_SET);
    return Emoji;
}({});
