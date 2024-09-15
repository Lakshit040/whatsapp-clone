import { useRef, useEffect } from 'react';

type DependencyList = ReadonlyArray<any>;
type Callback = () => void;

const deepCompare = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepCompare(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

// to mimic constructor in class component
export const useConstructor = (callback: Callback) => {
  const hasRun = useRef(false);
  if (!hasRun.current) {
    callback();
    hasRun.current = true;
  }
};

// to mimic componentDidUpdate
export const useUpdate = (callback: Callback, dependencies: DependencyList) => {
  const hasMounted = useRef(false);
  const prevDependencies = useRef<DependencyList>(dependencies);

  useEffect(() => {
    if (hasMounted.current) {
      const isChanged = dependencies.some(
        (dependency, index) =>
          !deepCompare(dependency, prevDependencies.current[index])
      );

      if (isChanged) {
        callback();
      }
      prevDependencies.current = dependencies;
    } else {
      hasMounted.current = true;
    }
  }, [callback, dependencies]);
};

type DiffPropsCallback<T> = (prevProps: T, nextProps: T) => void;

// to mimic componentDidReceiveProps
export const useDidReceiveProps = <T extends Record<string, any>>(
  props: T,
  callback: DiffPropsCallback<T>
): void => {
  const prevProps = useRef<T | null>(null);

  useEffect(() => {
    if (prevProps.current && !deepCompare(prevProps.current, props)) {
      callback(prevProps.current, props);
    }

    prevProps.current = props;
  }, [props, callback]);
};

// to hold the previous value of the variable
export const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
