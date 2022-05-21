import { Connection, Edge } from "graphql-relay";
import { ConnectionArgs } from "../inputs/ConnectionArgs";

function applyAfter<T>(edges: Edge<T>[], { after }: ConnectionArgs): Edge<T>[] {
    if (after) {
        const afterEdgeIdx = edges.findIndex((edge) => edge.cursor === after);
        if (afterEdgeIdx != -1) {
            return edges.slice(afterEdgeIdx + 1);
        }
    }
    return edges;
}

function applyBefore<T>(
    edges: Edge<T>[],
    { before }: ConnectionArgs,
): Edge<T>[] {
    if (before) {
        const beforeEdgeIdx = edges.findIndex((edge) => edge.cursor === before);
        if (beforeEdgeIdx != -1) {
            return edges.slice(0, beforeEdgeIdx);
        }
    }
    return edges;
}

function applyFirst<T>(edges: Edge<T>[], { first }: ConnectionArgs): Edge<T>[] {
    if (first) {
        if (first < 0) {
            throw new Error("Invalid first argument");
        } else if (first < edges.length) {
            return edges.slice(0, first);
        }
    }
    return edges;
}

function applyLast<T>(edges: Edge<T>[], { last }: ConnectionArgs): Edge<T>[] {
    if (last) {
        if (last < 0) {
            throw new Error("Invalid last argument");
        } else if (last < edges.length) {
            return edges.slice(edges.length - last);
        }
    }
    return edges;
}

function applyCursorsToEdges<T>(
    edges: Edge<T>[],
    { before, after }: ConnectionArgs,
): Edge<T>[] {
    const afterEdges = applyAfter(edges, { after });
    const beforeEdges = applyBefore(afterEdges, { before });
    return beforeEdges;
}

function edgesToReturn<T>(
    edges: Edge<T>[],
    { before, after, first, last }: ConnectionArgs,
): Edge<T>[] {
    const cursorEdges = applyCursorsToEdges(edges, { before, after });
    const afterFirstEdges = applyFirst(cursorEdges, { first });
    const afterLastEdges = applyLast(afterFirstEdges, { last });
    return afterLastEdges;
}

function hasPreviousPage<T>(
    edges: Edge<T>[],
    { before, after, last }: ConnectionArgs,
): boolean {
    if (last) {
        const cursorEdges = applyCursorsToEdges(edges, { before, after });
        return last < cursorEdges.length;
    } else if (after) {
        const cursorEdges = applyCursorsToEdges(edges, { after });
        return cursorEdges.length != edges.length;
    }
    return false;
}

function hasNextPage<T>(
    edges: Edge<T>[],
    { before, after, first }: ConnectionArgs,
): boolean {
    if (first) {
        const cursorEdges = applyCursorsToEdges(edges, { before, after });
        return first < cursorEdges.length;
    } else if (before) {
        const cursorEdges = applyCursorsToEdges(edges, { before });
        return cursorEdges.length != edges.length;
    }
    return false;
}

function startCursor<T>(edges: Edge<T>[]) {
    if (edges.length > 0) {
        return edges[0].cursor;
    }
    return null;
}

function endCursor<T>(edges: Edge<T>[]) {
    if (edges.length > 0) {
        return edges[edges.length - 1].cursor;
    }
    return null;
}

export function paginate<T>(
    edges: Edge<T>[],
    connectionArgs: ConnectionArgs,
): Connection<T> {
    const paginatedEdges = edgesToReturn(edges, connectionArgs);
    return {
        edges: paginatedEdges,
        pageInfo: {
            hasPreviousPage: hasPreviousPage(edges, connectionArgs),
            hasNextPage: hasNextPage(edges, connectionArgs),
            startCursor: startCursor(paginatedEdges),
            endCursor: endCursor(paginatedEdges),
        },
    };
}
