// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        "eqeqeq": "off",//== ===
        //'no-extra-boolean-cast': "off",//!!
        "no-tabs": ["error"],
        "space-before-function-paren": ["error", "never"],//函数括号前面不能加空格
        "spaced-comment": ["error", "always"],//注册后面不加空格
        quotes: ["error", "single", { "allowTemplateLiterals": true }],//使用单引号
        semi: ["error", "always"],
        //vue 由于这些标签是自闭合的，所以有end标签会报错
        "vue/no-parsing-error": [2, {
            "x-invalid-end-tag": false
        }],
        "no-sparse-arrays": "off",
        // tab4格
        "indent": [1, 4],
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}