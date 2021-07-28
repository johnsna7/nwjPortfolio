const tailwindcss = require('tailwindcss');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const plugins = [];
plugins.push(tailwindcss('tailwind.config.js'));


if (!IS_DEVELOPMENT) {
    const purgecss = require('@fullhuman/postcss-purgecss');
    
    class TailwindExtractor {
        static extract(content) {
            return content.match(/[\w-/:]+(?<!:)/g) || []
        }
    }
    
    plugins.push(
        purgecss({
            content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx", "./public/**/*.html"],
            extractors: [
                {
                    extractor: TailwindExtractor,
                    extensions: ['html']
                }
            ]
        })
    );
}

module.exports = { plugins }