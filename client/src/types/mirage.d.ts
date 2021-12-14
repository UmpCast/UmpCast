/* eslint-disable */

declare module 'miragejs' {
    import {
        FactoryDefinition,
        ModelDefinition,
        BelongsTo,
        HasMany
    } from 'miragejs/-types'

    export { Server, createServer } from 'miragejs/server'
    export { Registry, Instantiate, ModelInstance } from 'miragejs/-types'
    export {
        Serializer,
        ActiveModelSerializer,
        JSONAPISerializer,
        RestSerializer
    } from 'miragejs/serializer'

    /**
     * A fake HTTP request
     */
    export class Request {
        /** The request body, if defined */
        readonly requestBody: string

        /** The URL of the request */
        readonly url: string

        /** Any headers associated with the request, with downcased names */
        readonly requestHeaders: Record<string, string>

        /** Any parameter specified via dynamic route segments */
        readonly params: Record<string, string>

        /** Any query parameters associated with the request */
        readonly queryParams: Record<string, string>
    }

    /**
     * A fake HTTP response. May be returned from a Mirage route
     * handler for finer-grained control over the response behavior.
     */
    export class Response {
        /**
         * @param code The HTTP status code for this response
         * @param headers Any custom headers to set in this response
         * @param body Data to send in the response body
         */
        constructor(
            code: number,
            headers?: Record<string, string>,
            body?: string | {}
        )

        toRackResponse(): [
            number,
            Record<string, string> | undefined,
            string | {} | undefined
        ]
    }

    /**
     * The base definition for Mirage models.
     *
     * Use `Model.extend({ ... })` to define a model's relationships
     * (via `belongsTo()` and `hasMany()`) and any static default
     * attribute values.
     */
    export const Model: ModelDefinition

    /**
     * The base definition for Mirage factories.
     *
     * Use `Factory.extend({ ... })` to define methods that
     * will generate default attribute values when `server.create`
     * or the corresponding `schema` method is called for this
     * type.
     */
    export const Factory: FactoryDefinition

    /**
     * A collection of zero or more Mirage model instances.
     */
    export class Collection<T> {
        length: number

        modelName: string

        models: T[]

        add: (model: T) => void
    }

    export interface RelationshipOptions {
        inverse?: string | null
        polymorphic?: boolean
    }

    /** Declares a one-to-one relationship to another Mirage model type. */
    export function belongsTo<K extends string>(
        key?: K,
        options?: RelationshipOptions
    ): BelongsTo<K>
    export function belongsTo<K extends string>(
        options?: RelationshipOptions
    ): BelongsTo<K>

    export function association(): any

    /** Declares a one-to-many relationship to another Mirage model type. */
    export function hasMany<K extends string>(
        key?: K,
        options?: RelationshipOptions
    ): HasMany<K>
    export function hasMany<K extends string>(
        options?: RelationshipOptions
    ): HasMany<K>
}

declare module 'miragejs/-types' {
    import { Collection } from 'miragejs'

    /* A 1:1 relationship between models */
    export class BelongsTo<Name extends string> {
        private name: Name
    }

    /* A 1:many relationship between models */
    export class HasMany<Name extends string> {
        private name: Name
    }

    // Captures the result of a `Model.extend()` call
    interface ModelDefinition<Data extends {} = {}> {
        extend<NewData>(data: NewData): ModelDefinition<Assign<Data, NewData>>
    }

    // Captures the result of a `Factory.extend()` call
    interface FactoryDefinition<Data extends {} = {}> {
        extend<NewData>(
            data: WithFactoryMethods<NewData>
        ): FactoryDefinition<Assign<Data, FlattenFactoryMethods<NewData>>>
    }

    type WithFactoryMethods<T> = {
        [K in keyof T]: T[K] | ((n: number) => T[K])
    }

    // Extract factory method return values from a factory definition
    type FlattenFactoryMethods<T> = {
        [K in keyof T]: T[K] extends (n: number) => infer V ? V : T[K]
    }

    /**
     * Given a registry and the name of one of the models defined in it,
     * returns the type of that model as instantiated by Mirage.
     */
    export type Instantiate<
        Registry,
        ModelName extends keyof Registry
    > = ModelInstance<
        {
            // Splitting and rejoining on `ModelName` ensures that unions distribute
            // properly, so that `Instantiate<Reg, 'foo' | 'bar'>` expands out like
            // `Instantiate<Reg, 'foo'> | Instantiate<Reg, 'bar'>` rather than something
            // that only has the intersection of `foo` and `bar`'s keys.
            [Model in ModelName]: {
                [Key in keyof Registry[Model]]: InstantiateValue<
                    Registry,
                    Registry[Model][Key]
                >
            }
        }[ModelName]
    >

    // Given a registry and value type, checks whether that type represents
    // if Mirage relationship. If so, returns the corresponding model or
    // collection type from the registry; otherwise returns the type unchanged.
    type InstantiateValue<Registry, T> = T extends BelongsTo<infer ModelName>
        ? InstantiateIfDefined<Registry, ModelName> | null
        : T extends HasMany<infer ModelName>
        ? Collection<InstantiateIfDefined<Registry, ModelName>>
        : T

    // Returns the instantiated type of the given model if it exists in the
    // given registry, or `unknown` otherwise.
    type InstantiateIfDefined<Registry, ModelName> =
        ModelName extends keyof Registry
            ? Instantiate<Registry, ModelName>
            : unknown

    // The type-level equivalent of `Object.assign`
    type Assign<T, U> = U & Omit<T, keyof U>

    // Extracts model definition info for the given key, if a corresponding model is defined
    type ExtractModelData<Models, K> = K extends keyof Models
        ? Models[K] extends ModelDefinition<infer Data>
            ? Data
            : {}
        : {}

    // Extracts factory definition info for the given key, if a corresponding factory is defined
    type ExtractFactoryData<Factories, K> = K extends keyof Factories
        ? Factories[K] extends FactoryDefinition<infer Data>
            ? FlattenFactoryMethods<Data>
            : {}
        : {}

    /**
     * Models all available information about a given set of model and
     * factory definitions, determining the behavior of ORM methods on
     * a `Server` and its corresponding `Schema` instance.
     */
    export type Registry<
        Models extends AnyModels,
        Factories extends AnyFactories
    > = {
        [K in keyof Models | keyof Factories]: ExtractModelData<Models, K> &
            ExtractFactoryData<Factories, K>
    }

    export type AnyModels = Record<string, ModelDefinition>
    export type AnyFactories = Record<string, FactoryDefinition>

    /** A marker type for easily constraining type parameters that must be shaped like a Registry */
    export type AnyRegistry = Registry<AnyModels, AnyFactories>

    /** Represents the type of an instantiated Mirage model.  */
    export type ModelInstance<Data extends {} = {}> = Data & {
        id?: string
        attrs: Record<string, unknown>
        modelName: string

        /** Persists any updates on this model back to the Mirage database. */
        save(): void

        /** Updates and immediately persists a single or multiple attr(s) on this model. */
        update<K extends keyof Data>(key: K, value: Data[K]): void
        update(changes: Partial<Data>): void

        /** Removes this model from the Mirage database. */
        destroy(): void

        /** Reloads this model's data from the Mirage database. */
        reload(): void
    }
}
