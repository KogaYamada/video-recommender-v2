import { useReducer, createContext } from 'react';

export default function CreateDataContext(
  reducer: any,
  actions: any,
  defaultValue: any
) {
  const Context = createContext(defaultValue);
  const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
}