module.exports = {
    client: {
        service: {
            name: "umpcast-server",
            localSchemaFile: "client/src/schema.graphql"
        },
        includes: ["src/**/*.{ts,tsx}", "App.tsx"],
        excludes: ["**/__tests__/**", "src/generated"]
    }
}
