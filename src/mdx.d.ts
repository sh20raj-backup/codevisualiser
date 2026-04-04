declare module '*.mdx' {
  import type { ReactNode, ComponentType } from 'react'
  export const metadata: Record<string, any>
  const component: ComponentType<any>
  export default component
}
