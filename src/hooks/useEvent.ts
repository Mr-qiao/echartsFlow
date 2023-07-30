import { useCallback, useLayoutEffect, useRef } from 'react';

export const useEvent = (func: any) => {
  const fnRef = useRef<any>(null);
  // 视图渲染前及每次 shouldUpdate 时更新 handlerRef.current
  useLayoutEffect(() => {
    fnRef.current = func;
  });
  // 用 useCallback + 空依赖，确保返回函数的引用一致
  return useCallback((...args: any[]) => {
    const fn = fnRef.current;
    return fn(...args);
  }, []);
};
