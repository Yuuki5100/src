// filepath: c:\source\common-archetecture\FE\spa-next\my-next-app\types.d.ts
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveStyle(style: Record<string, any>): R;
      // 他の@testing-library/jest-domマッチャーも必要に応じて追加可能
    }
  }
}

export {};
