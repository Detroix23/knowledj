/*!
 * # Knowledj frontend.
 * src/common/KatexRender.tsx
 */
import { ReactNode, useMemo } from "react";
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


type KatexEditorProps = {
  label: ReactNode,
  input: string,
  setInput: (input: string) => void,
  /** Render in display mode (centered, larger operators). Default: false. */
  displayMode?: boolean,
  /** Error handling: "warn" logs and renders the raw source, "throw" rethrows. */
  errorColor?: string,
  /** Any other KaTeX options (macros, trust, strict, etc.). */
  options?: KatexOptions,
  className?: string,
  classInput?: string,
  classRender?: string,
};

export const KatexEditor = ({ 
  label, 
  input, 
  setInput, 
  displayMode = false, 
  errorColor, 
  options, 
  className,
  classInput,
  classRender,
}: KatexEditorProps) => {
  const labelId: string = `katexEditor-id${label}`;
  return (
    <div className={className}>
      <label htmlFor={labelId}>{label}</label>
      <br />
      <textarea
        id={labelId} 
        value={input}
        onChange={area => setInput(area.target.value)}
        className={classInput}
        placeholder="LaTeX supported."
      />
      <br />
      <KatexRender 
        displayMode={displayMode}
        errorColor={errorColor}
        options={options} 
        className={classRender}
      >
        {input}
      </KatexRender>
    </div>
  );
}
