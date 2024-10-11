import { useRef, useEffect, useLayoutEffect } from 'react';

type DependencyList = ReadonlyArray<any>;
type Callback = () => void;

export const useConstructor = (callback: Callback) => {
  useLayoutEffect(() => {
    callback();
  }, []);
};

export const useUpdate = (callback: Callback, dependencies: DependencyList) => {
  const mountCheck = useRef(false);
  useEffect(() => {
    if (mountCheck.current) {
      callback();
    }
    mountCheck.current = true;
  }, [callback, dependencies]);
};

export const useDidReceiveProps = <T extends Record<string, any>>(
  props: T,
  callback: Callback
): void => {
  const mountCheck = useRef(false);
  useEffect(() => {
    if (mountCheck.current) {
      callback();
    }
    mountCheck.current = true;
  }, [callback, props]);
};

export const usePrevious = <T,>(value: T, initialValue?: T): T | undefined => {
  const ref = useRef<T | undefined>(initialValue);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

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

export const sum = (value: number) => {
  return (secondValue?: number) => {
    if (!!secondValue) {
      return sum(value + secondValue);
    }
    return value;
  };
};
