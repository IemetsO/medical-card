/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  // also sort classes in cslx/cn function
  // @ts-ignore
  tailwindFunctions: ["clsx", "cn"],
  semi: false,
}

module.exports = config
