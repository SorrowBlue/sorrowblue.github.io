module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
	// add your custom rules here
	rules: {
      "indent": "off",
		"no-tabs": "off",
		"vue/html-indent": "off"
	}
}
