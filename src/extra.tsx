import { useRef, useEffect } from 'react';

type DependencyList = ReadonlyArray<any>;
type Callback = () => void;

const deepCompare = (obj1: any, obj2: any): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
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
export const usePrevious = <T,>(value: T, initialValue?: T): T | undefined => {
  const ref = useRef<T | undefined>(initialValue);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

// bs delay ke baad hi invoke hoga hamesha and agr repeated calls h to reset ho jayega timer
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// ek interval mei bs ek baar hi call hoga function
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;

  return (...args: Parameters<T>): void => {
    const now = new Date().getTime();

    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};
