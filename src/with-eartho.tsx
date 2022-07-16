import React, { ComponentType } from 'react';
import EarthoOneContext, { EarthoOneContextInterface } from './eartho-context';

/**
 * Components wrapped in `withEarthoOne` will have an additional `eartho` prop
 */
export interface WithEarthoOneProps {
  eartho: EarthoOneContextInterface;
}

/**
 * ```jsx
 * class MyComponent extends Component {
 *   render() {
 *     // Access the auth context from the `eartho` prop
 *     const { user } = this.props.eartho;
 *     return <div>Hello {user.name}!</div>
 *   }
 * }
 * // Wrap your class component in withEarthoOne
 * export default withEarthoOne(MyComponent);
 * ```
 *
 * Wrap your class components in this Higher Order Component to give them access to the EarthoOneContext
 */
const withEarthoOne = <P extends WithEarthoOneProps>(
  Component: ComponentType<P>
): ComponentType<Omit<P, keyof WithEarthoOneProps>> => {
  return function WithAuth(props): JSX.Element {
    return (
      <EarthoOneContext.Consumer>
        {(auth: EarthoOneContextInterface): JSX.Element => (
          <Component {...(props as P)} eartho={auth} />
        )}
      </EarthoOneContext.Consumer>
    );
  };
};

export default withEarthoOne;
