import { Edge, Connection as RelayConnection } from "graphql-relay";
import { ClassType, Field, ObjectType } from "type-graphql";
import { PageInfo } from "../outputs/PageInfo";

type ExtractNodeType<EdgeType> = EdgeType extends Edge<infer NodeType>
    ? NodeType
    : never;

export function ConnectionType<
    EdgeType extends Edge<NodeType>,
    NodeType = ExtractNodeType<EdgeType>,
>(nodeName: string, edgeClass: ClassType<EdgeType>) {
    @ObjectType(`${nodeName}Connection`, { isAbstract: true })
    abstract class Connection implements RelayConnection<NodeType> {
        @Field(() => PageInfo)
        pageInfo!: PageInfo;

        @Field(() => [edgeClass])
        edges!: EdgeType[];
    }
    return Connection;
}
