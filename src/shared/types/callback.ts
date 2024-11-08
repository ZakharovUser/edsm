type ParametersCallback<A = unknown, R = void> = (args: A) => R;
type NoParametersCallback<R = void> = () => R;

export type Callback<A = undefined, R = void> = A extends undefined
  ? NoParametersCallback<R>
  : ParametersCallback<A, R>;
