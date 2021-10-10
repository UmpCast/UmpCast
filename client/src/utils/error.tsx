export function hasErrorMessage(
    errors: readonly Error[],
    messages: string[]
): boolean {
    return errors.some((err) => messages.includes(err.message))
}
