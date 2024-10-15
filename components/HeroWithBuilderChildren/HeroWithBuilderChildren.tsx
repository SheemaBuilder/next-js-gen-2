import { Builder, withChildren } from '@builder.io/react';  // import withChildren
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';
import ProductSelect from '../ProductSelect/ProductSelect';


const Hero = (props: { children: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) =>
  <div>{props.children}</div>

// pass your custom component to withChildren()
export const HeroWithBuilderChildren = withChildren(Hero)


 