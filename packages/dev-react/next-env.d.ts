/// <reference types="next" />
/// <reference types="next/types/global" />


declare module '*.svg' {
  const svg: React.FC<React.SVGAttributes<SVGElement>>;
  export default svg;
}
