module.exports = {
    client: {
        service: {
            name: "umpcast-server",
            url: "http://localhost:8000/graphql/"
        },
        includes: ["src/**/*.{ts,tsx}"],
        excludes: ["**/__tests__/**"]
    }
}
