module.exports = {
    "env": {
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [1,'tab'],    // 统一代码缩进方式
        "linebreak-style": 2,   //统一换行符，"\n" unix(for LF) and "\r\n" for windows(CRLF)，默认unix
        "quotes": [2, "single", "avoid-escape"], //单引号
        "semi": [2, "always"],//语句强制分号结尾
        "operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首
        "lines-around-comment": 2,   //规定注释和代码块之间是否留空行
        "no-console": 0,//禁止使用console 
        "no-inner-declarations": 0
    }
};