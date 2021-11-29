declare module '*.svg' {
    import { SvgProps } from 'react-native-svg'

    const content: React.StatelessComponent<SvgProps>
    export default content
}

declare module '*.graphql' {
    import { DocumentNode } from 'graphql'

    const Schema: DocumentNode
  
    export = Schema
  }