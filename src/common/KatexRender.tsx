/*!
 * # Knowledj frontend.
 * src/common/KatexRender.tsx
 */
import { useMemo } from "react";
import katex, { KatexOptions } from "katex";
import { nodeToString } from "../lib/format";

/**
 * Renders LaTeX using KaTeX.
 * 
 * Usage : 
 * ```tsx
 * <KatexRender>\\KaTeX 1 + 2</KatexRender>
 * ```
 */
export const KatexRender = ({children, displayMode = false, errorColor, options, className}: {
  /** LaTeX source. When children is provided, it takes precedence. */
  children: React.ReactNode;
  /** Render in display mode (centered, larger operators). Default: false. */
  displayMode?: boolean;
  /** Error handling: "warn" logs and renders the raw source, "throw" rethrows. */
  errorColor?: string;
  /** Any other KaTeX options (macros, trust, strict, etc.). */
  options?: KatexOptions;
  /** Class applied to the wrapping span. */
  className?: string;
}) => {
  const latex = nodeToString(children);
  const html = useMemo(
    () => {
      try {
        return katex.renderToString(
        latex, {
          displayMode, 
          errorColor, 
          throwOnError: false,
          ...options,
        })
      } catch (error) {
        console.log(`(!) KaTex error while rendering \`${latex}\` : \`${error}\``);
        return `(!) KaTeX error rendering : \`${latex}\`.`;
      }
    }, [latex, displayMode, errorColor, options]
  );

  return (
    <span 
      className={className}  
      dangerouslySetInnerHTML={{__html: html}}
    ></span>
  );
};
