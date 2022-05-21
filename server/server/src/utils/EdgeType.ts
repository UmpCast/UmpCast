import { ConnectionCursor, Edge as RelayEdge } from "graphql-relay";
import { ClassType, Field, ObjectType } from "type-graphql";

export function EdgeType<NodeType>(
    nodeName: string,
    nodeType: ClassType<NodeType>,
) {
    @ObjectType(`${nodeName}Edge`, { isAbstract: true })
    abstract class Edge implements RelayEdge<NodeType> {
        @Field(() => nodeType)
        node!: NodeType;

        @Field()
        cursor!: ConnectionCursor;
    }
    return Edge;
}
