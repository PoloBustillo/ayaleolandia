/** @format */

interface Image {
  src: string;
  width: number;
  heigth: number;
  alt: string;
  layout?: "fixed" | "fill" | "intrinsic" | "responsive";
  direction?: string;
}

export default Image;
